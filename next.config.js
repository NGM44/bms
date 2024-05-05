/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["source.unsplash.com", "tailus.io", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
