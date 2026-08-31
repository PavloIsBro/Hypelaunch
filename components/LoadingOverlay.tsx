type LoadingOverlayProps = {
  message?: string;
};

export function LoadingOverlay({
  message = "Analyzing market signals…",
}: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-violet-400"
          aria-hidden
        />
        <p className="max-w-xs text-center text-sm font-medium text-zinc-300">{message}</p>
      </div>
    </div>
  );
}
