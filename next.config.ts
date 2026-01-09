import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com', // <--- ¡ESTO ES LO NUEVO!
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Mantenemos el anterior por si acaso
      },
      {
        protocol: 'https',
        hostname: 'www.upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;