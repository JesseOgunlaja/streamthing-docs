/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/introduction",
      },
    ];
  },
};

export default nextConfig;
