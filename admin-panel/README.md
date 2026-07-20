# Portfolio Admin Panel

React + Vite + Tailwind admin dashboard to manage all content on your Next.js
portfolio — Hero, About, Skills, Experience, Projects, Certifications,
Achievements, Contact info, and incoming Messages.

## 1. Setup

Make sure the **backend** (portfolio-backend) is already running first.

```bash
cd admin-panel
npm install
cp .env.example .env
```

Edit `.env` and point it at your backend:
```
VITE_API_URL=http://localhost:5000/api
```

## 2. Run

```bash
npm run dev
```

Opens at `http://localhost:5173`. Log in with the admin email/password you
set in the backend's `.env` (created via `npm run seed`).

## 3. Build for production

```bash
npm run build
```

Outputs static files to `dist/` — deploy to Vercel/Netlify like any Vite app.
Remember to set `VITE_API_URL` to your deployed backend URL in your hosting
provider's environment variables.

## What you can manage here
- **Hero** — name, tagline, profile image, resume link, socials, CTA labels
- **About** — bio, education entries, technologies, career goals
- **Skills** — add/edit/delete, grouped by category, reorder with up/down arrows
- **Experience** — work history with bullet points
- **Projects** — multi-image upload, tech stack, features, links, "Featured" toggle
- **Certifications** — badge image, issuer, date, verify link
- **Achievements** — the animated counter numbers (e.g. "20+ Projects")
- **Contact Info** — email/phone/socials shown on the portfolio
- **Messages** — inbox of everything submitted through your portfolio's contact form

Every change here reflects instantly on the live portfolio (it just calls the
same backend API) — no code changes needed on the Next.js side.
