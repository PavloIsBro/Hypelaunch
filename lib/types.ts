import type { LandingPageContent } from "./landing-page";
import type { TwitterSignals } from "./apify-twitter";

export type { LandingColorPalette, LandingPageContent } from "./landing-page";
export type { TwitterSignals, TwitterTweetSignal } from "./apify-twitter";

/** Full intelligence report (generated once per idea); UI reveals by unlock tier. */
export type TrendRecommendation = {
  prompt: string;
  interestScore: number;
  launchReadinessScore: number;
};

export type LaunchKitFull = {
  idea: string;
  tokenName: string;
  ticker: string;
  narrativeSummary: string;
  interestScore: number;
  interestReasoning: string;
  launchReadinessScore: number;
  launchReadinessReasoning: string;
  pumpFunNarrativeAnalysis: string;
  competitorMemecoinAnalysis: string;
  marketSaturation: string;
  similarRecentNarratives: string;
  launchTimingSignal: string;
  riskNotes: string;
  recommendedPositioning: string;
  /** Ready-to-run alternate prompts angled to current X trends — no explanations. */
  trendRecommendations: TrendRecommendation[];
  /** Live X/Twitter scrape snapshot used for scoring (when Apify is configured). */
  twitterSignals?: TwitterSignals;
  landingPage: LandingPageContent;
  launchExecutionLayer: string;
  automation: {
    xPosting: string;
    telegramBot: string;
  };
};

export type PaidPlan = "pro";

export type { PurchasedAddons } from "./addons";
