const fs = require("fs");
const fsp = fs.promises;
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const config = require("../screenshots.config.js");

const rootDir = path.resolve(__dirname, "..");
const manualGuidePath = path.resolve(rootDir, "assets/screenshots/MANUAL_CAPTURE_GUIDE.md");
const chromeExecutable = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

function resolveFromRoot(relativePath) {
  return path.resolve(rootDir, relativePath);
}

function resolveRepoPath(project) {
  return path.resolve(rootDir, project.source.repoPath);
}

function parseCsv(csvText) {
  const rows = [];
  let cell = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      const hasContent = row.some((value) => value !== "");
      if (hasContent) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  const [headers, ...dataRows] = rows;
  return dataRows.map((dataRow) => {
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = dataRow[index] || "";
    });
    return entry;
  });
}

async function readCsv(filePath) {
  return parseCsv(await fsp.readFile(filePath, "utf8"));
}

async function readJsonLines(filePath) {
  const raw = await fsp.readFile(filePath, "utf8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatInt(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

function formatDecimal(value, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

function formatPercent(value, digits = 1) {
  return `${formatDecimal(value * 100, digits)}%`;
}

function formatMaybePercent(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "N/A";
  }
  return formatPercent(value, digits);
}

function formatSigned(value, digits = 3) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatDecimal(value, digits)}`;
}

function slugToTitle(value) {
  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badgeClass(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "pass" || normalized === "ready") {
    return "pass";
  }
  if (normalized === "warn" || normalized === "medium") {
    return "warn";
  }
  if (normalized === "fail" || normalized === "high" || normalized === "cannot_determine") {
    return "fail";
  }
  if (normalized === "low") {
    return "low";
  }
  return "info";
}

function renderBadge(value) {
  return `<span class="badge ${badgeClass(value)}">${escapeHtml(String(value).replace(/_/g, " "))}</span>`;
}

function excerptText(text, maxLength = 260) {
  const normalized = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength).trim()}...`;
}

