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
  
    serverComponentsExternalPackages:['tailwindcss']
 
};

module.exports = nextConfig;