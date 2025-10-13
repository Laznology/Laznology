import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      }, {
      protocol: "https",
        hostname: "spcvbpnwlqcdpozamryb.supabase.co",
        pathname: "/**",
      }
    ],
  },
};

const withMDX = createMDX()

export default withMDX(nextConfig);
