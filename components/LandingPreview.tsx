import type { LaunchKitFull } from "@/lib/types";

type LandingPreviewProps = {
  landing: LaunchKitFull["landing"];
  tokenName: string;
  className?: string;
};

export function LandingPreview({
  landing,
  tokenName,
  className = "",
}: LandingPreviewProps) {
  const slug = tokenName.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Landing preview</h2>
        <p className="mt-0.5 text-xs text-zinc-500">Mini site mock for your token</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black shadow-2xl shadow-violet-950/30">
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 truncate font-mono text-[11px] text-zinc-500">
            hypelaunch.space/{slug}
          </span>
        </div>
        <div className="relative flex min-h-[240px] flex-col items-center justify-center gap-4 overflow-hidden px-6 py-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.18),transparent_55%)]" />
          <p className="relative text-[10px] font-medium uppercase tracking-[0.22em] text-violet-300/70">
            {landing.tagline}
          </p>
          <h3 className="relative max-w-md text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {landing.headline}
          </h3>
          <p className="relative max-w-sm text-sm leading-relaxed text-zinc-400">
            {landing.subheadline}
          </p>
          <button
            type="button"
            className="relative mt-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:scale-[1.02]"
          >
            {landing.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
