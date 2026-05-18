type TelegramPreviewProps = {
  items: { question: string; answer: string }[];
  ticker: string;
  className?: string;
};

export function TelegramPreview({ items, ticker, className = "" }: TelegramPreviewProps) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Telegram Q&A</h2>
          <p className="mt-0.5 text-xs text-zinc-500">Auto-reply pack for community</p>
        </div>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-200">
          ${ticker} TG
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3.5"
          >
            <p className="text-xs font-medium text-violet-300/90">Q: {item.question}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">A: {item.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
