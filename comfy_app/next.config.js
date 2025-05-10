/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/api/comfy/:path*",
        destination: "http://comfy-ui:8188/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
