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

export type TwitterScrapeStart = {
  runId: string;
  datasetId?: string;
  keywords: string[];
  idea: string;
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

export function buildFallbackSignals(idea: string, reason?: string): TwitterSignals {
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

export function getApifyToken(): string {
  const raw =
    process.env.APIFY_TOKEN ||
    process.env.APIFY_API_TOKEN ||
    process.env.APIFY_API_KEY ||
    "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

function getActorId(): string {
  return (process.env.APIFY_TWITTER_ACTOR_ID || "apidojo~tweet-scraper").trim();
}

function getMaxItems(): number {
  return Math.min(
    25,
    Math.max(5, Number.parseInt(process.env.APIFY_MAX_TWEETS || "10", 10) || 10),
  );
}

/** Start Apify run asynchronously (does not wait for scrape). Avoids Vercel 504. */
export async function startTwitterScrape(idea: string): Promise<TwitterScrapeStart | null> {
  const trimmed = idea.trim();
  const keywords = extractTwitterKeywords(trimmed);
  if (!trimmed || !keywords.length) return null;

  const token = getApifyToken();
  if (!token) {
    console.warn("[apify] APIFY_TOKEN missing in runtime env");
    return null;
  }

  const actorId = getActorId();
  const maxItems = getMaxItems();
  const url = `https://api.apify.com/v2/acts/${encodeURIComponent(actorId)}/runs?token=${encodeURIComponent(token)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    console.error("[apify] start run failed", res.status, body.slice(0, 400));
    throw new Error(`Apify start failed (${res.status}).`);
  }

  const payload = (await res.json()) as {
    data?: { id?: string; defaultDatasetId?: string };
  };

  const runId = payload.data?.id;
  if (!runId) {
    throw new Error("Apify did not return a run id.");
  }

  console.log("[apify] started run", { runId, keywords, maxItems });

  return {
    runId,
    datasetId: payload.data?.defaultDatasetId,
    keywords,
    idea: trimmed,
  };
}

export type TwitterScrapePoll =
  | { status: "RUNNING" | "READY" | "FAILED"; signals?: TwitterSignals; error?: string };

/** Poll Apify run status and return signals when SUCCEEDED. */
export async function pollTwitterScrape(
  runId: string,
  keywords: string[],
  idea: string,
): Promise<TwitterScrapePoll> {
  const token = getApifyToken();
  if (!token) {
    return {
      status: "FAILED",
      signals: buildFallbackSignals(
        idea,
        "APIFY_TOKEN is not configured. Add it in Vercel → Environment Variables, then Redeploy.",
      ),
    };
  }

  const runRes = await fetch(
    `https://api.apify.com/v2/actor-runs/${encodeURIComponent(runId)}?token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );

  if (!runRes.ok) {
    return {
      status: "FAILED",
      signals: buildFallbackSignals(idea, `Apify run status failed (${runRes.status}).`),
    };
  }

  const runJson = (await runRes.json()) as {
    data?: { status?: string; defaultDatasetId?: string };
  };
  const status = (runJson.data?.status || "").toUpperCase();
  const datasetId = runJson.data?.defaultDatasetId;

  if (
    status === "READY" ||
    status === "RUNNING" ||
    status === "ABORTING" ||
    status === "" ||
    status === "TIMING-OUT"
  ) {
    return { status: "RUNNING" };
  }

  if (status !== "SUCCEEDED") {
    return {
      status: "FAILED",
      signals: buildFallbackSignals(idea, `Apify run ended with status ${status || "unknown"}.`),
    };
  }

  if (!datasetId) {
    return {
      status: "FAILED",
      signals: buildFallbackSignals(idea, "Apify succeeded but dataset id is missing."),
    };
  }

  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${encodeURIComponent(datasetId)}/items?format=json&clean=true&limit=25&token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );

  if (!itemsRes.ok) {
    return {
      status: "FAILED",
      signals: buildFallbackSignals(idea, `Apify dataset fetch failed (${itemsRes.status}).`),
    };
  }

  const items = (await itemsRes.json()) as unknown;
  const tweets = normalizeTweets(Array.isArray(items) ? items : []);

  if (!tweets.length) {
    return {
      status: "READY",
      signals: buildFallbackSignals(
        idea,
        "Apify returned no tweets for these keywords — try a sharper idea.",
      ),
    };
  }

  return {
    status: "READY",
    signals: buildSignalsFromTweets(keywords, tweets),
  };
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
