<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_type',
        'detected_id_number',
        'ocr_text',
        'qr_raw',
        'qr_parsed',
        'image_path',
        'status',
        'user_id',
        'ip_address'
    ];
}
