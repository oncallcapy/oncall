import { expect, test } from '@playwright/test';

const mainFiles = [
  { path: '/', message: 'STATE THE PROBLEM. CHECK THE CHART.', asset: 'triage-v1.png' },
  { path: '/chart/', message: 'THE CHART REMEMBERS WHAT HYPE FORGETS.', asset: 'chart-v1.png' },
  { path: '/pairs/', message: 'FIVE FILES. ONE TOKEN. NO SHORTCUTS.', asset: 'five-pairs-v1.png' },
  { path: '/robinhood-chain/', message: 'CHAIN 4663. RECEIPTS BEFORE STORIES.', asset: 'robinhood-chain-v1.png' },
  { path: '/science/', message: 'READ THE METHODS. THE ABSTRACT CAN WAIT.', asset: 'science-notes-v1.png' },
  { path: '/market-rounds/', message: 'THE NARRATIVE IS NOT THE ENDPOINT.', asset: 'market-rounds-v1.png' },
  { path: '/night-shift/', message: 'EVIDENCE FIRST. MEMES AFTER ROUNDS.', asset: 'night-shift-v1.png' },
  { path: '/sources-and-risks/', message: 'NO RECEIPT? OFF THE CHART.', asset: 'sources-risks-v1.png' },
] as const;

const scienceFiles = [
  '/science/beyond-weight-and-cardiometabolic-outcomes/',
  '/science/evaluating-clinical-evidence-and-devices/',
  '/science/digital-care-and-patient-communication/',
  '/science/inside-mrna-evidence/',
  '/science/health-systems-and-recorded-outcomes/',
] as const;

for (const file of mainFiles) {
  test(`${file.path} has its approved mascot file callout`, async ({ page }) => {
    await page.goto(file.path);
    const callout = page.locator('[data-folder-mascot-callout]');
    await expect(callout).toHaveCount(1);
    await expect(callout).toBeVisible();
    await expect(callout).toContainText(file.message);

    const image = callout.locator('img');
    await expect(image).toHaveAttribute('src', new RegExp(`/brand/callouts/${file.asset}$`));
    await expect(image).toHaveAttribute('loading', 'lazy');
    expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  });
}

for (const path of scienceFiles) {
  test(`${path} presents the dossier-specific mascot commentary`, async ({ page }) => {
    await page.goto(path);
    const callout = page.locator('[data-folder-mascot-callout]');
    await expect(callout).toHaveCount(1);
    await expect(callout).toHaveAttribute('data-callout', 'science');
    const image = callout.locator('img');
    await expect(image).toHaveAttribute('src', /science-notes-v1\.png$/);
    await expect(callout).toContainText('Commentary / not a scientific conclusion');
    await callout.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  });
}

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`mascot callouts remain in frame at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const file of mainFiles) {
      await page.goto(file.path);
      const callout = page.locator('[data-folder-mascot-callout]');
      await expect(callout).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      const box = await callout.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(-1);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
    }
  });
}
