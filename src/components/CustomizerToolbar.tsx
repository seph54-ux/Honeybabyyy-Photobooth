import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Sparkles, 
  Smile, 
  Palette, 
  Sliders, 
  Type, 
  Check, 
  Trash2, 
  Plus, 
  Heart,
  Calendar
} from 'lucide-react';
import { 
  PhotoboothConfig, 
  LayoutType, 
  StickerCategory, 
  BorderStyle, 
  PatternType, 
  FontFamily 
} from '../types/photobooth';
import { LAYOUT_OPTIONS, THEMES, COLOR_FILTERS } from '../data/presets';
import { STICKERS } from '../data/stickers';
import { sound } from '../utils/audio';

interface CustomizerToolbarProps {
  config: PhotoboothConfig;
  onChangeConfig: (updates: Partial<PhotoboothConfig>) => void;
  onAddSticker: (stickerId: string, category: StickerCategory) => void;
  onClearAllStickers: () => void;
  onApplyTheme: (themeId: string) => void;
}

type TabType = 'layout' | 'themes' | 'stickers' | 'filters' | 'frames' | 'text';

export const CustomizerToolbar: React.FC<CustomizerToolbarProps> = ({
  config,
  onChangeConfig,
  onAddSticker,
  onClearAllStickers,
  onApplyTheme
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('stickers');
  const [stickerCategory, setStickerCategory] = useState<StickerCategory>('minions');

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'stickers', label: 'Stickers', icon: <Smile size={16} /> },
    { id: 'themes', label: 'Cute Themes', icon: <Sparkles size={16} /> },
    { id: 'layout', label: 'Layout & Grid', icon: <LayoutGrid size={16} /> },
    { id: 'filters', label: 'Color Filters', icon: <Palette size={16} /> },
    { id: 'frames', label: 'Borders & Styles', icon: <Sliders size={16} /> },
    { id: 'text', label: 'Fonts & Love Notes', icon: <Type size={16} /> }
  ];

  const filteredStickers = STICKERS.filter(s => s.category === stickerCategory);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-rose-200/50 border-2 border-rose-200/70 overflow-hidden flex flex-col">
      {/* Tab Navigation Scrollable Bar */}
      <div className="flex items-center gap-1 p-2 bg-gradient-to-r from-rose-100/70 via-pink-50 to-amber-50 border-b border-rose-200/60 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-rose-800 shadow-sm border border-rose-200/80 scale-102'
                  : 'text-slate-600 hover:text-rose-700 hover:bg-white/50'
              }`}
            >
              <span className={isActive ? 'text-rose-500' : 'text-slate-400'}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="p-4 sm:p-5 max-h-[380px] sm:max-h-[420px] overflow-y-auto">
        {/* ==================== 1. STICKERS TAB ==================== */}
        {activeTab === 'stickers' && (
          <div className="flex flex-col gap-4">
            {/* Category Pills (Minions, Puung, Cute Girl, Cats, Love Doodles) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(
                [
                  { id: 'minions', label: '💛 Minions', badge: 'Banana!' },
                  { id: 'puung', label: '🫂 Puung Love', badge: 'Cozy' },
                  { id: 'cutegirl', label: '🎀 Cute Girl', badge: 'Chibi' },
                  { id: 'cats', label: '🐾 Cute Cats', badge: 'Purr' },
                  { id: 'love_doodles', label: '✨ Love & Doodles', badge: 'Cute' }
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setStickerCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-fredoka font-semibold transition-all cursor-pointer ${
                    stickerCategory === cat.id
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {filteredStickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => {
                    onAddSticker(sticker.id, sticker.category);
                    sound.playPop();
                  }}
                  title={`Add ${sticker.name}`}
                  className="group relative aspect-square p-2 rounded-2xl bg-rose-50/50 hover:bg-rose-100 border border-rose-200/60 hover:border-rose-300 transition-all flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                >
                  {sticker.svgContent ? (
                    <div
                      className="w-10 h-10 drop-shadow-sm transition-transform group-hover:rotate-6"
                      dangerouslySetInnerHTML={{ __html: sticker.svgContent }}
                    />
                  ) : (
                    <span className="text-3xl group-hover:scale-110 transition-transform">{sticker.emoji}</span>
                  )}
                  <span className="text-[10px] text-slate-600 font-medium mt-1 truncate max-w-full">
                    {sticker.label || sticker.name}
                  </span>
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500 text-white rounded-full p-0.5">
                    <Plus size={10} />
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Clear stickers button */}
            {config.placedStickers.length > 0 && (
              <div className="pt-2 flex items-center justify-between border-t border-rose-100 text-xs">
                <span className="text-slate-500 font-medium">
                  {config.placedStickers.length} sticker(s) placed • Drag to move & scale!
                </span>
                <button
                  onClick={onClearAllStickers}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold hover:underline"
                >
                  <Trash2 size={13} /> Clear all stickers
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. CUTE THEMES TAB ==================== */}
        {activeTab === 'themes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THEMES.map((theme) => {
              const isSelected = config.themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onApplyTheme(theme.id);
                    sound.playPop();
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-400 ring-offset-1 shadow-sm'
                      : 'border-slate-200 hover:border-rose-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{theme.previewSticker}</span>
                      <div>
                        <h4 className="font-fredoka font-semibold text-slate-800 text-sm">
                          {theme.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Visual theme banner */}
                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                    <div
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: theme.bgColor }}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: theme.borderColor }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">
                      Font: {theme.font}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== 3. LAYOUT & GRID TAB ==================== */}
        {activeTab === 'layout' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-slate-500">
              Select how many photos to include and pick your favorite strip or grid system:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LAYOUT_OPTIONS.map((layout) => {
                const isSelected = config.layout === layout.id;
                return (
                  <button
                    key={layout.id}
                    onClick={() => {
                      onChangeConfig({ layout: layout.id });
                      sound.playPop();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-400 ring-offset-1 shadow-sm'
                        : 'border-slate-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-fredoka font-semibold text-slate-800 text-sm">
                          {layout.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
                          {layout.photoCount} photos
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{layout.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 ml-2">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== 4. COLOR FILTERS TAB ==================== */}
        {activeTab === 'filters' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {COLOR_FILTERS.map((filter) => {
              const isSelected = config.currentFilterId === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    onChangeConfig({ currentFilterId: filter.id });
                    sound.playPop();
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-400 ring-offset-1 shadow-xs'
                      : 'border-slate-200 hover:border-rose-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-fredoka font-semibold text-slate-800 text-xs">
                      {filter.name}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {filter.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== 5. FRAMES & STYLES TAB ==================== */}
        {activeTab === 'frames' && (
          <div className="flex flex-col gap-4">
            {/* Background Pattern */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1.5">
                Background Pattern
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(
                  [
                    { id: 'solid', label: 'Plain' },
                    { id: 'dots', label: 'Polka Dots' },
                    { id: 'gingham', label: 'Gingham Check' },
                    { id: 'hearts', label: 'Hearts' },
                    { id: 'grid', label: 'Notebook' }
                  ] as const
                ).map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => onChangeConfig({ pattern: pat.id as PatternType })}
                    className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      config.pattern === pat.id
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {pat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1.5">
                Background Pastel Color
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { color: '#FFF7ED', name: 'Warm Cream' },
                  { color: '#FFF1F2', name: 'Sakura Blush' },
                  { color: '#FEF08A', name: 'Minions Yellow' },
                  { color: '#FAF5FF', name: 'Lavender Dream' },
                  { color: '#ECFDF5', name: 'Matcha Mint' },
                  { color: '#FFFFFF', name: 'Pure White' },
                  { color: '#18181B', name: 'Noir Dark' }
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => onChangeConfig({ bgColor: item.color })}
                    title={item.name}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      config.bgColor.toLowerCase() === item.color.toLowerCase()
                        ? 'scale-115 ring-2 ring-rose-400 ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: item.color, borderColor: '#cbd5e1' }}
                  />
                ))}
                {/* Custom Color input */}
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => onChangeConfig({ bgColor: e.target.value })}
                  title="Pick custom background color"
                  className="w-7 h-7 rounded-full overflow-hidden cursor-pointer border border-slate-300"
                />
              </div>
            </div>

            {/* Border Style */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1.5">
                Border Style
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(
                  [
                    { id: 'solid', label: 'Solid' },
                    { id: 'dashed', label: 'Dashed' },
                    { id: 'dotted', label: 'Dotted' },
                    { id: 'double', label: 'Double' },
                    { id: 'scalloped', label: 'Scalloped' },
                    { id: 'none', label: 'None' }
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onChangeConfig({ borderStyle: b.id as BorderStyle })}
                    className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      config.borderStyle === b.id
                        ? 'border-rose-500 bg-rose-50 text-rose-800'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Width & Radius sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Border Width</span>
                  <span>{config.borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={config.borderWidth}
                  onChange={(e) => onChangeConfig({ borderWidth: Number(e.target.value) })}
                  className="w-full accent-rose-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Corner Rounding</span>
                  <span>{config.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="36"
                  value={config.borderRadius}
                  onChange={(e) => onChangeConfig({ borderRadius: Number(e.target.value) })}
                  className="w-full accent-rose-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 6. TEXT & FONTS TAB ==================== */}
        {activeTab === 'text' && (
          <div className="flex flex-col gap-4">
            {/* Font Family selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1.5">
                Font Family
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'fredoka', name: 'Fredoka (Cute)', fontClass: 'font-fredoka' },
                  { id: 'caveat', name: 'Caveat (Handwritten)', fontClass: 'font-caveat' },
                  { id: 'pacifico', name: 'Pacifico (Sweet)', fontClass: 'font-pacifico' },
                  { id: 'quicksand', name: 'Quicksand (Clean)', fontClass: 'font-quicksand' },
                  { id: 'gaegu', name: 'Gaegu (Doodle)', fontClass: 'font-gaegu' },
                  { id: 'indie', name: 'Indie Flower (Art)', fontClass: 'font-indie' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChangeConfig({ font: f.id as FontFamily })}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      config.font === f.id
                        ? 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-400'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className={`block text-sm font-semibold truncate ${f.fontClass}`}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Title Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1">
                Main Header Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => onChangeConfig({ title: e.target.value })}
                placeholder="e.g. You & Me, Forever & Always"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-rose-500 font-medium"
              />
            </div>

            {/* Custom Subtitle Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 font-fredoka mb-1">
                Subtitle Love Message
              </label>
              <input
                type="text"
                value={config.subtitle}
                onChange={(e) => onChangeConfig({ subtitle: e.target.value })}
                placeholder="e.g. date night memories with my love 💕"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-rose-500 font-medium"
              />
            </div>

            {/* Date Tag Controls */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showDate}
                  onChange={(e) => onChangeConfig({ showDate: e.target.checked })}
                  className="rounded text-rose-500 focus:ring-rose-400"
                />
                <span>Include Date Stamp</span>
              </label>
              {config.showDate && (
                <input
                  type="text"
                  value={config.dateText}
                  onChange={(e) => onChangeConfig({ dateText: e.target.value })}
                  className="px-2 py-1 text-xs border border-slate-300 rounded-lg w-40 text-center font-mono font-semibold"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
