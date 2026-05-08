import { ensureD3, ensureD3Sankey, ensureTopojson } from './lib-loader.js';

const patentData = [
  { country: '中国', patents: 243000, lat: 35.8617, lon: 104.1954 },
  { country: '美国', patents: 120000, lat: 37.0902, lon: -95.7129 },
  { country: '日本', patents: 60000, lat: 36.2048, lon: 138.2529 },
  { country: '德国', patents: 40000, lat: 51.1657, lon: 10.4515 },
  { country: '韩国', patents: 30000, lat: 35.9078, lon: 127.7669 },
];
const techSectors = ['储能', '可再生能源', '能效提升', '清洁交通', '温室气体捕集利用封存'];
const countries = ['中国', '美国', '日本', '德国', '韩国'];
const sectorData = [
  { country: '中国', sector: '储能', patents: 15500 }, { country: '中国', sector: '可再生能源', patents: 13200 }, { country: '中国', sector: '能效提升', patents: 9800 }, { country: '中国', sector: '清洁交通', patents: 11200 }, { country: '中国', sector: '温室气体捕集利用封存', patents: 2600 },
  { country: '美国', sector: '储能', patents: 8200 }, { country: '美国', sector: '可再生能源', patents: 7600 }, { country: '美国', sector: '能效提升', patents: 6900 }, { country: '美国', sector: '清洁交通', patents: 6100 }, { country: '美国', sector: '温室气体捕集利用封存', patents: 3500 },
  { country: '日本', sector: '储能', patents: 5400 }, { country: '日本', sector: '可再生能源', patents: 4800 }, { country: '日本', sector: '能效提升', patents: 5200 }, { country: '日本', sector: '清洁交通', patents: 4600 }, { country: '日本', sector: '温室气体捕集利用封存', patents: 1200 },
  { country: '德国', sector: '储能', patents: 2600 }, { country: '德国', sector: '可再生能源', patents: 3100 }, { country: '德国', sector: '能效提升', patents: 3900 }, { country: '德国', sector: '清洁交通', patents: 2800 }, { country: '德国', sector: '温室气体捕集利用封存', patents: 900 },
  { country: '韩国', sector: '储能', patents: 4200 }, { country: '韩国', sector: '可再生能源', patents: 2300 }, { country: '韩国', sector: '能效提升', patents: 2700 }, { country: '韩国', sector: '清洁交通', patents: 2400 }, { country: '韩国', sector: '温室气体捕集利用封存', patents: 700 },
];
const techFlowData = {
  nodes: [{ name: '中国' }, { name: '美国' }, { name: '日本' }, { name: '德国' }, { name: '韩国' }, { name: '非洲' }, { name: '东南亚' }, { name: '南亚' }, { name: '拉美' }],
  links: [
    { source: '中国', target: '非洲', value: 38 }, { source: '中国', target: '东南亚', value: 52 }, { source: '中国', target: '南亚', value: 24 }, { source: '中国', target: '拉美', value: 18 },
    { source: '美国', target: '东南亚', value: 14 }, { source: '美国', target: '拉美', value: 20 },
    { source: '日本', target: '东南亚', value: 12 }, { source: '德国', target: '非洲', value: 9 }, { source: '韩国', target: '南亚', value: 7 },
  ],
};

let worldAtlas = null;

export async function initPatentsMap(container) {
  if (!container) throw new Error('initPatentsMap: container is required');
  await ensureTopojson();
  const d3 = window.d3;
  const topojson = window.topojson;
  container.replaceChildren();
  container.innerHTML = '<svg></svg>';
  const svg = d3.select(container.querySelector('svg'));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`).style('width', '100%').style('height', '460px');
  if (!worldAtlas) worldAtlas = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  const countriesGeo = topojson.feature(worldAtlas, worldAtlas.objects.countries);
  const projection = d3.geoMercator().fitSize([width, height], countriesGeo);
  const path = d3.geoPath(projection);
  svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#123');
  svg.append('g').selectAll('path').data(countriesGeo.features).join('path').attr('d', path).attr('fill', '#305b43').attr('stroke', '#3d6a51').attr('stroke-width', 0.4);
  const size = d3.scaleSqrt([200, d3.max(patentData, (d) => d.patents) || 1], [4, 28]);
  svg.append('g').selectAll('circle').data(patentData).join('circle').attr('cx', (d) => projection([d.lon, d.lat])[0]).attr('cy', (d) => projection([d.lon, d.lat])[1]).attr('r', (d) => size(d.patents)).attr('fill', 'rgba(0,176,155,0.7)').attr('stroke', '#fff').attr('stroke-width', 1);
}

export async function initPatentsBar(container) {
  if (!container) throw new Error('initPatentsBar: container is required');
  await ensureD3();
  const d3 = window.d3;
  container.replaceChildren();
  container.innerHTML = '<svg></svg>';
  const svg = d3.select(container.querySelector('svg'));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`).style('width', '100%').style('height', '460px');
  const margin = { top: 20, right: 20, bottom: 90, left: 55 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x0 = d3.scaleBand(techSectors, [0, innerW]).padding(0.16);
  const x1 = d3.scaleBand(countries, [0, x0.bandwidth()]).padding(0.1);
  const y = d3.scaleLinear([0, d3.max(sectorData, (d) => d.patents) || 1], [innerH, 0]).nice();
  const color = d3.scaleOrdinal(countries, d3.schemeTableau10);
  g.append('g').selectAll('g').data(techSectors).join('g').attr('transform', (s) => `translate(${x0(s)},0)`)
    .selectAll('rect').data((s) => countries.map((c) => sectorData.find((d) => d.country === c && d.sector === s))).join('rect')
    .attr('x', (d) => x1(d.country)).attr('y', (d) => y(d.patents)).attr('width', x1.bandwidth()).attr('height', (d) => innerH - y(d.patents)).attr('fill', (d) => color(d.country));
  g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x0)).selectAll('text').attr('transform', 'rotate(-28)').style('text-anchor', 'end');
  g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d3.format('~s')));
}

export async function initPatentsSankey(container) {
  if (!container) throw new Error('initPatentsSankey: container is required');
  await ensureD3Sankey();
  const d3 = window.d3;
  container.replaceChildren();
  container.innerHTML = '<svg></svg>';
  const svg = d3.select(container.querySelector('svg'));
  const width = Math.max(700, container.clientWidth || 700);
  const height = 460;
  svg.attr('viewBox', `0 0 ${width} ${height}`).style('width', '100%').style('height', '460px');
  const graph = {
    nodes: techFlowData.nodes.map((d) => ({ ...d })),
    links: techFlowData.links.map((d) => ({ ...d })),
  };
  const sankey = d3.sankey().nodeId((d) => d.name).nodeWidth(18).nodePadding(16).extent([[20, 20], [width - 20, height - 20]]);
  sankey(graph);
  svg.append('g').selectAll('path').data(graph.links).join('path')
    .attr('d', d3.sankeyLinkHorizontal()).attr('fill', 'none').attr('stroke', 'rgba(79,172,254,0.45)').attr('stroke-width', (d) => Math.max(1, d.width));
  const node = svg.append('g').selectAll('g').data(graph.nodes).join('g');
  node.append('rect').attr('x', (d) => d.x0).attr('y', (d) => d.y0).attr('width', (d) => d.x1 - d.x0).attr('height', (d) => Math.max(1, d.y1 - d.y0)).attr('fill', '#11998e');
  node.append('text').attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)).attr('y', (d) => (d.y0 + d.y1) / 2).attr('dy', '0.35em').attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end')).attr('font-size', 12).text((d) => d.name);
}
