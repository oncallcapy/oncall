# ONCALL Site Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a fast, accessible first website version with the approved clinical case-file interface, static mascot fallback, and a source-enforced evidence-based Science Notes system.

**Architecture:** Build a statically generated Astro site with typed content records and small client-side enhancements for folder navigation and restrained mascot motion. The first release keeps all token and pair facts reviewable in version-controlled files and sends trading actions to PAR; live chain ingestion and the production vector mascot rig remain separate follow-up packages.

**Tech Stack:** Astro 7, TypeScript strict mode, Astro Content Collections, Zod, vanilla CSS, Vitest, Playwright, and axe-core.

**Spec:** `docs/superpowers/specs/2026-09-06-oncall-website-design.md`

## Global Constraints

- Initial public language is English.
- Use Node.js `>=22.12.0`, required by the selected Astro 7 release line.
- `ONCALL` is a provisional working name until name, ticker, domain, and X availability are checked.
- `sources/` is read-only.
- Science Notes use evidence-based medicine topics without company names,
  tickers, logos, products, or company-centered publication framing.
- `FIVE PAIRS` must show the actual paired stock-token symbol and company name;
  company-specific news or analysis belongs in `MARKET ROUNDS`.
- Missing or unverified launch data renders `PENDING`; stale data has an observation time; missing live data never becomes zero.
- No wallet connection or custom trading interface in the initial release.
- The site remains readable without JavaScript and respects `prefers-reduced-motion`.
- The current raster mascot is a reference and static fallback; a production vector rig is a later deliverable.
- No publish, X post, wallet action, or on-chain transaction without Erdem's explicit approval of the final result.

## Plan boundary

This plan produces the first independently testable site: content architecture,
clinical-file navigation, static mascot use, restrained CSS motion, source
validation, and pre-launch states. Two later plans will cover (1) canonical
mascot vector rig and Rive animation asset production and (2) live PAR,
Robinhood Chain, and explorer data ingestion after the five pairs are chosen.

---

### Task 1: Astro foundation and verification harness

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/env.d.ts`
- Create: `tests/smoke/home.spec.ts`

**Interfaces:**
- Consumes: the approved design spec only.
- Produces: `npm run dev`, `npm run build`, `npm run test`, and `npm run test:e2e` commands used by every later task.

- [ ] **Step 1: Write the browser smoke test**

```ts
import { expect, test } from "@playwright/test";

test("renders the pre-launch home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "ONCALL" })).toBeVisible();
  await expect(page.getByText("STATUS: UNDER OBSERVATION")).toBeVisible();
  await expect(page.getByText("LAUNCH PENDING")).toBeVisible();
});
```

- [ ] **Step 2: Add package and tool configuration**

Use this script surface in `package.json`:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.10",
    "astro": "^7.3.1",
    "typescript": "^6.0.3",
    "zod": "^4.5.4"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.2",
    "@playwright/test": "^1.58.2",
    "vitest": "^4.1.0"
  }
}
```

Set Astro output to `static`, enable strict TypeScript, point Playwright at
`http://127.0.0.1:4321`, and have Playwright start `npm run dev -- --host
127.0.0.1` automatically.

- [ ] **Step 3: Install dependencies and confirm the smoke test fails for the missing page**

Run: `npm install`  
Run: `npx playwright install chromium`  
Run: `npm run test:e2e -- tests/smoke/home.spec.ts`  
Expected: FAIL because `/` has not been implemented.

- [ ] **Step 4: Create the minimal home route**

Create `src/pages/index.astro` with an `h1` containing `ONCALL`, the visible
status text, and a disabled-looking `LAUNCH PENDING` element that is not an
outbound link.

- [ ] **Step 5: Verify the foundation**

Run: `npm run build`  
Expected: Astro type check and static build pass.  
Run: `npm run test:e2e -- tests/smoke/home.spec.ts`  
Expected: PASS.

- [ ] **Step 6: Commit the foundation when execution occurs in a Git repository**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts src/env.d.ts src/pages/index.astro tests/smoke/home.spec.ts
git commit -m "chore: scaffold ONCALL static site"
```

---

### Task 2: Design tokens and clinical chart shell

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/layouts/ChartLayout.astro`
- Create: `src/components/ChartHeader.astro`
- Create: `src/components/FileTabs.astro`
- Create: `src/config/navigation.ts`
- Modify: `src/pages/index.astro`
- Create: `tests/unit/navigation.test.ts`

