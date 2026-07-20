# Portfolio Backend API

Node.js + Express + MongoDB backend that powers **both**:
- your Next.js portfolio (read-only public routes)
- your Vite React admin panel (protected CRUD routes)

## 1. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` → from MongoDB Atlas (Database → Connect → Drivers)
- `JWT_SECRET` → any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` → your login credentials for the admin panel
- `CLOUDINARY_*` → from cloudinary.com dashboard (free tier is fine, used for image uploads)
- `CLIENT_URLS` → comma separated list, e.g. `http://localhost:3000,http://localhost:5173`

## 2. Create your admin login + default data

```bash
npm run seed
```

This creates your admin user (so you can log in to the admin panel) and empty
Hero/About/Contact documents so the admin panel isn't blank on first load.

## 3. Run the server

```bash
npm run dev      # development, with auto-restart
npm start        # production
```

Server runs on `http://localhost:5000` by default.

## API Reference

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | `{ email, password }` → returns JWT |
| GET | `/api/auth/me` | Private | Get logged-in admin profile |
| PUT | `/api/auth/change-password` | Private | `{ currentPassword, newPassword }` |

### Public (used by the Next.js portfolio — no auth needed)
| Method | Route | Description |
|---|---|---|
| GET | `/api/hero` | Hero section content |
| GET | `/api/about` | About section content |
| GET | `/api/skills` | All skills, grouped/sorted |
| GET | `/api/experience` | All experience entries |
| GET | `/api/projects` | All projects (`?featured=true` for homepage) |
| GET | `/api/projects/:id` | Single project (for details modal) |
| GET | `/api/certifications` | All certifications |
| GET | `/api/achievements` | All achievements/counters |
| GET | `/api/contact` | Contact info |
| POST | `/api/contact/message` | Submit contact form → `{ name, email, subject, message }` |

### Admin (used by the Vite admin panel — all require `Authorization: Bearer <token>`)
| Method | Route | Description |
|---|---|---|
| GET/PUT | `/api/admin/hero` | Read/update Hero (singleton) |
| GET/PUT | `/api/admin/about` | Read/update About (singleton) |
| GET/PUT | `/api/admin/contact` | Read/update Contact info (singleton) |
| GET/POST | `/api/admin/skills` | List / create skill |
| PUT/DELETE | `/api/admin/skills/:id` | Update / delete skill |
| PUT | `/api/admin/skills/reorder` | Bulk reorder → `{ items: [{id, order}] }` |
| GET/POST | `/api/admin/experience` | List / create experience entry |
| PUT/DELETE | `/api/admin/experience/:id` | Update / delete |
| GET/POST | `/api/admin/projects` | List / create project |
| PUT/DELETE | `/api/admin/projects/:id` | Update / delete |
| GET/POST | `/api/admin/certifications` | List / create certification |
| PUT/DELETE | `/api/admin/certifications/:id` | Update / delete |
| GET/POST | `/api/admin/achievements` | List / create achievement |
| PUT/DELETE | `/api/admin/achievements/:id` | Update / delete |
| GET | `/api/admin/messages` | View contact form submissions (inbox) |
| PUT | `/api/admin/messages/:id/read` | Mark message as read |
| DELETE | `/api/admin/messages/:id` | Delete message |
| POST | `/api/admin/upload` | Upload image (`multipart/form-data`, field name `image`) → returns Cloudinary URL |

## Example: adding a new skill from the admin panel

```
POST /api/admin/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React Native",
  "category": "Mobile",
  "icon": "react",
  "proficiency": 85,
  "order": 1
}
```

The Next.js portfolio's `GET /api/skills` will immediately include it —
**no code changes needed on the portfolio side.**

## Deployment notes
- Works well on Railway / Render / Vercel (serverless needs small tweaks) / any Node host.
- Make sure to add your deployed frontend URLs to `CLIENT_URLS` in production env vars.
- Never commit your `.env` file.
