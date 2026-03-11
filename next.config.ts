import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR mode for API routes (email, payments, webhooks)
  // Static export disabled for now - need real Clerk keys
};

export default nextConfig;
