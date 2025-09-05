/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https://images.unsplash.com https://cdn.jsdelivr.net https://avatar.iran.liara.run",
      "connect-src 'self' https://api.github.com https://resend.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ')
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' }
];

const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.jsdelivr.net',
      'raw.githubusercontent.com',
      'avatar.iran.liara.run'
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};

module.exports = nextConfig;