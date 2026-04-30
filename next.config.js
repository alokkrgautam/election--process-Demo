/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: '.',
    },
  },
  // Ensure images are handled correctly
  images: {
    unoptimized: true,
  },
  
  // Use the repository name as the base path for GitHub Pages only when building in CI
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
};

module.exports = nextConfig;
