import { expect, test } from '@playwright/test';

const routes = ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/'];
const captureRoutes = ['/', '/science/', '/pairs/', '/robinhood-chain/', '/sources-and-risks/'];
const evidenceRoot = '.superpowers/sdd/2026-09-06-oncall-site-foundation/task-6-evidence';

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const route of routes) {
    test(`${route} fits ${viewport.width}×${viewport.height} with usable file navigation`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeInViewport({ ratio: 1 });
      const rail = page.getByRole('navigation');
      if (viewport.width === 1440) {
        await expect(rail.locator('[aria-current="page"]')).toBeInViewport({ ratio: 1 });
      } else {
        expect(await rail.evaluate(element => ({ scrollable: element.scrollWidth > element.clientWidth, overflow: getComputedStyle(element).overflowX }))).toEqual({ scrollable: true, overflow: 'auto' });
        await rail.evaluate(element => { element.scrollLeft = element.scrollWidth; });
        expect(await rail.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
        await expect(rail.getByRole('link').last()).toBeInViewport({ ratio: 1 });
        await rail.evaluate(element => { element.scrollLeft = 0; });
        const overflow = await page.evaluate(() => {
          const width = document.documentElement.clientWidth;
          const outside: string[] = [];
          for (const element of document.querySelectorAll('main h1, main h2, main h3, main p, main dt, main dd, main li, main button, main code')) {
            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              if (!walker.currentNode.textContent?.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(walker.currentNode);
              for (const rect of range.getClientRects()) {
                if (rect.left < -1 || rect.right > width + 1) outside.push(walker.currentNode.textContent!.trim());
              }
            }
          }
          return { documentOverflow: document.documentElement.scrollWidth - width, outside };
        });
        expect(overflow).toEqual({ documentOverflow: 0, outside: [] });
        const image = page.getByTestId('oncall-mascot').locator('img');
        if (await image.count()) {
          const art = (await image.boundingBox())!;
          for (const target of await page.locator('main h1, main button, .intake-note').all()) {
            const box = (await target.boundingBox())!;
            const overlaps = art.x < box.x + box.width && art.x + art.width > box.x && art.y < box.y + box.height && art.y + art.height > box.y;
            expect(overlaps, `Mascot overlaps ${await target.innerText()}`).toBe(false);
          }
        }
      }
      if (captureRoutes.includes(route)) {
        const directory = `${evidenceRoot}/${viewport.width === 1440 ? 'desktop' : 'mobile'}`;
        await page.screenshot({ path: `${directory}/${route === '/' ? 'home' : route.replaceAll('/', '')}.png`, fullPage: true });
      }
    });
  }
}

test('320px home has no horizontal overflow or clipped primary heading', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  const heading = page.getByRole('heading', { level: 1 });
  const textBox = await heading.evaluate(element => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return { left: range.getBoundingClientRect().left, right: range.getBoundingClientRect().right };
  });
  expect(textBox.left).toBeGreaterThanOrEqual(0);
  expect(textBox.right).toBeLessThanOrEqual(320);
});
