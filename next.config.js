/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ext.same-assets.com' },
      { protocol: 'https', hostname: 'api-ck.686868.me' },
    ],
  },
};

module.exports = nextConfig;
