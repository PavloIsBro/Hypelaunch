import type { ComponentType } from "react";
import { ArcadeDumpLanding } from "@/components/templates/arcade-dump/ArcadeDumpLanding";
import { CultChapelLanding } from "@/components/templates/cult-chapel/CultChapelLanding";
import { NeonCurveLanding } from "@/components/templates/neon-curve/NeonCurveLanding";
import { SignalStackLanding } from "@/components/templates/signal-stack/SignalStackLanding";
import { StreetStickerLanding } from "@/components/templates/street-sticker/StreetStickerLanding";
import type { LandingTemplateContent } from "@/lib/templates/registry";
import type { LandingTemplateId } from "@/lib/templates/types";

export type LandingTemplateProps = {
  content: LandingTemplateContent;
};

const TEMPLATE_COMPONENTS: Record<
  LandingTemplateId,
  ComponentType<LandingTemplateProps>
> = {
  "neon-curve": NeonCurveLanding,
  "signal-stack": SignalStackLanding,
  "arcade-dump": ArcadeDumpLanding,
  "cult-chapel": CultChapelLanding,
  "street-sticker": StreetStickerLanding,
};

export function getLandingTemplateComponent(
  id: string,
): ComponentType<LandingTemplateProps> | undefined {
  if (id in TEMPLATE_COMPONENTS) {
    return TEMPLATE_COMPONENTS[id as LandingTemplateId];
  }
  return undefined;
}
