# AI Collaboration Log

1. Used Codex to read the assignment, draft the implementation plan, and review engineering risks.
2. Used Codex with web references to verify official pricing sources for OpenAI, Anthropic, and Google Gemini.
3. Used Codex to implement the app in small TDD steps: data, cost engine, validation, UI, and styling.
4. AI initially produced a Vite 7 setup that warned on local Node 20.14.0; this was caught by `npm run build` and fixed by pinning Vite 6-compatible tooling.
5. AI also wrote one UI test with an overly exact text match; the failing test showed React split the visible text differently, so the assertion was corrected.
6. I am still not fully certain the provider prices will stay current after 2026-06-10, so the app documents the query date and limitations.
