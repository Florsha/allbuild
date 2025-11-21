<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\ManageAppointment;

class AdminController extends Controller
{
    //

    public function manageappointment(Request $request): Response
    {
        $manage_appointment = ManageAppointment::with('user:id,name')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString(); // Keep query parameters when navigating pages

        return Inertia::render('Admin/manageAppointment.jsx/appointment', [
            'appointments' => $manage_appointment
        ]);
    }

    public function storeAppoitment(Request $request): RedirectResponse
    {
        $user = auth()->user();
        
        $effective_Date = $request->date;
        $timeSlots = $request->timeslots;

        foreach ($timeSlots as $slot){
            ManageAppointment::create([
                'effective_date' => $effective_Date,
                'time' => $slot['time'],
                'slot' => $slot['slot'],
                'created_by' => $user->id
            ]);
        }
    
          return redirect()->route('manage.appointment')
            ->with('success', 'Appointment slots saved!');
    }
}
