/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL: 'http://190.117.91.131:3002',
  },
  images: {
    loader: 'imgix',
    path: 'http://190.117.91.131:3002/logos_empresas_seguros/',
  }
}

module.exports = nextConfig

