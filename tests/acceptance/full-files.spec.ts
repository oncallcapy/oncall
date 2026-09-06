import { expect, test } from '@playwright/test';

const repository = 'https://github.com/oncallcapy/oncall';
const files = [
  { path: '/chart/', heading: 'The Chart' },
  { path: '/pairs/', heading: 'Five Pairs' },
  { path: '/robinhood-chain/', heading: 'Robinhood Chain' },
  { path: '/market-rounds/', heading: 'Market Rounds' },
  { path: '/night-shift/', heading: 'Night Shift' },
  { path: '/sources-and-risks/', heading: 'Sources & Risks' },
] as const;

for (const file of files) {
  test(`${file.heading} is a complete public file`, async ({ page }) => {
    await page.goto(file.path);
    await expect(page.getByRole('heading', { level: 1, name: file.heading, exact: true })).toBeVisible();
    expect(await page.locator('main [data-public-section]').count()).toBeGreaterThanOrEqual(2);
    await expect(page.locator('main a[href^="/"]')).not.toHaveCount(0);
    await expect(page.locator(`main a[href="${repository}"]`)).not.toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(
      /PENDING|EMPTY FILE|WORKING IDENTITY|PROVISIONAL|reserved for|review required/i,
    );
  });
}

test('Five Pairs exposes exactly the fixed five official quote records', async ({ page }) => {
  const contracts = [
    '0x8005d266423c7ea827372c9c864491e5786600ea',
    '0x03DfbBE0AC4E7bCDaFd08eD41A400326B77D8c80',
    '0xCceE82fE024c36fA15E1005edE3E9e4787e23D09',
    '0x43B07D15cE533bEc5476d70C22a78a1B2B662155',
    '0xcF364ea52787e289De6F32077834056E3E70D6A8',
  ];
  await page.goto('/pairs/');
  await expect(page.locator('[data-pair-record]')).toHaveCount(5);
  for (const contract of contracts) await expect(page.locator('main')).toContainText(contract);
});

test('Chain and source ledger preserve dated technical limits', async ({ page }) => {
  for (const path of ['/robinhood-chain/', '/sources-and-risks/']) {
    await page.goto(path);
    await expect(page.locator('main')).toContainText('2026-09-06T15:38:34Z');
    await expect(page.locator('main')).toContainText(/unaudited/i);
    await expect(page.locator('main')).toContainText(/priceability/i);
    await expect(page.locator('main')).toContainText(/route depth/i);
    await expect(page.locator('main')).toContainText(/liquidity/i);
  }
});

test('Market Rounds contains a substantial launch essay with its editorial boundary', async ({ page }) => {
  await page.goto('/market-rounds/');
  await expect(page.locator('[data-market-essay]')).toHaveCount(1);
  await expect(page.locator('[data-market-essay]')).toContainText(/narrative/i);
  await expect(page.locator('[data-market-essay]')).toContainText(/clinical evidence/i);
  await expect(page.locator('[data-market-essay]')).toContainText(/investment recommendation/i);
  expect((await page.locator('[data-market-essay]').innerText()).length).toBeGreaterThan(1_200);
});

test('Night Shift contains three original X-ready mascot entries without performance claims', async ({ page }) => {
  await page.goto('/night-shift/');
  await expect(page.locator('[data-night-shift-entry]')).toHaveCount(3);
  await expect(page.locator('main')).not.toContainText(/guaranteed|100x|moon|profit|returns?\b/i);
  for (const entry of await page.locator('[data-night-shift-entry]').all()) {
    await expect(entry).toContainText('ONCALL');
    expect((await entry.innerText()).length).toBeGreaterThan(90);
  }
});

test('captures the complete records room on desktop and mobile without runtime errors', async ({ page }) => {
  const captureRoutes = [
    { path: '/', file: 'triage' },
    { path: '/chart/', file: 'chart' },
    { path: '/pairs/', file: 'pairs' },
    { path: '/robinhood-chain/', file: 'robinhood-chain' },
    { path: '/science/', file: 'science-index' },
    { path: '/market-rounds/', file: 'market-rounds' },
    { path: '/night-shift/', file: 'night-shift' },
    { path: '/sources-and-risks/', file: 'sources-and-risks' },
    { path: '/science/beyond-weight-and-cardiometabolic-outcomes/', file: 'science-long-file' },
  ] as const;
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()); });

  for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of captureRoutes) {
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `.superpowers/sdd/2026-09-07-oncall-science-and-full-files/task-4-evidence/${viewport.name}/${route.file}.png`,
        fullPage: true,
      });
    }
  }
  expect(runtimeErrors).toEqual([]);
});
