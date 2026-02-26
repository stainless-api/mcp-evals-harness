import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import { parse } from "csv-parse/sync";

interface TestCaseResult {
  testCaseId: string;
  prompt: string;
  tags: string[];
  expected: string;
  scores: { Completeness: number; Efficiency: number; Factuality: number };
  metrics: {
    duration: number;
    tool_calls: number;
    errors: number;
  };
}

interface ConfigData {
  name: string;
  results: TestCaseResult[];
}

function deriveConfigName(filename: string): string {
  return basename(filename, ".csv")
    .replace(/^increase-/, "")
    .replace(/-opus$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function loadCsv(filepath: string): ConfigData {
  const raw = readFileSync(filepath, "utf-8");
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const results: TestCaseResult[] = records.map((row: Record<string, string>) => {
    const input = JSON.parse(row.input);
    const scores = JSON.parse(row.scores);
    const metrics = JSON.parse(row.metrics);
    return {
      testCaseId: input.testCaseId,
      prompt: input.prompt,
      tags: input.tags ?? [],
      expected: JSON.parse(row.expected),
      scores: {
        Completeness: scores.Completeness ?? 0,
        Efficiency: scores.Efficiency ?? 0,
        Factuality: scores.Factuality ?? 0,
      },
      metrics: {
        duration: metrics.duration ?? 0,
        tool_calls: metrics.tool_calls ?? 0,
        errors: metrics.errors ?? 0,
      },
    };
  });

  return { name: deriveConfigName(filepath), results };
}

function buildHtml(configs: ConfigData[]): string {
  const allTestCaseIds = [
    ...new Set(configs.flatMap((c) => c.results.map((r) => r.testCaseId))),
  ].sort();

  const allTags = [
    ...new Set(configs.flatMap((c) => c.results.flatMap((r) => r.tags))),
  ].sort();

  const dataJson = JSON.stringify({ configs, allTestCaseIds, allTags });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Increase MCP Eval Results</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  :root {
    --bg: #0f1117;
    --surface: #1a1d27;
    --surface2: #232734;
    --border: #2e3345;
    --text: #e1e4ed;
    --text-dim: #8b90a0;
    --accent: #6c8cff;
    --green: #34d399;
    --yellow: #fbbf24;
    --red: #f87171;
    --orange: #fb923c;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.5;
    padding: 2rem;
  }
  h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
  h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-dim); }
  h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; }
  .hint { font-weight: 400; color: var(--text-dim); font-size: 0.8rem; }
  .subtitle { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 2rem; }

  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.25rem;
  }
  .card-title { font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }
  .card-scores { display: flex; gap: 1rem; flex-wrap: wrap; }
  .card-score { text-align: center; }
  .card-score .value { font-size: 1.5rem; font-weight: 700; }
  .card-score .label { font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; }
  .card-meta { margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-dim); display: flex; gap: 1rem; }

  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .chart-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
  @media (max-width: 900px) { .chart-row { grid-template-columns: 1fr; } }
  .chart-container { position: relative; height: 320px; }

  .filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .filter-btn {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text-dim);
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.15s;
  }
  .filter-btn:hover { border-color: var(--accent); color: var(--text); }
  .filter-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }

  table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  thead th {
    position: sticky;
    top: 0;
    background: var(--surface);
    padding: 0.6rem 0.5rem;
    text-align: left;
    border-bottom: 2px solid var(--border);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    color: var(--text-dim);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  thead th:hover { color: var(--text); }
  thead th .sort-arrow { margin-left: 4px; opacity: 0.4; }
  thead th.sorted .sort-arrow { opacity: 1; color: var(--accent); }
  tbody td { padding: 0.5rem; border-bottom: 1px solid var(--border); }
  tbody tr:hover { background: var(--surface2); }
  .test-name { font-weight: 500; white-space: nowrap; }
  .tag { display: inline-block; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.7rem; background: var(--surface2); color: var(--text-dim); margin-right: 0.2rem; }
  .score-cell { text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; min-width: 48px; }
  .dur-cell { text-align: right; font-variant-numeric: tabular-nums; color: var(--text-dim); min-width: 56px; }

  .config-header { text-align: center !important; border-bottom: 2px solid var(--border); }
  .config-header-group { border-left: 2px solid var(--border); }

  .table-scroll { overflow-x: auto; max-height: 70vh; overflow-y: auto; }

  .legend { display: flex; gap: 1.5rem; margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-dim); align-items: center; }
  .legend-swatch { width: 12px; height: 12px; border-radius: 3px; display: inline-block; margin-right: 4px; vertical-align: middle; }
