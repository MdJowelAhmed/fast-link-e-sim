/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Airalo assets
      { protocol: "https", hostname: "cdn-revamp.airalo.com" },
      { protocol: "https", hostname: "sandbox.airalo.com" },
      // Flags & misc
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
};

export default nextConfig;
