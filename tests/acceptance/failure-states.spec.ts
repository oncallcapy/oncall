import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];

test('every unresolved launch fact and its evidence stay pending', async ({ page }) => {
  await page.goto('/chart/');
  const labels = ['ONCALL token contract', 'Final ticker', 'Launch transaction', 'Final creator tax', 'Final pool fee', 'Fee recipient policy', 'Final launch state'];
  await expect(page.locator('.fact-row')).toHaveCount(labels.length);
  for (const label of labels) {
    const row = page.locator('.fact-row').filter({ has: page.locator('dt', { hasText: label }) });
    await expect(row.locator('.status')).toHaveText('PENDING');
    await expect(row.locator('.evidence')).toHaveText('Launch evidence / PENDING');
    await expect(row.getByRole('link')).toHaveCount(0);
  }
  await expect(page.getByRole('main')).not.toContainText(/0x[a-fA-F0-9]{40}|0x0+|sample (address|contract)|example (address|contract)/i);
  await expect(page.locator('main a[href*="explorer"], main a[href*="blockscout"], main a[href*="/tx/"], main a[href*="/address/"]')).toHaveCount(0);
});

test('all five selected pairs separate ACTIVE API observations from pending PAR and routes', async ({ page }) => {
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
    await expect(card.locator('dl > div').filter({ has: page.locator('dt', { hasText: 'Technical launch check' }) }).locator('dd')).toHaveText('PENDING');
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
    for (const label of ['PAR priceability', 'Route / in-range depth', 'ONCALL pool / launch receipt']) {
      await expect(card.locator('dl > div').filter({ has: page.locator('dt', { hasText: label }) }).locator('dd')).toHaveText('PENDING');
    }
    await expect(card).not.toContainText(/PAR.{0,30}(verified|approved)|route.{0,30}(verified|approved)/i);
  }
  await expect(page.locator('.notice')).toContainText('an active API entry does not establish route depth, liquidity, suitability, or investment merit');
});

test('Science Notes contains an honest empty reviewed collection', async ({ page }) => {
  await page.goto('/science/');
  await expect(page.getByText('No reviewed Science Note has been published yet.', { exact: true })).toBeVisible();
  await expect(page.getByRole('main').getByRole('article')).toHaveCount(0);
  await expect(page.locator('main a[href^="/science/"]')).toHaveCount(0);
  await expect(page.locator('.empty-state')).toContainText('No sample articles are presented as reviewed work.');
  await expect(page.getByRole('main')).toContainText('five selected-pair research domains');
  await expect(page.getByRole('link', { name: 'exact market-to-domain map' })).toHaveAttribute('href', '/pairs/');
  await expect(page.locator('.empty-state')).not.toContainText(/LLY|JNJ|HIMS|MRNA|UNH|Moderna|Lilly/);
  // The explicit no-sample disclaimer is allowed; published articles and claims are not.
  await expect(page.getByRole('main')).not.toContainText(/sample (scientific claim|study)|\bp\s*[<=]\s*0\.|relative risk|odds ratio|\d+% (reduction|improvement)/i);
});

for (const [route, emptyText] of [
  ['/market-rounds/', 'No market analysis has been published here.'],
  ['/night-shift/', 'No Night Shift post has been published in this archive.'],
]) {
  test(`${route} remains an honest empty archive`, async ({ page }) => {
    await page.goto(route!);
    await expect(page.locator('.empty-state')).toContainText(emptyText!);
    await expect(page.getByRole('main').getByRole('article')).toHaveCount(0);
    await expect(page.locator(`main a[href^="${route}"]`)).toHaveCount(0);
  });
}

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

test('reduced motion makes every mascot context immediate', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/science/', '/night-shift/']) {
    await page.goto(route);
    const mascot = page.getByTestId('oncall-mascot');
    await expect(mascot).toBeVisible();
    expect(await mascot.evaluate(element => {
      const style = getComputedStyle(element);
      return { name: style.animationName, duration: style.animationDuration, transform: style.transform, activeAnimations: element.getAnimations().length };
    })).toEqual({ name: 'none', duration: '0s', transform: 'none', activeAnimations: 0 });
  }
});
