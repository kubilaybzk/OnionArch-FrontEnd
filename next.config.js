/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:7839/api/:path*",
    },
  ];
};

const nextConfig = { rewrites };

module.exports = nextConfig;
