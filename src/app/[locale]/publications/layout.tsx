import type { Metadata } from "next";
import { buildPageMetadata, isLocale } from "@/lib/seo";

// Unique title, description, canonical and hreflang for /{locale}/publications.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(isLocale(locale) ? locale : "en", "publications");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
