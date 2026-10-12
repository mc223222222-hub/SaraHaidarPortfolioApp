import { DEFAULT_LOCALE, FIRM, SERVICES, SITE_URL, type Locale, localizedUrl } from "@/lib/seo";

function clean<T extends Record<string, unknown>>(obj: T): T {
  // Removes empty strings, empty arrays and empty objects so unfilled TODOs never ship as blank schema fields.
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === "" || v === undefined || v === null) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      if (typeof v === "object" && !Array.isArray(v) && Object.keys(clean(v as Record<string, unknown>)).length <= 1) return false;
      return true;
    })
  ) as T;
}

export default function JsonLd({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const firmId = `${SITE_URL}/#firm`;
  const personId = `${SITE_URL}/#sarah-haidar`;
  const homeUrl = localizedUrl(DEFAULT_LOCALE, "");

  const firm = clean({
    "@type": ["LegalService", "Attorney"],
    "@id": firmId,
    name: FIRM.name,
    legalName: FIRM.legalName,
    url: homeUrl,
    image: `${SITE_URL}${FIRM.ogImage}`,
    description:
      "Law firm dedicated to immigration law and international mobility in France, for individuals and companies.",
    telephone: FIRM.telephone,
    email: FIRM.email,
    address: clean({ "@type": "PostalAddress", ...FIRM.address }),
    areaServed: { "@type": "Country", name: "France" },
    knowsLanguage: FIRM.languages,
    priceRange: `Consultation ${FIRM.consultationFee}`,
    founder: { "@id": personId },
    sameAs: FIRM.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Immigration law services",
      itemListElement: SERVICES.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, areaServed: "France" },
      })),
    },
  });

  const person = clean({
    "@type": "Person",
    "@id": personId,
    name: FIRM.lawyer,
    jobTitle: FIRM.jobTitle,
    url: localizedUrl(DEFAULT_LOCALE, "/aboutMe"),
    worksFor: { "@id": firmId },
    memberOf: FIRM.bar ? { "@type": "Organization", name: FIRM.bar } : "",
    knowsLanguage: FIRM.languages,
    knowsAbout: [
      "Immigration law in France",
      "International mobility",
      "Public law",
      "Anti-corruption and compliance",
      "Corporate law",
    ],
    sameAs: FIRM.sameAs,
  });

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: homeUrl,
    name: FIRM.name,
    publisher: { "@id": firmId },
    inLanguage: locale,
  };

  const data = { "@context": "https://schema.org", "@graph": [firm, person, website] };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
