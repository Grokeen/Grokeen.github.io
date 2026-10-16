const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const boj = JSON.parse(fs.readFileSync(path.join(root, "_docs/CODING_2024_MANIFEST.json"), "utf8"));
const company = JSON.parse(fs.readFileSync(path.join(root, "_docs/COMPANY_CODING_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, decodeURIComponent(url.split("#")[0]), "index.html");
const load = (url) => new JSDOM(fs.readFileSync(fileFor(url), "utf8"));

test("Baekjoon preserves ten old problem URLs and adds exactly 100 distinct Silver/Gold practice problems", () => {
  assert.equal(boj.articles.length, 110);
  const old = boj.articles.filter(a => a.group === "existing");
  const additional = boj.articles.filter(a => a.group === "additional");
  assert.equal(old.length, 10);
  assert.equal(additional.length, 100);
  assert.equal(new Set(boj.articles.map(a => a.id)).size, 110);
  const config = fs.readFileSync(path.join(root, "_config.yml"), "utf8");
  for (const a of old) assert.ok(config.includes("  - " + a.legacy_file), a.legacy_file);
  assert.ok(old.some(a => a.id === 2444 && a.url === "/B3.별찍기7/"));
  for (const a of additional) {
    assert.ok(a.date >= "2024-01-01" && a.date <= "2024-06-30");
    assert.ok(["Silver", "Gold"].includes(a.level));
    assert.ok(a.cases.length >= 2);
  }
});

test("company preparation is a separate 36-problem collection with official sources and explicit scope", () => {
  assert.equal(company.articles.length, 36);
  assert.equal(company.articles.filter(a => a.kind === "official-kit").length, 32);
  assert.equal(company.articles.filter(a => a.kind === "kakao-public").length, 4);
  assert.equal(new Set(company.articles.map(a => a.id)).size, 36);
  assert.equal(new Set([...boj.articles, ...company.articles].map(a => a.url)).size, 146);
  const sources = JSON.parse(fs.readFileSync(path.join(root, "_docs/COMPANY_CODING_SOURCES.json"), "utf8"));
  for (const a of company.articles) {
    assert.equal(sources.find(s => s.id === a.id).status, 200);
    assert.ok(a.source.startsWith("https://school.programmers.co.kr/learn/courses/30/lessons/"));
  }
  const dom = load(company.index_url);
  try {
    assert.ok(dom.window.document.body.textContent.includes("개별 문제의 실제 출제 빈도는 아니다"));
    assert.ok(dom.window.document.body.textContent.includes("2024-11-14"));
  } finally { dom.window.close(); }
});

test("both coding indexes and the board expose all solutions and retain their complete code", () => {
  const home = load("/");
  const archive = load("/url.html/blogindex/");
  try {
    for (const course of [boj, company]) {
      const index = load(course.index_url);
      try {
        assert.deepEqual([...index.window.document.querySelectorAll("a[data-study-post]")].map(a => decodeURIComponent(a.getAttribute("href"))), course.articles.map(a => a.url));
      } finally { index.window.close(); }
      for (const outer of [home, archive]) {
        const urls = new Set([...outer.window.document.querySelectorAll("a[href]")].map(a => decodeURIComponent(a.getAttribute("href"))));
        assert.ok(urls.has(course.index_url));
        for (const a of course.articles) assert.ok(urls.has(a.url), a.url);
      }
      for (const a of course.articles) {
        const dom = load(a.url);
        try {
          const d = dom.window.document;
          const content = d.querySelector(".article-content");
          assert.equal(d.querySelector(".article-header h1").textContent, a.title);
          const source = fs.readFileSync(path.join(root, a.file), "utf8").replace(/\r\n/g, "\n");
          const code = source.match(/^```java\n([\s\S]*?)^```/m)[1];
          assert.equal(content.querySelector(".language-java pre code, pre code.language-java").textContent.replace(/\r\n/g, "\n"), code);
          const headings = [...content.querySelectorAll("h2")].map(h => h.textContent);
          assert.ok(headings.includes("풀이가 성립하는 이유"));
          assert.ok(headings.includes("복잡도와 주의점"));
          assert.equal(content.querySelector("script, iframe, .empty-article"), null);
          const urls = new Set([...content.querySelectorAll("a[href]")].map(a => decodeURIComponent(a.getAttribute("href"))));
          assert.ok(urls.has(a.source));
          assert.ok(urls.has(course.index_url));
          for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url)), url);
        } finally { dom.window.close(); }
      }
    }
  } finally { home.window.close(); archive.window.close(); }
});
