import { NextResponse } from "next/server";
import {
  buildFallbackSignals,
  getApifyToken,
  pollTwitterScrape,
  startTwitterScrape,
} from "@/lib/apify-twitter";

export const runtime = "nodejs";
export const maxDuration = 15;

type StartBody = {
  idea?: string;
};

type PollBody = {
  runId?: string;
  keywords?: string[];
  idea?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StartBody & PollBody & { action?: string };
    const action = body.action === "poll" ? "poll" : "start";

    if (action === "poll") {
      const runId = typeof body.runId === "string" ? body.runId.trim() : "";
      const idea = typeof body.idea === "string" ? body.idea.trim() : "";
      const keywords = Array.isArray(body.keywords)
        ? body.keywords.filter((k): k is string => typeof k === "string" && k.trim().length > 0)
        : [];

      if (!runId) {
        return NextResponse.json({ error: "runId is required." }, { status: 400 });
      }

      const result = await pollTwitterScrape(runId, keywords, idea || "idea");
      return NextResponse.json(result);
    }

    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    if (!idea) {
      return NextResponse.json({ error: "Memecoin idea is required." }, { status: 400 });
    }

    if (!getApifyToken()) {
      return NextResponse.json({
        status: "FAILED",
        signals: buildFallbackSignals(
          idea,
          "APIFY_TOKEN is not configured. Add it in Vercel → Environment Variables (Production), then Redeploy.",
        ),
      });
    }

    const started = await startTwitterScrape(idea);
    if (!started) {
      return NextResponse.json({
        status: "FAILED",
        signals: buildFallbackSignals(idea, "Could not start Twitter scrape."),
      });
    }

    return NextResponse.json({
      status: "RUNNING",
      runId: started.runId,
      keywords: started.keywords,
      idea: started.idea,
    });
  } catch (error) {
    console.error("[api/twitter-signals]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Twitter scrape request failed.",
      },
      { status: 500 },
    );
  }
}
