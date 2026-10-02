import React, { useState } from 'react';
import { Download, Copy, Check, Trash2, X, Sparkles, Heart, Share2, Calendar } from 'lucide-react';
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

  if (!isOpen) return null;

  const displayUrl = viewingStripUrl || currentStripDataUrl;

  const handleDownload = (dataUrl: string, name = 'our-cute-photobooth') => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border-2 border-rose-200 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 border-b border-rose-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-500 text-white shadow-xs">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="font-fredoka font-bold text-slate-800 text-lg sm:text-xl">
                Photo Strip Gallery & Download
              </h3>
              <p className="text-xs text-rose-800/80">
                High-resolution ready for download, printing, or sharing with your love!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Main Strip Preview Center */}
          <div className="md:col-span-7 flex flex-col items-center justify-center bg-rose-50/40 rounded-2xl p-4 border border-rose-100 min-h-[380px]">
            {displayUrl ? (
              <div className="relative group max-h-[500px] flex items-center justify-center">
                <img
                  src={displayUrl}
                  alt="Rendered cute photobooth strip"
                  className="max-h-[480px] w-auto object-contain rounded-xl shadow-xl transition-transform group-hover:scale-[1.01]"
                />
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <Heart size={36} className="mx-auto text-rose-300 mb-2 animate-bounce" />
                <p className="font-fredoka text-sm">Snap some photos first to generate your strip!</p>
              </div>
            )}

            {/* Quick Actions for active image */}
            {displayUrl && (
              <div className="mt-5 flex items-center gap-3 w-full max-w-sm">
                <button
                  onClick={() => handleDownload(displayUrl)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-400 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download size={18} />
                  <span>Download Strip (PNG)</span>
                </button>
                <button
                  onClick={() => handleCopyClipboard(displayUrl)}
                  title="Copy to clipboard"
                  className="py-3 px-4 rounded-2xl bg-white hover:bg-rose-50 text-rose-800 font-semibold text-xs border border-rose-200 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Saved History Strips sidebar */}
          <div className="md:col-span-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-fredoka font-semibold text-slate-700 text-sm flex items-center gap-1.5">
                <Calendar size={15} className="text-rose-500" />
                <span>Session Gallery ({savedStrips.length})</span>
              </h4>
              {currentStripDataUrl && (
                <button
                  onClick={onSaveCurrentStrip}
                  className="text-xs font-fredoka font-medium text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                >
                  + Save current take
                </button>
              )}
            </div>

            {savedStrips.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                Saved photo strips will appear here during this session.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {savedStrips.map((strip) => (
                  <div
                    key={strip.id}
                    onClick={() => setViewingStripUrl(strip.dataUrl)}
                    className={`group relative p-2 rounded-xl border transition-all cursor-pointer bg-white ${
                      viewingStripUrl === strip.dataUrl
                        ? 'border-rose-500 ring-2 ring-rose-400'
                        : 'border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    <img
                      src={strip.dataUrl}
                      alt={strip.themeName}
                      className="w-full h-32 object-cover rounded-lg shadow-xs"
                    />
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-slate-600 truncate max-w-[80px]">
                        {strip.themeName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteStrip(strip.id);
                        }}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
