// SEO-only strings that never appear as visible text on the site:
// visually hidden H1 headings, image alt attributes and the 404 page.
// Kept here (not in messages/*.json) so the visible copy files stay exactly as the site owner wrote them.

import type { Locale } from "@/lib/seo";

export const HIDDEN_H1: Record<Locale, Record<"home" | "aboutMe" | "areaOfExpertise" | "publications", string>> = {
  en: {
    home: "Immigration Lawyer in France",
    aboutMe: "Sarah Haidar, Avocat and Doctor of Public Law",
    areaOfExpertise: "Immigration Law Services in France",
    publications: "Publications on Immigration Law, Public Law and Compliance",
  },
  fr: {
    home: "Avocat en droit des étrangers en France",
    aboutMe: "Sarah Haidar, avocate et docteure en droit public",
    areaOfExpertise: "Services en droit des étrangers en France",
    publications: "Publications en droit des étrangers, droit public et conformité",
  },
};

export const ALT: Record<
  Locale,
  {
    eiffelTower: string;
    portrait: string;
    ladyJustice: string;
    palaisDeJustice: string;
    services: [string, string, string, string];
  }
> = {
  en: {
    eiffelTower: "Eiffel Tower, Paris, France",
    portrait: "Sarah Haidar, immigration lawyer in France",
    ladyJustice: "Lady Justice",
    palaisDeJustice: "Palais de Justice, Paris",
    services: [
      "Family reunification",
      "Visa applications",
      "Residence permits and passports",
      "Entrepreneur and business creation visas",
    ],
  },
  fr: {
    eiffelTower: "Tour Eiffel, Paris, France",
    portrait: "Sarah Haidar, avocate en droit des étrangers en France",
    ladyJustice: "Allégorie de la Justice",
    palaisDeJustice: "Palais de Justice de Paris",
    services: [
      "Regroupement familial",
      "Demandes de visa",
      "Titres de séjour et passeports",
      "Visas entrepreneur et création d’entreprise",
    ],
  },
};

export const NOT_FOUND: Record<Locale, { title: string; message: string }> = {
  en: { title: "Page not found", message: "The page you are looking for does not exist or has moved." },
  fr: { title: "Page introuvable", message: "La page que vous cherchez n’existe pas ou a été déplacée." },
};
