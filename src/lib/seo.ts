// Single source of truth for the firm's details and page metadata.
// Fill the placeholders marked TODO before deploying. Empty strings are skipped in the schema.

import type { Metadata } from "next";

export const SITE_URL = "https://www.shaidaravocats.com";
export const SITE_NAME = "Sarah Haidar Avocat";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const OG_LOCALE: Record<Locale, string> = { en: "en_FR", fr: "fr_FR" };

export const FIRM = {
  name: SITE_NAME,
  legalName: "Sarah Haidar Avocat", // TODO: exact legal name if different
  lawyer: "Sarah Haidar",
  jobTitle: "Avocat, Doctor of Public Law",
  telephone: "", // TODO e.g. "+33 1 23 45 67 89"
  email: "", // TODO e.g. "contact@shaidaravocats.com"
  address: {
    streetAddress: "", // TODO
    addressLocality: "", // TODO e.g. "Paris"
    postalCode: "", // TODO e.g. "75008"
    addressCountry: "FR",
  },
  bar: "", // TODO e.g. "Barreau de Paris"
  bookingUrl: "", // TODO booking link if any
  sameAs: [
    // TODO: add real profile URLs
    // "https://www.linkedin.com/in/...",
    // "https://www.avocat.fr/...",
  ] as string[],
  languages: ["French", "English", "Arabic"],
  consultationFee: "150 EUR including VAT",
  ogImage: "/og-image.jpg", // TODO: add a 1200x630 image to /public/og-image.jpg
};

export const SERVICES = [
  "Residence permit applications and renewals",
  "Regularization of status in France",
  "Talent passport and professional mobility",
  "Entrepreneur, artist and business creation visas",
  "Family reunification",
  "French naturalization",
  "Corporate immigration and international talent recruitment",
];

export const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  en: "Sarah Haidar, avocat and Doctor of Public Law. Law firm dedicated to immigration law and international mobility in France: residence permits, visas, talent passport, regularization and naturalization for individuals and companies.",
  // TODO (fr): confirm French wording
  fr: "Sarah Haidar Avocat : titres de séjour, visas, passeport talent et naturalisation pour particuliers et entreprises. Cabinet dédié au droit des étrangers et à la mobilité internationale en France.",
};

export const DEFAULT_TITLE: Record<Locale, string> = {
  en: "Immigration Lawyer in France | Sarah Haidar Avocat",
  fr: "Avocat en droit des étrangers en France | Sarah Haidar Avocat",
};

// Site pages. `path` is the route without the locale prefix ("" is the homepage).
export type PageKey = "home" | "aboutMe" | "areaOfExpertise" | "publications" | "contact";

export const PAGES: Record<PageKey, { path: string }> = {
  home: { path: "" },
  aboutMe: { path: "/aboutMe" },
  areaOfExpertise: { path: "/areaOfExpertise" },
  publications: { path: "/publications" },
  contact: { path: "/contact" },
};

type PageMeta = { title: string; description: string; ogTitle?: string; ogDescription?: string; ogType?: "website" | "profile" };

// French entries marked TODO (fr) reuse the English text until French copy is provided.
export const PAGE_META: Record<Locale, Record<Exclude<PageKey, "home">, PageMeta>> = {
  en: {
    aboutMe: {
      title: "About Sarah Haidar, Avocat and Doctor of Public Law",
      description:
        "Sarah Haidar is a lawyer, Doctor of Public Law and lecturer in corporate law, practising immigration law in France with expertise in anti-corruption and compliance, with a focus on Arab countries.",
      ogDescription:
        "Lawyer, Doctor of Public Law and lecturer in corporate law. Immigration law in France, anti-corruption and compliance.",
      ogType: "profile",
    },
    areaOfExpertise: {
      title: "Immigration Law Services in France: Residence Permits, Visas, Naturalization",
      description:
        "Residence permit applications and renewals, regularization, talent passport, entrepreneur, artist and business creation visas, family reunification and French naturalization. For individuals and companies hiring international talent.",
      ogTitle: "Immigration Law Services in France",
      ogDescription:
        "Residence permits, talent passport, visas, regularization and naturalization. For individuals and companies.",
    },
    publications: {
      title: "Publications on Immigration Law, Public Law and Compliance",
      description:
        "Articles and academic publications by Sarah Haidar, Doctor of Public Law, on immigration law, international mobility, anti-corruption and compliance.",
      ogTitle: "Publications by Sarah Haidar",
      ogDescription: "Articles and academic work on immigration law, public law and compliance.",
    },
    contact: {
      title: "Contact Sarah Haidar Avocat",
      description: "Book a consultation: €150 incl. VAT, deducted from fees if the case is taken on.",
    },
  },
  fr: {
    aboutMe: {
      title: "À propos de Sarah Haidar, avocate et docteure en droit public", // assembled from existing fr.json wording, confirm
      description:
        "Sarah Haidar is a lawyer, Doctor of Public Law and lecturer in corporate law, practising immigration law in France with expertise in anti-corruption and compliance, with a focus on Arab countries.", // TODO (fr)
      ogType: "profile",
    },
    areaOfExpertise: {
      title: "Services en droit des étrangers en France",
      description:
        "Residence permit applications and renewals, regularization, talent passport, entrepreneur, artist and business creation visas, family reunification and French naturalization. For individuals and companies hiring international talent.", // TODO (fr)
    },
    publications: {
      title: "Publications", // TODO (fr)
      description:
        "Articles and academic publications by Sarah Haidar, Doctor of Public Law, on immigration law, international mobility, anti-corruption and compliance.", // TODO (fr)
    },
    contact: {
      title: "Contact Sarah Haidar Avocat",
      description: "Book a consultation: €150 incl. VAT, deducted from fees if the case is taken on.", // TODO (fr)
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localizedPath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

export function localizedUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

// hreflang map for a given route: en, fr and x-default (x-default points to English).
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: localizedPath("en", path),
    fr: localizedPath("fr", path),
    "x-default": localizedPath("en", path),
  };
}

// Builds the metadata for a section page (used by the per-page layout.tsx files).
export function buildPageMetadata(locale: Locale, page: Exclude<PageKey, "home">): Metadata {
  const meta = PAGE_META[locale][page];
  const path = PAGES[page].path;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      url: localizedPath(locale, path),
      type: meta.ogType ?? "website",
      locale: OG_LOCALE[locale],
    },
  };
}
