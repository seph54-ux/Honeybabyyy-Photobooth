import React from 'react';
import { Camera, Download, Heart, Image as ImageIcon, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

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
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-rose-200/60 shadow-xs w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4 w-full">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 min-w-0 shrink">
          <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-300 p-0.5 shadow-sm sm:shadow-md shadow-rose-200">
            <div className="w-full h-full bg-white rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-rose-500">
              <Camera size={16} className="sm:w-5 sm:h-5 animate-pulse" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-fredoka font-bold text-slate-800 text-sm sm:text-lg lg:text-xl tracking-tight truncate">
                Honeybabyyy Booth
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-fredoka font-semibold bg-rose-100 text-rose-700 shrink-0">
                <Heart size={10} className="fill-rose-500 text-rose-500 mr-1" /> For Geri
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden lg:block truncate">
              Cute photo strips, stickers & romantic memories
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* PWA In-App Mobile Install Button */}
          <PWAInstallButton />

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            {soundEnabled ? <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" /> : <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>

          {/* Reset all button */}
          <button
            onClick={onReset}
            title="Reset to New Strip"
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* Gallery button with count */}
          <button
            onClick={onOpenGallery}
            title="View saved strip gallery"
            className="relative flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-fredoka font-semibold text-xs border border-rose-200 transition-all cursor-pointer"
          >
            <ImageIcon size={15} className="text-rose-500" />
            <span className="hidden md:inline">Gallery</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white text-[9px] sm:text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Instant Download Button */}
          <button
            onClick={onInstantDownload}
            disabled={!hasPhotos || isRendering}
            title="Download photobooth strip"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-400 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-semibold text-xs shadow-xs sm:shadow-md shadow-rose-300/50 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Download size={14} className="sm:w-[15px] sm:h-[15px]" />
            <span className="hidden sm:inline">{isRendering ? 'Rendering...' : 'Download Strip'}</span>
            <span className="sm:hidden">{isRendering ? '...' : 'Download'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
