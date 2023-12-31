/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    loader: "akamai",
    path: "/",
    unoptimized: true,
  },
};
