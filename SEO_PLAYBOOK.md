# SEO Playbook

Learnings from bringing quicknotedeals.com (this codebase) up to a clean SEO audit, one RankScore.co finding at a time. Apply these from the start on any new site forked from this template — cheaper than retrofitting.

## 1. Sitemap & robots.txt

- Use the Next.js file conventions, don't hand-write static XML: `app/sitemap.ts` (returns `MetadataRoute.Sitemap`) and `app/robots.ts` (returns `MetadataRoute.Robots`, with a `sitemap` field pointing at it).
- **Cloudflare gotcha**: if the domain sits behind Cloudflare, check the dashboard's **AI Crawl Control** section. Cloudflare can inject its own managed content in front of your app's `robots.txt` response — `Disallow` rules for ClaudeBot/GPTBot/Google-Extended/etc. that you never wrote, regardless of what `app/robots.ts` says. Verify with `curl https://domain/robots.txt`; if you see a `BEGIN Cloudflare Managed content` block, that's this feature overriding you at the edge.
  - Fix via Cloudflare API (dashboard toggle also works): `PUT /zones/{zone_id}/bot_management` with `{"ai_bots_protection": "disabled", "is_robots_txt_managed": false}`.
  - The token permission for this is called **"AI Crawl Control"** in newer Cloudflare accounts — not "Bot Management" or "Zone Settings" (both are stale/renamed names). If it's not selectable as its own permission group, grant broader zone permissions on the token instead.

## 2. Canonical URL

```ts
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  alternates: { canonical: "/" },
  // ...
};
```
Without `metadataBase` + `alternates.canonical`, Next emits no canonical tag at all.

## 3. JSON-LD structured data

- Pick the most specific accurate schema.org type — e.g. `FinancialService` (a real subtype of Organization/LocalBusiness) instead of generic `Organization`.
- Model actual offerings via `makesOffer` → `Offer` → `itemOffered: Service`. Avoid `FinancialProduct`/`InvestmentOrDeposit` unless you actually want to make formal registered-product claims — those types imply guarantees that can conflict with standard compliance disclaimers ("not FDIC insured," etc.).
- **Never emit Review/AggregateRating schema for placeholder testimonials.** If the visible cards are commented out or use fabricated names, there is nothing real to mark up — structured data must describe visible, genuine content only.

## 4. Open Graph & Twitter Cards

