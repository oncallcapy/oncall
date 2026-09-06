import { expect, test } from "@playwright/test";

test("shows the mascot with a meaningful capybara description without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const image = page.getByTestId("oncall-mascot").getByRole("img", { name: /capybara/i });
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("width", /^\d+$/);
    await expect(image).toHaveAttribute("height", /^\d+$/);
    expect(await image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  } finally {
    await context.close();
  }
});

test("stops mascot animation for reduced motion and preserves keyboard focus visibility", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const mascot = page.getByTestId("oncall-mascot");
  await expect(mascot).toBeVisible();
  const duration = await mascot.evaluate((element) => getComputedStyle(element).animationDuration);
  expect(["0s", "0.001s"]).toContain(duration);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip/i });
  await expect(skipLink).toBeFocused();
  expect(await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
});
