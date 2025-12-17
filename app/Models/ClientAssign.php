<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientAssign extends Model
{
    //
    protected $table = "client_assign";
    protected $guarded = array();

    public function appointment(){
        return $this->belongsTo(ManageAppointment::class, 'appointment_id');
    }

    public function client(){

        return $this->belongsTo(User::class, 'client_id');
    }
}
