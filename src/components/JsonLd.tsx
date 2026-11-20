import { DEFAULT_DESCRIPTION, DEFAULT_LOCALE, FIRM, SERVICES, SITE_URL, type Locale, localizedUrl } from "@/lib/seo";

function clean<T extends Record<string, unknown>>(obj: T): T {
  // Removes empty strings, empty arrays and empty objects so unfilled TODOs never ship as blank schema fields.
  // Objects that carry an "@id" (references such as { "@id": firmId }) are always kept.
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === "" || v === undefined || v === null) return false;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === "object") {
        const o = v as Record<string, unknown>;
        if ("@id" in o) return true;
        return Object.keys(clean(o)).some((k) => k !== "@type");
      }
      return true;
    })
  ) as T;
}

export default function JsonLd({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const firmId = `${SITE_URL}/#firm`;
  const personId = `${SITE_URL}/#sarah-haidar`;
  const homeUrl = localizedUrl(locale, "");

  const firm = clean({
    "@type": ["LegalService", "Attorney"],
    "@id": firmId,
    name: FIRM.name,
    legalName: FIRM.legalName,
    url: homeUrl,
    image: `${SITE_URL}${FIRM.ogImage}`,
    description: DEFAULT_DESCRIPTION[locale],
    telephone: FIRM.telephone,
    email: FIRM.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: FIRM.telephone,
      email: FIRM.email,
      availableLanguage: FIRM.languages,
    },
    employee: { "@id": personId },
    address: clean({ "@type": "PostalAddress", ...FIRM.address }),
    areaServed: { "@type": "Country", name: "France" },
    knowsLanguage: FIRM.languages,
    knowsAbout: [
      "Residence permits in France",
      "Talent passport",
      "Entrepreneur visa",
      "French naturalization",
      "Regularization of status",
      "Family reunification",
      "Corporate immigration",
    ],
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
    url: localizedUrl(locale, "/aboutMe"),
    image: `${SITE_URL}${FIRM.portrait}`,
    description:
      locale === "fr"
        ? "Avocate au Barreau de Paris, docteure en droit public et enseignante en droit des sociétés. Droit des étrangers en France, lutte anticorruption et conformité."
        : "Avocat in Paris, Doctor of Public Law and lecturer in corporate law. Immigration law in France, anti-corruption and compliance.",
    worksFor: { "@id": firmId },
    memberOf: FIRM.bar ? { "@type": "Organization", name: FIRM.bar } : "",
    knowsLanguage: FIRM.languages,
    knowsAbout: [
      "Immigration law in France",
      "International mobility",
      "Public law",
      "Anti-corruption and compliance",
      "Corporate law",
      "Residence permits",
      "French naturalization",
      "Talent passport",
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
    about: { "@id": firmId },
  };

  const data = { "@context": "https://schema.org", "@graph": [firm, person, website] };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
