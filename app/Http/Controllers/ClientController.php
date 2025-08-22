<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    //
    public function client(Request $request): Response
    {
           return Inertia::render('Services/client');

    }
}
