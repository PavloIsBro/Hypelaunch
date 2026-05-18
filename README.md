# Hypelaunch

Next.js app for generating memecoin launch kits (mock data).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Flow

1. Enter a memecoin idea on the landing page.
2. Click **Generate Launch Kit** — loading animation (~2s).
3. View results: Interest Score, Launch Readiness Score, tweets, landing preview.

Mock generation lives in `lib/mock.ts`.
