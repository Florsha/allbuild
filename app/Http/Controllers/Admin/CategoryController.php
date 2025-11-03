<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\services;
use App\Models\subcategory;

class CategoryController extends Controller
{
     public function index()
    {
        return Inertia::render('Admin/category/CategoryList', [
            'categories' => services::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
            'details' => 'nullable|string',
        ]);

        services::create($validated);

        return redirect()->route('categoryList')->with('success', 'Category added successfully!');
    }

    public function update(Request $request, services $category)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
            'details' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->route('categoryList')->with('success', 'Category updated successfully!');
    }

    public function destroy(services $category)
    {
        $category->delete();

        return redirect()->route('categoryList')->with('success', 'Category deleted successfully!');
    }

    public function subcategory(){

        return Inertia::render('Admin/subcategory/subcateglist', [
              'Subcategories' => subcategory::select('id','title')->latest()->get(),
        ]);
    }

    public function storeListCateg(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        subcategory::create($validated);

        return redirect()->route('admin.subcateg')->with('success', 'Category added successfully!');
    }
}
