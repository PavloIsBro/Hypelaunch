type ResultTierBadgeProps = {
  unlocked: null | "pro";
};

export function ResultTierBadge({ unlocked }: ResultTierBadgeProps) {
  if (!unlocked) {
    return (
      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Check preview
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
      Launch unlocked
    </span>
  );
}
