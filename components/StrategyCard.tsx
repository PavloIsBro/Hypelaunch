import type { ReactNode, SVGProps } from "react";

type Accent = "cyan" | "violet" | "emerald" | "amber" | "rose" | "sky";

type StrategyCardProps = {
  title: string;
  subtitle: string;
  body: string;
  accent?: Accent;
  icon?: "pulse" | "compete" | "gauge" | "signal" | "timing" | "risk" | "target";
  className?: string;
};

const ACCENT: Record<
  Accent,
  {
    border: string;
    glow: string;
    glowHover: string;
    badge: string;
    bar: string;
    iconBg: string;
    iconText: string;
    chip: string;
  }
> = {
  cyan: {
    border: "border-cyan-400/30 hover:border-cyan-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(34,211,238,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.55)]",
    badge: "border-cyan-400/35 bg-cyan-500/10 text-cyan-300",
    bar: "from-cyan-400 to-sky-300",
    iconBg: "bg-cyan-500/15 border-cyan-400/30",
    iconText: "text-cyan-300",
    chip: "border-cyan-400/25 bg-cyan-500/10 text-cyan-200",
  },
  violet: {
    border: "border-violet-400/30 hover:border-violet-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(167,139,250,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(167,139,250,0.55)]",
    badge: "border-violet-400/35 bg-violet-500/10 text-violet-300",
    bar: "from-violet-400 to-fuchsia-300",
    iconBg: "bg-violet-500/15 border-violet-400/30",
    iconText: "text-violet-300",
    chip: "border-violet-400/25 bg-violet-500/10 text-violet-200",
  },
  emerald: {
    border: "border-emerald-400/30 hover:border-emerald-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(52,211,153,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(52,211,153,0.55)]",
    badge: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
    bar: "from-emerald-400 to-teal-300",
    iconBg: "bg-emerald-500/15 border-emerald-400/30",
    iconText: "text-emerald-300",
    chip: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
  },
  amber: {
    border: "border-amber-400/30 hover:border-amber-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(251,191,36,0.3)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(251,191,36,0.5)]",
    badge: "border-amber-400/35 bg-amber-500/10 text-amber-300",
    bar: "from-amber-400 to-orange-300",
    iconBg: "bg-amber-500/15 border-amber-400/30",
    iconText: "text-amber-300",
    chip: "border-amber-400/25 bg-amber-500/10 text-amber-200",
  },
  rose: {
    border: "border-rose-400/30 hover:border-rose-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(251,113,133,0.3)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(251,113,133,0.5)]",
    badge: "border-rose-400/35 bg-rose-500/10 text-rose-300",
    bar: "from-rose-400 to-pink-300",
    iconBg: "bg-rose-500/15 border-rose-400/30",
    iconText: "text-rose-300",
    chip: "border-rose-400/25 bg-rose-500/10 text-rose-200",
  },
  sky: {
    border: "border-sky-400/30 hover:border-sky-300/50",
    glow: "shadow-[0_0_24px_-8px_rgba(56,189,248,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(56,189,248,0.55)]",
    badge: "border-sky-400/35 bg-sky-500/10 text-sky-300",
    bar: "from-sky-400 to-cyan-300",
    iconBg: "bg-sky-500/15 border-sky-400/30",
    iconText: "text-sky-300",
    chip: "border-sky-400/25 bg-sky-500/10 text-sky-200",
  },
};

