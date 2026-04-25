import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgressRule } from "@/components/layout/ScrollProgressRule";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ViewTransitionRoot } from "@/components/layout/ViewTransitionRoot";
import { SITE_URL } from "@/lib/seo/siteUrl";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bridging Generations",
    template: "%s — Bridging Generations",
  },
  description:
    "Bridging Generations sponsors 156 students in the Chittagong Hill Tracts, Bangladesh — keeping kids in the classroom through tuition, books, daily meals, and materials.",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitionRoot>
      <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
        <head>
          <link rel="preconnect" href="https://widgets.givebutter.com" crossOrigin="" />
          <link rel="dns-prefetch" href="https://givebutter.com" />
        </head>
        <body className="flex min-h-full flex-col bg-ground text-body text-ink">
          <ScrollProgressRule />
          <SmoothScroll />
          <SkipLink />
          <header>
            <Nav />
          </header>
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 overflow-x-clip pt-16 outline-none"
          >
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </ViewTransitionRoot>
  );
}
