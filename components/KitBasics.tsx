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
    <section
      className={[
        "group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#0a0a0a]/95 p-5 shadow-[0_0_24px_-8px_rgba(34,211,238,0.25)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.4)] sm:p-6",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl opacity-50 transition group-hover:opacity-80" />

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-white">Idea snapshot</h2>
          <p className="mt-0.5 text-xs text-zinc-500">Token identity & narrative summary</p>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
          Terminal
        </span>
      </div>

      <dl className="relative mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-black/50 px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Token name
          </dt>
          <dd className="mt-1 text-lg font-semibold text-white">{result.tokenName}</dd>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">
            Ticker
          </dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-emerald-300">
            ${result.ticker}
          </dd>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-black/50 px-4 py-3 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Narrative summary
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-zinc-300">
            {variant === "preview" ? narrativePreview : result.narrativeSummary}
          </dd>
          {variant === "preview" ? (
            <p className="mt-2 text-xs text-cyan-400/80">
              Upgrade to Launch for the full memecoin launch kit.
            </p>
          ) : null}
        </div>
      </dl>
    </section>
  );
}
