<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstname')->nullable();
            $table->string('middlename')->nullable();
            $table->string('lastname')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('address')->nullable();
            $table->string('preferred_contact_method')->nullable();
            $table->string('company_or_organization')->nullable();
            $table->string('role')->nullable();
            $table->string('terms_and_condition_concent')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'firstname',
                'middlename',
                'lastname',
                'contact_number',
                'address',
                'preferred_contact_method',
                'company_or_organization',
                'role',
                'terms_and_condition_concent'
            ]);
        });

    }
};
