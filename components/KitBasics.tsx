import type { LaunchKitFull } from "@/lib/types";
import { FREE_NARRATIVE_PREVIEW_CHARS } from "@/lib/constants";

type KitBasicsProps = {
  result: LaunchKitFull;
  variant: "preview" | "full";
  className?: string;
};

export function KitBasics({ result, variant, className = "" }: KitBasicsProps) {
  const narrativePreview =
    result.narrativeSummary.length > FREE_NARRATIVE_PREVIEW_CHARS
      ? `${result.narrativeSummary.slice(0, FREE_NARRATIVE_PREVIEW_CHARS)}…`
      : result.narrativeSummary;

  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-white">Idea snapshot</h2>
      <p className="mt-0.5 text-xs text-zinc-500">Token identity & narrative summary</p>
      <dl className="mt-5 space-y-4">
        <div className="rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Token name
          </dt>
          <dd className="mt-1 text-lg font-semibold text-white">{result.tokenName}</dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Ticker
          </dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-violet-300">
            ${result.ticker}
          </dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Narrative summary
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-zinc-300">
            {variant === "preview" ? narrativePreview : result.narrativeSummary}
          </dd>
          {variant === "preview" ? (
            <p className="mt-2 text-xs text-violet-400/80">
              Upgrade to Launch for the full memecoin launch kit.
            </p>
          ) : null}
        </div>
      </dl>
    </section>
  );
}
