const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const site = path.join(root, '.jekyll-local/site');
const collections = [
  { file: 'HISTORICAL_AI_NEWS_MANIFEST.json', count: 108, index: '/scrap/ai-bigdata-2022-2023/' },
];
const normalize = value => {
  const url = new URL(value);
  url.hash = '';
  return url.href.replace(/\/$/, '');
};

test('expanded news has unique primary events, verified sources and historical dates', () => {
  const existing = JSON.parse(fs.readFileSync(path.join(root, '_docs/AI_NEWS_MANIFEST.json'))).articles;
  const urls = new Set(existing.map(a => normalize(a.source_url)));
  const titles = new Set();
  for (const c of collections) {
    const m = JSON.parse(fs.readFileSync(path.join(root, '_docs', c.file)));
    assert.equal(m.articles.length, c.count);
    for (const a of m.articles) {
      assert.ok(a.date >= m.period_start && a.date <= m.period_end, a.filename);
      assert.equal(a.filename.slice(0, 10), a.date);
      assert.ok(!urls.has(normalize(a.source_url)), a.source_url);
      urls.add(normalize(a.source_url));
      assert.ok(!titles.has(a.title), a.title);
      titles.add(a.title);
      assert.equal(new URL(a.source_url).protocol, 'https:');
      assert.ok(a.source_title && a.source_name && a.source_published_at);
      assert.ok(a.source_verification.http_status === 200 || a.source_verification.method === 'web', a.filename);
      if (a.date !== a.source_published_at.slice(0, 10)) assert.ok(a.source_note, a.filename);
      assert.ok(a.summary.length >= 2 && a.change && a.outlook && a.risk);
    }
  }
  const h = JSON.parse(fs.readFileSync(path.join(root, '_docs/HISTORICAL_AI_NEWS_MANIFEST.json')));
  assert.ok(h.articles.some(a => a.key === 'ChatGPT-Debut-20221130' && a.date === '2022-11-30'));
});

test('all expanded news renders in the common article shell and collection indexes', () => {
  for (const c of collections) {
    const m = JSON.parse(fs.readFileSync(path.join(root, '_docs', c.file)));
    const index = fs.readFileSync(path.join(site, c.index, 'index.html'), 'utf8');
    for (const a of m.articles) {
      assert.ok(index.includes(a.permalink), a.filename + ': index');
      const markdown = fs.readFileSync(path.join(root, a.file), 'utf8');
      assert.ok(markdown.includes(a.summary[0]) && markdown.includes(a.source_url));
      const dom = new JSDOM(fs.readFileSync(path.join(site, a.permalink, 'index.html'), 'utf8'));
      try {
        const body = dom.window.document.querySelector('.article-content');
        assert.ok(body, a.filename);
        assert.ok(body.textContent.length > 500, a.filename + ': substantive body');
        assert.deepEqual([...body.querySelectorAll('h2')].map(h => h.textContent), ['핵심 내용', '무엇이 달라졌나', '앞으로의 관전 포인트 · 해석', '사회적 쟁점과 한계 · 해석']);
        assert.ok([...body.querySelectorAll('a')].some(link => link.getAttribute('href') === a.source_url), a.filename + ': source link');
        assert.equal(body.querySelector('ul table'), null, a.filename + ': source label must not turn into a table');
        assert.equal(body.querySelector('.empty-article, script, iframe'), null);
        assert.ok(body.textContent.includes(a.date) && body.textContent.includes(a.source_published_at.slice(0, 10)));
      } finally { dom.window.close(); }
    }
  }
});
