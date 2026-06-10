# AI API Cost Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a public, mobile-friendly single-page AI API cost calculator that compares official text token pricing across OpenAI, Anthropic Claude, and Google Gemini models.

**Architecture:** The app is a static Vite + React + TypeScript SPA. Pricing data lives in a typed local data module, all calculations are pure functions covered by Vitest, and the UI renders controlled inputs plus sorted comparison results without any backend or API keys.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, native CSS, static deployment on Vercel or Cloudflare Pages.

---

## 1. Scope And Assumptions

- Direction: assignment Direction A, "AI model price calculator".
- Providers: OpenAI, Anthropic Claude, Google Gemini.
- Model scope: standard direct API text input and text output pricing only.
- Excluded from MVP: prompt caching, batch, flex, priority, regional/data-residency premiums, tool-use add-ons, web search grounding, image/audio/video pricing, enterprise discounts, live billing account validation.
- Query date: use `2026-06-10` in source docs unless implementation happens on a later date; if later, re-check official pricing and update the date.
- Public deployment target: Vercel first choice; Cloudflare Pages acceptable if Vercel is unavailable.
- Repository hygiene: no API keys, no `.env` values, no generated `dist/` committed unless deployment provider explicitly requires it.

## 2. Product Requirements

- The first screen is the actual calculator, not a marketing landing page.
- Inputs:
  - Average input tokens per request.
  - Average output tokens per request.
  - Requests per day.
  - Usage days per month.
- Outputs:
  - Per-request estimated cost.
  - Daily estimated cost.
  - Monthly estimated cost.
  - Sorted model comparison from cheapest to most expensive by monthly cost.
  - Cheapest model callout.
  - Pricing source and query date visible on page.
- UX constraints:
  - Mobile layout must not overflow at 360px width.
  - Large numbers must remain readable.
  - Empty or invalid numeric fields must show a clear inline validation message.
  - All calculations update immediately after input changes.
- Submission constraints:
  - English README with project overview, local setup, tech stack, known limitations.
  - Public GitHub repo with multiple meaningful commits.
  - Public URL.
  - AI collaboration record under 10 lines.
  - 500+ Chinese retrospective blog post link.
  - 5-line self review.

## 3. Pricing Data Boundary And Source Gate

Use these official sources and verify the exact numbers before coding the data file. Candidate model names are not implementation data until Task 1 produces the final verified model table.

- OpenAI pricing: `https://platform.openai.com/docs/pricing`
  - Candidate models: `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4-nano`.
  - Standard short-context fields: input USD / 1M tokens, output USD / 1M tokens.
- Anthropic pricing: `https://platform.claude.com/docs/en/about-claude/pricing`
  - Candidate models: `Claude Opus 4.8`, `Claude Sonnet 4.6`, `Claude Haiku 4.5`.
  - Standard fields: base input tokens USD / MTok, output tokens USD / MTok.
- Google Gemini pricing: `https://ai.google.dev/gemini-api/docs/pricing`
  - Candidate models: `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`.
  - Standard text fields: input USD / 1M tokens, output USD / 1M tokens.

Document the verified values in `docs/pricing-sources.md` with source URL, query date, included pricing fields, and excluded pricing branches.

Before creating `src/data/models.ts`, `docs/pricing-sources.md` must include a final model table with these columns:

- Provider.
- Official model name exactly as shown by the provider.
- App model id.
- Input USD per 1M tokens.
- Output USD per 1M tokens.
- Pricing scope used by the app.
- Excluded pricing variants.
- Source URL.
- Query date.

