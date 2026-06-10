# AI API Cost Calculator

A static single-page calculator for estimating AI API token costs across
OpenAI, Anthropic, and Google Gemini models.

The app asks for an average input token count, output token count, daily request
volume, and usage days per month. It then estimates per-request, daily, and
monthly USD cost for each model and sorts the results from cheapest to most
expensive.

## Live Demo

Public demo: https://ai-api-cost-calculator-rouge.vercel.app/

## Data Sources

Pricing data was manually checked on 2026-06-10 from official pages:

- OpenAI API pricing: https://platform.openai.com/docs/pricing
- Anthropic Claude API pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Google Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing

See [`docs/pricing-sources.md`](docs/pricing-sources.md) for the source audit
trail and pricing scope.

## Submission Materials

The Chinese submission summary and remaining checklist are tracked in
[`docs/submission-checklist.md`](docs/submission-checklist.md).

## Tech Stack

- Vite
- React
- TypeScript
- Vitest
- Native CSS

There is no backend, database, login system, analytics script, or runtime API
call to any AI provider.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test -- --run
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

Use any static hosting provider that supports Vite builds.

Recommended settings:

```text
Build command: npm run build
Output directory: dist
```

## Known Limitations

- Estimates only standard token pricing for selected text-capable models.
- Does not include cached input, batch, flex, priority, regional, tool-use,
  grounding, audio, image, video, or custom enterprise pricing.
- Pricing can change after the query date. Re-check official pages before using
  the numbers for financial planning.
- The app does not call provider APIs, so it cannot validate usage against a
  real billing account.
