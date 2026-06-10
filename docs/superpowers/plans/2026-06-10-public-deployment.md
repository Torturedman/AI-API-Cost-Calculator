# Public Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the AI API Cost Calculator to a public production URL that anyone can open without local development tools or authentication.

**Architecture:** The project is a static Vite + React + TypeScript SPA. The deployment should build the app with `npm run build`, publish the generated `dist` directory, and serve it from a static hosting provider connected to the GitHub `main` branch. No environment variables, API keys, backend services, databases, or serverless functions are required.

**Tech Stack:** GitHub, Vite, React, TypeScript, npm, Vercel as the recommended host, Cloudflare Pages or Netlify as fallback hosts.

---

## 1. Deployment Recommendation

Use **Vercel Git import** first.

Reasons:

- The project is already pushed to GitHub at `https://github.com/Torturedman/AI-API-Cost-Calculator`.
- Vercel's Vite guide states Vercel can detect Vite projects and enable the correct deployment settings.
- A Vercel production URL ending in `.vercel.app` is enough for the assignment; no custom domain is required.
- The app has no API keys or backend state, so the deployment surface is only static files.

Fallback order:

1. Cloudflare Pages, with production branch `main`, build command `npm run build`, build directory `dist`.
2. Netlify, with build command `npm run build`, publish directory `dist`.

Official references checked on 2026-06-10:

- Vite static deploy guide: `https://vite.dev/guide/static-deploy.html`
- Vercel Vite guide: `https://vercel.com/docs/frameworks/frontend/vite`
- Cloudflare Pages React guide: `https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/`
- Netlify Vite guide: `https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/`

## 2. Files To Modify After Deployment

Do not modify source code for the deployment itself.

After a production URL exists, update only documentation:

- Modify `README.md`
  - Replace the current Live Demo placeholder with the production URL.
- Modify `docs/submission-checklist.md`
  - Replace `线上 URL | 待部署...` with the production URL.
  - Add the same URL to the final submission section if a separate line is added later.

No `dist/` files should be committed.

## 3. Task 1: Preflight Before Creating A Hosting Project

**Files:**

- Read: `package.json`
- Read: `README.md`
- Read: `docs/submission-checklist.md`
- Do not modify files in this task.

- [ ] **Step 1: Confirm the working tree is clean except the original assignment file**

Run:

```powershell
git status --short
```

Expected:

```text
?? plan.md
```

It is acceptable for Git to also print warnings about `C:\Users\27940/.config/git/ignore` permissions. Do not commit `plan.md` unless explicitly requested.

- [ ] **Step 2: Confirm the latest app code is pushed**

Run:

```powershell
git ls-remote origin HEAD
```

Expected:

```text
316347b3b7fe74fe763f601e322be8c143e1008f	HEAD
```

If the SHA is different because more commits were added later, compare it with:

```powershell
git log --oneline -1
```

The local latest commit and remote HEAD must match before deployment.

- [ ] **Step 3: Run local verification**

Run:

```powershell
npm run test -- --run
npm run build
```

Expected:

```text
Test Files  4 passed
Tests       17 passed
✓ built
```

The exact Vite asset filenames may differ. The important result is exit code `0` for both commands.

- [ ] **Step 4: Confirm the deploy output folder exists locally**

Run:

```powershell
Get-ChildItem -Path dist
```

Expected:

```text
index.html
assets
```

Do not commit `dist/`.

## 4. Task 2: Deploy With Vercel

**Files:**

- No local file changes during project creation.
- Later documentation update happens in Task 5.

- [ ] **Step 1: Open the Vercel import flow**

Open:

```text
https://vercel.com/new
```

Sign in with GitHub if prompted.

- [ ] **Step 2: Import the GitHub repository**

Select:

```text
Torturedman/AI-API-Cost-Calculator
```

If the repository is not visible, authorize Vercel's GitHub integration for this repository.

- [ ] **Step 3: Use these project settings**

Set or confirm:

```text
Framework Preset: Vite
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Production Branch: main
Environment Variables: none
```

If Vercel auto-detects the Vite settings, keep the detected values as long as `Build Command` is `npm run build` and `Output Directory` is `dist`.

- [ ] **Step 4: Deploy**

Click:

```text
Deploy
```

Expected:

```text
Deployment completed successfully
```

Copy the production URL. It should look similar to:

```text
https://ai-api-cost-calculator-<suffix>.vercel.app/
```

Use the production deployment URL, not a branch preview URL.

- [ ] **Step 5: Disable access restrictions if present**

In Vercel project settings, confirm the submitted URL does not require:

```text
Vercel login
password protection
deployment protection
team-only access
trusted IP access
```

The assignment reviewers must be able to open the URL anonymously.

## 5. Task 3: Public Access QA

**Files:**

- No file changes.

- [ ] **Step 1: Check HTTP access from PowerShell**

Replace `<PRODUCTION_URL>` with the Vercel URL:

```powershell
(Invoke-WebRequest -Uri "<PRODUCTION_URL>" -UseBasicParsing -TimeoutSec 20).StatusCode
```

Expected:

```text
200
```

If this returns `401`, `403`, a login page, or a timeout, the deployment is not acceptable yet.

- [ ] **Step 2: Check anonymous browser access**

Open the production URL in a private/incognito browser window while signed out of Vercel.

Expected:

```text
The AI API Cost Calculator page loads directly.
```

- [ ] **Step 3: Check the core calculator flow**

In the production page:

1. Confirm the heading is visible.
2. Click `中文`.
3. Confirm the title changes to `AI API 成本计算器`.
4. Change `每日请求量` to `200`.
5. Confirm at least one monthly cost changes to `$1.80`.
6. Click `English`.
7. Confirm the UI returns to English and the input value remains `200`.

