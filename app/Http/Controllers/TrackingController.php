<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Tracking;
use App\Models\ClientRequest;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function index(Request $request)
    {
        $reference = $request->query('reference_number');
        $trackingData = null;

        if ($reference) {
            // Get the client request with the reference number
            $clientRequest = ClientRequest::where('reference_number', $reference)
                ->with([
                    'clientAssign',
                    'servicesOffer',
                    'subCategory'
                ])
                ->first();

            if ($clientRequest) {
                // Get all tracking records for this reference
                $trackings = Tracking::where('reference_number', $reference)
                    ->orderBy('created_at', 'asc')
                    ->get()
                    ->map(function ($tracking) {
                        return [
                            'id' => $tracking->id,
                            'reference_number' => $tracking->reference_number,
                            'status' => $tracking->status,
                            'remarks' => $tracking->remarks ?? '',
                            'created_at' => $tracking->created_at,
                            'updated_at' => $tracking->updated_at,
                        ];
                    });

                $trackingData = [
                    'reference_number' => $reference,
                    'client_request' => [
                        'id' => $clientRequest->id,
                        'services_id' => $clientRequest->services_id,
                        'subcategory_id' => $clientRequest->subcategory_id,
                        'project_description' => $clientRequest->project_description,
                        'created_at' => $clientRequest->created_at,
                    ],
                    'service' => $clientRequest->servicesOffer ? [
                        'id' => $clientRequest->servicesOffer->id,
                        'name' => $clientRequest->servicesOffer->name ?? 'N/A',
                    ] : null,
                    'subcategory' => $clientRequest->subCategory ? [
                        'id' => $clientRequest->subCategory->id,
                        'name' => $clientRequest->subCategory->name ?? 'N/A',
                    ] : null,
                    'trackings' => $trackings,
                ];
            }
        }

        return Inertia::render('Tracker/Tracker', [
            'trackingData' => $trackingData,
            'reference_number' => $reference,
        ]);
    }

    public function adminIndex(Request $request)
    {
        $search = $request->query('search');
        $statusFilter = $request->query('status');

        // Get all client requests with their related data
        $query = ClientRequest::with([
            'servicesOffer',
            'subCategory',
            'clientAssign'
        ]);

        if ($search) {
            $query->where('reference_number', 'like', "%{$search}%");
        }

        if ($statusFilter) {
            $query->where('status', $statusFilter);
        }

        $clientRequests = $query->latest()->paginate(10);

        // Enrich each request with tracking data
        $requests = $clientRequests->map(function ($request) {
            $latestTracking = Tracking::where('reference_number', $request->reference_number)
                ->latest('created_at')
                ->first();

            return [
                'id' => $request->id,
                'reference_number' => $request->reference_number,
                'status' => $request->status,
                'project_description' => $request->project_description,
                'created_at' => $request->created_at,
                'updated_at' => $request->updated_at,
                'service' => $request->servicesOffer ? [
                    'id' => $request->servicesOffer->id,
                    'name' => $request->servicesOffer->name ?? 'N/A',
                ] : null,
                'subcategory' => $request->subCategory ? [
                    'id' => $request->subCategory->id,
                    'name' => $request->subCategory->name ?? 'N/A',
                ] : null,
                'latest_tracking' => $latestTracking ? [
                    'status' => $latestTracking->status,
                    'remarks' => $latestTracking->remarks ?? '',
                    'created_at' => $latestTracking->created_at,
                ] : null,
            ];
        });

        return Inertia::render('Admin/RequestTracker', [
            'requests' => $requests,
            'search' => $search,
            'statusFilter' => $statusFilter,
        ]);
    }

    public function adminDetail(Request $request)
    {
        $reference = $request->query('reference_number');
        $trackingData = null;

        if ($reference) {
            // Get the client request with the reference number
            $clientRequest = ClientRequest::where('reference_number', $reference)
                ->with([
                    'clientAssign.client',
                    'servicesOffer',
                    'subCategory'
                ])
                ->first();

            if ($clientRequest) {
                // Get all tracking records for this reference
                $trackings = Tracking::where('reference_number', $reference)
                    ->orderBy('created_at', 'asc')
                    ->get()
                    ->map(function ($tracking) {
                        return [
                            'id' => $tracking->id,
                            'reference_number' => $tracking->reference_number,
                            'status' => $tracking->status,
                            'remarks' => $tracking->remarks ?? '',
                            'created_at' => $tracking->created_at,
                            'updated_at' => $tracking->updated_at,
                        ];
                    });

                $trackingData = [
                    'reference_number' => $reference,
                    'client' => $clientRequest->clientAssign && $clientRequest->clientAssign->client ? [
                        'id' => $clientRequest->clientAssign->client->id,
                        'name' => $clientRequest->clientAssign->client->name ?? 'N/A',
                        'email' => $clientRequest->clientAssign->client->email ?? 'N/A',
                    ] : null,
                    'client_request' => [
                        'id' => $clientRequest->id,
                        'services_id' => $clientRequest->services_id,
                        'subcategory_id' => $clientRequest->subcategory_id,
                        'project_description' => $clientRequest->project_description,
                        'file_attachment' => $clientRequest->Upload_Blueprint ?? null,
                        'created_at' => $clientRequest->created_at,
                    ],
                    'service' => $clientRequest->servicesOffer ? [
                        'id' => $clientRequest->servicesOffer->id,
                        'name' => $clientRequest->servicesOffer->name ?? 'N/A',
                    ] : null,
                    'subcategory' => $clientRequest->subCategory ? [
                        'id' => $clientRequest->subCategory->id,
                        'name' => $clientRequest->subCategory->name ?? 'N/A',
                    ] : null,
                    'trackings' => $trackings,
                ];
            }
        }

        return Inertia::render('Admin/AdminTrackerDetail', [
            'trackingData' => $trackingData,
            'reference_number' => $reference,
        ]);
    }
}
