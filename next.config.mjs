/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Remove any client-side environment variable exposure
  env: {},
  // Ensure sensitive variables stay server-side only
  serverRuntimeConfig: {
    // Server-side only variables
  },
  publicRuntimeConfig: {
    // Only public variables here
  },
}

export default nextConfig
