/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7039',
        pathname: '/resource/product-images/**',
      },
    ],
  },
};
