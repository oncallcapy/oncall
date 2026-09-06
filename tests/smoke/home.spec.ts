import { expect, test } from "@playwright/test";

test("renders the on-shift home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "ONCALL" })).toBeVisible();
  await expect(page.getByText("STATUS / ON SHIFT")).toBeVisible();
  await expect(page.getByText("NIGHT SHIFT FOR THE TERMINALLY ONLINE.")).toBeVisible();
});