function IconGlyph({
  icon,
  className,
}: {
  icon: NonNullable<StrategyCardProps["icon"]>;
  className?: string;
}) {
  const common: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className ?? "h-4 w-4",
    "aria-hidden": true,
  };

  switch (icon) {
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h3l2-5 4 10 2-5h7" />
        </svg>
      );
    case "compete":
      return (
        <svg {...common}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-7" />
          <path d="M22 19H2" />
        </svg>
      );
    case "gauge":
      return (
        <svg {...common}>
          <path d="M12 21a9 9 0 1 1 9-9" />
          <path d="M12 12l5-3" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "signal":
      return (
        <svg {...common}>
          <path d="M4 18h3v-4H4z" />
          <path d="M10.5 18h3V9h-3z" />
          <path d="M17 18h3V5h-3z" />
        </svg>
      );
    case "timing":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    case "risk":
      return (
        <svg {...common}>
          <path d="M12 3l9 16H3L12 3z" />
          <path d="M12 10v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

function extractTickers(text: string): string[] {
  const matches = text.match(/\$[A-Z]{2,10}/g) ?? [];
  return [...new Set(matches)].slice(0, 4);
}

function extractPercent(text: string): number | null {
  const m = text.match(/(\d{1,3})\s*%/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : null;
}

function inferMetric(title: string, body: string): {
  label: string;
  value: number;
  status: string;
} {
  const lower = `${title} ${body}`.toLowerCase();
  const pct = extractPercent(body);

  if (lower.includes("timing") || lower.includes("enter") || lower.includes("wait") || lower.includes("avoid")) {
    if (/\benter\b/.test(lower) && !/\bavoid\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 82, status: "ENTER" };
    }
    if (/\bwait\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 48, status: "WAIT" };
    }
    if (/\bavoid\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 22, status: "AVOID" };
    }
    return { label: "Signal", value: pct ?? 65, status: "WATCH" };
  }

  if (lower.includes("saturation") || lower.includes("crowding")) {
    if (lower.includes("high") || lower.includes("crowded")) {
      return { label: "Saturation", value: pct ?? 78, status: "HIGH" };
    }
    if (lower.includes("low") || lower.includes("open")) {
      return { label: "Saturation", value: pct ?? 28, status: "LOW" };
    }
    return { label: "Saturation", value: pct ?? 54, status: "MODERATE" };
  }

  if (lower.includes("risk")) {
    if (lower.includes("high") || lower.includes("critical")) {
      return { label: "Risk level", value: pct ?? 74, status: "ELEVATED" };
    }
    if (lower.includes("low")) {
      return { label: "Risk level", value: pct ?? 30, status: "CONTAINED" };
    }
    return { label: "Risk level", value: pct ?? 58, status: "WATCH" };
  }

  if (lower.includes("competitor") || lower.includes("lookalike")) {
    return { label: "Overlap", value: pct ?? 61, status: "ACTIVE" };
  }

  if (lower.includes("narrative") || lower.includes("meta")) {
    if (lower.includes("strong") || lower.includes("well") || lower.includes("fits")) {
      return { label: "Meta fit", value: pct ?? 76, status: "STRONG" };
    }
    return { label: "Meta fit", value: pct ?? 58, status: "MIXED" };
  }

  if (lower.includes("positioning") || lower.includes("differentiate")) {
    return { label: "Edge", value: pct ?? 71, status: "READY" };
  }

  // Stable visual fill from content length so cards aren't empty
  const fallback = 40 + (body.length % 45);
  return { label: "Signal strength", value: pct ?? fallback, status: "LIVE" };
}

function highlightBody(body: string): ReactNode {
  const parts = body.split(/(\$[A-Z]{2,10}|\b(?:Enter|Wait|Avoid|high|moderate|low|strong|weak)\b)/gi);
  return parts.map((part, i) => {
    if (/^\$[A-Z]{2,10}$/i.test(part)) {
      return (
        <span key={i} className="font-mono font-semibold text-white">
          {part.toUpperCase()}
        </span>
      );
    }
    if (/^(Enter|Wait|Avoid|high|moderate|low|strong|weak)$/i.test(part)) {
      return (
        <span key={i} className="font-semibold text-white">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function StrategyCard({
  title,
  subtitle,
  body,
  accent = "violet",
  icon = "pulse",
  className = "",
}: StrategyCardProps) {
  const theme = ACCENT[accent];
  const metric = inferMetric(title, body);
  const tickers = extractTickers(body);

  return (
    <section
      className={[
        "group relative overflow-hidden rounded-2xl border bg-[#0a0a0a]/95 p-5 transition duration-300 sm:p-6",
        theme.border,
        theme.glow,
        theme.glowHover,
        "hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70"
        style={{
          background:
            accent === "cyan"
              ? "rgba(34,211,238,0.35)"
              : accent === "emerald"
                ? "rgba(52,211,153,0.35)"
                : accent === "amber"
                  ? "rgba(251,191,36,0.3)"
                  : accent === "rose"
                    ? "rgba(251,113,133,0.3)"
                    : accent === "sky"
                      ? "rgba(56,189,248,0.35)"
                      : "rgba(167,139,250,0.35)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={[
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
              theme.iconBg,
              theme.iconText,
            ].join(" ")}
          >
            <IconGlyph icon={icon} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold tracking-tight text-white sm:text-[15px]">
                {title}
              </h2>
              <span
                className={[
                  "inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]",
                  theme.badge,
                ].join(" ")}
              >
                {metric.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            {metric.label}
          </p>
          <p className={["font-mono text-lg font-bold tabular-nums", theme.iconText].join(" ")}>
            {metric.value}
            <span className="text-xs text-zinc-500">%</span>
          </p>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-600">
          <span>Intensity</span>
          <span className="font-mono text-zinc-400">{metric.value}/100</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.bar} transition-all duration-700`}
            style={{ width: `${metric.value}%` }}
          />
        </div>
      </div>

      {tickers.length > 0 ? (
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {tickers.map((ticker) => (
            <span
              key={ticker}
              className={[
                "rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold",
                theme.chip,
              ].join(" ")}
            >
              {ticker}
            </span>
          ))}
        </div>
      ) : null}

      <p className="relative mt-4 text-sm leading-relaxed text-zinc-400">
        {highlightBody(body)}
      </p>
    </section>
  );
}
