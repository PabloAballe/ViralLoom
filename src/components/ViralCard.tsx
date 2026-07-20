import React, { useState } from 'react';
import { Eye, Clock, ExternalLink, Flame, Tag, Play } from 'lucide-react';
import type { VideoData } from '../types';

interface ViralCardProps {
  video: VideoData;
}

export const ViralCard: React.FC<ViralCardProps> = ({ video }) => {
  const [imgSrc, setImgSrc] = useState(video.thumbnail);
  const [imgError, setImgError] = useState(false);

  const formatViews = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80');
    }
  };

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-brand-500/40 transition-all duration-300">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        <img
          src={imgSrc}
          alt={video.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/30 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* 🔥 VPH Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-brand-600 to-amber-500 text-white shadow-lg shadow-brand-600/30 border border-white/20 animate-pulse-subtle">
            <Flame className="w-3.5 h-3.5 fill-white text-white" />
            <span>{formatViews(video.vph)} VPH</span>
          </div>

          {/* Category Badge */}
          <a
            href={`/categoria/${video.category_slug}`}
            className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-gray-300 border border-white/10 hover:bg-white/20 hover:text-white transition-colors"
          >
            <Tag className="w-3 h-3 text-amber-400" />
            <span>{video.category}</span>
          </a>
        </div>

        {/* Hover Quick Play Icon Overlay */}
        <a
          href={`/video/${video.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
          title="View video details"
        >
          <div className="w-12 h-12 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </a>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Channel Name */}
          <div className="text-xs font-semibold text-brand-500 tracking-wide uppercase">
            {video.channel}
          </div>

          {/* Video Title */}
          <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
            <a href={`/video/${video.id}`}>
              {video.title}
            </a>
          </h3>
        </div>

        {/* Stats Row & Actions */}
        <div className="pt-3 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            {/* Total Views */}
            <div className="flex items-center gap-1.5" title="Total views">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span>{formatViews(video.views)} views</span>
            </div>

            {/* Published Relative Time */}
            <div className="flex items-center gap-1.5" title="Publication time">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{video.published_relative}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href={`/video/${video.id}`}
              className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 transition-colors"
            >
              Details
            </a>

            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/20 transition-all hover:shadow-brand-500/40"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
