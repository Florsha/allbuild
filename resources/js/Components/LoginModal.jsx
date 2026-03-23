import React, { useState } from 'react';
import { X, Shield, Mail, Lock } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CustomAlert from '@/Components/CustomAlert';
import IDVerificationModal from '@/Components/IDVerificationModal';
import { useForm } from '@inertiajs/react';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const [alert, setAlert] = useState({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [showIDVerification, setShowIDVerification] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        // Clear previous alerts before attempting to login
        setAlert({
            isVisible: false,
            type: 'success',
            title: '',
            message: '',
        });

        post(route('login'), {
            onSuccess: () => {
                setAlert({
                    isVisible: true,
                    type: 'success',
                    title: 'Welcome Back!',
                    message: 'You have been successfully logged in. Redirecting...',
                });
                // Auto close modal after success
                setTimeout(() => {
                    onClose();
                    reset();
                }, 2000);
            },
            onError: (errors) => {
                // Show the server error response
                let errorMessage = 'Invalid email or password. Please try again.';
                if (errors.email) {
                    errorMessage = errors.email;
                }
                setAlert({
                    isVisible: true,
                    type: 'error',
                    title: 'Login Error',
                    message: errorMessage,
                });
            },
            onFinish: () => reset('password'),
        });
    };

    const handleIDVerified = (verificationData) => {
        setShowIDVerification(false);
        setAlert({
            isVisible: true,
            type: 'success',
            title: 'ID Verified',
            message: 'Your identity has been verified successfully. This will help contractors trust you more.',
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
                <div className="relative px-8 pt-8 pb-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-500 text-sm mt-2">Sign in to your account to continue</p>
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
                <form onSubmit={submit} className="p-8 space-y-6">
                    {/* Email Field */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <InputLabel htmlFor="email" value="Email Address" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <InputLabel htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all shadow-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="text-sm text-slate-600">Remember for 30 days</span>
                        </label>
                        <a href="#" className="text-sm text-[#f4c430] hover:text-yellow-600 font-medium transition-colors">
                            Forgot?
                        </a>
                    </div>

                    {/* ID Verification Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border border-blue-200 shadow-sm">
                        <button
                            type="button"
                            onClick={() => setShowIDVerification(true)}
                            className="flex items-center gap-3 text-blue-700 hover:text-blue-900 font-medium text-sm transition-colors w-full"
                        >
                            <div className="p-2 rounded-lg bg-blue-200">
                                <Shield className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-slate-900">Verify Your Identity</p>
                                <p className="text-xs text-slate-600 mt-0.5">Build trust with contractors</p>
                            </div>
                        </button>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#f4c430] to-yellow-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center pt-2">
                        <p className="text-slate-600 text-sm">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-[#f4c430] hover:text-yellow-600 font-semibold transition-colors"
                            >
                                Create one
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
