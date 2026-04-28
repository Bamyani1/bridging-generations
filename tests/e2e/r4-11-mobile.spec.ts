import { expect, test } from "@playwright/test";

const IPHONE_17_PRO = { width: 402, height: 874 };

test.describe("R4.11 mobile completion gates", () => {
  test("StickyCTA renders on /donate at 402", async ({ page }) => {
    await page.setViewportSize(IPHONE_17_PRO);
    await page.goto("/donate");
    const stickyCta = page.getByRole("region", { name: "Donate" });
    await expect(stickyCta).toBeVisible();
  });

  test("Nav SheetDrawer closes via Escape at 402", async ({ page }) => {
    await page.setViewportSize(IPHONE_17_PRO);
    await page.goto("/");
    const hamburger = page.getByRole("button", { name: /open menu/i });
    await hamburger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(hamburger).toBeFocused();
  });

  test("Footer Accordion toggles on / at 402", async ({ page }) => {
    await page.setViewportSize(IPHONE_17_PRO);
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const explore = page.locator('details:has(summary:has-text("Explore"))').first();
    const contact = page.locator('details:has(summary:has-text("Contact"))').first();

    await expect(explore).toHaveAttribute("open", "");
    await expect(contact).not.toHaveAttribute("open", "");

    await contact.locator("summary").click();
    await expect(contact).toHaveAttribute("open", "");

    await contact.locator("summary").click();
    await expect(contact).not.toHaveAttribute("open", "");
  });

  test("/contact form inputs honor 16px iOS zoom guard", async ({ page }) => {
    await page.setViewportSize(IPHONE_17_PRO);
    await page.goto("/contact");
    const firstInput = page.locator('input[type="text"], input[type="email"], textarea').first();
    await expect(firstInput).toBeVisible();
    const fontSize = await firstInput.evaluate((el) =>
      Number.parseFloat(getComputedStyle(el).fontSize),
    );
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test("Mithun portrait honors portraitMobileFocalPoint at 402", async ({ page }) => {
    await page.setViewportSize(IPHONE_17_PRO);
    await page.goto("/success-stories/mithun-graduates");
    const portrait = page.locator(".mobile-fp img").first();
    await expect(portrait).toBeVisible();
    const objectPosition = await portrait.evaluate((el) => getComputedStyle(el).objectPosition);
    expect(objectPosition).toContain("25%");
  });
});
