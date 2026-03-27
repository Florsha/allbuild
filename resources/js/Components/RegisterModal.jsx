import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CustomAlert from '@/Components/CustomAlert';
import IDVerificationModal from '@/Components/IDVerificationModal';
import { useForm } from '@inertiajs/react';

export default function RegisterModal({ isOpen, onClose,onSuccess,onSwitchToLogin }) {
    const [alert, setAlert] = useState({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [showIDVerification, setShowIDVerification] = useState(false);
    const [isIDVerified, setIsIDVerified] = useState(false);
    const [verificationData, setVerificationData] = useState(null);

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

        // Clear previous alerts before attempting to register
        setAlert({
            isVisible: false,
            type: 'success',
            title: '',
            message: '',
        });

        post(route('register'), {
            onSuccess: () => {
                setAlert({
                    isVisible: true,
                    type: 'success',
                    title: 'Welcome!',
                    message: 'Registration successful! Redirecting to your dashboard...',
                });
                setTimeout(() => {
                   // window.location.href = route('dashboard');
                   onSuccess?.();
                }, 800);
            },
            onError: (errors) => {
                // Collect all error messages from server
                const errorMessages = Object.values(errors)
                    .flat()
                    .filter(msg => msg)
                    .join(' | ');
                
                setAlert({
                    isVisible: true,
                    type: 'error',
                    title: 'Registration Failed',
                    message: errorMessages || 'An error occurred during registration. Please check your information and try again.',
                });
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleIDVerified = (verificationData) => {
        setVerificationData(verificationData);
        setIsIDVerified(true);
        setShowIDVerification(false);
        setAlert({
            isVisible: true,
            type: 'success',
            title: 'ID Verified',
            message: 'Your ID has been verified successfully. You can now complete your registration.',
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <CustomAlert 
                type={alert.type}
                title={alert.title}
                message={alert.message}
                isVisible={alert.isVisible}
                onClose={() => setAlert({ ...alert, isVisible: false })}
                autoClose={alert.type === 'success'}
                autoCloseDuration={5000}
            />
            <IDVerificationModal 
                isOpen={showIDVerification}
                onClose={() => setShowIDVerification(false)}
                onVerified={handleIDVerified}
            />
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="relative px-8 pt-8 pb-6 border-b border-slate-100 sticky top-0 bg-white">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-900">Create Account</h2>
                        <p className="text-slate-500 text-sm mt-2">Join our community of verified professionals</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors p-1"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={submit} className="p-8 space-y-4">
                    {/* Firstname */}
                    <div>
                        <InputLabel htmlFor="firstname" value="First Name" />
                        <TextInput
                            id="firstname"
                            name="firstname"
                            value={data.firstname}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="given-name"
                            onChange={(e) => setData('firstname', e.target.value)}
                            required
                            placeholder="John"
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>

                    {/* Lastname */}
                    <div>
                        <InputLabel htmlFor="lastname" value="Last Name" />
                        <TextInput
                            id="lastname"
                            name="lastname"
                            value={data.lastname}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="family-name"
                            onChange={(e) => setData('lastname', e.target.value)}
                            required
                            placeholder="Doe"
                        />
                        <InputError message={errors.lastname} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="••••••••"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <InputLabel htmlFor="contact_number" value="Contact Number" />
                        <TextInput
                            id="contact_number"
                            name="contact_number"
                            value={data.contact_number}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="tel"
                            onChange={(e) => setData('contact_number', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                        />
                        <InputError message={errors.contact_number} className="mt-2" />
                    </div>

                    {/* Address */}
                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="street-address"
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="123 Main Street, City, State"
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                        <InputLabel htmlFor="preferred_contact_method" value="Preferred Contact Method" />
                        <TextInput
                            id="preferred_contact_method"
                            name="preferred_contact_method"
                            value={data.preferred_contact_method}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            onChange={(e) => setData('preferred_contact_method', e.target.value)}
                            placeholder="Phone or Email"
                        />
                        <InputError message={errors.preferred_contact_method} className="mt-2" />
                    </div>

                    {/* Company or Organization */}
                    <div>
                        <InputLabel htmlFor="company_or_organization" value="Company or Organization" />
                        <TextInput
                            id="company_or_organization"
                            name="company_or_organization"
                            value={data.company_or_organization}
                            className="mt-2 block w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            onChange={(e) => setData('company_or_organization', e.target.value)}
                            placeholder="Your Company Name"
                        />
                        <InputError message={errors.company_or_organization} className="mt-2" />
                    </div>

                    {/* Terms and Condition Consent */}
                    <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                        <input
                            id="terms_and_condition_concent"
                            name="terms_and_condition_concent"
                            type="checkbox"
                            checked={data.terms_and_condition_concent}
                            onChange={(e) => setData('terms_and_condition_concent', e.target.checked)}
                            className="mt-0.5"
                            required
                        />
                        <label htmlFor="terms_and_condition_concent" className="text-xs text-slate-600 cursor-pointer">
                            I agree to the <a href="#" className="text-[#f4c430] hover:text-yellow-600 font-semibold">Terms and Conditions</a>
                        </label>
                    </div>

                    {/* ID Verification Option */}
                    <div className={`p-4 rounded-xl ${isIDVerified ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' : 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200'}`}>
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isIDVerified ? 'bg-green-200' : 'bg-yellow-200'}`}>
                                <Shield className={`w-4 h-4 ${isIDVerified ? 'text-green-600' : 'text-yellow-600'}`} />
                            </div>
                            <div className="flex-1">
                                <p className={`font-semibold ${isIDVerified ? 'text-green-900' : 'text-slate-900'}`}>
                                    {isIDVerified ? '✓ ID Verified' : 'Verify Your Identity'}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    {isIDVerified 
                                        ? 'Your identity has been verified successfully.' 
                                        : 'Build trust by verifying your identity with a valid ID'}
                                </p>
                                {!isIDVerified && (
                                    <button
                                        type="button"
                                        onClick={() => setShowIDVerification(true)}
                                        className="mt-3 inline-block py-1.5 px-3 bg-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                                    >
                                        Verify ID
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#f4c430] to-yellow-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-slate-600 text-sm">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-[#f4c430] hover:text-yellow-600 font-semibold transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-8 py-4 bg-slate-50 text-center border-t border-slate-100 rounded-b-2xl">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                        <span>🔒</span> Your information is encrypted and secure
                    </p>
                </div>
            </div>
            </div>
        </>
    );
}
