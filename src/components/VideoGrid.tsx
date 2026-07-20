import React, { useState, useMemo } from 'react';
import { ViralCard } from './ViralCard';
import type { VideoData } from '../types';
import { Search, ArrowUpDown, Sparkles, AlertCircle } from 'lucide-react';

interface VideoGridProps {
  initialVideos: VideoData[];
  categoryFilter?: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ initialVideos = [], categoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'vph' | 'views' | 'recent'>('vph');

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...initialVideos];

    if (categoryFilter) {
      result = result.filter(v => v.category_slug === categoryFilter);
    }

    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        v => v.title.toLowerCase().includes(query) || v.channel.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'vph') {
        return b.vph - a.vph;
      } else if (sortBy === 'views') {
        return b.views - a.views;
      } else if (sortBy === 'recent') {
        return (a.hours_ago ?? 999) - (b.hours_ago ?? 999);
      }
      return 0;
    });

    return result;
  }, [initialVideos, categoryFilter, searchTerm, sortBy]);

  const topVph = useMemo(() => {
    return filteredAndSortedVideos.length > 0
      ? Math.max(...filteredAndSortedVideos.map(v => v.vph))
      : 0;
  }, [filteredAndSortedVideos]);

  return (
    <div className="space-y-8">
      {/* Controls & Filter Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search viral video or channel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sorting Dropdown & Counter */}
        <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Top VPH: <strong className="text-white">{topVph.toLocaleString()}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-500" />
              <span>Sort by:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'vph' | 'views' | 'recent')}
              className="bg-black/60 border border-white/10 text-xs font-semibold text-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="vph">🔥 VPH (Views / Hour)</option>
              <option value="views">👁️ Total Views</option>
              <option value="recent">🕒 Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <div>
          Showing <span className="font-bold text-white">{filteredAndSortedVideos.length}</span> of{' '}
          <span className="font-bold text-gray-400">{initialVideos.length}</span> trending videos
        </div>
        {searchTerm && (
          <div>
            Search filter: <span className="text-amber-400">"{searchTerm}"</span>
          </div>
        )}
      </div>

      {/* Video Grid */}
      {filteredAndSortedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedVideos.map((video) => (
            <ViralCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-12 rounded-2xl text-center border border-white/10 space-y-4 my-8">
          <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto border border-brand-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">No viral videos found</h4>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              There are no matches for search query <span className="text-amber-400">"{searchTerm}"</span>. Try another keyword.
            </p>
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors shadow-md shadow-brand-500/20"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
