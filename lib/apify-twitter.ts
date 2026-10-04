export type TwitterTweetSignal = {
  text: string;
  author: string;
  likes: number;
  retweets: number;
  replies: number;
  url?: string;
  createdAt?: string;
};

/** Live (or fallback) X/Twitter attention snapshot for an idea. */
export type TwitterSignals = {
  source: "apify" | "fallback";
  keywords: string[];
  tweetCount: number;
  totalLikes: number;
  totalRetweets: number;
  /** 0–100 derived from volume + engagement. */
  attentionScore: number;
  sampleTweets: TwitterTweetSignal[];
  fetchedAt: string;
  error?: string;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "with",
  "from",
  "that",
  "this",
  "about",
  "into",
  "over",
  "under",
  "make",
  "meme",
  "memecoin",
  "coin",
  "token",
  "crypto",
  "solana",
  "pump",
  "fun",
  "idea",
  "launch",
  "based",
  "like",
  "just",
  "very",
  "really",
]);

export function extractTwitterKeywords(idea: string): string[] {
  const trimmed = idea.trim();
  if (!trimmed) return [];

  const words = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9\s$#_-]/gi, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  const unique = [...new Set(words)].slice(0, 6);
  const terms: string[] = [];

  if (trimmed.length <= 80) {
    terms.push(trimmed);
  } else if (unique.length >= 2) {
    terms.push(unique.slice(0, 4).join(" "));
  }

  if (unique.length) {
    terms.push(unique.slice(0, 3).join(" "));
  }

  // Prefer specific tokens / hashtags as standalone search too
  for (const w of unique) {
    if (w.startsWith("$") || w.startsWith("#") || w.length >= 5) {
      terms.push(w);
    }
    if (terms.length >= 3) break;
  }

  return [...new Set(terms)].slice(0, 3);
}

function asNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function pickText(item: Record<string, unknown>): string {
  const candidates = [
    item.fullText,
    item.full_text,
    item.text,
    item.content,
    item.tweetText,
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return "";
}

function pickAuthor(item: Record<string, unknown>): string {
  const author =
    item.author ||
    item.user ||
    item.userName ||
    item.username ||
    item.handle ||
    item.screen_name;
  if (typeof author === "string" && author.trim()) return author.replace(/^@/, "");
  if (author && typeof author === "object") {
    const obj = author as Record<string, unknown>;
    const name = obj.userName || obj.username || obj.screen_name || obj.name || obj.handle;
    if (typeof name === "string" && name.trim()) return name.replace(/^@/, "");
  }
  return "unknown";
}

function pickUrl(item: Record<string, unknown>): string | undefined {
  const url = item.url || item.tweetUrl || item.twitterUrl || item.link;
  return typeof url === "string" && url.startsWith("http") ? url : undefined;
}

function normalizeTweets(rawItems: unknown[]): TwitterTweetSignal[] {
  const out: TwitterTweetSignal[] = [];

  for (const raw of rawItems) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const text = pickText(item);
    if (!text || text.length < 8) continue;

    out.push({
      text: text.slice(0, 280),
      author: pickAuthor(item),
      likes: asNumber(item.likeCount ?? item.likes ?? item.favorite_count ?? item.favorites),
      retweets: asNumber(item.retweetCount ?? item.retweets ?? item.repostCount),
      replies: asNumber(item.replyCount ?? item.replies ?? item.reply_count),
      url: pickUrl(item),
      createdAt:
        typeof item.createdAt === "string"
          ? item.createdAt
          : typeof item.created_at === "string"
            ? item.created_at
            : undefined,
    });
  }

  return out
    .sort((a, b) => b.likes + b.retweets * 2 - (a.likes + a.retweets * 2))
    .slice(0, 12);
}

function computeAttentionScore(tweets: TwitterTweetSignal[]): number {
  if (!tweets.length) return 18;
  const volume = Math.min(40, tweets.length * 4);
  const likes = tweets.reduce((s, t) => s + t.likes, 0);
  const rts = tweets.reduce((s, t) => s + t.retweets, 0);
  const engagement = Math.min(45, Math.log10(likes + rts * 3 + 1) * 14);
  const recencyBoost = tweets.some((t) => t.createdAt) ? 8 : 4;
  return Math.max(12, Math.min(96, Math.round(volume + engagement + recencyBoost)));
}

