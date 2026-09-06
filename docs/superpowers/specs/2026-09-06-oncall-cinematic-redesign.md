# ONCALL cinematic case-file redesign

**Status:** Visual direction approved by Erdem on 2026-09-06
**Scope:** Replaces the visible interface and motion direction in the historical website design. The verified pair data, source ledger, risk boundaries, public research structure, and brand-neutral Science Notes policy remain authoritative.

## Approved visual targets

The following images are the visual contract for the redesign:

- [`assets/concepts/oncall-opening-approved-v1.png`](../../../assets/concepts/oncall-opening-approved-v1.png) — first-view opening state.
- [`assets/concepts/oncall-science-open-approved-v1.png`](../../../assets/concepts/oncall-science-open-approved-v1.png) — an opened Science Notes file.
- [`assets/concepts/oncall-3d-turntable-approved-v1.png`](../../../assets/concepts/oncall-3d-turntable-approved-v1.png) — canonical four-view 3D character reference, approved by Erdem on 2026-09-06.

They establish the character identity, scene, palette, lighting, material quality, scale, and information hierarchy. They are concept targets, not flattened substitutes for the final interface. Text, navigation, citations, and accessibility remain real HTML.

## Creative position

ONCALL is a nocturnal medical-records room run by a dry-humoured capybara. It should feel authored, tactile, strange, scientifically literate, and native to internet culture. The first screen must work as a meme image before the visitor reads a paragraph.

The palette is deep clinical green, near-black green, natural capybara brown, warm ivory paper, teal scrubs, and a sharp coral examination light. Thick folders, worn paper, steel, fur, cloth, stamps, pencil notes, and lamp shadows create depth. The interface must avoid startup dashboards, white card grids, glass effects, crypto motifs, fake market charts, and decorative scientific clichés.

Mosby's Files is a reference for metaphor strength, full-screen scale, oversized typography, layered physical navigation, and the way an opened file owns the viewport. ONCALL will not copy its layout, tab geometry, palette, assets, text, code, or animation timing.

## Opening sequence

The first useful frame appears immediately: ONCALL, the file stack, and navigation are available before animation completes.

1. **0–400 ms:** the room is near-black; the coral desk lamp warms up and reveals the folder edges and mascot silhouette.
2. **400–1,100 ms:** the camera settles at desk height. The capybara looks toward the visitor and places its coffee down.
3. **1,100–1,800 ms:** the mascot rests one paw on the top ONCALL file while the eight labeled folders resolve into their final stack.
4. **1,800–2,400 ms:** the wordmark and line `NIGHT SHIFT FOR THE TERMINALLY ONLINE.` settle into place. The stage becomes idle and interactive.

The opening plays once per visit session. A visible skip control works from the first frame. Clicking a file interrupts the opening and proceeds directly to that file. Reduced-motion mode starts at the final static composition.

## File navigation and transitions

The folder stack is the primary navigation object. Each label is a real link and remains usable with JavaScript disabled.

On selection, the link becomes active immediately. The persistent 3D mascot walks or turns toward the selected folder, reaches for it, and pulls it forward. The folder uses perspective and physical shadow to open into a large editorial surface. Target duration is 650–900 ms. The page content is available to assistive technology and browser history as soon as navigation begins; it never waits on animation.

Rapid selections cancel the previous movement and resolve to the most recent file. They do not create an animation queue. Back, forward, direct URLs, focus restoration, and keyboard navigation must work normally.

Desktop uses a wide records-room stage. The opened file occupies the foreground while the mascot remains at an edge. Mobile uses a shallow crop and a short reach instead of a long walk. The stage contracts after the article heading so long scientific text reads as an editorial page rather than inside a canvas.

## 3D mascot system

The final mascot is a custom rigged 3D asset, not a stock model and not a perspective-warped PNG. Its immutable identity traits are:

- warm natural brown capybara fur;
- broad muzzle, small rounded ears, heavy-lidded dry expression;
- teal medical scrubs;
- stethoscope and coral identity tag;
- calm, deliberate movement rather than bouncing or frantic gestures.

The runtime uses one persistent WebGL scene with a compact animation state machine: `idle`, `look`, `walk`, `reach`, `open`, `inspect`, and `settle`. Folder selection maps to a short sequence of these states. The model, textures, lighting, and animation clips must be approved visually before integration.

