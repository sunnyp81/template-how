# template.how

US + UK template resource site. See `docs/superpowers/specs/2026-04-22-template-how-design.md`.

## Commands

- `npm run dev` — start dev server at http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm test` — run unit tests
- `npm run test:e2e` — run Playwright smoke tests
- `npm run validate:links` — run build-time link-graph orphan check
- `SKIP_LINK_GRAPH=1 npm run build` — bypass link-graph validator (foundation phase only; never use after Plan 3).
- `npm run lighthouse` — run Lighthouse CI against built output

## Deploy

Pushes to `main` auto-deploy via Cloudflare Pages (`sunnypat81` account, project `template-how`).
