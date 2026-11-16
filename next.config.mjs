/** @type {import('next').NextConfig} */
const nextConfig = {
  // Arwes animator does not support React StrictMode double-mounting.
  reactStrictMode: false,
  async redirects() {
    return [{ source: '/', destination: '/tr', permanent: false }];
  },
};

export default nextConfig;
