/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    URL: 'http://localhost:3002',
    URLIMAGENES :  'http://localhost:3002/logos_empresas_seguros/',
  },
  // images: {
  //   loader: 'imgix',
  //   path: 'http://localhost:3002/logos_empresas_seguros/',
  // }
}

module.exports = nextConfig

