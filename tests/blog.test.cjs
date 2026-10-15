const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM, VirtualConsole } = require("jsdom");

const project = path.resolve(__dirname, "..");
const site = path.join(project, ".jekyll-local/site");
const homepage = new JSDOM(fs.readFileSync(path.join(site, "index.html"), "utf8"));
const postUrls = [...homepage.window.document.querySelectorAll(".board-list a")]
  .map((link) => link.getAttribute("href"))
  .filter((url) => url !== "/wedding/");
homepage.window.close();

function fileFor(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost:4000").pathname);
  return path.join(site, pathname, pathname.endsWith("/") ? "index.html" : "");
}

test("every linked ordinary post has a complete document and a working stylesheet", () => {
  assert.ok(postUrls.length > 0, "the test must cover actual generated posts");
  for (const url of postUrls) {
    const html = fs.readFileSync(fileFor(url), "utf8");
    for (const tag of ["html", "head", "body"]) {
      assert.equal((html.match(new RegExp("<" + tag + "(?:\\s|>)", "gi")) || []).length, 1, `${url}: one ${tag}`);
    }
    assert.equal((html.match(/<!doctype html>/gi) || []).length, 1, url);
    const dom = new JSDOM(html);
    try {
      const document = dom.window.document;
      assert.equal(document.documentElement.lang, "ko", url);
      assert.equal(document.querySelector("meta[charset]").getAttribute("charset"), "utf-8", url);
      assert.ok(document.querySelector("meta[name=viewport]"), url);
      assert.ok(document.querySelector("head link[rel=stylesheet]"), `${url}: styles are connected in the head`);
      for (const link of document.querySelectorAll("head link[rel=stylesheet]")) {
        assert.ok(fs.existsSync(fileFor(link.getAttribute("href"))), `${url}: CSS file exists`);
      }
      assert.ok(document.querySelector("article .article-header h1").textContent.trim(), url);
      assert.ok(document.querySelector(".article-content").textContent.trim(), url);
      assert.equal(document.querySelector("figure.highlight.bash .article-content"), null, `${url}: body is not a code block`);
      assert.equal(document.querySelector("script"), null, `${url}: no legacy inline scripts`);
      assert.ok(document.querySelector('a[href="/url.html/blogindex/"]'), url);
    } finally { dom.window.close(); }
  }
});

test("post images, styles and navigation links resolve to generated files", () => {
  for (const url of postUrls) {
    const dom = new JSDOM(fs.readFileSync(fileFor(url), "utf8"));
    try {
      for (const element of dom.window.document.querySelectorAll("img[src], link[rel=stylesheet], .article-navigation a, .blog-nav a")) {
        const target = element.getAttribute("src") || element.getAttribute("href");
        if (target.startsWith("/")) assert.ok(fs.existsSync(fileFor(target)), `${url}: ${target}`);
      }
    } finally { dom.window.close(); }
  }
});

test("the post archive lists ordinary posts once and links to their full pages", () => {
  const dom = new JSDOM(fs.readFileSync(fileFor("/url.html/blogindex/"), "utf8"));
  try {
    const links = [...dom.window.document.querySelectorAll(".archive-entry h2 a")].map((a) => a.getAttribute("href"));
    assert.equal(links.length, new Set(links).size);
    assert.deepEqual(new Set(links), new Set(postUrls));
    assert.equal(links.includes("/wedding/"), false);
    assert.equal(dom.window.document.querySelector("link[rel=stylesheet]").getAttribute("href"), "/css/blog.css");
  } finally { dom.window.close(); }
});

test("an empty source post still shows its title, empty-state message and return link", () => {
  const dom = new JSDOM(fs.readFileSync(fileFor("/big/data/analyse/certification/Quiz27/"), "utf8"));
  try {
    const document = dom.window.document;
    assert.ok(document.querySelector(".article-header h1").textContent.trim());
    assert.equal(document.querySelector(".empty-article").textContent, "아직 본문이 작성되지 않은 글입니다.");
    assert.ok(document.querySelector('.article-navigation a[href="/url.html/blogindex/"]'));
  } finally { dom.window.close(); }
});

test("article typography and wide content use readable, contained styles", () => {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => errors.push(error.message));
  const css = fs.readFileSync(path.join(project, "css/blog.css"), "utf8");
  const dom = new JSDOM(`<!doctype html><style>${css}</style><body class="blog-page"><div class="article-content"><p>본문</p><img style="height:500px" alt="샘플"><pre><code>long_line_of_code();</code></pre><table><tr><td>가로로 긴 표</td></tr></table></div></body>`, { virtualConsole });
  try {
    const { document, getComputedStyle } = dom.window;
    assert.deepEqual(errors, []);
    const body = getComputedStyle(document.querySelector(".article-content"));
    assert.equal(body.fontSize, "16px");
    assert.equal(body.overflowWrap, "anywhere");
    const image = getComputedStyle(document.querySelector("img"));
    assert.equal(image.maxWidth, "100%");
    const code = getComputedStyle(document.querySelector("pre"));
    assert.equal(code.whiteSpace, "pre");
    assert.equal(code.overflowX, "auto");
    assert.equal(getComputedStyle(document.querySelector("table")).overflowX, "auto");
    assert.equal(getComputedStyle(document.querySelector(".blog-page")).height, "");
  } finally { dom.window.close(); }
});

test("the wedding page keeps its independent document, stylesheet and scripts", () => {
  const dom = new JSDOM(fs.readFileSync(fileFor("/wedding/"), "utf8"));
  try {
    const document = dom.window.document;
    const styles = [...document.querySelectorAll("link[rel=stylesheet]")].map((link) => link.getAttribute("href"));
    assert.ok(styles.includes("/css/wedding.css"));
    assert.equal(styles.includes("/css/blog.css"), false);
    assert.equal(document.querySelector(".blog-page, .blog-cover, .article-content"), null);
    assert.ok(document.querySelector('script[src="/js/wedding.js"]'));
  } finally { dom.window.close(); }
});
