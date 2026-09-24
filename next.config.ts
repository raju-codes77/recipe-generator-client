import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return {
      beforeFiles: [
        {
          source: '/dashboard/user',
          destination: '/dashboard/users',
        },
        {
          source: '/dashboard/user/:path*',
          destination: '/dashboard/users/:path*',
        },
      ],
      afterFiles: [],
      fallback: [
        {
          source: '/api/:path*',
          destination: `${backendUrl}/api/:path*`,
        },
      ],
    };
  },
  reactCompiler: true,
  experimental: {
    // Disable automatic web-vitals attribution which throws a TypeError in
    // certain browsers: "Cannot read properties of undefined (reading 'startTime')"
    // This is caused by the PerformanceObserver firing before all entries are ready.
    webVitalsAttribution: [],
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gulabuz.org.au',
      },
      {
        protocol: "https",
        hostname: "**", 
      },
      {
        protocol: "http",
        hostname: "**", 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      { protocol: "https", hostname: "source.unsplash.com" }
    ]
  },
};

export default nextConfig;
