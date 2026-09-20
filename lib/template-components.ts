import type { ComponentType } from "react";
import { NeonCurveLanding } from "@/components/templates/neon-curve/NeonCurveLanding";

const TEMPLATE_COMPONENTS: Record<string, ComponentType> = {
  "neon-curve": NeonCurveLanding,
};

export function getLandingTemplateComponent(id: string): ComponentType | undefined {
  return TEMPLATE_COMPONENTS[id];
}
