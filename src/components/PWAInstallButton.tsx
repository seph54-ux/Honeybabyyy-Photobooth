import React, { useState } from 'react';
import { Smartphone, Download, Share2, PlusSquare, X, Heart, Sparkles, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sound } from '../utils/audio';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running in standalone mode (installed as an app), hide install trigger
  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-fredoka font-semibold">
        <Check size={12} strokeWidth={3} />
        <span>App Installed</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    sound.playPop();
    setIsInstalling(true);
    await install();
    setIsInstalling(false);
  };

  const handleIOSClick = () => {
    sound.playPop();
    setShowIOSGuide(true);
  };

  return (
    <>
      {/* Android / Chromium / Desktop Install Button */}
      {isInstallable && (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          title="Install Honeybabyyy Booth onto your home screen"
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-semibold text-[11px] sm:text-xs shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <Smartphone size={13} />
          <span className="hidden xs:inline">Install</span>
        </button>
      )}

      {/* iOS Safari Install Button */}
      {isIOS && !isInstallable && (
        <button
          onClick={handleIOSClick}
          title="Install Honeybabyyy Booth on iPhone / iPad"
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-fredoka font-semibold text-[11px] sm:text-xs border border-rose-300 transition-all cursor-pointer shrink-0"
        >
          <Smartphone size={13} className="text-rose-600" />
          <span className="hidden xs:inline">Install</span>
        </button>
      )}

      {/* iOS Safari Step-by-Step Installation Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-rose-200 relative animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-rose-50 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
                <Heart size={24} className="fill-white" />
              </div>
              <div>
                <h3 className="font-fredoka font-bold text-slate-800 text-base">
                  Install on iPhone / iPad
                </h3>
                <p className="text-xs text-rose-600 font-medium">
                  Add Honeybabyyy Booth to Home Screen
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3 my-4 bg-rose-50/60 p-4 rounded-2xl border border-rose-100 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-fredoka font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="pt-0.5">
                  Tap the <strong className="text-rose-700 font-semibold inline-flex items-center gap-1">Share <Share2 size={12} className="inline text-rose-600" /></strong> button in the bottom Safari bar.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-fredoka font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="pt-0.5">
                  Scroll down the menu and tap <strong className="text-rose-700 font-semibold inline-flex items-center gap-1">Add to Home Screen <PlusSquare size={12} className="inline text-rose-600" /></strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-fredoka font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="pt-0.5">
                  Tap <strong className="text-rose-700 font-semibold">Add</strong> in the top right corner. The booth icon will appear on your home screen!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-fredoka font-semibold text-xs shadow-md hover:from-rose-600 hover:to-pink-600 transition-all cursor-pointer"
            >
              Got it, let's snap photos! 💖
            </button>
          </div>
        </div>
      )}
    </>
  );
};
