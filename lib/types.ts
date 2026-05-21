/** Full mock kit (generated once per idea); UI reveals by unlock tier. */
export type LaunchKitFull = {
  idea: string;
  tokenName: string;
  ticker: string;
  narrative: string;
  positioning: string;
  interestScore: number;
  launchReadinessScore: number;
  marketAnalysis: string;
  competitorAnalysis: string;
  xStrategy: string;
  growthStrategy: string;
  tweets: string[];
  landing: {
    headline: string;
    subheadline: string;
    cta: string;
    tagline: string;
  };
  telegramQa: { question: string; answer: string }[];
  launchContentPlan: string;
  automation: {
    xPosting: string;
    telegramBot: string;
  };
};

export type PaidPlan = "pro" | "extra";

export type { PurchasedAddons } from "./addons";
