# A Little Birthday Universe 🎂✨

A tiny handmade **digital birthday scrapbook** for **Yukti** — an opening envelope surprise, a birthday card, a 9-photo polaroid wall, three clickable handwritten notes, a final surprise with confetti, and wholesome friendship energy throughout.

> Made with React + Vite + Framer Motion. No backend, no database, no paid APIs. Just a lot of ✨.

---

## 🎁 What's inside

| Section | Interaction |
|---|---|
| **Opening scene** | An illustrated envelope that opens with confetti, then reveals the site |
| **Greeting** | A birthday card with a typewriter teaser + expandable full message |
| **Photo scrapbook** | 9 tilted polaroids with washi tape, stickers, captions and a click-to-zoom lightbox |
| **Three little notes** | Clickable envelopes (🌷 😂 🎂) that unfold into paper letters |
| **Final surprise** | One last button that reveals a hidden message with confetti rain + replay |
| **Compliment dispenser** | Random friendly compliments from an editable list |
| **Music toggle** | Optional background music, OFF by default, hides if no audio file exists |
| **Extras** | Floating doodles, sparkle cursor (desktop only), back-to-top, reduced-motion support |

Everything is keyboard accessible (notes open with Enter, close with Escape), mobile-first, and respects `prefers-reduced-motion`.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173/** (it opens automatically).

Production build:

```bash
npm run build
npm run preview
```

---

## ✏️ Customize everything (one file!)

**All personal content lives in [`src/config.js`](src/config.js):**

- `opening` — the first screen texts
- `greeting` — the main heading + birthday card message (teaser + full message)
- `photos` — list each photo with `src`, `caption`, `rotation`, `tapeColor`
- `notes.items` — the three note previews, titles and full messages
- `finalSurprise` — hidden message + button labels
- `compliments.list` — add/remove compliments freely
- `music` — toggle + audio path
- `palette` — the whole color theme as CSS variables

### 📸 Adding / changing photos

Drop images into `public/images/` and list them in `config.photos`. If a listed file is missing, a cute hand-drawn placeholder shows instead — the site never breaks.

### 🎵 Adding music

Save a song as `public/audio/birthday-song.mp3` (or change `config.music.src`). The music button stays hidden until the file actually exists.

---

## 🌍 Deploy it

**Vercel (easiest):** import this repo → framework auto-detected (Vite) → Deploy. Every `git push` redeploys automatically.

**Netlify:** build command `npm run build`, publish directory `dist`.

**GitHub Pages:** use a GitHub Action that runs `npm run build` and publishes `dist/`.

---

## 🗂 Project structure

```
├── index.html                     fonts (Caveat · Playfair Display · Nunito)
├── src/
│   ├── config.js                  ← ALL editable content
│   ├── App.jsx                    wires sections + injects the palette
│   ├── styles/global.css          design system (palette-as-CSS-vars, buttons, squiggles)
│   ├── utils/  confetti.js · hooks.js
│   └── components/
│       OpeningScene · Greeting · Scrapbook · Notes · NoteModal
│       FinalSurprise · Compliments · MusicToggle · BackToTop
│       Lightbox · FloatingDoodles · SparkleTrail · Reveal
└── public/
    ├── images/                    ← Yukti's photos go here
    └── audio/                     ← optional birthday song
```

---

## 💜 Credits

A small, thoughtful gift from one friend to another. Keep being awesome, Yukti! 🥳🤝
