/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable standalone output for Docker
  output: 'standalone',

  // Disable ESLint during build for Docker
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Fix ChromaDB webpack issue
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize chromadb packages to prevent build errors
      config.externals = [...config.externals, 'chromadb', 'chromadb-default-embed'];
    }
    return config;
  },
}

module.exports = nextConfig
