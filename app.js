(function renderPortfolioSite() {
  const data = window.PORTFOLIO_DATA;

  if (!data) {
    throw new Error("Portfolio data failed to load.");
  }

  const externalAttrs = 'target="_blank" rel="noreferrer"';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSiteLink(label) {
    return data.site.links.find((link) => link.label === label);
  }

  function linkHtml(link, className) {
    if (!link.url) {
      return `<span class="${className} is-disabled">${escapeHtml(link.label)}</span>`;
    }

    const isMailto = link.url.startsWith("mailto:");
    const attrs =
      link.type === "internal" || link.url.startsWith("#") || isMailto ? "" : ` ${externalAttrs}`;
    return `<a class="${className}" href="${escapeHtml(link.url)}"${attrs}>${escapeHtml(link.label)}</a>`;
  }

  function renderSectionHeader(section, sidebarText) {
    return `
      <div class="section-header">
        <div>
          <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
          <h2 class="section-heading">${escapeHtml(section.heading)}</h2>
          <p class="section-copy">${escapeHtml(section.body)}</p>
        </div>
        ${
          sidebarText
            ? `<aside class="section-sidebar"><p>${escapeHtml(sidebarText)}</p></aside>`
            : ""
        }
      </div>
    `;
  }

  function renderCompactLinks(links, emptyText) {
    if (!links.length) {
      return `<div class="link-row"><span class="link-pill is-disabled">${escapeHtml(emptyText)}</span></div>`;
    }

    return `<div class="link-row">${links
      .map((link) => linkHtml({ ...link, type: "external" }, "link-pill"))
      .join("")}</div>`;
  }

  function renderHero() {
    const hero = data.hero;
    const heroActions = [
      { label: "View Projects", url: "#flagship", type: "internal", className: "button-pill primary" },
      getSiteLink("One-pager") && { ...getSiteLink("One-pager"), className: "button-pill" },
      getSiteLink("Email") && { label: "Contact", ...getSiteLink("Email"), className: "button-pill" },
      getSiteLink("GitHub") && { ...getSiteLink("GitHub"), className: "button-pill" }
    ]
      .filter(Boolean)
      .map((link) => linkHtml(link, link.className));
    const pillars = hero.pillars
      .map((pillar) => `<span class="hero-pillar">${escapeHtml(pillar)}</span>`)
      .join("");
    document.getElementById("hero").innerHTML = `
      <div class="hero-card hero-main">
        <span class="hero-kicker">${escapeHtml(hero.kicker)}</span>
        <h1 class="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="hero-copy">${escapeHtml(hero.intro)}</p>
        <div class="hero-pillars">${pillars}</div>
        <div class="hero-actions">${heroActions.join("")}</div>
        <div class="hero-footnote">${escapeHtml(hero.note)}</div>
      </div>
    `;
  }

  function renderFlagships() {
    const section = data.flagshipIntro;
    const cards = data.flagshipProjects
      .map((project, index) => {
        const tags = project.tags
          .map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`)
          .join("");
        const proofPoints = project.proofPoints
          .map((point) => `<li>${escapeHtml(point)}</li>`)
          .join("");
        const limitations = project.limitations
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("");
        const screenshots = project.screenshots
          .map(
            (shot) => `
              <article class="screenshot-card ${shot.placeholder ? "is-placeholder" : ""}">
                <a class="screenshot-frame" href="${escapeHtml(shot.src)}" ${externalAttrs}>
                  ${shot.placeholder ? '<span class="placeholder-badge">Placeholder</span>' : ""}
                  <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}">
                </a>
                <div class="screenshot-meta">
                  <span class="screenshot-title">${escapeHtml(shot.title)}</span>
                  <span class="screenshot-note">${escapeHtml(shot.note)}</span>
                </div>
              </article>
            `
          )
          .join("");
        const primaryShot = project.screenshots[0];
        const credibilityCue = project.proofPoints[0];

        return `
          <article class="flagship-card" id="${escapeHtml(project.slug)}">
            <div class="flagship-preview-grid">
              <div class="flagship-preview-main">
                <div class="flagship-header">
                  <div class="flagship-index">0${index + 1}</div>

                  <div class="flagship-title-group">
                    <div class="status-row">
                      <span class="status-pill accent">${escapeHtml(project.status)}</span>
                      <span class="status-pill">${escapeHtml(project.artifactType)}</span>
                      <span class="status-pill warm">${escapeHtml(project.scopeLabel)}</span>
                    </div>
                    <h3 class="flagship-title">${escapeHtml(project.title)}</h3>
                    <p class="flagship-summary">${escapeHtml(project.summary)}</p>
                    <div class="tag-row">${tags}</div>
                  </div>
                </div>

                <div class="flagship-signal-row">
                  <div class="flagship-signal">
                    <span class="flagship-callout-label">Credibility cue</span>
                    <p>${escapeHtml(credibilityCue)}</p>
                  </div>
                  <div class="flagship-callout flagship-best-for">
                    <span class="flagship-callout-label">Best signal for</span>
                    <p>${escapeHtml(project.bestFor)}</p>
                  </div>
                </div>
              </div>

              ${
                primaryShot
                  ? `
                    <aside class="flagship-preview-media">
                      <a class="flagship-thumbnail" href="${escapeHtml(primaryShot.src)}" ${externalAttrs}>
                        <img src="${escapeHtml(primaryShot.src)}" alt="${escapeHtml(primaryShot.alt)}">
                      </a>
                      <p class="flagship-thumbnail-note">${escapeHtml(primaryShot.title)}</p>
                    </aside>
                  `
                  : ""
              }
            </div>

            <details class="flagship-details">
              <summary class="flagship-toggle">
                <span class="toggle-label toggle-closed">View case study</span>
                <span class="toggle-label toggle-open">Hide case study</span>
              </summary>

              <div class="flagship-detail-panel">
                <div class="flagship-core-grid">
                  <section class="story-block">
                    <h3>Problem</h3>
                    <p>${escapeHtml(project.problemStatement)}</p>
                  </section>
                  <section class="story-block">
                    <h3>What I built</h3>
                    <p>${escapeHtml(project.whatIBuilt)}</p>
                  </section>
                  <section class="story-block">
                    <h3>Why it matters</h3>
                    <p>${escapeHtml(project.whyItMatters)}</p>
                  </section>
                </div>

                <div class="flagship-detail-grid">
                  <section class="detail-card">
                    <h3>Why it feels credible</h3>
                    <ul class="bullet-list">${proofPoints}</ul>
                  </section>

                  <section class="detail-card">
                    <h3>Scope boundaries</h3>
                    <ul class="bullet-list">${limitations}</ul>
                    <div class="detail-links">
                      <span class="detail-links-label">Repo and docs</span>
                      ${renderCompactLinks(project.links, "No public links")}
                    </div>
                  </section>
                </div>

                <div class="screenshot-grid">${screenshots}</div>
              </div>
            </details>
          </article>
        `;
      })
      .join("");

    document.getElementById("flagship").innerHTML =
      renderSectionHeader(section, section.sidebar) + `<div class="flagship-list">${cards}</div>`;
  }

  function renderSupporting() {
    const section = data.supportingIntro;
    const groups = data.supportingGroups
      .map((group) => {
        const items = group.items
          .map(
            (item) => `
              <article class="compact-card">
                <div class="compact-top compact-top-inline">
                  <h3>${escapeHtml(item.title)}</h3>
                  <div class="support-meta">
                    <span class="status-pill accent">${escapeHtml(item.status)}</span>
                    <span class="status-pill">${escapeHtml(item.visibility)}</span>
                  </div>
                </div>
                <p class="compact-summary">${escapeHtml(item.summary)}</p>
                <p class="compact-note">${escapeHtml(item.whyIncluded)}</p>
                ${renderCompactLinks(item.links, "Private/local only")}
              </article>
            `
          )
          .join("");

        return `
          <section class="compact-group">
            <div class="group-heading">
              <h3>${escapeHtml(group.title)}</h3>
              <p>${escapeHtml(group.note)}</p>
            </div>
            <div class="compact-grid">${items}</div>
          </section>
        `;
      })
      .join("");

    document.getElementById("supporting").innerHTML =
      renderSectionHeader(section) + `<div class="compact-section-stack">${groups}</div>`;
  }

  function renderAutomations() {
    const section = data.automationIntro;
    const cards = data.automations
      .map(
        (item) => `
          <article class="compact-card compact-card-accent">
            <div class="compact-top compact-top-inline">
              <h3>${escapeHtml(item.title)}</h3>
              <div class="support-meta">
                <span class="status-pill accent">${escapeHtml(item.status)}</span>
                <span class="status-pill">${escapeHtml(item.visibility)}</span>
              </div>
            </div>
            <p class="compact-summary">${escapeHtml(item.summary)}</p>
            <p class="compact-note">${escapeHtml(item.whyIncluded)}</p>
            ${renderCompactLinks(item.links, "Private/local workflow")}
          </article>
        `
      )
      .join("");

    document.getElementById("automations").innerHTML =
      renderSectionHeader(section) + `<div class="compact-grid">${cards}</div>`;
  }

  function renderBuildPrinciples() {
    const section = data.buildIntro;
    const cards = data.buildPrinciples
      .map(
        (item) => `
          <article class="principle-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
      )
      .join("");

    document.getElementById("how-i-build").innerHTML =
      renderSectionHeader(section) + `<div class="principles-grid">${cards}</div>`;
  }

  function renderAbout() {
    const about = data.about;
    const highlights = about.highlights
      .map((highlight) => `<span class="hero-fit-pill">${escapeHtml(highlight)}</span>`)
      .join("");
    const contactLinks = data.site.links
      .map(
        (link) => `
          <a class="contact-link" href="${escapeHtml(link.url)}" ${
            link.type === "internal" || link.url.startsWith("mailto:") ? "" : externalAttrs
          }>
            <strong>${escapeHtml(link.label)}</strong>
            <span>${escapeHtml(link.displayValue || (link.type === "internal" ? "portfolio artifact" : link.url))}</span>
          </a>
        `
      )
      .join("");

    document.getElementById("about").innerHTML = `
      <div class="about-layout about-layout-compact">
        <article class="about-card">
          <p class="eyebrow">${escapeHtml(about.eyebrow)}</p>
          <h2 class="section-heading">${escapeHtml(about.heading)}</h2>
          <p class="section-copy">${escapeHtml(about.paragraphs[0])}</p>
          <p class="about-note">${escapeHtml(about.paragraphs[1])}</p>
          <div class="hero-fit-list">${highlights}</div>
        </article>

        <aside class="contact-card">
          <h2>Next steps</h2>
          <p>Use the one-pager for recruiter or referral-friendly sharing, then jump into GitHub, LinkedIn, or direct contact.</p>
          <div class="contact-list">${contactLinks}</div>
        </aside>
      </div>
    `;
  }

  function renderFooter() {
    const footerLinks = data.site.links
      .map((link) => linkHtml(link, "link-pill"))
      .join("");

    document.getElementById("site-footer").innerHTML = `
      <div class="footer-card">
        <p>${escapeHtml(data.onePager.footerNote)}</p>
        <div class="footer-links">${footerLinks}</div>
      </div>
    `;
  }

  function renderNav() {
    const nav = data.navigation
      .map((item) => {
        const isInternalPage = item.href.startsWith("#") || item.href.endsWith(".html");
        const attrs = item.href.startsWith("#") || isInternalPage ? "" : ` ${externalAttrs}`;
        return `<a href="${escapeHtml(item.href)}"${attrs}>${escapeHtml(item.label)}</a>`;
      })
      .join("");

    document.getElementById("site-nav").innerHTML = nav;
  }

  document.title = `${data.site.owner} | Healthcare AI Portfolio`;
  renderNav();
  renderHero();
  renderFlagships();
  renderSupporting();
  renderAutomations();
  renderBuildPrinciples();
  renderAbout();
  renderFooter();
})();
