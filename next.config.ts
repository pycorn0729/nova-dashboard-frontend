import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/competitions",
      permanent: true,
    },
  ],
  theme: {
    colorScheme: 'light',
    themeMode: 'light',
  },
};

export default nextConfig;
