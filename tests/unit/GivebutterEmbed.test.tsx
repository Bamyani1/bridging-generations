import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ src, onLoad: _onLoad }: { src: string; onLoad?: () => void }) => (
    <script data-testid="gb-script" data-src={src} />
  ),
}));

import { GivebutterEmbed } from "@/components/domain/GivebutterEmbed";

describe("GivebutterEmbed", () => {
  it("loads the widget script with the real campaign id as acct", () => {
    const { getByTestId } = render(<GivebutterEmbed campaignId="ZbQ0n2" />);
    const script = getByTestId("gb-script");
    expect(script.getAttribute("data-src")).toBe(
      "https://widgets.givebutter.com/latest.umd.cjs?acct=ZbQ0n2&p=other",
    );
  });

  it("renders the widget custom element with id set to the campaign id", () => {
    const { container } = render(<GivebutterEmbed campaignId="ZbQ0n2" />);
    const widget = container.querySelector("givebutter-widget");
    expect(widget).not.toBeNull();
    expect(widget?.getAttribute("id")).toBe("ZbQ0n2");
  });

  it("renders a fallback and skips the script when campaignId is empty", () => {
    const { container, queryByTestId } = render(<GivebutterEmbed campaignId="" />);
    expect(queryByTestId("gb-script")).toBeNull();
    expect(container.querySelector("givebutter-widget")).toBeNull();
    expect(container.textContent).toMatch(/info@bridginggenerations.org/);
  });
});
