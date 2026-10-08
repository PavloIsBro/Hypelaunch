import type { TrendRecommendation } from "@/lib/types";

type TrendRecommendationsProps = {
  currentPrompt: string;
  currentInterest: number;
  currentReadiness: number;
  recommendations: TrendRecommendation[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  className?: string;
};

function scoreTone(score: number): string {
  if (score >= 70) return "text-emerald-300";
  if (score >= 50) return "text-cyan-300";
  if (score >= 30) return "text-amber-300";
  return "text-rose-300";
}

function ScorePair({
  interest,
  readiness,
}: {
  interest: number;
  readiness: number;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
          Interest
        </span>
        <span className={`font-mono text-sm font-bold tabular-nums ${scoreTone(interest)}`}>
          {interest}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
          Readiness
        </span>
        <span className={`font-mono text-sm font-bold tabular-nums ${scoreTone(readiness)}`}>
          {readiness}
        </span>
      </span>
    </div>
  );
}

export function TrendRecommendations({
  currentPrompt,
  currentInterest,
  currentReadiness,
  recommendations,
  onSelect,
  disabled,
  className = "",
}: TrendRecommendationsProps) {
  if (!recommendations.length) return null;

  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#0a0a0a]/95 p-5 shadow-[0_0_24px_-8px_rgba(52,211,153,0.25)] sm:p-6",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">X-trend angles</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Ready prompts · compare Interest &amp; Launch Readiness · no fluff
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          Launch
        </span>
      </div>

      <div className="relative mt-5 grid gap-3">
        <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Your current idea
          </p>
          <p className="mt-1.5 text-sm font-medium text-zinc-200">{currentPrompt}</p>
          <ScorePair interest={currentInterest} readiness={currentReadiness} />
        </div>

        {recommendations.map((rec) => {
          const better =
            rec.interestScore + rec.launchReadinessScore >
            currentInterest + currentReadiness;

          return (
            <button
              key={rec.prompt}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(rec.prompt)}
              className={[
                "group w-full rounded-xl border px-4 py-3 text-left transition duration-200",
                "border-cyan-400/25 bg-cyan-500/[0.04] hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-500/[0.08] hover:shadow-[0_0_28px_-10px_rgba(34,211,238,0.45)]",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold leading-snug text-white group-hover:text-cyan-50">
                  {rec.prompt}
                </p>
                {better ? (
                  <span className="shrink-0 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                    Stronger
                  </span>
                ) : null}
              </div>
              <ScorePair
                interest={rec.interestScore}
                readiness={rec.launchReadinessScore}
              />
              <p className="mt-2 text-[11px] font-medium text-cyan-400/80">
                Tap to run this prompt →
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
