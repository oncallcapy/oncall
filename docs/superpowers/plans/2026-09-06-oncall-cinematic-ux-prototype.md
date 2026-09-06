# ONCALL Cinematic UX Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static chart shell with a local, user-testable cinematic file experience that moves from the approved opening scene to the approved inspecting-mascot scene when any file is selected.

**Architecture:** Astro continues to render real pages, links, headings, and content. A progressively enhanced scene plate and folder stack create the cinematic layer; a small transition coordinator changes visual state without delaying normal navigation. This prototype deliberately uses approved rendered scene assets to validate user experience before production rigged-3D integration.

**Tech Stack:** Astro 7, TypeScript, CSS perspective/WAAPI, Astro `ClientRouter`, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-06-oncall-cinematic-redesign.md`

## Global Constraints

- Use `assets/concepts/oncall-opening-approved-v1.png`, `assets/concepts/oncall-open-file-scene-plate-v1.png`, and `assets/concepts/oncall-3d-turntable-approved-v1.png` as the approved visual contract.
- Keep all eight routes, labels, order, and the public repository URL unchanged.
- The stage may use rendered images, but navigation, headings, long-form text, citations, focus, and status remain real HTML.
- Remove visible `PENDING`, `empty file`, `working identity`, `provisional`, and disabled launch controls from this public-facing prototype.
- Never invent a token contract, pool, priceability measurement, liquidity, return, treatment effect, reviewer, or citation.
- With JavaScript disabled, every route and every file link must remain usable.
- With `prefers-reduced-motion: reduce`, skip opening and folder movement and show the final stable composition.
- At 320 px, the document must have no horizontal overflow.
- Commit after each task and request an independent review before the next task.

---

### Task 1: Cinematic asset and route contracts

**Files:**
- Create: `src/config/cinematic.ts`
- Modify: `src/config/navigation.ts`
- Create: `public/brand/cinematic/oncall-opening-approved-v1.png`
- Create: `public/brand/cinematic/oncall-open-file-scene-plate-v1.png`
- Create: `public/brand/cinematic/oncall-idle-pose-approved-v1.png`
- Test: `tests/unit/cinematic-navigation.test.ts`

**Interfaces:**
- Consumes: existing `NAV_ITEMS` and the three approved source assets in `assets/concepts/`.
- Produces: `FileId`, `CinematicSurface`, `CINEMATIC_ASSETS`, `resolveFileId(pathname)`, and `getSurfaceForPath(pathname)`.

- [ ] **Step 1: Write failing route-contract tests**

```ts
import { describe, expect, it } from 'vitest';
import { NAV_ITEMS, resolveFileId } from '../../src/config/navigation';
import { CINEMATIC_ASSETS, getSurfaceForPath } from '../../src/config/cinematic';

