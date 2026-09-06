import { expect, test } from '@playwright/test';
import { NAV_ITEMS } from '../../src/config/navigation';

const stage = '[data-cinematic-stage]';
const link = (id: string) => `[data-file-link][data-file-id="${id}"]`;

test('skip settles the opening once per session and moves focus to content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cinematic-skip').click();
  await expect(page.locator(stage)).toHaveAttribute('data-opening', 'settled');
  await expect(page.locator('[data-file-content]')).toBeFocused();
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('oncall-opening-seen'))).toBe('1');
  await page.reload();
  await expect(page.locator(stage)).toHaveAttribute('data-opening', 'settled');
});

test('all eight files remain native links, focus headings and reconcile the selected tab', async ({ page }) => {
  await page.goto('/');
  for (const item of [...NAV_ITEMS.slice(1), NAV_ITEMS[0]]) {
    await page.locator(link(item.id)).click();
    await expect(page).toHaveURL(item.href);
    await expect(page.locator(link(item.id))).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('[data-file-link][aria-current]')).toHaveCount(1);
    await expect(page.locator('[data-file-content] h1')).toBeFocused();
    await expect(page.locator(stage)).toHaveAttribute('data-motion', item.id === 'triage' ? 'idle' : 'inspect');
    await expect(page.locator(stage)).not.toHaveAttribute('data-target-file');
    await expect(page.locator('[data-file-content]')).toBeVisible();
  }
});

test('latest click wins during slow navigation; content never waits and stale transition events do nothing', async ({ page }) => {
  await page.goto('/');
  await page.route('**/pairs/', async route => { await new Promise(resolve => setTimeout(resolve, 500)); await route.continue(); });
  await page.locator(link('pairs')).click();
  await expect(page.locator(stage)).toHaveAttribute('data-target-file', 'pairs');
  await expect(page.locator('[data-file-content]')).toBeVisible();
  await page.locator(link('science')).click();
  await page.locator(stage).dispatchEvent('transitionend');
  await expect(page).toHaveURL('/science/');
  await expect(page.locator(link('science'))).toHaveAttribute('aria-current', 'page');
  await expect(page.locator(stage)).toHaveAttribute('data-motion', 'inspect');
  await expect(page.locator('[data-scene-plate] img')).toHaveAttribute('src', /open-file-scene-plate/);
  await expect(page.locator(stage)).not.toHaveAttribute('data-target-file');
});

test('direct Science, keyboard, back/forward and pageshow reconcile the persistent stage', async ({ page }) => {
  await page.goto('/science/');
  await expect(page.locator(stage)).toHaveAttribute('data-motion', 'inspect');
  await page.locator(link('pairs')).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/pairs/');
  await expect(page.locator('[data-file-content] h1')).toBeFocused();
  await page.goBack();
  await expect(page.locator(link('science'))).toHaveAttribute('aria-current', 'page');
  await page.goForward();
  await expect(page.locator(link('pairs'))).toHaveAttribute('aria-current', 'page');
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await expect(page.locator(stage)).toHaveAttribute('data-file-id', 'pairs');
  await expect(page.locator(stage)).not.toHaveAttribute('data-target-file');
});

test('reduced motion selects the final plate immediately without stage animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator(stage)).toHaveAttribute('data-opening', 'settled');
  await page.locator(link('science')).click();
  await expect(page.locator(stage)).toHaveAttribute('data-motion', 'inspect');
  await expect.poll(() => page.locator(stage).evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  await expect(page.locator('#cinematic-skip')).toBeHidden();
});

test('blocked storage does not prevent selection or repeat the opening after navigation', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('blocked'); } });
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cinematic-skip').click();
  await page.locator(link('science')).click();
  await expect(page).toHaveURL('/science/');
  await page.locator(link('triage')).click();
  await expect(page.locator(stage)).toHaveAttribute('data-opening', 'settled');
});

test('320px navigation has no overflow and content remains readable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.locator(link('science')).click();
  await expect(page).toHaveURL('/science/');
  await expect(page.locator('[data-file-content]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('modifier clicks, downloads, external links and same-page fragments keep native handling', async ({ page }) => {
  await page.goto('/science/');
  const cases = [
    { modifier: 'ctrlKey' }, { modifier: 'metaKey' }, { modifier: 'shiftKey' }, { modifier: 'altKey' },
    { attribute: 'download', value: '' }, { attribute: 'target', value: '_blank' },
    { attribute: 'href', value: 'https://example.com/' }, { attribute: 'href', value: '/science/#main-content' },
    { attribute: 'data-astro-reload', value: '' },
  ];
  for (const entry of cases) {
    const prevented = await page.locator(link('pairs')).evaluate((element, entry) => {
      const anchor = element as HTMLAnchorElement;
      const original = anchor.outerHTML;
      if (entry.attribute) anchor.setAttribute(entry.attribute, entry.value ?? '');
      let preventedByCoordinator = false;
      // Observe at the anchor, after document capture and before Astro's bubble handler.
      anchor.addEventListener('click', event => { preventedByCoordinator = event.defaultPrevented; event.preventDefault(); }, { once: true });
      anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...(entry.modifier ? { [entry.modifier]: true } : {}) }));
      anchor.outerHTML = original;
      return preventedByCoordinator;
    }, entry);
    expect(prevented).toBe(false);
    await expect(page.locator(stage)).not.toHaveAttribute('data-target-file');
    await expect(page.locator(link('science'))).toHaveAttribute('aria-current', 'page');
  }
});

test('opened file places real text on the desktop paper and starts mobile reading in the first viewport', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/science/');
    const heading = await page.locator('[data-file-content] h1').boundingBox();
    expect(heading!.y + heading!.height).toBeLessThan(viewport.height);
    if (viewport.width > 1000) {
      const scene = await page.locator(stage).boundingBox();
      expect(heading!.y).toBeGreaterThan(scene!.y);
      expect(heading!.y + heading!.height).toBeLessThan(scene!.y + scene!.height);
    }
  }
});

test('same-page content jump cancels an in-flight file without leaving a stale target', async ({ page }) => {
  await page.goto('/science/');
  await page.route('**/pairs/', async route => { await new Promise(resolve => setTimeout(resolve, 500)); await route.continue(); });
  await page.locator(link('pairs')).click();
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/science/#main-content');
  await expect(page.locator(stage)).not.toHaveAttribute('data-target-file');
  await expect(page.locator(link('science'))).toHaveAttribute('aria-current', 'page');
});
