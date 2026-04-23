import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Keystatic — Bridging Generations",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-white text-ink">{children}</body>
    </html>
  );
}
