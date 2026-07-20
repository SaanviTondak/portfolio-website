# Saanvi Tondak — Portfolio

A modern, cinematic single-page portfolio for **Saanvi Tondak** — Data
Scientist / AI Engineer, Singapore.

Built with **React + Vite**, a live **three.js / react-three-fiber** 3D avatar,
**GSAP + ScrollTrigger** scroll animations, **Lenis** momentum scrolling, and
the **Geist** typeface. Dark theme with a pink accent system.

---

## ✨ Features

- Animated page-load intro sequence
- Smooth momentum scrolling (Lenis) synced with GSAP ScrollTrigger
- Live 3D avatar that reacts to scroll, with soft pink rim lighting
  (graceful procedural placeholder until you add your own model)
- Scroll-triggered reveals + parallax throughout
- Fixed navbar, vertical social rail, and resume badge
- Experience timeline with a glowing pink dot that travels as you scroll
- Pinned horizontal-scrolling project gallery (swipeable on mobile)
- Tech-stack grid lit by a pulsing pink orb
- Fully responsive; respects `prefers-reduced-motion`
- All colors/fonts centralized in `src/styles/theme.css`

---

## 🚀 Getting started

Requires **Node 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Production build → ./dist
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 📦 Deploy to Vercel

**Option A — Dashboard**
1. Push this folder to a GitHub/GitLab repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

**Option B — CLI**
```bash
npm i -g vercel
vercel          # follow prompts (first deploy = preview)
vercel --prod   # promote to production
```

> Also works on Netlify (build `npm run build`, publish `dist`) or any static host.

---

## 🎨 Tweaking the design

All design tokens live in **`src/styles/theme.css`** — background, text colors,
the pink accents (`--accent`, `--accent-bright`), typography, spacing, and
motion easings. Change the accent in one place and it updates everywhere.

---

## 📁 Project structure

```
├─ index.html
├─ vite.config.js
├─ public/
│  ├─ models/        # ← your 3D avatar (.glb)
│  ├─ projects/      # ← your project preview images
│  ├─ resume.pdf     # ← your resume (add this file)
│  └─ favicon.svg
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ data/content.js        # ← ALL editable copy, links & lists
   ├─ lib/gsap.js            # GSAP + ScrollTrigger registration
   ├─ hooks/                 # useLenis, useReveal, usePrefersReducedMotion
   ├─ components/            # Navbar, SocialSidebar, ResumeCorner, Intro, GlowBlobs, icons
   └─ sections/             # Hero, About, Work, TechStack, Footer
      └─ avatar/            # Avatar (Canvas), AvatarModel (GLB), PlaceholderAvatar
```

---

## ✅ Placeholders & assets to fill in

Everything below is either marked with `[SQUARE BRACKETS]` in
`src/data/content.js` or is an asset path. Search the project for `[` to jump
between the text placeholders.

| # | What | Where |
|---|------|-------|
| 1 | **Timeline entries** — replace `[ROLE]`, `[Freelance & Projects]`, and the description text for NOW / 2025 / 2024 / 2023 / 2022 / 2021 | `src/data/content.js` → `timeline` |
| 2 | **5 projects** — replace `[PROJECT NAME]`, categories, tech lists, and `href` links | `src/data/content.js` → `projects` |
| 3 | **Project images** — `project-1.jpg … project-5.jpg` | `public/projects/` |
| 4 | **Social profile URLs** — replace the `#` hrefs (sidebar + footer) | `src/data/content.js` → `socials`, `footerSocials` |
| 5 | **Resume** — add your PDF | `public/resume.pdf` |
| 6 | **3D avatar model** — add `avatar.glb` (until then a placeholder shows) | `public/models/avatar.glb` |
| 7 | **Tech stack** (optional) — edit the list / add icons | `src/data/content.js` → `techStack` |
| 8 | **"See All Works" / "View project" links** (optional) | `src/sections/Work.jsx`, `content.js` |

Your personal details (name, roles, email `saanvitondak2004@gmail.com`,
location Singapore) are already filled in throughout — no placeholders there.

See the `README.md` inside `public/models/` and `public/projects/` for
model/image specifics.

---

Designed & developed for Saanvi Tondak.
