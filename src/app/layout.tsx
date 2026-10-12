

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "@/i18n/routing";
import { getLocale, setRequestLocale } from "next-intl/server";
import Navbar from "./components/navbar/navbar";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	FIRM,
	OG_LOCALE,
	SITE_NAME,
	SITE_URL,
	isLocale,
	languageAlternates,
	localizedPath,
	type Locale,
} from "@/lib/seo";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// This layout sits above the [locale] segment, so the locale is read from the request
// (set by the next-intl middleware) rather than from params.
async function currentLocale(): Promise<Locale> {
	const locale = await getLocale();
	return isLocale(locale) ? locale : "en";
}

export async function generateMetadata(): Promise<Metadata> {
	const locale = await currentLocale();
	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: DEFAULT_TITLE[locale],
			template: `%s | ${SITE_NAME}`,
		},
		description: DEFAULT_DESCRIPTION[locale],
		applicationName: SITE_NAME,
		authors: [{ name: FIRM.lawyer, url: `${SITE_URL}${localizedPath(locale, "/aboutMe")}` }],
		creator: FIRM.lawyer,
		keywords: [
			"immigration lawyer France",
			"avocat droit des étrangers",
			"residence permit France lawyer",
			"titre de séjour avocat",
			"talent passport lawyer",
			"passeport talent avocat",
			"French naturalization lawyer",
			"naturalisation avocat",
			"regularization France lawyer",
			"business creation visa France",
			"Sarah Haidar avocat",
		],
		alternates: {
			canonical: localizedPath(locale, ""),
			languages: languageAlternates(""),
		},
		openGraph: {
			type: "website",
			url: localizedPath(locale, ""),
			siteName: SITE_NAME,
			title: DEFAULT_TITLE[locale],
			description: DEFAULT_DESCRIPTION[locale],
			locale: OG_LOCALE[locale],
			images: [
				{
					url: FIRM.ogImage,
					width: 1200,
					height: 630,
					alt: "Sarah Haidar, immigration lawyer in France",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: DEFAULT_TITLE[locale],
			description: DEFAULT_DESCRIPTION[locale],
			images: [FIRM.ogImage],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
		},
		formatDetection: { telephone: true, email: true, address: true },
	};
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const locale = await currentLocale();
	return (
		<html lang={locale}>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>

				<NextIntlClientProvider>
					<Navbar></Navbar>
					{children}
					<JsonLd locale={locale} />
				</NextIntlClientProvider>
			</body>
			<Script async src={"https://www.googletagmanager.com/gtag/js?id=" + process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}></Script>
			<Script>
				{`window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');`}
			</Script>
		</html>
	);
}
