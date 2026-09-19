"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { PlanId } from "@/lib/plans";
import { Background } from "@/components/Background";
import { HeaderBrand } from "@/components/HeaderBrand";
import { IntelligenceDisclaimer } from "@/components/IntelligenceDisclaimer";
import { KitBasics } from "@/components/KitBasics";
import { LandingPreview } from "@/components/LandingPreview";
import { LaunchExecutionPreview } from "@/components/LaunchExecutionPreview";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PaymentUnlock } from "@/components/PaymentUnlock";
import { PricingCards } from "@/components/PricingCards";
import { ResultTierBadge } from "@/components/ResultTierBadge";
import { EMPTY_ADDONS, type PurchasedAddons } from "@/lib/addons";
import { ScoreInsights } from "@/components/ScoreInsights";
import { ScoreRing } from "@/components/ScoreRing";
import { StrategyCard } from "@/components/StrategyCard";
import { fetchLaunchKit } from "@/lib/client-generate";
import type { LaunchKitFull, PaidPlan } from "@/lib/types";

const PRO_INTELLIGENCE_SECTIONS = [
  {
    title: "Pump.fun narrative analysis",
    subtitle: "Meta fit & attention velocity",
    key: "pumpFunNarrativeAnalysis" as const,
    accent: "violet" as const,
    icon: "pulse" as const,
  },
  {
    title: "Competitor memecoin analysis",
    subtitle: "Recent micro-cap lookalikes",
    key: "competitorMemecoinAnalysis" as const,
    accent: "cyan" as const,
    icon: "compete" as const,
  },
  {
    title: "Market saturation",
    subtitle: "Narrative bucket crowding",
    key: "marketSaturation" as const,
    accent: "amber" as const,
    icon: "gauge" as const,
  },
  {
    title: "Similar recent narratives",
    subtitle: "Parallel CT attention plays",
    key: "similarRecentNarratives" as const,
    accent: "sky" as const,
    icon: "signal" as const,
  },
  {
    title: "Launch timing signal",
    subtitle: "Enter / wait / avoid",
    key: "launchTimingSignal" as const,
    accent: "emerald" as const,
    icon: "timing" as const,
  },
  {
    title: "Risk notes",
    subtitle: "Launch-specific risks",
    key: "riskNotes" as const,
    accent: "rose" as const,
    icon: "risk" as const,
  },
  {
    title: "Recommended positioning",
    subtitle: "How to differentiate",
    key: "recommendedPositioning" as const,
    accent: "violet" as const,
    icon: "target" as const,
  },
];

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullResult, setFullResult] = useState<LaunchKitFull | null>(null);
  const [unlocked, setUnlocked] = useState<null | PaidPlan>(null);
  const [purchasedAddons, setPurchasedAddons] = useState<PurchasedAddons>(EMPTY_ADDONS);
  const [selectedPaid, setSelectedPaid] = useState<PaidPlan | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateNotice, setGenerateNotice] = useState<string | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const generateBusyRef = useRef(false);
  const generateRequestIdRef = useRef(0);
  const generateAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      generateAbortRef.current?.abort();
    };
  }, []);

  const handleGenerate = useCallback(
    async (mode: "check" | "launch") => {
      const trimmed = idea.trim();
      if (!trimmed || generateBusyRef.current) return;

      generateBusyRef.current = true;
      generateAbortRef.current?.abort();
      const controller = new AbortController();
      generateAbortRef.current = controller;
      const requestId = ++generateRequestIdRef.current;

      const selectedPlan: PlanId = mode === "launch" ? "pro" : "free";
      const automationAddons: PurchasedAddons = { ...purchasedAddons };

      setLoading(true);
      setFullResult(null);
      setUnlocked(null);
      setPurchasedAddons(EMPTY_ADDONS);
      setSelectedPaid(mode === "launch" ? "pro" : null);
      setGenerateError(null);
      setGenerateNotice(null);

      try {
        const data = await fetchLaunchKit(
          {
            idea: trimmed,
            selectedPlan,
            automationAddons,
          },
          controller.signal,
        );

        if (requestId !== generateRequestIdRef.current) return;

        setFullResult(data.kit);
        setGenerateNotice(data.message ?? null);
        window.setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        if (mode === "launch") {
          window.setTimeout(() => {
            document.getElementById("payment-unlock")?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 320);
        }
      } catch (err) {
        if (requestId !== generateRequestIdRef.current) return;
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("Generate failed", err);
        setGenerateError(
          err instanceof Error ? err.message : "Could not generate your report. Please try again.",
        );
      } finally {
        if (requestId === generateRequestIdRef.current) {
          generateBusyRef.current = false;
          setLoading(false);
        }
      }
    },
    [idea, purchasedAddons],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleGenerate("check");
  };

  const showLaunchContent = unlocked === "pro";

  return (
    <>
      <Background paused={loading} />
      {loading ? <LoadingOverlay message="Building your launch kit…" /> : null}

      <div
        className={[
          "relative z-10 mx-auto flex w-full max-w-5xl flex-col px-5 pb-24 sm:px-8",
          fullResult
            ? "min-h-screen pt-6 sm:pt-8"
            : "min-h-[calc(100dvh-3.5rem)] justify-center pt-4 sm:min-h-[calc(100dvh-4rem)]",
        ].join(" ")}
      >
        <header className="flex w-full flex-col items-center text-center">
          <HeaderBrand />

          <h2 className="animate-fade-up stagger-1 mt-5 max-w-2xl text-pretty text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Make memecoin with one prompt
          </h2>

          <form onSubmit={handleSubmit} className="animate-fade-up stagger-2 mt-10 w-full max-w-2xl">
            <label htmlFor="idea" className="sr-only">
              Memecoin idea
            </label>
            <div className="glass-card rounded-2xl p-2">
              <input
                id="idea"
                name="idea"
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your meme, character, or narrative..."
                autoComplete="off"
                disabled={loading}
                className="w-full rounded-xl border-0 bg-transparent px-5 py-5 text-base text-white outline-none placeholder:text-zinc-600 disabled:opacity-50 sm:text-lg"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="rounded-2xl border border-white/15 bg-white/5 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-white/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35"
              >
                {loading ? "Checking…" : "Check"}
              </button>
              <button
                type="button"
                disabled={loading || !idea.trim()}
                onClick={() => void handleGenerate("launch")}
                className="btn-glow rounded-2xl bg-white py-4 text-sm font-bold tracking-wide text-black transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
              >
                {loading ? "Preparing…" : "Launch"}
              </button>
            </div>
          </form>

          {generateError ? (
            <p className="animate-fade-in mt-6 max-w-md text-sm text-red-400/90" role="alert">
              {generateError}
            </p>
          ) : null}

          {!fullResult && !generateError ? (
            <p className="animate-fade-in stagger-3 mt-8 max-w-md text-xs leading-relaxed text-zinc-600">
              <span className="text-zinc-400">Check</span> — free name, ticker, short description &amp;
              Interest Score · <span className="text-zinc-400">Launch</span> — full launch kit for{" "}
              0.2 SOL
            </p>
          ) : null}
        </header>

        {generateNotice && fullResult ? (
          <p className="mx-auto mb-4 max-w-lg text-center text-sm text-amber-300/90" role="status">
            {generateNotice}
          </p>
        ) : null}

        {fullResult ? (
          <section ref={resultsRef} className="mt-16 space-y-6 sm:mt-20" aria-live="polite">
            <IntelligenceDisclaimer className="animate-fade-in" />

            <div className="animate-fade-up flex flex-col gap-3 border-b border-white/5 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400/80">
                  {unlocked ? "Full launch kit" : "Check preview"}
                </p>
                <ResultTierBadge unlocked={unlocked} />
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {fullResult.tokenName}{" "}
                <span className="font-mono text-lg font-medium text-zinc-500">
                  ${fullResult.ticker}
                </span>
              </h2>
              <p className="max-w-xl text-sm text-zinc-500">&ldquo;{fullResult.idea}&rdquo;</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ScoreRing
                label="Interest Score"
                score={fullResult.interestScore}
                accent="violet"
                animate
                className="animate-fade-up stagger-1"
              />
              <ScoreRing
                label="Launch Readiness Score"
                score={fullResult.launchReadinessScore}
                accent="cyan"
                animate={showLaunchContent}
                locked={!showLaunchContent}
                className="animate-fade-up stagger-2"
              />
            </div>

            <ScoreInsights
              interestReasoning={fullResult.interestReasoning}
              launchReadinessReasoning={fullResult.launchReadinessReasoning}
              variant={showLaunchContent ? "full" : "preview"}
              className="animate-fade-up"
            />

            <KitBasics
              result={fullResult}
              variant={showLaunchContent ? "full" : "preview"}
              className="animate-fade-up stagger-2"
            />

            {showLaunchContent ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {PRO_INTELLIGENCE_SECTIONS.map((section) => (
                  <StrategyCard
                    key={section.key}
                    title={section.title}
                    subtitle={section.subtitle}
                    body={fullResult[section.key]}
                    accent={section.accent}
                    icon={section.icon}
                    className="animate-fade-up"
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card animate-fade-up rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500">
                <p className="text-zinc-400">
                  Full positioning, landing, and Customer journey map unlock with{" "}
                  <span className="text-violet-300">Launch</span>.
                </p>
              </div>
            )}

            {showLaunchContent ? (
              <>
                <LandingPreview
                  landing={fullResult.landingPage}
                  className="animate-fade-up stagger-5"
                />
                <LaunchExecutionPreview
                  body={fullResult.launchExecutionLayer}
                  className="animate-fade-up"
                />
              </>
            ) : null}

            <div className="space-y-4 pt-4">
              <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Pricing
              </h3>
              <PricingCards
                unlocked={unlocked}
                selected={selectedPaid}
                onSelectPaid={(p) => {
                  setSelectedPaid(p);
                  setTimeout(() => {
                    document.getElementById("payment-unlock")?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    });
                  }, 50);
                }}
                disabled={loading}
              />
            </div>

            {selectedPaid && unlocked === null ? (
              <div id="payment-unlock" className="scroll-mt-8">
                <PaymentUnlock
                  targetPlan={selectedPaid}
                  unlocked={unlocked}
                  onUnlocked={(plan) => {
                    setUnlocked(plan);
                    setPurchasedAddons(EMPTY_ADDONS);
                    setSelectedPaid(null);
                  }}
                />
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </>
  );
}
