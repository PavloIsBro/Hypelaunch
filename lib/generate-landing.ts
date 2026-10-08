import { generateStructured, getAiProvider, isAiConfigured, type AiSource } from "@/lib/ai";
import { getSharedLandingFallback } from "@/lib/templates/shared/fallback";
import {
  mapSharedLandingContent,
  sharedLandingAiSchema,
  type SharedLandingContent,
} from "@/lib/templates/shared/schema";

export type GenerateLandingResult = {
  content: SharedLandingContent;
  source: AiSource;
  message?: string;
};

function buildSharedLandingSystemPrompt(tokenName: string, ticker: string): string {
  return `You are Hypelaunch — you write memecoin landing copy that works across multiple React templates.

Voice: CT-native, degen-literate, punchy. No corporate speak, no "revolutionizing", no LinkedIn tone.

Identity (do not invent a different token):
- tokenName: ${tokenName}
- ticker: $${ticker}

Fill every field:
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
- footerNote: short preview footer mentioning $${ticker}

Return JSON matching the schema exactly. Do NOT output HTML.`;
}

export async function generateLandingContent(
  idea: string,
  tokenName: string,
  ticker: string,
): Promise<GenerateLandingResult> {
  const trimmed = idea.trim();
  if (!trimmed) {
    throw new Error("Memecoin idea is required.");
  }

  const name = tokenName.trim() || "Token";
  const tick = ticker.trim().toUpperCase() || "HYP";

  const fallback = getSharedLandingFallback(name, tick);
  const fallbackMessage =
    "AI landing copy is temporarily unavailable. Showing a default landing preview.";

  if (!isAiConfigured()) {
    console.warn(
      `[api/generate-landing] ${getAiProvider()} API key missing — using fallback.`,
    );
    return { content: fallback, source: "fallback", message: fallbackMessage };
  }

  try {
    const { data, provider } = await generateStructured({
      messages: [
        { role: "system", content: buildSharedLandingSystemPrompt(name, tick) },
        {
          role: "user",
          content: `Memecoin idea: "${trimmed}"\n\nGenerate landing JSON for ${name} ($${tick}).`,
        },
      ],
      schema: sharedLandingAiSchema,
      schemaName: "shared_landing",
      temperature: 0.85,
    });

    return {
      content: mapSharedLandingContent(name, tick, data),
      source: provider,
    };
  } catch (error) {
    console.error("[generate-landing] AI error:", error);
    return { content: fallback, source: "fallback", message: fallbackMessage };
  }
}
