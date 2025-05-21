/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static assets are properly handled
  images: {
    unoptimized: true,
  },
  // Ensure large media files are handled properly
  experimental: {
    largePageDataBytes: 128 * 100000, // Increase the limit for large page data
  },
  // Configure asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  // Make sure all assets are included in the build
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
}

export default nextConfig
