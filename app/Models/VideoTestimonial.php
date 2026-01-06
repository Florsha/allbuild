<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VideoTestimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'testimonial',
        'rating',
        'video_path',
        'thumbnail_path',
        'duration',
        'status',
    ];
}
