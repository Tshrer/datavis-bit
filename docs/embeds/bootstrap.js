import { initAnnualShareBar, initCumulativeLine } from './climate-visualization.js';
import { initIsolatedIframe } from './iframe-embed.js';

function mustGet(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

async function main() {
  // 1) 累计 CO2 折线图
  await initCumulativeLine(mustGet('#embed-cv-cumulative-line'));

  // 2) 年度占比柱状图
  await initAnnualShareBar(mustGet('#embed-cv-annual-share-bar'));

  // 3+) 其余图表使用原图表页面，保证原有交互逻辑不变。
  initIsolatedIframe(mustGet('#embed-vulnerability-radar'), {
    src: './charts/climate-vulnerability-globe/radar.html',
    title: '全球环境脆弱度（3D地球与雷达联动）',
    minHeight: 720,
  });
  initIsolatedIframe(mustGet('#embed-forest-map'), {
    src: './charts/forest/map.html',
    title: '全球森林覆盖率/面积地图',
    minHeight: 500,
  });
  initIsolatedIframe(mustGet('#embed-forest-composition'), {
    src: './charts/forest/composition.html',
    title: '天然林 vs 人工林（对比）',
    minHeight: 800,
  });
  initIsolatedIframe(mustGet('#embed-forest-ranking'), {
    src: './charts/forest/ranking.html',
    title: '森林净变化排名（发散条形）',
    minHeight: 800,
  });
  initIsolatedIframe(mustGet('#embed-forest-matrix'), {
    src: './charts/forest/matrix.html',
    title: '森林碳汇潜力矩阵（气泡）',
    minHeight: 500,
  });
  initIsolatedIframe(mustGet('#embed-litigation-map'), {
    src: './charts/climate-litigation-visualization/map.html',
    title: '全球气候诉讼分布地图',
  });
  initIsolatedIframe(mustGet('#embed-litigation-trend'), {
    src: './charts/climate-litigation-visualization/trend.html',
    title: '气候诉讼趋势图',
  });
  initIsolatedIframe(mustGet('#embed-patents-map'), {
    src: './charts/green-low-carbon-patents/map.html',
    title: '绿色低碳专利分布地图',
  });
  initIsolatedIframe(mustGet('#embed-patents-bar'), {
    src: './charts/green-low-carbon-patents/bar.html',
    title: '绿色低碳专利分组条形图',
  });
  initIsolatedIframe(mustGet('#embed-patents-sankey'), {
    src: './charts/green-low-carbon-patents/sankey.html',
    title: '国际技术转让流向桑基图',
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    main().catch(console.error);
  });
} else {
  main().catch(console.error);
}
