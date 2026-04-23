import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DonorCountBadge } from "@/components/domain/DonorCountBadge";

describe("DonorCountBadge", () => {
  it("renders the count label", () => {
    render(<DonorCountBadge count={110} label="donors and counting" />);
    expect(screen.getByText("donors and counting")).toBeInTheDocument();
  });

  it("announces the full count to assistive tech", () => {
    render(<DonorCountBadge count={110} label="donors and counting" />);
    expect(screen.getByLabelText("110 donors and counting")).toBeInTheDocument();
  });

  it("keeps the final value accessible to screen readers via sr-only", () => {
    const { container } = render(<DonorCountBadge count={110} label="donors" />);
    const srOnly = container.querySelector(".sr-only");
    expect(srOnly).not.toBeNull();
    expect(srOnly).toHaveTextContent("110");
  });

  it("hides the animating visual from assistive tech", () => {
    const { container } = render(<DonorCountBadge count={110} label="donors" />);
    const visual = container.querySelector('[aria-hidden="true"]');
    expect(visual).not.toBeNull();
  });
});
