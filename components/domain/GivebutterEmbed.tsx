"use client";

import Script from "next/script";
import { createElement, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isPlaceholder } from "@/lib/content/isPlaceholder";

type GivebutterEmbedProps = {
  accountId: string;
  campaignId: string;
};

function SetupFallback() {
  return (
    <div className="flex flex-col gap-6 border-t border-b border-hairline py-8 sm:py-10">
      <Eyebrow>While we are set up</Eyebrow>
      <p className="max-w-[44ch] text-balance text-display-2 text-ink">
        Write to the board and your gift is routed by hand.
      </p>
      <p className="max-w-[60ch] text-body-lg text-ink-2">
        The Givebutter campaign is being stood up. Until it is live, every gift — monthly or
        one-time, card or check or wire — is confirmed and routed personally. The board replies
        within two business days.
      </p>
      <p className="text-body-lg text-ink">
        <a
          href="mailto:info@bridginggenerations.org?subject=I%27d%20like%20to%20donate"
          className="text-accent underline underline-offset-[3px] transition hover:text-accent-2-text focus-visible:text-accent-2-text focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
        >
          info@bridginggenerations.org
        </a>
      </p>
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