## 4. File Map

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite HTML entry.
- Create `vite.config.ts`: React plugin and Vitest environment.
- Create `tsconfig.json` and `tsconfig.node.json`: TypeScript config.
- Create `src/main.tsx`: React root bootstrap.
- Create `src/App.tsx`: page composition and top-level calculator state.
- Create `src/styles.css`: responsive layout, table behavior, form controls.
- Create `src/data/models.ts`: typed model pricing data and source metadata.
- Create `src/lib/cost.ts`: pure cost calculation and sorting functions.
- Create `src/lib/format.ts`: currency and number formatting helpers.
- Create `src/lib/validation.ts`: numeric input parsing and validation.
- Create `src/components/EstimatorForm.tsx`: controlled calculator form.
- Create `src/components/ModelTable.tsx`: comparison table.
- Create `src/__tests__/cost.test.ts`: cost formula and sorting tests.
- Create `src/__tests__/validation.test.ts`: input validation tests.
- Create `src/__tests__/App.test.tsx`: UI wiring, validation rendering, sorting, and source-link tests.
- Create `docs/pricing-sources.md`: official pricing audit trail.
- Create `docs/ai-collaboration-log.md`: concise AI collaboration record.
- Create `docs/submission-checklist.md`: final links and required submission items.
- Update `README.md`: keep current English structure, align commands and limitations after the app exists.

## 5. Implementation Tasks

### Task 1: Confirm Pricing Scope And Source Audit

- [ ] Open the three official pricing pages listed in section 3.
- [ ] Record only standard text input and text output prices per 1M tokens.
- [ ] Decide the final model list from the official pages; do not copy candidate names into code until the final model table is written.
- [ ] Create `docs/pricing-sources.md` with this structure:

```markdown
# Pricing Sources

Pricing checked on 2026-06-10.

## Scope

This app estimates standard text token usage only. It excludes cached input,
batch, flex, priority, regional/data-residency premiums, web search grounding,
tool-use fees, image, audio, video, and enterprise pricing.

## OpenAI

Source: https://platform.openai.com/docs/pricing

Included fields: standard short-context input and output prices per 1M tokens.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |

## Anthropic Claude

Source: https://platform.claude.com/docs/en/about-claude/pricing

Included fields: base input tokens and output tokens per MTok.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |

## Google Gemini

Source: https://ai.google.dev/gemini-api/docs/pricing

Included fields: standard text input and output prices per 1M tokens.

| Provider | Official model name | App model id | Input USD / 1M | Output USD / 1M | Pricing scope | Excluded variants | Query date |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
```

- [ ] Commit: `git add docs/pricing-sources.md && git commit -m "docs: add pricing source audit"`.

### Task 2: Scaffold The Vite React App

- [ ] Create the Vite/React/TypeScript file structure without overwriting `README.md`.
- [ ] Install dependencies:

```powershell
npm install react react-dom
npm install -D @vitejs/plugin-react vite typescript vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

- [ ] Run `npm run build`.
- [ ] Expected result: TypeScript compiles and Vite writes production assets to `dist/`.
- [ ] Commit: `git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.node.json src && git commit -m "chore: scaffold vite react app"`.

### Task 3: Add Typed Pricing Data

- [ ] Create `src/data/models.ts` with exported provider/model types.
- [ ] Store model entries with these fields:
  - `id`
  - `provider`
  - `displayName`
  - `officialModelName`
  - `inputUsdPerMillion`
  - `outputUsdPerMillion`
  - `pricingUnit`
  - `pricingScope`
  - `sourceUrl`
  - `sourceLabel`
  - `checkedAt`
  - `excludedVariants`
  - `notes`
- [ ] Keep all prices as numbers, not strings.
- [ ] Set `pricingUnit` to `USD_PER_1M_TOKENS` for every MVP entry.
- [ ] Set `pricingScope` to a human-readable sentence matching the row in `docs/pricing-sources.md`.
- [ ] Set `excludedVariants` to an array of strings so the UI and docs can explain what is not included.
- [ ] Use `checkedAt: "2026-06-10"` unless prices were rechecked on a different date.
- [ ] Add one note per provider explaining that non-standard pricing branches are excluded.
- [ ] Commit: `git add src/data/models.ts && git commit -m "feat: add model pricing data"`.

### Task 4: Build Cost Calculation With Tests First

- [ ] Create `src/__tests__/cost.test.ts`.
- [ ] Cover this exact example:

```ts
// input: 1,000 input tokens, 500 output tokens
// rates: $2.50 input / 1M, $15.00 output / 1M
// per request: (1000 * 2.50 + 500 * 15.00) / 1_000_000 = 0.01
// daily at 100 requests/day: 1.00
// monthly at 30 days: 30.00
```

- [ ] Create `src/lib/cost.ts`.
- [ ] Implement:
  - `calculateModelCost(model, usage)`
  - `calculateAllModelCosts(models, usage)`
  - `sortCostsByMonthlyCost(results)`
- [ ] Formula:

```ts
perRequest =
  (inputTokens * inputUsdPerMillion + outputTokens * outputUsdPerMillion) /
  1_000_000
