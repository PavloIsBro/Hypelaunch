import type { ComponentType } from "react";
import { NeonCurveLanding } from "@/components/templates/neon-curve/NeonCurveLanding";
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
};

export function getLandingTemplateComponent(
  id: string,
): ComponentType<LandingTemplateProps> | undefined {
  if (id in TEMPLATE_COMPONENTS) {
    return TEMPLATE_COMPONENTS[id as LandingTemplateId];
  }
  return undefined;
}
