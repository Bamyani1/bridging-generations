"use client";

import Script from "next/script";
import { createElement, useState } from "react";
import { isPlaceholder } from "@/lib/content/isPlaceholder";

type GivebutterEmbedProps = {
  accountId: string;
  campaignId: string;
};

export function GivebutterEmbed({ accountId, campaignId }: GivebutterEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  // Campaign id drives the widget element; without it we have nothing to mount.
  if (!campaignId || isPlaceholder(campaignId)) {
    return (
      <div className="bg-ground-2 p-6">
        <p className="text-body text-ink-2">
          Our donation widget is being set up. In the meantime, email{" "}
          <a
            href="mailto:info@bridginggenerations.org"
            className="text-accent underline underline-offset-[3px]"
          >
            info@bridginggenerations.org
          </a>{" "}
          and a board member will help you give.
        </p>
      </div>
    );
  }

  // Account id drives the widget-core analytics on the script url. When it's
  // absent or still a [CONFIRM:] stub we fall back to the campaign id — the
  // widget element still mounts and renders the form; widget-core just logs a
  // console warning about the acct value until a real id is filled in.
  const acct = accountId && !isPlaceholder(accountId) ? accountId : campaignId;
  const scriptSrc = `https://widgets.givebutter.com/latest.umd.cjs?acct=${encodeURIComponent(
    acct,
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
