import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acdn-us.mitiendanube.com",
        pathname: "/stores/**",
      },
    ],
  },
};

export default nextConfig;
