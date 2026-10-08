import type { CSSProperties } from "react";
import type { LandingPageContent } from "@/lib/types";

type LandingPreviewProps = {
  landing: LandingPageContent;
  className?: string;
};

function PlaceholderLink({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  return (
    <span
      role="link"
      aria-disabled="true"
      className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-300"
      title="Placeholder — link not connected"
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
      {label}
    </span>
  );
}

function LandingPageTemplate({ landing }: { landing: LandingPageContent }) {
  const { colorPalette: palette } = landing;
  const slug = landing.tokenName.toLowerCase().replace(/\s+/g, "-");

  const theme = {
    "--lp-primary": palette.primary,
    "--lp-secondary": palette.secondary,
    "--lp-accent": palette.accent,
    "--lp-bg": palette.background,
  } as CSSProperties;

  return (
    <div
      className="flex min-h-[520px] flex-col text-left"
      style={{
        ...theme,
        backgroundColor: palette.background,
        color: "#e4e4e7",
      }}
    >
      <header className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
            }}
          >
            {landing.ticker.slice(0, 2)}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{landing.tokenName}</p>
            <p className="font-mono text-xs" style={{ color: palette.accent }}>
              ${landing.ticker}
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 sm:flex">
          <span className="text-xs text-zinc-500">About</span>
          <span className="text-xs text-zinc-500">Community</span>
        </nav>
      </header>

      <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${palette.primary}33, transparent 60%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-48 w-48 rounded-full blur-[80px]"
          style={{ backgroundColor: `${palette.secondary}22` }}
        />
        <div className="relative mx-auto max-w-lg text-center">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: palette.accent }}
          >
            {landing.tagline}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {landing.heroTitle}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {landing.heroSubtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{landing.shortNarrative}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-full px-7 py-3 text-sm font-bold text-black shadow-lg transition hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                boxShadow: `0 0 32px -6px ${palette.primary}88`,
              }}
            >
              {landing.ctaText}
            </button>
            <button
              type="button"
              className="rounded-full border px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              style={{ borderColor: `${palette.primary}55` }}
            >
              {landing.pumpFunButtonLabel}
            </button>
          </div>
          <p className="mt-6 text-xs text-zinc-600">
            For: <span className="text-zinc-500">{landing.audience}</span>
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-lg">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">About</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{landing.aboutSection}</p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-lg">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Community
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{landing.communitySection}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PlaceholderLink label={landing.xLinkLabel} accent={palette.secondary} />
            <PlaceholderLink label={landing.telegramLinkLabel} accent={palette.primary} />
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/[0.06] px-5 py-4 text-center sm:px-8">
        <p className="font-mono text-[10px] text-zinc-600">
          {slug}.hypelaunch.space · preview only
        </p>
      </footer>
    </div>
  );
}

export function LandingPreview({ landing, className = "" }: LandingPreviewProps) {
  const slug = landing.tokenName.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Landing page preview</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            AI-generated layout · included in Launch
          </p>
        </div>
        <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-300">
          Launch
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-violet-950/30">
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 truncate font-mono text-[11px] text-zinc-500">
            hypelaunch.space/{slug}
          </span>
        </div>
        <LandingPageTemplate landing={landing} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["Primary", landing.colorPalette.primary],
            ["Secondary", landing.colorPalette.secondary],
            ["Accent", landing.colorPalette.accent],
            ["Background", landing.colorPalette.background],
          ] as const
        ).map(([label, hex]) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/40 px-2.5 py-1.5 text-[10px] text-zinc-500"
          >
            <span
              className="h-3 w-3 rounded-full border border-white/10"
              style={{ backgroundColor: hex }}
            />
            {label}
            <span className="font-mono text-zinc-600">{hex}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
