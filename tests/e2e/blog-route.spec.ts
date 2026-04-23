import { expect, test } from "@playwright/test";

test("blog route renders hero, featured post, post grid, and CTA", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Our blog");

  await expect(page.getByText("Featured post")).toBeVisible();

  const postLinks = page.getByRole("link", { name: /field update|allocate/i });
  const count = await postLinks.count();
  expect(count).toBeGreaterThan(0);

  await expect(page.getByRole("link", { name: "Donate now" })).toHaveAttribute("href", "/donate");
});
