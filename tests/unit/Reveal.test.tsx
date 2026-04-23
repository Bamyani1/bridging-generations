import { render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/ui/Reveal";

type IntersectionEntryLike = { isIntersecting: boolean };
type IOCallback = (entries: IntersectionEntryLike[]) => void;

let observers: IOCallback[] = [];

class MockIntersectionObserver {
  callback: IOCallback;
  constructor(cb: IOCallback) {
    this.callback = cb;
    observers.push(cb);
  }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reveal", () => {
  it("renders children inside a reveal-on-scroll root", () => {
    const { container } = render(<Reveal>hello</Reveal>);
    const root = container.querySelector(".reveal-on-scroll");
    expect(root).not.toBeNull();
    expect(root).toHaveTextContent("hello");
  });

  it("toggles is-visible when the observer fires", () => {
    const { container } = render(<Reveal>child</Reveal>);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.classList.contains("is-visible")).toBe(false);
    act(() => {
      observers[0]?.([{ isIntersecting: true }]);
    });
    expect(root.classList.contains("is-visible")).toBe(true);
  });

  it("sets data-reveal-stagger when stagger is provided", () => {
    const { container } = render(<Reveal stagger="scale-in">x</Reveal>);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.dataset.revealStagger).toBe("scale-in");
  });

  it("omits data-reveal-stagger when stagger is not provided", () => {
    const { container } = render(<Reveal>x</Reveal>);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.hasAttribute("data-reveal-stagger")).toBe(false);
  });

  it("applies inline transitionDelay when delay is set", () => {
    const { container } = render(<Reveal delay={200}>x</Reveal>);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.style.transitionDelay).toBe("200ms");
  });

  it("cascade wraps each direct child with data-reveal-item and per-index --reveal-delay", () => {
    const { container } = render(
      <Reveal cascade cascadeDelay={150}>
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </Reveal>,
    );
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.hasAttribute("data-reveal-cascade")).toBe(true);
    const items = root.querySelectorAll("[data-reveal-item]");
    expect(items).toHaveLength(3);
    expect((items[0] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("0ms");
    expect((items[1] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("150ms");
    expect((items[2] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("300ms");
  });

  it("caps cumulative cascade delay at 600ms", () => {
    const { container } = render(
      <Reveal cascade cascadeDelay={200}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </Reveal>,
    );
    const items = container.querySelectorAll("[data-reveal-item]");
    expect((items[3] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("600ms");
    expect((items[4] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("600ms");
  });

  it("defaults cascadeDelay to 150ms", () => {
    const { container } = render(
      <Reveal cascade>
        <span>a</span>
        <span>b</span>
      </Reveal>,
    );
    const items = container.querySelectorAll("[data-reveal-item]");
    expect((items[1] as HTMLElement).style.getPropertyValue("--reveal-delay")).toBe("150ms");
  });

  it("does not wrap children in data-reveal-item when cascade is off", () => {
    const { container } = render(
      <Reveal>
        <span>a</span>
        <span>b</span>
      </Reveal>,
    );
    const items = container.querySelectorAll("[data-reveal-item]");
    expect(items).toHaveLength(0);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.hasAttribute("data-reveal-cascade")).toBe(false);
  });

  it("forwards className onto the root", () => {
    const { container } = render(<Reveal className="grid grid-cols-3">x</Reveal>);
    const root = container.querySelector(".reveal-on-scroll") as HTMLElement;
    expect(root.classList.contains("grid")).toBe(true);
    expect(root.classList.contains("grid-cols-3")).toBe(true);
  });
});
