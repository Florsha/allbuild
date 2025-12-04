import React, { useState } from 'react';
import { Upload, Video, X, Check, Loader, Play, Trash2, Edit2, Star, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from "@inertiajs/react";

export default function VideoUploadDashboard() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "Maria Rodriguez",
      role: "Community Leader",
      testimonial: "This platform changed how we organize volunteers in our city!",
      rating: 5,
      videoUrl: "https://example.com/video1.mp4",
      thumbnail: "https://via.placeholder.com/640x360?text=Maria's+Story",
      duration: "2:30",
      uploadDate: "2024-11-15",
      status: "published"
    }
  ]);

  const [uploadState, setUploadState] = useState({
    isDragging: false,
    isUploading: false,
    uploadProgress: 0,
    showForm: false
  });

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    testimonial: '',
    rating: 5,
    videoFile: null,
    thumbnailFile: null,
    videoPreview: null,
    thumbnailPreview: null
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
    const videoUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      videoFile: file,
      videoPreview: videoUrl
    }));
    setUploadState(prev => ({ ...prev, showForm: true }));
  };

  const handleThumbnailFile = (file) => {
    const thumbnailUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      thumbnailFile: file,
      thumbnailPreview: thumbnailUrl
    }));
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

  // Handle form submission
  const handleSubmit = async () => {
    setUploadState(prev => ({ ...prev, isUploading: true }));
    
    await simulateUpload();
    
    const newVideo = {
      id: editingId || Date.now(),
      name: formData.name,
      role: formData.role,
      testimonial: formData.testimonial,
      rating: formData.rating,
      videoUrl: formData.videoPreview,
      thumbnail: formData.thumbnailPreview || formData.videoPreview,
      duration: "2:30", // In real app, extract from video
      uploadDate: new Date().toISOString().split('T')[0],
      status: "published"
    };

    if (editingId) {
      setVideos(prev => prev.map(v => v.id === editingId ? newVideo : v));
      setEditingId(null);
    } else {
      setVideos(prev => [...prev, newVideo]);
    }

    // Reset form
    setFormData({
      name: '',
      role: '',
      testimonial: '',
      rating: 5,
      videoFile: null,
      thumbnailFile: null,
      videoPreview: null,
      thumbnailPreview: null
    });
    
    setUploadState({
      isDragging: false,
      isUploading: false,
      uploadProgress: 0,
      showForm: false
    });
  };

  // Edit video
  const handleEdit = (video) => {
    setFormData({
      name: video.name,
      role: video.role,
      testimonial: video.testimonial,
      rating: video.rating,
      videoFile: null,
      thumbnailFile: null,
      videoPreview: video.videoUrl,
      thumbnailPreview: video.thumbnail
    });
    setEditingId(video.id);
    setUploadState(prev => ({ ...prev, showForm: true }));
  };

  // Delete video
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
  };

  // Cancel upload/edit
  const handleCancel = () => {
    setFormData({
      name: '',
      role: '',
      testimonial: '',
      rating: 5,
      videoFile: null,
      thumbnailFile: null,
      videoPreview: null,
      thumbnailPreview: null
    });
    setEditingId(null);
    setUploadState({
      isDragging: false,
      isUploading: false,
      uploadProgress: 0,
      showForm: false
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
            className={`mb-8 border-4 border-dashed rounded-3xl p-12 text-center transition-all ${
              uploadState.isDragging 
                ? 'border-yellow-500 bg-yellow-50' 
                : 'border-gray-300 bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                uploadState.isDragging ? 'bg-yellow-500' : 'bg-gray-200'
              }`}>
                <Upload className={`w-10 h-10 ${
                  uploadState.isDragging ? 'text-white' : 'text-gray-500'
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
                      {formData.videoPreview && (
                        <video
                          src={formData.videoPreview}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom Thumbnail (Optional)
                    </label>
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-yellow-500 transition-all">
                      {formData.thumbnailPreview ? (
                        <img
                          src={formData.thumbnailPreview}
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
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
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
                    value={formData.testimonial}
                    onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Share their experience and impact..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating: {formData.rating} Stars
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-all ${
                            star <= formData.rating
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
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-900 group">
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-yellow-600 mr-2" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{video.name}</h3>
                        <p className="text-sm text-gray-500">{video.role}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    "{video.testimonial}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: video.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{video.uploadDate}</span>
                  </div>
                </div>
              </motion.div>
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