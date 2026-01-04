import React, { useState } from 'react';
import { Upload, Video, X, Check, Loader, Play, Trash2, Edit2, Star, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from "@inertiajs/react";
import VideoCard from './VideoCard';

export default function VideoUploadDashboard({ videos }) {

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploadState, setUploadState] = useState({
    isDragging: false,
    isUploading: false,
    uploadProgress: 0,
    showForm: false
  });

  const { data, setData, post, put, processing, reset } = useForm({
    name: '',
    role: '',
    testimonial: '',
    rating: 5,
    video: null,
    thumbnail: null
  });

  const [editingId, setEditingId] = useState(null);

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setUploadState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragLeave = () => {
    setUploadState(prev => ({ ...prev, isDragging: false }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadState(prev => ({ ...prev, isDragging: false }));

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(f => f.type.startsWith('video/'));

    if (videoFile) {
      handleVideoFile(videoFile);
    }
  };

  // Handle file selection
  const handleVideoFile = (file) => {
    setData('video', file);
    setVideoPreview(URL.createObjectURL(file));
    setUploadState(prev => ({ ...prev, showForm: true }));
  };

  const handleThumbnailFile = (file) => {
    setData('thumbnail', file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Simulate upload with progress
  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadState(prev => ({ ...prev, uploadProgress: progress }));

        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  // const handleSubmit = () => {
  //   const formDataToSend = {
  //     ...data,
  //     video: data.video || videoPreview,         // video file or preview
  //     thumbnail: data.thumbnail || thumbnailPreview,
  //   };

  //   if (editingId) {
  //     put(route('video-testimonials.update', editingId), {
  //       data: formDataToSend,
  //       forceFormData: true,
  //       onSuccess: () => cleanup(),
  //     });
  //   } else {
  //     post(route('video-testimonials.store'), {
  //       data: formDataToSend,
  //       forceFormData: true,
  //       onSuccess: () => cleanup(),
  //     });
  //   }
  // };
  const handleSubmit = () => {
    setUploadState(prev => ({ ...prev, isUploading: true }));

    // Prepare FormData for Inertia
    const formDataToSend = new FormData();
    formDataToSend.append('name', data.name);
    formDataToSend.append('role', data.role);
    formDataToSend.append('testimonial', data.testimonial);
    formDataToSend.append('rating', data.rating);

      // Include video file only if the user selected a new one
    if (data.video) {
      formDataToSend.append('video', data.video);
    }

    // Include thumbnail only if the user selected a new one
    if (data.thumbnail) {
      formDataToSend.append('thumbnail', data.thumbnail);
    }

    if (editingId) {
      put(route('video-testimonials.update', editingId), {
        data: formDataToSend,
        forceFormData: true,
        onSuccess: () => cleanup(),
        onFinish: () => setUploadState(prev => ({ ...prev, isUploading: false })),
      });
    } else {
      post(route('video-testimonials.store'), {
        data: formDataToSend,
        forceFormData: true,
        onSuccess: () => cleanup(),
        onFinish: () => setUploadState(prev => ({ ...prev, isUploading: false })),
      });
    }
  };

  const cleanup = () => {
    reset();
    setVideoPreview(null);
    setThumbnailPreview(null);
    setEditingId(null);
    setUploadState({
      isDragging: false,
      isUploading: false,
      uploadProgress: 0,
      showForm: false,
    });
  };

  // Edit video
  const handleEdit = (video) => {
    setData({
      name: video.name,
      role: video.role,
      testimonial: video.testimonial,
      rating: video.rating,
    });

    setVideoPreview(video.videoUrl);
    setThumbnailPreview(video.thumbnail); // show existing thumbnail
    setEditingId(video.id);
    setUploadState(prev => ({ ...prev, showForm: true }));
  };

  // Delete video
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this video?')) {
      router.delete(route('video-testimonials.destroy', id));
    }
  };

  // Cancel upload/edit
  const handleCancel = () => {
    reset();
    setEditingId(null);
    setUploadState({
      isDragging: false,
      isUploading: false,
      uploadProgress: 0,
      showForm: false,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Manage Video Testimonials" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Video Testimonial Manager
            </h1>
            <p className="text-gray-600">Upload and manage contributor video testimonials</p>
          </div>

          {/* Upload Area */}
          {!uploadState.showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 border-4 border-dashed rounded-3xl p-12 text-center transition-all ${uploadState.isDragging
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 bg-white'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${uploadState.isDragging ? 'bg-yellow-500' : 'bg-gray-200'
                  }`}>
                  <Upload className={`w-10 h-10 ${uploadState.isDragging ? 'text-white' : 'text-gray-500'
                    }`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Drop your video here
                </h3>
                <p className="text-gray-500 mb-6">
                  or click to browse from your device
                </p>
                <label className="cursor-pointer bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-700 transition-all inline-flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Choose Video File
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleVideoFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                <p className="text-sm text-gray-400 mt-4">
                  Supports: MP4, MOV, AVI, WebM (Max 500MB)
                </p>
              </div>
            </motion.div>
          )}

          {/* Upload Form */}
          <AnimatePresence>
            {uploadState.showForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId ? 'Edit Video Details' : 'Add Video Details'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Video Preview */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video Preview
                      </label>
                      <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                        {videoPreview && (
                          <video src={videoPreview}
                            className="w-full h-full object-cover"
                            controls />)}
                      </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Thumbnail (Optional)
                      </label>
                      <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-yellow-500 transition-all">
                        {thumbnailPreview ? (
                          <img src={thumbnailPreview}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Upload Thumbnail</p>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleThumbnailFile(e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contributor Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Role/Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.role}
                        onChange={(e) => setData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Community Volunteer"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Testimonial Text *
                    </label>
                    <textarea
                      required
                      value={data.testimonial}
                      onChange={(e) => setData(prev => ({ ...prev, testimonial: e.target.value }))}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Share their experience and impact..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating: {data.rating} Stars
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setData(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 transition-all ${star <= data.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {uploadState.isUploading && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Uploading...</span>
                        <span className="text-sm font-medium text-yellow-600">
                          {uploadState.uploadProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadState.uploadProgress}%` }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                      disabled={uploadState.isUploading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={uploadState.isUploading}
                      className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {uploadState.isUploading ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          {editingId ? 'Update Video' : 'Publish Video'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Library */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Published Videos ({videos.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {videos.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No videos uploaded yet</p>
                <p className="text-gray-400 text-sm">Start by uploading your first video testimonial</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}