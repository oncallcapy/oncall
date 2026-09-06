import { expect, test } from '@playwright/test';

for (const [width, height] of [[1440, 900], [1024, 768], [390, 844], [320, 844]]) {
  test(`approved opening has physical printed links and first-frame content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const image = page.locator('[data-scene-plate] img');
    expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain(width < 768 ? 'opening-mobile-text-free-approved' : 'opening-desktop-text-free-approved');
    await expect(page.getByRole('heading', { name: 'ONCALL', exact: true })).toBeInViewport({ ratio: 1 });
    await expect(page.getByText('NIGHT SHIFT FOR THE TERMINALLY ONLINE.', { exact: true })).toBeInViewport({ ratio: 1 });
    await expect(page.locator('.chart-header')).toHaveCount(0);
    const links = page.locator('[data-file-link]');
    await expect(links).toHaveCount(8);
    let previousBottom = 0;
    for (const link of await links.all()) {
      await expect(link).toBeInViewport({ ratio: 1 });
      const measured = await link.evaluate(el => {
        const r = el.getBoundingClientRect();
        const target = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return { top: r.top, bottom: r.bottom, height: r.height, background: getComputedStyle(el).backgroundColor, hit: target === el || el.contains(target) };
      });
      expect(measured.height).toBeGreaterThanOrEqual(44);
      expect(measured.top).toBeGreaterThanOrEqual(previousBottom - 0.5);
      expect(measured.background).toBe('rgba(0, 0, 0, 0)');
      expect(measured.hit).toBe(true);
      previousBottom = measured.bottom;
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}

test('finishing the intro transfers focus before the focused skip disappears', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const skip = page.locator('#cinematic-skip');
  await skip.focus();
  await expect(skip).toBeFocused();
  await page.locator('[data-cinematic-stage]').evaluate(el => el.getAnimations({ subtree: true }).forEach(animation => animation.finish()));
  await expect(skip).toBeHidden();
  await expect(page.locator('[data-file-content]')).toBeFocused();
});

test('public files omit internal publication workflow and old flat mascot artwork', async ({ page }) => {
  for (const path of ['/science/', '/market-rounds/', '/night-shift/']) {
    await page.goto(path);
    await expect(page.locator('main img[src="/brand/oncall-hero-static.png"]')).toHaveCount(0);
    await expect(page.locator('.empty-state')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/empty archive|review queue|publication status|waiting for sourcing|waiting for a sourced|remain drafts|not been published|no rounds filed|nothing on the noticeboard/i);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /awaiting|currently empty/i);
  }
});

test('the selected physical spine remains attached through route swap until its pull ends', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-file-link][data-file-id="science"]').click();
  await page.locator('[data-cinematic-stage]').evaluate(el => el.getAnimations({ subtree: true }).forEach(animation => animation.pause()));
  await expect(page).toHaveURL('/science/');
  await expect(page.locator('[data-file-content] h1')).toHaveText('Science Notes');
  // The background stack must not move behind the pulled physical spine.
  expect(await page.locator('[data-scene-plate] img').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  expect(await page.locator('[data-file-link][data-file-id="science"]').evaluate(el => getComputedStyle(el, '::before').backgroundImage)).toContain('opening-desktop-text-free-approved');
  await page.locator('[data-cinematic-stage]').evaluate(el => el.getAnimations({ subtree: true }).forEach(animation => animation.play()));
  await expect(page.locator('[data-cinematic-stage]')).toHaveAttribute('data-motion', 'inspect');
});

for (const width of [1440, 1024, 390, 320]) {
  test(`all eight printed baselines follow the rising spines while targets stay rectangular at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    let previousSlope = 0;
    for (const link of await page.locator('[data-file-link]').all()) {
      const print = link.locator('.file-print');
      await expect(print).toHaveCount(1);
      await expect(print.locator(':scope > .file-number, :scope > .file-label, :scope > .file-accent')).toHaveCount(3);
      const geometry = await print.evaluate(el => {
        const matrix = new DOMMatrix(getComputedStyle(el).transform);
        const anchor = el.closest('a')!;
        return { slope: matrix.b, targetTransform: getComputedStyle(anchor).transform, height: anchor.getBoundingClientRect().height };
      });
      expect(geometry.slope).toBeLessThan(previousSlope);
      expect(geometry.targetTransform).toBe('none');
      expect(geometry.height).toBe(44);
      previousSlope = geometry.slope;
    }
  });
}
