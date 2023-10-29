/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5031",
        pathname: "/resource/product-images/**",
      },
    ],
  },
};
