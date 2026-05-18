type AutomationPreviewProps = {
  xPosting: string;
  telegramBot: string;
  className?: string;
};

export function AutomationPreview({
  xPosting,
  telegramBot,
  className = "",
}: AutomationPreviewProps) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-white">Automation preview</h2>
      <p className="mt-0.5 text-xs text-zinc-500">Optional X & Telegram posting flows</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300/80">
            X automation
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{xPosting}</p>
        </article>
        <article className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/80">
            Telegram bot
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{telegramBot}</p>
        </article>
      </div>
    </section>
  );
}
