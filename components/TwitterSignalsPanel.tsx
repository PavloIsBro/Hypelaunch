import type { TwitterSignals } from "@/lib/types";

type TwitterSignalsPanelProps = {
  signals: TwitterSignals;
  className?: string;
};

function scoreTone(score: number): string {
  if (score >= 70) return "text-emerald-300";
  if (score >= 50) return "text-cyan-300";
  if (score >= 30) return "text-amber-300";
  return "text-rose-300";
}

export function TwitterSignalsPanel({ signals, className = "" }: TwitterSignalsPanelProps) {
  const live = signals.source === "apify" && signals.tweetCount > 0;

  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border bg-[#0a0a0a]/95 p-5 sm:p-6",
        live
          ? "border-cyan-400/30 shadow-[0_0_24px_-8px_rgba(34,211,238,0.3)]"
          : "border-amber-400/25 shadow-[0_0_24px_-8px_rgba(251,191,36,0.2)]",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl",
          live ? "bg-cyan-500/20" : "bg-amber-500/15",
        ].join(" ")}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">X / Twitter live parse</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Keywords from your prompt · scraped via Apify
          </p>
        </div>
        <span
          className={[
            "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            live
              ? "border-cyan-400/35 bg-cyan-500/10 text-cyan-300"
              : "border-amber-400/35 bg-amber-500/10 text-amber-300",
          ].join(" ")}
        >
          {live ? "Live" : "Fallback"}
        </span>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {signals.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[11px] text-zinc-300"
          >
            {kw}
          </span>
        ))}
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Tweets</p>
          <p className="mt-1 font-mono text-lg font-bold text-white">{signals.tweetCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Likes</p>
          <p className="mt-1 font-mono text-lg font-bold text-white">{signals.totalLikes}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
            Retweets
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-white">{signals.totalRetweets}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
            Attention
          </p>
          <p className={`mt-1 font-mono text-lg font-bold ${scoreTone(signals.attentionScore)}`}>
            {signals.attentionScore}
          </p>
        </div>
      </div>

      {signals.sampleTweets.length ? (
        <ul className="relative mt-4 space-y-2">
          {signals.sampleTweets.slice(0, 4).map((tweet, idx) => (
            <li
              key={`${tweet.author}-${idx}`}
              className="rounded-xl border border-white/[0.08] bg-black/45 px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                <span className="font-semibold text-cyan-300/90">@{tweet.author}</span>
                <span>❤ {tweet.likes}</span>
                <span>↻ {tweet.retweets}</span>
                {tweet.url ? (
                  <a
                    href={tweet.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-zinc-400 underline-offset-2 hover:text-white hover:underline"
                  >
                    open
                  </a>
                ) : null}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{tweet.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="relative mt-4 text-sm text-zinc-500">
          {signals.error || "No live tweets returned for these keywords."}
        </p>
      )}
    </section>
  );
}
