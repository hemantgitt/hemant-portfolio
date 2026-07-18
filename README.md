# Hemant Jha — Portfolio

Personal portfolio of **Hemant Jha**, Senior Frontend Engineer.

Built with **Next.js 15 (App Router)**, **React 18**, **TailwindCSS**, **shadcn/ui**, **Framer Motion**, and **Lucide** icons. Deployed on **Vercel**.

Live: [https://hemant.dev](https://hemant.dev)

---

## 🚀 Getting started

### Prerequisites

* Node.js **>= 18.18**
* npm **>= 9** (or yarn / pnpm)

### Install

```bash
npm install
```

### Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

---

## 🔐 Environment variables

Copy `.env.example` to `.env.local` and adjust:

| Variable               | Required | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public site URL used for SEO canonical, OpenGraph and sitemap.     |

Defaults to `https://hemant.dev` if not set.

---

## ▲ Deploying to Vercel

### One-click via UI

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset is auto-detected (**Next.js**). No build overrides needed.
4. (Optional) Add environment variable **`NEXT_PUBLIC_SITE_URL`** = `https://your-domain.com`.
5. Click **Deploy**.

### Via CLI

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### Custom domain

In the Vercel dashboard → **Settings → Domains** → add `hemant.dev` and follow DNS instructions.

---

## 📁 Project structure

```
.
├── app/
│   ├── api/[[...path]]/route.js   # Catch-all API route (health check)
│   ├── globals.css                # Tailwind + design tokens
│   ├── layout.js                  # Root layout, fonts, metadata, SEO
│   ├── page.js                    # Home page (hero, skills, projects, contact)
│   └── providers.js               # React Query provider
├── components/ui/                 # shadcn/ui components
├── lib/                           # utils, constants
├── public/
│   └── Hemant_Jha_Resume.pdf      # Downloadable resume
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json                  # Path aliases (@/*)
├── vercel.json
├── package.json
└── README.md
```

---

## 🧰 Tech stack

* **Framework** — Next.js 15 (App Router, Server Components)
* **UI** — TailwindCSS 3, shadcn/ui, Radix primitives
* **Motion** — Framer Motion (subtle only)
* **Icons** — Lucide React
* **Notifications** — Sonner
* **Fonts** — Inter + JetBrains Mono via `next/font/google`

---

## 📝 Customising the content

Everything editable lives in `app/page.js`:

* `EMAIL`, `PHONE`, `PHONE_RAW` — contact details
* `SKILL_GROUPS` — skill categories & chips
* `PROJECTS` — project cards & case studies

---

## 📜 License

MIT © Hemant Jha
