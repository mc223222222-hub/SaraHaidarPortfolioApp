import { getTranslations } from "next-intl/server";
import publicationsData from "@/data/publicationsData.json";
import { type Locale } from "@/lib/seo";
import messagesEn from "@/messages/en.json";
import messagesFr from "@/messages/fr.json";

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
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// Raw article HTML straight from the message files (no request context needed, so it also works in route handlers).
export function getArticleHtml(locale: Locale, pub: Publication): string {
  const messages = (locale === "fr" ? messagesFr : messagesEn) as unknown as {
    publicationsPage: { content: Record<string, string> };
  };
  return messages.publicationsPage.content[pub.contentKey] ?? "";
}

export function getArticleTitle(locale: Locale, pub: Publication): string {
  const messages = (locale === "fr" ? messagesFr : messagesEn) as unknown as {
    publicationsPage: { content: Record<string, string> };
  };
  return messages.publicationsPage.content[pub.previewTitleKey] ?? pub.slug;
}

export function wordCount(html: string): number {
  const text = stripTags(html);
  return text ? text.split(" ").length : 0;
}

// Plain markdown version of an article body, for llms-full.txt.
export function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_, t) => `\n\n## ${stripTags(t)}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, t) => `\n\n### ${stripTags(t)}\n\n`)
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<\/(p|ul|ol)>/g, "\n\n")
    .replace(/<\/?strong>/g, "**")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Question and answer pairs from an article's own visible FAQ section (an h2 containing "FAQ",
// "frequently asked questions" or "questions fréquentes", then h3 question + paragraph answer).
// Returns [] when the article has no such section, so FAQ schema only ever mirrors visible text.
export function extractFaq(html: string): { question: string; answer: string }[] {
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  const idx = h2s.findIndex((m) => /FAQ|FREQUENTLY ASKED|QUESTIONS\s+FR[ÉE]QUENTES/i.test(stripTags(m[1])));
  if (idx < 0) return [];
  const start = (h2s[idx].index ?? 0) + h2s[idx][0].length;
  const end = h2s[idx + 1]?.index ?? html.length;
  const section = html.slice(start, end);
  const items: { question: string; answer: string }[] = [];
  for (const m of section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/g)) {
    const question = stripTags(m[1]);
    const answer = [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((p) => stripTags(p[1])).join(" ");
    if (question && answer) items.push({ question, answer });
  }
  return items;
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
