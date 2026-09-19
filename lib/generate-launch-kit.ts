import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import type { PurchasedAddons } from "@/lib/addons";
import { generateMockLaunchKit } from "@/lib/mock";
import { aiLaunchKitSchema, type AiLaunchKitPayload } from "@/lib/launch-kit-schema";
import { mapLandingPageFields } from "@/lib/landing-page";
import type { LaunchKitFull } from "@/lib/types";
import type { PlanId } from "@/lib/plans";

function normalizeTicker(raw: string): string {
  const cleaned = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (!cleaned) return "HYP";
  return cleaned.slice(0, 5);
}

export function mapAiPayloadToLaunchKit(idea: string, data: AiLaunchKitPayload): LaunchKitFull {
  const ticker = normalizeTicker(data.ticker);

  return {
    idea: idea.trim(),
    tokenName: data.tokenName.trim(),
    ticker,
    narrativeSummary: data.narrativeSummary.trim(),
    interestScore: data.interestScore,
    interestReasoning: data.interestReasoning.trim(),
    launchReadinessScore: data.launchReadinessScore,
    launchReadinessReasoning: data.launchReadinessReasoning.trim(),
    pumpFunNarrativeAnalysis: data.pumpFunNarrativeAnalysis.trim(),
    competitorMemecoinAnalysis: data.competitorMemecoinAnalysis.trim(),
    marketSaturation: data.marketSaturation.trim(),
    similarRecentNarratives: data.similarRecentNarratives.trim(),
    launchTimingSignal: data.launchTimingSignal.trim(),
    riskNotes: data.riskNotes.trim(),
    recommendedPositioning: data.recommendedPositioning.trim(),
    trendRecommendations: (data.trendRecommendations ?? [])
      .slice(0, 4)
      .map((item) => ({
        prompt: item.prompt.trim(),
        interestScore: item.interestScore,
        launchReadinessScore: item.launchReadinessScore,
      }))
      .filter((item) => item.prompt.length > 0),
    landingPage: mapLandingPageFields(
      data.tokenName.trim(),
      ticker,
      data.landingPage,
    ),
    launchExecutionLayer: data.launchExecutionLayer.trim(),
    automation: {
      xPosting: data.automation.xPosting.trim(),
      telegramBot: data.automation.telegramBot.trim(),
    },
  };
}

function buildSystemPrompt(plan: PlanId, addons: PurchasedAddons): string {
  const addonNotes: string[] = [];
  if (addons.x) {
    addonNotes.push(
      "automation.xPosting: describe X/Twitter launch-window automation (timing, signal monitoring, posting cadence) — not sample tweets.",
    );
  }
  if (addons.telegram) {
    addonNotes.push(
      "automation.telegramBot: describe Telegram community ops automation during launch — not generic FAQ copy.",
    );
  }

  return `You are Hypelaunch — AI market intelligence for Pump.fun-style memecoin launches on Solana.

Your job is structured market analysis and launch readiness — NOT copywriting, NOT sample tweets, NOT Telegram Q&A scripts.

Voice: CT-native analyst. Sharp, data-framed, degen-literate. No corporate speak, no "revolutionizing", no LinkedIn tone.

Competitor rules:
- Compare only against recent Pump.fun / micro-cap / new meme launches with similar narratives.
- Reference similar CT attention patterns, bonding-curve velocity, narrative saturation.
- DO NOT list DOGE, SHIBA, or PEPE as direct competitors. You may mention them only as distant historical context if absolutely necessary.
- Invent plausible recent-style examples (e.g. "$FROG meta", "AI animal runner", "politics frog derivative") — these are AI-estimated placeholders.

Field rules:
- ticker: 3-5 uppercase letters only
- narrativeSummary: ONE line max (under 160 chars), hook-first
- interestScore / launchReadinessScore: 0-100 with realistic spread; reasoning must justify numbers from narrative fit, saturation, and packaging clarity
- launchReadinessScore = clarity + packaging + timing readiness — NOT price prediction
- pumpFunNarrativeAnalysis: how this idea fits current Pump.fun meta, attention velocity, narrative shelf-life
- competitorMemecoinAnalysis: 2-4 recent-style lookalike launches, how they positioned | saturated
- marketSaturation: how crowded this narrative bucket is right now on Pump.fun / CT
- similarRecentNarratives: recent parallel narratives that competed for the same attention
- launchTimingSignal: enter now / wait / avoid — with CT-style timing rationale
- riskNotes: concrete launch risks (saturation, confusion, copycats, weak hook)
- recommendedPositioning: how to differentiate in one tight positioning frame
- trendRecommendations: exactly 3 alternate READY PROMPTS that remix the user's idea against CURRENT X/Twitter hot narratives (war, politics, viral animals, celebs, sports, AI drama, etc.). Each item is ONLY: prompt (1 short ready-to-paste idea sentence), interestScore (0-100), launchReadinessScore (0-100). NO explanations, NO "because", NO trend names in a separate field — the prompt itself must already be the sharper angle. Example: user says "dog memecoin" → prompt like "Patron the demining hero dog who saves lives under fire" with higher projected scores than a generic dog. Scores must be comparable to the main idea and usually stronger when the trend angle is sharper.
- landingPage: structured JSON for a React landing template (NOT HTML). Fields: tagline, shortNarrative, audience, colorPalette (hex primary/secondary/accent/background — dark crypto-native), heroTitle, heroSubtitle, aboutSection, communitySection, ctaText, pumpFunButtonLabel (e.g. "Trade on Pump.fun"), xLinkLabel, telegramLinkLabel. Memecoin voice; no corporate tone.
- launchExecutionLayer: Launch-tier ops checklist (Pump.fun deploy window, liquidity timing, CT coordination beats) — no tweet drafts
- Do NOT generate tweets, Telegram Q&A, or social post examples
- plan context: ${plan} (still output full JSON)
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
    console.warn("[api/generate] OPENAI_API_KEY missing — using fallback mock.");
    return { kit: generateMockLaunchKit(trimmed), source: "fallback" };
  }

  console.log("[api/generate] calling OpenAI…");

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
      temperature: 0.75,
      messages: [
        { role: "system", content: buildSystemPrompt(plan, addons) },
        {
          role: "user",
          content: `Memecoin idea: "${trimmed}"\n\nGenerate the full market intelligence report.`,
        },
      ],
      response_format: zodResponseFormat(aiLaunchKitSchema, "launch_intelligence"),
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
