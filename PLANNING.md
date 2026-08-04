/* Duksung Counseling Center "Delight" website — experimental MVP prototype */

:root {
  --color-bg: #fbfaf7;
  --color-surface: #ffffff;
  --color-primary: #6b7fd7;
  --color-primary-dark: #4c5bb8;
  --color-accent: #f2a65a;
  --color-crisis: #d9534f;
  --color-text: #2c2c34;
  --color-text-muted: #6b6b76;
  --color-border: #e7e4dd;
  --radius: 14px;
  --max-width: 960px;
  font-size: 16px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", -apple-system, sans-serif;
  line-height: 1.6;
}

a { color: var(--color-primary-dark); text-decoration: none; }
a:hover { text-decoration: underline; }

img { max-width: 100%; display: block; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.topbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.logo {
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--color-primary-dark);
}
.logo:hover { text-decoration: none; }

.quicklinks {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.quicklinks a { color: var(--color-text-muted); }

.quicklinks .crisis {
  color: #fff;
  background: var(--color-crisis);
  padding: 5px 10px;
  border-radius: 999px;
  font-weight: 700;
}
.quicklinks .crisis:hover { text-decoration: none; opacity: 0.9; }

.maintabs {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  border-top: 1px solid var(--color-border);
}

.maintabs a {
  padding: 12px 14px;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--color-text);
  white-space: nowrap;
  border-bottom: 3px solid transparent;
}

.maintabs a:hover, .maintabs a.active {
  color: var(--color-primary-dark);
  border-bottom-color: var(--color-primary);
  text-decoration: none;
}

/* Hero */
.hero {
  padding: 48px 20px 32px;
  text-align: center;
}

.hero h1 {
  font-size: 1.8rem;
  margin: 0 0 10px;
}

.hero p {
  color: var(--color-text-muted);
  max-width: 560px;
  margin: 0 auto;
}

.badge-experimental {
  display: inline-block;
  margin-bottom: 14px;
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff2e2;
  color: #a3641b;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Cards / grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 8px 0 40px;
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 20px;
  transition: box-shadow 0.15s, transform 0.15s;
}

.card:hover {
  box-shadow: 0 6px 18px rgba(76, 91, 184, 0.12);
  transform: translateY(-2px);
}

.card h3 { margin: 4px 0 6px; font-size: 1.05rem; }
.card p { margin: 0; color: var(--color-text-muted); font-size: 0.9rem; }
.card .icon { font-size: 1.6rem; }

/* Section */
section.page {
  padding: 32px 20px 60px;
}

section.page h1 {
  font-size: 1.5rem;
  margin-bottom: 6px;
}

section.page .lede {
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.subnav a {
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--color-text);
  background: var(--color-surface);
}
.subnav a:hover { border-color: var(--color-primary); text-decoration: none; }

/* FAQ */
details.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 14px 16px;
}

details.faq-item summary {
  cursor: pointer;
  font-weight: 700;
  list-style: none;
}
details.faq-item summary::-webkit-details-marker { display: none; }
details.faq-item summary::before {
  content: "Q. ";
  color: var(--color-primary-dark);
}

details.faq-item .answer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.answer .source {
  display: block;
  margin-top: 6px;
  font-size: 0.78rem;
  color: #a3641b;
}

/* Ladder / apply flow */
.ladder {
  display: grid;
  gap: 10px;
  margin: 20px 0;
}

.ladder button.ladder-option {
  text-align: left;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  color: var(--color-text);
}

.ladder button.ladder-option:hover {
  border-color: var(--color-primary);
  background: #f5f6fd;
}

.ladder button.ladder-option.crisis {
  border-color: var(--color-crisis);
  background: #fdf2f1;
  font-weight: 700;
}

.ladder-result {
  display: none;
  margin-top: 18px;
  padding: 18px;
  border-radius: var(--radius);
  background: #f5f6fd;
  border: 1px solid var(--color-primary);
}

.ladder-result.show { display: block; }

.ladder-result h4 { margin: 0 0 6px; }

.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 9px 16px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.88rem;
}
.btn:hover { background: var(--color-primary-dark); text-decoration: none; }

.btn.secondary {
  background: transparent;
  color: var(--color-primary-dark);
  border: 1px solid var(--color-primary);
}
.btn.secondary:hover { background: #f5f6fd; }

/* Table */
table.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 0.9rem;
}
table.info-table th, table.info-table td {
  border: 1px solid var(--color-border);
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}
table.info-table th {
  background: #f5f4f0;
  font-weight: 700;
}

/* Steps */
ol.steps {
  padding-left: 0;
  list-style: none;
  counter-reset: step;
  display: grid;
  gap: 14px;
}
ol.steps li {
  counter-increment: step;
  position: relative;
  padding: 16px 16px 16px 52px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}
ol.steps li::before {
  content: counter(step);
  position: absolute;
  left: 14px;
  top: 14px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
ol.steps li h4 { margin: 0 0 4px; }
ol.steps li p { margin: 0; color: var(--color-text-muted); font-size: 0.9rem; }

/* Reviews */
.review-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.review-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.review-filters button {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-family: inherit;
  font-size: 0.83rem;
  cursor: pointer;
}
.review-filters button.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.review-counter {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.review-counter strong { color: var(--color-primary-dark); }

.review-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 18px;
  margin-bottom: 12px;
}
.review-card .meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}
.review-card .tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  background: #f0f1fb;
  color: var(--color-primary-dark);
  font-weight: 700;
}
.review-card p { margin: 0; }

.notice-box {
  background: #fff8ec;
  border: 1px solid #f0d9a8;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 0.85rem;
  color: #7a5416;
  margin-bottom: 20px;
}

/* Footer */
footer.site-footer {
  border-top: 1px solid var(--color-border);
  padding: 24px 20px 40px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

/* Note box */
.note {
  background: #f5f6fd;
  border-left: 3px solid var(--color-primary);
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin: 16px 0;
}

@media (max-width: 560px) {
  .hero h1 { font-size: 1.4rem; }
  .quicklinks { font-size: 0.78rem; }
}
