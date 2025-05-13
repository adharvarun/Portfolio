import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
