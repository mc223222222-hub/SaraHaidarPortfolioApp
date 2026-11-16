import { getTranslations } from "next-intl/server";
import publicationsData from "@/data/publicationsData.json";
import { type Locale } from "@/lib/seo";

export type Publication = (typeof publicationsData.content)[number];

export function findPublication(slug: string): Publication | undefined {
  return publicationsData.content.find((p) => p.slug === slug);
}

// "dd/mm/yyyy" -> "yyyy-mm-dd" (ISO 8601 date for schema.org and the sitemap)
export function releaseDateIso(releaseDate: string): string | undefined {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(releaseDate);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : undefined;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// Trims to `max` characters on a word boundary, adding an ellipsis when cut.
export function trimToLength(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, "") + "…";
}

// Meta description source: the first paragraph of the article body. A very short first
// paragraph (a one-line subtitle) is joined with the next one so the description has substance.
export function descriptionFromHtml(html: string, max = 155): string {
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1])).filter(Boolean);
  let text = paragraphs[0] ?? stripTags(html);
  if (text.length < 60 && paragraphs[1]) text = `${text}. ${paragraphs[1]}`;
  return trimToLength(text, max);
}

// Search-result title and description for articles whose default ones (preview title, first
// paragraph) under-perform. SEO only: never shown on the page itself.
const SEO_OVERRIDES: Record<string, Partial<Record<Locale, { title: string; description: string }>>> = {
  "seasonal-employee-visa": {
    fr: {
      title: "Travailleur saisonnier en France : un cadre strict",
      description:
        "Carte « travailleur saisonnier » : six mois de travail par an, pas de résidence permanente, nouvelle autorisation à chaque contrat. Les difficultés du dispositif.",
    },
    en: {
      title: "Seasonal worker card in France: a strict framework",
      description:
        "Seasonal worker card: up to six months of work a year, no permanent residence, new work authorization for each contract. The difficulties of the scheme.",
    },
  },
};

export async function getPublicationCopy(locale: Locale, pub: Publication) {
  const override = SEO_OVERRIDES[pub.slug]?.[locale];
  const t = await getTranslations({ locale, namespace: "publicationsPage" });
  const html = t.raw(`content.${pub.contentKey}`) as string;
  return {
    title: override?.title ?? t(`content.${pub.previewTitleKey}`),
    description: override?.description ?? descriptionFromHtml(html),
    category: t(pub.contentCategory),
  };
}
