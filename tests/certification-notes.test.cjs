const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/CERTIFICATION_2021_2023_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, decodeURIComponent(new URL(url, "http://localhost:4000").pathname), "index.html");

test("certification notes have 40 information-processing and 32 big-data concepts dated 2021–2023", () => {
  assert.equal(manifest.articles.length, 72);
  for (const [track, count] of [["information-processing", 40], ["big-data", 32]]) {
    const articles = manifest.articles.filter((a) => a.track === track);
    assert.equal(articles.length, count);
    assert.deepEqual([...new Set(articles.map((a) => a.date.slice(0, 4)))].sort(), ["2021", "2022", "2023"]);
  }
  for (const key of ["file", "url", "title"]) assert.equal(new Set(manifest.articles.map((a) => a[key])).size, 72);
  const concepts = [];
  for (const article of manifest.articles) {
    assert.ok(article.date >= "2021-01-01" && article.date <= "2023-12-31");
    const text = fs.readFileSync(path.join(root, article.file), "utf8");
    assert.ok(text.includes("실제 기출문제가 아닌 창작 연습문제"));
    assert.ok(text.includes("permalink: " + article.url));
    concepts.push(text.split("## 오늘 정리한 개념\n\n")[1].split("\n\n## 예제 문제")[0]);
  }
  assert.equal(new Set(concepts).size, 72);
});

test("certification index and all lessons expose complete problems, explanations, sources and working navigation", () => {
  const index = new JSDOM(fs.readFileSync(fileFor(manifest.index_url), "utf8"));
  try {
    assert.deepEqual([...index.window.document.querySelectorAll("a[data-study-post]")].map((a) => a.getAttribute("href")), manifest.articles.map((a) => a.url));
  } finally { index.window.close(); }
  for (const article of manifest.articles) {
    const dom = new JSDOM(fs.readFileSync(fileFor(article.url), "utf8"));
    try {
      const document = dom.window.document;
      const content = document.querySelector(".article-content");
      assert.equal(document.querySelector(".article-header h1").textContent, article.title);
      assert.equal(document.querySelector(".article-header time").getAttribute("datetime").slice(0, 10), article.date);
      for (const heading of ["오늘 정리한 개념", "예제 문제 · 창작", "풀이와 판단 근거", "헷갈린 부분과 주의점", "복습 문제", "참고한 문서"]) {
        assert.ok([...content.querySelectorAll("h2")].some((h) => h.textContent === heading), article.file + heading);
      }
      assert.ok(content.textContent.length > 650, article.file);
      if (article.language !== "text") {
        const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
        const code = source.match(new RegExp("^```" + article.language + "\\n([\\s\\S]*?)^```", "m"))[1];
        assert.equal(content.querySelector(".language-" + article.language + " pre code, pre code.language-" + article.language).textContent.replace(/\r\n/g, "\n"), code);
      }
      const urls = new Set([...content.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      assert.ok(urls.has(article.source));
      assert.ok(urls.has(manifest.index_url));
      for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url)), url);
      assert.equal(content.querySelector("script, iframe, .empty-article"), null);
    } finally { dom.window.close(); }
  }
});
