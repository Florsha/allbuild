<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VerificationLog;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class IDVerificationController extends Controller
{
    public function index()
    {
        return Inertia::render('IDVerification/Index', [
            'result' => session('result') ?? null
        ]);
    }

    public function process(Request $request)
    {
        $request->validate([
            'selected_id_type' => 'required|string',
            'ocr_text' => 'nullable|string',
            'qr_raw' => 'nullable|string',
            'qr_parsed' => 'nullable|string',
            'id_image' => 'nullable|image|max:10240',
        ]);

        $selectedType = $request->input('selected_id_type');
        $ocrText = $request->input('ocr_text', '');
        $qrRaw = $request->input('qr_raw', '');
        $qrParsed = $request->input('qr_parsed', null);

        // Save image
        $imagePath = null;
        if ($request->hasFile('id_image')) {
            $file = $request->file('id_image');
            $filename = 'id_' . time() . '_' . Str::random(8) . '.' . $file->getClientOriginalExtension();
            $imagePath = $file->storeAs('public/verification_images', $filename);
        }

        // Run selected-type validation
        $validationResult = $this->validateSelectedId($selectedType, $ocrText, $qrRaw, $qrParsed);

        // Build status
        $status = $validationResult['valid'] ? 'valid' : ($validationResult['suspicious'] ? 'suspicious' : 'invalid');

        // Persist log
        $log = VerificationLog::create([
            'id_type' => $selectedType,
            'detected_id_number' => $validationResult['detected_id'] ?? null,
            'ocr_text' => $ocrText,
            'qr_raw' => $qrRaw,
            'qr_parsed' => $qrParsed ? $qrParsed : null,
            'image_path' => $imagePath,
            'status' => $status,
            'user_id' => $request->user() ? $request->user()->id : null,
            'ip_address' => $request->ip()
        ]);

        $result = [
            'selected_type' => $selectedType,
            'valid' => $validationResult['valid'],
            'suspicious' => $validationResult['suspicious'],
            'detected_id' => $validationResult['detected_id'] ?? null,
            'messages' => $validationResult['messages'] ?? [],
            'log_id' => $log->id
        ];

        return back()->with('result', $result);
    }

    /**
     * Validate OCR/QR based on selected ID type.
     * Returns array:
     *  - valid: bool
     *  - suspicious: bool
     *  - detected_id: string|null
     *  - messages: []
     */
    private function validateSelectedId($type, $ocr, $qr, $qrParsed = null)
    {
        $ocr = $ocr ?? '';
        $qr = $qr ?? '';
        $type = trim($type);
        $messages = [];
        $detected = null;
        $valid = false;
        $suspicious = false;

        // normalize OCR: remove extra spaces/newlines for pattern matching
        $ocrNorm = preg_replace("/\r|\n|\t/", ' ', $ocr);
        $ocrNorm = preg_replace('/\s+/', ' ', $ocrNorm);

        // helper: find first match by regex
        $find = function($pattern, $txt) {
            if (preg_match($pattern, $txt, $m)) return $m[0];
            return null;
        };

        switch ($type) {
            case 'Philippine National ID':
                // PhilSys printed format often has CRN/PCN or other representation.
                // Try patterns: 4-7-1 or 4-9-1 etc. (common printed formats vary)
                $p = $find('/\d{4}-\d{7}-\d{1,2}/', $ocrNorm);
                if (!$p) $p = $find('/\d{4}\s*\d{7}\s*\d{1,2}/', $ocrNorm);
                if ($p) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'PhilSys style number detected.';
                } elseif ($qrParsed) {
                    // if parsed QR contains fields, try extract PSN or name
                    $detected = $qrParsed['psn'] ?? ($qrParsed['CRN'] ?? null);
                    if ($detected) {
                        $valid = true;
                        $messages[] = 'PhilSys QR parsed.';
                    } else {
                        $suspicious = true;
                        $messages[] = 'Could not find PhilSys number in OCR or QR parsed data.';
                    }
                } else {
                    $suspicious = true;
                    $messages[] = 'No PhilSys number detected in OCR/QR.';
                }
                break;

            case 'SSS / UMID':
                // SSS number format: 2-7-1 (e.g., 12-3456789-0) but OCR can be messy
                $p = $find('/\d{2}-\d{7}-\d{1,2}/', $ocrNorm);
                if (!$p) $p = $find('/\d{2}\s*\d{7}\s*\d{1,2}/', $ocrNorm);
                if ($p) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'SSS format detected.';
                } else {
                    // UMID card may have CRN or other references; check QR parsed
                    if ($qrParsed && (isset($qrParsed['sss']) || isset($qrParsed['SSS']))) {
                        $detected = $qrParsed['sss'] ?? $qrParsed['SSS'] ?? null;
                        $valid = true;
                        $messages[] = 'SSS detected from QR parsed payload.';
                    } else {
                        $suspicious = true;
                        $messages[] = 'No SSS/UMID number detected.';
                    }
                }
                break;

            case 'GSIS':
                // GSIS numbers often vary; match 10+ digits pattern or check keyword
                $p = $find('/\d{7,12}/', $ocrNorm);
                if ($p && (stripos($ocrNorm, 'GSIS') !== false || stripos($ocrNorm, 'Government Service Insurance') !== false)) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'GSIS number detected with GSIS keyword.';
                } else {
                    $suspicious = true;
                    $messages[] = 'Cannot find a reliable GSIS number or keyword.';
                }
                break;

            case 'Pag-IBIG':
                // Pag-IBIG MID number is usually 12 digits or formatted like xxxx-xxxx-xxxx
                $p = $find('/\d{4}-\d{4}-\d{4}/', $ocrNorm);
                if (!$p) $p = $find('/\d{12}/', $ocrNorm);
                if ($p) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'Pag-IBIG MID detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'Pag-IBIG number not detected.';
                }
                break;

            case 'PhilHealth':
                // PhilHealth numbers are usually 12 digits or formatted like ##-########-#
                $p = $find('/\d{2}-\d{8}-\d{1,2}/', $ocrNorm);
                if (!$p) $p = $find('/\d{12}/', $ocrNorm);
                if ($p) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'PhilHealth number detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'PhilHealth number not detected.';
                }
                break;

            case "Driver's License":
                // LTO formats vary; try detect 'DL No' or alphanumeric of length 6-12
                $p = $find('/DL\s*No[:\.]?\s*([A-Z0-9\-]+)/i', $ocr);
                if ($p) {
                    // extract after 'DL No'
                    if (preg_match('/DL\s*No[:\.]?\s*([A-Z0-9\-]+)/i', $ocr, $m)) $detected = $m[1];
                    $valid = true;
                    $messages[] = 'Driver License found by label.';
                } else {
                    $p2 = $find('/[A-Z0-9]{6,12}/', $ocrNorm);
                    if ($p2 && stripos($ocrNorm, 'license') !== false) {
                        $detected = $p2;
                        $valid = true;
                        $messages[] = 'Driver License candidate detected.';
                    } else {
                        $suspicious = true;
                        $messages[] = 'Driver License not confidently detected.';
                    }
                }
                break;

            case 'Passport':
                // MRZ lines: start with 'P<PHL' or contain 'P<'...
                if (preg_match('/P<PHL/', $ocr) || preg_match('/P<\w{3}/', $ocr)) {
                    // try to extract passport number (second field in MRZ first line typically)
                    if (preg_match('/P<\w{3}([A-Z0-9<]{1,9})/', $ocr, $m)) {
                        $detected = str_replace('<', '', $m[1]);
                    }
                    $valid = true;
                    $messages[] = 'Passport MRZ detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'No passport MRZ detected.';
                }
                break;

            case 'Postal ID':
                // Keyword match
                if (stripos($ocrNorm, 'POSTAL') !== false || stripos($ocrNorm, 'POSTAL ID') !== false) {
                    // try to capture number-like string
                    $p = $find('/[A-Z0-9\-]{6,20}/', $ocrNorm);
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'Postal ID keyword detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'Postal ID not found.';
                }
                break;

            case 'PRC':
                // PRC professional license: numeric (7 digits) or with dashes
                $p = $find('/\d{7,9}/', $ocrNorm);
                if ($p && stripos($ocrNorm, 'PRC') !== false) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'PRC number detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'PRC not detected.';
                }
                break;

            case "Voter's ID":
                if (stripos($ocrNorm, 'Voter') !== false || stripos($ocrNorm, 'COMMISSION ON ELECTIONS') !== false) {
                    $p = $find('/\d{4}\s*\d{4}\s*\d{4}/', $ocrNorm) ?? $find('/[A-Z0-9\-]{6,20}/', $ocrNorm);
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'Voter ID-like content detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'Voter ID keywords not found.';
                }
                break;

            case 'TIN':
                // TIN: address numeric groups often like 123-456-789-000
                $p = $find('/\d{3}-\d{3}-\d{3}-\d{3}/', $ocrNorm) ?? $find('/\d{9}/', $ocrNorm);
                if ($p) {
                    $detected = $p;
                    $valid = true;
                    $messages[] = 'TIN detected.';
                } else {
                    $suspicious = true;
                    $messages[] = 'TIN not detected.';
                }
                break;

            case 'Company / School ID':
            case 'Other':
            default:
                // For generic IDs, consider it's valid if OCR text length > 50 characters and name-like words exist
                if (strlen($ocrNorm) > 60 && preg_match('/[A-Z][a-z]+\s+[A-Z][a-z]+/', $ocrNorm)) {
                    $valid = true;
                    $detected = null;
                    $messages[] = 'Generic ID content detected (likely valid).';
                } else {
                    $suspicious = true;
                    $messages[] = 'Generic ID insufficient data.';
                }
                break;
        }

        return [
            'valid' => $valid,
            'suspicious' => $suspicious,
            'detected_id' => $detected,
            'messages' => $messages
        ];
    }
}
