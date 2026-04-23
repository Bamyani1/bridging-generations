import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestimonialPanel } from "@/components/domain/TestimonialPanel";
import type { Testimonial } from "@/content/fixtures/testimonials";

const sample: Testimonial = {
  id: "demo",
  quote: "A meaningful quote worth remembering.",
  speakerName: "Jane Doe",
  speakerTitle: "Founder, Example Org",
  speakerRole: "board",
  featured: true,
};

describe("TestimonialPanel", () => {
  it("renders the quote inside a blockquote", () => {
    render(<TestimonialPanel testimonial={sample} />);
    const block = screen.getByRole("blockquote");
    expect(block).toHaveTextContent(sample.quote);
  });

  it("renders the speaker name and title", () => {
    render(<TestimonialPanel testimonial={sample} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Founder, Example Org")).toBeInTheDocument();
  });

  it("falls back to the capitalized role when no title is set", () => {
    const { getByText } = render(
      <TestimonialPanel testimonial={{ ...sample, speakerTitle: undefined }} />,
    );
    expect(getByText("Board")).toBeInTheDocument();
  });

  it("renders the CTA linking to /donate by default", () => {
    render(<TestimonialPanel testimonial={sample} />);
    const cta = screen.getByRole("link", { name: "Join our mission" });
    expect(cta).toHaveAttribute("href", "/donate");
  });

  it("wires the section landmark to the quote via aria-labelledby", () => {
    const { container } = render(<TestimonialPanel testimonial={sample} titleId="custom-id" />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "custom-id");
    expect(container.querySelector("#custom-id")).not.toBeNull();
  });
});
