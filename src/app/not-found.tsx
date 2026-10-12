import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { type Locale, isLocale, localizedPath } from "@/lib/seo";

// Root 404 (unknown URLs such as /en/random-page). Lives next to the root layout so Next.js uses it for unmatched routes.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function NotFound() {
  const rawLocale = await getLocale();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations("notFound");
  const nav = await getTranslations("navbar");

  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1>{t("title")}</h1>
      <p>{t("message")}</p>
      <nav aria-label="Helpful links">
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href={localizedPath(locale, "")}>{nav("home")}</a></li>
          <li><a href={localizedPath(locale, "/areaOfExpertise")}>{nav("areaOfExpertise")}</a></li>
          <li><a href={localizedPath(locale, "/aboutMe")}>{nav("aboutMe")}</a></li>
          <li><a href={localizedPath(locale, "/publications")}>{nav("publications")}</a></li>
          <li><a href={localizedPath(locale, "/contact")}>{nav("contact")}</a></li>
        </ul>
      </nav>
    </main>
  );
}
