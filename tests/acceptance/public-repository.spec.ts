import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];
const repositoryUrl = 'https://github.com/oncallcapy/oncall';

for (const route of routes) {
  test(`${route} exposes the public repository in its footer without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto(route);
      const link = page.locator('footer').getByRole('link', { name: 'PUBLIC REPOSITORY', exact: true });
      await expect(link).toHaveAttribute('href', repositoryUrl);
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
      await link.focus();
      await expect(link).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    } finally {
      await context.close();
    }
  });
}

test('Sources & Risks also links the repository in its project record', async ({ page }) => {
  await page.goto('/sources-and-risks/');
  const record = page.getByRole('region', { name: 'Project record', exact: true });
  await expect(record.getByRole('link', { name: 'PUBLIC REPOSITORY', exact: true })).toHaveAttribute('href', repositoryUrl);
});
