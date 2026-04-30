/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use output: 'export' for static site generation (required for GitHub Pages)
  output: 'export',
  
  // Ensure images are handled correctly for static export
  images: {
    unoptimized: true,
  },
  
  // Use the repository name as the base path for GitHub Pages only when building in CI
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
};

module.exports = nextConfig;
