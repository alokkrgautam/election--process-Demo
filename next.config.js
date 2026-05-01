/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure images are handled correctly
  images: {
    unoptimized: true,
  },
  
  // Use the repository name as the base path for GitHub Pages only when building in CI
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/election--process-Demo' : '',
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com https://*.firebaseio.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
