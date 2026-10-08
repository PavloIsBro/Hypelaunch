import type { ReactNode, SVGProps } from "react";

/** Rating scale (best → worst): green → blue → yellow → red. No purple. */
type Accent = "emerald" | "cyan" | "amber" | "rose";

type StrategyCardProps = {
  title: string;
  subtitle: string;
  body: string;
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
    blob: string;
  }
> = {
  emerald: {
    border: "border-emerald-400/35 hover:border-emerald-300/55",
    glow: "shadow-[0_0_24px_-8px_rgba(52,211,153,0.4)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(52,211,153,0.6)]",
    badge: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
    bar: "from-emerald-400 to-teal-300",
    iconBg: "bg-emerald-500/15 border-emerald-400/35",
    iconText: "text-emerald-300",
    chip: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    blob: "rgba(52,211,153,0.4)",
  },
  cyan: {
    border: "border-cyan-400/35 hover:border-cyan-300/55",
    glow: "shadow-[0_0_24px_-8px_rgba(34,211,238,0.4)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.6)]",
    badge: "border-cyan-400/40 bg-cyan-500/15 text-cyan-300",
    bar: "from-cyan-400 to-sky-300",
    iconBg: "bg-cyan-500/15 border-cyan-400/35",
    iconText: "text-cyan-300",
    chip: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
    blob: "rgba(34,211,238,0.4)",
  },
  amber: {
    border: "border-amber-400/35 hover:border-amber-300/55",
    glow: "shadow-[0_0_24px_-8px_rgba(251,191,36,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(251,191,36,0.55)]",
    badge: "border-amber-400/40 bg-amber-500/15 text-amber-300",
    bar: "from-amber-400 to-yellow-300",
    iconBg: "bg-amber-500/15 border-amber-400/35",
    iconText: "text-amber-300",
    chip: "border-amber-400/30 bg-amber-500/10 text-amber-200",
    blob: "rgba(251,191,36,0.35)",
  },
  rose: {
    border: "border-rose-400/35 hover:border-rose-300/55",
    glow: "shadow-[0_0_24px_-8px_rgba(251,113,133,0.35)]",
    glowHover: "hover:shadow-[0_0_36px_-6px_rgba(251,113,133,0.55)]",
    badge: "border-rose-400/40 bg-rose-500/15 text-rose-300",
    bar: "from-rose-500 to-red-400",
    iconBg: "bg-rose-500/15 border-rose-400/35",
    iconText: "text-rose-300",
    chip: "border-rose-400/30 bg-rose-500/10 text-rose-200",
    blob: "rgba(251,113,133,0.35)",
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

type Metric = {
  label: string;
  value: number;
  status: string;
  /** Higher raw value is worse (saturation, risk, overlap). */
  inverted: boolean;
};

function inferMetric(title: string, body: string): Metric {
  const lower = `${title} ${body}`.toLowerCase();
  const pct = extractPercent(body);

  if (lower.includes("timing") || lower.includes("enter") || lower.includes("wait") || lower.includes("avoid")) {
    if (/\benter\b/.test(lower) && !/\bavoid\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 82, status: "ENTER", inverted: false };
    }
    if (/\bwait\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 48, status: "WAIT", inverted: false };
    }
    if (/\bavoid\b/.test(lower)) {
      return { label: "Signal", value: pct ?? 22, status: "AVOID", inverted: false };
    }
    return { label: "Signal", value: pct ?? 65, status: "WATCH", inverted: false };
  }

  if (lower.includes("saturation") || lower.includes("crowding")) {
    if (lower.includes("high") || lower.includes("crowded")) {
      return { label: "Saturation", value: pct ?? 78, status: "HIGH", inverted: true };
    }
    if (lower.includes("low") || lower.includes("open")) {
      return { label: "Saturation", value: pct ?? 28, status: "LOW", inverted: true };
    }
    return { label: "Saturation", value: pct ?? 54, status: "MODERATE", inverted: true };
  }

  if (lower.includes("risk")) {
    if (lower.includes("high") || lower.includes("critical")) {
      return { label: "Risk level", value: pct ?? 74, status: "ELEVATED", inverted: true };
    }
    if (lower.includes("low")) {
      return { label: "Risk level", value: pct ?? 30, status: "CONTAINED", inverted: true };
    }
    return { label: "Risk level", value: pct ?? 58, status: "WATCH", inverted: true };
  }

  if (lower.includes("competitor") || lower.includes("lookalike")) {
    return { label: "Overlap", value: pct ?? 61, status: "ACTIVE", inverted: true };
  }

  if (lower.includes("narrative") || lower.includes("meta")) {
    if (lower.includes("strong") || lower.includes("well") || lower.includes("fits")) {
      return { label: "Meta fit", value: pct ?? 76, status: "STRONG", inverted: false };
    }
    return { label: "Meta fit", value: pct ?? 58, status: "MIXED", inverted: false };
  }

  if (lower.includes("positioning") || lower.includes("differentiate")) {
    return { label: "Edge", value: pct ?? 71, status: "READY", inverted: false };
  }

  const fallback = 40 + (body.length % 45);
  return { label: "Signal strength", value: pct ?? fallback, status: "LIVE", inverted: false };
}

/** Green = best, blue = good, yellow = caution, red = worst. */
function accentFromRating(metric: Metric): Accent {
  const quality = metric.inverted ? 100 - metric.value : metric.value;

  if (quality >= 70) return "emerald";
  if (quality >= 50) return "cyan";
  if (quality >= 30) return "amber";
  return "rose";
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
  icon = "pulse",
  className = "",
}: StrategyCardProps) {
  const metric = inferMetric(title, body);
  const accent = accentFromRating(metric);
  const theme = ACCENT[accent];
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
        style={{ background: theme.blob }}
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
          <span>Rating</span>
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
