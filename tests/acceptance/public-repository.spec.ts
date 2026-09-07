import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];
const repositoryUrl = 'https://github.com/oncallcapy/oncall';
const xUrl = 'https://x.com/oncallcapy';

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  for (const route of routes) {
    test(`${route} exposes the GitHub and X profiles in its footer without JavaScript at ${viewport.width}×${viewport.height}`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport });
      try {
        const page = await context.newPage();
        await page.goto(route);
        const footer = page.locator('.editorial-file-footer');
        const links = [
          { link: footer.getByRole('link', { name: 'PUBLIC REPOSITORY', exact: true }), href: repositoryUrl },
          { link: footer.getByRole('link', { name: 'X / @ONCALLCAPY', exact: true }), href: xUrl },
        ];

        for (const { link, href } of links) {
          await expect(link).toHaveAttribute('href', href);
          await link.scrollIntoViewIfNeeded();
          await expect(link).toBeVisible();
          await expect(link).toBeInViewport();
          await link.focus();
          await expect(link).toBeFocused();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      } finally {
        await context.close();
      }
    });
  }
}

test('Sources & Risks also links the repository in its project record', async ({ page }) => {
  await page.goto('/sources-and-risks/');
  const record = page.getByRole('region', { name: 'Project record', exact: true });
  await expect(record.getByRole('link', { name: 'PUBLIC REPOSITORY', exact: true })).toHaveAttribute('href', repositoryUrl);
});
