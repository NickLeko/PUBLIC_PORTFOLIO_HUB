module.exports = {
  viewportPresets: {
    desktop: {
      width: 1440,
      height: 1280,
      deviceScaleFactor: 1
    },
    desktopTall: {
      width: 1440,
      height: 1680,
      deviceScaleFactor: 1
    },
    mobile: {
      width: 430,
      height: 932,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    }
  },
  projects: [
    {
      slug: "prior-authorization-copilot",
      label: "Prior Authorization Copilot",
      outputDir: "assets/screenshots/prior-auth",
      source: {
        kind: "streamlit",
        repoPath: "../PriorAuthorizationCopilot",
        entry: "app.py",
        port: 8504
      },
      captures: [
        {
          id: "prior-auth-main-desktop",
          filename: "prior-auth-main-desktop.png",
          viewport: "desktop",
          summary: "Main intake and review surface",
          auto: true
        },
        {
          id: "prior-auth-results-desktop",
          filename: "prior-auth-results-desktop.png",
          viewport: "desktopTall",
          summary: "Results view after loading the refusal-first showcase case",
          auto: true
        },
        {
          id: "prior-auth-governance-desktop",
          filename: "prior-auth-governance-desktop.png",
          viewport: "desktop",
          summary: "Policy monitor and governance-oriented review surface",
          auto: true
        },
        {
          id: "prior-auth-main-mobile",
          filename: "prior-auth-main-mobile.png",
          viewport: "mobile",
          summary: "Mobile sanity-check capture of the intake surface",
          auto: true
        }
      ],
      manualFallback: [
        {
          filename: "prior-auth-main-desktop.png",
          viewport: "desktop",
          destination: "assets/screenshots/prior-auth",
          target: "Top of the app with title, showcase cases, and intake visible."
        },
        {
          filename: "prior-auth-results-desktop.png",
          viewport: "desktopTall",
          destination: "assets/screenshots/prior-auth",
          target: "Results state for the refusal-style showcase case through Audit Summary."
        },
        {
          filename: "prior-auth-governance-desktop.png",
          viewport: "desktop",
          destination: "assets/screenshots/prior-auth",
          target: "Policy Monitor section showing configured source status and drift review context."
        },
        {
          filename: "prior-auth-main-mobile.png",
          viewport: "mobile",
          destination: "assets/screenshots/prior-auth",
          target: "Top of the app in a mobile viewport with the same truthful intake surface."
        }
      ]
    },
    {
      slug: "clinical-ai-eval-sandbox",
      label: "Clinical AI Eval Sandbox",
      outputDir: "assets/screenshots/clinical-ai-eval",
      source: {
        kind: "artifact-pages",
        repoPath: "../clinical-AI-eval_sandbox",
        pageDir: "capture_pages/clinical-ai-eval",
        requiredFiles: [
          "results/run_manifest.json",
          "results/evaluation_output.csv",
          "results/flagged_cases.jsonl",
          "results/summary.md"
        ]
      },
      captures: [
        {
          id: "eval-sandbox-summary-desktop",
          filename: "eval-sandbox-summary-desktop.png",
          viewport: "desktop",
          summary: "Published benchmark summary rendered from real result artifacts",
          auto: true,
          page: "capture_pages/clinical-ai-eval/eval-sandbox-summary.html"
        },
        {
          id: "eval-sandbox-flagged-cases-desktop",
          filename: "eval-sandbox-flagged-cases-desktop.png",
          viewport: "desktopTall",
          summary: "Flagged cases and failure-category artifact view",
          auto: true,
          page: "capture_pages/clinical-ai-eval/eval-sandbox-flagged-cases.html"
        }
      ],
      manualFallback: [
        {
          filename: "eval-sandbox-summary-desktop.png",
          viewport: "desktop",
          destination: "assets/screenshots/clinical-ai-eval",
          target: "Capture the generated summary page in capture_pages/clinical-ai-eval after restoring the local results files."
        },
        {
          filename: "eval-sandbox-flagged-cases-desktop.png",
          viewport: "desktopTall",
          destination: "assets/screenshots/clinical-ai-eval",
          target: "Capture the generated flagged-cases page in capture_pages/clinical-ai-eval after restoring the local results files."
        }
      ]
    },
    {
      slug: "icu-code-blue-early-warning",
      label: "ICU Code Blue Early Warning",
      outputDir: "assets/screenshots/icu-code-blue",
      source: {
        kind: "artifact-pages",
        repoPath: "../icu-code-blue-early-warning",
        pageDir: "capture_pages/icu-code-blue",
        requiredFiles: [
          "artifacts/reference_run/01_reference_run_counts.csv",
          "artifacts/reference_run/02_reference_run_operating_point.csv",
          "artifacts/reference_run/03_reference_run_alert_policy.csv",
          "artifacts/reference_run/04_reference_run_weights.csv",
          "artifacts/reference_run/05_reference_run_ml_evaluate.csv"
        ]
      },
      captures: [
        {
          id: "icu-risk-panel-desktop",
          filename: "icu-risk-panel-desktop.png",
          viewport: "desktop",
          summary: "Reference run risk and operating-point artifact",
          auto: true,
          page: "capture_pages/icu-code-blue/icu-risk-panel.html"
        },
        {
          id: "icu-alert-policy-desktop",
          filename: "icu-alert-policy-desktop.png",
          viewport: "desktop",
          summary: "Alert-policy comparison artifact",
          auto: true,
          page: "capture_pages/icu-code-blue/icu-alert-policy.html"
        }
      ],
      manualFallback: [
        {
          filename: "icu-risk-panel-desktop.png",
          viewport: "desktop",
          destination: "assets/screenshots/icu-code-blue",
          target: "Capture the generated risk-panel page in capture_pages/icu-code-blue after restoring the local reference run CSVs."
        },
        {
          filename: "icu-alert-policy-desktop.png",
          viewport: "desktop",
          destination: "assets/screenshots/icu-code-blue",
          target: "Capture the generated alert-policy page in capture_pages/icu-code-blue after restoring the local reference run CSVs."
        }
      ]
    }
  ]
};
