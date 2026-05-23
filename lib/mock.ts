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

/** Always returns the full Extra-tier dataset; UI gates by payment. */
export function generateMockLaunchKit(idea: string): LaunchKitFull {
  const trimmed = idea.trim();
  const seed = hashString(trimmed.toLowerCase() || "hypelaunch");
  const { base, tokenName, ticker } = parseIdea(trimmed);

  const narrative = `${tokenName} ($${ticker}) frames "${trimmed.slice(0, 120)}" as a timely memecoin narrative — community-first, meme-forward, built for fast attention cycles on X.`;
  const positioning = pick(
    [
      `Position as the "${base}" meta play — ironic, shareable, and easy to quote in one line.`,
      `Lead with culture, not utility: ${base} is the hook, speed is the product.`,
      `Anchor on a single visual meme + ticker recall; everything else supports timeline velocity.`,
    ],
    seed,
  );

  const interestScore = scoreFromSeed(seed, 62, 94);
  const launchReadinessScore = scoreFromSeed(seed >> 3, 48, 88);

  const tweetTemplates = [
    `Introducing $${ticker} — ${trimmed.slice(0, 80)}. The narrative starts now.`,
    `Why $${ticker}? Because the timeline needed one more legend.`,
    `Day 1 of the $${ticker} arc: community first, memes second, send third.`,
    `Thread: how $${ticker} rides the current X meta without feeling forced 🧵`,
    `If you're still sleeping on $${ticker}, wake up. Launch kit is ready.`,
    `Not financial advice. Just vibes. $${ticker} loading…`,
  ];

  const headlines = [
    `${tokenName} is here`,
    `Meet $${ticker}`,
    `The ${base} movement`,
    `Launch ${ticker} with hype`,
  ];

  return {
    idea: trimmed,
    tokenName,
    ticker,
    narrative,
    positioning,
    interestScore,
    launchReadinessScore,
    marketAnalysis: pick(
      [
        `Narrative velocity on X for "${base}"-adjacent memes is elevated vs 7d baseline — good window for a fast launch if liquidity follows attention.`,
        `Current meta skews toward animal + absurdism; ${ticker} fits the meme stack if visuals are instantly recognizable.`,
        `Competing threads show fatigue on generic "AI coin" angles — differentiation via tone and reply-game matters more than whitepaper.`,
      ],
      seed + 1,
    ),
    competitorAnalysis: pick(
      [
        `Top 3 lookalikes: same ticker pattern, weaker positioning — win on clarity of one-liner + consistent meme template.`,
        `Nearby launches lean utility-coded; ${ticker} should stay pure culture to avoid comparison traps.`,
        `Watch two active rivals with similar hooks — counter-position with speed and TG presence, not feature claims.`,
      ],
      seed + 2,
    ),
    xStrategy: pick(
      [
        `Week 1: seed 12–15 posts across peak CT hours. Lead with "${base}" memes, reply-graph farm top 50 accounts in the narrative.`,
        `Anchor account posts 2x daily: 1 meme, 1 narrative beat. Rotate 3 meme templates; pin a "why $${ticker} now" thread.`,
        `Use controversy-lite hooks + visual memes. Track which tweet format pulls quote-tweets; double down every 48h.`,
      ],
      seed + 3,
    ),
    growthStrategy: pick(
      [
        `KOL soft shill → community TG → timeline raid cadence every 6h for 72h post-launch.`,
        `Micro-influencer replies + meme bounty for best $${ticker} remix; funnel winners into TG.`,
        `Coordinated spaces + meme contests; reward top contributors with role + spotlight, not promises.`,
      ],
      seed + 9,
    ),
    tweets: Array.from({ length: 5 }, (_, i) => pick(tweetTemplates, seed + i * 7)),
    landing: {
      headline: pick(headlines, seed),
      subheadline: pick(
        [
          "One idea. Full launch kit. Zero friction.",
          "Memecoin launch infrastructure for builders who move fast.",
          "Turn a single prompt into tweets, scores, and a live-ready landing.",
        ],
        seed + 11,
      ),
      cta: pick(["Join the launch", "Get early access", "Enter the drop"], seed + 5),
      tagline: `$${ticker} · powered by hypelaunch.space`,
    },
    telegramQa: [
      {
        question: "What is this project?",
        answer: `${tokenName} ($${ticker}) is a memecoin built around: ${trimmed.slice(0, 100)}. Community-driven, no utility promises.`,
      },
      {
        question: "Is there a team or roadmap?",
        answer:
          "No formal roadmap — narrative + community momentum. Updates ship when the timeline demands it.",
      },
      {
        question: "Where can I follow updates?",
        answer: "X for memes and narrative beats. This Telegram for Q&A and launch coordination.",
      },
      {
        question: "Any financial advice?",
        answer: "No. Memecoins are high risk. DYOR. NFA.",
      },
    ],
    launchContentPlan: pick(
      [
        `T-24h: teaser thread + TG pin. T-12h: meme drop pack. T0: launch tweet + landing CTA + raid window 2h. T+24h: recap + holder shoutouts.`,
        `Day 0–3: 2 X posts/day, 1 TG digest/day, one community challenge. Day 4–7: spaces + meme contest finale.`,
        `Launch arc: mystery → reveal → send. Three beats only; everything else is noise control.`,
      ],
      seed + 13,
    ),
    automation: {
      xPosting: `Auto-queue: 2 posts/day (meme + narrative), best windows 14:00 & 21:00 UTC. Drafts pre-filled for $${ticker}.`,
      telegramBot: `Welcome flow + FAQ auto-replies for ${ticker}. Pin Q&A; route "launch" keyword to landing link.`,
    },
  };
}

export const MOCK_LOADING_MS = 2200;
