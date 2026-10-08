"use client";

import { useEffect, useRef, useState } from "react";
import {
  IBM_Plex_Mono,
  Press_Start_2P,
  Syne,
  Bebas_Neue,
  Cinzel,
} from "next/font/google";
import { LandingFrame } from "@/components/LandingFrame";
import { TemplatePicker } from "@/components/TemplatePicker";
import { fetchLandingContent } from "@/lib/client-generate-landing";
import { getLandingTemplateComponent } from "@/lib/template-components";
import {
  getLandingFallback,
  type LandingTemplateContent,
  type LandingTemplateId,
} from "@/lib/templates";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-neon-sans",
  weight: ["400", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-signal-mono",
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-arcade-pixel",
  weight: "400",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cult-display",
  weight: ["400", "600", "700", "900"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-street-display",
  weight: "400",
});

type LandingStatus = "idle" | "loading" | "ready" | "fallback";

type LandingExtraPreviewProps = {
  idea: string;
  tokenName: string;
  ticker: string;
  className?: string;
};

export function LandingExtraPreview({
  idea,
  tokenName,
  ticker,
  className = "",
}: LandingExtraPreviewProps) {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<LandingTemplateId>("neon-curve");
  const [landingContent, setLandingContent] = useState<LandingTemplateContent>(() =>
    getLandingFallback("neon-curve", tokenName, ticker),
  );
  const [landingStatus, setLandingStatus] = useState<LandingStatus>("loading");
  const [landingNotice, setLandingNotice] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // Generate once per idea/identity — template switch reuses the same copy
  useEffect(() => {
    const fallback = getLandingFallback("neon-curve", tokenName, ticker);
    setLandingContent(fallback);
    setLandingStatus("loading");
    setLandingNotice(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;

    void (async () => {
      try {
        const data = await fetchLandingContent(
          { idea, tokenName, ticker },
          controller.signal,
        );

        if (requestId !== requestIdRef.current) return;

        setLandingContent(data.content);
        setLandingStatus(data.source === "fallback" ? "fallback" : "ready");
        setLandingNotice(data.message ?? null);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("Landing generate failed", err);
        setLandingContent(fallback);
        setLandingStatus("fallback");
        setLandingNotice(
          err instanceof Error
            ? err.message
            : "Could not generate landing copy. Showing the default preview.",
        );
      }
    })();
  }, [idea, ticker, tokenName]);

  const Template = getLandingTemplateComponent(selectedTemplateId);
  const slug = tokenName.toLowerCase().replace(/\s+/g, "-");

  const fontVars = [
    syne.variable,
    ibmPlexMono.variable,
    pressStart.variable,
    cinzel.variable,
    bebas.variable,
  ].join(" ");

  return (
    <section className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Landing page preview</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            {landingStatus === "loading"
              ? "Default template ready · generating AI copy…"
              : landingStatus === "fallback"
                ? "Default template · AI copy unavailable"
                : "AI-generated copy · switch templates without regenerating"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {landingStatus === "loading" ? (
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-200">
              Generating
            </span>
          ) : null}
          <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-300">
            Extra
          </span>
        </div>
      </div>

      <TemplatePicker
        selectedId={selectedTemplateId}
        onSelect={setSelectedTemplateId}
      />

      {landingNotice ? (
        <p className="mt-4 text-sm text-amber-300/90" role="status">
          {landingNotice}
        </p>
      ) : null}

      <div className={`mt-5 ${fontVars}`}>
        {Template ? (
          <LandingFrame pathLabel={`hypelaunch.space/${slug}`}>
            <div className="[&_.neon-curve]:min-h-0 [&_.signal-stack]:min-h-0 [&_.arcade-dump]:min-h-0 [&_.cult-chapel]:min-h-0 [&_.street-sticker]:min-h-0">
              <Template content={landingContent} />
            </div>
          </LandingFrame>
        ) : (
          <p className="text-sm text-red-400">Template component not found.</p>
        )}
      </div>
    </section>
  );
}
