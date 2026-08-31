import { z } from "zod";
import { landingPageSchema } from "@/lib/landing-page";

export const aiLaunchKitSchema = z.object({
  tokenName: z.string(),
  ticker: z.string(),
  narrativeSummary: z.string(),
  interestScore: z.number().int().min(0).max(100),
  interestReasoning: z.string(),
  launchReadinessScore: z.number().int().min(0).max(100),
  launchReadinessReasoning: z.string(),
  pumpFunNarrativeAnalysis: z.string(),
  competitorMemecoinAnalysis: z.string(),
  marketSaturation: z.string(),
  similarRecentNarratives: z.string(),
  launchTimingSignal: z.string(),
  riskNotes: z.string(),
  recommendedPositioning: z.string(),
  landingPage: landingPageSchema,
  launchExecutionLayer: z.string(),
  automation: z.object({
    xPosting: z.string(),
    telegramBot: z.string(),
  }),
});

export type AiLaunchKitPayload = z.infer<typeof aiLaunchKitSchema>;
