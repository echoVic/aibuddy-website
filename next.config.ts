import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
};

export default nextConfig;