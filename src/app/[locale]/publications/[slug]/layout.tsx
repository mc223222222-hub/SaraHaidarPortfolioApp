import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPublication, getPublicationCopy, releaseDateIso } from "@/lib/publications";
import { FIRM, OG_IMAGES, OG_LOCALE, SITE_NAME, SITE_URL, isLocale, languageAlternates, localizedPath, localizedUrl, twitterCard, type Locale } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : "en";
}

// Per-article title, description, canonical and hreflang. Unknown slugs get a 404.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const pub = findPublication(slug);
  if (!pub) return { title: "Page not found", robots: { index: false, follow: false } };

  const { title, description } = await getPublicationCopy(locale, pub);
  const path = `/publications/${pub.slug}`;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, path), languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url: localizedPath(locale, path),
      siteName: SITE_NAME,
      type: "article",
      locale: OG_LOCALE[locale],
      publishedTime: releaseDateIso(pub.releaseDate),
      authors: [FIRM.lawyer],
      images: OG_IMAGES,
    },
    twitter: twitterCard(title, description),
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const pub = findPublication(slug);
  if (!pub) notFound();

  const { title, description, category } = await getPublicationCopy(locale, pub);
  const url = localizedUrl(locale, `/publications/${pub.slug}`);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: locale,
    datePublished: releaseDateIso(pub.releaseDate),
    articleSection: category,
    image: `${SITE_URL}${FIRM.ogImage}`,
    author: { "@type": "Person", "@id": `${SITE_URL}/#sarah-haidar`, name: FIRM.lawyer, url: localizedUrl("en", "/aboutMe") },
    publisher: { "@id": `${SITE_URL}/#firm` },
  };

  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </>
  );
}
