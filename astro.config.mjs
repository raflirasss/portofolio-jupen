// @ts-check
import { defineConfig } from "astro/config";

// Static output — deploys to Vercel (or any static host) with zero configuration.
export default defineConfig({
  // Set this to your production URL for correct canonical / Open Graph tags.
  site: "https://your-portfolio.vercel.app",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: false,
});
