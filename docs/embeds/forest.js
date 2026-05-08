import { ensureD3, ensureTopojson } from './lib-loader.js';

let forestCache = null;

async function loadForestData() {
  if (forestCache) return forestCache;
  await ensureTopojson();
  const d3 = window.d3;
  const [coverRows, areaRows, changeRows, compRows, world] = await Promise.all([
    d3.csv('./forest/dataset/forest-area-as-share-of-land-area/forest-area-as-share-of-land-area.csv'),
    d3.csv('./forest/dataset/forest-area-ha/forest-area-ha.csv'),
    d3.csv('./forest/dataset/annual-change-forest-area/annual-change-forest-area.csv'),
    d3.csv('./forest/dataset/forest-area-primary-planted/forest-area-primary-planted.csv'),
    d3.json('./forest/data/countries.geojson'),
  ]);
  forestCache = { coverRows, areaRows, changeRows, compRows, world };
  return forestCache;
}

function mountScopedStyle(container, cssText) {
  const style = document.createElement('style');
  style.textContent = cssText;
  container.appendChild(style);
}

export async function initForestMap(container) {
  if (!container) throw new Error('initForestMap: container is required');
  const { coverRows, world } = await loadForestData();
  const d3 = window.d3;
  container.replaceChildren();
  const id = `forest-map-${Math.random().toString(36).slice(2, 8)}`;
  container.innerHTML = `<div class="${id}"><label>年份：</label><input type="range" min="1990" max="2023" value="2020"><span>2020</span><svg></svg></div>`;
  mountScopedStyle(container, `.${id}{padding:8px}.` + id + ` svg{width:100%;height:460px}`);
  const wrap = container.querySelector(`.${id}`);
  const slider = wrap.querySelector('input');
  const label = wrap.querySelector('span');
  const svg = d3.select(wrap.querySelector('svg'));
  const width = Math.max(700, wrap.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  const projection = d3.geoMercator().fitSize([width, height], world);
  const path = d3.geoPath(projection);

  function render(year) {
    label.textContent = String(year);
    const valueMap = new Map(
      coverRows.filter((r) => +r.Year === +year && r.Code?.length === 3).map((r) => [r.Code, +r['Share of land covered by forest']]),
    );
    const vals = [...valueMap.values()].filter((v) => Number.isFinite(v));
    const min = d3.min(vals) ?? 0;
    const max = d3.max(vals) ?? 100;
    const color = d3.scaleSequential([min, max], d3.interpolateGreens);
    svg.selectAll('*').remove();
    svg.append('g').selectAll('path').data(world.features).join('path')
      .attr('d', path)
      .attr('fill', (f) => {
        const iso = f.id || f.properties?.iso_a3 || f.properties?.ISO_A3;
        const v = valueMap.get(iso);
        return Number.isFinite(v) ? color(v) : '#ececec';
      })
      .attr('stroke', '#999').attr('stroke-width', 0.4);
  }
  slider.addEventListener('input', () => render(+slider.value));
  render(+slider.value);
}

export async function initForestComposition(container) {
  if (!container) throw new Error('initForestComposition: container is required');
  const { compRows } = await loadForestData();
  const d3 = window.d3;
  container.replaceChildren();
  const id = `forest-comp-${Math.random().toString(36).slice(2, 8)}`;
  container.innerHTML = `<div class="${id}"><svg></svg></div>`;
  mountScopedStyle(container, `.${id} svg{width:100%;height:460px}`);
  const svg = d3.select(container.querySelector(`.${id} svg`));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  const margin = { top: 20, right: 20, bottom: 90, left: 70 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const rows = compRows.filter((r) => +r.Year === 2020 && r.Code?.length === 3)
    .map((r) => ({ name: r.Entity, natural: +r['Naturally regenerating and primary forest'] || 0, planted: +r['Planted forest'] || 0 }))
    .sort((a, b) => (b.natural + b.planted) - (a.natural + a.planted))
    .slice(0, 12);
  const x = d3.scaleBand(rows.map((d) => d.name), [0, innerW]).padding(0.2);
  const y = d3.scaleLinear([0, d3.max(rows, (d) => d.natural + d.planted) || 1], [innerH, 0]).nice();
  g.selectAll('.n').data(rows).join('rect').attr('x', (d) => x(d.name)).attr('y', (d) => y(d.natural)).attr('width', x.bandwidth()).attr('height', (d) => innerH - y(d.natural)).attr('fill', '#145214');
  g.selectAll('.p').data(rows).join('rect').attr('x', (d) => x(d.name)).attr('y', (d) => y(d.natural + d.planted)).attr('width', x.bandwidth()).attr('height', (d) => y(d.natural) - y(d.natural + d.planted)).attr('fill', '#7fc97f');
  g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x)).selectAll('text').attr('transform', 'rotate(-32)').style('text-anchor', 'end');
  g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('~s')));
}

