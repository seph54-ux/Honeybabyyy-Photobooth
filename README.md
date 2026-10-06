# Honeybabyyy Booth 📸💖

A romantic, aesthetic virtual photobooth Progressive Web App (PWA) crafted for capturing sweet moments with custom photo strips, interactive stickers, retro camera sounds, and high-resolution downloads.

---

## 🌸 Overview & Description

**Honeybabyyy Booth** transforms any desktop or mobile browser into a retro-style Korean/Japanese photo booth. Users can pose with a live camera, choose timed countdowns or automated multi-shot sequences, apply soft color filters, decorate photo strips with playful stickers and love notes, and export high-resolution keepsake strips.

The application is fully responsive and installable as a standalone Progressive Web App (PWA) on both iOS (Safari) and Android (Chrome) devices.

---

## 🛠️ Framework & Technology Stack

- **Frontend Framework:** [React 19](https://react.dev/) (Functional components, custom hooks, and React DOM)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing across configurations, canvas renderers, and components)
- **Build Tool & Bundler:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **PWA Integration:** `vite-plugin-pwa` powered by Workbox (Service Worker, Web App Manifest, offline asset precaching)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals & Effects:** 
  - HTML5 Canvas 2D API for high-resolution composite strip generation
  - `canvas-confetti` for celebratory burst animations
- **Audio Engine:** Custom Web Audio API synthesizer for shutter clicks, countdown beeps, and pop effects
- **Production Server:** [Express 4](https://expressjs.com/) bundled via [esbuild](https://esbuild.github.io/)

---

## ⚙️ Environment & Architecture

- **Runtime Environment:** Node.js (v22+ ESM)
- **Target Platform:** Web (Cross-browser desktop and mobile) / Containerized Cloud Run
- **Network & Ports:** 
  - Development server runs on port `3000` (`0.0.0.0`)
  - Production Express server dynamically binds to `process.env.PORT` (defaults to `3000`)
- **Health Check:** Dedicated `/healthz` endpoint for cloud container orchestration
- **Display Modes:**
  - Standard responsive web view
  - PWA standalone full-screen mode (borderless, native-like mobile app experience)

---

## ✨ Essential Capabilities

- **Live Camera & Sequencer:**
  - Real-time webcam stream with mirror flip option and device upload fallback.
  - Multi-shot auto-sequencer (automatically snaps each photo in sequence with timed intervals).
  - Configurable countdown timer (0s, 3s, 5s, 10s per shot).

- **Photo Strip Layouts:**
  - Classic 4-Photo Vertical Strip
  - 3-Photo Vertical Strip
  - 2x2 Grid (K-Photo Booth style)
  - Vintage Polaroid Single
  - Retro Film Roll Strip

- **Artistic Customization:**
  - **Color Filters:** Rosy Glow, Natural Clean, Vintage Warm, B&W Classic, Pastel Dream, Warm Sunset.
  - **Themed Borders:** Sweetheart Pink, Honey Peach, Matcha Dream, Lavender Romance, Vintage Cream, and Dark Romance.
  - **Sticker Collections:** Minions, Puung romantic art, cute girl aesthetic, cats, and love doodles with interactive positioning, scaling, and rotation.
  - **Typography:** Handwritten Google Fonts (Caveat, Fredoka, Gaegu, Indie Flower, Pacifico, Playfair Display) with custom captions and dates.

- **Gallery & Export:**
  - In-browser session gallery to manage and compare multiple takes.
  - High-resolution lossless PNG export using pure HTML5 Canvas.
  - Native Mobile Web Share API integration (AirDrop, Messages, Instagram) with clipboard copy fallback.