daily = perRequest * requestsPerDay
monthly = daily * daysPerMonth
```

- [ ] Run `npm run test -- --run src/__tests__/cost.test.ts`.
- [ ] Expected result: all cost tests pass.
- [ ] Commit: `git add src/lib/cost.ts src/__tests__/cost.test.ts && git commit -m "feat: add cost calculation engine"`.

### Task 5: Add Validation And Formatting Helpers

- [ ] Create `src/__tests__/validation.test.ts`.
- [ ] Test these rules:
  - token fields accept integers from `0` to `10000000`.
  - requests per day accepts integers from `0` to `1000000`.
  - usage days accepts integers from `1` to `31`.
  - decimal, negative, blank, and non-numeric values return validation errors.
- [ ] Create `src/lib/validation.ts`.
- [ ] Implement `parseUsageInput(rawValues)` returning either valid numeric usage or field-level errors.
- [ ] Create `src/lib/format.ts`.
- [ ] Implement `formatUsd(value)` using `Intl.NumberFormat` with USD currency.
- [ ] Use up to 6 decimal places for values under `$0.01`, otherwise 2 decimal places.
- [ ] Run `npm run test -- --run src/__tests__/validation.test.ts`.
- [ ] Expected result: all validation tests pass.
- [ ] Commit: `git add src/lib/validation.ts src/lib/format.ts src/__tests__/validation.test.ts && git commit -m "feat: add input validation and formatting"`.

### Task 6: Build The Calculator UI

- [ ] Create `src/components/EstimatorForm.tsx` with four labeled numeric inputs.
- [ ] Keep source-note and summary rendering inside `src/App.tsx` unless the file becomes difficult to scan; do not create extra presentation components before the first working version.
- [ ] Show this summary in `src/App.tsx`:
  - cheapest model name.
  - cheapest monthly cost.
  - number of compared models.
  - current usage scenario.
- [ ] Create `src/components/ModelTable.tsx` with columns:
  - provider.
  - model.
  - input price.
  - output price.
  - per request.
  - daily.
  - monthly.
- [ ] Show source links and query date below the table from the data in `src/data/models.ts`.
- [ ] Implement `src/App.tsx` with default usage:
  - input tokens: `1000`.
  - output tokens: `500`.
  - requests per day: `100`.
  - usage days per month: `30`.
- [ ] Show validation errors next to the relevant input and suppress cost updates when input is invalid.
- [ ] Create `src/__tests__/App.test.tsx` with React Testing Library coverage for:
  - default usage renders a model comparison table.
  - changing token/request inputs updates monthly cost text.
  - invalid input shows an inline validation message.
  - comparison rows render in ascending monthly cost order.
  - official source links are present and use `https://` URLs.
- [ ] Run `npm run test -- --run`.
- [ ] Expected result: all tests pass.
- [ ] Commit: `git add src/App.tsx src/components src/__tests__/App.test.tsx && git commit -m "feat: build calculator interface"`.

### Task 7: Add Responsive Visual Design

- [ ] Create `src/styles.css`.
- [ ] Use a restrained professional dashboard style, not a marketing hero page.
- [ ] Use a two-column desktop layout:
  - left: controls and summary.
  - right: comparison table and source note.
- [ ] Collapse to one column under `760px`.
- [ ] Make the table horizontally scrollable on narrow screens.
- [ ] Set stable dimensions for input controls and summary cards to avoid layout shifts.
- [ ] Verify at viewport widths `360`, `768`, and `1440` that no text overlaps or spills outside containers.
- [ ] Commit: `git add src/styles.css && git commit -m "style: add responsive calculator layout"`.

### Task 8: Update Documentation

- [ ] Update `README.md` after implementation matches reality.
- [ ] Ensure README contains:
  - project summary.
  - Live Demo section states that the public URL is pending until deployment finishes.
  - data source links.
  - local development commands.
  - tech stack.
  - deployment settings.
  - known limitations.
