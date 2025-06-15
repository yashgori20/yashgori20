/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Your repository name
  basePath: process.env.NODE_ENV === 'production' ? '/yashgori20' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/yashgori20/' : '',
}

module.exports = nextConfig
