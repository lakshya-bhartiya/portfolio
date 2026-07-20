# Portfolio (Next.js)

Full premium portfolio front-end. Fetches all its content — Hero, About,
Skills, Experience, Projects, Certifications, Achievements, Contact — from
the **backend API**, so every edit made in the **admin panel** shows up here
automatically with no code changes.

## Features
- Loading screen (logo + name reveal + progress bar)
- Custom cursor with glow trail (desktop only, auto-disabled on touch)
- Canvas particle background + animated aurora gradient blobs
- 3D floating wireframe shape in Hero (React Three Fiber, mouse parallax)
- Scroll progress bar, back-to-top button, smooth scroll
- Navbar: blur on scroll, hides on scroll-down/shows on scroll-up, active-section underline
- Dark/light mode toggle (persisted)
- Section reveal animations (fade/slide/stagger) via Framer Motion
- Skills: animated circular progress rings, grouped by category
- Infinite tech-stack marquee
- Experience: animated vertical timeline
- Projects: 3D tilt + spotlight hover cards, filter tabs, fullscreen gallery modal
- GitHub Activity: live stats/streak/top-languages cards (github-readme-stats)
- Achievements: animated 0 → N counters
- Contact: React Hook Form + Zod validated form, posts straight to your backend inbox
- SEO: Metadata API, Open Graph, sitemap.xml, robots.txt
- Google Analytics (optional, just add your ID)
- Reduced-motion support or accessibility

## 1. Setup

Make sure the **backend** is running first (see its README).

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=
```

## 2. Run

```bash
npm run dev
```
Opens at `http://localhost:3000`.

## 3. Build for production

```bash
npm run build
npm start
```

> Note: `next/font` downloads Space Grotesk / Inter / JetBrains Mono from
> Google Fonts at build time — you just need normal internet access for the
> build step (this is standard for any Next.js app using `next/font/google`).

## Content notes
- **GitHub Activity section** auto-detects your GitHub username from the
  GitHub link you set in the admin panel (Hero → Social Links, or Contact →
  GitHub).
- **Resume button** only appears once you paste a resume URL in the admin
  panel's Hero section.
- If a section has no data yet (e.g. no certifications added), that section
  simply doesn't render — nothing breaks.

## Deployment (Vercel)
1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add the same env vars from `.env.example` in Vercel's project settings
   (point `NEXT_PUBLIC_API_URL` at your deployed backend).
4. Deploy.

## Adding an OG image
Drop a 1200×630 image at `public/og-image.png` (and a `public/favicon.ico`)
for social share previews — the metadata already references these paths.