**Interfaces:**
- Consumes: the site commands from Task 1.
- Produces: `NAV_ITEMS`, `ChartLayout`, and `FileTabs` for every page.

- [ ] **Step 1: Write the navigation contract test**

```ts
import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "../../src/config/navigation";

describe("clinical file navigation", () => {
  it("keeps every approved file in a stable order", () => {
    expect(NAV_ITEMS.map((item) => item.label)).toEqual([
      "TRIAGE",
      "THE CHART",
      "FIVE PAIRS",
      "ROBINHOOD CHAIN",
      "SCIENCE NOTES",
      "MARKET ROUNDS",
      "NIGHT SHIFT",
      "SOURCES & RISKS"
    ]);
  });

  it("gives every file a unique route and text label", () => {
    expect(new Set(NAV_ITEMS.map((item) => item.href)).size).toBe(NAV_ITEMS.length);
    expect(NAV_ITEMS.every((item) => item.label.length > 0)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the contract test and observe the missing module failure**

Run: `npm run test -- tests/unit/navigation.test.ts`  
Expected: FAIL because `src/config/navigation.ts` does not exist.

- [ ] **Step 3: Implement the shared navigation data**

```ts
export type NavItem = Readonly<{ label: string; href: string; shortLabel: string }>;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "TRIAGE", shortLabel: "01", href: "/" },
  { label: "THE CHART", shortLabel: "02", href: "/chart/" },
  { label: "FIVE PAIRS", shortLabel: "03", href: "/pairs/" },
  { label: "ROBINHOOD CHAIN", shortLabel: "04", href: "/robinhood-chain/" },
  { label: "SCIENCE NOTES", shortLabel: "05", href: "/science/" },
  { label: "MARKET ROUNDS", shortLabel: "06", href: "/market-rounds/" },
  { label: "NIGHT SHIFT", shortLabel: "07", href: "/night-shift/" },
  { label: "SOURCES & RISKS", shortLabel: "08", href: "/sources-and-risks/" }
] as const;
```

- [ ] **Step 4: Implement the visual shell**

Define the approved colours as CSS custom properties and assign typography by
role rather than by page. `ChartLayout.astro` must provide a skip link, semantic
header, `nav` labeled `Case files`, and `main`. `FileTabs.astro` renders ordinary
links so it works without JavaScript, marks the current page with
`aria-current="page"`, and uses label text in addition to colour.

- [ ] **Step 5: Add responsive and reduced-motion rules**

Desktop tabs remain visible at the page edge. Below `48rem`, render them as a
horizontally scrollable list above the content. In `prefers-reduced-motion:
reduce`, set animation duration and scroll behavior to immediate while retaining
focus visibility.

- [ ] **Step 6: Verify shell behavior**

Run: `npm run test -- tests/unit/navigation.test.ts`  
Expected: PASS.  
Run: `npm run build`  
Expected: PASS with all CSS imported once by `ChartLayout.astro`.

- [ ] **Step 7: Commit**

```bash
git add src/styles src/layouts src/components/ChartHeader.astro src/components/FileTabs.astro src/config/navigation.ts src/pages/index.astro tests/unit/navigation.test.ts
git commit -m "feat: add clinical chart navigation shell"
```

---

### Task 3: Mascot asset and restrained motion component

**Files:**
- Create: `public/brand/oncall-hero-static.png`
- Create: `src/components/OncallMascot.astro`
- Create: `src/styles/mascot.css`
- Modify: `src/pages/index.astro`
- Create: `tests/smoke/mascot.spec.ts`

**Interfaces:**
- Consumes: canonical direction image `assets/brand/oncall-visual-direction-01.png` and `ChartLayout`.
- Produces: `OncallMascot` props `{ context: "hero" | "note" | "market"; alt?: string }` with static fallback and reduced-motion behavior.

- [ ] **Step 1: Write the mascot browser test**

```ts
import { expect, test } from "@playwright/test";

test("shows a meaningful static mascot without script dependency", async ({ page }) => {
  await page.goto("/");
  const mascot = page.getByTestId("oncall-mascot");
  await expect(mascot).toBeVisible();
  await expect(mascot.locator("img")).toHaveAttribute("alt", /capybara/i);
});

