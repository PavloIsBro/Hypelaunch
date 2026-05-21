"use client";

import { FormEvent, useRef, useState } from "react";
import { AutomationPreview } from "@/components/AutomationPreview";
import { Background } from "@/components/Background";
import { HeaderBrand } from "@/components/HeaderBrand";
import { KitBasics } from "@/components/KitBasics";
import { LandingPreview } from "@/components/LandingPreview";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PaymentUnlock } from "@/components/PaymentUnlock";
import { PricingCards } from "@/components/PricingCards";
import { PurchasedAddonsBadges } from "@/components/PurchasedAddonsBadges";
import { ResultTierBadge } from "@/components/ResultTierBadge";
import { EMPTY_ADDONS, type PurchasedAddons } from "@/lib/addons";
import { ScoreRing } from "@/components/ScoreRing";
import { StrategyCard } from "@/components/StrategyCard";
import { TelegramPreview } from "@/components/TelegramPreview";
import { TweetList } from "@/components/TweetList";
import { generateMockLaunchKit, MOCK_LOADING_MS } from "@/lib/mock";
import type { LaunchKitFull, PaidPlan } from "@/lib/types";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullResult, setFullResult] = useState<LaunchKitFull | null>(null);
  const [unlocked, setUnlocked] = useState<null | PaidPlan>(null);
  const [purchasedAddons, setPurchasedAddons] = useState<PurchasedAddons>(EMPTY_ADDONS);
  const [selectedPaid, setSelectedPaid] = useState<PaidPlan | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = idea.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setFullResult(null);
    setUnlocked(null);
    setPurchasedAddons(EMPTY_ADDONS);
    setSelectedPaid(null);

    window.setTimeout(() => {
      setFullResult(generateMockLaunchKit(trimmed));
      setLoading(false);
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }, MOCK_LOADING_MS);
  };

  const showProContent = unlocked === "pro" || unlocked === "extra";
  const showExtraContent = unlocked === "extra";

  return (
    <>
      <Background />
      {loading ? <LoadingOverlay message="Generating preview…" /> : null}

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

          <p className="animate-fade-up stagger-1 mt-4 max-w-lg text-pretty text-base text-zinc-400 sm:text-lg">
            Turn one idea into a memecoin launch kit
          </p>

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
                placeholder="Describe your memecoin idea..."
                autoComplete="off"
                disabled={loading}
                className="w-full rounded-xl border-0 bg-transparent px-5 py-5 text-base text-white outline-none placeholder:text-zinc-600 disabled:opacity-50 sm:text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !idea.trim()}
              className="btn-glow mt-4 w-full rounded-2xl bg-white py-4 text-sm font-bold tracking-wide text-black transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
            >
              {loading ? "Generating…" : "Generate free preview"}
            </button>
          </form>

          {!fullResult && (
            <p className="animate-fade-in stagger-3 mt-8 text-xs text-zinc-600">
              Free preview · then unlock Pro or Extra with Solana (devnet)
            </p>
          )}
        </header>

        {fullResult ? (
          <section ref={resultsRef} className="mt-16 space-y-6 sm:mt-20" aria-live="polite">
            <div className="animate-fade-up flex flex-col gap-3 border-b border-white/5 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400/80">
                  {unlocked ? "Full launch kit" : "Limited preview"}
                </p>
                <ResultTierBadge unlocked={unlocked} />
                <PurchasedAddonsBadges addons={purchasedAddons} />
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
                animate
                className="animate-fade-up stagger-2"
              />
            </div>

            <KitBasics
              result={fullResult}
              variant={showProContent ? "full" : "preview"}
              className="animate-fade-up stagger-2"
            />

            {showProContent ? (
              <>
                <div className="grid gap-4 lg:grid-cols-2">
                  <StrategyCard
                    title="Market analysis"
                    subtitle="Narrative & attention context"
                    body={fullResult.marketAnalysis}
                    className="animate-fade-up stagger-3"
                  />
                  <StrategyCard
                    title="Competitor memecoin analysis"
                    subtitle="How rivals position vs you"
                    body={fullResult.competitorAnalysis}
                    className="animate-fade-up stagger-3"
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <StrategyCard
                    title="X content strategy"
                    subtitle="Posting cadence & hooks"
                    body={fullResult.xStrategy}
                    className="animate-fade-up stagger-4"
                  />
                  <StrategyCard
                    title="Growth strategy"
                    subtitle="Distribution & community"
                    body={fullResult.growthStrategy}
                    className="animate-fade-up stagger-4"
                  />
                </div>
                <TweetList
                  tweets={fullResult.tweets}
                  ticker={fullResult.ticker}
                  className="animate-fade-up stagger-4"
                />
              </>
            ) : (
              <div className="glass-card animate-fade-up rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500">
                <p className="text-zinc-400">
                  Market analysis, competitor scan, X strategy, tweets, and full narrative unlock
                  with <span className="text-violet-300">Pro</span> after payment.
                </p>
              </div>
            )}

            {showExtraContent ? (
              <>
                <LandingPreview
                  landing={fullResult.landing}
                  tokenName={fullResult.tokenName}
                  className="animate-fade-up stagger-5"
                />
                <StrategyCard
                  title="Launch content plan"
                  subtitle="Timeline beats around launch"
                  body={fullResult.launchContentPlan}
                  className="animate-fade-up"
                />
                <TelegramPreview
                  items={fullResult.telegramQa}
                  ticker={fullResult.ticker}
                  className="animate-fade-up"
                />
              </>
            ) : unlocked === "pro" ? (
              <div className="glass-card animate-fade-up rounded-2xl border border-dashed border-violet-500/20 p-8 text-center text-sm text-zinc-500">
                <p>
                  <span className="text-violet-300">Extra</span> adds landing, Telegram Q&A, and
                  launch content plan — unlock below.
                </p>
              </div>
            ) : null}

            {showProContent && (purchasedAddons.x || purchasedAddons.telegram) ? (
              <AutomationPreview
                xPosting={fullResult.automation.xPosting}
                telegramBot={fullResult.automation.telegramBot}
                enabled={purchasedAddons}
                className="animate-fade-up"
              />
            ) : showProContent ? (
              <div className="glass-card animate-fade-up rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">
                <p>
                  Add <span className="text-violet-300">X</span> or{" "}
                  <span className="text-cyan-300">Telegram</span> automation at checkout (+0.1 SOL
                  each).
                </p>
              </div>
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

            {selectedPaid && (unlocked === null || (unlocked === "pro" && selectedPaid === "extra")) ? (
              <div id="payment-unlock" className="scroll-mt-8">
                <PaymentUnlock
                  targetPlan={selectedPaid}
                  unlocked={unlocked}
                  onUnlocked={(plan, addons) => {
                    setUnlocked(plan);
                    setPurchasedAddons((prev) => ({
                      x: prev.x || addons.x,
                      telegram: prev.telegram || addons.telegram,
                    }));
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
