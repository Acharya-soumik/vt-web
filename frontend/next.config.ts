import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CSS_TRANSFORMER_WASM: "1",
    NAPI_RS_FORCE_WASI: "1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
