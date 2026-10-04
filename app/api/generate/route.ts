import { NextResponse } from "next/server";
import { EMPTY_ADDONS, type PurchasedAddons } from "@/lib/addons";
import { fetchTwitterSignals } from "@/lib/apify-twitter";
import { generateLaunchKitWithOpenAI } from "@/lib/generate-launch-kit";
import type { PlanId } from "@/lib/plans";

export const runtime = "nodejs";
export const maxDuration = 60;

type GenerateBody = {
  idea?: string;
  selectedPlan?: PlanId;
  automationAddons?: Partial<PurchasedAddons>;
  /** @deprecated use selectedPlan */
  plan?: PlanId;
  /** @deprecated use automationAddons */
  addons?: Partial<PurchasedAddons>;
};

function parseAddons(raw: Partial<PurchasedAddons> | undefined): PurchasedAddons {
  return {
    x: Boolean(raw?.x),
    telegram: Boolean(raw?.telegram),
  };
}

function parsePlan(raw: unknown): PlanId {
  if (raw === "pro" || raw === "free") return raw;
  if (raw === "extra") return "pro";
  return "free";
}

export async function POST(request: Request) {
  console.log("[api/generate] POST received");

  try {
    let body: GenerateBody;
    try {
      body = (await request.json()) as GenerateBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    console.log("[api/generate] body", body);

    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    if (!idea) {
      return NextResponse.json({ error: "Memecoin idea is required." }, { status: 400 });
    }

    if (idea.length > 500) {
      return NextResponse.json(
        { error: "Idea is too long. Keep it under 500 characters." },
        { status: 400 },
      );
    }

    const plan = parsePlan(body.selectedPlan ?? body.plan);
    const addons = parseAddons(body.automationAddons ?? body.addons ?? EMPTY_ADDONS);

    const twitterSignals = await fetchTwitterSignals(idea);
    console.log("[api/generate] twitter signals", {
      source: twitterSignals.source,
      tweets: twitterSignals.tweetCount,
      attention: twitterSignals.attentionScore,
      keywords: twitterSignals.keywords,
    });

    const { kit, source } = await generateLaunchKitWithOpenAI(
      idea,
      plan,
      addons,
      twitterSignals,
    );

    console.log("[api/generate] success", { source, ticker: kit.ticker });

    const notices: string[] = [];
    if (source === "fallback") {
      notices.push(
        "AI is temporarily unavailable. Showing an estimated demo report — try again shortly.",
      );
    }
    if (twitterSignals.source === "fallback" && twitterSignals.error) {
      notices.push(`X scrape: ${twitterSignals.error}`);
    }

    return NextResponse.json({
      kit,
      source,
      twitterSource: twitterSignals.source,
      message: notices.length ? notices.join(" ") : undefined,
    });
  } catch (error) {
    console.error("[api/generate]", error);
    return NextResponse.json(
      {
        error: "Something went wrong while generating your report. Please try again.",
      },
      { status: 500 },
    );
  }
}
