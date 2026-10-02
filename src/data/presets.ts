import { ColorFilter, ThemePreset, LayoutType } from '../types/photobooth';

export const COLOR_FILTERS: ColorFilter[] = [
  {
    id: 'normal',
    name: 'Natural',
    cssFilter: 'none',
    description: 'Clean, true-to-life colors',
    badgeColor: 'bg-slate-100 text-slate-700'
  },
  {
    id: 'sakura-pink',
    name: 'Sakura Glow',
    cssFilter: 'contrast(1.05) brightness(1.08) saturate(1.18) hue-rotate(-8deg) sepia(0.08)',
    description: 'Soft pastel pink blush with glowing highlights',
    badgeColor: 'bg-pink-100 text-pink-700'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    cssFilter: 'contrast(1.04) brightness(1.05) saturate(1.25) sepia(0.24)',
    description: 'Warm romantic sunset glow',
    badgeColor: 'bg-amber-100 text-amber-700'
  },
  {
    id: 'kdrama-soft',
    name: 'K-Drama Soft',
    cssFilter: 'contrast(0.96) brightness(1.12) saturate(1.05)',
    description: 'Dreamy luminous skin tones and airy atmosphere',
    badgeColor: 'bg-rose-100 text-rose-700'
  },
  {
    id: 'vintage-film',
    name: '90s Film',
    cssFilter: 'contrast(1.15) brightness(0.98) saturate(0.9) sepia(0.32) hue-rotate(-12deg)',
    description: 'Moody retro disposable camera aesthetic',
    badgeColor: 'bg-stone-200 text-stone-800'
  },
  {
    id: 'noir-bw',
    name: 'Classic B&W',
    cssFilter: 'grayscale(1) contrast(1.2) brightness(1.02)',
    description: 'Timeless high-contrast black & white',
    badgeColor: 'bg-zinc-800 text-white'
  },
  {
    id: 'fresh-mint',
    name: 'Fresh Mint',
    cssFilter: 'contrast(1.02) brightness(1.06) saturate(1.15) hue-rotate(15deg)',
    description: 'Crisp cool pastel tones for a breezy aesthetic',
    badgeColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'peach-dream',
    name: 'Peach Dream',
    cssFilter: 'contrast(1.08) brightness(1.06) saturate(1.3) sepia(0.12) hue-rotate(-15deg)',
    description: 'Vibrant sweet peach tones',
    badgeColor: 'bg-orange-100 text-orange-700'
  }
];

