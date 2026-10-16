const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/LOCAL_TAX_2022_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, decodeURIComponent(new URL(url, "http://localhost:4000").pathname), "index.html");

test("local-tax study has 120 distinct concepts with ten posts in each month of 2022", () => {
  const articles = manifest.articles;
  assert.equal(articles.length, 120);
  assert.ok(articles.length >= 100 && articles.length <= 150);
  for (const key of ["file", "url", "title", "date"]) assert.equal(new Set(articles.map((a) => a[key])).size, 120);
  for (let month = 1; month <= 12; month++) {
    assert.equal(articles.filter((a) => a.date.slice(0, 7) === "2022-" + String(month).padStart(2, "0")).length, 10);
  }
  const concepts = [];
  for (const article of articles) {
    const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
    assert.ok(source.includes("2022년 1월 1일 적용 규정을 공통 기준"));
    assert.ok(source.includes("permalink: " + article.url));
    concepts.push(source.split("## 오늘 정리한 개념\n\n")[1].split("\n\n## 가상 사례")[0]);
    for (const ref of article.sources) assert.equal(new URL(ref.url).hostname, "www.law.go.kr");
  }
  assert.equal(new Set(concepts).size, 120);
});

test("all local-tax lessons render cases, solutions, historical sources and working study navigation", () => {
  const index = new JSDOM(fs.readFileSync(fileFor(manifest.index_url), "utf8"));
  try {
    assert.deepEqual([...index.window.document.querySelectorAll("a[data-study-post]")].map((a) => a.getAttribute("href")), manifest.articles.map((a) => a.url));
    assert.equal(index.window.document.querySelectorAll(".study-chapter").length, 12);
    assert.ok(index.window.document.querySelector(".article-content").textContent.includes("23.7%"));
  } finally { index.window.close(); }
  for (const article of manifest.articles) {
    const dom = new JSDOM(fs.readFileSync(fileFor(article.url), "utf8"));
    try {
      const document = dom.window.document;
      const content = document.querySelector(".article-content");
      assert.equal(document.querySelector(".article-header h1").textContent, article.title);
      assert.equal(document.querySelector(".article-header time").getAttribute("datetime").slice(0, 10), article.date);
      assert.ok(content.textContent.length > 650, article.file);
      assert.deepEqual([...content.querySelectorAll("h2")].map((h) => h.textContent), ["오늘 정리한 개념", "가상 사례로 연습하기", "풀이와 확인 순서", "헷갈린 부분과 주의점", "복습 문제", "당시 기준과 참고 조문"]);
      const urls = new Set([...content.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      for (const ref of article.sources) assert.ok(urls.has(ref.url), article.file);
      assert.ok(urls.has(manifest.index_url));
      for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url)), url);
      assert.equal(content.querySelector("script, iframe, .empty-article"), null);
    } finally { dom.window.close(); }
  }
});
