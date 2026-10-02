import React, { useRef, useState, useEffect } from 'react';
import { Trash2, RotateCw, FlipHorizontal, ZoomIn, ZoomOut, Camera, X } from 'lucide-react';
import { PhotoboothConfig, PlacedSticker } from '../types/photobooth';
import { COLOR_FILTERS, LAYOUT_OPTIONS } from '../data/presets';
import { STICKERS } from '../data/stickers';
import { sound } from '../utils/audio';

interface StripPreviewProps {
  photos: (string | null)[];
  config: PhotoboothConfig;
  activeSlotIndex: number;
  onSelectSlot: (index: number) => void;
  onClearSlot: (index: number) => void;
  onUpdateSticker: (instanceId: string, updates: Partial<PlacedSticker>) => void;
  onRemoveSticker: (instanceId: string) => void;
  selectedStickerId: string | null;
  onSelectSticker: (instanceId: string | null) => void;
}

export const StripPreview: React.FC<StripPreviewProps> = ({
  photos,
  config,
  activeSlotIndex,
  onSelectSlot,
  onClearSlot,
  onUpdateSticker,
  onRemoveSticker,
  selectedStickerId,
  onSelectSticker,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingInstanceId, setDraggingInstanceId] = useState<string | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  const layoutOpt = LAYOUT_OPTIONS.find(l => l.id === config.layout) || LAYOUT_OPTIONS[0];
  const photoCount = layoutOpt.photoCount;
  const cols = layoutOpt.cols;
  const activeFilter = COLOR_FILTERS.find(f => f.id === config.currentFilterId);

  // Dragging sticker logic with mouse & touch
  const handlePointerDown = (e: React.PointerEvent, sticker: PlacedSticker) => {
    e.stopPropagation();
    onSelectSticker(sticker.instanceId);
    setDraggingInstanceId(sticker.instanceId);

    const clientX = e.clientX;
    const clientY = e.clientY;

    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initX: sticker.x,
      initY: sticker.y
    };

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingInstanceId || !dragStartRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartRef.current.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.startY) / rect.height) * 100;

    let newX = Math.max(5, Math.min(95, dragStartRef.current.initX + deltaX));
    let newY = Math.max(5, Math.min(95, dragStartRef.current.initY + deltaY));

    onUpdateSticker(draggingInstanceId, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingInstanceId) {
      setDraggingInstanceId(null);
      dragStartRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Safe catch
      }
    }
  };

  // Font family class resolver
  const getFontFamilyClass = () => {
    switch (config.font) {
      case 'fredoka': return 'font-fredoka';
      case 'caveat': return 'font-caveat';
      case 'pacifico': return 'font-pacifico';
      case 'gaegu': return 'font-gaegu';
      case 'indie': return 'font-indie';
      case 'playfair': return 'font-playfair';
      default: return 'font-quicksand';
    }
  };

  // Pattern style resolver
  const getPatternClass = () => {
    switch (config.pattern) {
      case 'dots': return 'pattern-polka-dots';
      case 'gingham': return 'pattern-gingham';
      case 'hearts': return 'pattern-hearts';
      case 'grid': return 'pattern-grid';
      default: return '';
    }
  };

  const selectedSticker = config.placedStickers.find(s => s.instanceId === selectedStickerId);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Interactive Photo Strip Card */}
      <div
        ref={containerRef}
        onClick={() => onSelectSticker(null)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full max-w-[340px] sm:max-w-[380px] p-4 sm:p-5 transition-all shadow-2xl select-none touch-none ${getPatternClass()}`}
        style={{
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          borderStyle: config.borderStyle === 'scalloped' || config.borderStyle === 'stamp' ? 'solid' : (config.borderStyle === 'none' ? 'solid' : config.borderStyle),
          borderWidth: `${config.borderWidth}px`,
          borderRadius: `${config.borderRadius}px`,
          color: config.patternColor
        }}
      >
        {/* Scalloped decorative edge if selected */}
        {config.borderStyle === 'scalloped' && (
          <div className="absolute -inset-1.5 border-2 border-dashed border-pink-400/60 rounded-[inherit] pointer-events-none" />
        )}

        {/* Photo Slots Grid */}
        <div
          className={`grid gap-3 ${
            cols === 2 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {Array.from({ length: photoCount }).map((_, idx) => {
            const photoUrl = photos[idx];
            const isActive = activeSlotIndex === idx;

            return (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSlot(idx);
                }}
                className={`group relative overflow-hidden rounded-xl bg-white shadow-sm border transition-all cursor-pointer ${
                  photoCount === 1 ? 'aspect-square' : 'aspect-[4/3]'
                } ${
                  isActive
                    ? 'ring-3 ring-rose-400 ring-offset-2 border-rose-300'
                    : 'border-slate-200/80 hover:border-rose-300'
                }`}
              >
                {photoUrl ? (
                  <>
                    <img
                      src={photoUrl}
                      alt={`Photobooth capture ${idx + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: activeFilter && activeFilter.cssFilter !== 'none' ? activeFilter.cssFilter : undefined
                      }}
                    />
                    {/* Hover Overlay with Retake & Clear */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSlot(idx);
                        }}
                        className="px-2.5 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-semibold shadow-md hover:bg-rose-50 flex items-center gap-1"
                      >
                        <Camera size={13} /> Retake
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClearSlot(idx);
                        }}
                        className="p-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 shadow-md"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-50/70 border-dashed border border-slate-300 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                      isActive ? 'bg-rose-500 text-white animate-bounce' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 font-fredoka">
                      {isActive ? 'Ready to snap!' : 'Tap to select'}
                    </span>
                  </div>
                )}

                {/* Active marker pill */}
                {isActive && (
                  <div className="absolute top-1.5 left-1.5 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    ACTIVE
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Typography & Love Note */}
        <div className="mt-4 pt-2 text-center select-none" style={{ color: config.textColor }}>
          <h3 className={`text-xl sm:text-2xl font-bold tracking-wide leading-tight ${getFontFamilyClass()}`}>
            {config.title || 'Forever & Always'}
          </h3>
          {config.subtitle && (
            <p className={`text-xs sm:text-sm mt-0.5 opacity-90 ${getFontFamilyClass()}`}>
              {config.subtitle}
            </p>
          )}
          {config.showDate && config.dateText && (
            <div className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-mono tracking-wider font-semibold">
              {config.dateText}
            </div>
          )}
        </div>

        {/* Placed Stickers Layer */}
        {config.placedStickers.map((sticker) => {
          const stickerDef = STICKERS.find(s => s.id === sticker.stickerId);
          if (!stickerDef) return null;
          const isSelected = selectedStickerId === sticker.instanceId;

          return (
            <div
              key={sticker.instanceId}
              onPointerDown={(e) => handlePointerDown(e, sticker)}
              className={`absolute cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-30 transition-shadow ${
                isSelected ? 'ring-2 ring-rose-500 ring-offset-2 rounded-xl bg-white/30 backdrop-blur-xs shadow-lg' : ''
              }`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                width: `${54 * sticker.scale}px`,
                height: `${54 * sticker.scale}px`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) ${sticker.flipped ? 'scaleX(-1)' : ''}`
              }}
            >
              {stickerDef.svgContent ? (
                <div
                  className="w-full h-full pointer-events-none drop-shadow-md select-none"
                  dangerouslySetInnerHTML={{ __html: stickerDef.svgContent }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl select-none drop-shadow-md">
                  {stickerDef.emoji}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Sticker Action Bar when a sticker is selected */}
      {selectedSticker && (
        <div className="mt-3 flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-rose-200 text-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => onUpdateSticker(selectedSticker.instanceId, { scale: Math.min(2.5, selectedSticker.scale + 0.15) })}
            title="Enlarge Sticker"
            className="p-1.5 rounded-xl hover:bg-rose-100 text-rose-700 transition-colors"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => onUpdateSticker(selectedSticker.instanceId, { scale: Math.max(0.6, selectedSticker.scale - 0.15) })}
            title="Shrink Sticker"
            className="p-1.5 rounded-xl hover:bg-rose-100 text-rose-700 transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => onUpdateSticker(selectedSticker.instanceId, { rotation: (selectedSticker.rotation + 30) % 360 })}
            title="Rotate Sticker"
            className="p-1.5 rounded-xl hover:bg-rose-100 text-rose-700 transition-colors"
          >
            <RotateCw size={16} />
          </button>
          <button
            onClick={() => onUpdateSticker(selectedSticker.instanceId, { flipped: !selectedSticker.flipped })}
            title="Flip Sticker"
            className="p-1.5 rounded-xl hover:bg-rose-100 text-rose-700 transition-colors"
          >
            <FlipHorizontal size={16} />
          </button>
          <div className="w-px h-5 bg-rose-200" />
          <button
            onClick={() => {
              onRemoveSticker(selectedSticker.instanceId);
              sound.playPop();
            }}
            title="Delete Sticker"
            className="p-1.5 rounded-xl hover:bg-red-100 text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => onSelectSticker(null)}
            title="Deselect"
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
