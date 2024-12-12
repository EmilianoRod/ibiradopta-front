import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['7maravillas.uy','marcapaisuruguay.gub.uy'], // Puedes agregar otros dominios aquí si lo necesitas
    unoptimized: true, // Esto desactiva la optimización de imágenes
  },
  eslint:{
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
