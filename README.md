# Vaultra Pay: Landing Page

The official landing page for **Vaultra Pay**, the app that turns crypto into spendable money. Crypto in, fiat out, one app.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist

Signups are captured by the popup and sent to a MailerLite group through `app/api/waitlist/route.ts`.

Create a `.env.local` file in the project root:

```
MAILERLITE_API_KEY=your-api-token
MAILERLITE_GROUP_ID=your-group-id
```

- **API token** — MailerLite dashboard → *Integrations → API*.
- **Group ID** — open the group in MailerLite; it's the `group=` value in the URL.

Without these, signups are logged to the server console and the form still works — handy for local development.

## Deploy

```bash
npm install -g vercel
vercel
```

Add `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` under **Project → Settings → Environment Variables**, then redeploy. Point a custom domain at the deployment whenever you're ready.

## Brand

- **Orange** — `#FF5A1F`
- **Black** — `#0A0A0A`
- **Type** — Pretendard Variable
- **Logo** — SVG, rebuilt from the brand deck (castle + bridge)

## Structure

```
app/
├── api/waitlist/route.ts   — waitlist endpoint (MailerLite)
├── layout.tsx
└── page.tsx
components/                 — Navbar, Hero, Problem, Features,
                              HowItWorks, Showcase, Footer,
                              NewsletterPopup, PhoneMockup, Logo
lib/
└── newsletter.ts           — shared popup trigger
```
