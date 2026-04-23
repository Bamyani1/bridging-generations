import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getDonatePage } from "@/lib/content/donatePage";
import { getSiteSettings } from "@/lib/content/siteSettings";
import { NextStepsGrid } from "./_components/NextStepsGrid";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting Bridging Generations.",
  robots: { index: false, follow: false },
};

export default async function DonateThankYouPage() {
  const [donatePage, siteSettings] = await Promise.all([getDonatePage(), getSiteSettings()]);

  return (
    <>
      <section
        aria-labelledby="thank-you-hero-title"
        className="bg-ground-3 px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
      >
        <Reveal>
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
            <Eyebrow>Thank you</Eyebrow>
            <h1
              id="thank-you-hero-title"
              className="max-w-[22ch] text-balance text-display-2 text-ink"
            >
              Your support changes a child's year.
            </h1>
            <p className="max-w-[60ch] whitespace-pre-line text-body-lg text-ink-2">
              {donatePage.thankYouBody}
            </p>
          </div>
        </Reveal>
      </section>
      <section
        aria-labelledby="thank-you-receipt-title"
        className="bg-ground-2 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
      >
        <Reveal>
          <div className="mx-auto flex max-w-[900px] flex-col gap-3 bg-ground p-8">
            <h2
              id="thank-you-receipt-title"
              className="text-eyebrow uppercase tracking-[0.1em] text-accent"
            >
              Your receipt
            </h2>
            <p className="text-body text-ink-2">
              Givebutter emails your tax-deductible receipt automatically. If it does not arrive
              within 24 hours, check spam or write to{" "}
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="text-accent underline underline-offset-[3px] transition hover:text-accent-2-text"
              >
                {siteSettings.contactEmail}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>
      <NextStepsGrid />
      <section
        aria-labelledby="thank-you-share-title"
        className="bg-ground px-4 pb-20 sm:px-6 lg:px-[6%] lg:pb-28"
      >
        <Reveal>
          <p
            id="thank-you-share-title"
            className="mx-auto max-w-[900px] text-center text-meta uppercase tracking-[0.1em] text-ink-2"
          >
            Telling a friend is the single most helpful thing you can do next.
          </p>
        </Reveal>
      </section>
    </>
  );
}