describe('cinematic route contract', () => {
  it('maps all eight canonical routes and nested science entries', () => {
    expect(NAV_ITEMS.map(item => item.id)).toEqual([
      'triage', 'chart', 'pairs', 'chain', 'science', 'markets', 'night', 'sources',
    ]);
    expect(resolveFileId('/science/weight-is-not-the-whole-outcome/')).toBe('science');
    expect(getSurfaceForPath('/')).toBe('opening');
    expect(getSurfaceForPath('/pairs/')).toBe('file');
    expect(getSurfaceForPath('/science/example/')).toBe('article');
  });

  it('uses only approved, locally served scene assets', () => {
    expect(CINEMATIC_ASSETS.opening).toBe('/brand/cinematic/oncall-opening-approved-v1.png');
    expect(CINEMATIC_ASSETS.openFile).toBe('/brand/cinematic/oncall-open-file-scene-plate-v1.png');
    expect(Object.values(CINEMATIC_ASSETS).every(path => path.startsWith('/brand/cinematic/'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the missing exports fail**

Run: `npm test -- tests/unit/cinematic-navigation.test.ts`

Expected: FAIL because `FileId`, `resolveFileId`, `CINEMATIC_ASSETS`, and `getSurfaceForPath` do not exist.

- [ ] **Step 3: Add stable file identifiers and longest-prefix routing**

```ts
export type FileId = 'triage' | 'chart' | 'pairs' | 'chain' | 'science' | 'markets' | 'night' | 'sources';

export const resolveFileId = (pathname: string): FileId => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const match = [...NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find(item => normalized === normalize(item.href) || (item.href !== '/' && normalized.startsWith(`${normalize(item.href)}/`)));
  return match?.id ?? 'triage';
};
```

Each navigation record must expose `id: FileId`. Keep its existing `href`, label, short label, and order.

- [ ] **Step 4: Add the cinematic manifest and surface policy**

```ts
export type CinematicSurface = 'opening' | 'file' | 'article';

export const CINEMATIC_ASSETS = {
  opening: '/brand/cinematic/oncall-opening-approved-v1.png',
  openFile: '/brand/cinematic/oncall-open-file-scene-plate-v1.png',
  idlePose: '/brand/cinematic/oncall-idle-pose-approved-v1.png',
} as const;

export const getSurfaceForPath = (pathname: string): CinematicSurface => {
  if ((pathname.replace(/\/+$/, '') || '/') === '/') return 'opening';
  return pathname.startsWith('/science/') && pathname !== '/science/' ? 'article' : 'file';
};
```

- [ ] **Step 5: Copy approved assets without recompressing or overwriting their source files**

Copy the approved opening, open-file plate, and alpha-bearing idle pose into `public/brand/cinematic/`. Confirm each destination hash equals its source hash and confirm `oncall-idle-pose-approved-v1.png` has an alpha channel.

- [ ] **Step 6: Run focused and existing unit tests**

Run: `npm test`

Expected: all unit tests pass, including the new route contract and existing exact pair-contract checks.

- [ ] **Step 7: Commit**

```bash
git add src/config/navigation.ts src/config/cinematic.ts public/brand/cinematic tests/unit/cinematic-navigation.test.ts
git commit -m "feat: define ONCALL cinematic route contracts"
```

### Task 2: Physical folder stack and cinematic page shell

**Files:**
- Create: `src/components/FolderStack.astro`
- Create: `src/components/CinematicStage.astro`
- Create: `src/styles/cinematic-stage.css`
- Create: `src/styles/folder-stack.css`
- Create: `src/styles/editorial-file.css`
- Modify: `src/layouts/ChartLayout.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/acceptance/cinematic-shell.spec.ts`

**Interfaces:**
- Consumes: `NAV_ITEMS`, `resolveFileId`, `getSurfaceForPath`, and `CINEMATIC_ASSETS`.
- Produces: server-rendered `[data-file-stack]`, `[data-file-link]`, `[data-cinematic-stage]`, `[data-scene-plate]`, `#cinematic-skip`, and `<main data-file-content>`.

- [ ] **Step 1: Write the failing no-script and visual-structure acceptance test**

```ts
import { expect, test } from '@playwright/test';

test('opening exposes the physical eight-file navigation without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-cinematic-stage]')).toBeVisible();
  await expect(page.locator('[data-file-link]')).toHaveCount(8);
  await expect(page.getByRole('heading', { level: 1, name: 'ONCALL' })).toBeVisible();
  await page.getByRole('link', { name: /SCIENCE NOTES/i }).click();
  await expect(page).toHaveURL(/\/science\/$/);
  await context.close();
});

test('public shell contains no temporary-state language', async ({ page }) => {
  for (const route of ['/', '/chart/', '/pairs/', '/robinhood-chain/', '/science/', '/market-rounds/', '/night-shift/', '/sources-and-risks/']) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(/PENDING|EMPTY FILE|WORKING IDENTITY|PROVISIONAL/i);
  }
});
```

- [ ] **Step 2: Run the test and confirm the missing cinematic shell fails**

Run: `npm run test:e2e -- tests/acceptance/cinematic-shell.spec.ts`

Expected: FAIL because the cinematic stage and physical file stack do not exist and temporary-state copy remains visible.

- [ ] **Step 3: Build `FolderStack.astro` with ordinary links**

Render a labelled `<nav><ol>` containing the eight anchors. Each link receives `data-file-link`, `data-file-id`, and the existing href. Only the committed route gets `aria-current="page"`. Use real text labels; do not bake navigation text into a scene plate.

CSS must create eight thick horizontal folder layers rising from the lower viewport, using warm ivory paper, subtle green/coral file-edge variants, perspective, paper grain, shadow, and large hit targets. On mobile, show a compact vertical stack with 44 px minimum hit targets; never squeeze eight labels into one row.

- [ ] **Step 4: Build `CinematicStage.astro`**

```astro
<section
  class="cinematic-stage"
  data-cinematic-stage
  data-surface={surface}
  data-file-id={fileId}
  aria-label="ONCALL night-shift records room"
>
  <picture class="scene-plate" aria-hidden="true" data-scene-plate>
    <img src={surface === 'opening' ? CINEMATIC_ASSETS.opening : CINEMATIC_ASSETS.openFile} alt="" fetchpriority={surface === 'opening' ? 'high' : 'auto'} />
  </picture>
  <button id="cinematic-skip" type="button">Skip opening</button>
  <FolderStack currentPath={Astro.url.pathname} />
</section>
```

The image remains decorative because the wordmark, labels, and file content are duplicated as actual HTML. Hide the skip control outside the opening and in reduced-motion mode.

- [ ] **Step 5: Replace the chart-grid shell**

Keep the skip link, semantic header, main content, repository footer, page title/description, and ordinary route content. Remove the right-side `FileTabs` rail and the old ivory chart-card framing. Mount one stage before `<main data-file-content tabindex="-1">`. Add Astro `ClientRouter` with swap fallback and preserve direct page rendering.

- [ ] **Step 6: Replace landing copy with the approved public state**

The landing uses real HTML:

```html
<p class="eyebrow">MEDICINE / SCIENCE / MARKET CULTURE</p>
<h1>ONCALL</h1>
<p class="hero-line">NIGHT SHIFT FOR THE TERMINALLY ONLINE.</p>
<p class="status-line">STATUS / ON SHIFT</p>
```

Remove the disabled launch button and temporary-state labels. Do not add a token address or live-market claim.

- [ ] **Step 7: Run focused acceptance, full unit tests, and build**

Run: `npm run test:e2e -- tests/acceptance/cinematic-shell.spec.ts`

Expected: focused tests pass.

Run: `npm test`

Expected: all unit tests pass.

Run: `npm run build`

Expected: Astro diagnostics report zero errors and all eight routes build.

- [ ] **Step 8: Commit**

```bash
git add src/components/FolderStack.astro src/components/CinematicStage.astro src/styles src/layouts/ChartLayout.astro src/pages/index.astro tests/acceptance/cinematic-shell.spec.ts
git commit -m "feat: replace the chart shell with cinematic files"
```

### Task 3: Interruptible file-opening interaction

**Files:**
- Create: `src/client/cinematic/machine.ts`
- Create: `src/client/cinematic/coordinator.ts`
- Create: `src/client/cinematic/bootstrap.ts`
- Modify: `src/components/CinematicStage.astro`
- Modify: `src/styles/cinematic-stage.css`
- Modify: `src/styles/folder-stack.css`
- Test: `tests/unit/cinematic-machine.test.ts`
- Test: `tests/acceptance/cinematic-navigation.spec.ts`

**Interfaces:**
- Consumes: `FileId`, real folder anchors, Astro route lifecycle, scene-plate images.
- Produces: `CinematicState`, `CinematicEvent`, `reduceCinematic(state, event)`, and a single delegated transition coordinator.

- [ ] **Step 1: Write failing reducer tests for latest-click behavior**

```ts
import { describe, expect, it } from 'vitest';
import { initialCinematicState, reduceCinematic } from '../../src/client/cinematic/machine';

describe('cinematic motion state', () => {
  it('moves every file selection toward inspect and ignores stale completion', () => {
    const first = reduceCinematic(initialCinematicState, { type: 'SELECT', fileId: 'pairs', epoch: 1 });
    const second = reduceCinematic(first, { type: 'SELECT', fileId: 'science', epoch: 2 });
    const stale = reduceCinematic(second, { type: 'OPEN_FINISHED', fileId: 'pairs', epoch: 1 });
    expect(stale).toMatchObject({ desiredFile: 'science', epoch: 2, pose: 'inspect' });
  });

  it('skips directly to the stable opening state', () => {
    expect(reduceCinematic(initialCinematicState, { type: 'SKIP_OPENING' }).opening).toBe('settled');
  });
});
```

- [ ] **Step 2: Run reducer tests and confirm the missing module fails**

Run: `npm test -- tests/unit/cinematic-machine.test.ts`

Expected: FAIL because the reducer module does not exist.

- [ ] **Step 3: Implement the pure reducer**

```ts
export type MascotPose = 'idle' | 'walk' | 'inspect';
export type OpeningPhase = 'playing' | 'settled';

export type CinematicState = {
  desiredFile: FileId;
  epoch: number;
  pose: MascotPose;
  opening: OpeningPhase;
};

export const initialCinematicState: CinematicState = {
  desiredFile: 'triage', epoch: 0, pose: 'idle', opening: 'playing',
};
```

`SELECT` sets the new file, epoch, `pose: 'inspect'`, and `opening: 'settled'`. An event with an older epoch returns the unchanged state. `SKIP_OPENING` settles without changing the active file. Keep this reducer free of DOM, timers, and router calls.

- [ ] **Step 4: Implement delegated transition coordination**

Intercept only unmodified primary-button clicks on internal `[data-file-link]` anchors. Let modifier clicks, downloads, external URLs, and same-page anchors retain native behavior. On selection:

1. increment the epoch and cancel active WAAPI animations;
2. add `data-target-file` and `data-motion="walk"` immediately;
3. animate the selected folder forward for 260 ms;
4. switch the scene plate from opening to open-file and set `data-motion="inspect"`;
5. allow Astro's router to perform its normal route preparation/swap without waiting on animation;
6. after page load, reconcile `aria-current`, focus the new main heading for direct user navigation, and clear stale target state.

Use `sessionStorage['oncall-opening-seen']='1'` after the intro settles or is skipped. Catch storage failures and continue with an in-memory flag.

- [ ] **Step 5: Add reduced-motion and mobile behavior**

When reduced motion is active, do not start timers or WAAPI effects: select the final open-file plate and perform normal navigation. Compact view uses opacity, a short 12 px folder shift, and no simulated long walk. Wide view uses a 4–6 vw mascot/scene translation and folder perspective. In both modes, content never waits or becomes inert.

- [ ] **Step 6: Write navigation acceptance tests**

Test all eight links, latest-click cancellation, back/forward, direct Science deep link, skip opening, keyboard activation, reduced motion, JavaScript disabled, 320 px overflow, and the fact that `[data-file-content]` remains visible throughout transitions. Use deterministic `data-motion` state rather than screenshot timing for behavioral assertions.

- [ ] **Step 7: Run the focused and full verification suite**

Run: `npm test`

Expected: all unit tests pass.

Run: `npm run test:e2e -- tests/acceptance/cinematic-shell.spec.ts tests/acceptance/cinematic-navigation.spec.ts`

Expected: all focused browser tests pass.

Run: `npm run test:e2e`

Expected: the full browser suite passes after obsolete chart-shell expectations are updated only where the approved redesign changed them.

Run: `npm run build`

Expected: zero Astro errors and eight generated routes.

- [ ] **Step 8: Capture the user-evaluation evidence**

Capture desktop 1440×900 and mobile 390×844 frames for opening, mid-selection, opened file, Science file, and rapid second selection. Record a short desktop interaction clip if the available local capture tool supports it. Open the local site for Erdem and stop at the user-experience approval gate.

- [ ] **Step 9: Commit**

```bash
git add src/client src/components/CinematicStage.astro src/styles tests
git commit -m "feat: animate ONCALL file selection states"
```

## Required user-experience gate

Do not start production 3D rig integration or the full content rollout until Erdem evaluates the local prototype in the browser. Record requested changes against opening rhythm, folder hit targets, selected-file clarity, mascot state change, reading space, desktop, and mobile.
