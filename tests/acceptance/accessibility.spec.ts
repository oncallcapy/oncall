import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/science/', '/pairs/', '/robinhood-chain/', '/sources-and-risks/'];

for (const route of routes) {
  test(`${route} has accessible structure, navigation and external links`, async ({ page }) => {
    await page.goto(route);
    // Cold Astro dependency optimization can reload the initial document.
    // Audit only after startup requests settle, without retrying Axe findings.
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
    await expect(page.getByRole('main')).toHaveCount(1);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toHaveCount(1);
    await expect(heading).toBeVisible();
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await expect(skip).toHaveAttribute('href', '#main-content');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('main')).toBeFocused();
    const current = page.getByRole('navigation').locator('[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute('href', route);
    expect(await current.locator('.file-label').evaluate(element => getComputedStyle(element).textDecorationLine)).toContain('underline');
    // The release UI excludes Astro's hidden development-toolbar shadow DOM.
    const externalLinks = page.locator('.chart a[href^="https://"]');
    for (const link of await externalLinks.all()) {
      await expect(link).toHaveAccessibleName(/\S.{7,}/);
      await expect(link).not.toHaveAccessibleName(/^(click here|here|link|read more|https?:\/\/[^/]+\/?)$/i);
    }
  });
}

test('launch pending is a genuinely disabled button', async ({ page }) => {
  await page.goto('/');
  const action = page.getByRole('button', { name: 'LAUNCH PENDING', exact: true });
  await expect(action).toBeDisabled();
  expect(await action.evaluate(element => element.tagName)).toBe('BUTTON');
  await expect(page.getByRole('link', { name: 'LAUNCH PENDING' })).toHaveCount(0);
});
