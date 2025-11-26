// resources/js/Pages/IDVerification/Index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Tesseract from 'tesseract.js/dist/tesseract.min.js'; // browser-friendly
import jsQR from 'jsqr';
import { Html5Qrcode } from 'html5-qrcode';

export default function Index() {
  const [selectedIdType, setSelectedIdType] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [qrRaw, setQrRaw] = useState('');
  const [qrParsed, setQrParsed] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const qrScannerRef = useRef(null);

  // Handle image file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    performOCR(file);
  };

  // OCR using Tesseract.js
  const performOCR = async (file) => {
    setProcessing(true);
    try {
      const { data } = await Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) });
      setOcrText(data.text);
    } catch (err) {
      console.error('OCR error:', err);
    } finally {
      setProcessing(false);
    }
  };

  // QR scanning
  const startCameraScanner = () => {
    if (!qrScannerRef.current) {
      qrScannerRef.current = new Html5Qrcode('qr-reader');
    }
    qrScannerRef.current.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        setQrRaw(decodedText);
        try {
          setQrParsed(JSON.parse(decodedText));
        } catch {
          setQrParsed(null);
        }
      },
      (err) => console.warn(err)
    ).catch((err) => console.error('QR Start error:', err));
  };

  const stopCameraScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().catch(console.error);
      qrScannerRef.current.clear();
      qrScannerRef.current = null;
    }
  };

  // Submit to Laravel backend via Inertia
  const submit = (e) => {
    e.preventDefault();
    if (!selectedIdType) {
      alert('Please select an ID type before submitting.');
      return;
    }
    setProcessing(true);

    const form = new FormData();
    form.append('selected_id_type', selectedIdType);
    form.append('ocr_text', ocrText || '');
    form.append('qr_raw', qrRaw || '');
    if (qrParsed) form.append('qr_parsed', JSON.stringify(qrParsed));

    const fileInput = document.getElementById('id_image_input');
    if (fileInput && fileInput.files && fileInput.files[0]) {
      form.append('id_image', fileInput.files[0]);
    }

    Inertia.post(route('id.verification.process'), form, {
      forceFormData: true,
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ID Verification</h1>

      {/* ID Type selection */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Select ID Type</label>
        <select
          value={selectedIdType}
          onChange={(e) => setSelectedIdType(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
        >
          <option value="">-- choose ID type --</option>
          <option value="Philippine National ID">Philippine National ID (PhilSys)</option>
          <option value="SSS / UMID">SSS / UMID</option>
          <option value="GSIS">GSIS</option>
          <option value="Pag-IBIG">Pag-IBIG</option>
          <option value="PhilHealth">PhilHealth</option>
          <option value="Driver's License">Driver's License (LTO)</option>
          <option value="Passport">Passport (MRZ)</option>
          <option value="Postal ID">Postal ID</option>
          <option value="PRC">PRC (Professional ID)</option>
          <option value="Voter's ID">Voter's ID</option>
          <option value="TIN">TIN</option>
          <option value="Company / School ID">Company / School ID</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Camera and upload UI */}
      <div className="mb-4">
        <button onClick={startCameraScanner} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">
          Start Camera QR Scan
        </button>
        <button onClick={stopCameraScanner} className="px-4 py-2 bg-gray-400 text-white rounded">
          Stop Camera
        </button>

        <div id="qr-reader" className="mt-3" style={{ width: '100%', maxWidth: 480 }}></div>

        <div className="mt-3">
          <label className="block mb-1 font-semibold">Or upload ID image (front / back)</label>
          <input id="id_image_input" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </div>

      {/* Preview and OCR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Image Preview</h3>
          {imagePreview ? (
            <img src={imagePreview} alt="preview" className="border rounded mt-2 max-h-60" />
          ) : (
            <div className="text-sm text-gray-500 mt-2">No image yet</div>
          )}
        </div>

        <div>
          <h3 className="font-semibold">OCR Text</h3>
          <textarea
            value={ocrText}
            onChange={(e) => setOcrText(e.target.value)}
            className="w-full h-40 p-2 border rounded mt-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">QR Raw</h3>
        <pre className="p-2 border rounded h-24 overflow-auto">{qrRaw}</pre>

        <h3 className="font-semibold mt-2">QR Parsed (if detected)</h3>
        <pre className="p-2 border rounded h-24 overflow-auto">{qrParsed ? JSON.stringify(qrParsed, null, 2) : '—'}</pre>
      </div>

      <div className="mt-4">
        <button onClick={submit} disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">
          {processing ? 'Processing...' : 'Submit for Verification'}
        </button>
      </div>
    </div>
  );
}
