<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientRequest extends Model
{
    //
    protected $table = "client_requests";
    protected $guarded = array();
    
    public function clientAssign(){
        return $this->belongsTo(ClientAssign::class, 'client_assign_id');
    }

    public function servicesOffer(){
        return $this->belongsTo(services::class, 'services_id');
    }

    public function subCategory(){
        return $this->belongsTo(subcategory::class, 'subcategory_id');
    }
}
