import { expect, test } from '@playwright/test';

test('opening exposes the physical eight-file navigation without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-cinematic-stage]')).toBeVisible();
  await expect(page.locator('[data-file-link]')).toHaveCount(8);
  await expect(page.getByRole('heading', { level: 1, name: 'ONCALL' })).toBeVisible();
  await page.getByRole('link', { name: /SCIENCE NOTES/i }).click();
  await expect(page).toHaveURL(/\/science\/$/);
  await context.close();
});

test('public shell contains no temporary-state language', async ({ page }) => {
  for (const route of ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/']) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(/PENDING|EMPTY FILE|WORKING IDENTITY|PROVISIONAL/i);
  }
});
