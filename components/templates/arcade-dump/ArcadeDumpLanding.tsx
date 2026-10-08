"use client";

import type { SharedLandingContent } from "@/lib/templates/shared/schema";
import { useEffect, useState } from "react";
import "./arcade-dump.css";

export type ArcadeDumpLandingProps = {
  content: SharedLandingContent;
};

export function ArcadeDumpLanding({ content }: ArcadeDumpLandingProps) {
  const [score, setScore] = useState(38400);
  const [credits, setCredits] = useState(2);

  useEffect(() => {
    const id = window.setInterval(() => {
      setScore((v) => v + Math.floor(Math.random() * 120));
      setCredits((v) => (Math.random() > 0.85 ? Math.min(9, v + 1) : v));
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  const marquee = content.marquee.length
    ? content.marquee
    : [`$${content.ticker}`, "HIGH SCORE"];

  return (
    <div className="arcade-dump relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(251,113,133,0.12), transparent 50%)",
        }}
      />

      <header className="relative border-b-4 border-[var(--ad-cyan)] bg-[var(--ad-cabinet)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="arcade-dump-pixel arcade-dump-bounce flex h-11 w-11 items-center justify-center border-2 border-[var(--ad-yellow)] bg-[var(--ad-bg)] text-[10px] text-[var(--ad-yellow)]">
              {content.brandMark}
            </span>
            <div>
              <p className="arcade-dump-pixel text-[10px] leading-tight text-[var(--ad-cyan)] sm:text-[11px]">
                {content.tokenName}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ad-dim)]">
                ${content.ticker} · 1 PLAYER
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden arcade-dump-pixel text-[8px] text-[var(--ad-green)] sm:inline">
              {content.liveBadgeLabel}
            </span>
            <button
              type="button"
              className="arcade-dump-pixel border-2 border-[var(--ad-pink)] bg-[var(--ad-pink)] px-3 py-2 text-[8px] text-[var(--ad-bg)] hover:bg-transparent hover:text-[var(--ad-pink)]"
            >
              {content.buyButtonLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b-2 border-[var(--ad-yellow)] bg-[var(--ad-bg)] py-2">
        <div className="arcade-dump-marquee arcade-dump-pixel flex w-max gap-10 text-[8px] text-[var(--ad-yellow)]">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="arcade-dump-crt relative overflow-hidden border-4 border-[var(--ad-bezel)] bg-[var(--ad-cabinet)] p-6 sm:p-10">
          <p className="arcade-dump-pixel arcade-dump-insert mb-6 text-center text-[8px] text-[var(--ad-pink)]">
            {content.heroBadge}
          </p>
          <h1 className="arcade-dump-pixel arcade-dump-glow-text text-center text-sm leading-relaxed text-[var(--ad-cyan)] sm:text-xl sm:leading-relaxed">
            <span className="block">{content.heroLine1}</span>
            <span className="mt-2 block text-[var(--ad-pink)]">{content.heroLine2}</span>
            <span className="mt-2 block text-[var(--ad-yellow)]">{content.heroLine3}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-sm leading-relaxed text-[var(--ad-dim)]">
            {content.heroDescription}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="arcade-dump-pixel w-full border-4 border-[var(--ad-cyan)] bg-[var(--ad-cyan)] px-6 py-3 text-[9px] text-[var(--ad-bg)] sm:w-auto"
            >
              {content.primaryCtaLabel}
            </button>
            <button
              type="button"
              className="arcade-dump-pixel w-full border-4 border-[var(--ad-yellow)] px-6 py-3 text-[9px] text-[var(--ad-yellow)] sm:w-auto"
            >
              {content.secondaryCtaLabel}
            </button>
          </div>
          <p className="mt-4 text-center text-[11px] text-[var(--ad-dim)]">{content.audienceLine}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t-2 border-dashed border-[var(--ad-bezel)] pt-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="arcade-dump-pixel text-[8px] text-[var(--ad-dim)]">SCORE</p>
              <p className="arcade-dump-pixel mt-1 text-[10px] text-[var(--ad-green)]">
                {score.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="arcade-dump-pixel text-[8px] text-[var(--ad-dim)]">CREDITS</p>
              <p className="arcade-dump-pixel mt-1 text-[10px] text-[var(--ad-yellow)]">
                {credits}
              </p>
            </div>
            {content.terminalStats.slice(0, 2).map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="arcade-dump-pixel text-[8px] text-[var(--ad-dim)]">
                  {stat.label.toUpperCase()}
                </p>
                <p className="arcade-dump-pixel mt-1 text-[10px] text-[var(--ad-cyan)]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="arcade-dump-pixel mb-4 text-center text-[9px] text-[var(--ad-yellow)]">
            {content.terminalTitle}
          </p>
          <p className="mb-5 text-center text-xs text-[var(--ad-dim)]">
            {content.terminalDescription}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.features.map((feature, i) => (
              <div
                key={feature.title}
                className="border-4 border-[var(--ad-bezel)] bg-[var(--ad-cabinet)] p-4"
                style={{
                  borderColor: i === 1 ? "var(--ad-pink)" : i === 2 ? "var(--ad-yellow)" : "var(--ad-cyan)",
                }}
              >
                <p className="arcade-dump-pixel text-[8px] leading-relaxed text-[var(--ad-cyan)]">
                  {feature.title}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--ad-dim)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 border-4 border-[var(--ad-bezel)] bg-[var(--ad-cabinet)] p-6">
          <p className="arcade-dump-pixel mb-4 text-[9px] text-[var(--ad-pink)]">ATTRACT MODE</p>
          <div className="space-y-3 text-sm leading-relaxed text-[var(--ad-text)]/90">
            {content.loreParagraphs.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="border-4 border-[var(--ad-yellow)] bg-[var(--ad-cabinet)] p-5">
            <p className="arcade-dump-pixel text-[8px] text-[var(--ad-yellow)]">COIN RULES</p>
            <ul className="mt-4 space-y-2">
              {content.tokenomics.map((row) => (
                <li
                  key={row.label}
                  className="flex justify-between gap-3 border-b border-dashed border-[var(--ad-bezel)] pb-2 text-xs last:border-0"
                >
                  <span className="text-[var(--ad-dim)]">{row.label}</span>
                  <span className="text-right font-semibold text-[var(--ad-text)]">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-[var(--ad-pink)] bg-[var(--ad-cabinet)] p-5">
            <p className="arcade-dump-pixel text-[8px] text-[var(--ad-pink)]">
              {content.raidObjectiveTitle}
            </p>
            <p className="mt-3 text-sm text-[var(--ad-dim)]">{content.raidObjectiveBody}</p>
            <button
              type="button"
              className="arcade-dump-pixel mt-5 w-full border-2 border-[var(--ad-pink)] px-3 py-3 text-[8px] text-[var(--ad-pink)]"
            >
              {content.raidCtaLabel}
            </button>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="arcade-dump-pixel text-[10px] text-[var(--ad-cyan)]">
              {content.communityTitle}
            </h2>
            <p className="mt-3 text-sm text-[var(--ad-dim)]">{content.communityDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="border-2 border-[var(--ad-cyan)] px-3 py-2 text-[11px] text-[var(--ad-cyan)]"
              >
                {content.xLinkLabel}
              </button>
              <button
                type="button"
                className="border-2 border-[var(--ad-yellow)] px-3 py-2 text-[11px] text-[var(--ad-yellow)]"
              >
                {content.telegramLinkLabel}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="border-2 border-[var(--ad-bezel)] bg-[var(--ad-cabinet)]"
              >
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                  {item.question}
                </summary>
                <p className="border-t border-[var(--ad-bezel)] px-4 py-3 text-xs leading-relaxed text-[var(--ad-dim)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-[var(--ad-cyan)] px-4 py-5 text-center">
        <p className="arcade-dump-pixel text-[7px] leading-relaxed text-[var(--ad-dim)]">
          {content.footerNote}
        </p>
      </footer>
    </div>
  );
}
