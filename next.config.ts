import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    // Forces apex -> www so Google sees one host.
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "shaidaravocats.com" }],
                destination: "https://www.shaidaravocats.com/:path*",
                permanent: true,
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
