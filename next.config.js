/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    domains: [
      'dev-otimize-cms-bucket.s3.us-east-2.amazonaws.com',
      'public-staging-cms.s3.us-east-2.amazonaws.com',
      'public-disruptiveverse-cms.s3.us-east-2.amazonaws.com',
      'pbs.twimg.com',
      'public-prod-cms-resource.s3.amazonaws.com',
      'video.twimg.com',
      'cdn.coinranking.com',
      'abs.twimg.com',
    ],
  },
}

module.exports = nextConfig
