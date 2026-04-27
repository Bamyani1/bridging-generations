import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import { ViewTransitionRoot } from "@/components/layout/ViewTransitionRoot";
import { Button } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/content/siteSettings";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const siteSettings = await getSiteSettings();

  return (
    <ViewTransitionRoot>
      <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
        <body className="flex min-h-full flex-col bg-ground text-body text-ink">
          <SkipLink />
          <header>
            <Nav
              tagline={siteSettings.copy.footerTagline}
              contactEmail={siteSettings.contactEmail}
            />
          </header>
          <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none">
            <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24 lg:px-[6%]">
              <h1 className="text-display-2 text-ink">We can't find this page</h1>
              <p className="max-w-[44ch] text-body-lg text-ink-2">
                The link may be stale, or the page may have moved. The rest of the site is here —
                start with our students, or head back to the home page.
              </p>
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-4 text-meta uppercase tracking-[0.1em] text-ink-2">
                <li>Page not found</li>
                <li>404</li>
              </ul>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button href="/students" variant="primary">
                  Meet our students
                </Button>
                <Button href="/" variant="secondary">
                  Back home
                </Button>
              </div>
            </div>
          </main>
          <footer>
            <Footer
              ein={siteSettings.ein}
              mailingAddress={siteSettings.mailingAddress}
              tagline={siteSettings.copy.footerTagline}
              contactEmail={siteSettings.contactEmail}
              form990Url={siteSettings.form990Url || undefined}
              candidProfileUrl={siteSettings.candidProfileUrl || undefined}
              socialLinks={siteSettings.socialLinks}
            />
          </footer>
        </body>
      </html>
    </ViewTransitionRoot>
  );
}
