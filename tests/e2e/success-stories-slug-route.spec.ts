import { expect, test } from "@playwright/test";

test("success story slug route renders hero, pull-quote, MDX body, related, and CTA", async ({
  page,
}) => {
  await page.goto("/success-stories/priya-university-dhaka");

  // h1 is visually hidden but exists for screen readers
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Priya.*Success story/);

  // Pull-quote renders in a blockquote
  await expect(page.getByRole("blockquote").first()).toBeVisible();

  // Related stories section present if there are other stories
  await expect(page.getByRole("heading", { name: "Other stories" })).toBeVisible();

  await expect(page.getByRole("link", { name: "Donate now" })).toHaveAttribute("href", "/donate");
});

test("unknown success story slug renders 404", async ({ page }) => {
  const response = await page.goto("/success-stories/does-not-exist");
  expect(response?.status()).toBe(404);
});
