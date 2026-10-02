import React from 'react';
import { Camera, Download, Heart, Image as ImageIcon, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenGallery: () => void;
  onInstantDownload: () => void;
  onReset: () => void;
  savedCount: number;
  hasPhotos: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isRendering: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGallery,
  onInstantDownload,
  onReset,
  savedCount,
  hasPhotos,
  soundEnabled,
  onToggleSound,
  isRendering
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-300 p-0.5 shadow-md shadow-rose-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-rose-500">
              <Camera size={20} className="animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-fredoka font-bold text-slate-800 text-lg sm:text-xl tracking-tight">
                Honeybabyyy Booth
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-fredoka font-semibold bg-rose-100 text-rose-700">
                <Heart size={10} className="fill-rose-500 text-rose-500 mr-1" /> For Geri
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Cute photo strips, stickers & romantic memories
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Reset all button */}
          <button
            onClick={onReset}
            title="Reset to New Strip"
            className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <RotateCcw size={18} />
          </button>

          {/* Gallery button with count */}
          <button
            onClick={onOpenGallery}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-fredoka font-semibold text-xs border border-rose-200 transition-all cursor-pointer"
          >
            <ImageIcon size={15} className="text-rose-500" />
            <span className="hidden sm:inline">Gallery</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Instant Download Button */}
          <button
            onClick={onInstantDownload}
            disabled={!hasPhotos || isRendering}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-400 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-semibold text-xs shadow-md shadow-rose-300/50 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={15} />
            <span>{isRendering ? 'Rendering...' : 'Download Strip'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
