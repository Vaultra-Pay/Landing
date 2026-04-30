# Vaultra Landing Page

The official landing page for **Vaultra Pay** — where fiat meets crypto.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

---

## Getting started

```bash
cd landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist email capture

Three options, pick one:

### Option A — Web3Forms (recommended for launch)

1. Go to <https://web3forms.com>
2. Enter your destination email, get an access key (no account required)
3. Create `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

4. Paste your key:

   ```
   WEB3FORMS_ACCESS_KEY=your-access-key-here
   ```

Signups will arrive in your inbox.

### Option B — Formspree

1. Sign up at <https://formspree.io>, create a form, copy the endpoint URL.
2. In `.env.local`:

   ```
   FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
   ```

### Option C — Supabase (for later, when you're building the real app)

Replace the body of `app/api/waitlist/route.ts` with a Supabase insert. The current code is structured so it's a one-function swap.

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add `WEB3FORMS_ACCESS_KEY` (or `FORMSPREE_ENDPOINT`) in the Vercel dashboard under **Project → Settings → Environment Variables**, then redeploy.

You'll get a free `*.vercel.app` URL. Point a custom domain at it whenever you're ready.

## Brand guidelines used

- **Primary:** `#FF5A1F` (Vaultra orange)
- **Background:** `#0A0A0A` (brand black)
- **Typography:** Pretendard Variable (loaded via CDN)
- **Logo:** Rebuilt as SVG based on the brand identity deck (castle + bridge)

## Project structure

```
landing/
├── app/
│   ├── api/waitlist/route.ts    ← waitlist endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Logo.tsx                 ← Vaultra logo (SVG)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Showcase.tsx             ← phone mockup with animations
│   ├── Waitlist.tsx
│   └── Footer.tsx
├── public/
│   └── favicon.svg
├── tailwind.config.ts
└── package.json
```
