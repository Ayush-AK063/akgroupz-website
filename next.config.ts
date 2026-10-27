import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` and `next build` get separate output folders, so running a
  // production build while the dev server is up can't corrupt the dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
