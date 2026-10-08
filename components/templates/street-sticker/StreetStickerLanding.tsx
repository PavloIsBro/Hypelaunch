"use client";

import type { SharedLandingContent } from "@/lib/templates/shared/schema";
import { useEffect, useState } from "react";
import "./street-sticker.css";

export type StreetStickerLandingProps = {
  content: SharedLandingContent;
};

const STICKER_ANGLES = [-4, 2.5, -1.5, 3.5, -2.8, 1.2];
const STICKER_COLORS = [
  "var(--st-red)",
  "var(--st-lime)",
  "var(--st-blue)",
  "var(--st-orange)",
  "var(--st-cream)",
  "var(--st-red)",
];

export function StreetStickerLanding({ content }: StreetStickerLandingProps) {
  const [heat, setHeat] = useState(73);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeat((v) => Math.min(99, Math.max(55, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 1700);
    return () => window.clearInterval(id);
  }, []);

  const marquee = content.marquee.length
    ? content.marquee
    : [`$${content.ticker}`, "PASTE EVERYWHERE"];

  return (
    <div className="street-sticker relative min-h-screen overflow-x-hidden">
      <div className="street-sticker-noise pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 10%, rgba(249,115,22,0.15), transparent 50%), radial-gradient(ellipse 60% 40% at 90% 70%, rgba(37,99,235,0.12), transparent 45%)",
        }}
      />

      <header className="relative border-b-4 border-[var(--st-black)] bg-[var(--st-asphalt)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="street-sticker-pulse-stamp street-sticker-display flex h-12 w-12 items-center justify-center bg-[var(--st-lime)] text-xl text-[var(--st-black)] shadow-[4px_4px_0_var(--st-black)]">
              {content.brandMark}
            </span>
            <div>
              <p className="street-sticker-display text-2xl leading-none text-[var(--st-cream)]">
                {content.tokenName}
              </p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--st-orange)]">
                ${content.ticker} · STREET
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rotate-[-2deg] bg-[var(--st-red)] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_var(--st-black)] sm:inline">
              {content.liveBadgeLabel}
            </span>
            <button
              type="button"
              className="street-sticker-display rotate-[1deg] bg-[var(--st-cream)] px-4 py-2 text-lg text-[var(--st-black)] shadow-[3px_3px_0_var(--st-black)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--st-black)]"
            >
              {content.buyButtonLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b-4 border-[var(--st-black)] bg-[var(--st-lime)] py-2 text-[var(--st-black)]">
        <div className="street-sticker-ribbon street-sticker-display flex w-max gap-8 text-lg">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8">
              {item}
              <span aria-hidden>★</span>
            </span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="relative">
          <span className="absolute -left-1 -top-3 rotate-[-8deg] bg-[var(--st-blue)] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_var(--st-black)]">
            {content.heroBadge}
          </span>

          <h1 className="street-sticker-display mt-6 text-5xl leading-[0.9] text-[var(--st-cream)] sm:text-7xl">
            <span className="block">{content.heroLine1}</span>
            <span
              className="mt-1 inline-block rotate-[-1.5deg] bg-[var(--st-red)] px-2 text-[var(--st-cream)]"
            >
              {content.heroLine2}
            </span>
            <span className="mt-2 block text-[var(--st-lime)]">{content.heroLine3}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--st-muted)] sm:text-lg">
            {content.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="street-sticker-display rotate-[-1deg] bg-[var(--st-orange)] px-6 py-3 text-xl text-[var(--st-black)] shadow-[4px_4px_0_var(--st-black)]"
            >
              {content.primaryCtaLabel}
            </button>
            <button
              type="button"
              className="street-sticker-display rotate-[1.5deg] border-4 border-[var(--st-cream)] bg-transparent px-6 py-3 text-xl text-[var(--st-cream)] shadow-[4px_4px_0_var(--st-black)]"
            >
              {content.secondaryCtaLabel}
            </button>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--st-muted)]">
            {content.audienceLine}
          </p>
        </div>

        <section className="mt-14 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="border-4 border-[var(--st-black)] bg-[var(--st-asphalt)] p-5 shadow-[6px_6px_0_var(--st-black)]">
            <div className="flex items-center justify-between">
              <p className="street-sticker-display text-2xl text-[var(--st-lime)]">
                {content.terminalTitle}
              </p>
              <span className="bg-[var(--st-red)] px-2 py-1 text-[10px] font-black uppercase text-white">
                HEAT {heat}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--st-muted)]">{content.terminalDescription}</p>
            <div className="mt-4 h-3 border-2 border-[var(--st-black)] bg-[var(--st-bg)]">
              <div
                className="h-full bg-[var(--st-orange)] transition-[width] duration-700"
                style={{ width: `${heat}%` }}
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {content.terminalStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="street-sticker-wobble border-2 border-[var(--st-black)] bg-[var(--st-cream)] p-3 text-center text-[var(--st-black)]"
                  style={{ transform: `rotate(${STICKER_ANGLES[i]}deg)` }}
                >
                  <p className="street-sticker-display text-2xl">{stat.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {content.features.map((feature, i) => (
            <div
              key={feature.title}
              className="street-sticker-wobble border-4 border-[var(--st-black)] p-4 shadow-[4px_4px_0_var(--st-black)]"
              style={{
                background: STICKER_COLORS[i],
                color: i === 1 || i === 4 ? "var(--st-black)" : "white",
                transform: `rotate(${STICKER_ANGLES[i + 1]}deg)`,
              }}
            >
              <p className="street-sticker-display text-xl leading-none">{feature.title}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 space-y-4">
          {content.loreParagraphs.map((p, i) => (
            <p
              key={p.slice(0, 28)}
              className="street-sticker-wobble max-w-2xl border-2 border-[var(--st-black)] bg-[var(--st-cream)] px-4 py-3 text-sm leading-relaxed text-[var(--st-black)] shadow-[3px_3px_0_var(--st-black)]"
              style={{
                transform: `rotate(${i % 2 === 0 ? -1 : 1.2}deg)`,
                marginLeft: i % 2 === 0 ? 0 : "1.5rem",
              }}
            >
              {p}
            </p>
          ))}
        </section>

        <section className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="border-4 border-[var(--st-black)] bg-[var(--st-asphalt)] p-5 shadow-[5px_5px_0_var(--st-blue)]">
            <p className="street-sticker-display text-2xl text-[var(--st-orange)]">STAMPS</p>
            <ul className="mt-4 space-y-2">
              {content.tokenomics.map((row) => (
                <li
                  key={row.label}
                  className="flex justify-between gap-3 border-b-2 border-dashed border-[var(--st-muted)]/40 pb-2 text-sm last:border-0"
                >
                  <span className="font-bold uppercase tracking-wider text-[var(--st-muted)]">
                    {row.label}
                  </span>
                  <span className="text-right font-semibold">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="border-4 border-[var(--st-black)] bg-[var(--st-red)] p-5 text-white shadow-[5px_5px_0_var(--st-black)]"
            style={{ transform: "rotate(1deg)" }}
          >
            <p className="street-sticker-display text-2xl">{content.raidObjectiveTitle}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-90">{content.raidObjectiveBody}</p>
            <button
              type="button"
              className="street-sticker-display mt-5 w-full bg-[var(--st-black)] px-4 py-3 text-lg text-[var(--st-lime)]"
            >
              {content.raidCtaLabel}
            </button>
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="street-sticker-display text-3xl text-[var(--st-lime)]">
              {content.communityTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--st-muted)]">{content.communityDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className="rotate-[-2deg] border-2 border-[var(--st-black)] bg-[var(--st-blue)] px-3 py-2 text-xs font-black uppercase text-white shadow-[2px_2px_0_var(--st-black)]"
              >
                {content.xLinkLabel}
              </button>
              <button
                type="button"
                className="rotate-[2deg] border-2 border-[var(--st-black)] bg-[var(--st-orange)] px-3 py-2 text-xs font-black uppercase text-[var(--st-black)] shadow-[2px_2px_0_var(--st-black)]"
              >
                {content.telegramLinkLabel}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {content.faq.map((item, i) => (
              <details
                key={item.question}
                className="border-2 border-[var(--st-black)] bg-[var(--st-asphalt)] shadow-[3px_3px_0_var(--st-black)]"
                style={{ transform: `rotate(${STICKER_ANGLES[i] * 0.4}deg)` }}
              >
                <summary className="cursor-pointer px-4 py-3 text-sm font-bold">
                  {item.question}
                </summary>
                <p className="border-t-2 border-[var(--st-black)] px-4 py-3 text-xs leading-relaxed text-[var(--st-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-[var(--st-black)] bg-[var(--st-asphalt)] px-4 py-6 text-center">
        <p className="street-sticker-display text-sm text-[var(--st-muted)]">{content.footerNote}</p>
      </footer>
    </div>
  );
}
