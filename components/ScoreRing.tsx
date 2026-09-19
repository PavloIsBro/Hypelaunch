"use client";

import { useEffect, useState } from "react";

type ScoreRingProps = {
  label: string;
  score: number;
  animate?: boolean;
  locked?: boolean;
  className?: string;
};

function ratingAccent(score: number): {
  stroke: string;
  glow: string;
  glowHover: string;
} {
  // Green best → blue → yellow → red worst
  if (score >= 70) {
    return {
      stroke: "url(#score-emerald)",
      glow: "bg-emerald-500/15",
      glowHover: "group-hover:bg-emerald-500/25",
    };
  }
  if (score >= 50) {
    return {
      stroke: "url(#score-cyan)",
      glow: "bg-cyan-500/15",
      glowHover: "group-hover:bg-cyan-500/25",
    };
  }
  if (score >= 30) {
    return {
      stroke: "url(#score-amber)",
      glow: "bg-amber-500/15",
      glowHover: "group-hover:bg-amber-500/25",
    };
  }
  return {
    stroke: "url(#score-rose)",
    glow: "bg-rose-500/15",
    glowHover: "group-hover:bg-rose-500/25",
  };
}

export function ScoreRing({
  label,
  score,
  animate = false,
  locked = false,
  className = "",
}: ScoreRingProps) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [offset, setOffset] = useState(circumference);
  const accent = ratingAccent(locked ? 0 : score);

  useEffect(() => {
    if (locked) return;

    if (!animate) {
      setDisplayScore(score);
      setOffset(circumference - (score / 100) * circumference);
      return;
    }

    setDisplayScore(0);
    setOffset(circumference);

    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(score * eased);
      setDisplayScore(current);
      setOffset(circumference - (current / 100) * circumference);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, animate, circumference, locked]);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-6 shadow-[0_0_24px_-10px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition ${accent.glow} ${accent.glowHover}`}
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <div className="relative mx-auto mt-5 flex h-32 w-32 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="score-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
            <linearGradient id="score-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="score-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <linearGradient id="score-rose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={locked ? "rgba(255,255,255,0.08)" : accent.stroke}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <span className="absolute text-3xl font-bold tabular-nums tracking-tight text-white">
          {displayScore}
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">out of 100</p>
      {locked ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-[2px]">
          <span className="rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs text-zinc-300">
            Locked — Launch
          </span>
        </div>
      ) : null}
    </article>
  );
}