- [ ] Create `docs/ai-collaboration-log.md` with no more than 10 lines:
  - tools used.
  - where AI helped.
  - one AI mistake or uncertainty and how it was checked.
  - remaining uncertainty.
- [ ] Create `docs/submission-checklist.md` with sections for:
  - GitHub profile.
  - blog or technical writing profile.
  - active technical community account.
  - strongest work link.
  - live URL.
  - GitHub repository URL.
  - AI collaboration record.
  - blog post URL.
  - 5-line self review.
- [ ] Commit: `git add README.md docs/ai-collaboration-log.md docs/submission-checklist.md && git commit -m "docs: update project submission materials"`.

### Task 9: Verify Locally

- [ ] Run `npm run test -- --run`.
- [ ] Expected result: Vitest reports `cost.test.ts`, `validation.test.ts`, and `App.test.tsx` passing.
- [ ] Run `npm run build`.
- [ ] Expected result: TypeScript and Vite production build succeed.
- [ ] Run `npm run preview`.
- [ ] Open local preview and check:
  - default cost example renders.
  - editing inputs updates all rows.
  - invalid input shows validation.
  - model table remains readable on mobile.
  - source links open official pages.
- [ ] Commit any fixes with targeted messages.

### Task 10: Deploy Public URL

- [ ] Push all commits to the public GitHub repository.
- [ ] Deploy with Vercel or Cloudflare Pages.
- [ ] Use the final production URL, not a branch preview URL, for the submission.
- [ ] Disable deployment protection, password protection, team-only access, or any login requirement on the submitted URL.
- [ ] Use build settings:

```text
Build command: npm run build
Output directory: dist
Install command: npm install
```

- [ ] Open the production URL on desktop and mobile viewport.
- [ ] Open the production URL in an incognito/private browser session while logged out of the deployment provider.
- [ ] Verify the production URL returns HTTP `200` without authentication.
- [ ] Open the URL from a mobile viewport or phone network and confirm the page is not limited to localhost, VPN, or a private workspace.
- [ ] Update `README.md` Live Demo section with the final URL.
- [ ] Update `docs/submission-checklist.md` with the final URL and repo URL.
- [ ] Commit: `git add README.md docs/submission-checklist.md && git commit -m "docs: add live deployment link"`.

### Task 11: Write Blog Retrospective And Self Review

- [ ] Write a Chinese 500+ word retrospective for public publishing.
- [ ] Cover:
  - what was built.
  - how official pricing was verified.
  - where AI helped.
  - where AI was wrong or uncertain.
  - what slowed the project down.
  - what would improve with 8 more hours.
- [ ] Publish on GitHub Pages, Juejin, Zhihu, Medium, Notion public page, or another public writing platform.
- [ ] Update `docs/submission-checklist.md` with the blog URL.
- [ ] Add 5-line self review:
  - most satisfying part.
  - least confident part.
  - what to add or change with 8 more hours.
  - longest blocked point and duration.
  - what support would help in week one.
- [ ] Commit: `git add docs/submission-checklist.md && git commit -m "docs: complete submission checklist"`.

## 6. Acceptance Criteria

- `npm run test -- --run` passes.
- `npm run build` passes.
- Public URL opens without login.
- Public URL is the final production deployment, not a preview URL.
- Public URL returns HTTP `200` for an anonymous visitor.
- Public GitHub repository has multiple meaningful commits.
- README is English and accurate.
- Pricing source page exists and cites official URLs plus query date.
- Mobile viewport at `360px` has no broken layout or overflowing text.
- UI integration tests cover input updates, validation messages, sorted results, and source links.
- No API keys or secrets are present in the repository.
- Submission checklist has live URL, GitHub URL, AI collaboration record, blog URL, and 5-line self review.

## 7. Execution Order

1. Source audit.
2. Vite scaffold.
3. Pricing data.
4. Cost engine tests and implementation.
5. Validation tests and implementation.
6. React UI.
7. Responsive CSS and manual QA.
8. README and supporting docs.
9. Local verification.
10. Deployment.
11. Blog and final submission checklist.
