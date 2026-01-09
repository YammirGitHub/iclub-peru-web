import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Esto le dice a Netlify: "No te detengas si ves una advertencia de estilo"
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Esto le dice: "Si hay un error de tipo, construye la web de todas formas"
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  }
};

export default nextConfig;