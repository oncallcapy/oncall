import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];

test('public chart omits unpublished launch fields', async ({ page }) => {
  await page.goto('/chart/');
  const labels = ['ONCALL token contract', 'Final ticker', 'Launch transaction', 'Final creator tax', 'Final pool fee', 'Fee recipient policy', 'Final launch state'];
  await expect(page.locator('.fact-row')).toHaveCount(0);
  for (const label of labels) {
    await expect(page.getByRole('main')).not.toContainText(label);
  }
  await expect(page.getByRole('main')).toContainText('does not publish token, pool, route, fee, or transaction values');
  await expect(page.getByRole('main')).not.toContainText(/0x[a-fA-F0-9]{40}|0x0+|sample (address|contract)|example (address|contract)/i);
  await expect(page.locator('main a[href*="explorer"], main a[href*="blockscout"], main a[href*="/tx/"], main a[href*="/address/"]')).toHaveCount(0);
});

test('all five selected pairs show observed quote facts without unpublished launch fields', async ({ page }) => {
  await page.goto('/pairs/');
  const identities = [['LLY', 'Eli Lilly and Company'], ['JNJ', 'Johnson & Johnson'], ['HIMS', 'Hims & Hers Health'], ['MRNA', 'Moderna'], ['UNH', 'UnitedHealth Group']];
  await expect(page.locator('.pair-case')).toHaveCount(5);
  const register = page.getByRole('region', { name: 'Selected pair register' });
  await expect(register).toBeVisible();
  await expect(page.getByRole('main')).not.toContainText(/candidate|proposed quote set|final selection/i);
  await expect(page.locator('.notice')).toContainText('A failed technical check blocks launch');
  await expect(page.locator('.notice')).toContainText('No silent substitution');
  for (const [symbol, company] of identities) {
    const card = page.getByRole('article', { name: `${symbol} ${company}`, exact: true });
    await expect(card).toBeVisible();
    await expect(register).toContainText(`${symbol} ${company}`);
    await expect(card.locator('.meta').first()).toContainText('Selected pair');
    await expect(card.locator('dl > div').filter({ has: page.locator('dt', { hasText: 'Project selection' }) }).locator('dd')).toHaveText('SELECTED');
    const tracks: Record<string, string> = {
      LLY: 'obesity, diabetes, metabolic medicine, cardiometabolic outcomes',
      JNJ: 'broad clinical medicine, medical technology, evidence appraisal',
      HIMS: 'digital health, telemedicine, patient communication',
      MRNA: 'molecular medicine, immunology, vaccine science',
      UNH: 'health systems, outcomes research, population health',
    };
    await expect(card.locator('.research-track')).toContainText(tracks[symbol!]!);
    const observation = card.locator('dl > div').filter({ has: page.locator('dt', { hasText: 'Official API observation' }) });
    await expect(observation.locator('dd')).toHaveText('ACTIVE / ASSET_STATUS_ACTIVE · Chain 4663');
    for (const label of ['Technical launch check', 'PAR priceability', 'Route / in-range depth', 'ONCALL pool / launch receipt']) {
      await expect(card.locator('dl > div').filter({ has: page.locator('dt', { hasText: label }) })).toHaveCount(0);
    }
    await expect(card).not.toContainText(/PAR.{0,30}approved|route.{0,30}approved/i);
  }
  await expect(page.locator('.notice')).toContainText('An active API entry does not establish priceability, route depth, liquidity, suitability, or investment merit');
});

test('Science Notes exposes five source-led dossiers without claiming clinical review', async ({ page }) => {
  await page.goto('/science/');
  await expect(page.locator('.empty-state')).toHaveCount(0);
  await expect(page.locator('[data-science-dossier-link]')).toHaveCount(5);
  await expect(page.getByRole('main')).toContainText('Five files. Fifteen studies. Zero borrowed certainty.');
  await expect(page.getByRole('main')).toContainText('educational evidence readings');
  await expect(page.getByRole('main')).not.toContainText(/clinically reviewed|clinical approval|approved by/i);
});

test('Market Rounds publishes one bounded launch essay', async ({ page }) => {
  await page.goto('/market-rounds/');
  await expect(page.locator('[data-market-essay]')).toHaveCount(1);
  await expect(page.getByRole('main')).toContainText(/market context[\s\S]*clinical evidence/i);
  await expect(page.getByRole('main')).not.toContainText(/publication status|review queue|empty archive/i);
});

test('Night Shift publishes three original bounded mascot notes', async ({ page }) => {
  await page.goto('/night-shift/');
  await expect(page.locator('[data-night-shift-entry]')).toHaveCount(3);
  await expect(page.getByRole('main')).toContainText(/fictional mascot humour/i);
  await expect(page.getByRole('main')).not.toContainText(/publication status|review queue|empty archive/i);
});

for (const [index, route] of routes.entries()) {
  test(`${route} is readable and navigable without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect((await page.getByRole('main').innerText()).length).toBeGreaterThan(150);
      const links = page.getByRole('navigation').getByRole('link');
      await expect(links).toHaveCount(8);
      expect(await links.evaluateAll(elements => elements.map(element => element.getAttribute('href')))).toEqual(routes);
      const nextRoute = routes[(index + 1) % routes.length]!;
      await page.getByRole('navigation').locator(`a[href="${nextRoute}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${nextRoute.replaceAll('/', '\\/')}$`));
      await expect(page.getByRole('navigation').locator('[aria-current="page"]')).toHaveAttribute('href', nextRoute);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    } finally {
      await context.close();
    }
  });
}

test('reduced motion hides the opening skip control and leaves case files accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/science/', '/night-shift/']) {
    await page.goto(route);
    await expect(page.locator('#cinematic-skip')).toBeHidden();
    await expect(page.getByRole('navigation').getByRole('link')).toHaveCount(8);
  }
});
