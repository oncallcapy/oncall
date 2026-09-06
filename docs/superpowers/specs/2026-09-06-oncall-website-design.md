# ONCALL Website Design Specification

> Historical implementation record. Task-era terminology below is retained for context. Current selected-pair policy is authoritative in [PROJECT_BRIEF.md](../../../PROJECT_BRIEF.md) and [the pair register](../../../pair-files/README.md).


_Date: 2026-09-06_  
_Status: approved by Erdem on 2026-09-06_  
_Working name: ONCALL; final name and ticker are not approved_

## Purpose

Build a memorable website for a medicine, science, finance, and internet-culture
meme token launched through PAR on Robinhood Chain. The website should make the
project feel researched and carefully made without pretending the token is a
medical product, investment fund, or validated financial instrument.

The site has three jobs:

1. Introduce the mascot and establish a recognizable world.
2. Explain the token, PAR multi-pair mechanics, and five chosen markets with
   verifiable sources.
3. Publish durable Science Notes, Market Rounds, and Night Shift content that
   can support the X account after launch.

## Approved creative direction

The interface is an original night-shift clinical archive. Visitors navigate
through a set of persistent case-file tabs. Opening a section should feel like
pulling a chart from a trolley and placing it on a desk.

Mosby's Files is a reference for the strength of its metaphor, typographic role
separation, persistent classification, and tactile navigation. No layout,
colour system, image, text, code, or animation choreography will be copied.

The visual world combines:

- a near-black or deep-ink night-shift background;
- warm ivory chart paper;
- petrol teal folders and clinical elements;
- restrained coral stamps and annotations;
- original mascot illustrations and medical-document details;
- visible sources and timestamps rather than decorative fake data.

## Information architecture

The primary navigation remains visible as indexed folder tabs on desktop. On
mobile, the same structure becomes a horizontally scrollable tab rail followed
by a conventional page heading, so the metaphor never blocks reading.

### TRIAGE

The landing file introduces ONCALL and the mascot. It contains the primary
statement, two actions (`OPEN THE CHART`, `VIEW ON PAR` after launch), and a
small status panel. Before launch, the second action reads `LAUNCH PENDING` and
does not imply a live contract.

Provisional hero copy:

> NIGHT SHIFT. CLEAR HEAD. QUESTION EVERYTHING.
>
> An independent medicine, science and market meme living on Robinhood Chain.
> One token. Up to five health-related markets. Built for curiosity, not
> certainty.

The status panel may use dry humour, such as `STATUS: UNDER OBSERVATION` and
`PROGNOSIS: VOLATILE`, but it must not show invented market data.

### THE CHART

Explain what ONCALL is, what it is not, its fixed supply, creator terms, and
the permanent settings selected at launch. Before launch, every unresolved
field displays `PENDING`, never a placeholder address or fabricated value.

After launch, show the token contract, supply, launch transaction, creator tax,
pool fee, fee recipient policy, and direct explorer/PAR links. All addresses
must be copied from verified on-chain state or official PAR records.

### FIVE PAIRS

Present five case cards, each with:

- quote-asset symbol and full name;
- thematic role in the health narrative;
- Robinhood Chain contract address;
- PAR priceability status and measurement time;
- route/depth status where it can be read reliably;
- direct official asset, explorer, and pool links;
- a plain-language risk note.

Candidate narratives are metabolism, broad medicine, digital health, biotech,
and health systems. The current candidate symbols are LLY, JNJ, HIMS, MRNA,
and UNH. They remain candidates until live PAR eligibility and route depth are
measured close to launch.

The page must say that five quote markets do not create stock ownership,
collateralization, an index fund, or guaranteed price tracking.

### ROBINHOOD CHAIN

This dedicated file explains:

- what Robinhood Chain is and its chain ID;
- what Robinhood Stock Tokens represent, using current official wording;
- what PAR does during a multi-market launch;
- how one token can open up to five ordinary Uniswap v4 pools;
- how supply is divided across pools;
- which properties are permanent;
- where visitors can verify contracts and transactions.

The section uses a simple original diagram: `ONCALL token → five Uniswap v4
pools → five quote assets`. The explanation must distinguish tokenized economic
exposure from direct share ownership and distinguish PAR's platform statements
from independently verified facts.

Primary sources are PAR documentation, Robinhood Chain documentation and API,
the chain explorer, verified contracts, and transaction receipts. Source access
dates are displayed.

### SCIENCE NOTES

Science Notes are short educational articles written in plain language. Each
note contains:

- title, one-sentence takeaway, topic, and publication date;
- main text with careful scope and uncertainty;
- `What the study found`, `What it did not prove`, and `ONCALL's note` blocks;
- a reference list with article title, authors or group, journal, year, DOI or
  PMID when available, and an outbound link;
- source access date and correction history.

Article links must resolve to the publisher, DOI, PubMed, a registry, or another
authoritative source. Secondary reporting can provide context but cannot be the
only support for a medical claim. The mascot's humour stays in commentary and
captions; it must not alter the scientific conclusion.

The five pair narratives define a topic map, not branded editorial coverage:

- metabolism and metabolic medicine;
- evidence-based clinical medicine and medical technology;
- digital health and patient communication;
- molecular medicine, immunology, and vaccine science;
- health systems, outcomes, and population health.

Science Notes display these topic names without company names, logos, tickers,
or product-centered article framing. The actual pair symbols and company names
must be displayed clearly in `FIVE PAIRS`, because they identify the five quote
markets. They may also appear in `MARKET ROUNDS` when reporting company or
market events. A Science Note must never imply that a company sponsors,
endorses, or is clinically validated by the article.