export const THEMES: ThemePreset[] = [
  {
    id: 'theme-puung',
    name: 'Puung Cozy Love',
    category: 'puung',
    bgColor: '#FFF7ED', // warm cozy cream
    borderColor: '#FDBA74',
    borderStyle: 'dashed',
    pattern: 'gingham',
    patternColor: 'rgba(249, 115, 22, 0.1)',
    font: 'caveat',
    textColor: '#9A3412',
    defaultFilter: 'golden-hour',
    defaultTitle: 'Love is in small things',
    defaultSubtitle: 'our cozy little world ✨',
    description: 'Warm watercolor tones, cozy blanket gingham, heartwarming hugs',
    bannerGradient: 'from-amber-200 via-orange-100 to-rose-100',
    previewSticker: '🫂'
  },
  {
    id: 'theme-minions',
    name: 'Minions Bello Party',
    category: 'minions',
    bgColor: '#FEF08A', // minions bright cheerful yellow
    borderColor: '#3B82F6', // denim blue overalls
    borderStyle: 'solid',
    pattern: 'dots',
    patternColor: 'rgba(37, 99, 235, 0.15)',
    font: 'fredoka',
    textColor: '#1E3A8A',
    defaultFilter: 'peach-dream',
    defaultTitle: 'BANANA! Bello! 🍌',
    defaultSubtitle: 'phil & girlfriend forever',
    description: 'Playful Minion yellow, classic denim blue accents, cheerful fun',
    bannerGradient: 'from-yellow-300 via-amber-200 to-blue-200',
    previewSticker: '💛'
  },
  {
    id: 'theme-cutegirl',
    name: 'Cute Girl Coquette',
    category: 'cutegirl',
    bgColor: '#FFF1F2', // soft blush pink
    borderColor: '#FDA4AF',
    borderStyle: 'scalloped',
    pattern: 'hearts',
    patternColor: 'rgba(244, 63, 94, 0.12)',
    font: 'pacifico',
    textColor: '#BE123C',
    defaultFilter: 'sakura-pink',
    defaultTitle: 'You Are My Favorite',
    defaultSubtitle: 'sweet moments with my girl 💕',
    description: 'Chibi girl charms, pink bows, floating hearts & boba sweetness',
    bannerGradient: 'from-pink-300 via-rose-200 to-red-100',
    previewSticker: '🎀'
  },
  {
    id: 'theme-cats',
    name: 'Kawaii Cat Cafe',
    category: 'cats',
    bgColor: '#FAF5FF', // soft lavender cream
    borderColor: '#D8B4FE',
    borderStyle: 'dotted',
    pattern: 'dots',
    patternColor: 'rgba(168, 85, 247, 0.15)',
    font: 'gaegu',
    textColor: '#6B21A8',
    defaultFilter: 'kdrama-soft',
    defaultTitle: 'Meow & Forever',
    defaultSubtitle: 'high paws for us! 🐾',
    description: 'Cute kitty paws, sleepy loafs, peach whiskers, purrfect vibes',
    bannerGradient: 'from-purple-200 via-pink-100 to-indigo-100',
    previewSticker: '🐾'
  },
  {
    id: 'theme-classic-polaroid',
    name: 'Classic White Strip',
    category: 'romantic',
    bgColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderStyle: 'solid',
    pattern: 'solid',
    patternColor: 'transparent',
    font: 'quicksand',
    textColor: '#334155',
    defaultFilter: 'vintage-film',
    defaultTitle: 'Captured Moments',
    defaultSubtitle: 'special memories • today & always',
    description: 'Minimalist Life Four Cuts aesthetic with crisp modern typography',
    bannerGradient: 'from-slate-100 via-gray-50 to-zinc-200',
    previewSticker: '📷'
  },
  {
    id: 'theme-noir-chic',
    name: 'Chic Film Noir',
    category: 'romantic',
    bgColor: '#18181B',
    borderColor: '#3F3F46',
    borderStyle: 'double',
    pattern: 'grid',
    patternColor: 'rgba(255, 255, 255, 0.08)',
    font: 'playfair',
    textColor: '#F4F4F5',
    defaultFilter: 'noir-bw',
    defaultTitle: 'Forever & Always',
    defaultSubtitle: 'monochrome romance',
    description: 'Elegant deep dark mode with silver foil text and film border',
    bannerGradient: 'from-zinc-900 via-neutral-800 to-black',
    previewSticker: '🖤'
  }
];

export interface LayoutOption {
  id: LayoutType;
  name: string;
  photoCount: number;
  description: string;
  badge: string;
  aspectRatio: string; // for strip container
  cols: number;
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: 'strip-4',
    name: 'Classic 4-Cut Strip',
    photoCount: 4,
    description: 'The iconic Korean photobooth vertical ribbon',
    badge: 'Most Popular',
    aspectRatio: '1 / 3.4',
    cols: 1
  },
  {
    id: 'strip-3',
    name: '3-Cut Vertical Strip',
    photoCount: 3,
    description: 'Chic 3-photo vertical strip with roomy bottom caption',
    badge: 'Aesthetic',
    aspectRatio: '1 / 2.7',
    cols: 1
  },
  {
    id: 'strip-2',
    name: '2-Cut Duo Strip',
    photoCount: 2,
    description: 'Sweet couple pairing stacked vertically',
    badge: 'Duo',
    aspectRatio: '1 / 1.9',
    cols: 1
  },
  {
    id: 'grid-2x2',
    name: '2x2 Square Grid',
    photoCount: 4,
    description: 'Classic 4-photo square quadrant format',
    badge: 'Grid System',
    aspectRatio: '1 / 1.25',
    cols: 2
  },
  {
    id: 'grid-2x3',
    name: '6-Photo Grid (2x3)',
    photoCount: 6,
    description: 'Two columns of 3 photos with maximum memories',
    badge: 'Deluxe',
    aspectRatio: '1 / 1.6',
    cols: 2
  },
  {
    id: 'strip-1',
    name: 'Single Polaroid',
    photoCount: 1,
    description: 'Large hero photo with wide handwritten bottom margin',
    badge: 'Polaroid',
    aspectRatio: '1 / 1.25',
    cols: 1
  },
  {
    id: 'strip-6',
    name: 'Tall 6-Cut Strip',
    photoCount: 6,
    description: 'Ultra tall 6-photo vertical reel',
    badge: 'Reel',
    aspectRatio: '1 / 4.8',
    cols: 1
  }
];
