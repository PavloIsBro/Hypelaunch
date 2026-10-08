import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { getLandingFallback } from "@/lib/templates/registry";
import {
  mapNeonCurveContent,
  neonCurveAiSchema,
  type NeonCurveContent,
} from "@/lib/templates/neon-curve/schema";
import type { LandingTemplateId } from "@/lib/templates/types";

export type GenerateLandingResult = {
  content: NeonCurveContent;
  source: "openai" | "fallback";
  message?: string;
};

function buildNeonCurveSystemPrompt(tokenName: string, ticker: string): string {
  return `You are Hypelaunch — you write memecoin landing copy for the Neon Curve React template.

Voice: CT-native, degen-literate, punchy. No corporate speak, no "revolutionizing", no LinkedIn tone.

Identity (do not invent a different token):
- tokenName: ${tokenName}
- ticker: $${ticker}

Fill every field for the Neon Curve layout:
- brandMark: 2–3 uppercase letters from the ticker
- liveBadgeLabel, buyButtonLabel (include $${ticker} where natural)
- marquee: 5–8 short uppercase/meme strip lines (include $${ticker} once)
- heroBadge, heroLine1/2/3 (three stacked headline fragments), heroDescription
- primaryCtaLabel, secondaryCtaLabel (secondary ≈ Pump.fun), audienceLine
- terminalTitle, terminalDescription, terminalStats: exactly 3 {label,value} mock stats
- features: exactly 3 {title,description} cards
- loreParagraphs: 2–3 short paragraphs mentioning $${ticker}
- tokenomics: 3–5 {label,value} rows (supply/tax/LP/utility style)
- raidObjectiveTitle, raidObjectiveBody, raidCtaLabel
- communityTitle, communityDescription, xLinkLabel, telegramLinkLabel
- faq: 2–4 {question,answer}
- footerNote: short preview footer mentioning Neon Curve + $${ticker}

Return JSON matching the schema exactly. Do NOT output HTML.`;
}

async function generateNeonCurveLanding(
  idea: string,
  tokenName: string,
  ticker: string,
): Promise<GenerateLandingResult> {
  const fallback = getLandingFallback("neon-curve", tokenName, ticker);
  const fallbackMessage =
    "AI landing copy is temporarily unavailable. Showing a default Neon Curve preview.";

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[api/generate-landing] OPENAI_API_KEY missing — using fallback.");
    return { content: fallback, source: "fallback", message: fallbackMessage };
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
      temperature: 0.85,
      messages: [
        { role: "system", content: buildNeonCurveSystemPrompt(tokenName, ticker) },
        {
          role: "user",
          content: `Memecoin idea: "${idea}"\n\nGenerate Neon Curve landing JSON for ${tokenName} ($${ticker}).`,
        },
      ],
      response_format: zodResponseFormat(neonCurveAiSchema, "neon_curve_landing"),
    });

    const parsed = completion.choices[0]?.message?.parsed;
    if (!parsed) {
      throw new Error("Empty model response");
    }

    return {
      content: mapNeonCurveContent(tokenName, ticker, parsed),
      source: "openai",
    };
  } catch (error) {
    console.error("[generate-landing] OpenAI error:", error);
    return { content: fallback, source: "fallback", message: fallbackMessage };
  }
}

export async function generateLandingContent(
  idea: string,
  templateId: LandingTemplateId,
  tokenName: string,
  ticker: string,
): Promise<GenerateLandingResult> {
  const trimmed = idea.trim();
  if (!trimmed) {
    throw new Error("Memecoin idea is required.");
  }

  const name = tokenName.trim() || "Token";
  const tick = ticker.trim().toUpperCase() || "HYP";

  switch (templateId) {
    case "neon-curve":
      return generateNeonCurveLanding(trimmed, name, tick);
    default: {
      const _exhaustive: never = templateId;
      return _exhaustive;
    }
  }
}
