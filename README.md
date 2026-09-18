# NIKHIL Portfolio — Full-Stack Build

Turns the static portfolio into a real full-stack app for the Thiranex
"Personal Portfolio Website" task:

- **Frontend**: the existing HTML/CSS/JS portfolio (unchanged visually) — the
  Projects section now fetches its data from the API instead of being
  hardcoded.
- **Backend**: Node.js + Express, `server.js`
- **Database**: MongoDB (Atlas free tier), via Mongoose — `models/Project.js`
- **Deploy**: Render (recommended) or any Node host

## 1. Get a free MongoDB database (5 min)

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (free).
2. Create a free **M0 cluster** (any region close to India, e.g. Mumbai).
3. Under **Database Access**, add a database user with a username/password.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere) —
   fine for a student project.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add a database name before the `?`, e.g. `.../portfolio?retryWrites=...`

## 2. Run it locally

```bash
cd portfolio-fullstack
npm install
cp .env.example .env
# edit .env: paste your MONGODB_URI, set any ADMIN_KEY value

npm run seed     # loads your 4 existing projects into the database
npm start        # starts the server
```

Open **http://localhost:3000** — your portfolio, now reading projects live
from MongoDB.

Check the API directly: **http://localhost:3000/api/projects**

## 3. Add / edit / remove a project later

No redeploy needed — just call the API (replace `YOUR_ADMIN_KEY` and
`YOUR_URL`):

```bash
curl -X POST https://YOUR_URL/api/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -d '{
    "slug": "new-project",
    "path": "~/projects/new-project",
    "title": "New Project",
    "status": "progress",
    "description": "What it does.",
    "tags": ["Python", "APIs"],
    "repoLink": "https://github.com/Nikhil-creat/new-project",
    "order": 5
  }'
```

`PUT /api/projects/:slug` updates one, `DELETE /api/projects/:slug` removes
one — same header required.

## 4. Deploy (Render — free, and unlike Heroku's free tier, still exists)

1. Push this folder to a GitHub repo.
2. Go to https://render.com → **New → Web Service** → connect the repo.
3. Settings:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
4. Under **Environment**, add the same variables from your `.env`:
   `MONGODB_URI`, `ADMIN_KEY` (Render sets `PORT` itself).
5. Deploy. Render gives you a live URL — that's what you submit.
6. Run the seed script once against production data either by temporarily
   running `npm run seed` locally with the same `MONGODB_URI` (simplest —
   it's the same database either way), or via Render's shell tab.

### Alternative: Vercel / Netlify
Those are built for static sites + serverless functions rather than a
long-running Express server. It's doable (move the routes into
`/api/*.js` serverless functions) but adds complexity for no real benefit
here — Render is the more direct fit for "Node/Express + database" as
written in the brief.

## 5. The garage page

`garage.html` (the standalone 3D car showcase) isn't part of this backend
build — it's a separate static page. Drop your existing `garage.html` into
the `public/` folder and it'll be served automatically at `/garage.html`,
exactly like before.

## What changed vs. the original file

Only the **Projects** section of `index.html`: the four hardcoded cards were
replaced with a container that fetches `/api/projects` and renders the same
markup client-side. Everything else (About, Skills, Experience,
Certifications, Contact, the 3D hero) is untouched.

## 👤 About the Builder

**NIKHIL CHARY SRIRAMOJU**
B.Tech Final Year — Computer Science & Engineering

- 🔗 LinkedIn: [nikhil-chary-sriramoju](https://in.linkedin.com/in/nikhil-chary-sriramoju-95041b38a)
- 💻 GitHub: [Nikhil-creat](https://github.com/Nikhil-creat)
- 📧 Email: sriramojunikhil66@gmail.com
- 📸 Instagram: [nikhil__sriramoju](https://www.instagram.com/nikhil__sriramoju)

  
