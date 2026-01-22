<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Tracking;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function index(Request $request)
{
    $reference = $request->reference_number;

    $trackings = [];

    if ($reference) {
        $trackings = Tracking::where('reference_number', $reference)
            ->orderBy('created_at', 'asc')
            ->get();
    }

    return Inertia::render('Tracker/Tracker', [
        'trackings' => $trackings,
        'reference_number' => $reference,
    ]);
}
}
