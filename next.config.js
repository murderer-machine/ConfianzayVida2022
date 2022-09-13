/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL: 'http://192.168.0.201:3002',
    URLIMAGENES :  'http://localhost:3002/logos_empresas_seguros/',
  },
  images: {
    loader: 'imgix',
    path: 'http://192.168.0.201:3002/logos_empresas_seguros/',
  }
}

module.exports = nextConfig

