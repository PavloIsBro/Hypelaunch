import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type { PurchasedAddons } from "@/lib/addons";
import { generateMockLaunchKit } from "@/lib/mock";
import { aiLaunchKitSchema, type AiLaunchKitPayload } from "@/lib/launch-kit-schema";
import type { LaunchKitFull } from "@/lib/types";
import type { PlanId } from "@/lib/plans";

function normalizeTicker(raw: string): string {
  const cleaned = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (!cleaned) return "HYP";
  return cleaned.slice(0, 5);
}

export function mapAiPayloadToLaunchKit(idea: string, data: AiLaunchKitPayload): LaunchKitFull {
  const ticker = normalizeTicker(data.ticker);
  const tweets = [
    data.twitterPost.trim(),
    ...data.tweets.filter((t) => t.trim() && t.trim() !== data.twitterPost.trim()),
  ].slice(0, 5);

  const telegramQa = [
    {
      question: "What is this project?",
      answer: data.telegramCommunityDescription,
    },
    ...data.telegramQa.filter((q) => q.question.toLowerCase() !== "what is this project?"),
  ].slice(0, 5);

  return {
    idea: idea.trim(),
    tokenName: data.tokenName.trim(),
    ticker,
    narrative: data.narrative.trim(),
    positioning: data.positioning.trim(),
    interestScore: data.interestScore,
    launchReadinessScore: data.launchReadinessScore,
    marketAnalysis: `${data.interestScoreExplanation.trim()}\n\n${data.marketAnalysis.trim()}`.trim(),
    competitorAnalysis: data.competitorAnalysis.trim(),
    xStrategy: data.xStrategy.trim(),
    growthStrategy: `${data.launchReadinessScoreExplanation.trim()}\n\n${data.growthStrategy.trim()}`.trim(),
    tweets,
    landing: {
      headline: data.landing.headline.trim(),
      subheadline: data.landing.subheadline.trim(),
      cta: data.landing.cta.trim(),
      tagline: data.landing.tagline.trim() || `$${ticker} · powered by hypelaunch.space`,
    },
    telegramQa,
    launchContentPlan: `${data.launchStrategySummary.trim()}\n\n${data.launchContentPlan.trim()}`.trim(),
    automation: {
      xPosting: data.automation.xPosting.trim(),
      telegramBot: data.automation.telegramBot.trim(),
    },
  };
}

function buildSystemPrompt(plan: PlanId, addons: PurchasedAddons): string {
  const addonNotes: string[] = [];
  if (addons.x) addonNotes.push("Emphasize X/Twitter automation scheduling in automation.xPosting.");
  if (addons.telegram) {
    addonNotes.push("Emphasize Telegram bot flows and FAQ automation in automation.telegramBot.");
  }

  return `You are Hypelaunch — a memecoin launch kit generator for Crypto Twitter.

Write like a CT native: punchy, ironic, meme-literate, degen-friendly. No corporate speak, no "revolutionizing", no LinkedIn tone.

Rules:
- ticker: 3-5 uppercase letters only
- narrative: ONE line max (under 160 chars), hook-first
- twitterPost: single CT-style post, can use $TICKER, emojis sparingly
- tweets: 3-5 additional posts in the same voice (don't repeat twitterPost verbatim)
- telegramCommunityDescription: short TG pin / community intro
- Scores 0-100 with realistic spread; explanations should justify the numbers based on the idea
- launchReadinessScore is readiness to launch (clarity, content, packaging) — NOT price prediction
- landing: meme coin landing page copy, not SaaS
- telegramQa: practical community FAQ
- plan context: ${plan} (still output full kit JSON)
${addonNotes.length ? `- ${addonNotes.join("\n- ")}` : ""}

Return JSON matching the schema exactly.`;
}

export async function generateLaunchKitWithOpenAI(
  idea: string,
  plan: PlanId = "free",
  addons: PurchasedAddons = { x: false, telegram: false },
): Promise<{ kit: LaunchKitFull; source: "openai" | "fallback" }> {
  const trimmed = idea.trim();
  if (!trimmed) {
    throw new Error("Memecoin idea is required.");
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[generate] OPENAI_API_KEY missing — using fallback mock.");
    return { kit: generateMockLaunchKit(trimmed), source: "fallback" };
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
      temperature: 0.85,
      messages: [
        { role: "system", content: buildSystemPrompt(plan, addons) },
        {
          role: "user",
          content: `Memecoin idea: "${trimmed}"\n\nGenerate the full launch kit.`,
        },
      ],
      response_format: zodResponseFormat(aiLaunchKitSchema, "launch_kit"),
    });

    const parsed = completion.choices[0]?.message?.parsed;
    if (!parsed) {
      throw new Error("Empty model response");
    }

    return {
      kit: mapAiPayloadToLaunchKit(trimmed, parsed),
      source: "openai",
    };
  } catch (error) {
    console.error("[generate] OpenAI error:", error);
    return { kit: generateMockLaunchKit(trimmed), source: "fallback" };
  }
}
