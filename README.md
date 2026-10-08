# Hypelaunch

Next.js app for memecoin market intelligence and launch readiness (Pump.fun-style launches).

## Run locally

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY for live AI reports
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Flow

1. Enter a memecoin idea on the landing page.
2. Click **Check** for a free preview or **Launch** for the full paid kit.
3. Unlock **Launch** via mock Solana payment to reveal landing, journey map, and X/Telegram content.

Generation: `lib/generate-launch-kit.ts` (server) · fallback: `lib/mock.ts`.
