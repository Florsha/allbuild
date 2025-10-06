<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardCtrl extends Controller
{
    //
    public function dashboard(Request $request): Response
    {

        return Inertia::render('Admin/Dashboard');

    }

    public function categoryList(Request $request): Response
    {
        return Inertia::render('Admin/category/CategoryList');
    }
}
