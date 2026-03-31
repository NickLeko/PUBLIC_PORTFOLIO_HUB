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

  function linkHtml(link, className) {
    if (!link.url) {
      return `<span class="${className} is-disabled">${escapeHtml(link.label)}</span>`;
    }

    const attrs = link.type === "internal" || link.url.startsWith("#") ? "" : ` ${externalAttrs}`;
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
    const primaryLinks = data.site.links.map((link) =>
      linkHtml(
        { label: link.label, url: link.url, type: link.type },
        link.label === "One-pager" ? "button-pill primary" : "button-pill"
      )
    );
    const pillars = hero.pillars
      .map((pillar) => `<span class="hero-pillar">${escapeHtml(pillar)}</span>`)
      .join("");
    const previewItems = data.flagshipProjects
      .map(
        (project, index) => `
          <a class="hero-preview-item" href="#${escapeHtml(project.slug)}">
            <span class="hero-preview-index">0${index + 1}</span>
            <div class="hero-preview-copy">
              <strong>${escapeHtml(project.title)}</strong>
              <p>${escapeHtml(project.heroPreview)}</p>
            </div>
            <span class="hero-preview-status">${escapeHtml(project.status)}</span>
          </a>
        `
      )
      .join("");
    const fitItems = hero.fitItems
      .map((item) => `<span class="hero-fit-pill">${escapeHtml(item)}</span>`)
      .join("");

    document.getElementById("hero").innerHTML = `
      <div class="hero-card hero-main">
        <span class="hero-kicker">${escapeHtml(hero.kicker)}</span>
        <h1 class="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="hero-copy">${escapeHtml(hero.intro)}</p>
        <div class="hero-pillars">${pillars}</div>
        <div class="hero-actions">${primaryLinks.join("")}</div>
        <div class="hero-footnote">${escapeHtml(hero.note)}</div>
      </div>

      <aside class="hero-card hero-preview">
        <p class="eyebrow">${escapeHtml(hero.previewTitle)}</p>
        <div class="hero-preview-list">${previewItems}</div>
        <div class="hero-fit-block">
          <p class="hero-fit-title">${escapeHtml(hero.fitTitle)}</p>
          <div class="hero-fit-list">${fitItems}</div>
        </div>
        <p class="hero-disclaimer">${escapeHtml(hero.disclaimer)}</p>
      </aside>
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

        return `
          <article class="flagship-card" id="${escapeHtml(project.slug)}">
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

              <aside class="flagship-callout">
                <span class="flagship-callout-label">Best signal for</span>
                <p>${escapeHtml(project.bestFor)}</p>
              </aside>
            </div>

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
                <div class="compact-top">
                  <div>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p class="compact-summary">${escapeHtml(item.summary)}</p>
                  </div>
                  <div class="support-meta">
                    <span class="status-pill accent">${escapeHtml(item.status)}</span>
                    <span class="status-pill">${escapeHtml(item.visibility)}</span>
                  </div>
                </div>
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
            <div class="compact-top">
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="compact-summary">${escapeHtml(item.summary)}</p>
              </div>
              <div class="support-meta">
                <span class="status-pill accent">${escapeHtml(item.status)}</span>
                <span class="status-pill">${escapeHtml(item.visibility)}</span>
              </div>
            </div>
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
    const paragraphs = about.paragraphs
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    const highlights = about.highlights
      .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
      .join("");
    const contactLinks = data.site.links
      .map(
        (link) => `
          <a class="contact-link" href="${escapeHtml(link.url)}" ${
            link.type === "internal" ? "" : externalAttrs
          }>
            <strong>${escapeHtml(link.label)}</strong>
            <span>${escapeHtml(link.type === "internal" ? "portfolio artifact" : link.url.replace(/^mailto:/, ""))}</span>
          </a>
        `
      )
      .join("");

    document.getElementById("about").innerHTML = `
      <div class="section-header">
        <div>
          <p class="eyebrow">${escapeHtml(about.eyebrow)}</p>
          <h2 class="section-heading">${escapeHtml(about.heading)}</h2>
          <p class="section-copy">${escapeHtml(data.site.disclaimer)}</p>
        </div>
      </div>

      <div class="about-layout">
        <article class="about-card">
          <div class="about-stack">
            ${paragraphs}
            <section class="story-block">
              <h3>What this portfolio is strongest at</h3>
              <ul class="bullet-list">${highlights}</ul>
            </section>
          </div>
        </article>

        <aside class="contact-card">
          <h2>Links</h2>
          <p>Use the one-pager for a recruiter or referral-friendly summary, then jump into GitHub or contact directly.</p>
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
