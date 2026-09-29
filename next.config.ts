import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // NOC and EPQ have been removed — GCSE is the only qualification page.
    // /nocn and /epq never existed as routes in this repo, but are included
    // defensively in case any old external links used those spellings.
    return [
      { source: "/noc", destination: "/gcse", permanent: true },
      { source: "/nocn", destination: "/gcse", permanent: true },
      { source: "/epq", destination: "/gcse", permanent: true },
      {
        source: "/implementation",
        destination: "/curriculum-mapping",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
