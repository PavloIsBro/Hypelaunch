"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="group flex items-center gap-2.5 rounded-xl border border-transparent px-1 py-1 transition hover:border-white/10 hover:bg-white/[0.04]"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black sm:h-10 sm:w-10">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="40px"
                className="object-cover object-center"
                priority
              />
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition group-hover:text-zinc-200 sm:inline">
              hypelaunch.space
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={[
                "ml-1 h-4 w-4 shrink-0 text-sky-400 transition sm:h-5 sm:w-5",
                menuOpen ? "rotate-180 text-sky-300" : "",
              ].join(" ")}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 py-1 shadow-xl shadow-black/60 backdrop-blur-md"
            >
              <button
                type="button"
                role="menuitem"
                className={[
                  "flex w-full px-4 py-2.5 text-left text-sm transition hover:bg-white/[0.06] hover:text-white",
                  pathname === "/" ? "text-sky-300" : "text-zinc-300",
                ].join(" ")}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/");
                }}
              >
                App
              </button>
              <button
                type="button"
                role="menuitem"
                className={[
                  "flex w-full px-4 py-2.5 text-left text-sm transition hover:bg-white/[0.06] hover:text-white",
                  pathname === "/docs" ? "text-sky-300" : "text-zinc-300",
                ].join(" ")}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/docs");
                }}
              >
                Docs
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <WalletMultiButton className="wallet-btn !h-9 !rounded-xl !border !border-white/15 !bg-white/5 !px-3 !py-0 !text-xs !font-semibold !text-white hover:!bg-white/10 sm:!text-sm" />
        </div>
      </div>
    </header>
  );
}