export async function initForestRanking(container) {
  if (!container) throw new Error('initForestRanking: container is required');
  const { changeRows } = await loadForestData();
  const d3 = window.d3;
  container.replaceChildren();
  const id = `forest-rank-${Math.random().toString(36).slice(2, 8)}`;
  container.innerHTML = `<div class="${id}"><svg></svg></div>`;
  mountScopedStyle(container, `.${id} svg{width:100%;height:460px}`);
  const svg = d3.select(container.querySelector(`.${id} svg`));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  const margin = { top: 20, right: 30, bottom: 30, left: 150 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const rows = changeRows.filter((r) => +r.Year === 2020 && r.Code?.length === 3)
    .map((r) => ({ name: r.Entity, v: +r['Annual change in forest area'] || 0 }))
    .sort((a, b) => Math.abs(b.v) - Math.abs(a.v))
    .slice(0, 16);
  const y = d3.scaleBand(rows.map((d) => d.name), [0, innerH]).padding(0.16);
  const maxAbs = d3.max(rows, (d) => Math.abs(d.v)) || 1;
  const x = d3.scaleLinear([-maxAbs, maxAbs], [0, innerW]);
  g.append('line').attr('x1', x(0)).attr('x2', x(0)).attr('y1', 0).attr('y2', innerH).attr('stroke', '#666');
  g.selectAll('rect').data(rows).join('rect').attr('x', (d) => x(Math.min(0, d.v))).attr('y', (d) => y(d.name)).attr('width', (d) => Math.abs(x(d.v) - x(0))).attr('height', y.bandwidth()).attr('fill', (d) => (d.v >= 0 ? '#2b8c2b' : '#d9534f'));
  g.append('g').call(d3.axisLeft(y));
  g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(6).tickFormat(d3.format('~s')));
}

export async function initForestMatrix(container) {
  if (!container) throw new Error('initForestMatrix: container is required');
  const { coverRows, areaRows, changeRows } = await loadForestData();
  await ensureD3();
  const d3 = window.d3;
  container.replaceChildren();
  const id = `forest-matrix-${Math.random().toString(36).slice(2, 8)}`;
  container.innerHTML = `<div class="${id}"><svg></svg></div>`;
  mountScopedStyle(container, `.${id} svg{width:100%;height:460px}`);
  const svg = d3.select(container.querySelector(`.${id} svg`));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  const margin = { top: 20, right: 20, bottom: 40, left: 55 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const y0 = 2020;
  const share = new Map(coverRows.filter((r) => +r.Year === y0 && r.Code?.length === 3).map((r) => [r.Code, +r['Share of land covered by forest']]));
  const area = new Map(areaRows.filter((r) => +r.Year === y0 && r.Code?.length === 3).map((r) => [r.Code, +r['Forest area']]));
  const change = new Map(changeRows.filter((r) => +r.Year === y0 && r.Code?.length === 3).map((r) => [r.Code, +r['Annual change in forest area']]));
  const pts = [...share.entries()].map(([code, s]) => ({ code, s, a: area.get(code) || 0, c: change.get(code) || 0 })).filter((d) => Number.isFinite(d.s) && d.a > 0).slice(0, 80);

  const x = d3.scaleLinear([0, d3.max(pts, (d) => d.s) || 100], [0, innerW]).nice();
  const y = d3.scaleLinear(d3.extent(pts, (d) => d.c)).range([innerH, 0]).nice();
  const r = d3.scaleSqrt([0, d3.max(pts, (d) => d.a) || 1], [2, 20]);
  g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x));
  g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('~s')));
  g.selectAll('circle').data(pts).join('circle').attr('cx', (d) => x(d.s)).attr('cy', (d) => y(d.c)).attr('r', (d) => r(d.a)).attr('fill', (d) => (d.c >= 0 ? 'rgba(43,140,43,0.55)' : 'rgba(217,83,79,0.55)')).attr('stroke', '#333').attr('stroke-width', 0.5);
}
