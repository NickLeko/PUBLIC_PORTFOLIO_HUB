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
          url: "https://www.linkedin.com/in/nicholasLeko",
          type: "external"
        },
        {
          label: "Email",
          url: "mailto:nicholas.leko99@gmail.com",
          type: "external"
        }
      ]
    },
    navigation: [
      { label: "Flagship", href: "#flagship" },
      { label: "Supporting", href: "#supporting" },
      { label: "Automations", href: "#automations" },
      { label: "How I Build", href: "#how-i-build" },
      { label: "Positioning", href: "#about" },
      { label: "One-pager", href: "docs/flagship_one_pager.html" }
    ],
    hero: {
      kicker: "Healthcare AI / AI PM portfolio",
      title:
        "Healthcare-native AI product work for high-stakes healthcare workflows.",
      intro:
        "The strongest public story is three flagship projects across prior authorization support, clinical-style LLM evaluation, and retrospective ICU risk modeling, built with governance-first boundaries and admin-automation instinct.",
      note:
        "The through-line is simple: admin automation where it helps, rules before LLMs when stakes are high, and explicit limits everywhere.",
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
      heading: "Start here. These three projects carry the portfolio story.",
      body:
        "If someone only reads one section, it should be this one. Each card is built to answer the problem, the build, why it matters, why it feels credible, and where the limits are.",
      sidebar:
        "Everything after this section is supporting evidence, not the main pitch."
    },
    flagshipProjects: [
      {
        slug: "prior-authorization-copilot",
        title: "Prior Authorization Copilot",
        status: "Portfolio prototype",
        artifactType: "Personal project",
        scopeLabel: "Administrative decision support only",
        summary:
          "Rules-first prior auth readiness review that refuses when required evidence is missing.",
        heroPreview:
          "Prior auth workflow support with deterministic checks, evidence mapping, and refusal-first admin review.",
        bestFor:
          "Workflow automation, payer-provider tooling, and AI PM conversations.",
        tags: ["Prior auth", "Rules-first", "Auditability", "Workflow support"],
        problemStatement:
          "Documentation gaps often surface late in the prior auth cycle, after time has already been spent reviewing or drafting a submission.",
        whatIBuilt:
          "A deterministic extraction and requirement-evaluation flow against versioned payer-style rules, with READY, NOT_READY, and CANNOT_DETERMINE outputs plus evidence mapping.",
        whyItMatters:
          "It turns an ambiguous admin burden into a bounded pre-submit review step that is easier to inspect, discuss, and escalate.",
        proofPoints: [
          "Missing evidence becomes an explicit workflow state instead of a hidden guess.",
          "The current runtime path uses deterministic extraction, evaluation, and letter drafting with no LLM dependency.",
          "Scope is intentionally narrow: two demo procedures, synthetic inputs, and partial policy-drift monitoring.",
          "Public artifacts include contracts, failure modes, a model card, rule files, and a local demo UI."
        ],
        limitations: [
          "Not approval prediction and not a clinical decision tool.",
          "No EHR, payer, or clearinghouse integration.",
          "Synthetic demo cases only with limited procedure coverage.",
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
          },
          {
            src: "assets/screenshots/prior-auth/prior-auth-governance-desktop.png",
            alt:
              "Prior Authorization Copilot policy monitor showing configured source status and governance-oriented review context.",
            title: "Governance and policy monitor",
            note: "Focused capture of the policy-monitoring and review context.",
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
          "Safety-oriented eval harness for clinical-style LLM outputs before workflow use.",
        heroPreview:
          "Clinical-style LLM evaluation focused on groundedness, citations, refusal behavior, and failure analysis.",
        bestFor:
          "Eval, governance, and LLM safety conversations.",
        tags: ["LLM eval", "Safety framing", "Failure analysis", "Governance"],
        problemStatement:
          "Plausible outputs are not enough in healthcare settings. Teams need a concrete way to test groundedness, citations, uncertainty, refusal behavior, and obvious safety failures.",
        whatIBuilt:
          "A fixed benchmark flow that runs a structured dataset through one prompt template, scores outputs with explicit heuristics, flags concerning cases, and publishes reviewer-friendly artifacts.",
        whyItMatters:
          "It shows evaluation as product work, not after-the-fact QA or benchmark theater.",
        proofPoints: [
          "Public artifacts pin one explicit run with provider, model, run ID, and case count.",
          "Review outputs include raw generations, case-level scoring, flagged cases, a summary report, and safety documentation.",
          "Dataset, prompt, metrics, and published results are treated as benchmark-sensitive assets.",
          "The repo stays intentionally small and auditable instead of pretending to be a clinical system."
        ],
        limitations: [
          "Not clinical validation and not evidence that a model is safe in deployment.",
          "Safety and faithfulness checks are heuristic and incomplete.",
          "The public result set reflects one explicit run, not universal model performance.",
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
          "Retrospective ICU risk-ranking case study focused on alert budgets, temporal correctness, and honest boundaries.",
        heroPreview:
          "Interpretable ICU ML case study with held-out hospital evaluation and alert-policy analysis.",
        bestFor:
          "Healthcare ML judgment and workflow-aware evaluation discussions.",
        tags: ["Retrospective ML", "Alert budgets", "BigQuery ML", "Clinical workflow"],
        problemStatement:
          "Rare-event ICU prediction work is often presented with headline metrics that say little about alert fatigue, temporal correctness, or workflow fit.",
        whatIBuilt:
          "A reviewer-facing retrospective pipeline over eICU-CRD using hourly features, BigQuery ML logistic regression, held-out hospital evaluation, and separate post-model alert-policy analysis.",
        whyItMatters:
          "It frames evaluation as an operational problem: not just whether the model scores well offline, but whether an alerting policy can be reasoned about under real constraints.",
        proofPoints: [
          "Temporal framing uses a six-hour lookback to rank patient-hours for risk in the next two hours.",
          "The published evaluation is hospital-level held-out testing rather than a looser random split.",
          "At the top 0.5 percent of scored test rows, the checked-in reference run reports 13.55x enrichment over test prevalence.",
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
      heading: "Useful secondary proof, clearly separate from the flagship story.",
      body:
        "These projects add range without competing for attention. Supporting healthcare work stays adjacent to the main story; experiments stay visibly secondary."
    },
    supportingGroups: [
      {
        title: "Supporting healthcare work",
        note: "Adjacent workflow and safety-oriented healthcare projects.",
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
        title: "Experiments / fun",
        note: "Visible, but intentionally not the main story.",
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
            title: "Fantasy Injury Report",
            status: "Fun side project",
            visibility: "Private/local",
            summary:
              "Tiny Streamlit parody app that rewrites everyday mishaps as fantasy sports injury reports.",
            whyIncluded:
              "Kept visible as personality and product craft, but clearly secondary to the flagship portfolio work.",
            links: []
          }
        ]
      }
    ],
    automationIntro: {
      eyebrow: "Automations",
      heading: "Admin and research workflows where structure beats busywork.",
      body:
        "These are not presented as autonomous systems. The pattern is structured inputs, useful filtering, and clear human review points."
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
      heading: "A few principles that repeat across the portfolio.",
      body:
        "The common thread is not model novelty. It is keeping behavior inspectable in high-stakes workflows."
    },
    buildPrinciples: [
      {
        title: "Rules before LLMs when stakes are high",
        body:
          "If the workflow depends on evidence presence, threshold checks, or refusal semantics, I default to deterministic logic first."
      },
      {
        title: "Evals and monitoring matter",
        body:
          "I treat evaluation, maintenance boundaries, and drift monitoring as part of the product surface rather than bolt-on QA."
      },
      {
        title: "Admin automation is a strong wedge",
        body:
          "A lot of practical healthcare AI value starts in repetitive admin work where better structure and review can save real time."
      },
      {
        title: "Human oversight stays in the loop",
        body:
          "The goal is rarely full autonomy. It is building systems that are easier for a human reviewer to trust, inspect, and correct."
      }
    ],
    about: {
      eyebrow: "Positioning",
      heading: "Healthcare-native product framing with explicit project boundaries.",
      paragraphs: [
        "My background spans healthcare operations, payer workflow, device operations, and frontline clinical admin settings. That shows up in the portfolio as workflow fit, reviewer burden, policy friction, alert fatigue, and operational trust.",
        "This site focuses on personal portfolio work. It is meant to show product judgment in healthcare AI, not imply that these repos are deployed clinical products or employer-owned launches."
      ],
      highlights: [
        "Healthcare operations and payer-provider workflow context",
        "AI PM lens with real interest in eval and governance",
        "Admin automation instinct without autonomy hype",
        "Personal project work clearly separated from work experience"
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
        "All three flagship items are personal portfolio artifacts with explicit scope labels: prototype, benchmark harness, or retrospective case study."
    }
  };

  window.PORTFOLIO_DATA = portfolioData;
})();
