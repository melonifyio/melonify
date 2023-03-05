/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/signpUpByLink": { page: "/signpUpByLink" },
    };
  },
};

module.exports = nextConfig;
