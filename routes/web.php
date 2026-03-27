<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Admin\DashboardCtrl;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\VideoTestimonialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IDVerificationController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\TrackingController;
use App\Models\VideoTestimonial;
use App\Models\ManageAppointment;
use App\Models\services;
use App\Models\ClientAssign;
use App\Models\subcategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {

    $videos = VideoTestimonial::latest()->get()->map(function ($v) {
        return [
            'id' => $v->id,
            'name' => $v->name,
            'role' => $v->role,
            'testimonial' => $v->testimonial,
            'rating' => $v->rating,
            'videoUrl' => Storage::url($v->video_path),
            'thumbnail' => $v->thumbnail_path ? Storage::url($v->thumbnail_path) : null,
            'duration' => $v->duration,
        ];
    });

    $manage_appointment = ManageAppointment::with('user:id,name')->get();
    $all_services = services::all();
    $subcateg = subcategory::select('id','title')->get();
    $client_assign = ClientAssign::get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'videos' => $videos,
        'all_services' => $all_services,
        "services_offer" => $subcateg,
        "manage_appointment" => $manage_appointment,
        "client_assign_slot" => $client_assign,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role:2')->group(function () {
        Route::get('/contractor', [ContractorController::class, 'index'])->name('contractor');
        Route::get('/services', [ClientController::class, 'client'])->name('services');

        Route::post('/services-request', [ClientController::class, 'StoreClientRequest'])->name('services.request.store');

        Route::get('/getclientData', [ClientController::class, 'TestClient']);
    });

    Route::middleware('role:1')->group(function () {
        Route::get('/admin/categoryList', [CategoryController::class, 'index'])->name('categoryList');

        Route::post('/admin/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/admin/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::get('admin/subcateg', [CategoryController::class, 'subcategory'])->name('admin.subcateg');
        Route::post('/admin/store/categoryList', [CategoryController::class, 'storeListCateg'])->name('categoryList.store');
        Route::put('/admin/categoryList/{category}', [CategoryController::class, 'updateCategList'])->name('categoryList.update');
        Route::get('/admin/dashboard', [DashboardCtrl::class, 'dashboard'])->name('dashboard');

        //appointment
        Route::get('admin/appointment', [AdminController::class, 'manageappointment'])->name('manage.appointment');
        Route::post('/admin/store/appointment', [AdminController::class, 'storeAppoitment'])->name('appointment.store');
        Route::put('/admin/update/{appointment}', [AdminController::class, 'updateAppointment'])->name('admin.appointment.edit');
        Route::post('/appointment/check-duplicate', [AdminController::class, 'checkDuplicate'])->name('appointment.checkDuplicate');
        Route::get('/CheckAppointment/exists/{appointmentId}', [AdminController::class, 'CheckAppointmentExists'])->name('CheckAppointment.exists');
        route::delete('appointment/delete/{appointmentId}', [AdminController::class, 'DeleteSlot'])->name('appointment.delete');


        Route::get('admin/appointment/slot/{date}', [AdminController::class, 'getSlotsByDate'])->name('appointment.slots.byDate');

        //client Booked
        Route::get('admin/clientBooked', [AdminController::class, 'ClientBookedAppointment'])->name('appointment.clientBooked');
        // Route::get('admin/video', [AdminController::class, 'manageVideo'])->name('manage.video');

        Route::put('admin/clientBooked/updateStatus/{id}', [AdminController::class, 'saveTracking'])->name('admin.clientBooked.updateStatus');

        Route::get('admin/tracker', [TrackingController::class, 'adminIndex'])->name('admin.tracker');
        Route::get('admin/tracker/detail', [TrackingController::class, 'adminDetail'])->name('admin.tracker.detail');

        Route::resource('video-testimonials', VideoTestimonialController::class);


    });
    

});

Route::get('/id-verification', [IDVerificationController::class, 'index'])->name('id.verification');
Route::post('/id-verification/process', [IDVerificationController::class, 'process'])->name('id.verification.process');
Route::get('/tracking', [TrackingController::class, 'index'])->name('tracker.index');





require __DIR__.'/auth.php';
