<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\ManageAppointment;
use App\Models\ClientRequest;
use App\Models\ClientAssign;
use Carbon\Carbon;

class AdminController extends Controller
{
    //

    public function manageappointment(Request $request): Response
    {
        $user = auth()->user();
        $type = $request->query('type', 'upcoming');

        $now = Carbon::now();
        $today = $now->toDateString();  // YYYY-MM-DD
        $currentTime = $now->format('H:i');

        $client_booked = ClientAssign::select('appointment_id')->get();
    
        $query = ManageAppointment::with('user:id,name');

        if($type === 'past'){
            $query->where(function ($q) use ($today, $currentTime){
                $q->whereDate('effective_date', '<', $today)
                    ->orWhere(function ($q2) use ($today, $currentTime){
                        $q2->whereDate('effective_date', $today)
                            ->where('time', '<', $currentTime);
                    });
            });

             $query->orderBy('effective_date', 'desc')
              ->orderBy('time', 'desc');
        }else{

            $query->where(function ($q) use ($today, $currentTime) {
                $q->whereDate('effective_date', '>', $today)
                ->orWhere(function ($q2) use ($today, $currentTime) {
                    $q2->whereDate('effective_date', $today)
                        ->where('time', '>=', $currentTime);
                });
            });

            $query->where('created_by', $user->id)
                ->orderBy('effective_date', 'asc')
                ->orderBy('time', 'asc');
        }

        $manage_appointment = $query
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/manageAppointment/appointment', [
            'appointments' => $manage_appointment,
            'filtertype' => $type,
            'client_booked' => $client_booked
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

    public function CheckAppointmentExists($id){

        $appointmentId_exists = ClientAssign::where('appointment_id',$id)->exists();
        return response()->json([
            'exists' => $appointmentId_exists 
        ]);

    }

    public function DeleteSlot($id){
        $appointment = ManageAppointment::findOrFail($id);
        $appointment->delete();
            
    }
    
    // C:\xampp8.2\htdocs\allbuild\resources\js\Pages\Admin\manageAppointment\client_booked.jsx
    public function ClientBookedAppointment(Request $request): Response
    {
        $clientRequest = ClientRequest::with([
            'clientAssign.client',
            'clientAssign.appointment.user',
            'servicesOffer',
            'subCategory'
        ])
        ->where('status','pending')
        ->latest()->paginate(10);

        return Inertia::render('Admin/manageAppointment/client_booked',[
            "clientBooked" => $clientRequest,
        ]);
    }

    public function updateAppointment(Request $request, ManageAppointment $appointment)
    {
        $user = auth()->user();

        $request->validate([
            'appointment_date'      => 'required|date',
            'timeslots'             => 'required|array',
            // 'timeslots.*.time'      => 'required|date_format:H:i',
            'timeslots.*.slot'      => 'required|integer',
            'timeslots.*.id'        => 'nullable|integer',
        ]);

        // Update appointment main data
        $appointment->update([
            'effective_date' => $request->appointment_date,
            'created_by'     => $user->id,
        ]);

        foreach ($request->timeslots as $slot) {

            // 🔹 UPDATE existing slot
            if (!empty($slot['id'])) {
                ManageAppointment::where('id', $slot['id'])
                    ->update([
                        'time'       => substr($slot['time'], 0, 5),
                        'slot'       => $slot['slot'],
                        'created_by' => $user->id,
                    ]);

            // 🔹 CREATE new slot
            } else {
                ManageAppointment::create([
                    'effective_date' => $request->appointment_date,
                    'time'       => substr($slot['time'], 0, 5),
                    'slot'       => $slot['slot'],
                    'created_by' => $user->id,
                ]);
            }
        }

        return redirect()
            ->route('manage.appointment')
            ->with('success', 'Appointment and slots updated successfully');
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
