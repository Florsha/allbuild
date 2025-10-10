<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            [
                'firstname' => 'John',
                'middlename' => 'D.',
                'lastname' => 'Gonzales',
                'name' => 'John Gonzales',
                'email' => 'john@example.com',
                'password' => Hash::make('password123'),
                'contact_number' => '09171234567',
                'address' => 'Cebu City',
                'preferred_contact_method' => 'Email',
                'company_or_organization' => 'DOH Region 7',
                'role' => '1',
                'terms_and_condition_concent' => 'Yes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'firstname' => 'Jane',
                'middlename' => 'M.',
                'lastname' => 'Reyes',
                'name' => 'Jane Reyes',
                'email' => 'jane@example.com',
                'password' => Hash::make('password123'),
                'contact_number' => '09187654321',
                'address' => 'Bohol',
                'preferred_contact_method' => 'Phone',
                'company_or_organization' => 'HealthCare Plus',
                'role' => '2',
                'terms_and_condition_concent' => 'Yes',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
