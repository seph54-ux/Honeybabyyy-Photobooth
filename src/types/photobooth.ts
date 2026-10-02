export type LayoutType = 
  | 'strip-1' 
  | 'strip-2' 
  | 'strip-3' 
  | 'strip-4' 
  | 'grid-2x2' 
  | 'grid-2x3' 
  | 'strip-6';

export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'scalloped' | 'stamp' | 'rounded-pill' | 'none';

export type PatternType = 'solid' | 'dots' | 'gingham' | 'hearts' | 'grid' | 'stars' | 'clouds';

export type FontFamily = 'fredoka' | 'caveat' | 'pacifico' | 'quicksand' | 'gaegu' | 'indie' | 'playfair';

export interface ColorFilter {
  id: string;
  name: string;
  cssFilter: string;
  description: string;
  badgeColor: string;
}

export type StickerCategory = 'minions' | 'puung' | 'cutegirl' | 'cats' | 'love_doodles';

export interface StickerItem {
  id: string;
  name: string;
  category: StickerCategory;
  svgContent?: string;
  emoji?: string;
  label?: string;
}

export interface PlacedSticker {
  instanceId: string;
  stickerId: string;
  category: StickerCategory;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  scale: number; // 0.5 to 2.5
  rotation: number; // degrees -180 to 180
  flipped: boolean;
}

export interface ThemePreset {
  id: string;
  name: string;
  category: 'minions' | 'puung' | 'cutegirl' | 'cats' | 'romantic';
  bgColor: string;
  borderColor: string;
  borderStyle: BorderStyle;
  pattern: PatternType;
  patternColor: string;
  font: FontFamily;
  textColor: string;
  defaultFilter: string;
  defaultTitle: string;
  defaultSubtitle: string;
  description: string;
  bannerGradient: string;
  previewSticker: string;
}

export interface PhotoboothConfig {
  layout: LayoutType;
  countdownSeconds: number; // 3, 5, 10
  currentFilterId: string;
  themeId: string;
  bgColor: string;
  borderColor: string;
  borderStyle: BorderStyle;
  borderWidth: number; // 0, 2, 4, 8, 12
  borderRadius: number; // 0, 8, 16, 24, 32
  pattern: PatternType;
  patternColor: string;
  font: FontFamily;
  textColor: string;
  title: string;
  subtitle: string;
  showDate: boolean;
  dateText: string;
  placedStickers: PlacedSticker[];
  mirrorCamera: boolean;
  soundEnabled: boolean;
}

export interface CapturedStrip {
  id: string;
  createdAt: number;
  dataUrl: string;
  layout: LayoutType;
  photosCount: number;
  themeName: string;
}
