import type { ReactNode } from "react";

type LandingFrameProps = {
  pathLabel: string;
  children: ReactNode;
  className?: string;
};

/** Browser-chrome shell around a landing template preview. */
export function LandingFrame({ pathLabel, children, className = "" }: LandingFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-violet-950/30 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-black/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2 truncate font-mono text-[11px] text-zinc-500">{pathLabel}</span>
      </div>
      <div className="max-h-[720px] overflow-y-auto">{children}</div>
    </div>
  );
}
