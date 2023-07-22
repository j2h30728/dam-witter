/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'imagedelivery.net',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