### MARKET ROUNDS

Market Rounds covers health-company and sector events. It is visually related
to Science Notes but clearly labeled `MARKET`, with sources and observation
times. It does not diagnose companies, predict prices as fact, or present the
five pair assets as recommendations.

### NIGHT SHIFT

Night Shift is the meme and mascot archive. It contains reusable images,
one-liners, and selected X posts. Embedded third-party content should be kept
light; the website should remain useful if an X embed fails or is blocked.

### SOURCES & RISKS

A permanent source ledger lists current PAR documentation, Robinhood Chain
documentation, official stock-token API data, explorer records, and scientific
references. A separate risk panel covers unaudited-contract risk, volatility,
quote-asset risk, liquidity/routing risk, irreversible transactions, and the
absence of medical or financial advice.

## Mascot integration and motion

The current concept board is a raster reference. It can be displayed on the
website but cannot support reliable facial or limb animation by itself.

Create a production mascot pack before implementation:

1. Approve one canonical front/three-quarter character drawing.
2. Produce a transparent static hero asset and small static fallback.
3. Produce consistent separated layers or a vector rig for head, eyelids,
   pupils, eyebrows, forearm, coffee cup, torso, and shadow.
4. Export a lightweight runtime animation format plus poster image.
5. Compare every export against the canonical character invariants.

Recommended motion is sparse: one blink every several seconds, a slow breathing
shift, an occasional eyebrow raise, and a single cup movement after deliberate
interaction. Folder changes may trigger a small pose change. The mascot should
never bounce continuously, block text, chase the pointer, or create motion that
resembles an urgent clinical alert.

When `prefers-reduced-motion` is enabled, the site uses the static asset and
simple opacity changes. When animation fails to load, the static asset occupies
the same dimensions to prevent layout movement.

## Typography and writing system

Use three roles with licensed or open-source fonts selected during visual
design:

- condensed grotesque: short display headings and punchlines;
- readable serif: science articles and longer explanations;
- monospace: metadata, citations, timestamps, contract addresses, and labels.

The mascot speaks in short, dry lines. Scientific explanations use calm,
literal prose. On-chain facts use terse labels and exact values. Humour is never
inserted into risk language, source metadata, or medical conclusions.

The initial public site language is English. The architecture should permit a
later Turkish edition without putting both languages into the same visual block.

## Content and data model

Start with version-controlled content rather than a CMS. Content changes are
infrequent at launch, and reviewable files reduce accidental unsupported claims.

Suggested records:

- `science-note`: slug, title, summary, body, topics, published date, references,
  access dates, corrections, and mascot annotation;
- `market-round`: slug, observation time, body, sources, and disclosures;
- `pair`: symbol, narrative role, contracts, route status, measured time, links,
  and risk note;
- `project-fact`: label, value, source URL, observed time, and verification
  status.

Live market or on-chain data must display its last successful observation time.
If a provider fails, retain the last known value only when labeled stale;
otherwise show `CURRENT DATA UNAVAILABLE`. Do not replace missing data with
zeros.

## Technical direction

Use a statically generated, component-based site with small client-side islands
for the case-file navigation, mascot animation, and optional live status. This
keeps articles fast and indexable while containing animation complexity.

The exact framework and hosting provider are implementation-plan decisions. The
design requires:

- responsive server-rendered or pre-rendered pages;
- progressive enhancement for navigation and motion;
- reusable folder, citation, pair-card, fact-row, and mascot components;
- no wallet connection required for reading;
- outbound links to PAR for trading rather than a custom trading interface in
  the initial release;
- analytics only if explicitly approved, with no medical-interest profiling.

## Accessibility and performance

- All navigation works by keyboard and has visible focus states.
- Folder colour is never the only category indicator.
- Body copy meets readable line length and contrast requirements.
- The mascot has contextual alt text or empty alt text when decorative.
- Motion respects reduced-motion preferences and can be paused if it repeats.
- The initial page remains readable without JavaScript.
- Fonts, images, and animation are budgeted so mobile content appears promptly.

## Error and integrity states

- Pre-launch addresses and links: `PENDING`.
- Failed or stale live data: explicit timestamped status.
- Missing scientific source: the note cannot be published.
- Broken external article link: keep the citation text and mark link status for
  correction; do not remove the supporting reference silently.
- X embed unavailable: show the locally authored caption and image where rights
  allow.
- Mascot animation unavailable: static fallback.

## Validation before launch

1. Verify every contract, pool, fee, and pair against official/on-chain sources.
2. Test positive and negative data states: live, pending, stale, unavailable,
   and malformed provider responses.
3. Review every Science Note for claim/source agreement and functioning links.
4. Check that all five pair cards avoid index, ownership, backing, and guarantee
   implications.
5. Test keyboard, screen-reader structure, reduced motion, contrast, and mobile
   reading.
6. Test with JavaScript disabled and with animation/data providers blocked.
7. Confirm the final immutable PAR metadata and social links before the wallet
   transaction is prepared.

## Delivery sequence

1. Finalize name/ticker availability and canonical mascot sheet.
2. Produce a low-fidelity desktop/mobile layout for the approved sections.
3. Produce a high-fidelity visual prototype using original assets.
4. Implement the static content and navigation.
5. Add mascot motion and verified data enhancement.
6. Complete content, accessibility, performance, and on-chain verification.
7. Present the final launch metadata and site for Erdem's approval.
8. Publish and transact only after explicit approval.

## Deliberately deferred

- wallet connection and custom swaps;
- user accounts or comments;
- a full CMS;
- automated medical-content generation or publication;
- implied endorsement by PAR, Robinhood, stock issuers, journals, or authors.
