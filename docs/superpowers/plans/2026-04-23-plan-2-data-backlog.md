# Plan 2 — Data Verification Backlog

**Status:** open
**Origin:** Plan 2 Task 6 — bill-of-sale state rules

49 jurisdictions in `src/data/legal/bill-of-sale-state-rules.json` are seeded with `null` governing-law fields and a "Pending verification" note. They need primary-source verification before the per-jurisdiction sub-SEED pages (Plan 3) can ship.

## To verify

For each jurisdiction below, set `notary_required`, `witness_required`, `governing_statute`, `statute_url`, `vehicle_dmv_form`, `vehicle_dmv_url` from primary sources. Update `notes` to one-sentence summary of the jurisdiction's notable distinction. Bump `last_verified`.

Sources:
- US states: state legislature website (e.g. `leginfo.legislature.ca.gov`), state DMV/DOT, Cornell Legal Information Institute
- UK nations: `legislation.gov.uk`, `gov.uk`, Scottish/Welsh/NI government sites

### US states (47 pending — 3 already verified: CA, TX, NY, FL)

us-al, us-ak, us-az, us-ar, us-co, us-ct, us-de, us-ga, us-hi, us-id, us-il, us-in, us-ia, us-ks, us-ky, us-la, us-me, us-md, us-ma, us-mi, us-mn, us-ms, us-mo, us-mt, us-ne, us-nv, us-nh, us-nj, us-nm, us-nc, us-nd, us-oh, us-ok, us-or, us-pa, us-ri, us-sc, us-sd, us-tn, us-ut, us-vt, us-va, us-wa, us-wv, us-wi, us-wy

### UK nations (3 pending — England already verified)

uk-sco, uk-wal, uk-nir
