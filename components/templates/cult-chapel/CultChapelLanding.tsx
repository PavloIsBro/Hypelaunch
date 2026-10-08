"use client";

import type { SharedLandingContent } from "@/lib/templates/shared/schema";
import { useEffect, useState } from "react";
import "./cult-chapel.css";

export type CultChapelLandingProps = {
  content: SharedLandingContent;
};

export function CultChapelLanding({ content }: CultChapelLandingProps) {
  const [devotion, setDevotion] = useState(66);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDevotion((v) => Math.min(99, Math.max(40, v + (Math.random() > 0.45 ? 1 : -1))));
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  const marquee = content.marquee.length
    ? content.marquee
    : [`$${content.ticker}`, "THE CONGREGATION AWAITS"];

  return (
    <div className="cult-chapel relative min-h-screen overflow-x-hidden">
      <div className="cult-chapel-smoke pointer-events-none absolute inset-0" />
      <div
        className="cult-chapel-rise pointer-events-none absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full blur-[80px]"
        style={{ background: "rgba(185, 28, 28, 0.25)" }}
      />

      <header className="relative border-b border-[var(--cc-border)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-5 py-8 text-center sm:px-8">
          <span className="cult-chapel-flicker cult-chapel-display flex h-14 w-14 items-center justify-center border border-[var(--cc-gold)] text-lg text-[var(--cc-gold)]">
            {content.brandMark}
          </span>
          <div>
            <p className="cult-chapel-display text-lg tracking-[0.28em] text-[var(--cc-text)]">
              {content.tokenName.toUpperCase()}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.35em] text-[var(--cc-muted)]">
              ${content.ticker} · THE ORDER
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] text-[var(--cc-crimson)]">
              {content.liveBadgeLabel}
            </span>
            <button
              type="button"
              className="border border-[var(--cc-gold)] bg-[var(--cc-gold)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[var(--cc-bg)] hover:bg-transparent hover:text-[var(--cc-gold)]"
            >
              {content.buyButtonLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-[var(--cc-border)] bg-[var(--cc-blood)]/30 py-2">
        <div className="cult-chapel-chant flex w-max gap-12 whitespace-nowrap text-[10px] tracking-[0.4em] text-[var(--cc-gold)]">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-center text-[11px] tracking-[0.35em] text-[var(--cc-muted)]">
          {content.heroBadge}
        </p>
        <h1 className="cult-chapel-display mt-6 text-center text-4xl leading-[1.1] tracking-wide text-[var(--cc-text)] sm:text-6xl">
          <span className="block">{content.heroLine1}</span>
          <span className="mt-2 block text-[var(--cc-crimson)]">{content.heroLine2}</span>
          <span className="mt-2 block text-[var(--cc-gold)]">{content.heroLine3}</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-[var(--cc-muted)]">
          {content.heroDescription}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="w-full border border-[var(--cc-crimson)] bg-[var(--cc-crimson)] px-8 py-3 text-sm tracking-[0.16em] text-[var(--cc-text)] sm:w-auto"
          >
            {content.primaryCtaLabel}
          </button>
          <button
            type="button"
            className="w-full border border-[var(--cc-gold-dim)] px-8 py-3 text-sm tracking-[0.16em] text-[var(--cc-gold)] sm:w-auto"
          >
            {content.secondaryCtaLabel}
          </button>
        </div>
        <p className="mt-5 text-center text-xs tracking-wide text-[var(--cc-muted)]">
          {content.audienceLine}
        </p>

        <section className="mt-16 border border-[var(--cc-border)] bg-[var(--cc-panel)] p-6 text-center sm:p-8">
          <p className="cult-chapel-display text-sm tracking-[0.3em] text-[var(--cc-gold)]">
            {content.terminalTitle}
          </p>
          <p className="mt-2 text-xs text-[var(--cc-muted)]">{content.terminalDescription}</p>
          <div className="mx-auto mt-6 max-w-xs">
            <div className="mb-2 flex justify-between text-[10px] tracking-[0.2em] text-[var(--cc-muted)]">
              <span>DEVOTION</span>
              <span className="text-[var(--cc-crimson)]">{devotion}%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--cc-border)]">
              <div
                className="h-full bg-[var(--cc-crimson)] transition-[width] duration-700"
                style={{ width: `${devotion}%` }}
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {content.terminalStats.map((stat) => (
              <div key={stat.label}>
                <p className="cult-chapel-display text-2xl text-[var(--cc-gold)]">{stat.value}</p>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-[var(--cc-muted)]">
                  {stat.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="cult-chapel-display mb-8 text-center text-sm tracking-[0.3em] text-[var(--cc-muted)]">
            THE TENETS
          </p>
          <div className="space-y-6">
            {content.features.map((feature, i) => (
              <div
                key={feature.title}
                className="border-l-2 border-[var(--cc-crimson)] pl-5"
              >
                <p className="cult-chapel-display text-lg tracking-wide text-[var(--cc-gold)]">
                  {String(i + 1).padStart(2, "0")} · {feature.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--cc-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-5 text-center">
          <p className="cult-chapel-display text-sm tracking-[0.3em] text-[var(--cc-crimson)]">
            GOSPEL
          </p>
          {content.loreParagraphs.map((p) => (
            <p
              key={p.slice(0, 28)}
              className="text-base leading-relaxed text-[var(--cc-text)]/85"
            >
              {p}
            </p>
          ))}
        </section>

        <section className="mt-16 border border-[var(--cc-gold)]/30 bg-[var(--cc-panel)] p-6">
          <p className="cult-chapel-display text-center text-sm tracking-[0.25em] text-[var(--cc-gold)]">
            OFFERINGS
          </p>
          <ul className="mt-6 space-y-3">
            {content.tokenomics.map((row) => (
              <li
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--cc-border)] pb-3 text-sm last:border-0"
              >
                <span className="tracking-wide text-[var(--cc-muted)]">{row.label}</span>
                <span className="text-right text-[var(--cc-text)]">{row.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 text-center">
          <p className="cult-chapel-display text-xl tracking-[0.2em] text-[var(--cc-crimson)]">
            {content.raidObjectiveTitle}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--cc-muted)]">
            {content.raidObjectiveBody}
          </p>
          <button
            type="button"
            className="mt-6 border border-[var(--cc-gold)] px-6 py-3 text-xs tracking-[0.25em] text-[var(--cc-gold)]"
          >
            {content.raidCtaLabel}
          </button>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <h2 className="cult-chapel-display text-lg tracking-[0.2em]">
              {content.communityTitle}
            </h2>
            <p className="mt-3 text-sm text-[var(--cc-muted)]">{content.communityDescription}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              <button
                type="button"
                className="border border-[var(--cc-border)] px-3 py-2 text-xs tracking-wide text-[var(--cc-text)]"
              >
                {content.xLinkLabel}
              </button>
              <button
                type="button"
                className="border border-[var(--cc-border)] px-3 py-2 text-xs tracking-wide text-[var(--cc-text)]"
              >
                {content.telegramLinkLabel}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="cult-chapel-display text-center text-xs tracking-[0.3em] text-[var(--cc-muted)] sm:text-left">
              CATECHISM
            </p>
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="border border-[var(--cc-border)] bg-[var(--cc-panel)]"
              >
                <summary className="cursor-pointer px-4 py-3 text-sm">{item.question}</summary>
                <p className="border-t border-[var(--cc-border)] px-4 py-3 text-xs leading-relaxed text-[var(--cc-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--cc-border)] px-5 py-8 text-center">
        <p className="text-[10px] tracking-[0.3em] text-[var(--cc-muted)]">{content.footerNote}</p>
      </footer>
    </div>
  );
}
