<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Admin\DashboardCtrl;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
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

        Route::post('/services-request', [ClientController::class, 'StoreClientRequest'])->name('services.request.store');
    });

    Route::middleware('role:1')->group(function () {
        Route::get('/admin/categoryList', [CategoryController::class, 'index'])->name('categoryList');

        Route::post('/admin/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::post('/admin/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('admin/subcateg', [CategoryController::class, 'subcategory'])->name('admin.subcateg');
        Route::post('/admin/store/categoryList', [CategoryController::class, 'storeListCateg'])->name('categoryList.store');
        Route::put('/admin/categoryList/{category}', [CategoryController::class, 'updateCategList'])->name('categoryList.update');
        Route::get('/admin/dashboard', [DashboardCtrl::class, 'dashboard'])->name('dashboard');

        //appointment
        Route::get('admin/appointment', [AdminController::class, 'manageappointment'])->name('manage.appointment');
        Route::post('/admin/store/appointment', [AdminController::class, 'storeAppoitment'])->name('appointment.store');
        Route::put('/admin/appointment/update/{appointment}', [AdminController::class, 'updateAppointment'])->name('admin.appointment.edit');

        Route::get('admin/appointment/slot/{date}', [AdminController::class, 'getSlotsByDate'])->name('appointment.slots.byDate');
    });
    

});




require __DIR__.'/auth.php';
