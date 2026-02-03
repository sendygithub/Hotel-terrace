import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:
    [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "isi nanti"

      },
      {
        protocol: 'https',
        hostname: 'twxbisuimd7mxh3l.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      }
    ],
  },
};

export default nextConfig;
