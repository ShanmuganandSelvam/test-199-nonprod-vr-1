/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   distDir: 'dist',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
  
//   // Add these for custom base path deployment
//   basePath: '/preview', 
//   assetPrefix: '/preview',
// };

// module.exports = nextConfig;
