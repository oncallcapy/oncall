import { expect, test } from "@playwright/test";

test("renders the pre-launch home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "ONCALL" })).toBeVisible();
  await expect(page.getByText("STATUS: UNDER OBSERVATION")).toBeVisible();
  await expect(page.getByText("LAUNCH PENDING")).toBeVisible();
});
