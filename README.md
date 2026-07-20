# Lakshya Bhartiya — Portfolio Monorepo

Three projects in one repo:

```
.
├── backend/        Node.js + Express + MongoDB API (single source of truth)
├── admin-panel/     React + Vite dashboard to manage all content
└── portfolio/       Next.js portfolio (public site)
```

`admin-panel` and `portfolio` both talk to `backend` over HTTP. Anything you
add/edit/delete in the admin panel shows up on the portfolio instantly — no
code changes needed on either frontend.

## Setup order (important — follow this order)

### 1. Backend first
```bash
cd backend
npm install
cp .env.example .env      # fill in MongoDB Atlas URI, JWT secret, Cloudinary keys
npm run seed               # creates your admin login + default content
npm run dev                 # runs on http://localhost:5000
```

### 2. Admin panel
```bash
cd admin-panel
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev                 # runs on http://localhost:5173
```
Log in with the email/password you set in `backend/.env`, then fill in Hero,
About, Skills, Experience, Projects, Certifications, Achievements, Contact.

### 3. Portfolio
```bash
cd portfolio
npm install
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev                  # runs on http://localhost:3000
```

Each folder has its own detailed README with the full API reference, feature
list, and deployment notes.

## Deployment
- **backend** → Railway / Render / any Node host (+ MongoDB Atlas)
- **admin-panel** → Vercel / Netlify (static build)
- **portfolio** → Vercel

Remember to update each `.env` with production URLs once deployed (backend's
`CLIENT_URLS`, admin panel's `VITE_API_URL`, portfolio's `NEXT_PUBLIC_API_URL`
and `NEXT_PUBLIC_SITE_URL`).
