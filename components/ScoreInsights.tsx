type ScoreInsightsProps = {
  interestReasoning: string;
  launchReadinessReasoning: string;
  variant: "preview" | "full";
  className?: string;
};

export function ScoreInsights({
  interestReasoning,
  launchReadinessReasoning,
  variant,
  className = "",
}: ScoreInsightsProps) {
  const interestPreview =
    interestReasoning.length > 120 ? `${interestReasoning.slice(0, 120)}…` : interestReasoning;

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      <article className="group relative overflow-hidden rounded-2xl border border-violet-400/30 bg-[#0a0a0a]/95 p-5 shadow-[0_0_24px_-8px_rgba(167,139,250,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/50 hover:shadow-[0_0_36px_-6px_rgba(167,139,250,0.55)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/25 blur-2xl opacity-50 transition group-hover:opacity-80" />
        <div className="relative flex items-center justify-between gap-2">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/80">
            Interest reasoning
          </h3>
          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-300">
            Live
          </span>
        </div>
        <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
          <span className="text-zinc-200">
            {variant === "preview" ? interestPreview : interestReasoning}
          </span>
        </p>
        {variant === "preview" ? (
          <p className="relative mt-3 text-xs text-violet-400/80">Full breakdown unlocks with Launch.</p>
        ) : null}
      </article>

      <article className="group relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#0a0a0a]/95 p-5 shadow-[0_0_24px_-8px_rgba(34,211,238,0.3)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.5)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl opacity-50 transition group-hover:opacity-80" />
        <div className="relative flex items-center justify-between gap-2">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80">
            Launch readiness reasoning
          </h3>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
            {variant === "preview" ? "Locked" : "Live"}
          </span>
        </div>
        {variant === "preview" ? (
          <>
            <p className="relative mt-3 select-none text-sm leading-relaxed text-zinc-400 blur-sm">
              {launchReadinessReasoning}
            </p>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
              <span className="rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs text-zinc-300">
                Locked — Launch
              </span>
            </div>
          </>
        ) : (
          <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
            <span className="text-zinc-200">{launchReadinessReasoning}</span>
          </p>
        )}
      </article>
    </div>
  );
}
