<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManageAppointment extends Model
{
    //
    protected $table = 'manage_appointments';
    protected $guarded = array();

    public function user(){
        return $this->belongsTo(User::class, 'created_by');
    }
}
