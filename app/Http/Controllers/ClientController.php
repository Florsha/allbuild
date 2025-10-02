<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\services; 

class ClientController extends Controller
{
    //
    public function client(Request $request): Response
    {

        $services = services::all();
           return Inertia::render('Services/client');

    }
}