test("stops decorative motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.getByTestId("oncall-mascot").evaluate((node) =>
    getComputedStyle(node).animationDuration
  );
  expect(["0s", "0.001s"]).toContain(duration);
});
```

- [ ] **Step 2: Run the tests and observe the missing mascot failure**

Run: `npm run test:e2e -- tests/smoke/mascot.spec.ts`  
Expected: FAIL because `OncallMascot` is absent.

- [ ] **Step 3: Prepare the static web asset**

Derive a transparent or clean-background hero crop from the approved canonical
character, without regenerating its face or clothes. Preserve the source board
under `assets/brand/`; place the optimized web export at
`public/brand/oncall-hero-static.png`. Confirm dimensions and visual identity by
opening the export next to the source board.

- [ ] **Step 4: Implement the mascot component**

Render a fixed-ratio wrapper and native image with explicit width and height.
Apply only a two-pixel-equivalent breathing translation and a very small cup
tilt on deliberate hover/focus. Do not fake independent eye or limb animation
from a flattened raster. Reserve an internal overlay slot for the later vector
rig without exposing an unused control.

- [ ] **Step 5: Verify motion and fallback**

Run: `npm run test:e2e -- tests/smoke/mascot.spec.ts`  
Expected: PASS in default and reduced-motion modes.  
Run: `npm run build`  
Expected: PASS and the image is included in the static output.

- [ ] **Step 6: Commit**

```bash
git add public/brand/oncall-hero-static.png src/components/OncallMascot.astro src/styles/mascot.css src/pages/index.astro tests/smoke/mascot.spec.ts
git commit -m "feat: add ONCALL mascot with accessible motion fallback"
```

---

### Task 4: Evidence-based Science Notes content contract

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/schemas/scienceNote.ts`
- Create: `src/content/science/.gitkeep`
- Create: `src/config/scienceThemes.ts`
- Create: `src/components/CitationList.astro`
- Create: `src/components/ScienceNoteCard.astro`
- Create: `src/pages/science/index.astro`
- Create: `src/pages/science/[slug].astro`
- Create: `tests/unit/science-note-schema.test.ts`

**Interfaces:**
- Consumes: `ChartLayout` and the shared design tokens.
- Produces: `scienceNoteSchema`, `SCIENCE_THEMES`, and build-time validated Science Notes.

- [ ] **Step 1: Write schema tests for valid and prohibited notes**

```ts
import { describe, expect, it } from "vitest";
import { scienceNoteSchema } from "../../src/content/schemas/scienceNote";

const validNote = {
  title: "Why endpoints matter",
  summary: "A study can be rigorous and still answer a narrower question than its headline suggests.",
  publishedAt: new Date("2026-09-06"),
  themes: ["clinical-evidence"],
  finding: "Endpoints define which outcomes a trial can directly support.",
  limits: "An endpoint does not automatically establish patient-important benefit.",
  mascotNote: "Read the outcome before reading the applause.",
  references: [{
    title: "CONSORT 2010 Statement",
    authors: "CONSORT Group",
    journal: "BMJ",
    year: 2010,
    url: "https://doi.org/10.1136/bmj.c332",
    doi: "10.1136/bmj.c332",
    accessedAt: new Date("2026-09-06")
  }]
};

describe("scienceNoteSchema", () => {
  it("accepts a sourced evidence-medicine note", () => {
    expect(scienceNoteSchema.parse(validNote).themes).toEqual(["clinical-evidence"]);
  });

  it("rejects a note without a primary or authoritative reference", () => {
    expect(() => scienceNoteSchema.parse({ ...validNote, references: [] })).toThrow();
  });

  it.each(["LLY", "JNJ", "HIMS", "MRNA", "UNH"])(
    "rejects branded Science Note framing: %s",
    (brand) => {
      expect(() => scienceNoteSchema.parse({ ...validNote, title: `${brand} evidence update` })).toThrow();
    }
  );
});
```

- [ ] **Step 2: Run the schema test and observe the missing module failure**

Run: `npm run test -- tests/unit/science-note-schema.test.ts`  
Expected: FAIL because the schema is not defined.

- [ ] **Step 3: Define the evidence-only theme map**

