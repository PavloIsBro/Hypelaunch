"use client";

import type { SharedLandingContent } from "@/lib/templates/shared/schema";
import { useEffect, useState } from "react";
import "./signal-stack.css";

export type SignalStackLandingProps = {
  content: SharedLandingContent;
};

export function SignalStackLanding({ content }: SignalStackLandingProps) {
  const [fill, setFill] = useState(41);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFill((v) => Math.min(94, v + (Math.random() > 0.5 ? 1 : 0)));
      setLatency((v) => Math.max(4, Math.min(48, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  const marquee = content.marquee.length
    ? content.marquee
    : [`$${content.ticker}`, "SIGNAL LIVE"];

  return (
    <div className="signal-stack relative min-h-screen overflow-x-hidden">
      <div className="signal-stack-scan pointer-events-none absolute inset-0" />

      <header className="relative border-b border-[var(--ss-border)] bg-[var(--ss-panel)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-[var(--ss-ice)] bg-[var(--ss-panel-2)] text-[11px] font-bold text-[var(--ss-ice)]">
              {content.brandMark}
            </span>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ss-text)]">
                {content.tokenName}
              </p>
              <p className="text-[10px] text-[var(--ss-dim)]">
                ${content.ticker} · DESK · SOL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.14em]">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="signal-stack-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--ss-green)]" />
              <span className="text-[var(--ss-green)]">{content.liveBadgeLabel}</span>
            </span>
            <span className="text-[var(--ss-dim)]">LAT {latency}ms</span>
            <button
              type="button"
              className="border border-[var(--ss-ice)] bg-[var(--ss-ice)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ss-bg)] hover:bg-transparent hover:text-[var(--ss-ice)]"
            >
              {content.buyButtonLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-[var(--ss-border)] bg-[var(--ss-panel-2)] py-1.5">
        <div className="signal-stack-tape flex w-max gap-8 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-[var(--ss-ice-dim)]">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8">
              {item}
              <span className="text-[var(--ss-dim)]" aria-hidden>
                |
              </span>
            </span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--ss-dim)]">
          <span className="signal-stack-blink text-[var(--ss-amber)]">●</span>
          {content.heroBadge}
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-3xl font-bold leading-[1.05] tracking-tight text-[var(--ss-text)] sm:text-5xl">
              <span className="block">{content.heroLine1}</span>
              <span className="block text-[var(--ss-ice)]">{content.heroLine2}</span>
              <span className="block text-[var(--ss-dim)]">{content.heroLine3}</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--ss-dim)] sm:text-[15px]">
              {content.heroDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <button
                type="button"
                className="border border-[var(--ss-ice)] bg-[var(--ss-ice)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ss-bg)]"
              >
                {content.primaryCtaLabel}
              </button>
              <button
                type="button"
                className="border border-[var(--ss-border)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ss-text)] hover:border-[var(--ss-ice)] hover:text-[var(--ss-ice)]"
              >
                {content.secondaryCtaLabel}
              </button>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-[var(--ss-dim)]">
              {content.audienceLine}
            </p>
          </div>

          <aside className="border border-[var(--ss-border)] bg-[var(--ss-panel)]">
            <div className="flex items-center justify-between border-b border-[var(--ss-border)] px-4 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ss-ice)]">
                {content.terminalTitle}
              </p>
              <span className="text-[9px] uppercase tracking-wider text-[var(--ss-green)]">
                LIVE
              </span>
            </div>
            <div className="space-y-4 p-4">
              <p className="text-[11px] text-[var(--ss-dim)]">{content.terminalDescription}</p>
              <div>
                <div className="mb-1.5 flex justify-between text-[10px] uppercase tracking-wider">
                  <span className="text-[var(--ss-dim)]">Curve fill</span>
                  <span className="text-[var(--ss-ice)]">{fill}%</span>
                </div>
                <div className="h-2 w-full border border-[var(--ss-border)] bg-[var(--ss-bg)]">
                  <div
                    className="h-full bg-[var(--ss-ice)] transition-[width] duration-700"
                    style={{ width: `${fill}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-[var(--ss-border)] pt-4">
                {content.terminalStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-lg font-bold text-[var(--ss-text)]">{stat.value}</p>
                    <p className="text-[9px] uppercase tracking-wider text-[var(--ss-dim)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12 grid gap-px border border-[var(--ss-border)] bg-[var(--ss-border)] sm:grid-cols-3">
          {content.features.map((feature) => (
            <div key={feature.title} className="bg-[var(--ss-panel)] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ss-ice)]">
                {feature.title}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--ss-dim)]">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="border border-[var(--ss-border)] bg-[var(--ss-panel)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ss-dim)]">
              Analyst notes
            </p>
            <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-[var(--ss-text)]">
              {content.loreParagraphs.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="border border-[var(--ss-border)] bg-[var(--ss-panel)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ss-dim)]">
              Position sheet
            </p>
            <ul className="mt-4 space-y-0">
              {content.tokenomics.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--ss-border)] py-2.5 text-[12px] last:border-0"
                >
                  <span className="uppercase tracking-wider text-[var(--ss-dim)]">
                    {row.label}
                  </span>
                  <span className="text-right font-semibold text-[var(--ss-text)]">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12 border border-[var(--ss-amber)]/40 bg-[var(--ss-panel)] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ss-amber)]">
            {content.raidObjectiveTitle}
          </p>
          <p className="mt-2 text-sm text-[var(--ss-text)]">{content.raidObjectiveBody}</p>
          <button
            type="button"
            className="mt-4 border border-[var(--ss-amber)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ss-amber)] hover:bg-[var(--ss-amber)] hover:text-[var(--ss-bg)]"
          >
            {content.raidCtaLabel}
          </button>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--ss-text)]">
              {content.communityTitle}
            </h2>
            <p className="mt-2 text-[13px] text-[var(--ss-dim)]">{content.communityDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="border border-[var(--ss-border)] px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--ss-text)] hover:border-[var(--ss-ice)]"
              >
                {content.xLinkLabel}
              </button>
              <button
                type="button"
                className="border border-[var(--ss-border)] px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--ss-text)] hover:border-[var(--ss-ice)]"
              >
                {content.telegramLinkLabel}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="border border-[var(--ss-border)] bg-[var(--ss-panel)] open:border-[var(--ss-ice)]/40"
              >
                <summary className="cursor-pointer px-4 py-3 text-[12px] font-semibold text-[var(--ss-text)]">
                  {item.question}
                </summary>
                <p className="border-t border-[var(--ss-border)] px-4 py-3 text-[12px] leading-relaxed text-[var(--ss-dim)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ss-border)] px-4 py-5 text-center sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--ss-dim)]">
          {content.footerNote}
        </p>
      </footer>
    </div>
  );
}
