import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        middlename: '',
        lastname: '',
        
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Firstname */}
                <div>
                    <InputLabel htmlFor="firstname" value="First Name" />
                    <TextInput
                        id="firstname"
                        name="firstname"
                        value={data.firstname}
                        className="mt-1 block w-full"
                        autoComplete="given-name"
                        onChange={(e) => setData('firstname', e.target.value)}
                        required
                    />
                    <InputError message={errors.firstname} className="mt-2" />
                </div>

                {/* Middlename */}
                <div className="mt-4">
                    <InputLabel htmlFor="middlename" value="Middle Name" />
                    <TextInput
                        id="middlename"
                        name="middlename"
                        value={data.middlename}
                        className="mt-1 block w-full"
                        autoComplete="additional-name"
                        onChange={(e) => setData('middlename', e.target.value)}
                    />
                    <InputError message={errors.middlename} className="mt-2" />
                </div>

                {/* Lastname */}
                <div className="mt-4">
                    <InputLabel htmlFor="lastname" value="Last Name" />
                    <TextInput
                        id="lastname"
                        name="lastname"
                        value={data.lastname}
                        className="mt-1 block w-full"
                        autoComplete="family-name"
                        onChange={(e) => setData('lastname', e.target.value)}
                        required
                    />
                    <InputError message={errors.lastname} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
