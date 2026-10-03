import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CameraView } from './components/CameraView';
import { StripPreview } from './components/StripPreview';
import { CustomizerToolbar } from './components/CustomizerToolbar';
import { GalleryModal } from './components/GalleryModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  PhotoboothConfig, 
  CapturedStrip, 
  PlacedSticker, 
  StickerCategory,
  LayoutType 
} from './types/photobooth';
import { THEMES, LAYOUT_OPTIONS, COLOR_FILTERS } from './data/presets';
import { STICKERS } from './data/stickers';
import { renderPhotoboothCanvas } from './utils/canvasRenderer';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Wand2, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'sweetheart_saved_strips';

export default function App() {
  // Current Layout & Photobooth Configuration
  const [config, setConfig] = useState<PhotoboothConfig>(() => {
    const defaultTheme = THEMES[0]; // Puung Cozy Love
    return {
      layout: 'strip-4',
      countdownSeconds: 3,
      currentFilterId: defaultTheme.defaultFilter,
      themeId: defaultTheme.id,
      bgColor: defaultTheme.bgColor,
      borderColor: defaultTheme.borderColor,
      borderStyle: defaultTheme.borderStyle,
      borderWidth: 4,
      borderRadius: 20,
      pattern: defaultTheme.pattern,
      patternColor: defaultTheme.patternColor,
      font: defaultTheme.font,
      textColor: defaultTheme.textColor,
      title: defaultTheme.defaultTitle,
      subtitle: defaultTheme.defaultSubtitle,
      showDate: true,
      dateText: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      placedStickers: [
        // Default fun stickers: Puung hug, Minion Bob, Kawaii Peach Cat, Sweet Cherries
        {
          instanceId: 'default-1',
          stickerId: 'puung-hug',
          category: 'puung',
          x: 88,
          y: 18,
          scale: 1.15,
          rotation: 8,
          flipped: false
        },
        {
          instanceId: 'default-2',
          stickerId: 'minion-bob',
          category: 'minions',
          x: 12,
          y: 45,
          scale: 1.1,
          rotation: -6,
          flipped: false
        },
        {
          instanceId: 'default-3',
          stickerId: 'cat-kawaii-peach',
          category: 'cats',
          x: 88,
          y: 68,
          scale: 1.15,
          rotation: 12,
          flipped: false
        },
        {
          instanceId: 'default-4',
          stickerId: 'girl-heart-hands',
          category: 'cutegirl',
          x: 14,
          y: 88,
          scale: 1.05,
          rotation: -8,
          flipped: false
        }
      ],
      mirrorCamera: true,
      soundEnabled: true
    };
  });

  // Photo slots array (null for unfilled slots)
  const currentLayoutOpt = LAYOUT_OPTIONS.find(l => l.id === config.layout) || LAYOUT_OPTIONS[0];
  const totalSlots = currentLayoutOpt.photoCount;
  const [photos, setPhotos] = useState<(string | null)[]>(() => Array(totalSlots).fill(null));
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);

  // Selected sticker on strip for moving/resizing
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Auto-sequence capture state
  const [isCapturingSequence, setIsCapturingSequence] = useState<boolean>(false);

  // Saved strips history & gallery modal
  const [savedStrips, setSavedStrips] = useState<CapturedStrip[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentStripDataUrl, setCurrentStripDataUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  // Keep photos array in sync when layout changes
  useEffect(() => {
    setPhotos(prev => {
      if (prev.length === totalSlots) return prev;
      const next = Array(totalSlots).fill(null);
      for (let i = 0; i < Math.min(prev.length, totalSlots); i++) {
        next[i] = prev[i];
      }
      return next;
    });
    if (activeSlotIndex >= totalSlots) {
      setActiveSlotIndex(0);
    }
  }, [totalSlots, activeSlotIndex]);

  // Sync sound class
  useEffect(() => {
    sound.enabled = config.soundEnabled;
  }, [config.soundEnabled]);

  // Update Config partial
  const handleUpdateConfig = (updates: Partial<PhotoboothConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Add Sticker to strip
  const handleAddSticker = (stickerId: string, category: StickerCategory) => {
    const newSticker: PlacedSticker = {
      instanceId: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      stickerId,
      category,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
      scale: 1,
      rotation: Math.floor(Math.random() * 20) - 10,
      flipped: false
    };

    setConfig(prev => ({
      ...prev,
      placedStickers: [...prev.placedStickers, newSticker]
    }));
    setSelectedStickerId(newSticker.instanceId);
  };

  // Update Sticker properties
  const handleUpdateSticker = (instanceId: string, updates: Partial<PlacedSticker>) => {
    setConfig(prev => ({
      ...prev,
      placedStickers: prev.placedStickers.map(s => 
        s.instanceId === instanceId ? { ...s, ...updates } : s
      )
    }));
  };

  // Remove Sticker
  const handleRemoveSticker = (instanceId: string) => {
    setConfig(prev => ({
      ...prev,
      placedStickers: prev.placedStickers.filter(s => s.instanceId !== instanceId)
    }));
    if (selectedStickerId === instanceId) {
      setSelectedStickerId(null);
    }
  };

  // Clear all stickers
  const handleClearAllStickers = () => {
    setConfig(prev => ({ ...prev, placedStickers: [] }));
    setSelectedStickerId(null);
    sound.playPop();
  };

  // Apply Theme preset
  const handleApplyTheme = (themeId: string) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;

    setConfig(prev => ({
      ...prev,
      themeId: theme.id,
      bgColor: theme.bgColor,
      borderColor: theme.borderColor,
      borderStyle: theme.borderStyle,
      pattern: theme.pattern,
      patternColor: theme.patternColor,
      font: theme.font,
      textColor: theme.textColor,
      currentFilterId: theme.defaultFilter,
      title: theme.defaultTitle,
      subtitle: theme.defaultSubtitle
    }));
  };

  // When a photo is captured for a slot
  const handlePhotoCaptured = useCallback((slotIndex: number, dataUrl: string) => {
    setPhotos(prev => {
      const next = [...prev];
      next[slotIndex] = dataUrl;
      return next;
    });

    // Advance to next slot automatically if not in sequence
    if (!isCapturingSequence && slotIndex < totalSlots - 1) {
      setActiveSlotIndex(slotIndex + 1);
    }
  }, [isCapturingSequence, totalSlots]);

  // Clear a photo slot
  const handleClearSlot = (index: number) => {
    setPhotos(prev => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setActiveSlotIndex(index);
    sound.playPop();
  };

  // Reset entire strip
  const handleReset = () => {
    if (confirm('Start a fresh new photobooth strip?')) {
      setPhotos(Array(totalSlots).fill(null));
      setActiveSlotIndex(0);
      sound.playPop();
    }
  };

  // Generate rendered high-res strip
  const generateExport = async (): Promise<string | null> => {
    setIsRendering(true);
    try {
      const dataUrl = await renderPhotoboothCanvas(photos, config);
      setCurrentStripDataUrl(dataUrl);
      return dataUrl;
    } catch (err) {
      console.error('Failed to generate strip', err);
      return null;
    } finally {
      setIsRendering(false);
    }
  };

  // Instant Download Action
  const handleInstantDownload = async () => {
    const dataUrl = await generateExport();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `sweetheart-booth-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      sound.playCelebration();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#fde047', '#a855f7']
      });
    }
  };

  // Open Gallery modal
  const handleOpenGallery = async () => {
    await generateExport();
    setIsGalleryOpen(true);
  };

  // Save current strip into local session history
  const handleSaveCurrentStrip = () => {
    if (!currentStripDataUrl) return;
    const currentTheme = THEMES.find(t => t.id === config.themeId)?.name || 'Custom Theme';
    const newStrip: CapturedStrip = {
      id: `strip-${Date.now()}`,
      createdAt: Date.now(),
      dataUrl: currentStripDataUrl,
      layout: config.layout,
      photosCount: photos.filter(Boolean).length,
      themeName: currentTheme
    };

    const updated = [newStrip, ...savedStrips];
    setSavedStrips(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota safe
    }
    sound.playCelebration();
  };

  // Delete from saved strips
  const handleDeleteSavedStrip = (id: string) => {
    const updated = savedStrips.filter(s => s.id !== id);
    setSavedStrips(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Safe
    }
  };

  // Pre-load Cute Demo Photos for girlfriend to preview instantly!
  const loadDemoPhotos = () => {
    // Generate lovely cute pastel placeholder avatars with canvas
    const sampleColors = [
      { bg: '#fed7aa', text: 'Sweet smiles 😊', sub: 'phil & his girl' },
      { bg: '#fbcfe8', text: 'Making silly faces 😜', sub: 'best day together' },
      { bg: '#bbf7d0', text: 'Peace & Love ✌️', sub: 'holding hands' },
      { bg: '#fed7e2', text: 'Forehead Kiss 😘', sub: 'forever & always' },
      { bg: '#e9d5ff', text: 'Cat cafe cuddles 🐾', sub: 'purrfect date' },
      { bg: '#fef08a', text: 'Bello Banana 🍌', sub: 'minions moment' }
    ];

    const demoUrls: string[] = [];
    sampleColors.slice(0, totalSlots).forEach((item, idx) => {
      const c = document.createElement('canvas');
      c.width = 640;
      c.height = 480;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = item.bg;
        ctx.fillRect(0, 0, 640, 480);
        // Cute hearts in background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = 'bold 120px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('❤️', 320, 260);

        ctx.fillStyle = '#374151';
        ctx.font = 'bold 36px "Fredoka", sans-serif';
        ctx.fillText(item.text, 320, 360);
        ctx.font = '22px "Quicksand", sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText(item.sub, 320, 400);

        demoUrls.push(c.toDataURL('image/jpeg', 0.9));
      }
    });

    setPhotos(demoUrls);
    sound.playCelebration();
  };

  const activeFilter = COLOR_FILTERS.find(f => f.id === config.currentFilterId) || COLOR_FILTERS[0];
  const hasPhotos = photos.some(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-amber-50/40">
      {/* Top Navbar */}
      <Navbar
        onOpenGallery={handleOpenGallery}
        onInstantDownload={handleInstantDownload}
        onReset={handleReset}
        savedCount={savedStrips.length}
        hasPhotos={hasPhotos}
        soundEnabled={config.soundEnabled}
        onToggleSound={() => handleUpdateConfig({ soundEnabled: !config.soundEnabled })}
        isRendering={isRendering}
      />

      {/* Hero Welcome Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 w-full">
        <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 rounded-3xl p-4 sm:p-5 text-white shadow-lg shadow-rose-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl animate-bounce">💖</span>
            <div>
              <h2 className="font-fredoka font-bold text-lg sm:text-xl tracking-wide flex items-center gap-2">
                <span>Photobooth for My Favorite Girl</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
                  Minions • Puung • Cute Girl • Cats
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-pink-50 font-medium">
                Snap cute photos together, customize borders & playful stickers, and download your instant photo strip!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Camera Viewport & Toolbar (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Live Camera Feed */}
          <CameraView
            onPhotoCaptured={handlePhotoCaptured}
            activeSlotIndex={activeSlotIndex}
            totalSlots={totalSlots}
            onSetActiveSlot={(idx) => setActiveSlotIndex(idx)}
            currentFilter={activeFilter}
            mirrorCamera={config.mirrorCamera}
            onToggleMirror={() => handleUpdateConfig({ mirrorCamera: !config.mirrorCamera })}
            countdownSeconds={config.countdownSeconds}
            onChangeCountdown={(sec) => handleUpdateConfig({ countdownSeconds: sec })}
            soundEnabled={config.soundEnabled}
            onToggleSound={() => handleUpdateConfig({ soundEnabled: !config.soundEnabled })}
            isCapturingSequence={isCapturingSequence}
            onSequenceStateChange={(running) => setIsCapturingSequence(running)}
          />

          {/* Comprehensive Customizer Toolbar */}
          <CustomizerToolbar
            config={config}
            onChangeConfig={handleUpdateConfig}
            onAddSticker={handleAddSticker}
            onClearAllStickers={handleClearAllStickers}
            onApplyTheme={handleApplyTheme}
          />
        </div>

        {/* Right Column: Interactive Strip Canvas Preview (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-20">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <span className="font-fredoka font-semibold text-slate-700 text-sm flex items-center gap-1.5">
              <Sparkles size={15} className="text-rose-500" />
              <span>Strip Live Canvas</span>
            </span>
            <span className="text-xs text-rose-600 font-medium">
              💡 Click sticker to resize / rotate / drag
            </span>
          </div>

          {/* Strip Preview */}
          <StripPreview
            photos={photos}
            config={config}
            activeSlotIndex={activeSlotIndex}
            onSelectSlot={(idx) => setActiveSlotIndex(idx)}
            onClearSlot={handleClearSlot}
            onUpdateSticker={handleUpdateSticker}
            onRemoveSticker={handleRemoveSticker}
            selectedStickerId={selectedStickerId}
            onSelectSticker={(id) => setSelectedStickerId(id)}
          />

          {/* Bottom Instant Download & Gallery trigger button */}
          <div className="mt-5 w-full max-w-[380px] flex items-center gap-2">
            <button
              onClick={handleInstantDownload}
              disabled={!hasPhotos || isRendering}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-fredoka font-bold text-sm shadow-lg shadow-rose-300/50 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isRendering ? 'Rendering High-Res...' : 'Instant Gallery Download 📸'}</span>
            </button>
            <button
              onClick={handleOpenGallery}
              title="Open Strip Gallery"
              className="py-3 px-4 rounded-2xl bg-white hover:bg-rose-50 text-rose-800 font-fredoka font-semibold text-xs border border-rose-200 shadow-sm transition-all cursor-pointer"
            >
              Gallery
            </button>
          </div>
        </div>
      </main>

      {/* Gallery & Download Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        currentStripDataUrl={currentStripDataUrl}
        savedStrips={savedStrips}
        onDeleteStrip={handleDeleteSavedStrip}
        onSaveCurrentStrip={handleSaveCurrentStrip}
      />

      {/* PWA Offline Connection Indicator */}
      <OfflineIndicator />

      {/* Cute Footer */}
      <footer className="mt-12 py-6 border-t border-rose-200/50 bg-white/60 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1.5 font-fredoka">
          Made with all my <Heart size={14} className="fill-rose-500 text-rose-500 inline" /> for my girlfriend • Honeybabyyy  Booth
        </p>
      </footer>
    </div>
  );
}
