import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { pickTileSize, ThankYouTile } from "@/components/domain/ThankYouTile";

describe("ThankYouTile", () => {
  it("renders the message", () => {
    render(<ThankYouTile message="Thank you for the work." />);
    expect(screen.getByText("Thank you for the work.")).toBeInTheDocument();
  });

  it("renders the year when provided", () => {
    render(<ThankYouTile message="Thanks." year={2024} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("omits the year when missing", () => {
    render(<ThankYouTile message="Thanks." />);
    expect(screen.queryByText(/\d{4}/)).toBeNull();
  });
});

describe("pickTileSize", () => {
  it("returns sm for short messages", () => {
    expect(pickTileSize(20)).toBe("sm");
    expect(pickTileSize(60)).toBe("sm");
  });

  it("returns md for medium messages", () => {
    expect(pickTileSize(80)).toBe("md");
    expect(pickTileSize(140)).toBe("md");
  });

  it("returns lg for long messages", () => {
    expect(pickTileSize(200)).toBe("lg");
  });
});
