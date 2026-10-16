const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const root = path.resolve(__dirname, "..");
const site = path.join(root, ".jekyll-local/site");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "_docs/STUDY_2021_MANIFEST.json"), "utf8"));
const fileFor = (url) => path.join(site, decodeURIComponent(new URL(url, "http://localhost:4000").pathname), "index.html");
const load = (url) => new JSDOM(fs.readFileSync(fileFor(url), "utf8"));

test("the study collection has 108 distinct lessons dated in 2021", () => {
  const articles = manifest.articles;
  assert.equal(articles.length, 108);
  assert.ok(articles.length >= 100 && articles.length <= 500);
  for (const field of ["file", "title", "date", "url", "order"]) {
    assert.equal(new Set(articles.map((article) => article[field])).size, articles.length, field);
  }
  assert.equal(articles.filter((article) => article.track === "python").length, 72);
  assert.equal(articles.filter((article) => article.track === "raspberry-pi").length, 36);
  const concepts = [];
  const examples = [];
  const allowedHosts = new Set(["docs.python.org", "gpiozero.readthedocs.io", "www.raspberrypi.com", "pyserial.readthedocs.io", "manpages.debian.org"]);
  for (const [index, article] of articles.entries()) {
    assert.match(article.date, /^2021-\d{2}-\d{2}$/);
    assert.equal(article.order, index + 1);
    assert.ok(article.file.split("/").pop().startsWith(article.date));
    const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
    assert.ok(source.includes("layout: content\n") && source.includes("series: study-2021\n"));
    assert.ok(source.includes("permalink: " + article.url));
    assert.ok(allowedHosts.has(new URL(article.source).hostname), article.source);
    concepts.push(source.split("## 오늘 정리한 개념\n\n")[1].split("\n\n## 따라 해 보기")[0]);
    const code = source.match(new RegExp("^```" + article.language + "\\n([\\s\\S]*?)^```", "m"));
    assert.ok(code, article.file);
    examples.push(code[1]);
    if (article.mode === "run") assert.ok(article.expected_output);
  }
  assert.equal(new Set(concepts).size, articles.length, "distinct concepts");
  assert.equal(new Set(examples).size, articles.length, "distinct examples");
});

test("the study index links every lesson once in learning order and all lessons appear in the board", () => {
  const index = load(manifest.index_url);
  const home = load("/");
  const archive = load("/url.html/blogindex/");
  try {
    const links = [...index.window.document.querySelectorAll("a[data-study-post]")].map((link) => link.getAttribute("href"));
    assert.deepEqual(links, manifest.articles.map((article) => article.url));
    assert.equal(index.window.document.querySelectorAll(".study-chapter").length, 10);
    assert.ok(index.window.document.querySelector(".article-content").textContent.includes("2021년 날짜로 재구성"));
    for (const dom of [home, archive]) {
      const urls = new Set([...dom.window.document.querySelectorAll("a[href]")].map((link) => link.getAttribute("href")));
      assert.ok(urls.has(manifest.index_url));
      for (const article of manifest.articles) assert.ok(urls.has(article.url), article.file);
    }
  } finally { index.window.close(); home.window.close(); archive.window.close(); }
});

test("every rendered study lesson contains its explanation, exact example and working study navigation", () => {
  for (const [index, article] of manifest.articles.entries()) {
    const dom = load(article.url);
    try {
      const document = dom.window.document;
      const content = document.querySelector(".article-content");
      assert.equal(document.querySelector(".article-header h1").textContent, article.title);
      assert.equal(document.querySelector(".article-header time").getAttribute("datetime").slice(0, 10), article.date);
      assert.ok(content.textContent.trim().length > 650, article.file + ": substantive body");
      const headings = [...content.querySelectorAll("h2")].map((heading) => heading.textContent);
      assert.deepEqual(headings, [
        "오늘 정리한 개념", "따라 해 보기", article.mode === "run" ? "실행 결과" : "장비에서 확인할 내용",
        "코드를 따라 읽기", "헷갈린 부분과 주의점", "복습 문제", "참고한 문서"
      ], article.file);
      const source = fs.readFileSync(path.join(root, article.file), "utf8").replace(/\r\n/g, "\n");
      const code = source.match(new RegExp("^```" + article.language + "\\n([\\s\\S]*?)^```", "m"))[1];
      const rendered = content.querySelector(".language-" + article.language + " pre code, pre code.language-" + article.language);
      assert.ok(rendered, article.file + ": readable code example");
      assert.equal(rendered.textContent.replace(/\r\n/g, "\n"), code);
      assert.equal(content.textContent.includes("{% raw %}"), false);
      assert.equal(content.querySelector(".empty-article, script, iframe"), null);
      const urls = new Set([...content.querySelectorAll("a[href]")].map((link) => link.getAttribute("href")));
      assert.ok(urls.has(article.source));
      assert.ok(urls.has(manifest.index_url));
      if (index > 0) assert.ok(urls.has(manifest.articles[index - 1].url));
      if (index + 1 < manifest.articles.length) assert.ok(urls.has(manifest.articles[index + 1].url));
      for (const url of urls) if (url.startsWith("/")) assert.ok(fs.existsSync(fileFor(url)), url);
    } finally { dom.window.close(); }
  }
});
