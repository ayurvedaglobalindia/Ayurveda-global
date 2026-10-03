/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)[\\/]/)?.[1]
              return `npm.${packageName?.replace('@', '')}`
            },
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
