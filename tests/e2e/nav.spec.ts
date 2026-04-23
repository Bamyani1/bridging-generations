import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("primary nav is keyboard reachable on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const banner = page.getByRole("banner");
  await page.keyboard.press("Tab"); // skip link
  await page.keyboard.press("Tab"); // brand
  await expect(banner.getByRole("link", { name: "Bridging Generations" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(banner.getByRole("link", { name: "About" })).toBeFocused();
});

test("mobile menu opens, traps focus, and closes on escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hamburger = page.getByRole("button", { name: /open menu/i });
  await hamburger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");

  const close = dialog.getByRole("button", { name: /close menu/i });
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(hamburger).toBeFocused();
});

test("home route has zero axe violations with nav mounted", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
