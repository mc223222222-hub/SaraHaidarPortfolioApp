import { FIRM, SITE_URL, localizedUrl } from "@/lib/seo";
import publicationsData from "@/data/publicationsData.json";
import { descriptionFromHtml, getArticleHtml, getArticleTitle, releaseDateIso } from "@/lib/publications";

export const dynamic = "force-static";

// /llms.txt: a short, plain-text map of the site for AI assistants and answer engines.
export function GET() {
  const lines: string[] = [];
  lines.push(`# ${FIRM.name}`);
  lines.push("");
  lines.push(
    "> Immigration law firm in Paris, France. Sarah Haidar, avocat (Barreau de Paris) and Doctor of Public Law, advises individuals and companies on residence permits, visas, the talent passport, entrepreneur visas, regularization and French naturalization. Languages: French, English, Arabic."
  );
  lines.push("");
  lines.push("General information only, not legal advice: every case depends on its facts and the rules in force on the date of the application.");
  lines.push("");
  lines.push("## Key facts");
  lines.push(`- Lawyer: ${FIRM.lawyer}, avocat, Doctor of Public Law, lecturer in corporate law`);
  lines.push("- Practice: immigration law and international mobility in France; also anti-corruption and compliance with a focus on Arab countries");
  lines.push("- Clients: individuals, entrepreneurs and companies recruiting international talent");
  lines.push(`- Languages: ${FIRM.languages.join(", ")}`);
  lines.push("- Location: Paris, France");
  lines.push("- First consultation: 150 EUR including VAT, deducted from the fees if the firm takes the case");
  lines.push(`- Contact: ${FIRM.email}, ${FIRM.telephone}`);
  lines.push(`- Instagram: ${FIRM.sameAs[0] ?? ""}`);
  lines.push("");
  lines.push("## Main pages");
  lines.push(`- [Home (English)](${localizedUrl("en", "")}): firm overview`);
  lines.push(`- [Accueil (français)](${localizedUrl("fr", "")}): présentation du cabinet`);
  lines.push(`- [Areas of expertise](${localizedUrl("en", "/areaOfExpertise")}): services in immigration, business and foreign-business law`);
  lines.push(`- [Domaines d'intervention](${localizedUrl("fr", "/areaOfExpertise")}): services du cabinet`);
  lines.push(`- [About Sarah Haidar](${localizedUrl("en", "/aboutMe")}): background and expertise`);
  lines.push(`- [À propos de Sarah Haidar](${localizedUrl("fr", "/aboutMe")}): parcours et expertise`);
  lines.push(`- [Contact](${localizedUrl("en", "/contact")}): book a consultation`);
  lines.push("");
  for (const locale of ["en", "fr"] as const) {
    lines.push(locale === "en" ? "## Articles (English)" : "## Articles (français)");
    for (const pub of publicationsData.content) {
      const title = getArticleTitle(locale, pub);
      const desc = descriptionFromHtml(getArticleHtml(locale, pub), 200);
      lines.push(`- [${title}](${localizedUrl(locale, `/publications/${pub.slug}`)}): ${desc} (published ${releaseDateIso(pub.releaseDate)})`);
    }
    lines.push("");
  }
  lines.push("## Full text");
  lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): the full text of every article, in English and French`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
