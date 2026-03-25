import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/main.html',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      }
    ]
  },
};

export default nextConfig;
