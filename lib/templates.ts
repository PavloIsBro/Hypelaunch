/** Re-export registry for `/templates/[slug]` and Extra picker. */
export {
  LANDING_TEMPLATES,
  getLandingFallback,
  getLandingTemplateMeta,
  type LandingTemplateContent,
  type LandingTemplateMeta,
} from "./templates/registry";
export {
  LANDING_TEMPLATE_IDS,
  isLandingTemplateId,
  type LandingTemplateId,
} from "./templates/types";
