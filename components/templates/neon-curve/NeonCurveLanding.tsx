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
import type { SharedLandingContent } from "@/lib/templates/shared/schema";
import { Flame, Radio, Rocket, Sparkles, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./neon-curve.css";

export type NeonCurveLandingProps = {
  content: SharedLandingContent;
};

export function NeonCurveLanding({ content }: NeonCurveLandingProps) {
  const [curveFill, setCurveFill] = useState(38);
  const [degen, setDegen] = useState(71);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurveFill((v) => Math.min(92, v + (Math.random() > 0.55 ? 1 : 0)));
      setDegen((v) => Math.max(55, Math.min(99, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  const marquee = content.marquee.length
    ? content.marquee
    : [`$${content.ticker}`, "BONDING LIVE"];

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
              {content.brandMark}
            </span>
            <div>
              <p className="text-sm font-black tracking-tight">{content.tokenName}</p>
              <p className="font-mono text-[11px] text-[hsl(var(--secondary))]">
                ${content.ticker} · solana
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="hidden gap-1 sm:inline-flex" variant="secondary">
              <Radio className="h-3 w-3" />
              {content.liveBadgeLabel}
            </Badge>
            <Button size="sm" className="rounded-full font-black tracking-wide">
              {content.buyButtonLabel}
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-2 text-[hsl(var(--secondary-foreground))]">
        <div className="neon-curve-marquee flex w-max gap-10 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em]">
          {[...marquee, ...marquee].map((item, i) => (
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
              {content.heroBadge}
            </Badge>
            <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              {content.heroLine1}
              <span className="block text-[hsl(var(--primary))]">{content.heroLine2}</span>
              <span className="block text-[hsl(var(--secondary))]">{content.heroLine3}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-8 font-black">
                <Rocket className="h-4 w-4" />
                {content.primaryCtaLabel}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.12)]"
              >
                {content.secondaryCtaLabel}
              </Button>
            </div>
            <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">{content.audienceLine}</p>
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
                  {content.terminalTitle}
                </CardTitle>
                <Badge variant="secondary" className="gap-1">
                  <Flame className="h-3 w-3" />
                  HOT
                </Badge>
              </div>
              <CardDescription>{content.terminalDescription}</CardDescription>
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
                {content.terminalStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.45)] px-2 py-3"
                  >
                    <p className="font-mono text-lg font-black">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 grid gap-5 sm:grid-cols-3">
          {content.features.map((feature, index) => (
            <Card
              key={feature.title}
              className={
                index === 1
                  ? "neon-curve-skew-card-alt border-[hsl(var(--secondary)/0.3)]"
                  : "neon-curve-skew-card border-[hsl(var(--primary)/0.25)]"
              }
            >
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
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
                  {content.loreParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tokenomics">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm">
                    {content.tokenomics.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-3 last:border-0"
                      >
                        <span className="text-[hsl(var(--muted-foreground))]">{row.label}</span>
                        <span className="text-right font-mono font-semibold">{row.value}</span>
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
                      <p className="font-semibold">{content.raidObjectiveTitle}</p>
                      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        {content.raidObjectiveBody}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full rounded-full font-bold">
                    {content.raidCtaLabel}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight">{content.communityTitle}</h2>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
              {content.communityDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">
                <X className="h-4 w-4" />
                {content.xLinkLabel}
              </Button>
              <Button variant="secondary" className="rounded-full">
                <Users className="h-4 w-4" />
                {content.telegramLinkLabel}
              </Button>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {content.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-[hsl(var(--foreground))]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="relative border-t border-[hsl(var(--border))] px-5 py-6 text-center sm:px-8">
        <p className="font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
          {content.footerNote}
        </p>
      </footer>
    </div>
  );
}
