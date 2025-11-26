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

    public function updateAppointment(Request $request, ManageAppointment $appointment){
        $user = auth()->user();
        
        $request->merge([
            'effective_date' =>  $request->appointment_date,
            'time' => substr($request->timeslots[0]['time'], 0, 5), 
            'slot' => $request->timeslots[0]['slot'],
            'created_by' => $user->id
        ]);

          $validated = $request->validate([
           'effective_date' => 'required|date',     // date
            'time'          => 'required|date_format:H:i', // time (HH:MM)
            'slot'          => 'required|integer',   // integer
            'created_by'    => 'required|integer',   // integer
        ]);

        $appointment->update($validated);

        return redirect()->route('manage.appointment')->with('success', 'Appointment updated');
        // return back()->with('success', 'Appointment updated successfully.');

    }

    public function getSlotsByDate($date){
        
        $slots = ManageAppointment::where('effective_date', $date)
            ->orderBy('time')
            ->get();

        return response()->json($slots);

    }
}
