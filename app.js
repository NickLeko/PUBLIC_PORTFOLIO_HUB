(function renderPortfolioSite() {
  const data = window.PORTFOLIO_DATA;
  if (!data) throw new Error("Portfolio data failed to load.");

  const ext = 'target="_blank" rel="noreferrer"';

  function esc(v) {
    return String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function siteLink(label) {
    return data.site.links.find((l) => l.label === label);
  }

  function linkHtml(link, cls) {
    if (!link.url) return `<span class="${cls} is-disabled">${esc(link.label)}</span>`;
    const isInternal = link.type === "internal" || link.url.startsWith("#") || link.url.startsWith("mailto:");
    return `<a class="${cls}" href="${esc(link.url)}"${isInternal ? "" : ` ${ext}`}>${esc(link.label)}</a>`;
  }

  function linkRowHtml(links, emptyText) {
    if (!links.length) return `<div class="link-row"><span class="link-pill is-disabled">${esc(emptyText)}</span></div>`;
    return `<div class="link-row">${links.map((l) => linkHtml({ ...l, type: "external" }, "link-pill")).join("")}</div>`;
  }

  /* ── Nav ── */
  function renderNav() {
    document.getElementById("site-nav").innerHTML = data.navigation
      .map((item) => {
        const isInternal = item.href.startsWith("#") || item.href.endsWith(".html");
        return `<a href="${esc(item.href)}"${isInternal ? "" : ` ${ext}`}>${esc(item.label)}</a>`;
      })
      .join("");
  }

  /* ── Hero ── */
  function renderHero() {
    const h = data.hero;
    const projects = data.flagshipProjects
      .map((p, i) => `
        <a class="hero-project-item" href="#${esc(p.slug)}">
          <span class="hero-project-num">0${i + 1}</span>
          <div class="hero-project-body">
            <div class="hero-project-title">${esc(p.title)}</div>
            <div class="hero-project-desc">${esc(p.summary)}</div>
            <span class="hero-project-status">${esc(p.status)}</span>
          </div>
        </a>`)
      .join("");

    const onePager = siteLink("One-pager");
    const email = siteLink("Email");

    document.getElementById("hero").innerHTML = `
      <div class="hero-grid">
        <div class="hero-left">
          <div class="hero-kicker">${esc(h.kicker)}</div>
          <h1 class="hero-title">${esc(h.title)}</h1>
          <p class="hero-sub">${esc(h.intro)}</p>
          <div class="hero-actions">
            ${onePager ? `<a class="btn btn-primary" href="${esc(onePager.url)}">View one-pager</a>` : ""}
            <a class="btn btn-secondary" href="#flagship">See flagship work</a>
            ${email ? `<a class="btn btn-ghost" href="${esc(email.url)}">Contact</a>` : ""}
          </div>
          <p class="hero-note">${esc(h.note)}</p>
        </div>
        <div class="hero-right">
          <div class="hero-projects-label">Flagship projects</div>
          <div class="hero-projects">${projects}</div>
        </div>
      </div>`;
  }

  /* ── Credibility signals strip ── */
  function renderSignals() {
    const signals = [
      "Healthcare-native",
      "Governance-first",
      "Eval-aware",
      "Workflow-focused",
      "Scope-bounded"
    ];
    const items = signals
      .map((s) => `<div class="signal-item"><span class="signal-dot"></span><span class="signal-label">${esc(s)}</span></div>`)
      .join("");
    document.getElementById("signals").innerHTML = `<div class="signals-inner">${items}</div>`;
  }

  /* ── Recruiter CTA band ── */
  function renderCta() {
    const cta = data.ctaBanner;
    const onePager = siteLink("One-pager");
    const github = siteLink("GitHub");
    const linkedin = siteLink("LinkedIn");

    document.getElementById("recruiter-cta").innerHTML = `
      <div class="cta-band-card">
        <div class="cta-band-copy">
          <div class="cta-band-eyebrow">${esc(cta.eyebrow)}</div>
          <h2 class="cta-band-title">${esc(cta.heading)}</h2>
          <p class="cta-band-body">${esc(cta.body)}</p>
          <p class="cta-band-note">${esc(cta.note)}</p>
        </div>
        <div class="cta-band-actions">
          ${onePager ? `<a class="btn btn-primary" href="${esc(onePager.url)}">Open one-pager →</a>` : ""}
          ${github ? `<a class="btn btn-ghost" href="${esc(github.url)}" ${ext}>${esc(github.label)}</a>` : ""}
          ${linkedin ? `<a class="btn btn-ghost" href="${esc(linkedin.url)}" ${ext}>${esc(linkedin.label)}</a>` : ""}
        </div>
      </div>`;
  }

  /* ── Flagship projects ── */
  function renderFlagships() {
    const intro = data.flagshipIntro;

    const cards = data.flagshipProjects.map((p, i) => {
      const evidence = (p.evidenceBullets || p.proofPoints.slice(0, 3))
        .map((e) => `<li>${esc(e)}</li>`).join("");
      const tags = p.tags.map((t) => `<span class="tag-pill">${esc(t)}</span>`).join("");
      const proofPoints = p.proofPoints.map((pt) => `<li>${esc(pt)}</li>`).join("");
      const limitations = p.limitations.map((l) => `<li>${esc(l)}</li>`).join("");
      const primaryShot = p.screenshots[0];
      const screenshots = p.screenshots.map((s) => `
        <div class="screenshot-card">
          <a class="screenshot-frame" href="${esc(s.src)}" ${ext}>
            <img src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy">
          </a>
          <div class="screenshot-meta">
            <div class="screenshot-title">${esc(s.title)}</div>
            <div class="screenshot-note">${esc(s.note)}</div>
          </div>
        </div>`).join("");

      return `
        <article class="flagship-card" id="${esc(p.slug)}">
          <div class="flagship-card-top">
            <div class="flagship-main">
              <div class="flagship-header-row">
                <div class="flagship-num">0${i + 1}</div>
                <div class="flagship-title-block">
                  <div class="flagship-badges">
                    <span class="badge badge-accent">${esc(p.status)}</span>
                    <span class="badge">${esc(p.artifactType)}</span>
                    <span class="badge badge-warm">${esc(p.scopeLabel)}</span>
                  </div>
                  <h3 class="flagship-title">${esc(p.title)}</h3>
                  <p class="flagship-value-prop">${esc(p.summary)}</p>
                </div>
              </div>

              <div class="flagship-info-grid">
                <div class="flagship-info-block">
                  <span class="info-label">Artifact focus</span>
                  <p class="info-body">${esc(p.primaryProof)}</p>
                </div>
                <div class="flagship-info-block">
                  <span class="info-label">Why it matters</span>
                  <p class="info-body">${esc(p.whyItMatters)}</p>
                </div>
              </div>

              <div class="flagship-evidence-block">
                <span class="info-label">Evidence to review</span>
                <ul class="evidence-list">${evidence}</ul>
              </div>

              <div class="flagship-footer-row">
                <div class="tag-row">${tags}</div>
                ${linkRowHtml(p.links, "No public links")}
              </div>
            </div>

            ${primaryShot ? `
              <aside class="flagship-media">
                <a class="flagship-thumb" href="${esc(primaryShot.src)}" ${ext}>
                  <img src="${esc(primaryShot.src)}" alt="${esc(primaryShot.alt)}" loading="lazy">
                </a>
                <p class="flagship-thumb-caption">${esc(primaryShot.title)}</p>
              </aside>` : ""}
          </div>

          <details class="flagship-details">
            <summary class="flagship-summary-bar">
              <span class="summary-bar-label">Case study details — problem, what I built, proof points, scope boundaries</span>
              <span class="summary-bar-toggle">
                <span class="toggle-closed">Expand ↓</span>
                <span class="toggle-open">Collapse ↑</span>
              </span>
            </summary>
            <div class="flagship-detail-panel">
              <div class="detail-3col">
                <div class="detail-block">
                  <h4>Problem</h4>
                  <p>${esc(p.problemStatement)}</p>
                </div>
                <div class="detail-block">
                  <h4>What I built</h4>
                  <p>${esc(p.whatIBuilt)}</p>
                </div>
                <div class="detail-block">
                  <h4>Why it matters</h4>
                  <p>${esc(p.whyItMatters)}</p>
                </div>
              </div>
              <div class="detail-2col">
                <div class="detail-block">
                  <h4>Credibility signals</h4>
                  <ul class="bullet-list">${proofPoints}</ul>
                </div>
                <div class="detail-block">
                  <h4>Scope boundaries</h4>
                  <ul class="bullet-list">${limitations}</ul>
                  <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border);">
                    <span class="info-label" style="display:block;margin-bottom:8px;">Repo &amp; docs</span>
                    ${linkRowHtml(p.links, "No public links")}
                  </div>
                </div>
              </div>
              <div class="screenshot-grid">${screenshots}</div>
            </div>
          </details>
        </article>`;
    }).join("");

    document.getElementById("flagship").innerHTML = `
      <div class="section-header">
        <div>
          <div class="eyebrow">${esc(intro.eyebrow)}</div>
          <h2 class="section-title">${esc(intro.heading)}</h2>
          <p class="section-body">${esc(intro.body)}</p>
        </div>
      </div>
      <div class="flagship-list">${cards}</div>`;
  }

  /* ── Secondary projects ── */
  function renderSecondary() {
    const intro = data.secondaryIntro;
    const groups = data.secondaryGroups.map((group) => {
      const items = group.items.map((item) => `
        <div class="secondary-card">
          <div class="secondary-top">
            <div>
              <div class="secondary-title">${esc(item.title)}</div>
              <div class="secondary-desc">${esc(item.descriptor)}</div>
            </div>
            <div class="badge-row">
              <span class="badge">${esc(item.kind)}</span>
              <span class="badge">${esc(item.visibility)}</span>
            </div>
          </div>
          ${linkRowHtml(item.links, item.visibility === "Private/local" ? "Private/local" : "No public link")}
        </div>`).join("");

      if (group.collapsed) {
        return `
          <details class="secondary-group-collapsed">
            <summary class="collapse-summary">
              <div class="collapse-heading">
                <h3>${esc(group.title)}</h3>
                ${group.note ? `<p>${esc(group.note)}</p>` : ""}
              </div>
              <span class="collapse-toggle-btn">
                <span class="c-closed">Show</span>
                <span class="c-open">Hide</span>
              </span>
            </summary>
            <div class="secondary-grid">${items}</div>
          </details>`;
      }

      return `
        <div class="secondary-group">
          <div class="group-title">${esc(group.title)}</div>
          ${group.note ? `<div class="group-note">${esc(group.note)}</div>` : ""}
          <div class="secondary-grid">${items}</div>
        </div>`;
    }).join("");

    document.getElementById("secondary").innerHTML = `
      <div class="secondary-section-wrap">
        <div class="secondary-header">
          <div class="eyebrow">${esc(intro.eyebrow)}</div>
          <h2 class="section-title" style="font-size:clamp(1.5rem,2.4vw,2rem)">${esc(intro.heading)}</h2>
          <p class="section-body">${esc(intro.body)}</p>
        </div>
        <div class="secondary-section-stack">${groups}</div>
      </div>`;
  }

  /* ── Contact / About ── */
  function renderContact() {
    const about = data.about;
    const highlights = about.highlights
      .map((h) => `<span class="highlight-pill">${esc(h)}</span>`).join("");
    const contactLinks = data.site.links.map((link) => {
      const isInternal = link.type === "internal" || link.url.startsWith("mailto:");
      return `
        <a class="contact-link" href="${esc(link.url)}"${isInternal ? "" : ` ${ext}`}>
          <strong>${esc(link.label)}</strong>
          <span>${esc(link.displayValue || (link.type === "internal" ? "portfolio artifact" : link.url))}</span>
        </a>`;
    }).join("");

    document.getElementById("contact").innerHTML = `
      <div class="about-layout">
        <article class="about-card">
          <div class="eyebrow">${esc(about.eyebrow)}</div>
          <h2 class="section-title">${esc(about.heading)}</h2>
          <p style="margin-top:14px">${esc(about.paragraphs[0])}</p>
          <p class="about-note">${esc(about.paragraphs[1])}</p>
          <div class="highlight-pills">${highlights}</div>
        </article>
        <aside class="contact-card">
          <h3>Quick links</h3>
          <p>One-pager, GitHub, LinkedIn, and direct contact.</p>
          <div class="contact-list">${contactLinks}</div>
        </aside>
      </div>`;
  }

  /* ── Footer ── */
  function renderFooter() {
    const links = data.site.links.map((l) => linkHtml(l, "link-pill")).join("");
    document.getElementById("site-footer").innerHTML = `
      <div class="footer-inner">
        <p class="footer-note">${esc(data.onePager.footerNote)}</p>
        <div class="footer-links">${links}</div>
      </div>`;
  }

  /* ── Init ── */
  document.title = `${data.site.owner} | Healthcare AI Portfolio`;
  renderNav();
  renderHero();
  renderSignals();
  renderCta();
  renderFlagships();
  renderSecondary();
  renderContact();
  renderFooter();
})();