</style>
</head>
<body>

<h1>Increase MCP Server Eval Results</h1>
<p class="subtitle">Comparing four MCP server configurations across 31 test cases exercising the Increase REST API</p>

<div id="summary-cards" class="cards"></div>

<div class="chart-row">
  <div class="section">
    <h3>Average Scores by Configuration <span class="hint">(higher is better)</span></h3>
    <div class="chart-container"><canvas id="scoresChart"></canvas></div>
  </div>
  <div class="section">
    <h3>Average Duration <span class="hint">(lower is better)</span></h3>
    <div class="chart-container"><canvas id="durationChart"></canvas></div>
  </div>
</div>

<div class="chart-row">
  <div class="section">
    <h3>Score Distribution: Completeness <span class="hint">(more at right is better)</span></h3>
    <div class="chart-container"><canvas id="distCompleteness"></canvas></div>
  </div>
  <div class="section">
    <h3>Score Distribution: Factuality <span class="hint">(more at right is better)</span></h3>
    <div class="chart-container"><canvas id="distFactuality"></canvas></div>
  </div>
</div>

<div class="section">
  <h3>Per-Test-Case Comparison</h3>
  <div class="filters" id="tag-filters"></div>
  <div class="table-scroll">
    <table id="results-table">
      <thead id="results-thead"></thead>
      <tbody id="results-tbody"></tbody>
    </table>
  </div>
</div>

<script>
const DATA = ${dataJson};

const HIGHLIGHT_NAME = "Stainless";
const HIGHLIGHT_IDX = DATA.configs.findIndex(c => c.name === HIGHLIGHT_NAME);

const BASE_COLORS = ["#6c8cff", "#34d399", "#fbbf24", "#fb923c"];
const MUTED_BORDER = BASE_COLORS.map(c => c + "88");
const MUTED_BG = ["rgba(108,140,255,0.18)", "rgba(52,211,153,0.18)", "rgba(251,191,36,0.18)", "rgba(251,146,60,0.18)"];
const ACCENT_BORDER = "#fb923c";
const ACCENT_BG = "rgba(251,146,60,1)";

const COLORS = DATA.configs.map((_, i) => i === HIGHLIGHT_IDX ? ACCENT_BORDER : MUTED_BORDER[i]);
const COLORS_40 = DATA.configs.map((_, i) => i === HIGHLIGHT_IDX ? ACCENT_BG : MUTED_BG[i]);

function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }

function scoreColor(v) {
  if (v >= 0.9) return "var(--green)";
  if (v >= 0.6) return "var(--yellow)";
  if (v > 0) return "var(--orange)";
  return "var(--red)";
}

function scoreBg(v) {
  if (v >= 0.9) return "rgba(52,211,153,0.15)";
  if (v >= 0.6) return "rgba(251,191,36,0.1)";
  if (v > 0) return "rgba(251,146,60,0.1)";
  return "rgba(248,113,113,0.12)";
}

