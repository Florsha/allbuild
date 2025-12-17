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
        contact_number: '',
        address: '',
        preferred_contact_method: '',
        company_or_organization: '',
        role: '',
        terms_and_condition_concent: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: (page) => {
                if (window.Lobibox) {
                    window.Lobibox.notify('info', {
                        msg: 'Registration successful! Redirecting to dashboard...',
                        position: 'top right',
                        sound: false,
                    });
                } else {
                    alert('Registration successful! Redirecting to dashboard...');
                }
                setTimeout(() => {
                    window.location.href = route('dashboard');
                }, 1500);
            },
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

                {/* Contact Number */}
                <div className="mt-4">
                    <InputLabel htmlFor="contact_number" value="Contact Number" />
                    <TextInput
                        id="contact_number"
                        name="contact_number"
                        value={data.contact_number}
                        className="mt-1 block w-full"
                        autoComplete="tel"
                        onChange={(e) => setData('contact_number', e.target.value)}
                    />
                    <InputError message={errors.contact_number} className="mt-2" />
                </div>

                {/* Address */}
                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="street-address"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>

                {/* Preferred Contact Method */}
                <div className="mt-4">
                    <InputLabel htmlFor="preferred_contact_method" value="Preferred Contact Method" />
                    <TextInput
                        id="preferred_contact_method"
                        name="preferred_contact_method"
                        value={data.preferred_contact_method}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('preferred_contact_method', e.target.value)}
                    />
                    <InputError message={errors.preferred_contact_method} className="mt-2" />
                </div>

                {/* Company or Organization */}
                <div className="mt-4">
                    <InputLabel htmlFor="company_or_organization" value="Company or Organization" />
                    <TextInput
                        id="company_or_organization"
                        name="company_or_organization"
                        value={data.company_or_organization}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('company_or_organization', e.target.value)}
                    />
                    <InputError message={errors.company_or_organization} className="mt-2" />
                </div>

                {/* Role */}
                {/* <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <TextInput
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('role', e.target.value)}
                    />
                    <InputError message={errors.role} className="mt-2" />
                </div> */}

                {/* Terms and Condition Consent */}
                <div className="mt-4 flex items-center">
                    <input
                        id="terms_and_condition_concent"
                        name="terms_and_condition_concent"
                        type="checkbox"
                        checked={data.terms_and_condition_concent}
                        onChange={(e) => setData('terms_and_condition_concent', e.target.checked)}
                        className="mr-2"
                        required
                    />
                    <InputLabel htmlFor="terms_and_condition_concent" value="I agree to the Terms and Conditions" />
                </div>
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
