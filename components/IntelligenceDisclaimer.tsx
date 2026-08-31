export function IntelligenceDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-center text-xs leading-relaxed text-amber-200/90 sm:text-sm ${className}`}
      role="note"
    >
      AI-estimated preview — live X/Pump.fun data coming soon
    </p>
  );
}