// Summary cards
const cardsEl = document.getElementById("summary-cards");
DATA.configs.forEach((cfg, i) => {
  const c = avg(cfg.results.map(r => r.scores.Completeness));
  const e = avg(cfg.results.map(r => r.scores.Efficiency));
  const f = avg(cfg.results.map(r => r.scores.Factuality));
  const d = avg(cfg.results.map(r => r.metrics.duration));
  const errs = cfg.results.reduce((s, r) => s + r.metrics.errors, 0);
  const tc = avg(cfg.results.map(r => r.metrics.tool_calls));
  const isHighlight = i === HIGHLIGHT_IDX;
  cardsEl.innerHTML += \`
    <div class="card" style="border-top: 3px solid \${COLORS[i]};\${isHighlight ? "box-shadow: 0 0 0 1px " + ACCENT_BORDER + "44;" : "opacity:0.7;"}">
      <div class="card-title">\${cfg.name}</div>
      <div class="card-scores">
        <div class="card-score"><div class="value" style="color:\${scoreColor(c)}">\${(c*100).toFixed(0)}%</div><div class="label">Completeness</div></div>
        <div class="card-score"><div class="value" style="color:\${scoreColor(e)}">\${(e*100).toFixed(0)}%</div><div class="label">Efficiency</div></div>
        <div class="card-score"><div class="value" style="color:\${scoreColor(f)}">\${(f*100).toFixed(0)}%</div><div class="label">Factuality</div></div>
      </div>
      <div class="card-meta">
        <span>Avg \${d.toFixed(1)}s</span>
        <span>Avg \${tc.toFixed(1)} tool calls</span>
        <span>\${errs} errors</span>
      </div>
    </div>\`;
});

// Scores bar chart
const scoresCtx = document.getElementById("scoresChart").getContext("2d");
new Chart(scoresCtx, {
  type: "bar",
  data: {
    labels: ["Completeness", "Efficiency", "Factuality"],
    datasets: DATA.configs.map((cfg, i) => ({
      label: cfg.name,
      data: [
        avg(cfg.results.map(r => r.scores.Completeness)),
        avg(cfg.results.map(r => r.scores.Efficiency)),
        avg(cfg.results.map(r => r.scores.Factuality)),
      ],
      backgroundColor: COLORS_40[i],
      borderColor: COLORS[i],
      borderWidth: 2,
      borderRadius: 4,
    })),
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 1, ticks: { color: "#8b90a0", callback: v => (v*100)+"%" }, grid: { color: "#2e3345" } },
      x: { ticks: { color: "#8b90a0" }, grid: { display: false } },
    },
    plugins: { legend: { labels: { color: "#e1e4ed" } } },
  },
});

// Duration bar chart
const durCtx = document.getElementById("durationChart").getContext("2d");
new Chart(durCtx, {
  type: "bar",
  data: {
    labels: DATA.configs.map(c => c.name),
    datasets: [{
      label: "Avg Duration (s)",
      data: DATA.configs.map(c => avg(c.results.map(r => r.metrics.duration))),
      backgroundColor: COLORS_40,
      borderColor: COLORS,
      borderWidth: 2,
      borderRadius: 4,
    }],
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: { ticks: { color: "#8b90a0", callback: v => v+"s" }, grid: { color: "#2e3345" } },
      y: { ticks: { color: "#8b90a0" }, grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  },
});

// Score distribution helper
function buildDistChart(canvasId, scoreKey) {
  const buckets = ["0", "(0, 0.5)", "[0.5, 1)", "1"];
  function bucket(v) {
    if (v === 0) return 0;
    if (v < 0.5) return 1;
    if (v < 1) return 2;
    return 3;
  }
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: buckets,
      datasets: DATA.configs.map((cfg, i) => {
        const counts = [0, 0, 0, 0];
        cfg.results.forEach(r => counts[bucket(r.scores[scoreKey])]++);
        return { label: cfg.name, data: counts, backgroundColor: COLORS_40[i], borderColor: COLORS[i], borderWidth: 2, borderRadius: 4 };
      }),
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { ticks: { color: "#8b90a0", stepSize: 5 }, grid: { color: "#2e3345" } },
        x: { ticks: { color: "#8b90a0" }, grid: { display: false } },
      },
      plugins: { legend: { labels: { color: "#e1e4ed" } } },
    },
  });
}
buildDistChart("distCompleteness", "Completeness");
buildDistChart("distFactuality", "Factuality");

// Tag filters
let activeTag = null;
const filtersEl = document.getElementById("tag-filters");
const allBtn = document.createElement("button");
allBtn.className = "filter-btn active";
allBtn.textContent = "All";
allBtn.onclick = () => { activeTag = null; renderTable(); document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active")); allBtn.classList.add("active"); };
filtersEl.appendChild(allBtn);
DATA.allTags.filter(t => t !== "read").forEach(tag => {
  const btn = document.createElement("button");
  btn.className = "filter-btn";
  btn.textContent = tag;
  btn.onclick = () => {
    activeTag = tag;
    renderTable();
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
  filtersEl.appendChild(btn);
});

// Table
let sortCol = null;
let sortDir = 1;

function renderTable() {
  const thead = document.getElementById("results-thead");
  const tbody = document.getElementById("results-tbody");

  // Build header
  let headerHtml = "<tr><th onclick=\\"sortBy('name')\\">Test Case <span class=\\"sort-arrow\\">&#8597;</span></th><th>Tags</th>";
  DATA.configs.forEach(cfg => {
    headerHtml += \`<th class="config-header-group config-header" colspan="4">\${cfg.name}</th>\`;
  });
  headerHtml += "</tr><tr><th></th><th></th>";
  DATA.configs.forEach((cfg, ci) => {
    headerHtml += \`<th class="config-header-group score-cell" onclick="sortBy('c_\${ci}')">C <span class="sort-arrow">&#8597;</span></th>\`;
    headerHtml += \`<th class="score-cell" onclick="sortBy('e_\${ci}')">E <span class="sort-arrow">&#8597;</span></th>\`;
    headerHtml += \`<th class="score-cell" onclick="sortBy('f_\${ci}')">F <span class="sort-arrow">&#8597;</span></th>\`;
    headerHtml += \`<th class="dur-cell" onclick="sortBy('d_\${ci}')">Dur <span class="sort-arrow">&#8597;</span></th>\`;
  });
  headerHtml += "</tr>";
  thead.innerHTML = headerHtml;

  // Build lookup: testCaseId -> config index -> result
  const lookup = {};
  DATA.configs.forEach((cfg, ci) => {
    cfg.results.forEach(r => {
      if (!lookup[r.testCaseId]) lookup[r.testCaseId] = {};
      lookup[r.testCaseId][ci] = r;
    });
  });

  // Filter
  let testIds = DATA.allTestCaseIds;
  if (activeTag) {
    testIds = testIds.filter(id => {
      const r = lookup[id] && lookup[id][0];
      return r && r.tags.includes(activeTag);
    });
  }

  // Sort
  if (sortCol) {
    testIds = [...testIds].sort((a, b) => {
      let va, vb;
      if (sortCol === "name") { va = a; vb = b; return sortDir * va.localeCompare(vb); }
      const [type, ci] = sortCol.split("_");
      const ra = lookup[a]?.[ci], rb = lookup[b]?.[ci];
      if (type === "c") { va = ra?.scores.Completeness ?? 0; vb = rb?.scores.Completeness ?? 0; }
      else if (type === "e") { va = ra?.scores.Efficiency ?? 0; vb = rb?.scores.Efficiency ?? 0; }
      else if (type === "f") { va = ra?.scores.Factuality ?? 0; vb = rb?.scores.Factuality ?? 0; }
      else if (type === "d") { va = ra?.metrics.duration ?? 0; vb = rb?.metrics.duration ?? 0; }
      return sortDir * (va - vb);
    });
  }

  // Render rows
  let rowsHtml = "";
  testIds.forEach(id => {
    const firstResult = lookup[id]?.[0];
    const tags = firstResult?.tags?.filter(t => t !== "read") ?? [];
    rowsHtml += \`<tr><td class="test-name">\${id}</td><td>\${tags.map(t => '<span class="tag">'+t+'</span>').join("")}</td>\`;
    DATA.configs.forEach((cfg, ci) => {
      const r = lookup[id]?.[ci];
      if (r) {
        rowsHtml += \`<td class="score-cell config-header-group" style="background:\${scoreBg(r.scores.Completeness)};color:\${scoreColor(r.scores.Completeness)}">\${r.scores.Completeness.toFixed(2)}</td>\`;
        rowsHtml += \`<td class="score-cell" style="background:\${scoreBg(r.scores.Efficiency)};color:\${scoreColor(r.scores.Efficiency)}">\${r.scores.Efficiency.toFixed(2)}</td>\`;
        rowsHtml += \`<td class="score-cell" style="background:\${scoreBg(r.scores.Factuality)};color:\${scoreColor(r.scores.Factuality)}">\${r.scores.Factuality.toFixed(2)}</td>\`;
        rowsHtml += \`<td class="dur-cell">\${r.metrics.duration.toFixed(1)}s</td>\`;
      } else {
        rowsHtml += '<td class="score-cell config-header-group">-</td><td class="score-cell">-</td><td class="score-cell">-</td><td class="dur-cell">-</td>';
      }
    });
    rowsHtml += "</tr>";
  });
  tbody.innerHTML = rowsHtml;
}

window.sortBy = function(col) {
  if (sortCol === col) sortDir *= -1;
  else { sortCol = col; sortDir = -1; }
  renderTable();
};

renderTable();
</script>
</body>
</html>`;
}

// Main
const resultsDir = join(process.cwd(), "results");
const csvFiles = readdirSync(resultsDir)
  .filter((f) => f.startsWith("increase-") && f.endsWith(".csv"))
  .sort()
  .map((f) => join(resultsDir, f));

if (csvFiles.length === 0) {
  console.error("No increase-*.csv files found in results/");
  process.exit(1);
}

console.log(`Found ${csvFiles.length} CSV files:`);
csvFiles.forEach((f) => console.log(`  ${basename(f)}`));

const configs = csvFiles.map(loadCsv);
const html = buildHtml(configs);
const outPath = join(resultsDir, "index.html");
writeFileSync(outPath, html);
console.log(`\nGenerated ${outPath}`);