function mean(rows, key) {
  const values = rows.map((row) => toNumber(row[key])).filter((value) => value !== null);
  if (!values.length) {
    return null;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function countTrue(rows, key) {
  return rows.filter((row) => String(row[key]).toLowerCase() === "true").length;
}

function countBy(rows, key) {
  return rows.reduce((accumulator, row) => {
    const value = row[key] || "Unknown";
    accumulator[value] = (accumulator[value] || 0) + 1;
    return accumulator;
  }, {});
}

function parseFailureTags(rows) {
  const counts = {};

  for (const row of rows) {
    const value = row.failure_tags || row.failure_tags === "" ? row.failure_tags : row.failure_tags;
    const tags = String(value || "")
      .split(/[|,]/)
      .map((tag) => tag.trim())
      .filter(Boolean);

    for (const tag of tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }

  return counts;
}

function buildPageDocument({ title, eyebrow, lede, pills, body, footerNote }) {
  const pillHtml = pills
    .map((pill) => `<span class="pill"><strong>${escapeHtml(pill.label)}</strong> ${escapeHtml(pill.value)}</span>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="../capture_pages.css">
  </head>
  <body>
    <main class="capture-shell">
      <header class="page-header">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h1 class="page-title">${escapeHtml(title)}</h1>
          <p class="page-lede">${escapeHtml(lede)}</p>
        </div>
        <div class="pill-row">${pillHtml}</div>
      </header>
      ${body}
      <p class="footer-note">${escapeHtml(footerNote)}</p>
    </main>
  </body>
</html>`;
}

function makeMetricCard(label, value, note) {
  return `
    <article class="metric-card">
      <span class="metric-label">${escapeHtml(label)}</span>
      <span class="metric-value">${escapeHtml(value)}</span>
      <div class="metric-note">${escapeHtml(note)}</div>
    </article>
  `;
}

function makeKvGrid(items) {
  return `
    <div class="kv-grid">
      ${items
        .map(
          (item) => `
            <div class="kv-item">
              <span class="kv-label">${escapeHtml(item.label)}</span>
              <span class="kv-value">${escapeHtml(item.value)}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function makeTable(headers, rows) {
  return `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

async function writePage(relativePath, html) {
  const targetPath = resolveFromRoot(relativePath);
  await ensureDir(path.dirname(targetPath));
  await fsp.writeFile(targetPath, html);
  console.log(`Generated page: ${relativePath}`);
}

async function generateClinicalEvalPages(project) {
  const repoPath = resolveRepoPath(project);
  const manifest = JSON.parse(await fsp.readFile(path.join(repoPath, "results/run_manifest.json"), "utf8"));
  const results = await readCsv(path.join(repoPath, "results/evaluation_output.csv"));
  const flaggedCases = await readJsonLines(path.join(repoPath, "results/flagged_cases.jsonl"));

  const gradeCounts = countBy(results, "overall_grade");
  const failureTagCounts = parseFailureTags(results);
  const worstCases = [...results]
    .sort((left, right) => {
      const severity = { FAIL: 0, WARN: 1, PASS: 2 };
      const leftSeverity = severity[left.overall_grade] ?? 99;
      const rightSeverity = severity[right.overall_grade] ?? 99;

      if (leftSeverity !== rightSeverity) {
        return leftSeverity - rightSeverity;
      }

      return (toNumber(left.faithfulness_proxy) || 99) - (toNumber(right.faithfulness_proxy) || 99);
    })
    .slice(0, 5);

  const signalRates = [
    {
      label: "Unsafe recs",
      value: formatMaybePercent(countTrue(results, "unsafe_recommendation") / results.length, 1)
    },
    {
      label: "Hallucination flags",
      value: formatMaybePercent(countTrue(results, "hallucination_suspected") / results.length, 1)
    },
    {
      label: "Refusal failures",
      value: formatMaybePercent(countTrue(results, "refusal_failure") / results.length, 1)
    }
  ];

  const summaryHtml = buildPageDocument({
    title: "Published benchmark summary",
    eyebrow: "Clinical AI Eval Sandbox",
    lede:
      "Real screenshot source generated from the published run manifest and scoring artifacts. This is a benchmark summary artifact, not clinical validation or deployment evidence.",
    pills: [
      { label: "Run", value: manifest.run_id },
      { label: "Model", value: manifest.model_id },
      { label: "Cases", value: formatInt(manifest.case_count) }
    ],
    body: `
      <section class="metric-grid">
        ${makeMetricCard("PASS", formatInt(gradeCounts.PASS || 0), `${formatPercent((gradeCounts.PASS || 0) / results.length, 1)} of scored cases`)}
        ${makeMetricCard("WARN", formatInt(gradeCounts.WARN || 0), `${formatPercent((gradeCounts.WARN || 0) / results.length, 1)} of scored cases`)}
        ${makeMetricCard("FAIL", formatInt(gradeCounts.FAIL || 0), `${formatPercent((gradeCounts.FAIL || 0) / results.length, 1)} of scored cases`)}
        ${makeMetricCard("Flagged tags", formatInt(Object.keys(failureTagCounts).length), "Distinct failure categories in the published run")}
      </section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Run identity</h2>
          ${makeKvGrid([
            { label: "Provider", value: manifest.provider },
            { label: "Prompt version", value: manifest.prompt_version },
            { label: "Source runs", value: manifest.source_run_ids.join(", ") },
            { label: "Generation mode", value: Object.keys(manifest.generation_modes).join(", ") }
          ])}
          <div class="guardrail">
            Reviewer note: the public result set is one pinned heuristic run with explicit metadata, not a claim about universal model behavior.
          </div>
        </article>

        <article class="panel">
          <h2>Heuristic signal rates</h2>
          <div class="signal-grid">
            ${signalRates
              .map(
                (item) => `
                  <div class="signal-card">
                    <span class="metric-label">${escapeHtml(item.label)}</span>
                    <span class="metric-value">${escapeHtml(item.value)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Mean rubric scores</h2>
          ${makeTable(
            ["Metric", "Mean"],
            [
              ["Faithfulness proxy", escapeHtml(formatDecimal(mean(results, "faithfulness_proxy"), 3))],
              ["Citation validity", escapeHtml(formatDecimal(mean(results, "citation_validity"), 3))],
              ["Required citations", escapeHtml(formatDecimal(mean(results, "required_citations"), 3))],
              ["Uncertainty alignment", escapeHtml(formatDecimal(mean(results, "uncertainty_alignment"), 3))],
              ["Format compliance", escapeHtml(formatDecimal(mean(results, "format_compliance"), 3))]
            ]
          )}
        </article>

        <article class="panel">
          <h2>Notable cases</h2>
          ${makeTable(
            ["Case", "Category", "Grade", "Faithfulness", "Tags"],
            worstCases.map((row) => [
              escapeHtml(row.case_id),
              escapeHtml(slugToTitle(row.category)),
              renderBadge(row.overall_grade),
              escapeHtml(formatDecimal(toNumber(row.faithfulness_proxy) || 0, 3)),
              escapeHtml(row.failure_tags || "None")
            ])
          )}
        </article>
      </section>
    `,
    footerNote:
      "Source files: results/run_manifest.json, results/evaluation_output.csv, results/summary.md. Generated locally for portfolio screenshots."
  });

  const flaggedHtml = buildPageDocument({
    title: "Flagged cases and failure categories",
    eyebrow: "Clinical AI Eval Sandbox",
    lede:
      "Reviewer-facing artifact view built from the local flagged-case exports. The goal is to make edge cases easy to inspect, not to imply clinical validation.",
    pills: [
      { label: "Flagged", value: formatInt(flaggedCases.length) },
      { label: "Top tag", value: Object.keys(failureTagCounts)[0] || "None" },
      { label: "Run", value: manifest.run_id }
    ],
    body: `
      <section class="metric-grid">
        ${makeMetricCard("WARN cases", formatInt(gradeCounts.WARN || 0), "Cases that need reviewer attention")}
        ${makeMetricCard(
          "Unsupported specificity",
          formatInt(failureTagCounts.UNSUPPORTED_SPECIFICITY || 0),
          "Outputs that sounded more specific than the context justified"
        )}
        ${makeMetricCard(
          "Uncertainty misaligned",
          formatInt(failureTagCounts.UNCERTAINTY_MISALIGNED || 0),
          "Outputs that did not express uncertainty appropriately"
        )}
        ${makeMetricCard("Published run size", formatInt(results.length), "Total benchmark cases in the pinned run")}
      </section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Flagged case index</h2>
          ${makeTable(
            ["Case", "Risk", "Expected", "Grade", "Failure tag"],
            flaggedCases.map((row) => {
              const match = results.find((result) => result.case_id === row.case_id) || {};
              return [
                escapeHtml(row.case_id),
                renderBadge(match.risk_level || "info"),
                escapeHtml(match.expected_behavior || "review"),
                renderBadge(row.overall_grade),
                escapeHtml(row.failure_tags)
              ];
            })
          )}
        </article>

        <article class="panel stack">
          ${flaggedCases
            .map(
              (row) => `
                <article class="excerpt-card">
                  <div class="pill-row" style="justify-content:flex-start; margin-bottom:10px;">
                    ${renderBadge(row.overall_grade)}
                    ${renderBadge(row.failure_tags)}
                  </div>
                  <h3>${escapeHtml(row.case_id)}</h3>
                  <span class="excerpt-label">Prompted question</span>
                  <p class="excerpt-text">${escapeHtml(excerptText(row.question, 160))}</p>
                  <span class="excerpt-label">Why it was flagged</span>
                  <p class="excerpt-text">${escapeHtml(row.failure_tags.replace(/_/g, " "))}</p>
                  <span class="excerpt-label">Answer excerpt</span>
                  <p class="excerpt-text">${escapeHtml(excerptText(row.answer_text, 300))}</p>
                </article>
              `
            )
            .join("")}
        </article>
      </section>
    `,
    footerNote:
      "Source files: results/flagged_cases.jsonl and results/evaluation_output.csv. Clinical review remains outside the automated pipeline."
  });

  await writePage("capture_pages/clinical-ai-eval/eval-sandbox-summary.html", summaryHtml);
  await writePage("capture_pages/clinical-ai-eval/eval-sandbox-flagged-cases.html", flaggedHtml);
}

async function generateIcuPages(project) {
  const repoPath = resolveRepoPath(project);
  const counts = await readCsv(path.join(repoPath, "artifacts/reference_run/01_reference_run_counts.csv"));
  const operatingPointRows = await readCsv(path.join(repoPath, "artifacts/reference_run/02_reference_run_operating_point.csv"));
  const alertPolicyRows = await readCsv(path.join(repoPath, "artifacts/reference_run/03_reference_run_alert_policy.csv"));
  const weightRows = await readCsv(path.join(repoPath, "artifacts/reference_run/04_reference_run_weights.csv"));
  const mlEvaluateRows = await readCsv(path.join(repoPath, "artifacts/reference_run/05_reference_run_ml_evaluate.csv"));

  const metricByName = Object.fromEntries(operatingPointRows.map((row) => [row.metric, toNumber(row.value)]));
  const countsByMetric = {};
  for (const row of counts) {
    countsByMetric[`${row.metric_group}:${row.split || "all"}:${row.metric}`] = toNumber(row.value);
  }

  const evalRow = mlEvaluateRows[0] || {};
  const topWeights = weightRows.filter((row) => row.processed_input !== "__INTERCEPT__").slice(0, 6);
  const bestPolicy = [...alertPolicyRows].sort(
    (left, right) => (toNumber(right.precision) || 0) - (toNumber(left.precision) || 0)
  )[0];

  const riskHtml = buildPageDocument({
    title: "Reference run risk panel",
    eyebrow: "ICU Code Blue Early Warning",
    lede:
      "Retrospective case-study artifact rendered from the checked-in reference run. This is about offline operating points and alert policy judgment, not a deployed clinical system.",
    pills: [
      { label: "Held-out hospitals", value: formatInt(countsByMetric["split_hospitals:test:n_hospitals"] || 0) },
      { label: "Test rows", value: formatInt(metricByName.test_rows || 0) },
      { label: "Source", value: "reference_run CSVs" }
    ],
    body: `
      <section class="metric-grid">
        ${makeMetricCard("ROC AUC", formatDecimal(toNumber(evalRow.roc_auc) || 0, 3), "Held-out hospital test split")}
        ${makeMetricCard("Log loss", formatDecimal(toNumber(evalRow.log_loss) || 0, 4), "Reference run BigQuery ML evaluation")}
        ${makeMetricCard("Top 0.5% alerts", formatInt(metricByName.alerts_top_0_5pct || 0), "Alert windows at the checked operating point")}
        ${makeMetricCard("Enrichment", `${formatDecimal(metricByName.enrichment_top_0_5pct || 0, 2)}x`, "Lift over raw test prevalence")}
      </section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Reference operating point</h2>
          ${makeTable(
            ["Metric", "Value", "Context"],
            [
              ["Positive windows", escapeHtml(formatInt(metricByName.positive_windows_top_0_5pct || 0)), "Positive windows captured in the top 0.5% slice"],
              ["Precision", escapeHtml(formatPercent(metricByName.precision_top_0_5pct || 0, 3)), "Window-level precision in the top alert budget"],
              ["Test prevalence", escapeHtml(formatPercent(metricByName.test_prevalence || 0, 3)), "Rare-event base rate on the held-out split"],
              ["Positive test rows", escapeHtml(formatInt(metricByName.test_positive_rows || 0)), "Rows labeled positive in the held-out split"]
            ]
          )}
          <div class="guardrail">
            Reviewer note: results are specific to this retrospective cohort, split design, feature path, and proxy label construction.
          </div>
        </article>

        <article class="panel">
          <h2>Top feature weights</h2>
          <div class="weight-list">
            ${topWeights
              .map(
                (row) => `
                  <div class="weight-row">
                    <span class="weight-name">${escapeHtml(row.processed_input)}</span>
                    <span class="weight-value">${escapeHtml(formatSigned(toNumber(row.weight) || 0, 3))}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </section>
    `,
    footerNote:
      "Source files: artifacts/reference_run/01_reference_run_counts.csv, 02_reference_run_operating_point.csv, 04_reference_run_weights.csv, and 05_reference_run_ml_evaluate.csv."
  });

  const alertHtml = buildPageDocument({
    title: "Alert policy comparison",
    eyebrow: "ICU Code Blue Early Warning",
    lede:
      "Alert-policy view rendered from the checked-in reference run to make workload tradeoffs visible. The point is not just ranking quality; it is whether the alert budget is discussable.",
    pills: [
      { label: "Best precision", value: bestPolicy ? formatPercent(toNumber(bestPolicy.precision) || 0, 3) : "N/A" },
      { label: "Lowest alert ratio", value: bestPolicy ? formatDecimal(toNumber(bestPolicy.alert_ratio_vs_naive) || 0, 3) : "N/A" },
      { label: "Cooldown", value: bestPolicy ? `${bestPolicy.cooldown_hours}h` : "N/A" }
    ],
    body: `
      <section class="metric-grid">
        ${makeMetricCard("Naive alerts", formatInt(toNumber(alertPolicyRows[0]?.alerts) || 0), "Top 0.5% threshold without policy shaping")}
        ${makeMetricCard("First crossing", formatInt(toNumber(alertPolicyRows[1]?.alerts) || 0), "Same cooldown with first-crossing policy")}
        ${makeMetricCard("Debounced alerts", formatInt(toNumber(alertPolicyRows[2]?.alerts) || 0), "Additional debounce to cut repeat alerts")}
        ${makeMetricCard("Held-out positives", formatInt(metricByName.test_positive_rows || 0), "Positive rows in the held-out split")}
      </section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Policy table</h2>
          ${makeTable(
            ["Policy", "Alerts", "Positive windows", "Precision", "Alert ratio vs naive"],
            alertPolicyRows.map((row) => [
              escapeHtml(row.policy.replace(/_/g, " ")),
              escapeHtml(formatInt(toNumber(row.alerts) || 0)),
              escapeHtml(formatInt(toNumber(row.positive_windows) || 0)),
              escapeHtml(formatPercent(toNumber(row.precision) || 0, 3)),
              escapeHtml(formatDecimal(toNumber(row.alert_ratio_vs_naive) || 0, 3))
            ])
          )}
        </article>

        <article class="panel">
          <h2>Why this artifact matters</h2>
          <div class="stack">
            <article class="excerpt-card">
              <h3>Alert budgets stay visible</h3>
              <p class="excerpt-text">
                The reference run reports ${escapeHtml(formatInt(toNumber(alertPolicyRows[0]?.alerts) || 0))} raw alerts at the naive top 0.5% threshold.
                Policy shaping cuts that to ${escapeHtml(formatInt(toNumber(alertPolicyRows[2]?.alerts) || 0))} with the debounced policy.
              </p>
            </article>
            <article class="excerpt-card">
              <h3>Precision is still modest</h3>
              <p class="excerpt-text">
                Even the best checked policy stays in retrospective, low-prevalence territory at ${escapeHtml(
                  bestPolicy ? formatPercent(toNumber(bestPolicy.precision) || 0, 3) : "N/A"
                )}. That boundary belongs in the artifact, not hidden in footnotes.
              </p>
            </article>
            <article class="excerpt-card">
              <h3>Scope boundary</h3>
              <p class="excerpt-text">
                This remains a held-out-hospital ranking study using a chart-derived proxy label. It is useful for reasoning about tradeoffs, not for claiming clinical deployment readiness.
              </p>
            </article>
          </div>
        </article>
      </section>
    `,
    footerNote:
      "Source files: artifacts/reference_run/03_reference_run_alert_policy.csv and companion reference-run exports. No patient-level data are redistributed here."
  });

  await writePage("capture_pages/icu-code-blue/icu-risk-panel.html", riskHtml);
  await writePage("capture_pages/icu-code-blue/icu-alert-policy.html", alertHtml);
}

function collectMissingSourceFiles(project) {
  const repoPath = resolveRepoPath(project);
  if (!fs.existsSync(repoPath)) {
    return [`Missing sibling repo at ${repoPath}`];
  }

  return (project.source.requiredFiles || [])
    .map((relativePath) => path.join(repoPath, relativePath))
    .filter((absolutePath) => !fs.existsSync(absolutePath));
}

async function generateArtifactPages() {
  const skippedProjects = [];

  for (const project of config.projects.filter((entry) => entry.source.kind === "artifact-pages")) {
    const missingFiles = collectMissingSourceFiles(project);

    if (missingFiles.length) {
      skippedProjects.push({ project, missingFiles });
      continue;
    }

    if (project.slug === "clinical-ai-eval-sandbox") {
      await generateClinicalEvalPages(project);
    } else if (project.slug === "icu-code-blue-early-warning") {
      await generateIcuPages(project);
    }
  }

  return skippedProjects;
}

async function waitForHttp(url, timeoutMs = 45000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const healthy = await new Promise((resolve) => {
      const request = http.get(url, (response) => {
        response.resume();
        resolve(response.statusCode >= 200 && response.statusCode < 500);
      });

      request.on("error", () => resolve(false));
      request.setTimeout(2000, () => {
        request.destroy();
        resolve(false);
      });
    });

    if (healthy) {
      return;
    }

    await sleep(750);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function startStreamlit(project) {
  const repoPath = resolveRepoPath(project);
  if (!fs.existsSync(repoPath)) {
    return null;
  }

  const appUrl = `http://127.0.0.1:${project.source.port}`;
  try {
    await waitForHttp(appUrl, 1500);
    return { child: null, appUrl, reused: true };
  } catch (_error) {
    // No healthy local server yet; continue and launch one.
  }

  const args = [
    "run",
    project.source.entry,
    "--server.headless",
    "true",
    "--server.port",
    String(project.source.port)
  ];

  const child = spawn("streamlit", args, {
    cwd: repoPath,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"]
  });

  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForHttp(appUrl);
    return { child, appUrl };
  } catch (error) {
    child.kill("SIGTERM");
    throw new Error(`Prior Authorization Copilot did not start cleanly.\n${stderr || error.message}`);
  }
}

async function stopProcess(handle) {
  if (!handle || !handle.child || handle.child.killed) {
    return;
  }

  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      if (handle.child.stdout) {
        handle.child.stdout.destroy();
      }
      if (handle.child.stderr) {
        handle.child.stderr.destroy();
      }
      handle.child.unref();
      resolve();
    };

    const timer = setTimeout(() => {
      try {
        handle.child.kill("SIGKILL");
      } catch (_error) {
        // Ignore teardown failures and let the workflow continue.
      }
      finish();
    }, 4000);

    handle.child.once("exit", finish);

    try {
      handle.child.kill("SIGTERM");
    } catch (_error) {
      finish();
    }
  });
}

async function createPage(browser, viewportName) {
  const preset = config.viewportPresets[viewportName];
  const context = await browser.newContext({
    viewport: {
      width: preset.width,
      height: preset.height
    },
    deviceScaleFactor: preset.deviceScaleFactor || 1,
    hasTouch: Boolean(preset.hasTouch),
    isMobile: Boolean(preset.isMobile)
  });
  const page = await context.newPage();
  return { context, page, preset };
}

async function capturePage(browser, pagePath, viewportName, outputPath) {
  const { context, page } = await createPage(browser, viewportName);

  try {
    console.log(`Capturing ${path.relative(rootDir, outputPath)} from ${pagePath}`);
    await page.goto(pathToFileURL(resolveFromRoot(pagePath)).href, { waitUntil: "load" });
    await page.waitForTimeout(350);
    await page.screenshot({
      path: outputPath,
      animations: "disabled"
    });
    console.log(`Saved ${path.relative(rootDir, outputPath)}`);
  } finally {
    await context.close();
  }
}

async function capturePriorAuth(browser, project, appUrl) {
  const outputDir = resolveFromRoot(project.outputDir);
  const repoPath = resolveRepoPath(project);
  await ensureDir(outputDir);
  console.log(`Capturing Prior Auth live app from ${appUrl}`);

  const desktop = await createPage(browser, "desktop");

  try {
    await desktop.page.goto(appUrl, { waitUntil: "domcontentloaded" });
    await desktop.page.getByRole("heading", { name: "PA Readiness Copilot" }).waitFor({ timeout: 20000 });
    await desktop.page.waitForTimeout(4500);
    await desktop.page.screenshot({
      path: path.join(outputDir, "prior-auth-main-desktop.png"),
      animations: "disabled"
    });
    console.log("Saved assets/screenshots/prior-auth/prior-auth-main-desktop.png");

    const policyHeading = desktop.page.getByRole("heading", { name: "Policy Monitor (Configured Sources)" });
    const featuredHeading = desktop.page.getByRole("heading", { name: "Featured Showcase Cases" });
    await policyHeading.waitFor({ timeout: 20000 });
    await featuredHeading.waitFor({ timeout: 20000 });

    const policyBox = await policyHeading.boundingBox();
    const featuredBox = await featuredHeading.boundingBox();
    const sidebarBox = await desktop.page.locator('[data-testid="stSidebar"]').boundingBox();

    if (policyBox && featuredBox) {
      const clipX = sidebarBox ? Math.floor(sidebarBox.x + sidebarBox.width + 18) : 24;
      const clipY = Math.max(0, Math.floor(policyBox.y) - 16);
      const clipWidth = Math.floor(desktop.preset.width - clipX - 24);
      const clipHeight = Math.max(240, Math.ceil(featuredBox.y - clipY - 10));

      await desktop.page.screenshot({
        path: path.join(outputDir, "prior-auth-governance-desktop.png"),
        animations: "disabled",
        clip: {
          x: clipX,
          y: clipY,
          width: clipWidth,
          height: clipHeight
        }
      });
      console.log("Saved assets/screenshots/prior-auth/prior-auth-governance-desktop.png");
    }
  } finally {
    await desktop.context.close();
  }

  const mobile = await createPage(browser, "mobile");
  try {
    await mobile.page.goto(appUrl, { waitUntil: "domcontentloaded" });
    await mobile.page.getByRole("heading", { name: "PA Readiness Copilot" }).waitFor({ timeout: 20000 });
    await mobile.page.waitForTimeout(4500);
    await mobile.page.screenshot({
      path: path.join(outputDir, "prior-auth-main-mobile.png"),
      animations: "disabled"
    });
    console.log("Saved assets/screenshots/prior-auth/prior-auth-main-mobile.png");
  } finally {
    await mobile.context.close();
  }

  const repoResultsScreenshot = path.join(repoPath, "docs/images/prior-auth-copilot-demo.png");
  const outputResultsScreenshot = path.join(outputDir, "prior-auth-results-desktop.png");

  if (fs.existsSync(repoResultsScreenshot)) {
    await fsp.copyFile(repoResultsScreenshot, outputResultsScreenshot);
    console.log("Copied assets/screenshots/prior-auth/prior-auth-results-desktop.png from the source repo.");
  } else {
    throw new Error(`Missing reusable Prior Auth results screenshot at ${repoResultsScreenshot}`);
  }
}

async function createManualGuide() {
  const lines = [
    "# Manual Capture Guide",
    "",
    "Use this only if the automated workflow cannot run a source repo or regenerate the artifact pages honestly.",
    "",
    "Expected sibling repos next to this portfolio repo:",
    "",
    "- `../PriorAuthorizationCopilot`",
    "- `../clinical-AI-eval_sandbox`",
    "- `../icu-code-blue-early-warning`",
    "",
    "Required files:",
    ""
  ];

  for (const project of config.projects) {
    lines.push(`## ${project.label}`);
    lines.push("");
    for (const item of project.manualFallback) {
      lines.push(`- Save as \`${item.filename}\``);
      lines.push(`  Viewport: \`${item.viewport}\``);
      lines.push(`  Destination: \`${item.destination}\``);
      lines.push(`  Target: ${item.target}`);
    }
    lines.push("");
  }

  await fsp.writeFile(manualGuidePath, `${lines.join("\n")}\n`);
}

async function main() {
  await ensureDir(resolveFromRoot("assets/screenshots"));
  await createManualGuide();

  for (const project of config.projects) {
    await ensureDir(resolveFromRoot(project.outputDir));
  }

  const skippedArtifactProjects = await generateArtifactPages();
  const launchOptions = {
    headless: true,
    args: ["--disable-features=UseMachPortRendezvousServer"]
  };

  if (fs.existsSync(chromeExecutable)) {
    launchOptions.executablePath = chromeExecutable;
  }

  const browser = await chromium.launch(launchOptions);
  const skippedProjects = [...skippedArtifactProjects];
  let streamlitHandle = null;

  try {
    for (const project of config.projects) {
      if (project.source.kind === "artifact-pages") {
        if (skippedArtifactProjects.find((entry) => entry.project.slug === project.slug)) {
          console.warn(`Skipping ${project.label} because required artifact files are missing.`);
          continue;
        }

        for (const capture of project.captures) {
          await capturePage(
            browser,
            capture.page,
            capture.viewport,
            path.join(resolveFromRoot(project.outputDir), capture.filename)
          );
        }
      }

      if (project.source.kind === "streamlit") {
        const repoPath = resolveRepoPath(project);
        if (!fs.existsSync(repoPath)) {
          skippedProjects.push({
            project,
            missingFiles: [`Missing sibling repo at ${repoPath}`]
          });
          continue;
        }

        streamlitHandle = await startStreamlit(project);
        await capturePriorAuth(browser, project, streamlitHandle.appUrl);
        await stopProcess(streamlitHandle);
        streamlitHandle = null;
      }
    }
  } finally {
    await browser.close();
    await stopProcess(streamlitHandle);
  }

  if (skippedProjects.length) {
    console.warn("Some screenshots were skipped because the local source artifacts were unavailable:");
    for (const skipped of skippedProjects) {
      console.warn(`- ${skipped.project.label}`);
      for (const missing of skipped.missingFiles) {
        console.warn(`  - ${missing}`);
      }
    }
    console.warn(`Manual fallback guide: ${manualGuidePath}`);
  }

  console.log("Screenshot capture workflow finished.");
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
