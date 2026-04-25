import { expect, test } from "@playwright/test";

const INITIAL_FILTER = "saturate(0.4) sepia(0.25) brightness(1.02)";
const FINAL_FILTER = "saturate(1.02) sepia(0) brightness(1)";

test("BlogPostCard thumbnails carry the polaroid develop reveal", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/blog");

  // Pick a card whose top is below the fold so its IntersectionObserver hasn't fired.
  const belowFoldFilter = await page.evaluate(() => {
    const cards = [
      ...document.querySelectorAll(
        'article.card-hover .reveal-on-scroll[data-reveal-kind="develop"]',
      ),
    ];
    const target = cards.find((el) => el.getBoundingClientRect().top > window.innerHeight) as
      | HTMLElement
      | undefined;
    return target ? getComputedStyle(target).filter : null;
  });
  expect(belowFoldFilter, "expected at least one below-fold develop card on /blog").toBe(
    INITIAL_FILTER,
  );

  // Scroll that card into view and wait past the 900ms transition + a small buffer.
  await page.evaluate(() => {
    const cards = [
      ...document.querySelectorAll(
        'article.card-hover .reveal-on-scroll[data-reveal-kind="develop"]',
      ),
    ];
    const target = cards.find((el) => el.getBoundingClientRect().top > window.innerHeight);
    target?.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await page.waitForTimeout(1200);

  const settled = await page.evaluate(() => {
    const cards = [
      ...document.querySelectorAll(
        'article.card-hover .reveal-on-scroll[data-reveal-kind="develop"]',
      ),
    ];
    // After the prior scroll, every card whose top is now in the viewport has been observed.
    const inView = cards.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    }) as HTMLElement | undefined;
    return inView
      ? {
          filter: getComputedStyle(inView).filter,
          opacity: getComputedStyle(inView).opacity,
          isVisible: inView.classList.contains("is-visible"),
          developed: inView.classList.contains("developed"),
        }
      : null;
  });
  expect(settled).not.toBeNull();
  expect(settled?.filter).toBe(FINAL_FILTER);
  expect(settled?.opacity).toBe("1");
  expect(settled?.isVisible).toBe(true);
  expect(settled?.developed).toBe(true);
});

test("ActivityCard thumbnails carry the develop reveal on /activities", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/activities");

  const wraps = await page.evaluate(() => {
    return document.querySelectorAll(
      'article.card-hover .reveal-on-scroll[data-reveal-kind="develop"]',
    ).length;
  });
  expect(
    wraps,
    "expected ActivityCard to wrap its thumbnail in Reveal kind=develop",
  ).toBeGreaterThan(0);
});

test("SuccessStoryCard placeholder branch has NO develop wrap (consent gating)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/success-stories");

  // Cards whose subject withheld portrait consent render the placeholder branch.
  // The placeholder must not be wrapped in develop (no polaroid filter on a placeholder).
  const inventory = await page.evaluate(() => {
    return [...document.querySelectorAll("article.card-hover")].map((card) => ({
      hasDevelop: !!card.querySelector('.reveal-on-scroll[data-reveal-kind="develop"]'),
      hasPlaceholderSvg: !!card.querySelector("svg"),
    }));
  });

  for (const { hasDevelop, hasPlaceholderSvg } of inventory) {
    if (hasPlaceholderSvg && !hasDevelop) {
      // good — placeholder branch, no develop wrap, as designed
      continue;
    }
    if (hasDevelop && !hasPlaceholderSvg) {
      continue; // good — image branch with develop wrap
    }
    // anything else is a bug
    expect
      .soft({ hasDevelop, hasPlaceholderSvg }, "card branched into an unexpected shape")
      .toBeFalsy();
  }
});

test("reduced motion override exists in stylesheet for develop", async ({ page }) => {
  await page.goto("/");
  const found = await page.evaluate(() => {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        if (
          rule.constructor.name === "CSSMediaRule" &&
          (rule as CSSMediaRule).conditionText.includes("reduced-motion")
        ) {
          for (const inner of Array.from((rule as CSSMediaRule).cssRules)) {
            if (inner.cssText.includes('data-reveal-kind="develop"')) {
              return inner.cssText;
            }
          }
        }
      }
    }
    return null;
  });
  expect(found, "reduced-motion override for develop must be loaded").not.toBeNull();
  expect(found).toContain("filter: none");
});
