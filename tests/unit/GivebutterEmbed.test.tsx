import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ src, onLoad: _onLoad }: { src: string; onLoad?: () => void }) => (
    <script data-testid="gb-script" data-src={src} />
  ),
}));

import { GivebutterEmbed } from "@/components/domain/GivebutterEmbed";

describe("GivebutterEmbed", () => {
  it("uses the account id as acct when both values are set", () => {
    const { getByTestId, container } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="ZbQ0n2" />,
    );
    expect(getByTestId("gb-script").getAttribute("data-src")).toBe(
      "https://widgets.givebutter.com/latest.umd.cjs?acct=bridging-generations&p=other",
    );
    expect(container.querySelector("givebutter-widget")?.getAttribute("id")).toBe("ZbQ0n2");
  });

  it("still mounts the widget when accountId is a placeholder, using the campaign id as a stand-in acct", () => {
    const { getByTestId, container } = render(
      <GivebutterEmbed
        accountId="[CONFIRM: acct= value from Givebutter dashboard embed code]"
        campaignId="ZbQ0n2"
      />,
    );
    expect(getByTestId("gb-script").getAttribute("data-src")).toBe(
      "https://widgets.givebutter.com/latest.umd.cjs?acct=ZbQ0n2&p=other",
    );
    expect(container.querySelector("givebutter-widget")?.getAttribute("id")).toBe("ZbQ0n2");
  });

  it("still mounts the widget when accountId is empty", () => {
    const { container } = render(<GivebutterEmbed accountId="" campaignId="ZbQ0n2" />);
    expect(container.querySelector("givebutter-widget")?.getAttribute("id")).toBe("ZbQ0n2");
  });

  it("renders the mailto fallback only when campaignId is missing", () => {
    const { container, queryByTestId } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="" />,
    );
    expect(queryByTestId("gb-script")).toBeNull();
    expect(container.querySelector("givebutter-widget")).toBeNull();
    expect(container.textContent).toMatch(/info@bridginggenerations.org/);
  });

  it("renders the mailto fallback when campaignId is a [CONFIRM:] stub", () => {
    const { container } = render(
      <GivebutterEmbed accountId="bridging-generations" campaignId="[CONFIRM: campaign code]" />,
    );
    expect(container.querySelector("givebutter-widget")).toBeNull();
    expect(container.textContent).toMatch(/info@bridginggenerations.org/);
  });
});
