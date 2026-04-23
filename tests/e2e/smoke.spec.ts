import { expect, test } from "@playwright/test";

test("home renders the placeholder heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bridging Generations" })).toBeVisible();
});
