// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      // Tambahkan domain Cloudinary di sini
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    config.externals = config.externals || [];
    if (isServer) {
      if (!config.externals.includes('firebase-admin')) {
        config.externals.push('firebase-admin');
      }
      config.externals.push(
        'child_process',
        'fs',
        'path',
        'net',
        'tls',
        'dns'
      );
    }
    return config;
  },
};

export default nextConfig;

