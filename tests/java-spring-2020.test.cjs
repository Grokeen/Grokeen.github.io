const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/JAVA_SPRING_2020_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, url, "index.html");
const load = (url) => new JSDOM(fs.readFileSync(fileFor(url), "utf8"));

test("2020 Java and Spring course has 80 distinct lessons and respects historical versions", () => {
  assert.equal(manifest.articles.length, 80);
  for (const key of ["file", "url", "title", "date"]) assert.equal(new Set(manifest.articles.map(a => a[key])).size, 80, key);
  assert.equal(manifest.articles.filter(a => a.track === "java").length, 40);
  assert.equal(manifest.articles.filter(a => a.track === "spring").length, 40);
  for (const a of manifest.articles) {
    assert.ok(a.date >= "2020-01-01" && a.date <= "2020-12-31");
    if (a.track === "spring") assert.ok(a.date >= "2020-10-01");
    const source = fs.readFileSync(path.join(root, a.file), "utf8").replace(/\r\n/g, "\n");
    assert.ok(source.includes("series: " + manifest.series));
    const code = source.match(/^```java\n([\s\S]*?)^```/m)[1];
    assert.equal(/\bjakarta\.|\brecord\s+[A-Z]|\.toList\(\)/.test(code.replaceAll("Collectors.toList()", "")), false, a.file);
  }
});

test("Java/Spring index and board expose every lesson and its runnable project setup", () => {
  const index = load(manifest.index_url);
  const home = load("/");
  const archive = load("/url.html/blogindex/");
  try {
    assert.deepEqual([...index.window.document.querySelectorAll("a[data-study-post]")].map(a => a.getAttribute("href")), manifest.articles.map(a => a.url));
    assert.ok(index.window.document.getElementById("run"));
    for (const dom of [home, archive]) {
      const urls = new Set([...dom.window.document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")));
      assert.ok(urls.has(manifest.index_url));
      for (const a of manifest.articles) assert.ok(urls.has(a.url), a.file);
    }
  } finally { index.window.close(); home.window.close(); archive.window.close(); }
});

test("all Java/Spring lessons render the exact executable code, explanation and valid navigation", () => {
  for (const [i, a] of manifest.articles.entries()) {
    const dom = load(a.url);
    try {
      const d = dom.window.document;
      const content = d.querySelector(".article-content");
      assert.equal(d.querySelector(".article-header h1").textContent, a.title);
      assert.equal(d.querySelector("time").getAttribute("datetime").slice(0, 10), a.date);
      const source = fs.readFileSync(path.join(root, a.file), "utf8").replace(/\r\n/g, "\n");
      const code = source.match(/^```java\n([\s\S]*?)^```/m)[1];
      assert.equal(content.querySelector(".language-java pre code, pre code.language-java").textContent.replace(/\r\n/g, "\n"), code);
      assert.deepEqual([...content.querySelectorAll("h2")].map(h => h.textContent), ["오늘 정리한 개념", "따라 해 보기", "확인 결과", "코드를 따라 읽기", "헷갈린 부분과 주의점", "복습 문제", "참고한 문서"]);
      const urls = new Set([...content.querySelectorAll("a[href]")].map(a => a.getAttribute("href")));
      assert.ok(urls.has(a.source));
      assert.ok(urls.has(manifest.index_url + "#run"));
      if (i) assert.ok(urls.has(manifest.articles[i - 1].url));
      if (i < 79) assert.ok(urls.has(manifest.articles[i + 1].url));
      for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url.split("#")[0])), url);
      assert.equal(content.querySelector("script, iframe, .empty-article"), null);
    } finally { dom.window.close(); }
  }
});
