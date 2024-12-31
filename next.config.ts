import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_BASE_URL: "http://127.0.0.1:8000/api/v1",
        NEXT_API_KEY: "881182541952993820593968",
        NEXT_NODE_ENV: "development"
    },
    images: {
        domains: [
            "cdn.pixabay.com",
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
