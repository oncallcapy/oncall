# MultiPair Project on PAR — Shared Project Brief

_Last updated: 2026-09-06_

## Objective

Create an original medicine/science/finance meme token on PAR, supported by an
independent mascot-led X account and a distinctive website. The account is fed
by Erdem, with periodic help from Codex or Claude. The project should feel
serious in craft and evidence while keeping a dry, mischievous sense of humour.

## Current creative direction

- Working name: `ONCALL` (provisional; availability and conflicts not checked).
- X identity draft: display name `ONCALL`, preferred handle `@oncallcapy`, and
  bio: “Night shift. Clear head. Question everything. Medicine, science &
  market culture on Robinhood Chain. Evidence first. Memes after rounds.”
- Approved social exports live in `assets/social/`; source-size versions are
  retained beside the X-ready 800×800 profile and 1500×500 banner files.
- Mascot: an original anthropomorphic capybara night-shift clinician.
- Personality: calm, clever, scientifically curious, dry humour, mildly
  mischievous; never loud, childish, manic, or salesy.
- Visual reference: `assets/brand/oncall-visual-direction-01.png`.
- Current palette: ivory `#F4F0E6`, deep ink `#183C3C`, teal `#287C78`, fur
  `#C69C72`, coral `#ED806B`.
- Character invariants: capybara silhouette and muzzle, half-lidded eyes,
  petrol-teal V-neck scrubs, dark stethoscope, coral badge on left chest,
  flat 2D editorial illustration, rounded dark outlines, at most one shadow
  tone, no gradients or glossy crypto imagery.
- The first image is a direction board, not the final character sheet. Small
  depictions contain accessory drift and the generated date is incorrect.

## Content system

- `Science Notes`: sourced and clearly scoped medicine/science explanations.
- `Market Rounds`: health-company and market context with evidence and caveats.
- `Night Shift`: original work/night-shift/internet/market humour.
- `FIVE PAIRS` explicitly displays the five selected Stock Token symbols and
  company names because they identify the intended quote markets. Their status
  is `SELECTED / TECHNICAL CHECK PENDING`; no ONCALL pool is verified or live.
