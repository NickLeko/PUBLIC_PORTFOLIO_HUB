(function attachPortfolioData() {
  const portfolioData = {
    site: {
      owner: "Nicholas Leko",
      role: "Healthcare AI product builder",
      statement:
        "Healthcare AI product work across workflow automation, evaluation discipline, and governed healthcare workflows.",
      disclaimer:
        "Everything here is labeled as a personal project, portfolio prototype, benchmark harness, retrospective case study, or private/local workflow. Nothing is presented as an employer product or deployed clinical system unless explicitly stated.",
      links: [
        {
          label: "Hiring brief",
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
      { label: "Hiring brief", href: "docs/flagship_one_pager.html" },
      { label: "Review code", href: "https://github.com/NickLeko" },
      { label: "Contact", href: "#contact" }
    ],
    hero: {
      kicker: "Healthcare AI / AI PM",
      title: "Healthcare AI product work for governed workflows.",
      intro:
        "Public healthcare AI artifacts in prior authorization review, clinical-style LLM evaluation, and retrospective ICU risk analysis. Each flagship links code, docs, screenshots, and scope boundaries.",
      note:
        "Personal project artifacts only: prototype, benchmark harness, and retrospective case study. Not deployed clinical software.",
      pillars: [
        "Workflow automation",
        "Evaluation discipline",
        "Explicit scope boundaries"
      ]
    },
    proofStrip: {
      items: [
        {
          title: "3 public flagship artifacts",
          detail: "Repo, docs, and screenshots are linked from the homepage."
        },
        {
          title: "Rules, refusal, and HITL boundaries",
          detail: "Missing evidence, reviewer checkpoints, and scope limits stay explicit."
        },
        {
          title: "Reviewable evaluator outputs",
          detail: "Run manifests, flagged cases, and summary artifacts are public."
        },
        {
          title: "Held-out case-study evidence",
          detail: "Alert-budget analysis and hospital-level evaluation are documented."
        }
      ]
    },
    ctaBanner: {
      eyebrow: "Recruiter shortcut",
      heading: "Start with the hiring brief.",
      body:
        "Fastest route if you want the three flagship projects, the review surface for each, and the scope boundaries in one page.",
      note:
        "Then use the homepage for screenshots, concrete evidence bullets, and repo or doc links."
    },
    flagshipIntro: {
      eyebrow: "Flagship healthcare AI work",
      heading: "Three flagship projects.",
      body:
        "Each flagship surfaces concrete evidence first: closed-state bullets, repo and doc links, and one screenshot tied to the workflow or evaluation surface."
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
          "Repo includes versioned rules, evidence mapping, and refusal-aware readiness states.",
        proofNote:
          "Missing documentation stays visible as CANNOT_DETERMINE rather than hidden.",
        evidenceBullets: [
          "READY, NOT_READY, and CANNOT_DETERMINE outputs are backed by evidence mapping.",
          "Versioned payer-style rules and requirement checks are reviewable in the repo.",
          "Failure modes and scope boundaries are documented alongside the demo."
        ],
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
          "The review path is inspectable: blockers stay explicit instead of being inferred away.",
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
        closedCardShotIndex: 1,
        onePagerSummary:
          "Rules-first prior auth readiness review using deterministic extraction, requirement-level checks, and explicit refusal when evidence is missing.",
        onePagerWhy:
          "Shows workflow realism, refusal semantics, and auditability in an admin-heavy healthcare problem.",
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
          "Clinical-style evaluation harness with published artifacts for groundedness, refusal, and safety review.",
        primaryProof:
          "Public benchmark run includes a manifest, scored cases, flagged cases, and reviewer docs.",
        proofNote:
          "Published claims are tied to one disclosed run, not broad model marketing.",
        evidenceBullets: [
          "Run manifest, raw generations, scored cases, and flagged cases are published.",
          "Results summary and reviewer guide are linked for direct review.",
          "Safety and faithfulness checks are explicit heuristics, not deployment claims."
        ],
        tags: [
          "Evaluator strictness",
          "Flagged-case review",
          "Safety review"
        ],
        problemStatement:
          "In healthcare settings, plausible outputs are not enough. Teams need a concrete way to test groundedness, citations, uncertainty, refusal behavior, and obvious safety failures.",
        whatIBuilt:
          "A fixed benchmark flow that runs a structured dataset through one prompt template, scores outputs with explicit heuristics, flags concerning cases, and publishes reviewer-friendly artifacts.",
        whyItMatters:
          "A reviewer can inspect one disclosed run instead of relying on vague benchmark claims.",
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
        closedCardShotIndex: 1,
        onePagerSummary:
          "Safety-oriented LLM evaluation harness for clinical-style outputs, focused on groundedness, citations, uncertainty, refusal, and unsafe recommendation flags.",
        onePagerWhy:
          "Shows benchmark discipline, failure analysis, and governance-first thinking around LLM behavior.",
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
          "Retrospective ICU ranking study with held-out evaluation and alert-budget analysis.",
        primaryProof:
          "Retrospective case study with held-out hospital evaluation and alert-policy analysis.",
        proofNote:
          "Alert-budget tradeoffs stay visible alongside ranking output.",
        evidenceBullets: [
          "Six-hour lookback ranks patient-hours for risk in the next two hours.",
          "Reference evaluation uses hospital-level held-out testing.",
          "Top 0.5 percent of scored test rows shows 13.55x enrichment over test prevalence."
        ],
        tags: [
          "Held-out evaluation",
          "Alert-budget analysis",
          "Non-deployment boundaries"
        ],
        problemStatement:
          "Rare-event ICU prediction is often sold with headline metrics that say little about alert burden, temporal correctness, or workflow fit.",
        whatIBuilt:
          "A reviewer-facing retrospective pipeline over eICU-CRD using hourly features, BigQuery ML logistic regression, held-out hospital evaluation, and separate alert-policy analysis.",
        whyItMatters:
          "The review surface keeps ranking quality and alert burden visible together.",
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
        closedCardShotIndex: 1,
        onePagerSummary:
          "Interpretable ICU risk-ranking case study using eICU-CRD, held-out hospital evaluation, and alert-budget analysis.",
        onePagerWhy:
          "Shows alert-budget discipline, reproducibility, and clinical scope boundaries in retrospective ML work.",
        onePagerSignals: [
          "Temporal correctness",
          "Workflow-aware evaluation",
          "Clinical scope boundaries"
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
        title: "Supporting healthcare workflow systems",
        note: "Public supporting systems for interoperability, bounded orchestration, and signal triage.",
        items: [
          {
            title: "FHIR Referral Intake Review",
            kind: "Interoperability workflow",
            visibility: "Public repo",
            descriptor: "FHIR intake review with source traceability",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/FHIR-Referral-Intake-Review"
              }
            ]
          },
          {
            title: "Prior Auth Readiness Handoff Agent",
            kind: "Workflow orchestration",
            visibility: "Public repo",
            descriptor: "Bounded orchestration with explicit human review",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/prior-auth-readiness-handoff-agent"
              }
            ]
          },
          {
            title: "Daily AI Digest",
            kind: "Operational intelligence",
            visibility: "Public repo",
            descriptor: "Signal triage for healthcare AI developments",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/daily-ai-digest"
              }
            ]
          }
        ]
      },
      {
        title: "Optional experiments",
        note: "Collapsed so the healthcare AI review path stays primary.",
        collapsed: true,
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
      headline:
        "Healthcare AI / AI PM with flagship public work in workflow automation, evaluation discipline, and governed healthcare workflows.",
      profile:
        "Healthcare operations professional and AI product builder with public artifacts in prior authorization support, clinical-style LLM evaluation, and retrospective ICU risk modeling. The recurring pattern is governed workflow design, reviewer-facing outputs, and explicit scope boundaries.",
      themesTitle: "Common thread",
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
            "The goal is better review, routing, or prioritization rather than broad automation framing."
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
