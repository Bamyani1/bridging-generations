import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ src, onLoad: _onLoad }: { src: string; onLoad?: () => void }) => (
    <script data-testid="gb-script" data-src={src} />
  ),
}));

import { GivebutterEmbed } from "@/components/domain/GivebutterEmbed";

describe("GivebutterEmbed", () => {
  it("loads the widget script with the account id as acct, not the campaign id", () => {
    const { getByTestId } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="ZbQ0n2" />,
    );
    const script = getByTestId("gb-script");
    expect(script.getAttribute("data-src")).toBe(
      "https://widgets.givebutter.com/latest.umd.cjs?acct=bridging-generations&p=other",
    );
  });

  it("renders the widget element with id set to the campaign id", () => {
    const { container } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="ZbQ0n2" />,
    );
    const widget = container.querySelector("givebutter-widget");
    expect(widget).not.toBeNull();
    expect(widget?.getAttribute("id")).toBe("ZbQ0n2");
  });

  it("renders the fallback when accountId is missing", () => {
    const { container, queryByTestId } = render(
      <GivebutterEmbed accountId="" campaignId="ZbQ0n2" />,
    );
    expect(queryByTestId("gb-script")).toBeNull();
    expect(container.querySelector("givebutter-widget")).toBeNull();
    expect(container.textContent).toMatch(/info@bridginggenerations.org/);
  });

  it("renders the fallback when accountId is a [CONFIRM:] placeholder", () => {
    const { container, queryByTestId } = render(
      <GivebutterEmbed
        accountId="[CONFIRM: acct= value from Givebutter dashboard embed code]"
        campaignId="ZbQ0n2"
      />,
    );
    expect(queryByTestId("gb-script")).toBeNull();
    expect(container.querySelector("givebutter-widget")).toBeNull();
    expect(container.textContent).toMatch(/info@bridginggenerations.org/);
  });

  it("renders the fallback when campaignId is empty", () => {
    const { container, queryByTestId } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="" />,
    );
    expect(queryByTestId("gb-script")).toBeNull();
    expect(container.querySelector("givebutter-widget")).toBeNull();
  });
});