- Use `app/opengraph-image.tsx` and `app/twitter-image.tsx` (the `next/og` `ImageResponse` API) to generate a branded 1200×630 image, rather than cropping an existing photo to fit — aspect-ratio mismatches (e.g. a portrait hero photo) look bad when force-cropped to the 1.91:1 OG ratio.
- Factor the shared JSX into a plain helper module (any name that isn't itself a Next special-file convention, e.g. `shared-og-image.tsx`) so both images stay pixel-identical without duplicated markup.
- Keep `ImageResponse` content to system fonts / inline styles only — loading a custom font into Satori requires fetching a raw font file at build time, which is extra fragility for a rarely-seen image.
- Set metadata explicitly — Next does **not** auto-populate `og:*`/`twitter:*` from the base `title`/`description`:
```ts
openGraph: { title, description, url, siteName, type: "website" },
twitter: { card: "summary_large_image", title, description },
```

## 5. llms.txt

- Add `public/llms.txt` per the [llmstxt.org](https://llmstxt.org) convention: H1 title, one-line blockquote summary, then H2 sections with markdown links + short descriptions.
- Include a short "Usage notes for AI systems" section if the business is finance/investment-adjacent: state plainly that cited figures are illustrative, not guaranteed returns. Cheap insurance against an AI summarizer overstating your numbers.

## 6. LCP (Largest Contentful Paint) — the highest-leverage category

**The #1 anti-pattern**: wrapping the above-the-fold hero content in an entrance animation library (Framer Motion, etc.) using `initial={{ opacity: 0 }}`. This renders literally as `opacity:0` in the SSR'd static HTML and stays invisible until JS hydrates *and* the animation timeline completes (stagger + duration). This alone cost us ~1s of mobile LCP. Fix: never animate `opacity` on the actual LCP candidate (usually the H1) — animate `y`/`scale`/`transform` only. Content is then fully painted at first render; it just slides/scales into its final position, which doesn't delay LCP.

**Image priority discipline**: only mark an `<Image priority>` if it's genuinely visible in the initial viewport *for the device class being measured*. An image hidden via `hidden lg:block` (desktop-only) but still marked `priority` gets eagerly preloaded on mobile anyway — wasted bandwidth competing with what mobile LCP actually needs. Use `loading="lazy"` plus a `sizes` hint that goes to zero below the breakpoint where it's shown, e.g. `sizes="(min-width: 1024px) 40vw, 0px"`.

**Compress at the source.** Don't rely solely on next/image's runtime optimizer to fix an oversized original — resize/recompress before dropping a photo into `public/`. We found a 4160×6240px, 3.3MB source being served for a ~550px-wide display column; resizing to 1200×1800 cut it to ~500KB before Next's own optimization even ran.

**Font preload is usually already correct** — next/font auto-preloads only the Unicode subset your content actually needs (verify with a build check rather than assuming a gap exists).

## 7. Speed Index / TBT / bundle size

- Don't mark a component `"use client"` unless it actually needs state/effects/browser APIs. A purely presentational component (even one with a CSS `@keyframes` animation) should stay a Server Component — ships zero client JS for it.
- Prefer a library's lighter/tree-shakeable import path when one exists and you don't need its dynamic features. Example: `@phosphor-icons/react/dist/ssr` instead of the full context-based `@phosphor-icons/react`, when you're not runtime-switching icon weights.
- Trim loaded font weights to only what's used. Grep every place the font-family utility class is paired with a weight utility before deciding the weight list — don't just load the full family.
- Code-split below-the-fold interactive-but-non-critical components (contact forms, etc.) via `next/dynamic`. **Important**: the `dynamic()` call must live inside a Client Component, or Next silently will *not* code-split it (bundles it into the main chunk anyway despite appearing to work). Pattern:
  ```tsx
  // ComponentLazy.tsx
  "use client";
  import dynamic from "next/dynamic";
  export default dynamic(() => import("./Component"));
  // page.tsx (Server Component) imports ComponentLazy, not Component directly
  ```
- Run `npm run lint` regularly. Unused imports/variables left over from commented-out features are free, zero-risk cleanup — and ESLint will find them for you rather than needing a manual audit.

## 8. CDN caching

- Next's own hashed `/_next/static/*` assets already get `Cache-Control: public, max-age=31536000, immutable` automatically. No action needed.
- Plain files under `public/` do **not** get strong caching by default (`max-age=0`).
- **Host-level overrides are real.** We set a `next.config.ts` `headers()` rule for a `public/` image and it was silently overridden by Netlify's own edge caching policy. Fix required the platform-native config instead — a `netlify.toml` `[[headers]]` block (Netlify's docs are explicit that this takes precedence over framework-generated headers for statically-served assets; the equivalent on Vercel would be `vercel.json` headers, on Cloudflare Pages a `_headers` file, etc.). **Always verify the actual served header on production with `curl -I`** — don't trust that the app-level config alone did anything.
- Once a platform-native config handles a header, remove the redundant `next.config.ts` version — an app-level `headers()` function may add per-request routing evaluation overhead on some serverless/edge runtimes, for zero remaining benefit.
- Remember Cache-Control only affects *repeat* requests — it cannot move a fresh cold-cache Lighthouse/PSI LCP number. Don't expect a caching fix to change that specific metric; it helps real repeat visitors, not the lab test.

## 9. Verification workflow for every SEO change

1. `npm run build` locally, then `npm run start -p <port>` and `curl` the specific thing you changed.
2. Also re-verify *every previous fix* (canonical, JSON-LD, OG/Twitter tags, sitemap, robots, llms.txt, hero content, etc.) each time — hosting-platform edge behavior can silently override or interact with things in ways that aren't obvious from the diff alone.
3. Commit, push, then **poll the live domain** until the deploy actually propagates (don't assume it's instant — allow 30-60s and poll on a signal specific to that exact change, not just "returns 200," which is true before and after).
4. Kill local test servers between iterations to avoid port conflicts on the next run.

## 10. Blog / CMS (Keystatic)

A git-based CMS is the right default for a content-marketing blog on a template like this: zero extra infrastructure (no database, no separate backend), content lives as markdown in the repo, and it slots straight into Next's file conventions. We used [Keystatic](https://keystatic.com) (`@keystatic/core` + `@keystatic/next` + `@markdoc/markdoc`).

**Core setup**: `keystatic.config.ts` at the project root defines collections (e.g. a `posts` collection with `fields.slug`, `fields.date`, `fields.text`, `fields.markdoc`). Admin UI lives at `app/keystatic/*` (a client wrapper around `makePage(config)`), API route at `app/api/keystatic/[...params]/route.ts` (`makeRouteHandler({config})`). A `lib/posts.ts` helper wraps `createReader(process.cwd(), config)` for listing/reading posts from Server Components.

**Rendering Markdoc content — verify the type, don't guess**: a `fields.markdoc` field's reader value is `() => Promise<{ node: MarkdocNode }>` — already a *parsed* AST node, not a raw string (that's `fields.mdx`, which *does* return a string). Render it with `Markdoc.transform(node)` then `Markdoc.renderers.html(...)` (or `.react`). We confirmed this by reading `node_modules/@keystatic/core/dist/declarations/**/*.d.ts` directly rather than trusting blog posts/docs, which turned out to be incomplete/inconsistent on this exact point.

**Rendered content needs real CSS.** The dark theme has no Tailwind Typography plugin installed, so raw Markdoc-rendered HTML (h2/p/ul/blockquote/code) renders with browser defaults — invisible or illegible against a dark background. Add scoped styles (e.g. `.prose-blog h2 { ... }` in `globals.css`) matching the site's palette, applied via a wrapper class on the `dangerouslySetInnerHTML` container.

**Shared Nav gotcha**: if your homepage uses hash-anchor nav links (`href="#contact"`) and you add real sub-routes (`/blog`), those links silently stop working on any page that isn't `/` — a bare `#anchor` href doesn't navigate home first. Make them homepage-relative (`href="/#contact"`) once Nav renders on more than one route.

**Storage mode — local vs. GitHub, and why it matters for security**: `storage: { kind: 'local' }` only ever works via `npm run dev` on a real filesystem; it has **zero login** and doesn't function meaningfully on a deployed serverless host. **If you use local storage, you must actively block `/keystatic` and `/api/keystatic` on the deployed site** (we initially shipped this blog without doing so — the admin UI was live and unauthenticated on production for a period). The right place to do it in this Next.js version is `proxy.ts` (see below) checking `process.env.NODE_ENV === "production"` and returning 404 for both paths.

**This Next.js version renamed `middleware.ts` → `proxy.ts`** (a v16.0.0 breaking change; `middleware`/`export function middleware` become `proxy`/`export function proxy`, same `config.matcher` API otherwise). Confirmed via `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` — don't assume `middleware.ts` still works without checking.

**Upgrading to GitHub storage mode** (real login, edit from any browser, no local dev needed) is the better end state if more than one person writes posts, or you want to publish without a dev environment:

- `storage: process.env.NODE_ENV === "development" ? { kind: "local" } : { kind: "github", repo: { owner, name } }` — keep local storage for dev (fast, no API calls), GitHub storage in production (real access control: only accounts with repo write access can read/write). Once this is live, delete `proxy.ts` entirely — GitHub OAuth is now the real gate, the manual block is redundant.
- **The GitHub App must be created through Keystatic's own guided flow**, which requires an interactive browser session logged into the GitHub account/org that owns the repo — this cannot be scripted/automated. Bootstrap it by *temporarily* forcing `{ kind: "github", repo: {...} }` (no dev/prod conditional) and running `npm run dev` locally; visiting `/keystatic` shows the "create a GitHub App" flow, which writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` straight into a local `.env` file (gitignored) once you click through GitHub's "Install & Authorize" (choose "Only select repositories" → the one repo, not all of them). Revert the config to the dev/prod conditional afterward.
- **Local bootstrap needs `allowedDevOrigins`**: Next.js blocks the dev HMR websocket as cross-origin if the browser hits `127.0.0.1` while the dev server thinks its origin is `localhost` (or vice versa). Add `allowedDevOrigins: ["127.0.0.1", "localhost"]` to `next.config.ts` (dev-only, zero effect on production) before starting the bootstrap session, or the admin UI page shell loads but never hydrates (blank/black screen, no visible error banner).
- **These 4 env vars must exist in the host's dashboard before the production build runs** — `makeRouteHandler`/the GitHub storage config validate them *eagerly* (at build/module-evaluation time, not just when `/keystatic` is visited). Deploying without them first doesn't just break `/keystatic` at runtime — it **fails the entire build**, and the host keeps serving the last successful deploy (which can look confusingly like "nothing happened yet" if you're polling and don't check the actual deploy/build log).
- **Netlify's secret scanner will false-positive on this.** `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (intentionally client-visible by the `NEXT_PUBLIC_` convention) and `KEYSTATIC_GITHUB_CLIENT_ID` (OAuth client IDs are meant to be public, unlike the client *secret*) will get flagged as "exposed secrets" and fail the build even with the right env vars set. Fix: add `SECRETS_SCAN_OMIT_KEYS` = `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,KEYSTATIC_GITHUB_CLIENT_ID` as an env var, then trigger a redeploy. Do **not** add `KEYSTATIC_GITHUB_CLIENT_SECRET` or `KEYSTATIC_SECRET` to that list — those must stay flagged if they ever leak into client output, since that would indicate a real bug.
- Full bootstrap order: (1) temporarily force GitHub storage + `allowedDevOrigins` locally → (2) `npm run dev`, visit `/keystatic`, create + install the GitHub App → (3) copy the 4 generated values from local `.env` into the host's env vars, plus `SECRETS_SCAN_OMIT_KEYS` if on Netlify → (4) revert the config to the dev/prod conditional, delete the now-redundant `proxy.ts` block → (5) push → (6) verify the deploy actually succeeded (check the host's build log, not just that the domain still responds — a failed build silently keeps the old deploy live).
