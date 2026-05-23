import { z } from "zod";

export const aiLaunchKitSchema = z.object({
  tokenName: z.string(),
  ticker: z.string(),
  narrative: z.string(),
  positioning: z.string(),
  interestScore: z.number().int().min(0).max(100),
  launchReadinessScore: z.number().int().min(0).max(100),
  interestScoreExplanation: z.string(),
  launchReadinessScoreExplanation: z.string(),
  marketAnalysis: z.string(),
  competitorAnalysis: z.string(),
  xStrategy: z.string(),
  growthStrategy: z.string(),
  twitterPost: z.string(),
  tweets: z.array(z.string()).min(2).max(6),
  telegramCommunityDescription: z.string(),
  telegramQa: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .min(3)
    .max(6),
  launchStrategySummary: z.string(),
  launchContentPlan: z.string(),
  landing: z.object({
    headline: z.string(),
    subheadline: z.string(),
    cta: z.string(),
    tagline: z.string(),
  }),
  automation: z.object({
    xPosting: z.string(),
    telegramBot: z.string(),
  }),
});

export type AiLaunchKitPayload = z.infer<typeof aiLaunchKitSchema>;
