# Task 1 report — cinematic asset and route contracts

## Status

DONE

## Changed files

- `src/config/navigation.ts`: added the `FileId` union, stable `id` values on all eight navigation records, and longest-prefix `resolveFileId(pathname)` routing.
- `src/config/cinematic.ts`: added `CinematicSurface`, `CINEMATIC_ASSETS`, and `getSurfaceForPath(pathname)`.
- `tests/unit/cinematic-navigation.test.ts`: added the route and local asset contract tests from the task brief.
- `public/brand/cinematic/oncall-opening-approved-v1.png`
- `public/brand/cinematic/oncall-open-file-scene-plate-v1.png`
- `public/brand/cinematic/oncall-idle-pose-approved-v1.png`

## Red/green evidence

- RED: `npm test -- tests/unit/cinematic-navigation.test.ts` exited 1. Vitest reported it could not find `../../src/config/cinematic`, so the new contract was absent before implementation.
- GREEN: `npm test -- tests/unit/cinematic-navigation.test.ts` exited 0: 1 test file and 2 tests passed.

## Verification commands and results

- `npm test -- tests/unit/cinematic-navigation.test.ts` — PASS, 2/2.
- `npm test` — PASS, 5 files and 117 tests.
- `npm run build` — PASS, Astro check reported 0 errors, 0 warnings, 0 hints; static build completed with the repository's existing empty science collection warnings.
- `git diff --check` — PASS.
- SHA-256 comparison of each source/destination PNG — PASS; all three hashes match exactly.
- `file assets/concepts/oncall-idle-pose-approved-v1.png public/brand/cinematic/oncall-idle-pose-approved-v1.png` — PASS; both report `8-bit/color RGBA`.

## Self-review

- Canonical route hrefs, labels, short labels, and order are unchanged.
- Nested paths resolve through the longest matching navigation prefix; unknown paths fall back to `triage`.
- Root surface is `opening`, nested science entries are `article`, and other paths are `file`.
- All cinematic URLs are local `/brand/cinematic/` paths and point to copied approved assets.
- Source concept assets were not modified.

## Commit

`1f99912` (`feat: define ONCALL cinematic route contracts`)

## Concerns

None within Task 1 scope. PAR eligibility, route availability, and launch state remain outside this task.

## Provenance correction

`b6c0f36` is an amend of the implementation commit originally recorded as
`1f99912`. The amend changed only this report: it added the build result and
replaced the pending commit placeholder with the commit hash. It did not change
the product code, test, or copied asset files that were tested.

Evidence was run from the reviewed worktree with:

```text
git diff --quiet 1f99912 b6c0f36 -- ':!.superpowers/sdd/2026-09-06-oncall-cinematic-ux-prototype/task-1-report.md' && echo 'IDENTICAL: product code, tests, and assets' && git diff --name-only 1f99912 b6c0f36
IDENTICAL: product code, tests, and assets
.superpowers/sdd/2026-09-06-oncall-cinematic-ux-prototype/task-1-report.md
```

Therefore the focused/full tests, build, hash, alpha-channel, and diff checks
recorded above apply to the exact product/test/assets tree in reviewed head
`b6c0f36`; the only intervening change from `1f99912` is this report content.
