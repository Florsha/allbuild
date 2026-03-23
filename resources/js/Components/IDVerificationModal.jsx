import React, { useRef, useState } from 'react';
import { X, Upload, Camera, Check, AlertCircle } from 'lucide-react';
import CustomAlert from '@/Components/CustomAlert';

export default function IDVerificationModal({ isOpen, onClose, onVerified }) {
    const [step, setStep] = useState('choice'); // choice, upload, camera, processing, completed
    const [alert, setAlert] = useState({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [idType, setIdType] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const idTypes = ['Passport', 'Driver License', 'National ID', 'Voter ID', 'PRC ID'];

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setAlert({
                isVisible: true,
                type: 'error',
                title: 'Invalid File',
                message: 'Please upload a valid image file.',
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setAlert({
                isVisible: true,
                type: 'error',
                title: 'File Too Large',
                message: 'Image size must be less than 5MB.',
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage({
                file: file,
                preview: e.target.result,
            });
            setStep('processing');
            processIDVerification(file);
        };
        reader.readAsDataURL(file);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStep('camera');
        } catch (error) {
            setAlert({
                isVisible: true,
                type: 'error',
                title: 'Camera Error',
                message: 'Unable to access camera. Please check permissions.',
            });
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);

            canvasRef.current.toBlob((blob) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setUploadedImage({
                        file: blob,
                        preview: e.target.result,
                    });
                    stopCamera();
                    setStep('processing');
                    processIDVerification(blob);
                };
                reader.readAsDataURL(blob);
            });
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
    };

    const processIDVerification = async (file) => {
        try {
            const formData = new FormData();
            formData.append('id_image', file);
            formData.append('id_type', idType);

            const response = await fetch(route('verify-id'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setVerificationStatus({
                    status: 'verified',
                    idNumber: result.data?.detected_id_number || 'Verified',
                    details: result.data,
                });
                setAlert({
                    isVisible: true,
                    type: 'success',
                    title: 'ID Verified Successfully!',
                    message: `Your ${idType} has been verified and registered.`,
                });
                setStep('completed');
                setTimeout(() => {
                    onVerified(result.data);
                }, 2000);
            } else {
                setVerificationStatus({
                    status: 'failed',
                    message: result.message || 'Could not verify ID. Please try again.',
                });
                setAlert({
                    isVisible: true,
                    type: 'error',
                    title: 'Verification Failed',
                    message: result.message || 'Your ID could not be verified. Please try again.',
                });
                setStep('choice');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setAlert({
                isVisible: true,
                type: 'error',
                title: 'Verification Error',
                message: 'An error occurred during verification. Please try again.',
            });
            setStep('choice');
        }
    };

    const handleClose = () => {
        stopCamera();
        setStep('choice');
        setIdType('');
        setUploadedImage(null);
        setVerificationStatus(null);
        onClose();
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
                autoClose={false}
            />

            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
                    {/* Header */}
                    <div className="relative px-8 pt-8 pb-6 border-b border-slate-100">
                        <div>
                            <h2 className="text-3xl font-semibold text-slate-900">Verify Your Identity</h2>
                            <p className="text-slate-500 text-sm mt-2">Secure verification for your account</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors p-1"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Step 1: Choose ID Type */}
                        {step === 'choice' && !idType && (
                            <div className="space-y-5">
                                <p className="text-slate-900 font-semibold text-lg">Select your ID type</p>
                                <div className="grid gap-3">
                                    {idTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setIdType(type)}
                                            className="p-4 border-2 border-slate-300 rounded-xl hover:border-[#f4c430] hover:bg-yellow-50 transition-all text-left font-medium text-slate-900 hover:text-slate-900"
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Choose Upload Method */}
                        {step === 'choice' && idType && (
                            <div className="space-y-5">
                                <p className="text-slate-900 font-semibold text-lg">How would you like to submit your {idType}?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-6 border-2 border-slate-300 rounded-xl hover:border-[#f4c430] hover:bg-yellow-50 transition-all flex flex-col items-center gap-3"
                                    >
                                        <Upload className="w-8 h-8 text-[#f4c430]" />
                                        <span className="font-semibold text-slate-900 text-sm">Upload Photo</span>
                                    </button>
                                    <button
                                        onClick={startCamera}
                                        className="p-6 border-2 border-slate-300 rounded-xl hover:border-[#f4c430] hover:bg-yellow-50 transition-all flex flex-col items-center gap-3"
                                    >
                                        <Camera className="w-8 h-8 text-[#f4c430]" />
                                        <span className="font-semibold text-slate-900 text-sm">Take Photo</span>
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIdType('')}
                                    className="w-full py-2 text-sm text-slate-600 hover:text-slate-900 underline"
                                >
                                    Change ID Type
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </div>
                        )}

                        {/* Step 3: Camera Capture */}
                        {step === 'camera' && (
                            <div className="space-y-4">
                                <p className="text-gray-700 font-medium">Position your {idType} in the frame</p>
                                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <canvas ref={canvasRef} className="hidden" />
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            stopCamera();
                                            setStep('choice');
                                        }}
                                        className="flex-1 py-2 px-4 text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={capturePhoto}
                                        className="flex-1 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                                    >
                                        Capture
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Processing */}
                        {step === 'processing' && (
                            <div className="space-y-4 text-center py-8">
                                <div className="flex justify-center">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium">Verifying your ID...</p>
                                <p className="text-sm text-gray-500">This may take a few moments</p>
                                {uploadedImage && (
                                    <img
                                        src={uploadedImage.preview}
                                        alt="Uploaded ID"
                                        className="w-full max-h-48 object-cover rounded-lg mt-4"
                                    />
                                )}
                            </div>
                        )}

                        {/* Step 5: Completed */}
                        {step === 'completed' && verificationStatus?.status === 'verified' && (
                            <div className="space-y-4 text-center py-8">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Verified!</h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Your {idType} has been successfully verified.
                                    </p>
                                </div>
                                {uploadedImage && (
                                    <img
                                        src={uploadedImage.preview}
                                        alt="Verified ID"
                                        className="w-full max-h-48 object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        )}

                        {/* Step 5: Failed */}
                        {step === 'completed' && verificationStatus?.status === 'failed' && (
                            <div className="space-y-4 text-center py-8">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Verification Failed</h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {verificationStatus.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStep('choice')}
                                    className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {(step === 'choice' || step === 'camera' || step === 'processing' || step === 'completed') && (
                        <div className="border-t border-slate-100 px-8 py-4 bg-slate-50 rounded-b-2xl text-center">
                            <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                                <span>🔒</span> Your ID information is encrypted and secure
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
