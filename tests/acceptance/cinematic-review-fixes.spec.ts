import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];

test('opening skip control stays usable on mobile with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const skip = page.locator('#cinematic-skip');
  await expect(skip).toBeVisible();
  await skip.click();
  await expect(page.getByRole('main')).toBeFocused();
});

test('public pages omit temporary copy from body and document metadata', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(/PENDING|EMPTY FILE|WORKING IDENTITY|PROVISIONAL|NOT YET VERIFIED/i);
    await expect(page.locator('head')).not.toContainText(/PENDING|WORKING IDENTITY|PROVISIONAL/i);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /PENDING|WORKING IDENTITY|PROVISIONAL/i);
  }
});

test('opening keeps the HTML heading and hero line in the desktop first viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'ONCALL' })).toBeInViewport({ ratio: 1 });
  await expect(page.getByText('NIGHT SHIFT FOR THE TERMINALLY ONLINE.', { exact: true })).toBeInViewport({ ratio: 1 });
});