```ts
export const SCIENCE_THEMES = {
  "metabolic-medicine": "Metabolism & metabolic medicine",
  "clinical-evidence": "Evidence-based clinical medicine & medical technology",
  "digital-health": "Digital health & patient communication",
  "molecular-medicine": "Molecular medicine, immunology & vaccine science",
  "health-systems": "Health systems, outcomes & population health"
} as const;

export type ScienceTheme = keyof typeof SCIENCE_THEMES;
```

- [ ] **Step 4: Implement strict source validation**

`scienceNoteSchema` must be strict and require a nonempty reference list, HTTPS URLs, article
title, author/group, year, access date, and at least one of DOI, PMID, registry
ID, or an explicit authoritative-source classification. Add a schema refinement
that rejects company names and tickers configured in the pair-candidate list
from `title`, `summary`, and `themes`; reject `company`, `ticker`, `sponsor`, and
`product` fields entirely. Body-level editorial review remains a publication
gate because schema validation cannot establish scientific truth.

- [ ] **Step 5: Implement list and article templates**

The article template renders `What the evidence shows`, `What it does not
prove`, and `ONCALL's note` as visibly distinct blocks. `CitationList.astro`
prints the complete citation, external link, DOI/PMID when present, and source
access date. Never use the mascot annotation as a pull quote for the scientific
conclusion.

- [ ] **Step 6: Verify positive and negative contracts**

Run: `npm run test -- tests/unit/science-note-schema.test.ts`  
Expected: all valid, missing-source, and prohibited-brand cases pass.  
Run: `npm run build`  
Expected: PASS with an honest empty state if no reviewed Science Note has been
published yet.

- [ ] **Step 7: Commit**

```bash
git add src/content.config.ts src/content/schemas/scienceNote.ts src/content/science/.gitkeep src/config/scienceThemes.ts src/components/CitationList.astro src/components/ScienceNoteCard.astro src/pages/science tests/unit/science-note-schema.test.ts
git commit -m "feat: enforce sourced evidence-based Science Notes"
```

---

### Task 5: Pre-launch project, pair, and Robinhood Chain files

**Files:**
- Create: `src/data/projectFacts.ts`
- Create: `src/data/pairCandidates.ts`
- Create: `src/components/FactRow.astro`
- Create: `src/components/PairCaseCard.astro`
- Create: `src/components/ChainDiagram.astro`
- Create: `src/pages/chart.astro`
- Create: `src/pages/pairs.astro`
- Create: `src/pages/robinhood-chain.astro`
- Create: `src/pages/market-rounds.astro`
- Create: `src/pages/night-shift.astro`
- Create: `src/pages/sources-and-risks.astro`
- Create: `tests/unit/prelaunch-data.test.ts`

**Interfaces:**
- Consumes: `ChartLayout`, `SCIENCE_THEMES`, and verified facts in the design spec.
- Produces: typed `ProjectFact` and `PairCandidate` records plus every approved top-level route.

- [ ] **Step 1: Write pre-launch integrity tests**

```ts
import { describe, expect, it } from "vitest";
import { PAIR_CANDIDATES } from "../../src/data/pairCandidates";
import { PROJECT_FACTS } from "../../src/data/projectFacts";

describe("pre-launch public data", () => {
  it("keeps all five pair candidates visibly unverified for PAR eligibility", () => {
    expect(PAIR_CANDIDATES).toHaveLength(5);
    expect(PAIR_CANDIDATES.every((pair) => pair.parStatus === "pending")).toBe(true);
  });

  it("never exposes a placeholder contract as verified", () => {
    expect(PROJECT_FACTS.filter((fact) => fact.status !== "verified")
      .every((fact) => fact.displayValue === "PENDING")).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and observe missing data modules**

Run: `npm run test -- tests/unit/prelaunch-data.test.ts`  
Expected: FAIL because both data modules are absent.

- [ ] **Step 3: Implement typed pre-launch records**

Define exact status unions:

```ts
export type VerificationStatus = "pending" | "verified" | "stale" | "unavailable";

