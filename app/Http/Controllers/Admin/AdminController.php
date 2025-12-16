<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\ManageAppointment;
use App\Models\ClientRequest;

class AdminController extends Controller
{
    //

    public function manageappointment(Request $request): Response
    {
        $manage_appointment = ManageAppointment::with('user:id,name')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString(); // Keep query parameters when navigating pages

        return Inertia::render('Admin/manageAppointment/appointment', [
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

    public function checkDuplicate(Request $request){

        $exists = ManageAppointment::where('effective_date', $request->date)
            ->where('time', $request->time)
            ->exists();

        return response()->json([
            'exists' => $exists
        ]);

    }
    
    // C:\xampp8.2\htdocs\allbuild\resources\js\Pages\Admin\manageAppointment\client_booked.jsx
    public function ClientBookedAppointment(Request $request): Response
    {
        $clientRequest = ClientRequest::with([
            'clientAssign.client',
            'clientAssign.appointment.user',
            'servicesOffer',
            'subCategory'
        ])->latest()->paginate(10);

        return Inertia::render('Admin/manageAppointment/client_booked',[
            "clientBooked" => $clientRequest,
        ]);
    }

    public function updateAppointment(Request $request, ManageAppointment $appointment){
        $user = auth()->user();
        dd($request->all());
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

    }

    public function getSlotsByDate($date){
        
        $slots = ManageAppointment::where('effective_date', $date)
            ->orderBy('time')
            ->get();

        return response()->json($slots);

    }

    public function manageVideo(Request $request): Response
    {
        return Inertia::render('Admin/ManageVideo', [
            //
        ]);
    }
}
