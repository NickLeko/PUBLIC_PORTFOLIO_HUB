# Public Portfolio Hub

Static public portfolio site for Nicholas Leko's healthcare AI / AI PM work.

The site is intentionally centered on three flagship portfolio artifacts:

1. Prior Authorization Copilot
2. Clinical AI Eval Sandbox
3. ICU Code Blue Early Warning

The homepage is built to explain the portfolio story quickly and honestly. The supporting projects and automation sections stay secondary on purpose so the flagship narrative remains the clear center.

## What is in this repo

- `index.html`: main portfolio page
- `styles.css`: homepage styling
- `app.js`: homepage rendering logic
- `data/projects.js`: centralized content for the homepage and one-pager
- `assets/screenshots/`: real screenshots and placeholder screenshot slots
- `docs/flagship_one_pager.html`: printable recruiter one-pager
- `docs/flagship_one_pager.css`: one-pager print styling

There is no build step and no framework dependency. Everything is plain static HTML, CSS, and JavaScript so the site stays lightweight and GitHub Pages friendly.

There is one optional tooling dependency for screenshot capture: Playwright. It is only used to generate portfolio assets and is not required to serve the site.

## Run locally

Use any static file server from the repo root. For example:

```bash
python3 -m http.server 8000
```

Then open:

- `http://127.0.0.1:8000/` for the homepage
- `http://127.0.0.1:8000/docs/flagship_one_pager.html` for the printable one-pager

## Update project content

Most content is centralized in [`data/projects.js`](/Users/nicholasleko/projects/PUBLIC_PORTFOLIO_HUB/data/projects.js).

That file controls:

- hero and positioning copy
- flagship project summaries, proof points, links, and limitations
- supporting projects and automations
- "How I Build" principles
- contact links
- one-pager profile and key themes

If you want to change wording later, start there first.

## Add or replace screenshots

The repo now includes a repeatable screenshot workflow.

Install the capture dependency once:

```bash
npm install
```

Then run:

```bash
npm run screenshots:capture
npm run screenshots:check
```

What the capture workflow does:

- starts the local Prior Authorization Copilot Streamlit app and captures polished desktop and mobile screenshots
- copies the checked-in real Prior Authorization Copilot results screenshot from the sibling repo so the structured output view stays stable and truthful
- regenerates clean artifact pages for the Clinical AI Eval Sandbox from the local published result files, then captures them
- regenerates clean artifact pages for the ICU Code Blue Early Warning reference run, then captures them
- writes output into project-specific folders under [`assets/screenshots`](/Users/nicholasleko/projects/PUBLIC_PORTFOLIO_HUB/assets/screenshots)

Expected sibling repos:

- `../PriorAuthorizationCopilot`
- `../clinical-AI-eval_sandbox`
- `../icu-code-blue-early-warning`

If one of those local repos is missing, the workflow will not fake a screenshot. Use [`assets/screenshots/MANUAL_CAPTURE_GUIDE.md`](/Users/nicholasleko/projects/PUBLIC_PORTFOLIO_HUB/assets/screenshots/MANUAL_CAPTURE_GUIDE.md) for the exact fallback filenames and targets.

After new assets are generated, update the matching screenshot entries in [`data/projects.js`](/Users/nicholasleko/projects/PUBLIC_PORTFOLIO_HUB/data/projects.js) if you intentionally rename a file.

## Export the recruiter one-pager to PDF

1. Start the local server.
2. Open `docs/flagship_one_pager.html` in the browser.
3. Click `Print / Save as PDF`.
4. In the print dialog, choose `Save as PDF`.
5. Keep paper size set to `Letter` and scale at the browser default unless you intentionally tweak layout.

The page is styled to print as a single page.

## Deploy to GitHub Pages

This repo is already structured for a simple GitHub Pages deployment from the repository root.

1. Push the repo to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/ (root)`.
6. Save.

GitHub Pages will publish:

- `/` as the main homepage
- `/docs/flagship_one_pager.html` as the printable one-pager page

## Maintenance notes

- Keep flagship status labels honest: prototype, benchmark harness, retrospective case study, demo, or private/local when applicable.
- Avoid adding unverified performance claims or usage claims.
- Keep personal project work clearly separated from work experience and employer context.
- If a repo or document is private/local, either leave the card unlinked or label it clearly instead of guessing a public URL.
