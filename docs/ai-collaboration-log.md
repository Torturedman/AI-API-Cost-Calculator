# AI Collaboration Log

1. Used Codex to read the assignment, draft the plan, and review structure, data, testing, and deployment risks.
2. Used Codex to verify official pricing sources and document the query date, scope, and excluded pricing branches.
3. Built the app with Codex in small TDD commits: data, cost engine, validation, UI, styling, docs, and deployment.
4. AI suggested tooling that did not fit local Node 20.14.0; build warnings led to pinning Vite 6, Vitest 3, and jsdom 26.
5. A brittle UI text assertion failed because React split text nodes; it was replaced with user-visible behavior assertions.
6. GitHub/Vercel checks hit network instability; HTTP/1.1 push and HTTP 200 verification confirmed the public result.
7. Later AI-assisted refinements added bilingual UI, cheapest-difference column, responsive fixes, and selected optimization-review items.
8. Remaining uncertainty: provider prices may change, and final submission should still get one real-phone and incognito check.
