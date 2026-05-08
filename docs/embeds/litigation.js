import { ensureD3, ensureTopojson } from './lib-loader.js';

const litigationData = [
  { country: '美国', iso3: 'USA', cases: 5185, lon: -98.5, lat: 39.8 },
  { country: '澳大利亚', iso3: 'AUS', cases: 685, lon: 133.7, lat: -25.2 },
  { country: '巴西', iso3: 'BRA', cases: 423, lon: -51.9, lat: -14.2 },
  { country: '英国', iso3: 'GBR', cases: 398, lon: -3.4, lat: 55.3 },
  { country: '德国', iso3: 'DEU', cases: 287, lon: 10.4, lat: 51.1 },
  { country: '中国', iso3: 'CHN', cases: 32, lon: 104.1, lat: 35.8 },
];

const trendData = [
  { year: 1986, cases: 1 }, { year: 1994, cases: 7 }, { year: 2002, cases: 45 }, { year: 2010, cases: 320 }, { year: 2018, cases: 1780 }, { year: 2025, cases: 9177 },
];

let worldAtlas = null;

export async function initLitigationMap(container) {
  if (!container) throw new Error('initLitigationMap: container is required');
  await ensureTopojson();
  const d3 = window.d3;
  const topojson = window.topojson;
  container.replaceChildren();
  container.innerHTML = '<svg class="nv-lm"></svg>';
  const svg = d3.select(container.querySelector('svg'));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`).style('width', '100%').style('height', '460px');
  if (!worldAtlas) worldAtlas = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  const countries = topojson.feature(worldAtlas, worldAtlas.objects.countries);
  const projection = d3.geoMercator().fitSize([width, height], countries);
  const path = d3.geoPath(projection);
  svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#0f1f33');
  svg.append('g').selectAll('path').data(countries.features).join('path').attr('d', path).attr('fill', '#27456b').attr('stroke', '#355677').attr('stroke-width', 0.4);
  const size = d3.scaleSqrt([1, d3.max(litigationData, (d) => d.cases) || 1], [3, 25]);
  svg.append('g').selectAll('circle').data(litigationData).join('circle')
    .attr('cx', (d) => projection([d.lon, d.lat])[0]).attr('cy', (d) => projection([d.lon, d.lat])[1]).attr('r', (d) => size(d.cases))
    .attr('fill', 'rgba(249,115,22,0.72)').attr('stroke', '#fff').attr('stroke-width', 1);
}

export async function initLitigationTrend(container) {
  if (!container) throw new Error('initLitigationTrend: container is required');
  await ensureD3();
  const d3 = window.d3;
  container.replaceChildren();
  container.innerHTML = '<svg class="nv-lt"></svg>';
  const svg = d3.select(container.querySelector('svg'));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`).style('width', '100%').style('height', '460px');
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const cumulative = [];
  let sum = 0;
  trendData.forEach((d) => { sum += d.cases; cumulative.push({ year: d.year, v: sum }); });
  const x = d3.scaleLinear(d3.extent(cumulative, (d) => d.year), [0, innerW]);
  const y = d3.scaleLinear([0, d3.max(cumulative, (d) => d.v) || 1], [innerH, 0]).nice();
  g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).tickFormat(d3.format('d')));
  g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('~s')));
  const line = d3.line().x((d) => x(d.year)).y((d) => y(d.v)).curve(d3.curveMonotoneX);
  g.append('path').datum(cumulative).attr('fill', 'none').attr('stroke', '#f97316').attr('stroke-width', 3).attr('d', line);
  g.selectAll('circle').data(cumulative).join('circle').attr('cx', (d) => x(d.year)).attr('cy', (d) => y(d.v)).attr('r', 4).attr('fill', '#f97316');
}
