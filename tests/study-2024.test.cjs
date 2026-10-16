const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/CSHARP_HOSPITAL_2024_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, decodeURIComponent(new URL(url, "http://localhost:4000").pathname), "index.html");
const load = (url) => new JSDOM(fs.readFileSync(fileFor(url), "utf8"));

test("C# and hospital notes have distinct concepts within May to December 2024 and at most 100 posts", () => {
  const articles = manifest.articles;
  assert.equal(articles.length, 80);
  assert.ok(articles.length <= 100);
  assert.equal(articles.filter((a) => a.track === "csharp").length, 48);
  assert.equal(articles.filter((a) => a.track === "hospital").length, 32);
  for (const key of ["file", "url", "title", "date"]) assert.equal(new Set(articles.map((a) => a[key])).size, 80, key);
  const concepts = [];
  const codes = [];
  for (const [index, article] of articles.entries()) {
    assert.ok(article.date >= "2024-05-01" && article.date <= "2024-12-31", article.file);
    assert.equal(article.order, index + 1);
    const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
    assert.ok(source.includes("series: " + manifest.series));
    assert.ok(source.includes("permalink: " + article.url));
    concepts.push(source.split("## 오늘 정리한 개념\n\n")[1].split("\n\n## 따라 해 보기")[0]);
    codes.push(source.match(/^```csharp\n([\s\S]*?)^```/m)[1]);
  }
  assert.equal(new Set(concepts).size, 80);
  assert.equal(new Set(codes).size, 80);
});

test("C# and hospital index lists all 80 lessons once and both existing and new courses remain discoverable", () => {
  const index = load(manifest.index_url);
  const home = load("/");
  const archive = load("/url.html/blogindex/");
  try {
    assert.deepEqual([...index.window.document.querySelectorAll("a[data-study-post]")].map((a) => a.getAttribute("href")), manifest.articles.map((a) => a.url));
    assert.equal(index.window.document.querySelectorAll(".study-chapter").length, 10);
    for (const dom of [home, archive]) {
      const urls = new Set([...dom.window.document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      assert.ok(urls.has("/study/2021/"));
      assert.ok(urls.has(manifest.index_url));
      for (const article of manifest.articles) assert.ok(urls.has(article.url), article.file);
    }
  } finally { index.window.close(); home.window.close(); archive.window.close(); }
});

test("all 2024 lessons render their full explanation, unmodified code, expected output and study links", () => {
  for (const [index, article] of manifest.articles.entries()) {
    const dom = load(article.url);
    try {
      const document = dom.window.document;
      const content = document.querySelector(".article-content");
      assert.equal(document.querySelector(".article-header h1").textContent, article.title);
      assert.equal(document.querySelector(".article-header time").getAttribute("datetime").slice(0, 10), article.date);
      assert.ok(content.textContent.length > 650, article.file);
      assert.deepEqual([...content.querySelectorAll("h2")].map((h) => h.textContent), ["오늘 정리한 개념", "따라 해 보기", "실행 결과", "코드를 따라 읽기", "헷갈린 부분과 주의점", "복습 문제", "참고한 문서"]);
      const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
      const code = source.match(/^```csharp\n([\s\S]*?)^```/m)[1];
      assert.equal(content.querySelector(".language-csharp pre code, pre code.language-csharp").textContent.replace(/\r\n/g, "\n"), code);
      assert.equal(content.querySelector(".language-text pre code, pre code.language-text").textContent.replace(/\r\n/g, "\n"), article.expected_output);
      const urls = new Set([...content.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      assert.ok(urls.has(article.source));
      assert.ok(urls.has(manifest.index_url));
      if (index > 0) assert.ok(urls.has(manifest.articles[index - 1].url));
      if (index + 1 < manifest.articles.length) assert.ok(urls.has(manifest.articles[index + 1].url));
      for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url)), url);
      assert.equal(content.querySelector("script, iframe, .empty-article"), null);
    } finally { dom.window.close(); }
  }
});
