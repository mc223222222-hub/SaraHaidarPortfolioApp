import { getLocale, getTranslations } from "next-intl/server";
import { FIRM, type Locale, isLocale, localizedPath } from "@/lib/seo";

// Rendered in the root layout under {children}. Gives every page visible contact details,
// descriptive internal links and the consultation fee. Labels come from messages/{locale}.json ("footer").
export default async function SiteFooter() {
  const rawLocale = await getLocale();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = await getTranslations("footer");
  const nav = await getTranslations("navbar");
  const { address } = FIRM;
  const hasAddress = address.streetAddress && address.addressLocality;

  return (
    <footer style={{ borderTop: "1px solid #e5e5e5", marginTop: 64, padding: "40px 24px", fontSize: 15 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <strong>{FIRM.name}</strong>
          <p>{t("tagline")}</p>
          {FIRM.bar && <p>{FIRM.bar}</p>}
        </div>

        <nav aria-label="Footer">
          <strong>{t("navigation")}</strong>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
            <li><a href={localizedPath(locale, "")}>{t("homeLink")}</a></li>
            <li><a href={localizedPath(locale, "/areaOfExpertise")}>{t("servicesLink")}</a></li>
            <li><a href={localizedPath(locale, "/aboutMe")}>{t("aboutLink")}</a></li>
            <li><a href={localizedPath(locale, "/publications")}>{nav("publications")}</a></li>
            <li><a href={localizedPath(locale, "/contact")}>{nav("contact")}</a></li>
          </ul>
        </nav>

        <address style={{ fontStyle: "normal" }}>
          <strong>{nav("contact")}</strong>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
            {FIRM.telephone && <li><a href={`tel:${FIRM.telephone.replace(/\s/g, "")}`}>{FIRM.telephone}</a></li>}
            {FIRM.email && <li><a href={`mailto:${FIRM.email}`}>{FIRM.email}</a></li>}
            {hasAddress && (
              <li>{address.streetAddress}, {address.postalCode} {address.addressLocality}, France</li>
            )}
            <li>{t("feeLine")}</li>
            {FIRM.bookingUrl && <li><a href={FIRM.bookingUrl}>{t("bookConsultation")}</a></li>}
          </ul>
        </address>
      </div>
      <p style={{ textAlign: "center", marginTop: 32, color: "#666" }}>
        © {new Date().getFullYear()} {FIRM.name}. {t("languagesLine")}
      </p>
    </footer>
  );
}
