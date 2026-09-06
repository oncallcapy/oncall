import { expect, test } from "@playwright/test";

test("shows the decorative opening scene without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const image = page.locator('[data-scene-plate] img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", "");
    expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  } finally {
    await context.close();
  }
});

test("hides the opening control for reduced motion and preserves keyboard focus visibility", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('#cinematic-skip')).toBeHidden();
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip/i });
  await expect(skipLink).toBeFocused();
  expect(await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
});
