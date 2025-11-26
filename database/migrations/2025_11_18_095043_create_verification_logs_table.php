<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerificationLogsTable extends Migration
{
    public function up()
    {
        Schema::create('verification_logs', function (Blueprint $table) {
            $table->id();
            $table->string('id_type')->nullable();
            $table->string('detected_id_number')->nullable();
            $table->text('ocr_text')->nullable();
            $table->text('qr_raw')->nullable();
            $table->text('qr_parsed')->nullable(); // json string if parsed
            $table->string('image_path')->nullable();
            $table->string('status')->default('pending'); // pending / valid / invalid / suspicious
            $table->unsignedBigInteger('user_id')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('verification_logs');
    }
}
