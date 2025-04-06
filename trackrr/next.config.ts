/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // For Next.js 15.2.4
  experimental: {
    serverComponentsExternalPackages: ['tailwindcss']
  }
};

module.exports = nextConfig;