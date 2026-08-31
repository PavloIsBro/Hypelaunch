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
      <article className="glass-card rounded-2xl p-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Interest reasoning
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          {variant === "preview" ? interestPreview : interestReasoning}
        </p>
        {variant === "preview" ? (
          <p className="mt-2 text-xs text-violet-400/80">Full breakdown unlocks with Pro.</p>
        ) : null}
      </article>
      <article className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40 p-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Launch readiness reasoning
        </h3>
        {variant === "preview" ? (
          <>
            <p className="mt-2 select-none blur-sm">{launchReadinessReasoning}</p>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55">
              <span className="rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs text-zinc-300">
                Locked — Pro
              </span>
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{launchReadinessReasoning}</p>
        )}
      </article>
    </div>
  );
}