function buildFallbackSignals(idea: string, reason?: string): TwitterSignals {
  const keywords = extractTwitterKeywords(idea);
  return {
    source: "fallback",
    keywords,
    tweetCount: 0,
    totalLikes: 0,
    totalRetweets: 0,
    attentionScore: 22,
    sampleTweets: [],
    fetchedAt: new Date().toISOString(),
    error: reason || "Twitter live scrape unavailable — using estimated signals.",
  };
}

function buildSignalsFromTweets(
  idea: string,
  keywords: string[],
  tweets: TwitterTweetSignal[],
): TwitterSignals {
  return {
    source: "apify",
    keywords,
    tweetCount: tweets.length,
    totalLikes: tweets.reduce((s, t) => s + t.likes, 0),
    totalRetweets: tweets.reduce((s, t) => s + t.retweets, 0),
    attentionScore: computeAttentionScore(tweets),
    sampleTweets: tweets.slice(0, 6),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Scrapes recent X/Twitter posts for keywords derived from the memecoin idea.
 * Uses Apify actor (default: apidojo/tweet-scraper). Token must stay server-side.
 */
export async function fetchTwitterSignals(idea: string): Promise<TwitterSignals> {
  const trimmed = idea.trim();
  const keywords = extractTwitterKeywords(trimmed);
  if (!trimmed || !keywords.length) {
    return buildFallbackSignals(trimmed || idea, "No keywords extracted from idea.");
  }

  const token = process.env.APIFY_TOKEN?.trim();
  if (!token) {
    console.warn("[apify] APIFY_TOKEN missing");
    return buildFallbackSignals(trimmed, "APIFY_TOKEN is not configured.");
  }

  const actorId = (process.env.APIFY_TWITTER_ACTOR_ID || "apidojo~tweet-scraper").trim();
  const maxItems = Math.min(
    40,
    Math.max(5, Number.parseInt(process.env.APIFY_MAX_TWEETS || "15", 10) || 15),
  );

  const url = `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`;

  const controller = new AbortController();
  const timeoutMs = Number.parseInt(process.env.APIFY_TIMEOUT_MS || "55000", 10) || 55000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    console.log("[apify] scraping", { actorId, keywords, maxItems });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        searchTerms: keywords,
        maxItems,
        maxTweets: maxItems,
        sort: "Latest",
        tweetLanguage: "en",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[apify] HTTP error", res.status, body.slice(0, 400));
      return buildFallbackSignals(
        trimmed,
        `Apify returned ${res.status}. Check token, credits, or actor id.`,
      );
    }

    const data = (await res.json()) as unknown;
    const items = Array.isArray(data) ? data : [];
    const tweets = normalizeTweets(items);

    if (!tweets.length) {
      return buildFallbackSignals(
        trimmed,
        "Apify returned no tweets for these keywords — try a sharper idea.",
      );
    }

    return buildSignalsFromTweets(trimmed, keywords, tweets);
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Apify scrape timed out."
        : error instanceof Error
          ? error.message
          : "Apify scrape failed.";
    console.error("[apify]", message);
    return buildFallbackSignals(trimmed, message);
  } finally {
    clearTimeout(timer);
  }
}

/** Compact block for the LLM user message. */
export function formatTwitterSignalsForPrompt(signals: TwitterSignals): string {
  const lines = [
    `LIVE X/TWITTER SIGNAL (source=${signals.source})`,
    `keywords: ${signals.keywords.join(" | ") || "(none)"}`,
    `tweets_found: ${signals.tweetCount}`,
    `total_likes: ${signals.totalLikes}`,
    `total_retweets: ${signals.totalRetweets}`,
    `attention_score_0_100: ${signals.attentionScore}`,
  ];

  if (signals.sampleTweets.length) {
    lines.push("sample_tweets:");
    for (const t of signals.sampleTweets.slice(0, 5)) {
      lines.push(
        `- @${t.author} [❤${t.likes} ↻${t.retweets}]: ${t.text.replace(/\s+/g, " ").slice(0, 180)}`,
      );
    }
  } else if (signals.error) {
    lines.push(`note: ${signals.error}`);
  }

  lines.push(
    "Use these live signals to ground interestScore, marketSaturation, similarRecentNarratives, launchTimingSignal, and trendRecommendations. Prefer real CT angles from the samples when inventing sharper prompts.",
  );

  return lines.join("\n");
}
