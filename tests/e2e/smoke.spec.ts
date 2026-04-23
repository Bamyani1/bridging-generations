import { expect, test } from "@playwright/test";

test("home hero renders the headline and both CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("156 students.");
  await expect(page.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
    "href",
    "/donate",
  );
  await expect(page.getByRole("link", { name: "Our Programs" })).toHaveAttribute(
    "href",
    "/projects",
  );
});
