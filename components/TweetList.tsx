type TweetListProps = {
  tweets: string[];
  ticker: string;
  className?: string;
};

export function TweetList({ tweets, ticker, className = "" }: TweetListProps) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Generated tweets</h2>
          <p className="mt-0.5 text-xs text-zinc-500">Ready to post on X</p>
        </div>
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-medium text-violet-200">
          ${ticker}
        </span>
      </div>
      <ul className="space-y-3">
        {tweets.map((tweet, index) => (
          <li
            key={`${index}-${tweet.slice(0, 24)}`}
            className="animate-fade-up rounded-xl border border-white/[0.06] bg-black/50 px-4 py-3.5 text-sm leading-relaxed text-zinc-200 transition hover:border-white/12 hover:bg-black/70"
            style={{ animationDelay: `${0.1 + index * 0.08}s` }}
          >
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-zinc-600">
              Tweet {index + 1}
            </span>
            {tweet}
          </li>
        ))}
      </ul>
    </section>
  );
}
