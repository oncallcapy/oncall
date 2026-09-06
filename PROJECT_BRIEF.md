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
- `FIVE PAIRS` explicitly displays the five paired stock-token symbols and
  company names because they identify the actual quote markets.
- Pair assets may inform the editorial topic map, but Science Notes never use
  company names, tickers, or products as article framing. They cover
  evidence-based medicine directly. Company-specific news or market analysis
  belongs in `Market Rounds`.
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

Candidate site sections:

1. `TRIAGE` — landing statement and mascot introduction.
2. `THE CHART` — what the token is and is not; verified token facts.
3. `FIVE PAIRS` — five health-related quote markets with live/verified status.
4. `SCIENCE NOTES` — sourced educational posts.
5. `MARKET ROUNDS` — health-market commentary separated from medical content.
6. `NIGHT SHIFT` — mascot posts and meme archive.
7. `SOURCES & RISKS` — source ledger, PAR mechanics, contracts, and risk text.

Add a dedicated `ROBINHOOD CHAIN` folder explaining the chain, PAR's role,
multi-pair mechanics, and verifiable live links. `SCIENCE NOTES` entries should
carry article links and structured citations. The mascot must appear throughout
the experience; motion should enhance personality while preserving a static
fallback and reduced-motion accessibility.

## PAR facts verified from official documentation

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

## Health-stock token candidates

Robinhood's official public assets API showed active Robinhood Chain
deployments for LLY, JNJ, HIMS, MRNA, UNH, PFE, ABCL, and IBRX on 2026-09-06.
This verifies deployment and active API status only. It does not prove that
PAR can currently price them or that their routes meet the required depth.

Initial narrative set: LLY, JNJ, HIMS, MRNA, UNH. Final pair selection must be
made only after measuring PAR priceability, route depth, liquidity, thematic
balance, and operational risk close to launch.

Official asset endpoint: `https://api.robinhood.com/rhj/assets`.

## Open decisions

- Final project/token name and ticker.
- Final character model sheet and approved poses.
- Website information architecture and exact launch copy.
- Which five health-related stock tokens pass live PAR eligibility checks.
- Creator tax, dev buy, fee wallet, launch timing, and launch approval.
- Domain and X handle availability.

## Next design step

Review `docs/superpowers/specs/2026-09-06-oncall-website-design.md`. After Erdem
approves the written design, create an implementation plan and then a visual
homepage prototype before production implementation.
