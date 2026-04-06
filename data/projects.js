(function attachPortfolioData() {
  const portfolioData = {
    site: {
      owner: "Nicholas Leko",
      role: "Healthcare AI product builder",
      statement:
        "Healthcare AI product work across workflow automation, evaluation discipline, and governance-heavy systems.",
      disclaimer:
        "Everything here is labeled as a personal project, portfolio prototype, benchmark harness, retrospective case study, or private/local workflow. Nothing is presented as an employer product or deployed clinical system unless explicitly stated.",
      links: [
        {
          label: "One-pager",
          url: "docs/flagship_one_pager.html",
          type: "internal"
        },
        {
          label: "GitHub",
          url: "https://github.com/NickLeko",
          type: "external"
        },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/nicholas-leko",
          type: "external"
        },
        {
          label: "Email",
          url: "mailto:nicholas.leko99@gmail.com",
          type: "external",
          displayValue: "nicholas.leko99@gmail.com"
        }
      ]
    },
    navigation: [
      { label: "Flagships", href: "#flagship" },
      { label: "One-pager", href: "docs/flagship_one_pager.html" },
      { label: "Contact", href: "#contact" }
    ],
    hero: {
      kicker: "Healthcare AI / AI PM",
      title: "Healthcare AI product work for governed workflows.",
      intro:
        "I build healthcare AI portfolio artifacts around prior authorization support, clinical-style LLM evaluation, and ICU risk analysis. The common thread is rules-first design, reviewable outputs, and honest scope boundaries.",
      note:
        "Personal projects only: prototype, benchmark harness, and retrospective case study.",
      pillars: [
        "Workflow automation",
        "Evaluation discipline",
        "Honest scope boundaries"
      ]
    },
    ctaBanner: {
      eyebrow: "Recruiter shortcut",
      heading: "Start with the flagship one-pager.",
      body:
        "Best first click if you want the three core projects, what each proves, and the scope boundaries in one page.",
      note:
        "Then use the homepage for screenshots, case-study detail, and supporting work."
    },
    flagshipIntro: {
      eyebrow: "Flagship healthcare AI work",
      heading: "Three flagship projects.",
      body:
        "These are the main public proof points. Each one is positioned to show a different kind of product judgment."
    },
    flagshipProjects: [
      {
        slug: "prior-authorization-copilot",
        title: "Prior Authorization Copilot",
        status: "Portfolio prototype",
        artifactType: "Personal project",
        scopeLabel: "Administrative decision support only",
        summary:
          "Rules-first prior auth readiness review for administrative workflows before submission.",
        primaryProof:
          "Proves workflow automation with versioned rules, evidence mapping, and refusal-aware support.",
        proofNote:
          "Turns missing documentation into an explicit review state instead of a hidden guess.",
        tags: [
          "Workflow automation",
          "Rules-first governance",
          "Refusal-aware support"
        ],
        problemStatement:
          "Prior auth work breaks down when documentation gaps are discovered late, after staff have already spent time reviewing or drafting the submission.",
        whatIBuilt:
          "A deterministic extraction and requirement-checking flow against versioned payer-style rules, with READY, NOT_READY, and CANNOT_DETERMINE outputs plus evidence mapping.",
        whyItMatters:
          "It makes pre-submit review inspectable and governable instead of relying on vague judgment about whether a packet looks complete.",
        proofPoints: [
          "Versioned payer-style rules define what counts as evidence.",
          "Missing evidence triggers refusal-aware outputs instead of guessed approvals.",
          "Structured evidence mapping keeps each blocker traceable.",
          "Public artifacts include rules, contracts, failure modes, a model card, and a local demo UI."
        ],
        limitations: [
          "Not approval prediction and not a clinical decision tool.",
          "No EHR, payer, or clearinghouse integration.",
          "Synthetic demo cases only; limited procedure coverage.",
          "Policy-drift monitoring applies only to configured sources."
        ],
        links: [
          {
            label: "Repo",
            url: "https://github.com/NickLeko/PriorAuthorizationCopilot"
          },
          {
            label: "README",
            url: "https://github.com/NickLeko/PriorAuthorizationCopilot/blob/main/README.md"
          },
          {
            label: "Failure modes",
            url: "https://github.com/NickLeko/PriorAuthorizationCopilot/blob/main/FAILURE_MODES.md"
          }
        ],
        screenshots: [
          {
            src: "assets/screenshots/prior-auth/prior-auth-main-desktop.png",
            alt:
              "Prior Authorization Copilot intake and review surface with demo cases, payer inputs, and bounded administrative workflow framing.",
            title: "Main workflow surface",
            note: "Live Streamlit capture of the intake and review flow.",
            placeholder: false
          },
          {
            src: "assets/screenshots/prior-auth/prior-auth-results-desktop.png",
            alt:
              "Prior Authorization Copilot results state showing refusal-first readiness output, blockers, extracted facts, and audit detail.",
            title: "Results and blockers",
            note: "Real showcase-case capture of the structured outputs surface.",
            placeholder: false
          }
        ],
        onePagerSummary:
          "Rules-first prior auth readiness review using deterministic extraction, requirement-level checks, and explicit refusal when evidence is missing.",
        onePagerWhy:
          "Strong proof of workflow realism, refusal semantics, and auditability in an admin-heavy healthcare problem.",
        onePagerSignals: [
          "Workflow realism",
          "Refusal-first design",
          "Governance and auditability"
        ]
      },
      {
        slug: "clinical-ai-eval-sandbox",
        title: "Clinical AI Eval Sandbox",
        status: "Benchmark harness",
        artifactType: "Personal project",
        scopeLabel: "Pre-deployment evaluation artifact",
        summary:
          "Clinical-style evaluation harness that makes model failures visible before anyone talks about deployment.",
        primaryProof:
          "Proves benchmark discipline with strict reviewer artifacts, flagged-case review, and safety-first evaluator framing.",
        proofNote:
          "Pins model claims to one disclosed run instead of benchmark theater.",
        tags: [
          "Evaluator strictness",
          "Flagged-case review",
          "Safety credibility"
        ],
        problemStatement:
          "In healthcare settings, plausible outputs are not enough. Teams need a concrete way to test groundedness, citations, uncertainty, refusal behavior, and obvious safety failures.",
        whatIBuilt:
          "A fixed benchmark flow that runs a structured dataset through one prompt template, scores outputs with explicit heuristics, flags concerning cases, and publishes reviewer-friendly artifacts.",
        whyItMatters:
          "It treats evaluation as product work instead of after-the-fact QA or vague benchmark storytelling.",
        proofPoints: [
          "Public artifacts pin one explicit run with provider, model, run ID, and case count.",
          "Review outputs include raw generations, case scoring, flagged cases, a summary report, and safety docs.",
          "Dataset, prompt, metrics, and published results are handled as benchmark-sensitive assets.",
          "The repo stays intentionally small and auditable instead of pretending to be a clinical system."
        ],
        limitations: [
          "Not clinical validation and not evidence that a model is safe in deployment.",
          "Safety and faithfulness checks are heuristic and incomplete.",
          "Public results reflect one explicit run, not universal model performance.",
          "Human clinical review remains outside the automated pipeline."
        ],
        links: [
          {
            label: "Repo",
            url: "https://github.com/NickLeko/clinical-AI-eval_sandbox"
          },
          {
            label: "Results summary",
            url: "https://github.com/NickLeko/clinical-AI-eval_sandbox/blob/main/results/summary.md"
          },
          {
            label: "Reviewer guide",
            url: "https://github.com/NickLeko/clinical-AI-eval_sandbox/blob/main/docs/reviewer_guide.md"
          }
        ],
        screenshots: [
          {
            src: "assets/screenshots/clinical-ai-eval/eval-sandbox-summary-desktop.png",
            alt:
              "Clinical AI Eval Sandbox benchmark summary generated from the published run manifest and scored outputs.",
            title: "Published run summary",
            note: "Generated from the real local benchmark result artifacts.",
            placeholder: false
          },
          {
            src: "assets/screenshots/clinical-ai-eval/eval-sandbox-flagged-cases-desktop.png",
            alt:
              "Clinical AI Eval Sandbox flagged-case artifact showing failure categories and reviewer excerpts from the published run.",
            title: "Flagged-case artifact",
            note: "Generated from the real local flagged-case export.",
            placeholder: false
          }
        ],
        onePagerSummary:
          "Safety-oriented LLM evaluation harness for clinical-style outputs, focused on groundedness, citations, uncertainty, refusal, and unsafe recommendation flags.",
        onePagerWhy:
          "Strong proof of benchmark discipline, failure analysis, and governance-first thinking around LLM behavior.",
        onePagerSignals: [
          "Eval judgment",
          "Failure analysis",
          "Governance-first benchmarking"
        ]
      },
      {
        slug: "icu-code-blue-early-warning",
        title: "ICU Code Blue Early Warning",
        status: "Retrospective case study",
        artifactType: "Personal project",
        scopeLabel: "Held-out-hospital ranking study",
        summary:
          "Retrospective ICU ranking study framed around alert budgets and operating-point judgment.",
        primaryProof:
          "Proves retrospective ML judgment with held-out evaluation, actionability focus, and honest non-deployment boundaries.",
        proofNote:
          "Treats alert burden and operating point as the real product question, not just headline metrics.",
        tags: [
          "Held-out evaluation",
          "Alert-budget analysis",
          "Non-deployment honesty"
        ],
        problemStatement:
          "Rare-event ICU prediction is often sold with headline metrics that say little about alert burden, temporal correctness, or workflow fit.",
        whatIBuilt:
          "A reviewer-facing retrospective pipeline over eICU-CRD using hourly features, BigQuery ML logistic regression, held-out hospital evaluation, and separate alert-policy analysis.",
        whyItMatters:
          "It frames evaluation as an operational question: not just whether a model ranks well offline, but whether an alerting policy is discussable under real constraints.",
        proofPoints: [
          "Uses a six-hour lookback to rank patient-hours for risk in the next two hours.",
          "Published evaluation is hospital-level held-out testing, not a looser random split.",
          "At the top 0.5 percent of scored test rows, the reference run shows 13.55x enrichment over test prevalence.",
          "Aggregate reviewer exports and cooldown analyses discuss alert burden, not just ranking output."
        ],
        limitations: [
          "Retrospective case study only and not a deployment-ready clinical device.",
          "The outcome is a chart-derived proxy label, not adjudicated prospective ground truth.",
          "Results are specific to this cohort, split design, and feature path.",
          "No patient-level data are redistributed in the repo."
        ],
        links: [
          {
            label: "Repo",
            url: "https://github.com/NickLeko/icu-code-blue-early-warning"
          },
          {
            label: "Case study",
            url: "https://github.com/NickLeko/icu-code-blue-early-warning/blob/main/CASE_STUDY.md"
          },
          {
            label: "Reviewer guide",
            url: "https://github.com/NickLeko/icu-code-blue-early-warning/blob/main/docs/reviewer_guide.md"
          }
        ],
        screenshots: [
          {
            src: "assets/screenshots/icu-code-blue/icu-risk-panel-desktop.png",
            alt:
              "ICU Code Blue Early Warning risk panel summarizing the retrospective reference run operating point and held-out evaluation context.",
            title: "Risk and operating point",
            note: "Generated from the checked-in reference run exports.",
            placeholder: false
          },
          {
            src: "assets/screenshots/icu-code-blue/icu-alert-policy-desktop.png",
            alt:
              "ICU Code Blue Early Warning alert-policy comparison artifact showing alert burden tradeoffs from the reference run.",
            title: "Alert-policy artifact",
            note: "Generated from the checked-in alert-policy and reference-run CSVs.",
            placeholder: false
          }
        ],
        onePagerSummary:
          "Interpretable ICU risk-ranking case study using eICU-CRD, held-out hospital evaluation, and alert-budget analysis instead of headline-metric theater.",
        onePagerWhy:
          "Strong proof of alert-budget discipline, reproducibility, and honest clinical boundaries in retrospective ML work.",
        onePagerSignals: [
          "Temporal correctness",
          "Workflow-aware evaluation",
          "Honest clinical boundaries"
        ]
      }
    ],
    secondaryIntro: {
      eyebrow: "Secondary work",
      heading: "Other builds and tools.",
      body:
        "Useful supporting projects and automations, intentionally kept out of the main recruiter path."
    },
    secondaryGroups: [
      {
        title: "Supporting healthcare and tooling",
        note: "Smaller proof points and operator tools.",
        items: [
          {
            title: "Outpatient Triage and Routing",
            kind: "Supporting healthcare MVP",
            visibility: "Public repo",
            descriptor: "Safety-first triage MVP",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/OutpatientTriageAndRouting"
              }
            ]
          },
          {
            title: "Daily AI Digest",
            kind: "Automation",
            visibility: "Public repo",
            descriptor: "Daily healthcare AI brief",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/daily-ai-digest"
              }
            ]
          },
          {
            title: "Job Scanner Agent",
            kind: "Automation",
            visibility: "Private/local",
            descriptor: "Private role-filtering workflow",
            links: []
          }
        ]
      },
      {
        title: "Experiments",
        note: "Deliberately separate from the healthcare AI core story.",
        items: [
          {
            title: "Code Blue Defense",
            kind: "Browser experiment",
            visibility: "Public repo",
            descriptor: "Healthcare tower defense game",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/Code-Blue-Defense"
              }
            ]
          },
          {
            title: "Orbit Rocket Game",
            kind: "Browser experiment",
            visibility: "Public repo",
            descriptor: "Arcade browser game",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/Orbit_Arcade_Game"
              }
            ]
          }
        ]
      }
    ],
    about: {
      eyebrow: "Contact",
      heading: "Links and context.",
      paragraphs: [
        "Background in healthcare operations, payer workflow, device operations, and frontline clinical admin. That shows up here in workflow fit, reviewer burden, policy friction, and alert-fatigue judgment.",
        "All flagship work here is personal project work with explicit scope boundaries."
      ],
      highlights: [
        "Healthcare ops context",
        "AI PM and eval mindset",
        "Personal project artifacts only"
      ]
    },
    onePager: {
      kicker: "Internal-share snapshot",
      headline:
        "Healthcare AI / AI PM with flagship public work in workflow automation, evaluation discipline, and governance-heavy systems.",
      profile:
        "Healthcare operations professional and AI product builder with strongest public artifacts in prior authorization support, clinical-style LLM evaluation, and retrospective ICU risk modeling. The recurring pattern is governed workflow design, reviewer-facing outputs, and explicit scope boundaries.",
      forwardForTitle: "Forward if the role cares about",
      forwardFor: [
        "Healthcare AI PM and workflow product roles",
        "Provider or payer ops tooling",
        "AI eval, governance, or safety-heavy teams",
        "Admin-automation wedges in regulated settings"
      ],
      themesTitle: "Why the portfolio is credible",
      themes: [
        {
          title: "Healthcare-native",
          body:
            "Grounded in payer workflows, clinical admin realities, and operator constraints rather than generic AI demos."
        },
        {
          title: "Governance-first",
          body:
            "Claims stay narrow, artifacts stay inspectable, and scope boundaries are treated as part of product quality."
        },
        {
          title: "Workflow-focused",
          body:
            "The goal is better review, routing, or prioritization rather than vague automation claims."
        },
        {
          title: "Eval-aware",
          body:
            "Benchmarks, alert budgets, failure analysis, and monitoring are part of the story, not afterthoughts."
        }
      ],
      footerNote:
        "Flagship projects are explicitly labeled as prototype, benchmark harness, or retrospective case study."
    }
  };

  window.PORTFOLIO_DATA = portfolioData;
})();
