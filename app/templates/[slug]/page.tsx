import { getLandingTemplateComponent } from "@/lib/template-components";
import { getLandingFallback, getLandingTemplateMeta } from "@/lib/templates";
import { isLandingTemplateId } from "@/lib/templates/types";
import { Syne } from "next/font/google";
import { notFound } from "next/navigation";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-neon-sans",
  weight: ["400", "600", "700", "800"],
});

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  if (!isLandingTemplateId(slug)) notFound();

  const meta = getLandingTemplateMeta(slug);
  const Component = getLandingTemplateComponent(slug);
  if (!meta || !Component) notFound();

  const content = getLandingFallback(slug, "FROTH", "FROTH");

  return (
    <div className={syne.variable}>
      <Component content={content} />
    </div>
  );
}
