# Manual Capture Guide

Use this only if the automated workflow cannot run a source repo or regenerate the artifact pages honestly.

Expected sibling repos next to this portfolio repo:

- `../PriorAuthorizationCopilot`
- `../clinical-AI-eval_sandbox`
- `../icu-code-blue-early-warning`

Required files:

## Prior Authorization Copilot

- Save as `prior-auth-main-desktop.png`
  Viewport: `desktop`
  Destination: `assets/screenshots/prior-auth`
  Target: Top of the app with title, showcase cases, and intake visible.
- Save as `prior-auth-results-desktop.png`
  Viewport: `desktopTall`
  Destination: `assets/screenshots/prior-auth`
  Target: Results state for the refusal-style showcase case through Audit Summary.
- Save as `prior-auth-governance-desktop.png`
  Viewport: `desktop`
  Destination: `assets/screenshots/prior-auth`
  Target: Policy Monitor section showing configured source status and drift review context.
- Save as `prior-auth-main-mobile.png`
  Viewport: `mobile`
  Destination: `assets/screenshots/prior-auth`
  Target: Top of the app in a mobile viewport with the same truthful intake surface.

## Clinical AI Eval Sandbox

- Save as `eval-sandbox-summary-desktop.png`
  Viewport: `desktop`
  Destination: `assets/screenshots/clinical-ai-eval`
  Target: Capture the generated summary page in capture_pages/clinical-ai-eval after restoring the local results files.
- Save as `eval-sandbox-flagged-cases-desktop.png`
  Viewport: `desktopTall`
  Destination: `assets/screenshots/clinical-ai-eval`
  Target: Capture the generated flagged-cases page in capture_pages/clinical-ai-eval after restoring the local results files.

## ICU Code Blue Early Warning

- Save as `icu-risk-panel-desktop.png`
  Viewport: `desktop`
  Destination: `assets/screenshots/icu-code-blue`
  Target: Capture the generated risk-panel page in capture_pages/icu-code-blue after restoring the local reference run CSVs.
- Save as `icu-alert-policy-desktop.png`
  Viewport: `desktop`
  Destination: `assets/screenshots/icu-code-blue`
  Target: Capture the generated alert-policy page in capture_pages/icu-code-blue after restoring the local reference run CSVs.

