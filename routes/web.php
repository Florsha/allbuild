<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Admin\DashboardCtrl;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

//     //role 2
//     Route::get('/contractor', [ContractorController::class, 'index'])->name('contractor');
//     Route::get('/services', [ClientController::class, 'client'])->name('services');

//     // role 1
//     Route::get('admin/categoryList', [DashboardCtrl::class, 'categoryList'])->name('categoryList');
//     Route::get('/admin/dashboard', [DashboardCtrl::class, 'dashboard'])->name('dashboard');
// });

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role:2')->group(function () {
        Route::get('/contractor', [ContractorController::class, 'index'])->name('contractor');
        Route::get('/services', [ClientController::class, 'client'])->name('services');
    });

    Route::middleware('role:1')->group(function () {
        Route::get('/admin/categoryList', [DashboardCtrl::class, 'categoryList'])->name('categoryList');
        Route::get('/admin/dashboard', [DashboardCtrl::class, 'dashboard'])->name('dashboard');
    });
    

});




require __DIR__.'/auth.php';
