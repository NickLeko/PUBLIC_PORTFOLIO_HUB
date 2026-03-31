(function attachPortfolioData() {
  const portfolioData = {
    site: {
      owner: "Nicholas Leko",
      role: "Healthcare AI product builder",
      location: "Tacoma, WA",
      statement:
        "Healthcare-native AI product work across workflow automation, evaluation, and governance-heavy systems.",
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
          displayValue: "opens your email client"
        }
      ]
    },
    navigation: [
      { label: "Projects", href: "#flagship" },
      { label: "How I Build", href: "#how-i-build" },
      { label: "Contact", href: "#about" },
      { label: "One-pager", href: "docs/flagship_one_pager.html" }
    ],
    hero: {
      kicker: "Healthcare AI / AI PM",
      title:
        "Governed healthcare AI for review, routing, and admin workflows.",
      intro:
        "I build healthcare-native AI product artifacts around prior auth, clinical-style evaluation, and workflow-aware ICU analysis. The recurring pattern is governed systems with explicit limits, auditability, and human review.",
      note:
        "Rules before LLMs where stakes are high. Human review stays in the loop.",
      pillars: [
        "Healthcare-native",
        "Governance-first",
        "Workflow-focused",
        "Admin automation",
        "Eval-aware"
      ],
      previewTitle: "Start with these three",
      fitTitle: "Best fit",
      fitItems: [
        "Healthcare AI PM",
        "Workflow automation in regulated settings",
        "AI eval and governance-heavy teams",
        "Provider and payer ops tooling"
      ],
      disclaimer:
        "All three flagship projects are personal portfolio artifacts, not employer product launches."
    },
    flagshipIntro: {
      eyebrow: "Flagship healthcare AI work",
      heading: "Flagship projects.",
      body: "",
      sidebar: ""
    },
    flagshipProjects: [
      {
        slug: "prior-authorization-copilot",
        title: "Prior Authorization Copilot",
        status: "Portfolio prototype",
        artifactType: "Personal project",
        scopeLabel: "Administrative decision support only",
        summary:
          "Rules-first prior auth review that refuses when required evidence is missing.",
        heroPreview:
          "Prior auth review with deterministic checks, evidence mapping, and refusal-first admin support.",
        bestFor:
          "Workflow automation, payer-provider tooling, and AI PM conversations.",
        tags: ["Prior auth", "Rules-first", "Auditability", "Workflow support"],
        problemStatement:
          "Documentation gaps often surface late in prior auth, after time has already been spent reviewing or drafting the submission.",
        whatIBuilt:
          "A deterministic extraction and requirement-checking flow against versioned payer-style rules, with READY, NOT_READY, and CANNOT_DETERMINE outputs plus evidence mapping.",
        whyItMatters:
          "It turns ambiguous admin work into a bounded pre-submit review step that is easier to inspect, discuss, and escalate.",
        proofPoints: [
          "Missing evidence becomes an explicit workflow state instead of a hidden guess.",
          "Current runtime path uses deterministic extraction, evaluation, and letter drafting with no LLM dependency.",
          "Scope stays narrow: two demo procedures, synthetic inputs, and partial policy-drift monitoring.",
          "Public artifacts include rule files, contracts, failure modes, a model card, and a local demo UI."
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
          "Clinical-style eval harness for groundedness, refusal behavior, and failure review.",
        heroPreview:
          "Clinical-style LLM evaluation for groundedness, refusal behavior, and failure analysis.",
        bestFor:
          "Eval, governance, and LLM safety conversations.",
        tags: ["LLM eval", "Safety framing", "Failure analysis", "Governance"],
        problemStatement:
          "In healthcare settings, plausible outputs are not enough. Teams need a concrete way to test groundedness, citations, uncertainty, refusal behavior, and obvious safety failures.",
        whatIBuilt:
          "A fixed benchmark flow that runs a structured dataset through one prompt template, scores outputs with explicit heuristics, flags concerning cases, and publishes reviewer-friendly artifacts.",
        whyItMatters:
          "It treats evaluation as product work instead of after-the-fact QA or benchmark theater.",
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
          "Retrospective ICU risk-ranking case study centered on alert budgets, temporal framing, and honest boundaries.",
        heroPreview:
          "Retrospective ICU case study with held-out hospital evaluation and alert-policy analysis.",
        bestFor:
          "Healthcare ML judgment and workflow-aware evaluation discussions.",
        tags: ["Retrospective ML", "Alert budgets", "BigQuery ML", "Clinical workflow"],
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
    supportingIntro: {
      eyebrow: "Supporting work",
      heading: "Supporting work.",
      body: ""
    },
    supportingGroups: [
      {
        title: "Supporting healthcare work",
        note: "Healthcare workflow projects.",
        items: [
          {
            title: "Outpatient Triage and Routing",
            status: "Supporting healthcare MVP",
            visibility: "Public repo",
            summary:
              "Safety-first outpatient triage MVP with deterministic routing and a separate LLM explanation layer.",
            whyIncluded:
              "Useful secondary proof of clinical workflow thinking and separation between rules and generation.",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/OutpatientTriageAndRouting"
              }
            ]
          }
        ]
      },
      {
        title: "Experiments",
        note: "Browser-based projects.",
        items: [
          {
            title: "Code Blue Defense",
            status: "Experiment",
            visibility: "Public repo",
            summary:
              "Healthcare-themed browser tower defense game about protecting critical care zones from escalating emergency threats.",
            whyIncluded:
              "Shows interface craft and taste without pretending to be part of the core healthcare AI narrative.",
            links: [
              {
                label: "Repo",
                url: "https://github.com/NickLeko/Code-Blue-Defense"
              }
            ]
          },
          {
            title: "Orbit Rocket Game",
            status: "Experiment",
            visibility: "Public repo",
            summary:
              "Arcade-style browser game about piloting a rocket through hazards, pickups, and score-chasing runs.",
            whyIncluded:
              "Shows interface craft and game feel without competing with the core healthcare AI portfolio story.",
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
    automationIntro: {
      eyebrow: "Automations",
      heading: "Automations.",
      body: "Admin and research workflows."
    },
    automations: [
      {
        title: "Daily AI Digest",
        status: "Automation",
        visibility: "Public repo",
        summary:
          "Scheduled healthcare AI digest that pulls from GitHub, RSS, and openFDA, then summarizes and emails a daily brief.",
        whyIncluded:
          "Good proof of signal curation, source prioritization, and lightweight operator-facing automation.",
        links: [
          {
            label: "Repo",
            url: "https://github.com/NickLeko/daily-ai-digest"
          }
        ]
      },
      {
        title: "Job Scanner Agent",
        status: "Automation",
        visibility: "Private/local",
        summary:
          "Python workflow that scans curated job boards, filters roles, scores survivors, and sends a daily shortlist.",
        whyIncluded:
          "Shows a repeated portfolio pattern: rules before expensive model calls, structured outputs, and useful review surfaces.",
        links: []
      }
    ],
    buildIntro: {
      eyebrow: "How I build",
      heading: "How I build.",
      body: ""
    },
    buildPrinciples: [
      {
        title: "Rules before LLMs when stakes are high",
        body:
          "If the workflow depends on evidence presence, threshold checks, or refusal semantics, I start with deterministic logic."
      },
      {
        title: "Evals and monitoring matter",
        body:
          "Evaluation, maintenance boundaries, and drift monitoring belong in the product surface."
      },
      {
        title: "Admin automation is a strong wedge",
        body:
          "A lot of practical healthcare AI value starts in repetitive admin work where structure and review save time."
      },
      {
        title: "Human oversight stays in the loop",
        body:
          "The goal is rarely full autonomy. It is making systems easier for a human reviewer to trust, inspect, and correct."
      }
    ],
    about: {
      eyebrow: "Contact",
      heading: "Healthcare AI / AI PM",
      paragraphs: [
        "Background in healthcare operations, payer workflow, device operations, and frontline clinical admin. That shows up here in workflow fit, reviewer burden, policy friction, alert fatigue, and operational trust.",
        "Personal project work only. No employer products or deployed clinical systems are represented here."
      ],
      highlights: [
        "Healthcare operations and payer-provider workflow context",
        "AI PM with eval and governance focus",
        "Admin automation without autonomy hype",
        "Personal project work separated from work experience"
      ]
    },
    onePager: {
      kicker: "Internal-share snapshot",
      headline:
        "Healthcare AI / AI PM with strongest public work in workflow automation, evaluation, and governance-heavy systems.",
      profile:
        "Healthcare operations professional and AI product builder focused on workflow fit, evaluation discipline, and governance-first design. Strongest public portfolio work spans prior authorization support, clinical-style LLM evaluation, and retrospective ICU risk modeling.",
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
        "Flagship projects are labeled as prototype, benchmark harness, or retrospective case study."
    }
  };

  window.PORTFOLIO_DATA = portfolioData;
})();
