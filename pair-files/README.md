# Selected pair files

**SELECTED / TECHNICAL CHECK PENDING.** LLY, JNJ, HIMS, MRNA and UNH are the selected and intended five pair identities. Their selection is fixed as the project direction. A failed PAR priceability or route/depth check blocks launch and requires an explicit new decision; assets must never be silently substituted.

The five Stock Token identities are drawn from the website's [selected pair data](../src/data/pairCandidates.ts) and [shared theme and identity configuration](../src/config/scienceThemes.ts). None is a verified ONCALL pool. The contracts below identify quote assets, not an ONCALL token, pool or launch receipt.

| Symbol | Underlying company | Robinhood Chain quote contract | Editorial theme | API observation | PAR status | Route status |
| --- | --- | --- | --- | --- | --- | --- |
| LLY | Eli Lilly and Company | `0x8005d266423c7ea827372c9c864491e5786600ea` | Metabolism & metabolic medicine | ACTIVE | PENDING | PENDING |
| JNJ | Johnson & Johnson | `0x03DfbBE0AC4E7bCDaFd08eD41A400326B77D8c80` | Evidence-based clinical medicine & medical technology | ACTIVE | PENDING | PENDING |
| HIMS | Hims & Hers Health | `0xCceE82fE024c36fA15E1005edE3E9e4787e23D09` | Digital health & patient communication | ACTIVE | PENDING | PENDING |
| MRNA | Moderna | `0x43B07D15cE533bEc5476d70C22a78a1B2B662155` | Molecular medicine, immunology & vaccine science | ACTIVE | PENDING | PENDING |
| UNH | UnitedHealth Group | `0xcF364ea52787e289De6F32077834056E3E70D6A8` | Health systems, outcomes & population health | ACTIVE | PENDING | PENDING |

## Observation receipt and scope

The official [assets API](https://api.robinhood.com/rhj/assets) reported **ASSET_STATUS_ACTIVE** for all five entries on chain ID **4663** at **2026-09-06T15:38:34Z**. The recorded response was **154149 bytes**, with SHA-256:

```text
af6387ef7bad187d8a45d1ec9e94807bdd96cd1485d0f7ca85246b70d70119ee
```

This identifies the recorded API response and observation; it is not ongoing monitoring. The raw response is not part of this public layer, so the hash alone does not let a reader independently reconstruct that snapshot. A fresh request may return different data. Compare metadata with the [official contract directory](https://docs.robinhood.com/chain/contracts/) and record discrepancies rather than silently changing a contract.

API activity establishes neither PAR quote eligibility nor an executable route, in-range depth, liquidity, price, safety, investment merit or issuer endorsement. **PAR status and route status remain PENDING for each selected pair.** Any later change needs dated evidence of the specific check, source and observed result; a route's existence alone does not establish usable size or execution quality. ONCALL pools and launch links must remain absent until real receipts exist and are checked.

## Research-track mapping

The pair association is explicit research-track metadata:

- **LLY:** metabolic medicine, obesity, diabetes and cardiometabolic outcomes.
- **JNJ:** broad clinical medicine, medical technology and evidence appraisal.
- **HIMS:** digital health, telemedicine and patient communication.
- **MRNA:** molecular medicine, immunology and vaccine science.
- **UNH:** health systems, outcomes and population health.

Theme mapping is editorial organisation. It is not clinical validation, a company recommendation or an investment recommendation. Science Notes ask independent clinical questions and remain evidence-based and brand-neutral in their titles and conclusions. The pair association belongs in explicit research-track metadata or this mapping, not in company-sponsored framing or an endorsement. Linking a scientific area to a selected pair does not imply that a specific treatment works, that a company succeeds, or that a quote asset is suitable.

Stock Tokens provide economic exposure without legal or beneficial rights in the issuer of the underlying security. The [official product explanation](https://robinhood.com/rhj/stocktokens/) describes their debt-security structure and availability restrictions (accessed 2026-09-06). A planned pool does not give ONCALL holders share ownership, collateral backing, an index portfolio or guaranteed tracking. Read the [risk register](../risk/README.md) alongside these addresses.