- Each selected pair has a visible medicine/science research-track mapping,
  recorded below and in the [pair files](pair-files/README.md#research-track-mapping).
  Pair association is explicit editorial metadata, not endorsement or company
  sponsorship. Science Note titles and conclusions remain evidence-based and
  brand-neutral; company names, tickers and products do not become article
  framing. Company-specific news or market analysis belongs in `Market Rounds`.
- Medical content must not imply diagnosis, treatment advice, or clinical
  validation. Finance content must not promise returns or safety.

## Approved website direction

On 2026-09-06 Erdem approved the clinical chart / case-file metaphor as the
primary website direction. Erdem likes Mosby's Files
(`https://www.mosbyfiles.com/`). Take inspiration
from the design principles, not its expression or assets:

- Make the interface metaphor fit the subject: use an original night-shift
  clinical chart / case-file system.
- Use persistent tabs as navigation and classification.
- Give typography three explicit roles: condensed display for punchlines and
  major headings, readable serif for scientific narrative, monospace for
  metadata, sources, timestamps, addresses, and on-chain facts.
- Use tactile paper, stamps, annotations, clipped mascot art, and restrained
  motion. Create all assets and layouts originally.
- Do not copy Mosby's folder stack, page composition, colour mapping, text,
  illustrations, photography, CSS, or animation choreography.

Website sections:

1. `TRIAGE` — landing statement and mascot introduction.
2. `THE CHART` — what the token is and is not; launch fields remain pending until verified.
3. `FIVE PAIRS` — the five selected identities, with technical checks explicitly pending.
4. `SCIENCE NOTES` — sourced educational posts.
5. `MARKET ROUNDS` — health-market commentary separated from medical content.
6. `NIGHT SHIFT` — mascot posts and meme archive.
7. `SOURCES & RISKS` — source ledger, PAR mechanics, contracts, and risk text.

The dedicated `ROBINHOOD CHAIN` section explains the chain, PAR's role and
multi-pair mechanics. ONCALL launch links remain pending until verified.
`SCIENCE NOTES` entries should carry article links and structured citations. The mascot must appear throughout
the experience; motion should enhance personality while preserving a static
fallback and reduced-motion accessibility.

## PAR platform statements from official documentation

- PAR launches a fixed supply of 1,000,000,000 tokens into Uniswap v4.
- A multi-market launch can open 1–5 pools for one token in one transaction.
- Supply is split equally between the pools; the launch keeps one opening
  market capitalization spread across the markets.
- Quote assets must be priceable by PAR's quote pricer; each route must meet
  PAR's current in-range depth requirements.
- Token name, symbol, image, description, and social links are written at
  launch and cannot be changed afterward.
- Contracts are described by PAR as unaudited. Re-check current official docs
  and live contract state before launch.
- Pairing with five stock tokens does not by itself make the meme token an
  index fund, give ownership of those equities, or guarantee tracking/returns.

Primary reference: `https://par.family/docs`.

## Selected pair identities and research tracks

**SELECTED / TECHNICAL CHECK PENDING.** LLY, JNJ, HIMS, MRNA and UNH are the
selected and intended five pair identities. This is the fixed project direction,
not a shortlist awaiting another selection. The five research-track mappings are
explicit project metadata:

| Selected symbol | Underlying company | Medicine/science research track |
| --- | --- | --- |
| LLY | Eli Lilly and Company | Metabolic medicine, obesity, diabetes and cardiometabolic outcomes |
| JNJ | Johnson & Johnson | Broad clinical medicine, medical technology and evidence appraisal |
| HIMS | Hims & Hers Health | Digital health, telemedicine and patient communication |
| MRNA | Moderna | Molecular medicine, immunology and vaccine science |
| UNH | UnitedHealth Group | Health systems, outcomes and population health |

The mapping is visible without making scientific articles company-centred:
titles and conclusions remain evidence-based and brand-neutral. A research-track
association does not validate a treatment or company, imply company sponsorship,
or recommend an investment. See the [Science Notes editorial contract](science-notes/README.md).

Robinhood's [official assets API](https://api.robinhood.com/rhj/assets) reported
`ASSET_STATUS_ACTIVE` for these five quote-asset entries on chain ID 4663 at
`2026-09-06T15:38:34Z`. This is a dated API deployment/status observation only.
It does not establish live PAR priceability, route availability, in-range depth,
liquidity, operational suitability or an ONCALL launch. Exact quote contracts and
the observation receipt are recorded in the [pair files](pair-files/README.md).

PAR priceability and route/depth remain unverified for every selected pair and
must be checked close to launch, alongside liquidity and operational risk. A
failed technical check **blocks launch** and requires an **explicit documented
new decision**. No asset may be silently substituted. Keeping a pair selected
never overrides a failed or incomplete technical check.

## Open decisions

- Final project/token name and ticker.
- Final character model sheet and approved poses.
- Final website review and exact launch copy.
- Complete live PAR priceability and route/depth checks for all five selected
  identities; document any failure and obtain an explicit new decision before
  changing the selected set or proceeding toward launch.
- Creator tax, dev buy, fee wallet, launch timing, and launch approval.
- Domain and X handle availability.

## Current implementation and next review

The local website foundation and public research documents are implemented for
review. The [website design](docs/superpowers/specs/2026-09-06-oncall-website-design.md)
and [implementation plan](docs/superpowers/plans/2026-09-06-oncall-site-foundation.md)
record the design work. See the [repository overview](README.md) for local setup,
verification commands and current limits.

Review the final concrete website, research documents and launch settings before
any publication or launch approval. Local implementation and passing tests do
not establish PAR eligibility or on-chain verification.
