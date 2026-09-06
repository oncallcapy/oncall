import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const dossiers = [
  { ticker: 'LLY', company: 'Eli Lilly and Company', slug: 'beyond-weight-and-cardiometabolic-outcomes' },
  { ticker: 'JNJ', company: 'Johnson & Johnson', slug: 'evaluating-clinical-evidence-and-devices' },
  { ticker: 'HIMS', company: 'Hims & Hers Health', slug: 'digital-care-and-patient-communication' },
  { ticker: 'MRNA', company: 'Moderna', slug: 'inside-mrna-evidence' },
  { ticker: 'UNH', company: 'UnitedHealth Group', slug: 'health-systems-and-recorded-outcomes' },
] as const;

test('Science index exposes five evidence dossiers in fixed editorial order', async ({ page }) => {
  await page.goto('/science/');
  await expect(page.getByRole('heading', { level: 1, name: 'Science Notes' })).toBeVisible();
  const links = page.locator('[data-science-dossier-link]');
  await expect(links).toHaveCount(5);

  for (const [index, dossier] of dossiers.entries()) {
    const link = links.nth(index);
    await expect(link).toHaveAttribute('href', `/science/${dossier.slug}/`);
    await expect(link.locator('.file-index')).toHaveText(String(index + 1).padStart(2, '0'));
    const mapping = link.locator('[data-editorial-mapping]');
    await expect(mapping).toContainText('Editorial mapping');
    await expect(mapping).toContainText(dossier.ticker);
    await expect(mapping).toContainText(dossier.company);
  }
});

for (const dossier of dossiers) {
  test(`${dossier.slug} is a complete, source-led long-form record`, async ({ page }) => {
    await page.goto(`/science/${dossier.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Editorial mapping' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Clinical question' })).toBeVisible();

    const sections = page.locator('[data-dossier-section]');
    expect(await sections.evaluateAll(elements => elements.map(element => element.getAttribute('data-dossier-section')))).toEqual([
      'editorial-mapping',
      'clinical-question',
      'why-it-matters',
      'methods',
      'synthesis',
      'study-files',
      'cross-study-limits',
      'reference-access',
      'correction-history',
      'mascot-commentary',
    ]);

    const studies = page.locator('article[data-study-record]');
    await expect(studies).toHaveCount(3);
    for (const study of await studies.all()) {
      await expect(study.getByRole('heading', { level: 3 })).toBeVisible();
      await expect(study.getByText('Study design', { exact: true })).toBeVisible();
      await expect(study.getByText('Question', { exact: true })).toBeVisible();
      await expect(study.getByText('Finding', { exact: true })).toBeVisible();
      await expect(study.getByText('Limits', { exact: true })).toBeVisible();
      await expect(study.locator('a[href^="https://"]')).not.toHaveCount(0);
      await expect(study.locator('time[datetime="2026-09-07"]')).not.toHaveCount(0);
    }

    const mapping = page.locator('[data-dossier-section="editorial-mapping"]');
    await expect(mapping).toContainText(dossier.ticker);
    await expect(mapping).toContainText(dossier.company);
    const scientificHeadingsAndConclusion = page.locator(
      '[data-scientific-heading], [data-scientific-conclusion]',
    );
    const scientificText = await scientificHeadingsAndConclusion.allTextContents();
    expect(scientificText.join(' ')).not.toContain(dossier.ticker);
    expect(scientificText.join(' ')).not.toContain(dossier.company);
    await expect(page.locator('[data-dossier-section="mascot-commentary"]')).toContainText(
      'Commentary / not a scientific conclusion',
    );
    expect(await page.locator('main').evaluate(element => element.scrollHeight)).toBeGreaterThan(3000);
  });
}

test('correction notices and access limits stay attached to their evidence files', async ({ page }) => {
  await page.goto('/science/evaluating-clinical-evidence-and-devices/');
  await expect(page.locator('[data-study-record]').filter({ hasText: 'ORBITA' })).toContainText('Correction record');
  await expect(page.locator('[data-study-record]').filter({ hasText: 'Moustgaard' })).toContainText('Correction record');
  await expect(page.locator('[data-dossier-section="reference-access"]')).toContainText('access');

  await page.goto('/science/health-systems-and-recorded-outcomes/');
  await expect(page.locator('[data-study-record]').filter({ hasText: 'Regional Variations' })).toContainText('Correction record');
});

test('a Science dossier is materially longer than a top-level file summary', async ({ page }) => {
  await page.goto('/chart/');
  const summaryHeight = await page.locator('main').evaluate(element => element.scrollHeight);
  await page.goto('/science/beyond-weight-and-cardiometabolic-outcomes/');
  const dossierHeight = await page.locator('main').evaluate(element => element.scrollHeight);
  expect(dossierHeight).toBeGreaterThan(summaryHeight + 1500);
});

test('Science record remains a readable paper at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/science/inside-mrna-evidence/');
  await page.waitForLoadState('networkidle');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const record = page.locator('[data-study-record]').first();
  await expect(record).toBeVisible();
  const box = await record.boundingBox();
  expect(box!.width).toBeGreaterThan(320);
  expect(box!.width).toBeLessThanOrEqual(378);
  expect(await record.evaluate(element => getComputedStyle(element).fontSize)).toBe('18px');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
});

test('Science index and dossier routes emit no browser runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of ['/science/', ...dossiers.map(dossier => `/science/${dossier.slug}/`)]) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
  }
  expect(errors).toEqual([]);
});
