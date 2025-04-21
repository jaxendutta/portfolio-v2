import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["i.gifer.com", "media.giphy.com"],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
            allowedOrigins: ["*"],
        },
    },
};

export default nextConfig;