- [ ] **Step 4: Check mobile layout**

Use browser devtools responsive mode or a phone.

Check widths:

```text
360px
768px
1440px
```

Expected:

```text
No overlapping text.
No clipped buttons.
The comparison table scrolls horizontally on narrow screens.
The language toggle remains usable.
```

- [ ] **Step 5: Check source links**

Open each pricing source link from the deployed page.

Expected:

```text
OpenAI pricing page opens.
Anthropic pricing page opens.
Google Gemini pricing page opens.
```

## 6. Task 4: Fallback Deploy With Cloudflare Pages

Use this only if Vercel cannot be used.

**Files:**

- No local file changes during project creation.
- Later documentation update happens in Task 5.

- [ ] **Step 1: Open Cloudflare Workers & Pages**

Open:

```text
https://dash.cloudflare.com/
```

Go to:

```text
Workers & Pages > Create application > Pages > Import an existing Git repository
```

- [ ] **Step 2: Select the GitHub repository**

Select:

```text
Torturedman/AI-API-Cost-Calculator
```

- [ ] **Step 3: Use these build settings**

Set:

```text
Production branch: main
Build command: npm run build
Build directory: dist
Environment Variables: none
```

- [ ] **Step 4: Deploy and copy the Pages URL**

Expected URL shape:

```text
https://<project-name>.pages.dev/
```

Then run the QA steps from Task 3.

## 7. Task 5: Fallback Deploy With Netlify

Use this only if Vercel and Cloudflare Pages cannot be used.

**Files:**

- No local file changes during project creation.
- Later documentation update happens in Task 6.

- [ ] **Step 1: Open Netlify import flow**

Open:

```text
https://app.netlify.com/start
```

- [ ] **Step 2: Import the GitHub repository**

Select:

```text
Torturedman/AI-API-Cost-Calculator
```

- [ ] **Step 3: Use these build settings**

Set:

```text
Build command: npm run build
Publish directory: dist
Environment Variables: none
Production branch: main
```

- [ ] **Step 4: Deploy and copy the Netlify URL**

Expected URL shape:

```text
https://<site-name>.netlify.app/
```

Then run the QA steps from Task 3.

## 8. Task 6: Update Documentation With The Production URL

**Files:**

- Modify: `README.md`
- Modify: `docs/submission-checklist.md`

- [ ] **Step 1: Update README Live Demo**

Replace the current `## Live Demo` paragraph in `README.md` with:

```markdown
## Live Demo

Public demo: <PRODUCTION_URL>
```

- [ ] **Step 2: Update the submission checklist URL row**

In `docs/submission-checklist.md`, replace:

```markdown
| 线上 URL | 待部署；建议部署到 Vercel、Cloudflare Pages 或 Netlify 后填写生产 URL |
```

With:

```markdown
| 线上 URL | <PRODUCTION_URL> |
```

- [ ] **Step 3: Run verification**

Run:

```powershell
npm run test -- --run
npm run build
```

Expected:

```text
Test Files  4 passed
Tests       17 passed
✓ built
```

- [ ] **Step 4: Stage only the documentation changes**

Run:

```powershell
git add README.md docs/submission-checklist.md
```

- [ ] **Step 5: Commit**

Run:

```powershell
git commit -m "docs: add live deployment link"
```

- [ ] **Step 6: Push**

Run:

```powershell
git -c http.version=HTTP/1.1 push origin main
```

- [ ] **Step 7: Confirm remote HEAD**

Run:

```powershell
git ls-remote origin HEAD
```

Expected:

```text
The remote HEAD SHA matches `git log --oneline -1`.
```

## 9. Task 7: Final Submission Check

**Files:**

- Read: `README.md`
- Read: `docs/submission-checklist.md`

- [ ] **Step 1: Confirm required assignment links exist**

Check `docs/submission-checklist.md` contains:

```text
GitHub profile
GitHub repository URL
Production public URL
AI collaboration record
Blog URL or clearly marked pending blog link
5-line self review
```

- [ ] **Step 2: Confirm the production URL is not localhost**

The URL must not contain:

```text
localhost
127.0.0.1
192.168.
10.
172.16.
```

- [ ] **Step 3: Confirm reviewers can use the app**

Open the production URL from a logged-out browser session and complete this flow:

```text
English default page -> switch to 中文 -> change usage input -> verify sorted table still updates -> switch back to English
```

- [ ] **Step 4: Prepare the final message for submission**

Use this structure:

```text
GitHub profile: https://github.com/Torturedman
Project URL: <PRODUCTION_URL>
GitHub repo: https://github.com/Torturedman/AI-API-Cost-Calculator
AI collaboration record: https://github.com/Torturedman/AI-API-Cost-Calculator/blob/main/docs/ai-collaboration-log.md
Submission summary: https://github.com/Torturedman/AI-API-Cost-Calculator/blob/main/docs/submission-checklist.md
Blog URL: <BLOG_URL>
```

## 10. Risks And Decisions

- **Account access risk:** I cannot complete dashboard import without access to the user's Vercel, Cloudflare, or Netlify account.
- **Deployment protection risk:** A URL that works while logged in may fail for reviewers. Anonymous/incognito access is mandatory.
- **Preview URL risk:** Do not submit a branch preview URL if the platform provides a production URL.
- **SPA routing risk:** The current app has only one route, so no rewrite config is required. If client-side routes are added later, add a fallback rewrite to `index.html`.
- **Documentation risk:** The final submission is incomplete until `README.md` and `docs/submission-checklist.md` contain the production URL.
