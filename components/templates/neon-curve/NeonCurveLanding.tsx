"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Radio, Rocket, Sparkles, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./neon-curve.css";

const MARQUEE = [
  "$FROTH",
  "BONDING LIVE",
  "NO UTILITY — ONLY VIBES",
  "CT RAID INCOMING",
  "FOAM AT THE TOP",
  "APE RESPONSIBLY*",
  "*jk don't",
];

export function NeonCurveLanding() {
  const [curveFill, setCurveFill] = useState(38);
  const [degen, setDegen] = useState(71);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurveFill((v) => Math.min(92, v + (Math.random() > 0.55 ? 1 : 0)));
      setDegen((v) => Math.max(55, Math.min(99, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="neon-curve relative min-h-screen overflow-x-hidden">
      <div className="neon-curve-grid pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full blur-[100px]"
        style={{ background: "hsl(322 100% 58% / 0.28)" }}
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full blur-[110px]"
        style={{ background: "hsl(72 100% 52% / 0.18)" }}
      />

      <div className="relative border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/0.7)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="neon-curve-pulse flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))] font-black text-[hsl(var(--primary-foreground))]">
              FR
            </span>
            <div>
              <p className="text-sm font-black tracking-tight">FROTH</p>
              <p className="font-mono text-[11px] text-[hsl(var(--secondary))]">$FROTH · solana</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="hidden gap-1 sm:inline-flex" variant="secondary">
              <Radio className="h-3 w-3" />
              LIVE ON CURVE
            </Badge>
            <Button size="sm" className="rounded-full font-black tracking-wide">
              Buy $FROTH
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-2 text-[hsl(var(--secondary-foreground))]">
        <div className="neon-curve-marquee flex w-max gap-10 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em]">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              {item}
              <span aria-hidden>•</span>
            </span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-[hsl(var(--primary)/0.45)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))]"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              the foam at the top of the curve
            </Badge>
            <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              Don&apos;t chase
              <span className="block text-[hsl(var(--primary))]">the candle.</span>
              <span className="block text-[hsl(var(--secondary))]">Be the froth.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              $FROTH is a pure culture coin for CT degenerates who treat bonding curves like ocean
              waves. No roadmap to nowhere. No fake utility. Just foam, volume, and reply-game.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-8 font-black">
                <Rocket className="h-4 w-4" />
                Ape the foam
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.12)]"
              >
                Open Pump.fun
              </Button>
            </div>
            <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
              Built for: reply guys, raid captains, and anyone who buys the first meme screenshot.
            </p>
          </div>

          <Card className="neon-curve-float relative overflow-hidden border-[hsl(var(--primary)/0.35)] bg-[hsl(var(--card)/0.9)] shadow-[0_0_60px_-20px_hsl(72_100%_52%/0.55)]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1"
              style={{
                background: "linear-gradient(90deg, hsl(72 100% 52%), hsl(322 100% 58%))",
              }}
            />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="font-mono text-sm uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
                  Bonding terminal
                </CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Flame className="h-3 w-3" />
                  HOT
                </Badge>
              </div>
              <CardDescription>Live mock fill — for template preview only</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Curve fill
                  </span>
                  <span className="font-mono text-2xl font-black text-[hsl(var(--primary))]">
                    {curveFill}%
                  </span>
                </div>
                <Progress value={curveFill} className="h-4 rounded-sm" />
              </div>
              <div>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Degen meter
                  </span>
                  <span className="font-mono text-lg font-bold text-[hsl(var(--secondary))]">
                    {degen}/100
                  </span>
                </div>
                <Progress
                  value={degen}
                  className="h-3 rounded-sm [&_[data-state]]:bg-[hsl(var(--secondary))] [&>div]:bg-[hsl(var(--secondary))]"
                />
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ["Holders", "1.2k"],
                  ["Replies", "840"],
                  ["Raids", "12"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.45)] px-2 py-3"
                  >
                    <p className="font-mono text-lg font-black">{value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 grid gap-5 sm:grid-cols-3">
          <Card className="neon-curve-skew-card border-[hsl(var(--primary)/0.25)]">
            <CardHeader>
              <CardTitle className="text-base">One-glance meme</CardTitle>
              <CardDescription>
                Foam crown on a green candle. If you need a thread to get it, it&apos;s already too
                late.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="neon-curve-skew-card-alt border-[hsl(var(--secondary)/0.3)]">
            <CardHeader>
              <CardTitle className="text-base">CT-native deploy</CardTitle>
              <CardDescription>
                Pin the screenshot, raid the replies, let the curve do the talking. Culture first.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="neon-curve-skew-card border-[hsl(var(--primary)/0.25)]">
            <CardHeader>
              <CardTitle className="text-base">Shelf-life: loud</CardTitle>
              <CardDescription>
                24–72h of chaos energy. Then either legend status or beautiful foam on the beach.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="mt-16">
          <Tabs defaultValue="lore" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xl bg-[hsl(var(--muted))] p-1">
              <TabsTrigger
                value="lore"
                className="rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
              >
                Lore
              </TabsTrigger>
              <TabsTrigger
                value="tokenomics"
                className="rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
              >
                Tokenomics
              </TabsTrigger>
              <TabsTrigger
                value="raids"
                className="rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
              >
                Raids
              </TabsTrigger>
            </TabsList>
            <TabsContent value="lore">
              <Card>
                <CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  <p>
                    Every bonding curve has a crest. Most people buy the body of the wave and drown
                    in the dump. $FROTH is for the ones floating on top — loud, temporary, and
                    somehow always in the screenshot.
                  </p>
                  <p>
                    Born on Pump.fun energy, raised in quote-tweets, baptized in Telegram sticker
                    packs. If your bags feel wet, you&apos;re doing it right.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tokenomics">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm">
                    {[
                      ["Supply", "1,000,000,000 $FROTH"],
                      ["Tax", "0% — we don't do that here"],
                      ["LP", "Burned when it graduates (or doesn't)"],
                      ["Utility", "Being early in the group chat"],
                    ].map(([k, v]) => (
                      <li
                        key={k}
                        className="flex items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-3 last:border-0"
                      >
                        <span className="text-[hsl(var(--muted-foreground))]">{k}</span>
                        <span className="text-right font-mono font-semibold">{v}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="raids">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-start gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] p-4">
                    <Users className="mt-0.5 h-5 w-5 text-[hsl(var(--secondary))]" />
                    <div>
                      <p className="font-semibold">Tonight&apos;s objective</p>
                      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        Flood the pinned meme with foam emojis. First 50 reply guys get honorary
                        lifeguard roles in TG.
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full rounded-full font-bold">
                    Join Telegram war room
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Community foam</h2>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              Stickers, raids, and unhinged one-liners. If you&apos;re quiet, you&apos;re already
              underwater.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">
                <X className="h-4 w-4" />
                Follow @frothcoin
              </Button>
              <Button variant="secondary" className="rounded-full">
                <Users className="h-4 w-4" />
                TG: froth-fam
              </Button>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="rug">
              <AccordionTrigger className="text-[hsl(var(--foreground))]">
                Is this a rug?
              </AccordionTrigger>
              <AccordionContent>
                It&apos;s a memecoin. Assume chaos. Dev keys are as trustworthy as a beach forecast —
                check the curve, not the vibes thread.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why">
              <AccordionTrigger className="text-[hsl(var(--foreground))]">
                Why $FROTH?
              </AccordionTrigger>
              <AccordionContent>
                Because every green candle leaves foam. Somebody had to brand it before CT did it
                with a worse ticker.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how">
              <AccordionTrigger className="text-[hsl(var(--foreground))]">
                How do I buy?
              </AccordionTrigger>
              <AccordionContent>
                Connect wallet → open Pump.fun → search $FROTH → ape size you can laugh about later.
                This page is a template preview, not financial advice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <footer className="relative border-t border-[hsl(var(--border))] px-5 py-6 text-center sm:px-8">
        <p className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
          Neon Curve template · $FROTH demo · hypelaunch.space/templates/neon-curve
        </p>
      </footer>
    </div>
  );
}
