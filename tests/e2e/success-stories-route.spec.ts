import { expect, test } from "@playwright/test";

test("success-stories route renders hero, card grid, and CTA", async ({ page }) => {
  await page.goto("/success-stories");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Success stories");

  const cards = page.getByRole("link", { name: /Read story/i });
  const count = await cards.count();
  expect(count).toBeGreaterThan(1);

  await expect(page.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
    "href",
    "/donate",
  );
});
