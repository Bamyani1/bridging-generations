import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bridging Generations",
    template: "%s — Bridging Generations",
  },
  description:
    "Bridging Generations sponsors 156 students in the Chittagong Hill Tracts, Bangladesh — keeping kids in the classroom through tuition, books, daily meals, and materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ground text-body text-ink">
        <SkipLink />
        <header>
          <Nav />
        </header>
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none">
          {children}
        </main>
        <footer>{/* Footer lands here in PR 3.3 */}</footer>
      </body>
    </html>
  );
}
