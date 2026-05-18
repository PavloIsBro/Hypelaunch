"use client";

import { useEffect, useState } from "react";

type ScoreRingProps = {
  label: string;
  score: number;
  accent?: "violet" | "cyan";
  animate?: boolean;
  className?: string;
};

export function ScoreRing({
  label,
  score,
  accent = "violet",
  animate = false,
  className = "",
}: ScoreRingProps) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [offset, setOffset] = useState(circumference);

  const stroke =
    accent === "cyan"
      ? "url(#score-cyan)"
      : "url(#score-violet)";

  useEffect(() => {
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
  }, [score, animate, circumference]);

  return (
    <article
      className={`glass-card group relative overflow-hidden rounded-2xl p-6 ${className}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <div className="relative mx-auto mt-5 flex h-32 w-32 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="score-violet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="score-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
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
            stroke={stroke}
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
    </article>
  );
}
