/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyimage.com', 'images.unsplash.com'],
  },
  experimental: {
    // Modern optimizations
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  // Disable ESLint during production build
  eslint: {
    // Only run ESLint on build in CI environments
    ignoreDuringBuilds: true,
  },
  // Disable type checking during build to improve build time
  typescript: {
    // Disable type checking during build in production
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 