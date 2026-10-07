/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  turbopack: {},
  experimental: {
    useWasmBinary: process.platform === 'android',
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },
}

module.exports = withPWA(nextConfig)
