"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LANDING_TEMPLATES } from "@/lib/templates";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setTemplatesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !templatesOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuOpen && menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (templatesOpen && templatesRef.current && !templatesRef.current.contains(target)) {
        setTemplatesOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTemplatesOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen, templatesOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((o) => !o);
              setTemplatesOpen(false);
            }}
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
          <div className="relative" ref={templatesRef}>
            <button
              type="button"
              onClick={() => {
                setTemplatesOpen((o) => !o);
                setMenuOpen(false);
              }}
              className={[
                "inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition sm:text-sm",
                templatesOpen || pathname.startsWith("/templates")
                  ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                  : "border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10",
              ].join(" ")}
              aria-expanded={templatesOpen}
              aria-haspopup="menu"
            >
              Templates
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={[
                  "h-3.5 w-3.5 transition",
                  templatesOpen ? "rotate-180" : "",
                ].join(" ")}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {templatesOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2.5rem,280px)] overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 py-1 shadow-xl shadow-black/60 backdrop-blur-md"
              >
                <p className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  Temp preview
                </p>
                {LANDING_TEMPLATES.map((template) => {
                  const href = `/templates/${template.id}`;
                  const active = pathname === href;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      role="menuitem"
                      className={[
                        "flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition hover:bg-white/[0.06]",
                        active ? "bg-white/[0.04]" : "",
                      ].join(" ")}
                      onClick={() => {
                        setTemplatesOpen(false);
                        router.push(href);
                      }}
                    >
                      <span
                        className={[
                          "text-sm font-medium",
                          active ? "text-lime-300" : "text-zinc-100",
                        ].join(" ")}
                      >
                        {template.name}
                      </span>
                      <span className="text-xs leading-snug text-zinc-500">
                        {template.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <WalletMultiButton className="wallet-btn !h-9 !rounded-xl !border !border-white/15 !bg-white/5 !px-3 !py-0 !text-xs !font-semibold !text-white hover:!bg-white/10 sm:!text-sm" />
        </div>
      </div>
    </header>
  );
}
