import { StickerItem } from '../types/photobooth';

// Minions SVGs, Puung cozy couple SVGs, Cute Girl SVGs, Kawaii Cat SVGs, & Love/Doodles
export const STICKERS: StickerItem[] = [
  // ==================== MINIONS ====================
  {
    id: 'minion-bob',
    name: 'Bob with Bear',
    category: 'minions',
    emoji: '🧸',
    label: 'Bob & Bear',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="55" rx="30" ry="38" fill="#FCE029" stroke="#333" stroke-width="2.5"/>
      <path d="M 23 60 C 23 88, 77 88, 77 60 Z" fill="#2563EB" stroke="#333" stroke-width="2.5"/>
      <rect x="35" y="58" width="30" height="24" fill="#2563EB" stroke="#333" stroke-width="2.5"/>
      <path d="M 24 55 L 36 62 M 76 55 L 64 62" stroke="#1D4ED8" stroke-width="5" stroke-linecap="round"/>
      <rect x="20" y="40" width="60" height="7" fill="#333"/>
      <circle cx="40" cy="43" r="13" fill="#D1D5DB" stroke="#333" stroke-width="2.5"/>
      <circle cx="60" cy="43" r="13" fill="#D1D5DB" stroke="#333" stroke-width="2.5"/>
      <circle cx="40" cy="43" r="8" fill="#84CC16"/>
      <circle cx="60" cy="43" r="8" fill="#92400E"/>
      <circle cx="40" cy="43" r="4" fill="#111"/>
      <circle cx="60" cy="43" r="4" fill="#111"/>
      <circle cx="38" cy="41" r="1.5" fill="#FFF"/>
      <circle cx="58" cy="41" r="1.5" fill="#FFF"/>
      <path d="M 43 64 Q 50 70 57 64" stroke="#713F12" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="34" cy="58" r="4" fill="#FF8080" opacity="0.6"/>
      <circle cx="66" cy="58" r="4" fill="#FF8080" opacity="0.6"/>
      <!-- Teddy bear Tim -->
      <circle cx="72" cy="72" r="9" fill="#B45309" stroke="#333" stroke-width="1.5"/>
      <circle cx="65" cy="65" r="3.5" fill="#92400E"/>
      <circle cx="79" cy="65" r="3.5" fill="#92400E"/>
      <circle cx="70" cy="71" r="1.5" fill="#111"/>
      <circle cx="74" cy="71" r="1.5" fill="#111"/>
    </svg>`
  },
  {
    id: 'minion-kevin',
    name: 'Kevin Smiling',
    category: 'minions',
    emoji: '💛',
    label: 'Kevin Wink',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Hair sprouts -->
      <path d="M 47 18 Q 45 10 42 12 M 50 18 Q 50 8 50 10 M 53 18 Q 55 10 58 12" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="24" y="20" width="52" height="65" rx="26" fill="#FCE029" stroke="#333" stroke-width="2.5"/>
      <!-- Goggle strap -->
      <rect x="22" y="38" width="56" height="7" fill="#333"/>
      <!-- Double Goggles -->
      <circle cx="41" cy="41" r="12" fill="#D1D5DB" stroke="#333" stroke-width="2.5"/>
      <circle cx="59" cy="41" r="12" fill="#D1D5DB" stroke="#333" stroke-width="2.5"/>
      <circle cx="41" cy="41" r="7" fill="#92400E"/>
      <circle cx="59" cy="41" r="7" fill="#92400E"/>
      <circle cx="41" cy="41" r="3.5" fill="#111"/>
      <circle cx="59" cy="41" r="3.5" fill="#111"/>
      <circle cx="39.5" cy="39.5" r="1.5" fill="#FFF"/>
      <circle cx="57.5" cy="39.5" r="1.5" fill="#FFF"/>
      <!-- Big grin -->
      <path d="M 40 60 Q 50 72 60 60 Z" fill="#FFF" stroke="#333" stroke-width="2"/>
      <!-- Overalls -->
      <path d="M 25 70 C 25 86, 75 86, 75 70 Z" fill="#2563EB" stroke="#333" stroke-width="2.5"/>
      <rect x="36" y="66" width="28" height="18" fill="#2563EB" stroke="#333" stroke-width="2"/>
      <circle cx="50" cy="74" r="4" fill="#1E3A8A"/>
    </svg>`
  },
  {
    id: 'minion-banana',
    name: 'Banana!',
    category: 'minions',
    emoji: '🍌',
    label: 'BANANA!',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 65 C 30 90, 75 80, 85 30 C 85 22, 78 22, 76 28 C 70 65, 35 75, 25 55 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>
      <path d="M 76 28 C 80 18, 86 18, 85 24" stroke="#713F12" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 20 65 C 16 67, 18 72, 22 70" stroke="#713F12" stroke-width="3" stroke-linecap="round"/>
      <rect x="22" y="15" width="56" height="22" rx="11" fill="#FEF08A" stroke="#EAB308" stroke-width="1.5"/>
      <text x="50" y="30" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="10" fill="#854D0E" text-anchor="middle">BANANA!</text>
    </svg>`
  },
  {
    id: 'minion-stuart',
    name: 'Stuart One-Eye',
    category: 'minions',
    emoji: '🎸',
    label: 'Stuart Bello',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="52" rx="28" ry="34" fill="#FCE029" stroke="#333" stroke-width="2.5"/>
      <rect x="20" y="40" width="60" height="7" fill="#333"/>
      <!-- Single big goggle -->
      <circle cx="50" cy="43" r="16" fill="#D1D5DB" stroke="#333" stroke-width="2.5"/>
      <circle cx="50" cy="43" r="10" fill="#92400E"/>
      <circle cx="50" cy="43" r="5" fill="#111"/>
      <circle cx="47" cy="40" r="2" fill="#FFF"/>
      <!-- Smirk -->
      <path d="M 44 65 Q 52 70 59 62" stroke="#713F12" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 23 62 C 23 86, 77 86, 77 62 Z" fill="#2563EB" stroke="#333" stroke-width="2.5"/>
      <circle cx="50" cy="74" r="4" fill="#1E3A8A"/>
      <!-- Red heart in hand -->
      <path d="M 76 60 C 76 55, 84 55, 86 60 C 88 55, 96 55, 96 60 C 96 68, 86 74, 86 74 C 86 74, 76 68, 76 60 Z" fill="#EF4444"/>
    </svg>`
  },
  {
    id: 'minion-bello-bubble',
    name: 'Bello Speech',
    category: 'minions',
    emoji: '💬',
    label: 'Bello! Tag',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 25 C 12 15, 25 15, 50 15 C 75 15, 88 15, 88 25 C 88 45, 88 45, 75 52 L 80 65 L 62 52 C 40 52, 12 50, 12 25 Z" fill="#FEF9C3" stroke="#F59E0B" stroke-width="2.5"/>
      <text x="48" y="38" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="15" fill="#B45309" text-anchor="middle">BELLO! ❤️</text>
    </svg>`
  },

  // ==================== PUUNG (Love is in small things) ====================
  {
    id: 'puung-hug',
    name: 'Puung Cozy Hug',
    category: 'puung',
    emoji: '🫂',
    label: 'Warm Hug',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Puung warm cozy couple hug watercolor style -->
      <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="#FDBA74" stroke-width="2"/>
      <!-- Girl head & messy cute bun -->
      <circle cx="45" cy="38" r="11" fill="#FFEDD5"/>
      <circle cx="43" cy="33" r="12" fill="#78350F"/>
      <circle cx="41" cy="22" r="5" fill="#78350F"/>
      <!-- Boy head hugging from behind -->
      <circle cx="58" cy="34" r="12" fill="#451A03"/>
      <circle cx="56" cy="38" r="10" fill="#FFEDD5"/>
      <!-- Closed happy eyes -->
      <path d="M 42 38 Q 45 41 48 38" stroke="#78350F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M 54 38 Q 57 41 60 38" stroke="#451A03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Rosy blush -->
      <circle cx="43" cy="42" r="3.5" fill="#F472B6" opacity="0.6"/>
      <circle cx="59" cy="42" r="3.5" fill="#F472B6" opacity="0.6"/>
      <!-- Cozy knit sweater blanket -->
      <path d="M 28 54 C 28 48, 72 48, 72 54 L 75 82 C 75 88, 25 88, 25 82 Z" fill="#FDBA74" stroke="#EA580C" stroke-width="1.5"/>
      <!-- Knitted pattern lines -->
      <path d="M 33 58 L 33 78 M 41 56 L 41 80 M 49 56 L 49 80 M 57 56 L 57 80 M 65 58 L 65 78" stroke="#FB923C" stroke-width="1.5" stroke-dasharray="2,2"/>
      <!-- Floating warm hearts -->
      <path d="M 50 14 C 50 10, 56 10, 58 14 C 60 10, 66 10, 66 14 C 66 20, 58 24, 58 24 C 58 24, 50 20, 50 14 Z" fill="#F43F5E"/>
      <path d="M 22 28 C 22 25, 26 25, 28 28 C 30 25, 34 25, 34 28 C 34 32, 28 35, 28 35 C 28 35, 22 32, 22 28 Z" fill="#FB7185"/>
      <text x="50" y="93" font-family="'Caveat', cursive" font-weight="bold" font-size="9" fill="#9A3412" text-anchor="middle">warm hugs</text>
    </svg>`
  },
  {
    id: 'puung-coffee',
    name: 'Puung Warm Coffee',
    category: 'puung',
    emoji: '☕',
    label: 'Coffee Together',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FEF3C7" stroke="#FDE68A" stroke-width="2"/>
      <!-- Two warm mugs -->
      <!-- Mug 1 (Pink) -->
      <rect x="25" y="45" width="22" height="26" rx="4" fill="#FDA4AF" stroke="#E11D48" stroke-width="2"/>
      <path d="M 25 50 C 18 50, 18 64, 25 64" fill="none" stroke="#E11D48" stroke-width="2"/>
      <path d="M 33 54 C 33 52, 36 52, 37 54 C 38 52, 41 52, 41 54 C 41 58, 37 60, 37 60 C 37 60, 33 58, 33 54 Z" fill="#FFF"/>
      <!-- Mug 2 (Blue) -->
      <rect x="52" y="45" width="22" height="26" rx="4" fill="#93C5FD" stroke="#2563EB" stroke-width="2"/>
      <path d="M 74 50 C 81 50, 81 64, 74 64" fill="none" stroke="#2563EB" stroke-width="2"/>
      <path d="M 60 54 C 60 52, 63 52, 64 54 C 65 52, 68 52, 68 54 C 68 58, 64 60, 64 60 C 64 60, 60 58, 60 54 Z" fill="#FFF"/>
      <!-- Rising steam forming hearts -->
      <path d="M 35 40 Q 32 30 38 25 M 63 40 Q 66 30 60 25" stroke="#EA580C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 45 22 C 45 18, 50 18, 52 21 C 54 18, 59 18, 59 21 C 59 26, 52 30, 52 30 C 52 30, 45 26, 45 22 Z" fill="#FB7185"/>
      <text x="50" y="86" font-family="'Caveat', cursive" font-weight="bold" font-size="10" fill="#92400E" text-anchor="middle">cozy moments</text>
    </svg>`
  },
  {
    id: 'puung-forehead-kiss',
    name: 'Puung Forehead Kiss',
    category: 'puung',
    emoji: '✨',
    label: 'Forehead Kiss',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#F472B6" stroke-width="2"/>
      <!-- Cute couple profile silhouette with warm pastel shading -->
      <!-- Boy kissing forehead -->
      <circle cx="42" cy="40" r="14" fill="#78350F"/>
      <circle cx="60" cy="45" r="13" fill="#D97706"/>
      <ellipse cx="46" cy="45" rx="8" ry="10" fill="#FED7AA"/>
      <ellipse cx="56" cy="50" rx="8" ry="10" fill="#FED7AA"/>
      <!-- Blush on cheeks -->
      <circle cx="57" cy="54" r="4" fill="#FB7185" opacity="0.6"/>
      <circle cx="47" cy="49" r="4" fill="#FB7185" opacity="0.6"/>
      <!-- Floating golden sparkle stars -->
      <path d="M 50 15 L 52 21 L 58 22 L 53 26 L 55 32 L 50 28 L 45 32 L 47 26 L 42 22 L 48 21 Z" fill="#FBBF24"/>
      <circle cx="28" cy="30" r="2.5" fill="#F472B6"/>
      <circle cx="72" cy="35" r="2.5" fill="#F472B6"/>
      <text x="50" y="88" font-family="'Caveat', cursive" font-weight="bold" font-size="11" fill="#BE185D" text-anchor="middle">Love is in small things</text>
    </svg>`
  },
  {
    id: 'puung-stargazing',
    name: 'Puung Stargazing',
    category: 'puung',
    emoji: '🌙',
    label: 'You & Me',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#312E81"/>
      <!-- Crescent moon -->
      <path d="M 68 18 A 14 14 0 0 0 54 32 A 16 16 0 0 1 70 20 Z" fill="#FDE047"/>
      <!-- Stars -->
      <circle cx="25" cy="25" r="1.5" fill="#FFF"/>
      <circle cx="40" cy="18" r="2" fill="#FDE047"/>
      <circle cx="80" cy="35" r="1.5" fill="#FFF"/>
      <circle cx="20" cy="45" r="1" fill="#FFF"/>
      <!-- Two heads leaning together watching the sky -->
      <circle cx="44" cy="65" r="10" fill="#4B5563"/>
      <circle cx="56" cy="66" r="9" fill="#92400E"/>
      <ellipse cx="50" cy="85" rx="28" ry="18" fill="#4338CA"/>
      <text x="50" y="93" font-family="'Gaegu', cursive" font-size="9" fill="#E0E7FF" text-anchor="middle">always with you</text>
    </svg>`
  },

  // ==================== CUTE GIRL ====================
  {
    id: 'girl-peace-wink',
    name: 'Winking Girl',
    category: 'cutegirl',
    emoji: '✌️',
    label: 'Peace Wink',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="2"/>
      <!-- Brown soft hair -->
      <circle cx="50" cy="46" r="25" fill="#78350F"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="19" ry="18" fill="#FFEDD5"/>
      <!-- Hair bangs -->
      <path d="M 32 42 Q 42 50 50 44 Q 58 50 68 42 C 68 32, 32 32, 32 42 Z" fill="#78350F"/>
      <!-- Cute left eye wink -->
      <path d="M 38 52 Q 43 48 48 52" stroke="#451A03" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Right eye big sparkly -->
      <ellipse cx="58" cy="51" rx="4" ry="5.5" fill="#451A03"/>
      <circle cx="57" cy="49" r="1.8" fill="#FFF"/>
      <circle cx="59.5" cy="53" r="1" fill="#FFF"/>
      <!-- Blushing cheeks -->
      <circle cx="38" cy="58" r="4.5" fill="#FB7185" opacity="0.7"/>
      <circle cx="62" cy="58" r="4.5" fill="#FB7185" opacity="0.7"/>
      <!-- Sweet smile -->
      <path d="M 47 60 Q 50 64 53 60" stroke="#E11D48" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Pink bow in hair -->
      <path d="M 28 30 C 23 25, 23 37, 28 33 Z M 36 30 C 41 25, 41 37, 36 33 Z" fill="#F43F5E"/>
      <circle cx="32" cy="32" r="3" fill="#E11D48"/>
      <!-- Peace V sign hand -->
      <path d="M 70 70 L 70 54 M 76 70 L 78 56" stroke="#FED7AA" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="73" cy="68" r="7" fill="#FED7AA"/>
    </svg>`
  },
  {
    id: 'girl-heart-hands',
    name: 'Heart Hands Girl',
    category: 'cutegirl',
    emoji: '🫶',
    label: 'Heart Hands',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FDF4FF" stroke="#F0ABFC" stroke-width="2"/>
      <!-- Cute chibi girl holding heart -->
      <circle cx="50" cy="42" r="22" fill="#581C87"/>
      <circle cx="50" cy="45" r="18" fill="#FFEDD5"/>
      <path d="M 33 38 Q 42 45 50 40 Q 58 45 67 38 C 67 28, 33 28, 33 38 Z" fill="#581C87"/>
      <!-- Two happy closed eyes (crying happy tears of joy) -->
      <path d="M 40 45 Q 44 41 48 45 M 52 45 Q 56 41 60 45" stroke="#3B0764" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="41" cy="51" r="4" fill="#F472B6" opacity="0.8"/>
      <circle cx="59" cy="51" r="4" fill="#F472B6" opacity="0.8"/>
      <!-- Big pink glossy heart held in hands -->
      <path d="M 50 62 C 50 56, 40 54, 38 64 C 36 74, 50 82, 50 82 C 50 82, 64 74, 62 64 C 60 54, 50 56, 50 62 Z" fill="#EC4899" stroke="#BE185D" stroke-width="2"/>
      <circle cx="43" cy="63" r="2.5" fill="#FFF" opacity="0.8"/>
      <text x="50" y="94" font-family="'Caveat', cursive" font-weight="bold" font-size="10" fill="#9333EA" text-anchor="middle">love ya!</text>
    </svg>`
  },
  {
    id: 'girl-boba-tea',
    name: 'Boba Milk Tea Girl',
    category: 'cutegirl',
    emoji: '🧋',
    label: 'Boba Date',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#FDE68A" stroke-width="2"/>
      <!-- Boba cup -->
      <path d="M 32 45 L 36 82 C 36 85, 64 85, 64 82 L 68 45 Z" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
      <ellipse cx="50" cy="45" rx="18" ry="4" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <!-- Straw -->
      <line x1="50" y1="20" x2="50" y2="78" stroke="#EC4899" stroke-width="5" stroke-linecap="round"/>
      <!-- Tapioca pearls -->
      <circle cx="42" cy="74" r="3.5" fill="#451A03"/>
      <circle cx="50" cy="76" r="3.5" fill="#451A03"/>
      <circle cx="58" cy="74" r="3.5" fill="#451A03"/>
      <circle cx="46" cy="68" r="3" fill="#451A03"/>
      <circle cx="54" cy="68" r="3" fill="#451A03"/>
      <!-- Cute bear face on cup -->
      <circle cx="45" cy="56" r="1.5" fill="#78350F"/>
      <circle cx="55" cy="56" r="1.5" fill="#78350F"/>
      <ellipse cx="50" cy="59" rx="2" ry="1.5" fill="#78350F"/>
      <circle cx="42" cy="59" r="2.5" fill="#FB7185" opacity="0.6"/>
      <circle cx="58" cy="59" r="2.5" fill="#FB7185" opacity="0.6"/>
      <text x="50" y="94" font-family="'Fredoka', sans-serif" font-size="8" font-weight="bold" fill="#B45309" text-anchor="middle">SWEET LIKE YOU</text>
    </svg>`
  },
  {
    id: 'girl-cat-ears',
    name: 'Cat Ears Headband',
    category: 'cutegirl',
    emoji: '🎀',
    label: 'Cat Ear Crown',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Headband curve -->
      <path d="M 22 68 C 22 30, 78 30, 78 68" stroke="#EC4899" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Left cat ear -->
      <path d="M 26 40 L 16 15 L 42 26 Z" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
      <path d="M 28 35 L 22 20 L 38 27 Z" fill="#FCE7F3"/>
      <!-- Right cat ear -->
      <path d="M 74 40 L 84 15 L 58 26 Z" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
      <path d="M 72 35 L 78 20 L 62 27 Z" fill="#FCE7F3"/>
      <!-- Little cute bell with ribbon -->
      <circle cx="50" cy="30" r="6" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <circle cx="50" cy="32" r="1.5" fill="#78350F"/>
      <path d="M 44 32 C 38 30, 38 38, 44 34 Z M 56 32 C 62 30, 62 38, 56 34 Z" fill="#EF4444"/>
    </svg>`
  },

  // ==================== CAT STICKERS ====================
  {
    id: 'cat-kawaii-peach',
    name: 'Peach Kitty',
    category: 'cats',
    emoji: '🐱',
    label: 'Peach Kitty',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="54" r="34" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
      <!-- Cat ears -->
      <path d="M 24 38 L 18 16 L 38 26 Z" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
      <path d="M 25 34 L 22 20 L 35 28 Z" fill="#FDA4AF"/>
      <path d="M 76 38 L 82 16 L 62 26 Z" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
      <path d="M 75 34 L 78 20 L 65 28 Z" fill="#FDA4AF"/>
      <!-- Big kawaii eyes -->
      <ellipse cx="38" cy="52" rx="5" ry="6.5" fill="#431407"/>
      <ellipse cx="62" cy="52" rx="5" ry="6.5" fill="#431407"/>
      <circle cx="36" cy="49" r="2.2" fill="#FFF"/>
      <circle cx="60" cy="49" r="2.2" fill="#FFF"/>
      <!-- Pink cheeks -->
      <circle cx="32" cy="62" r="5" fill="#FB7185" opacity="0.8"/>
      <circle cx="68" cy="62" r="5" fill="#FB7185" opacity="0.8"/>
      <!-- Cute :3 mouth -->
      <path d="M 44 60 Q 47 64 50 60 Q 53 64 56 60" stroke="#7C2D12" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="57" rx="2" ry="1.5" fill="#F43F5E"/>
      <!-- Whiskers -->
      <line x1="24" y1="56" x2="14" y2="54" stroke="#7C2D12" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="62" x2="14" y2="64" stroke="#7C2D12" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="76" y1="56" x2="86" y2="54" stroke="#7C2D12" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="76" y1="62" x2="86" y2="64" stroke="#7C2D12" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'cat-paw-beans',
    name: 'Cat Paw Beans',
    category: 'cats',
    emoji: '🐾',
    label: 'Paw Beans',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- White soft paw -->
      <path d="M 28 65 C 22 50, 78 50, 72 65 C 70 82, 30 82, 28 65 Z" fill="#FFF" stroke="#E2E8F0" stroke-width="2.5"/>
      <!-- Center big toe bean -->
      <path d="M 50 60 C 44 54, 38 65, 42 72 C 45 76, 55 76, 58 72 C 62 65, 56 54, 50 60 Z" fill="#FB7185"/>
      <!-- 4 little toe beans -->
      <ellipse cx="32" cy="46" rx="5" ry="6" fill="#FB7185"/>
      <ellipse cx="44" cy="40" rx="5" ry="6" fill="#FB7185"/>
      <ellipse cx="56" cy="40" rx="5" ry="6" fill="#FB7185"/>
      <ellipse cx="68" cy="46" rx="5" ry="6" fill="#FB7185"/>
      <text x="50" y="93" font-family="'Fredoka', sans-serif" font-size="9" font-weight="bold" fill="#F43F5E" text-anchor="middle">high paw! 🐾</text>
    </svg>`
  },
  {
    id: 'cat-sleepy-loaf',
    name: 'Sleepy Cat Loaf',
    category: 'cats',
    emoji: '💤',
    label: 'Sleepy Kitty',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Sleeping loaf kitty -->
      <ellipse cx="50" cy="58" rx="36" ry="24" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
      <!-- Striped markings -->
      <path d="M 40 40 L 42 50 M 50 38 L 50 50 M 60 40 L 58 50" stroke="#B45309" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="28" cy="52" r="16" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
      <path d="M 18 42 L 14 30 L 26 36 Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.8"/>
      <path d="M 32 40 L 36 30 L 40 42 Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.8"/>
      <!-- Happy sleeping eyes -->
      <path d="M 22 54 Q 25 58 28 54 M 32 54 Q 35 58 38 54" stroke="#78350F" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Snoring Zzz -->
      <text x="75" y="32" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#3B82F6">Z</text>
      <text x="83" y="24" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="10" fill="#60A5FA">z</text>
      <text x="89" y="18" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="8" fill="#93C5FD">z</text>
    </svg>`
  },
  {
    id: 'cat-heart-eyes',
    name: 'Heart Eyes Cat',
    category: 'cats',
    emoji: '😻',
    label: 'In Love Kitty',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="52" r="32" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <path d="M 26 36 L 20 16 L 40 26 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <path d="M 74 36 L 80 16 L 60 26 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <!-- Heart eyes -->
      <path d="M 38 46 C 38 42, 32 40, 31 46 C 30 52, 38 57, 38 57 C 38 57, 46 52, 45 46 C 44 40, 38 42, 38 46 Z" fill="#EF4444"/>
      <path d="M 62 46 C 62 42, 56 40, 55 46 C 54 52, 62 57, 62 57 C 62 57, 70 52, 69 46 C 68 40, 62 42, 62 46 Z" fill="#EF4444"/>
      <circle cx="30" cy="58" r="4" fill="#FDA4AF"/>
      <circle cx="70" cy="58" r="4" fill="#FDA4AF"/>
      <path d="M 46 58 Q 50 63 54 58" stroke="#475569" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },

  // ==================== LOVE & DOODLES ====================
  {
    id: 'doodle-sparkle-stars',
    name: 'Glitter Stars',
    category: 'love_doodles',
    emoji: '✨',
    label: 'Sparkles',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 15 L 53 38 L 76 41 L 55 48 L 58 71 L 43 53 L 20 56 L 38 43 L 30 20 L 45 35 Z" fill="#FBBF24" stroke="#F59E0B" stroke-width="1.5"/>
      <circle cx="50" cy="43" r="4" fill="#FFF"/>
      <path d="M 75 65 L 77 75 L 87 77 L 78 81 L 79 91 L 72 83 L 62 85 L 70 78 L 66 68 L 73 75 Z" fill="#F472B6"/>
      <circle cx="25" cy="75" r="3" fill="#60A5FA"/>
      <circle cx="80" cy="25" r="2.5" fill="#34D399"/>
    </svg>`
  },
  {
    id: 'doodle-cherry-couple',
    name: 'Sweet Cherries',
    category: 'love_doodles',
    emoji: '🍒',
    label: 'Pair of Cherries',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Stems -->
      <path d="M 36 55 Q 46 25 54 20 Q 56 25 68 55" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 54 20 Q 64 12 70 18 Q 62 26 54 20 Z" fill="#22C55E"/>
      <!-- Cherry 1 -->
      <circle cx="36" cy="65" r="16" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
      <circle cx="31" cy="59" r="4" fill="#FFF" opacity="0.8"/>
      <!-- Cute face -->
      <circle cx="33" cy="65" r="1.5" fill="#450A0A"/>
      <circle cx="41" cy="65" r="1.5" fill="#450A0A"/>
      <circle cx="29" cy="68" r="2.5" fill="#FCA5A5"/>
      <circle cx="45" cy="68" r="2.5" fill="#FCA5A5"/>
      <!-- Cherry 2 -->
      <circle cx="68" cy="65" r="16" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
      <circle cx="63" cy="59" r="4" fill="#FFF" opacity="0.8"/>
      <!-- Cute winking face -->
      <path d="M 62 65 Q 65 62 68 65" stroke="#450A0A" stroke-width="1.8" fill="none"/>
      <circle cx="73" cy="65" r="1.5" fill="#450A0A"/>
      <circle cx="61" cy="68" r="2.5" fill="#FCA5A5"/>
      <circle cx="77" cy="68" r="2.5" fill="#FCA5A5"/>
    </svg>`
  },
  {
    id: 'doodle-pink-ribbon',
    name: 'Coquette Bow',
    category: 'love_doodles',
    emoji: '🎀',
    label: 'Coquette Bow',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 48 48 C 32 30, 10 38, 24 55 C 38 68, 48 54, 48 50 Z" fill="#FB7185" stroke="#E11D48" stroke-width="2"/>
      <path d="M 52 48 C 68 30, 90 38, 76 55 C 62 68, 52 54, 52 50 Z" fill="#FB7185" stroke="#E11D48" stroke-width="2"/>
      <path d="M 44 54 Q 38 75 30 84 Q 44 80 48 58" fill="#F43F5E" stroke="#E11D48" stroke-width="1.5"/>
      <path d="M 56 54 Q 62 75 70 84 Q 56 80 52 58" fill="#F43F5E" stroke="#E11D48" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="6" fill="#BE123C" stroke="#9F1239" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'doodle-sweet-hearts',
    name: 'Floating Hearts',
    category: 'love_doodles',
    emoji: '💖',
    label: 'Sparkle Heart',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 35 C 50 20, 24 18, 20 40 C 16 62, 50 82, 50 82 C 50 82, 84 62, 80 40 C 76 18, 50 20, 50 35 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="2.5"/>
      <ellipse cx="36" cy="36" rx="5" ry="9" transform="rotate(-30 36 36)" fill="#FFF" opacity="0.7"/>
      <circle cx="42" cy="27" r="2.5" fill="#FFF" opacity="0.9"/>
      <!-- Tiny baby heart -->
      <path d="M 78 22 C 78 16, 70 15, 68 22 C 66 30, 78 38, 78 38 C 78 38, 90 30, 88 22 C 86 15, 78 16, 78 22 Z" fill="#FBBF24"/>
    </svg>`
  },
  {
    id: 'doodle-washi-tape',
    name: 'Pastel Washi Tape',
    category: 'love_doodles',
    emoji: '🏷️',
    label: 'Washi Tape',
    svgContent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 38 L 14 42 L 10 46 L 14 50 L 10 54 L 14 58 L 90 58 L 86 54 L 90 50 L 86 46 L 90 42 L 86 38 Z" fill="#FDE047" opacity="0.85" stroke="#EAB308" stroke-width="1.5"/>
      <path d="M 25 38 L 35 58 M 45 38 L 55 58 M 65 38 L 75 58" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/>
      <text x="50" y="52" font-family="'Caveat', cursive" font-weight="bold" font-size="12" fill="#713F12" text-anchor="middle">cute moment</text>
    </svg>`
  }
];
