import Image from "next/image";

type LoadingOverlayProps = {
  message?: string;
};

export function LoadingOverlay({
  message = "Generating your launch kit…",
}: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-t-violet-400/50 border-r-transparent border-b-fuchsia-400/30 border-l-transparent" />
          <Image
            src="/logo.png"
            alt=""
            width={88}
            height={88}
            className="relative h-20 w-auto animate-pulse-ring object-contain"
            aria-hidden
          />
        </div>
        <p className="animate-shimmer max-w-xs bg-gradient-to-r from-zinc-600 via-white to-zinc-600 bg-clip-text text-center text-sm font-medium text-transparent">
          {message}
        </p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-violet-400/80"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
