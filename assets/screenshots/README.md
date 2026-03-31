# Portfolio Screenshots

This folder is the source of truth for flagship screenshot assets used by the portfolio site.

Structure:

- `prior-auth/`: Prior Authorization Copilot captures
- `clinical-ai-eval/`: Clinical AI Eval Sandbox captures
- `icu-code-blue/`: ICU Code Blue Early Warning captures
- `MANUAL_CAPTURE_GUIDE.md`: exact fallback targets if a source repo cannot be captured automatically

Workflow:

1. Install the one screenshot dependency with `npm install`.
2. Run `npm run screenshots:capture`.
3. Verify expected files with `npm run screenshots:check`.
4. Refresh the homepage to confirm the new assets read well in the flagship cards.

The automated workflow uses a mix of:

- live Playwright capture for the Prior Authorization Copilot Streamlit app
- a direct copy of the checked-in real Prior Authorization Copilot results screenshot for the structured-output state
- generated artifact pages for the eval sandbox and ICU case study, built from real local result files before capture

If a sibling repo or artifact set is missing, do not invent replacements. Use the manual guide, restore the source repo, and rerun the workflow.
