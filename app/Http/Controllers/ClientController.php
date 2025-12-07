<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\services; 
use App\Models\subcategory;
use App\Models\ManageAppointment;
use App\Models\ClientRequest;
use App\Models\ClientAssign;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    //
    public function client(Request $request): Response
    {

        $services = services::all();
        $subcateg = subcategory::select('id','title')->get();
        $client_assign = ClientAssign::get();
        $manage_appointment = ManageAppointment::with('user:id,name')->get();

           return Inertia::render('Services/client',[
            "client_assign_slot" => $client_assign,
            "all_services" => $services,
            "services_offer" => $subcateg,
            'manage_appointment' => $manage_appointment 
        ]);

    }

    public function StoreClientRequest(Request $request){
        $user = auth()->user();
        $validated = $request->validate([
            'services_id' => 'required|integer',
            'category' => 'required|integer',
            'description' => 'required|string',
            'appointment' => 'required|integer',
            'file' => 'required|file|max:5000',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric',
            'location.address' => 'required|string',
        ]);
            
        $filepath = $request->file('file')->store('blueprints', 'public');

        $clientAssign = ClientAssign::create([
            'appointment_id' => $validated['appointment'],
            'client_id' => $user->id
        ]);

        ClientRequest::create([
            'services_id' => $validated['services_id'],
            'reference_number' => 'REF-' . substr(str_replace('-', '', Str::uuid()), 0, 10),
            'status' => 'pending',
            'subcategory_id' => $validated['category'],
            'client_assign_id' => $clientAssign->id,
            'project_description' => $validated['description'],
            'Upload_Blueprint' => $filepath,
            'latitude' => $validated['location']['lat'],
            'longitude' => $validated['location']['lng']
        ]);
        
         return redirect()->route('services')->with('success', 'Appointment Submitted');
    }
}
