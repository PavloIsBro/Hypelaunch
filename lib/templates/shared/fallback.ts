import type { SharedLandingAiPayload, SharedLandingContent } from "./schema";
import { mapSharedLandingContent } from "./schema";

const DEMO_AI_PAYLOAD: SharedLandingAiPayload = {
  brandMark: "FR",
  liveBadgeLabel: "LIVE ON CURVE",
  buyButtonLabel: "Buy $FROTH",
  marquee: [
    "$FROTH",
    "BONDING LIVE",
    "NO UTILITY — ONLY VIBES",
    "CT RAID INCOMING",
    "FOAM AT THE TOP",
    "APE RESPONSIBLY*",
    "*jk don't",
  ],
  heroBadge: "the foam at the top of the curve",
  heroLine1: "Don't chase",
  heroLine2: "the candle.",
  heroLine3: "Be the froth.",
  heroDescription:
    "$FROTH is a pure culture coin for CT degenerates who treat bonding curves like ocean waves. No roadmap to nowhere. No fake utility. Just foam, volume, and reply-game.",
  primaryCtaLabel: "Ape the foam",
  secondaryCtaLabel: "Open Pump.fun",
  audienceLine: "Built for: reply guys, raid captains, and anyone who buys the first meme screenshot.",
  terminalTitle: "Bonding terminal",
  terminalDescription: "Live mock fill — for template preview only",
  terminalStats: [
    { label: "Holders", value: "1.2k" },
    { label: "Replies", value: "840" },
    { label: "Raids", value: "12" },
  ],
  features: [
    {
      title: "One-glance meme",
      description:
        "Foam crown on a green candle. If you need a thread to get it, it's already too late.",
    },
    {
      title: "CT-native deploy",
      description:
        "Pin the screenshot, raid the replies, let the curve do the talking. Culture first.",
    },
    {
      title: "Shelf-life: loud",
      description:
        "24–72h of chaos energy. Then either legend status or beautiful foam on the beach.",
    },
  ],
  loreParagraphs: [
    "Every bonding curve has a crest. Most people buy the body of the wave and drown in the dump. $FROTH is for the ones floating on top — loud, temporary, and somehow always in the screenshot.",
    "Born on Pump.fun energy, raised in quote-tweets, baptized in Telegram sticker packs. If your bags feel wet, you're doing it right.",
  ],
  tokenomics: [
    { label: "Supply", value: "1,000,000,000 $FROTH" },
    { label: "Tax", value: "0% — we don't do that here" },
    { label: "LP", value: "Burned when it graduates (or doesn't)" },
    { label: "Utility", value: "Being early in the group chat" },
  ],
  raidObjectiveTitle: "Tonight's objective",
  raidObjectiveBody:
    "Flood the pinned meme with foam emojis. First 50 reply guys get honorary lifeguard roles in TG.",
  raidCtaLabel: "Join Telegram war room",
  communityTitle: "Community foam",
  communityDescription:
    "Stickers, raids, and unhinged one-liners. If you're quiet, you're already underwater.",
  xLinkLabel: "Follow @frothcoin",
  telegramLinkLabel: "TG: froth-fam",
  faq: [
    {
      question: "Is this a rug?",
      answer:
        "It's a memecoin. Assume chaos. Dev keys are as trustworthy as a beach forecast — check the curve, not the vibes thread.",
    },
    {
      question: "Why $FROTH?",
      answer:
        "Because every green candle leaves foam. Somebody had to brand it before CT did it with a worse ticker.",
    },
    {
      question: "How do I buy?",
      answer:
        "Connect wallet → open Pump.fun → search $FROTH → ape size you can laugh about later. This page is a template preview, not financial advice.",
    },
  ],
  footerNote: "Hypelaunch landing preview · $FROTH demo · hypelaunch.space",
};

function brandMarkFromTicker(ticker: string): string {
  const cleaned = ticker.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (cleaned.length >= 2) return cleaned.slice(0, 2);
  if (cleaned.length === 1) return `${cleaned}${cleaned}`;
  return "NL";
}

/** Shared fallback content for all landing templates. */
export function getSharedLandingFallback(
  tokenName = "FROTH",
  ticker = "FROTH",
): SharedLandingContent {
  const name = tokenName.trim() || "FROTH";
  const tick = (ticker.trim() || "FROTH").toUpperCase();
  const isDemo = name.toUpperCase() === "FROTH" && tick === "FROTH";

  if (isDemo) {
    return mapSharedLandingContent(name, tick, DEMO_AI_PAYLOAD);
  }

  const personalized: SharedLandingAiPayload = {
    ...DEMO_AI_PAYLOAD,
    brandMark: brandMarkFromTicker(tick),
    buyButtonLabel: `Buy $${tick}`,
    marquee: [
      `$${tick}`,
      "BONDING LIVE",
      "NO UTILITY — ONLY VIBES",
      "CT RAID INCOMING",
      "APE RESPONSIBLY*",
      "*jk don't",
    ],
    heroBadge: `the foam at the top of the curve · $${tick}`,
    heroDescription: `$${tick} (${name}) is a pure culture coin for CT degenerates who treat bonding curves like ocean waves. No roadmap to nowhere. No fake utility. Just foam, volume, and reply-game.`,
    tokenomics: [
      { label: "Supply", value: `1,000,000,000 $${tick}` },
      { label: "Tax", value: "0% — we don't do that here" },
      { label: "LP", value: "Burned when it graduates (or doesn't)" },
      { label: "Utility", value: "Being early in the group chat" },
    ],
    faq: DEMO_AI_PAYLOAD.faq.map((item) =>
      item.question.includes("$FROTH")
        ? { ...item, question: item.question.replaceAll("$FROTH", `$${tick}`) }
        : item.answer.includes("$FROTH")
          ? { ...item, answer: item.answer.replaceAll("$FROTH", `$${tick}`) }
          : item,
    ),
    xLinkLabel: `Follow @${tick.toLowerCase()}coin`,
    telegramLinkLabel: `TG: ${tick.toLowerCase()}-fam`,
    footerNote: `Hypelaunch landing preview · $${tick} · hypelaunch.space`,
  };

  return mapSharedLandingContent(name, tick, personalized);
}
