<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\services; 
use App\Models\subcategory;
use App\Models\ManageAppointment;

class ClientController extends Controller
{
    //
    public function client(Request $request): Response
    {

        $services = services::all();
        $subcateg = subcategory::select('id','title')->get();

        $manage_appointment = ManageAppointment::with('user:id,name')->get();

           return Inertia::render('Services/client',[
            "all_services" => $services,
            "services_offer" => $subcateg,
            'manage_appointment' => $manage_appointment 
        ]);

    }
}
