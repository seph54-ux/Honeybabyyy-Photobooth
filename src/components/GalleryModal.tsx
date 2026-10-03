import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, Trash2, X, Sparkles, Heart, Share2, Calendar, Eye, BookmarkPlus } from 'lucide-react';
import { CapturedStrip } from '../types/photobooth';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStripDataUrl: string | null;
  savedStrips: CapturedStrip[];
  onDeleteStrip: (id: string) => void;
  onSaveCurrentStrip: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  currentStripDataUrl,
  savedStrips,
  onDeleteStrip,
  onSaveCurrentStrip
}) => {
  const [copied, setCopied] = useState(false);
  const [viewingStripUrl, setViewingStripUrl] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'preview' | 'gallery'>('preview');
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanShare(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Default to viewing current strip if available
      setViewingStripUrl(currentStripDataUrl || (savedStrips.length > 0 ? savedStrips[0].dataUrl : null));
      setMobileTab('preview');
    }
  }, [isOpen, currentStripDataUrl, savedStrips]);

  if (!isOpen) return null;

  const displayUrl = viewingStripUrl || currentStripDataUrl || (savedStrips.length > 0 ? savedStrips[0].dataUrl : null);

  const handleDownload = (dataUrl: string, name = 'honeybabyyy-photobooth') => {
    const link = document.createElement('a');
    link.download = `${name}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    sound.playCelebration();

    // Trigger sweet confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fde047', '#a855f7']
    });
  };

  const handleShare = async (dataUrl: string) => {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'honeybabyyy-photobooth.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Honeybabyyy Booth',
          text: 'Check out our cute photo strip! 💖',
          files: [file]
        });
        sound.playCelebration();
        return;
      }
    } catch (err) {
      // User cancelled share or failed
    }
    // Fallback to copy clipboard
    handleCopyClipboard(dataUrl);
  };

  const handleCopyClipboard = async (dataUrl: string) => {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      sound.playPop();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard directly:', err);
    }
  };

  const isCurrentSaved = savedStrips.some(s => s.dataUrl === currentStripDataUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-rose-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-3.5 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 border-b border-rose-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="p-1 sm:p-1.5 rounded-xl bg-rose-500 text-white shadow-xs shrink-0">
              <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />
            </span>
            <div className="min-w-0">
              <h3 className="font-fredoka font-bold text-slate-800 text-base sm:text-xl truncate">
                Photo Strip Gallery
              </h3>
              <p className="text-[11px] sm:text-xs text-rose-800/80 hidden xs:block truncate">
                Download, print, or save your cute memories! 💖
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-rose-100/60 transition-colors shrink-0"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Mobile View Segmented Switcher (Visible only on < md screens) */}
        <div className="md:hidden flex items-center p-1.5 bg-rose-50/70 border-b border-rose-200/60 shrink-0">
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-1.5 rounded-xl font-fredoka font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-white text-rose-700 shadow-xs border border-rose-200'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            <Eye size={13} />
            <span>Strip Preview</span>
          </button>
          <button
            onClick={() => setMobileTab('gallery')}
            className={`flex-1 py-1.5 rounded-xl font-fredoka font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'gallery'
                ? 'bg-white text-rose-700 shadow-xs border border-rose-200'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            <Calendar size={13} />
            <span>Saved Takes ({savedStrips.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:grid md:grid-cols-12 md:gap-6 items-start">
          
          {/* Main Strip Preview Center */}
          <div className={`${mobileTab === 'preview' ? 'flex' : 'hidden md:flex'} md:col-span-7 flex-col items-center justify-center bg-rose-50/40 rounded-2xl p-3 sm:p-4 border border-rose-100`}>
            {displayUrl ? (
              <div className="relative group max-h-[46vh] sm:max-h-[460px] flex items-center justify-center w-full">
                <img
                  src={displayUrl}
                  alt="Rendered cute photobooth strip"
                  className="max-h-[44vh] sm:max-h-[440px] w-auto max-w-full object-contain rounded-xl shadow-lg transition-transform group-hover:scale-[1.01]"
                />
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12">
                <Heart size={36} className="mx-auto text-rose-300 mb-2 animate-bounce" />
                <p className="font-fredoka text-sm">Snap some photos first to generate your strip!</p>
              </div>
            )}

            {/* Quick Actions for active image */}
            {displayUrl && (
              <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full max-w-md">
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(displayUrl)}
                  className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-400 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download size={16} />
                  <span>Download Strip (PNG)</span>
                </button>

                {/* Secondary buttons container */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Share button on mobile or Copy */}
                  {canShare && (
                    <button
                      onClick={() => handleShare(displayUrl)}
                      title="Share photo strip"
                      className="flex-1 sm:flex-initial py-2.5 sm:py-3 px-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-rose-50 text-rose-800 font-fredoka font-semibold text-xs border border-rose-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 size={14} className="text-rose-500" />
                      <span>Share</span>
                    </button>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopyClipboard(displayUrl)}
                    title="Copy to clipboard"
                    className="flex-1 sm:flex-initial py-2.5 sm:py-3 px-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-rose-50 text-rose-800 font-fredoka font-semibold text-xs border border-rose-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  {/* Save current take button */}
                  {currentStripDataUrl && !isCurrentSaved && (
                    <button
                      onClick={onSaveCurrentStrip}
                      title="Save this take into session gallery"
                      className="flex-1 sm:flex-initial py-2.5 sm:py-3 px-3.5 rounded-xl sm:rounded-2xl bg-rose-100/70 hover:bg-rose-200 text-rose-800 font-fredoka font-semibold text-xs border border-rose-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookmarkPlus size={14} className="text-rose-600" />
                      <span>Save</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quick Strip Switcher on Mobile (so users can switch strips without leaving preview tab!) */}
            {savedStrips.length > 0 && (
              <div className="md:hidden w-full mt-3 pt-2.5 border-t border-rose-100">
                <div className="text-[11px] font-fredoka font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
                  <span>Switch Strip:</span>
                  <button
                    onClick={() => setMobileTab('gallery')}
                    className="text-rose-600 hover:underline"
                  >
                    View All ({savedStrips.length}) →
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {currentStripDataUrl && (
                    <button
                      onClick={() => setViewingStripUrl(currentStripDataUrl)}
                      className={`shrink-0 p-1 rounded-lg border-2 transition-all ${
                        displayUrl === currentStripDataUrl
                          ? 'border-rose-500 ring-2 ring-rose-300'
                          : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img src={currentStripDataUrl} alt="Current" className="h-14 w-8 object-cover rounded" />
                    </button>
                  )}
                  {savedStrips.map((strip) => (
                    <button
                      key={strip.id}
                      onClick={() => setViewingStripUrl(strip.dataUrl)}
                      className={`shrink-0 p-1 rounded-lg border-2 transition-all ${
                        displayUrl === strip.dataUrl
                          ? 'border-rose-500 ring-2 ring-rose-300'
                          : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img src={strip.dataUrl} alt={strip.themeName} className="h-14 w-8 object-cover rounded" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Saved History Strips sidebar (Shown in Tab on Mobile, side-by-side on md+) */}
          <div className={`${mobileTab === 'gallery' ? 'flex' : 'hidden md:flex'} md:col-span-5 flex-col h-full mt-3 md:mt-0`}>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="font-fredoka font-semibold text-slate-700 text-xs sm:text-sm flex items-center gap-1.5">
                <Calendar size={14} className="text-rose-500" />
                <span>Session Gallery ({savedStrips.length})</span>
              </h4>
              {currentStripDataUrl && !isCurrentSaved && (
                <button
                  onClick={onSaveCurrentStrip}
                  className="text-xs font-fredoka font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <BookmarkPlus size={13} />
                  <span>+ Save current take</span>
                </button>
              )}
            </div>

            {savedStrips.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs flex flex-col items-center gap-1">
                <Heart size={20} className="text-rose-300 mb-1" />
                <span>No saved strips yet.</span>
                <span className="text-[11px] text-slate-400">Your saved strips will appear here during this session.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-h-[60vh] md:max-h-[420px] overflow-y-auto pr-1">
                {savedStrips.map((strip) => {
                  const isSelected = displayUrl === strip.dataUrl;
                  return (
                    <div
                      key={strip.id}
                      onClick={() => {
                        setViewingStripUrl(strip.dataUrl);
                        // On mobile, automatically show preview tab when tapped
                        setMobileTab('preview');
                        sound.playPop();
                      }}
                      className={`group relative p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer bg-white ${
                        isSelected
                          ? 'border-rose-500 ring-2 ring-rose-300 shadow-md'
                          : 'border-slate-200 hover:border-rose-300 shadow-xs'
                      }`}
                    >
                      <img
                        src={strip.dataUrl}
                        alt={strip.themeName}
                        className="w-full h-28 sm:h-32 object-cover rounded-lg shadow-xs"
                      />
                      <div className="mt-1 flex items-center justify-between gap-1">
                        <span className="text-[10px] font-fredoka font-medium text-slate-700 truncate">
                          {strip.themeName}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(strip.dataUrl, strip.themeName.toLowerCase().replace(/\s+/g, '-'));
                            }}
                            title="Download this strip"
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          >
                            <Download size={12} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteStrip(strip.id);
                            }}
                            title="Delete strip"
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
