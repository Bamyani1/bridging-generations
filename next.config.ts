import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

// Report-only until Phase 10.6 flips this to an enforcing `Content-Security-Policy`.
// Allowlist covers Givebutter embed (Phase 8) and Fathom analytics (Phase 10.2).
// Resend is server-side only and does not require CSP entries.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://givebutter.com https://widgets.givebutter.com https://cdn.usefathom.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://cdn.usefathom.com https://api.usefathom.com",
  "frame-src 'self' https://givebutter.com https://widgets.givebutter.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://givebutter.com",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const analyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "1",
  openAnalyzer: false,
});

export default analyze(nextConfig);
