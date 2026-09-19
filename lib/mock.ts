import { mapLandingPageFields } from "./landing-page";
import type { LaunchKitFull } from "./types";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length];
}

function scoreFromSeed(seed: number, min: number, max: number): number {
  return min + (seed % (max - min + 1));
}

function parseIdea(idea: string) {
  const words = idea
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  const base = words[0] || "Hype";
  const tokenName = `${base.charAt(0).toUpperCase()}${base.slice(1).toLowerCase()} Coin`;
  const ticker = (
    words
      .slice(0, 3)
      .map((w) => w[0])
      .join("") || "HYP"
  )
    .toUpperCase()
    .padEnd(3, "X")
    .slice(0, 5);

  return { base, tokenName, ticker, words };
}

/** Always returns the full Launch-tier dataset; UI gates by payment. */
export function generateMockLaunchKit(idea: string): LaunchKitFull {
  const trimmed = idea.trim();
  const seed = hashString(trimmed.toLowerCase() || "hypelaunch");
  const { base, tokenName, ticker } = parseIdea(trimmed);

  const narrativeSummary = `${tokenName} ($${ticker}) — "${trimmed.slice(0, 100)}" as a Pump.fun-style culture coin; meme-first, bonding-curve native, CT attention as the primary liquidity driver.`;

  const interestScore = scoreFromSeed(seed, 58, 91);
  const launchReadinessScore = scoreFromSeed(seed >> 3, 44, 84);

  return {
    idea: trimmed,
    tokenName,
    ticker,
    narrativeSummary,
    interestScore,
    interestReasoning: pick(
      [
        `The "${base}" angle is pulling quote-tweets in the last 48–72h window — attention velocity is above baseline for new Pump.fun launches, but still below peak meta runners.`,
        `Narrative recall is strong if visuals are one-glance; CT is engaging with similar hooks but not yet saturated enough to kill a fast entry.`,
        `Interest is moderate-high: the idea maps to an active bucket, but you need a sharper differentiation line before bonding-curve momentum stalls.`,
      ],
      seed,
    ),
    launchReadinessScore,
    launchReadinessReasoning: pick(
      [
        `Packaging is 70% there: one-liner works, but competitor density means you need a clear timing signal and risk framing before deploy.`,
        `Readiness is held back by narrative overlap — fix positioning and launch window before treating this as a green-light deploy.`,
        `Strong hook, weak shelf-life planning — readiness improves if you tighten Pump.fun narrative fit and pre-wire CT coordination.`,
      ],
      seed + 1,
    ),
    pumpFunNarrativeAnalysis: pick(
      [
        `Pump.fun meta currently favors absurd animal + irony derivatives with fast visual memes. "${base}" fits the culture stack if the first meme template is instantly quotable. Bonding-curve buyers are chasing attention velocity, not fundamentals — your narrative must read as "already trending" within 20 minutes of deploy.`,
        `This idea sits in the active "${base}" sub-meta on Pump.fun: launches are clustering around similar hooks, so first-mover visual + ticker recall matters more than thread depth. Window is open if deploy aligns with a CT peak hour.`,
        `Narrative shelf-life looks 24–72h unless you attach a second beat (raid target, meme bounty, or collab hook). Pump.fun buyers will compare you to 3–5 same-day launches — speed and clarity win.`,
      ],
      seed + 2,
    ),
    competitorMemecoinAnalysis: pick(
      [
        `Recent lookalikes (AI-estimated): "$${ticker}2" (same animal hook, weaker one-liner, faded after 6h), "FAST${ticker.slice(0, 2)}" (faster deploy, stole early CT replies), "${base}WIF" derivative (higher bonding velocity, worse meme template). Your edge: tighter positioning + faster pin on CT.`,
        `Micro-cap cluster: two launches in the last 48h used nearly identical "${base}" framing — one bonded quickly then stalled on TG silence; another won on reply-game but lost on ticker recall. Counter-position with a single visual meme + distinct ticker phonetics.`,
        `Parallel Pump.fun runners: same narrative bucket, different tone — one leaned irony (better quote-tweets), one leaned wholesome (weaker CT retention). Avoid their failure mode: don't utility-code; stay pure culture.`,
      ],
      seed + 3,
    ),
    marketSaturation: pick(
      [
        `Saturation: medium-high in the "${base}" bucket — 4–7 similar launches estimated in the last 72h on Pump.fun / CT crossover. Still room if you enter with a differentiated hook and tight launch window.`,
        `Bucket is crowded but not dead — attention is rotating between 2–3 active sub-narratives. You need a clear "why now" vs yesterday's deploys.`,
        `High churn meta: saturation spikes on weekends; differentiation via timing + meme format matters more than feature claims.`,
      ],
      seed + 4,
    ),
    similarRecentNarratives: pick(
      [
        `Recent parallels: ironic frog derivatives, "AI animal" runners, late-night CT absurdism threads. All competed for the same reply-graph — winners had one meme template + consistent ticker spam.`,
        `Same-week narratives: micro-cap politics-meme, sleep-deprived trader culture, and "${base}" remix chains. Fatigue shows when launches copy each other's first tweet structure.`,
        `Lookalike attention patterns: 2h bonding spikes driven by KOL quote-tweets, then decay if TG/CT coordination drops. Your narrative must plan the second attention beat upfront.`,
      ],
      seed + 5,
    ),
    launchTimingSignal: pick(
      [
        `Signal: enter within the next CT peak window (14:00–22:00 UTC) if visuals are ready — delay 12–24h if a direct lookalike is still trending on the timeline.`,
        `Signal: wait — two similar launches are still pulling replies; deploy when their bonding curve stalls or you have a sharper meme hook.`,
        `Signal: go now with a hard differentiation line — meta velocity favors fast movers, but avoid launching into an active rival raid hour.`,
      ],
      seed + 6,
    ),
    riskNotes: pick(
      [
        `Risks: narrative confusion with same-day tickers, copycat deploys, weak meme template, over-promising on TG before CT momentum, bonding curve stall if KOLs don't quote within 90 minutes.`,
        `Risks: saturation kill, ticker too close to an active runner, launch during a rival space, no second-beat content after hour 2.`,
        `Risks: CT fatigue on "${base}" meta, bot-heavy reply sections, liquidity chase without community pin strategy.`,
      ],
      seed + 7,
    ),
    recommendedPositioning: pick(
      [
        `Position as the fastest, clearest "${base}" play — one meme, one line, one ticker. Don't compete on features; compete on timeline velocity and reply-game presence.`,
        `Lead with "${base}" as culture infrastructure, not a token — ironic, quotable, built for Pump.fun speed. Anchor every post on a single visual template.`,
        `Differentiate by tone: more absurd / less wholesome than today's lookalikes. Own a specific CT sub-thread (late-night traders, frog meta, etc.).`,
      ],
      seed + 8,
    ),
    landingPage: mapLandingPageFields(tokenName, ticker, {
      tagline: pick(
        [
          `The ${base} meta — bonding-curve native`,
          `$${ticker} · culture coin for CT speed`,
          `Pump.fun energy. ${base} narrative.`,
        ],
        seed + 9,
      ),
      shortNarrative: narrativeSummary,
      audience: pick(
        [
          "CT degens, Pump.fun snipers, and meme-native traders chasing narrative velocity.",
          "Late-night timeline lurkers and bonding-curve chasers who move on visuals first.",
          "Solana meme traders rotating through micro-cap culture coins on Pump.fun.",
        ],
        seed + 10,
      ),
      colorPalette: {
        primary: pick(["#8b5cf6", "#7c3aed", "#6366f1"], seed),
        secondary: pick(["#22d3ee", "#06b6d4", "#38bdf8"], seed + 1),
        accent: pick(["#a78bfa", "#c084fc", "#818cf8"], seed + 2),
        background: "#050508",
      },
      heroTitle: pick(
        [`${tokenName} is live on the timeline`, `Meet $${ticker}`, `${base} — send or fade`],
        seed + 11,
      ),
      heroSubtitle: pick(
        [
          "Culture-first memecoin built for Pump.fun speed and CT attention cycles.",
          "One narrative. One ticker. Bonding-curve momentum as the product.",
          "Meme-native launch packaging for traders who read the meta before the chart.",
        ],
        seed + 12,
      ),
      aboutSection: pick(
        [
          `${tokenName} ($${ticker}) packages "${trimmed.slice(0, 80)}" as a Pump.fun-style culture play — no utility promises, pure narrative velocity and community coordination.`,
          `Built around the ${base} angle: ironic, quotable, and optimized for fast CT recall. This is a memecoin launch surface, not a SaaS product.`,
          `$${ticker} exists to ride a timely meta bucket on Pump.fun. Holders coordinate on X and TG; attention is the liquidity driver.`,
        ],
        seed + 13,
      ),
      communitySection: pick(
        [
          "Join the CT reply-graph, raid windows, and TG coordination beats. Community momentum drives the narrative — not roadmap slides.",
          "X for narrative beats and meme drops. Telegram for launch ops, timing alerts, and holder coordination.",
          "Culture coin community: timeline-first, meme-forward, built for bonding-curve traders who move fast.",
        ],
        seed + 14,
      ),
      ctaText: pick(["Join the drop", "Enter the meta", "Ride the narrative"], seed + 15),
      pumpFunButtonLabel: "Trade on Pump.fun",
      xLinkLabel: "Follow on X",
      telegramLinkLabel: "Join Telegram",
    }),
    launchExecutionLayer: pick(
      [
        `T-2h: finalize meme pack + ticker spam list. T0: Pump.fun deploy + pin CT thread. T+30m: bonding-curve watch + reply raids. T+2h: liquidity/TG coordination check. T+24h: narrative recap or pivot signal.`,
        `Deploy checklist: visual meme → deploy → CT pin → 90m KOL push window → TG ops live → saturation re-scan at 6h → hold or kill narrative based on bonding velocity.`,
        `Execution layer: single deploy window, no feature creep, coordinate CT peaks with bonding-curve monitoring; abort if a lookalike is still pulling >50% of your reply graph.`,
      ],
      seed + 11,
    ),
    automation: {
      xPosting: `Launch-window monitor: track "${base}" narrative velocity, alert on rival deploys, queue 2 signal posts/day (no drafts — timing + hooks only).`,
      telegramBot: `Ops automation: pin intelligence summary, route "timing" / "risk" keywords, alert on bonding-curve stall vs CT baseline.`,
    },
  };
}

export const MOCK_LOADING_MS = 2200;