export type PairCandidate = Readonly<{
  symbol: "LLY" | "JNJ" | "HIMS" | "MRNA" | "UNH";
  displayName: string;
  scienceTheme: keyof typeof SCIENCE_THEMES;
  robinhoodContract: `0x${string}`;
  robinhoodStatus: "active";
  parStatus: VerificationStatus;
  observedAt: string;
  riskNote: string;
}>;
```

Populate the Robinhood Chain contracts only after re-reading Robinhood's
official assets endpoint during implementation and recording the observation
time. Keep `parStatus` as `pending` until PAR's current pricer confirms it.

- [ ] **Step 4: Build the project and pair pages**

`THE CHART` renders immutable and unresolved facts without invented values.
`FIVE PAIRS` shows each actual stock-token symbol and company name, candidate
status, measurement time, thematic role, and the plain disclaimer that pairing
is not backing, share ownership, index-fund status, or guaranteed tracking.

- [ ] **Step 5: Build the chain explanation and source ledger**

Create an original semantic diagram showing one ONCALL token leading to five
Uniswap v4 pools and five quote assets. `ROBINHOOD CHAIN` links to current
official documentation and separates `Platform statement` from `Verified
on-chain`. `SOURCES & RISKS` lists access dates and the complete risk categories
from the specification.

- [ ] **Step 6: Add honest empty states**

`MARKET ROUNDS` and `NIGHT SHIFT` render intentional pre-launch empty states;
they do not display sample company analysis or pretend X posts exist.

- [ ] **Step 7: Verify**

Run: `npm run test -- tests/unit/prelaunch-data.test.ts`  
Expected: PASS.  
Run: `npm run build`  
Expected: all eight top-level routes build without content or link errors.

- [ ] **Step 8: Commit**

```bash
git add src/data src/components/FactRow.astro src/components/PairCaseCard.astro src/components/ChainDiagram.astro src/pages/chart.astro src/pages/pairs.astro src/pages/robinhood-chain.astro src/pages/market-rounds.astro src/pages/night-shift.astro src/pages/sources-and-risks.astro tests/unit/prelaunch-data.test.ts
git commit -m "feat: add transparent pre-launch project files"
```

---

### Task 6: Accessibility, failure-state, and responsive acceptance

**Files:**
- Create: `tests/acceptance/accessibility.spec.ts`
- Create: `tests/acceptance/failure-states.spec.ts`
- Create: `tests/acceptance/responsive.spec.ts`
- Modify: files identified by failures in Tasks 2–5 only.

**Interfaces:**
- Consumes: the complete static website produced by Tasks 1–5.
- Produces: release evidence for keyboard navigation, reduced motion, no-script readability, honest missing-data states, and mobile layout.

- [ ] **Step 1: Add automated accessibility coverage**

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/science/", "/pairs/", "/robinhood-chain/", "/sources-and-risks/"]) {
  test(`has no serious accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
  });
}
```

- [ ] **Step 2: Add failure-state assertions**

Assert that unresolved token fields display `PENDING`, pair eligibility does not
display `verified`, the Science Notes empty state invites no unsupported claim,
and disabling JavaScript leaves every top-level link and article readable.

- [ ] **Step 3: Add desktop and mobile viewport assertions**

At `1440 × 900`, assert that the active file tab and main heading are visible.
At `390 × 844`, assert that the tab rail can scroll horizontally, body text does
not overflow, and no primary content is obscured by the mascot.

- [ ] **Step 4: Run acceptance tests and fix only observed failures**

Run: `npm run test:e2e -- tests/acceptance`  
Expected: accessibility, failure-state, and responsive suites pass.

- [ ] **Step 5: Run the complete release gate**

Run: `npm run test`  
Expected: all unit tests pass.  
Run: `npm run test:e2e`  
Expected: all browser tests pass.  
Run: `npm run build`  
Expected: strict type check and static build pass.  
Run: `git diff --check`  
Expected: no whitespace errors.

- [ ] **Step 6: Perform visual checks**

Inspect the home, Science Notes, Five Pairs, Robinhood Chain, and Sources & Risks
pages at the two acceptance viewports. Confirm the design reads as an original
clinical archive, mascot proportions match the approved reference, citations
remain legible, and content is usable with reduced motion.

- [ ] **Step 7: Commit the verified foundation**

```bash
git add tests/acceptance src
git commit -m "test: verify ONCALL site foundation acceptance"
```

## Completion evidence

The first website foundation is complete only when all six tasks are committed
in a Git repository, the full release gate passes, and the visual checks are
recorded. Deployment, domain configuration, live chain ingestion, production
mascot rigging, X account activity, and the PAR launch remain outside this plan.
