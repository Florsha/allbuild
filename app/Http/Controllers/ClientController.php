<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\services; 
use App\Models\subcategory;

class ClientController extends Controller
{
    //
    public function client(Request $request): Response
    {

        $services = services::all();
        $subcateg = subcategory::select('id','title')->get();
           return Inertia::render('Services/client',[
            "all_services" => $services,
            "services_offer" => $subcateg
        ]);

    }
}
