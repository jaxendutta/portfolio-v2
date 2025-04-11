import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["i.gifer.com", "media.giphy.com"],
    },
};

export default nextConfig;
