const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const newsDir = path.join(root, "_posts/Resume/etc/경제신문스크랩");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/AI_NEWS_MANIFEST.json"), "utf8"));
const legacy = JSON.parse(fs.readFileSync(path.join(root, "_docs/LEGACY_NEWS_MANIFEST.json"), "utf8"));

test("the AI collection meets the requested count, period and source uniqueness", () => {
  const articles = manifest.articles;
  assert.ok(articles.length >= 100 && articles.length < 1000);
  const normalize = (url) => {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.href.replace(/\/$/, "");
  };
  assert.equal(new Set(articles.map((a) => normalize(a.source_url))).size, articles.length);
  assert.equal(new Set(articles.map((a) => a.filename)).size, articles.length);
  assert.equal(new Set(articles.map((a) => a.title)).size, articles.length);
  assert.equal(new Set(articles.map((a) => a.summary.join(" "))).size, articles.length);
  for (const article of articles) {
    assert.match(article.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(article.date >= manifest.period_start && article.date <= manifest.period_end, article.filename);
    assert.equal(article.filename.slice(0, 10), article.date);
    assert.equal(article.source_published_at.slice(0, 10), article.date);
    assert.ok(article.source_name && article.source_title && article.source_type);
    assert.equal(new URL(article.source_url).protocol, "https:");
  }
});

test("every new AI article is discoverable and rendered with source and analysis sections", () => {
  const home = new JSDOM(fs.readFileSync(path.join(site, "index.html"), "utf8"));
  try {
    const links = [...home.window.document.querySelectorAll(".board-list a")];
    for (const article of manifest.articles) {
      const title = "[경제신문스크랩][AI] " + article.title;
      const link = links.find((a) => a.querySelector("span")?.textContent.trim() === title);
      assert.ok(link, article.filename + ": visible in the board");
      const url = new URL(link.getAttribute("href"), "http://localhost:4000");
      const output = path.join(site, decodeURIComponent(url.pathname), "index.html");
      assert.ok(fs.existsSync(output), article.filename + ": published");
      const dom = new JSDOM(fs.readFileSync(output, "utf8"));
      try {
        const content = dom.window.document.querySelector(".article-content");
        assert.ok(content, article.filename);
        assert.ok(content.textContent.trim().length > 350, article.filename + ": substantive body");
        const headings = [...content.querySelectorAll("h2")].map((h) => h.textContent);
        assert.deepEqual(headings, ["핵심 내용", "무엇이 달라졌나", "앞으로의 관전 포인트 · 해석", "사회적 쟁점과 한계 · 해석"], article.filename);
        assert.ok([...content.querySelectorAll("a")].some((a) => a.getAttribute("href") === article.source_url), article.filename + ": primary source link");
        assert.ok(content.textContent.includes(article.date), article.filename + ": publication date");
        assert.equal(content.querySelector(".empty-article, script, iframe"), null, article.filename);
      } finally { dom.window.close(); }
    }
  } finally { home.window.close(); }
});

test("legacy link-only scraps now have readable summaries and retain their saved URLs", () => {
  assert.equal(legacy.articles.length, 10);
  for (const article of legacy.articles) {
    const markdown = fs.readFileSync(path.join(newsDir, article.file), "utf8");
    assert.match(markdown, /^---\nlayout: content\n/);
    assert.ok(markdown.includes(article.source_date), article.file);
    assert.ok(markdown.includes("## 핵심 내용") || markdown.includes("## 2023-08-02"), article.file);
    assert.ok(markdown.split("---").slice(2).join("---").length > 500, article.file);
    for (const url of article.urls) assert.ok(markdown.includes(url), article.file + ": " + url);
  }
});
