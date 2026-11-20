import { FIRM, localizedUrl } from "@/lib/seo";
import publicationsData from "@/data/publicationsData.json";
import { getArticleHtml, getArticleTitle, htmlToMarkdown, releaseDateIso } from "@/lib/publications";

export const dynamic = "force-static";

// /llms-full.txt: the full text of every article as clean markdown, for AI assistants and answer engines.
export function GET() {
  const out: string[] = [];
  out.push(`# ${FIRM.name}: full article text`);
  out.push("");
  out.push(
    `Author: ${FIRM.lawyer}, avocat (Barreau de Paris), Doctor of Public Law. General information only, not legal advice. Contact: ${FIRM.email}, ${FIRM.telephone}.`
  );
  out.push("");
  for (const locale of ["en", "fr"] as const) {
    for (const pub of publicationsData.content) {
      out.push("---");
      out.push("");
      out.push(`# ${getArticleTitle(locale, pub)}`);
      out.push("");
      out.push(`Source: ${localizedUrl(locale, `/publications/${pub.slug}`)}`);
      out.push(`Language: ${locale === "en" ? "English" : "Français"}`);
      out.push(`Published: ${releaseDateIso(pub.releaseDate)}`);
      out.push(`Author: ${FIRM.lawyer}`);
      out.push("");
      out.push(htmlToMarkdown(getArticleHtml(locale, pub)));
      out.push("");
    }
  }
  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
