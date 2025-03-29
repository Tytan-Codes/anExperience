import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'], // Allow GitHub raw domain
  },
};

export default nextConfig;