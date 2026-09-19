import type { LandingPageContent } from "./landing-page";

export type { LandingColorPalette, LandingPageContent } from "./landing-page";

/** Full intelligence report (generated once per idea); UI reveals by unlock tier. */
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
  landingPage: LandingPageContent;
  launchExecutionLayer: string;
  automation: {
    xPosting: string;
    telegramBot: string;
  };
};

export type PaidPlan = "pro";

export type { PurchasedAddons } from "./addons";
