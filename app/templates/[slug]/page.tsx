import { getLandingTemplateComponent } from "@/lib/template-components";
import { getLandingTemplateMeta } from "@/lib/templates";
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
  const meta = getLandingTemplateMeta(slug);
  const Component = getLandingTemplateComponent(slug);
  if (!meta || !Component) notFound();

  return (
    <div className={syne.variable}>
      <Component />
    </div>
  );
}
