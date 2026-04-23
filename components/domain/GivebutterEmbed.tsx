"use client";

import Script from "next/script";
import { createElement, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isPlaceholder } from "@/lib/content/isPlaceholder";

type GivebutterEmbedProps = {
  accountId: string;
  campaignId: string;
};

function SetupFallback() {
  return (
    <div className="flex min-h-[560px] flex-col justify-center gap-5 border border-hairline bg-ground-2 p-8 sm:p-10">
      <Eyebrow>Give by email</Eyebrow>
      <p className="text-balance text-heading-4 text-ink">
        While we finish wiring up our Givebutter campaign, write us and a board member will send
        secure payment details the same day.
      </p>
      <p className="max-w-[52ch] text-body text-ink-2">
        Check, wire transfer, or a direct Givebutter link — whichever works for you. Monthly or
        one-time, any amount helps keep a student in the classroom.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          href="mailto:info@bridginggenerations.org?subject=I'd%20like%20to%20donate"
        >
          Email the board
        </Button>
        <Button variant="secondary" href="mailto:info@bridginggenerations.org">
          info@bridginggenerations.org
        </Button>
      </div>
    </div>
  );
}

export function GivebutterEmbed({ accountId, campaignId }: GivebutterEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  // Both values must be real Givebutter dashboard values — accountId (acct= in
  // the widget script URL) and campaignId (<givebutter-widget id>). If either
  // is a [CONFIRM:] stub the widget-core script would error in the console and
  // render nothing, so we show an honest email-us CTA instead.
  const accountReady = accountId && !isPlaceholder(accountId);
  const campaignReady = campaignId && !isPlaceholder(campaignId);
  if (!accountReady || !campaignReady) {
    return <SetupFallback />;
  }

  const scriptSrc = `https://widgets.givebutter.com/latest.umd.cjs?acct=${encodeURIComponent(
    accountId,
  )}&p=other`;

  return (
    <div className="relative min-h-[560px] bg-ground-2">
      {!loaded ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col gap-4 p-6 motion-safe:animate-pulse"
        >
          <div className="h-8 w-1/2 bg-ground-3" />
          <div className="h-24 w-full bg-ground-3" />
          <div className="h-12 w-3/4 bg-ground-3" />
          <div className="h-12 w-3/4 bg-ground-3" />
          <div className="mt-auto h-12 w-full bg-ground-3" />
        </div>
      ) : null}
      <Script src={scriptSrc} strategy="afterInteractive" onLoad={() => setLoaded(true)} />
      {createElement("givebutter-widget", { id: campaignId, className: "block w-full" })}
      <noscript>
        <p className="p-6 text-body text-ink-2">
          Donations require JavaScript. If you'd rather give by check, email{" "}
          <a
            href="mailto:info@bridginggenerations.org"
            className="text-accent underline underline-offset-[3px]"
          >
            info@bridginggenerations.org
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
