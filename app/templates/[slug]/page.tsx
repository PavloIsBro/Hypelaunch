import { getLandingTemplateComponent } from "@/lib/template-components";
import { getLandingFallback, getLandingTemplateMeta } from "@/lib/templates";
import { isLandingTemplateId } from "@/lib/templates/types";
import {
  Bebas_Neue,
  Cinzel,
  IBM_Plex_Mono,
  Press_Start_2P,
  Syne,
} from "next/font/google";
import { notFound } from "next/navigation";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-neon-sans",
  weight: ["400", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-signal-mono",
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-arcade-pixel",
  weight: "400",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cult-display",
  weight: ["400", "600", "700", "900"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-street-display",
  weight: "400",
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

  const fontVars = [
    syne.variable,
    ibmPlexMono.variable,
    pressStart.variable,
    cinzel.variable,
    bebas.variable,
  ].join(" ");

  return (
    <div className={fontVars}>
      <Component content={content} />
    </div>
  );
}
