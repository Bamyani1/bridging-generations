# Bridging Generations

Marketing site for Bridging Generations, a U.S. 501(c)(3) nonprofit sponsoring underprivileged students in the Chittagong Hill Tracts, Bangladesh.

## Local development

- `npm run dev` — start the development server at http://localhost:3001
- `npm run build` — production build
- `npm run typecheck` — TypeScript type check
- `npm run lint` — Biome lint, format, and import-sort (verify only)
- `npm run format` — Biome write (autofix)
- `npm run test` — Vitest unit tests
- `npm run test:e2e` — Playwright e2e tests

Content lives in `content/` and is edited via Keystatic at `/keystatic`. In dev the admin writes directly to the local filesystem. Non-engineers should follow [CONTRIBUTING.md](./CONTRIBUTING.md).

## Keystatic — GitHub auth (preview + production)

Dev uses `kind: "local"` and ignores auth. Preview and production need a GitHub OAuth App so only invited editors can publish.

**One-time setup (site admin):**

1. Create a GitHub OAuth App at https://github.com/settings/developers → **New OAuth App**.
   - Homepage URL: `https://<your-domain>`
   - Authorization callback URL: `https://<your-domain>/api/keystatic/github/oauth/callback`
2. Copy the **Client ID** and generate a **Client Secret**.
3. Set these environment variables in Vercel (Preview + Production scopes):
   - `KEYSTATIC_GITHUB_CLIENT_ID` — from step 2
   - `KEYSTATIC_GITHUB_CLIENT_SECRET` — from step 2
   - `KEYSTATIC_SECRET` — 32+ random chars for session cookie signing (`openssl rand -base64 32`)
   - `KEYSTATIC_URL` (optional) — override if the deploy domain differs from the OAuth callback base
4. Grant each board editor access to the `Bamyani1/bridging-generations` repo so their GitHub account can authenticate.
5. Redeploy.

When `KEYSTATIC_GITHUB_CLIENT_ID` is unset, the site falls back to local storage — safe for dev, but the admin UI will not persist writes in production.

## License

TBD.