The 3D stage loads after the initial HTML has rendered. It uses a capped pixel ratio, compressed textures, limited lights, and pauses when off-screen. The approved opening image is the same-size poster and failure fallback. No essential text, navigation, status, or evidence appears only in WebGL.

## Required visual approval gates

Implementation advances only after these review points:

1. **Approved:** opening and opened-Science concept images.
2. **Approved:** canonical 3D turntable showing front, three-quarter, side, back, materials, and expression.
3. Opening motion clip: lamp, look, coffee, folder stack, and final pose.
4. File-transition prototype: walk, reach, pull, open, cancel, and latest-click behavior.
5. Desktop and mobile interactive prototype with real typography.
6. Populated Science Notes file and Five Pairs file in the final system.

Feedback at each gate updates the visual target before the next stage. A technically functional result is not accepted as visually complete by itself.

## Public-state copy

The public experience must read as the final ONCALL world. Remove visible `PENDING`, `empty file`, `working identity`, `provisional`, and disabled launch controls from the primary experience. Use `ON SHIFT` as the character/world status.

Unknown launch facts are never invented. A module that depends on an unverified token contract, pool, route, priceability measurement, or live link stays out of the public layout until the value is verified. The source and risk ledger may state factual technical limits in plain language, but the landing experience does not present an unfinished checklist.

The fixed selected set remains LLY / Eli Lilly and Company, JNJ / Johnson & Johnson, HIMS / Hims & Hers Health, MRNA / Moderna, and UNH / UnitedHealth Group. The interface never silently substitutes another pair.

## Science Notes at launch

Science Notes launches with five substantive, sourced entries rather than an empty-state screen. Each entry maps editorially to one selected pair's medical domain while keeping the scientific title, question, evidence synthesis, and conclusion brand-neutral.

Initial research tracks are:

1. obesity and cardiometabolic outcomes beyond body weight;
2. evaluation of medical devices and broad clinical evidence;
3. telemedicine quality, continuity, access, and patient communication;
4. mRNA vaccine science, immune response, benefit, and uncertainty;
5. health systems, population outcomes, and the limits of administrative data.

The content model includes the clinical question, why it matters, methods/search date, evidence summary, claim-level citations, limitations, applicability, conflicts/funding when reported, named human reviewer, review date, and correction history. Company/ticker association appears in metadata and the Five Pairs record, not as a promotional scientific conclusion.

No effect size, treatment claim, quotation, citation, or publication status is fabricated. Literature research uses current primary studies, systematic reviews, major evidence syntheses, and authoritative reporting guidance. Every note remains unpublished until human scientific review is recorded.

## Page roles

- **TRIAGE:** cinematic opening and entry into the files.
- **THE CHART:** project identity, token facts, and permanent settings once verified.
- **FIVE PAIRS:** the fixed five-company register and domain mapping.
- **ROBINHOOD CHAIN:** clear platform and multi-pair mechanics.
- **SCIENCE NOTES:** five evidence-led launch articles and later reviewed notes.
- **MARKET ROUNDS:** sourced company and market context, separated from science.
- **NIGHT SHIFT:** mascot posts, short jokes, visual assets, and X archive.
- **SOURCES & RISKS:** source ledger, corrections, technical limits, and risk language.

## Technical boundaries

Astro continues to produce semantic pages and direct URLs. A small client-side transition coordinator preserves the 3D scene across route changes and gives folders their physical motion. The system must retain readable server-rendered HTML, normal links, no-script navigation, and static poster fallbacks.

The implementation must verify:

- keyboard and screen-reader navigation throughout the folder stack;
- skip-opening and reduced-motion behavior;
- cancellation during rapid file changes;
- direct navigation, back, and forward behavior;
- no horizontal overflow at 320 px;
- readable long-form science content;
- acceptable initial HTML paint before 3D loads;
- bounded WebGL memory, texture size, and mobile pixel density;
- no third-party logos, copied reference-site assets, fake data, or hidden medical/financial claims.

## Out of scope for the visual build

Publishing the site, creating or launching the token, executing PAR transactions, claiming route liquidity, and posting to X remain separate actions. They require their own verified data and explicit authorization.
