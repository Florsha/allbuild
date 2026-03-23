import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function CustomAlert({ 
    type = 'success', 
    message = '', 
    title = '',
    isVisible = false,
    onClose = () => {},
    autoClose = true,
    autoCloseDuration = 5000
}) {
    useEffect(() => {
        if (isVisible && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, autoClose, autoCloseDuration, onClose]);

    if (!isVisible) return null;

    const isError = type === 'error';
    const isSuccess = type === 'success';

    const bgColor = isError ? 'bg-gradient-to-br from-red-50 to-red-100' : 'bg-gradient-to-br from-emerald-50 to-teal-50';
    const accentColor = isError ? 'text-red-600' : 'text-emerald-600';
    const titleColor = isError ? 'text-red-900' : 'text-slate-900';
    const textColor = isError ? 'text-red-700' : 'text-slate-600';
    const iconColor = isError ? 'text-red-500' : 'text-emerald-500';
    const buttonPrimary = isError ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700';
    const borderColor = isError ? 'border-red-200' : 'border-emerald-200';

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fadeIn">
            <div className={`${bgColor} border ${borderColor} rounded-2xl shadow-xl max-w-md w-full overflow-hidden`}>
                {/* Header */}
                <div className="flex items-start gap-4 p-7">
                    <div className="flex-shrink-0 mt-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isError ? 'bg-red-200' : 'bg-emerald-200'}`}>
                            {isError ? (
                                <AlertCircle className={`w-6 h-6 ${iconColor}`} />
                            ) : (
                                <CheckCircle className={`w-6 h-6 ${iconColor}`} />
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        {title && (
                            <h3 className={`text-lg font-semibold ${titleColor} mb-2`}>
                                {title}
                            </h3>
                        )}
                        <p className={`${textColor} text-sm leading-relaxed font-normal`}>
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`flex-shrink-0 ${accentColor} hover:opacity-60 transition-opacity p-1`}
                        aria-label="Close alert"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer with Button */}
                <div className="flex gap-3 px-7 pb-7">
                    <button
                        onClick={onClose}
                        className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${textColor} bg-white/60 hover:bg-white border ${borderColor} backdrop-blur-sm`}
                    >
                        Dismiss
                    </button>
                    {isSuccess && (
                        <button
                            onClick={onClose}
                            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg text-white transition-all duration-200 ${buttonPrimary} shadow-md`}
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
