

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Navbar from "./components/navbar/navbar";
import Script from "next/script";

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

export const metadata: Metadata = {
	title: "Sarah Haidar Avocat",
	description: "Sarah Haidar Avocat",
};

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>

				<NextIntlClientProvider>
					<Navbar></Navbar>
					{children}
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
