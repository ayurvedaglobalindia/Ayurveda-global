const fs = require("fs");
const isTermux = fs.existsSync("/data/data/com.termux");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development" || isTermux,
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  turbopack: {},
  allowedDevOrigins: [
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
    '192.0.0.2',
    '192.0.0.2:3000',
    '172.30.216.172',
    '172.30.216.172:3000',
  ],
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
    if (isTermux && config.optimization && Array.isArray(config.optimization.minimizer)) {
      config.optimization.minimizer.forEach((m) => {
        if (m && m.options) {
          m.options.parallel = false;
        }
      });
    }
    return config
  },
}

module.exports = withPWA(nextConfig)
