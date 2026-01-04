import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Trash2, Edit2, Star, User } from 'lucide-react';

export default function VideoCard({ video, onEdit, onDelete }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Video */}
      <div
        className="relative aspect-video bg-gray-900 cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        {isPlaying ? (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* <img
              src={video.thumbnail}
              alt={video.name}
              className="w-full h-full object-cover"
            /> */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <User className="w-8 h-8 text-yellow-600 mr-2" />
            <div>
              <h3 className="font-semibold">{video.name}</h3>
              <p className="text-sm text-gray-500">{video.role}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button onClick={() => onEdit(video)}>
              <Edit2 className="w-4 h-4 text-gray-400 hover:text-yellow-600" />
            </button>
            <button onClick={() => onDelete(video.id)}>
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          "{video.testimonial}"
        </p>

        <div className="flex justify-between items-center">
          <div className="flex">
            {Array.from({ length: video.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-400">{video.uploadDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
