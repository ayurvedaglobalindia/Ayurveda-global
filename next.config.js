/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    useWasmBinary: true,
    forceSwcTransforms: false,
  },
  webpack: (config, { dev, isServer }) => {
    config.optimization.minimize = false
    return config
  },
}

module.exports = nextConfig
