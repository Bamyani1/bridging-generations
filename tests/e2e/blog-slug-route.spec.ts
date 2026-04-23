import { expect, test } from "@playwright/test";

test("blog slug route renders header, MDX body, related posts, and CTA", async ({ page }) => {
  await page.goto("/blog/fall-2025-field-update");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Fall 2025 — what a full year of meals looked like",
  );

  // MDX h2 from the post body
  await expect(page.getByRole("heading", { name: "What changed" })).toBeVisible();

  // Author byline panel — scoped to the aside landmark to sidestep the meta row
  const byline = page.getByRole("complementary", { name: "About the author" });
  await expect(byline).toBeVisible();
  await expect(byline.getByText("Priya Ahmed")).toBeVisible();

  // Related posts heading + CTA
  await expect(page.getByRole("heading", { name: "Keep reading" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
    "href",
    "/donate",
  );
});

test("unknown blog slug renders 404", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});
