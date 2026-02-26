import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // i18n config removed - using client-side switching instead
};

export default nextConfig;