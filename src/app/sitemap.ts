import type { MetadataRoute } from "next";
import { LOCALES, localizedUrl } from "@/lib/seo";
import publicationsData from "@/data/publicationsData.json";
import { releaseDateIso } from "@/lib/publications";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

// Routes without the locale prefix. Each one is emitted once per locale with hreflang alternates.
// Add new routes here as pages are created (service pages, articles).
const ROUTES: { path: string; priority: number; changeFrequency: ChangeFrequency; lastModified?: string }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/areaOfExpertise", priority: 0.9, changeFrequency: "monthly" },
  { path: "/aboutMe", priority: 0.8, changeFrequency: "yearly" },
  { path: "/publications", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ...publicationsData.content.map((pub) => ({
    path: `/publications/${pub.slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as ChangeFrequency,
    lastModified: releaseDateIso(pub.releaseDate),
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap((r) =>
    LOCALES.map((locale) => ({
      url: localizedUrl(locale, r.path),
      lastModified: r.lastModified ? new Date(r.lastModified) : now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          en: localizedUrl("en", r.path),
          fr: localizedUrl("fr", r.path),
          "x-default": localizedUrl("en", r.path),
        },
      },
    }))
  );
}
