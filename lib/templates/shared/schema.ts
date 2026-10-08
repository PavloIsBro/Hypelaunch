import { z } from "zod";

const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const tokenomicRowSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

/** Shared AI-generated fields for all landing templates (tokenName/ticker injected from kit). */
export const sharedLandingAiSchema = z.object({
  brandMark: z.string().min(1).max(3),
  liveBadgeLabel: z.string(),
  buyButtonLabel: z.string(),
  marquee: z.array(z.string()).min(4).max(10),
  heroBadge: z.string(),
  heroLine1: z.string(),
  heroLine2: z.string(),
  heroLine3: z.string(),
  heroDescription: z.string(),
  primaryCtaLabel: z.string(),
  secondaryCtaLabel: z.string(),
  audienceLine: z.string(),
  terminalTitle: z.string(),
  terminalDescription: z.string(),
  terminalStats: z.array(statSchema).length(3),
  features: z.array(featureSchema).length(3),
  loreParagraphs: z.array(z.string()).min(1).max(4),
  tokenomics: z.array(tokenomicRowSchema).min(3).max(6),
  raidObjectiveTitle: z.string(),
  raidObjectiveBody: z.string(),
  raidCtaLabel: z.string(),
  communityTitle: z.string(),
  communityDescription: z.string(),
  xLinkLabel: z.string(),
  telegramLinkLabel: z.string(),
  faq: z.array(faqItemSchema).min(2).max(5),
  footerNote: z.string(),
});

export type SharedLandingAiPayload = z.infer<typeof sharedLandingAiSchema>;

export type SharedLandingContent = SharedLandingAiPayload & {
  tokenName: string;
  ticker: string;
};

export function mapSharedLandingContent(
  tokenName: string,
  ticker: string,
  raw: SharedLandingAiPayload,
): SharedLandingContent {
  return {
    tokenName: tokenName.trim(),
    ticker: ticker.trim().toUpperCase(),
    brandMark: raw.brandMark.trim().slice(0, 3).toUpperCase(),
    liveBadgeLabel: raw.liveBadgeLabel.trim(),
    buyButtonLabel: raw.buyButtonLabel.trim(),
    marquee: raw.marquee.map((item) => item.trim()).filter(Boolean),
    heroBadge: raw.heroBadge.trim(),
    heroLine1: raw.heroLine1.trim(),
    heroLine2: raw.heroLine2.trim(),
    heroLine3: raw.heroLine3.trim(),
    heroDescription: raw.heroDescription.trim(),
    primaryCtaLabel: raw.primaryCtaLabel.trim(),
    secondaryCtaLabel: raw.secondaryCtaLabel.trim(),
    audienceLine: raw.audienceLine.trim(),
    terminalTitle: raw.terminalTitle.trim(),
    terminalDescription: raw.terminalDescription.trim(),
    terminalStats: raw.terminalStats.map((s) => ({
      label: s.label.trim(),
      value: s.value.trim(),
    })),
    features: raw.features.map((f) => ({
      title: f.title.trim(),
      description: f.description.trim(),
    })),
    loreParagraphs: raw.loreParagraphs.map((p) => p.trim()).filter(Boolean),
    tokenomics: raw.tokenomics.map((row) => ({
      label: row.label.trim(),
      value: row.value.trim(),
    })),
    raidObjectiveTitle: raw.raidObjectiveTitle.trim(),
    raidObjectiveBody: raw.raidObjectiveBody.trim(),
    raidCtaLabel: raw.raidCtaLabel.trim(),
    communityTitle: raw.communityTitle.trim(),
    communityDescription: raw.communityDescription.trim(),
    xLinkLabel: raw.xLinkLabel.trim(),
    telegramLinkLabel: raw.telegramLinkLabel.trim(),
    faq: raw.faq.map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    })),
    footerNote: raw.footerNote.trim(),
  };
}
