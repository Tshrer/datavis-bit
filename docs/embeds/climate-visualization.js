import { ensureVega } from './lib-loader.js';

export async function initCumulativeLine(container, {
  dataUrl = './climate-visualization/data.csv',
  height = 450,
} = {}) {
  if (!container) throw new Error('initCumulativeLine: container is required');

  await ensureVega();

  // Avoid future ID collisions by rendering into the passed container.
  // Vega-Embed accepts an element.
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height,
    data: { url: dataUrl },
    params: [
      {
        name: 'selectCountry',
        select: { type: 'point', fields: ['Entity'] },
      },
    ],
    transform: [
      {
        filter: {
          field: 'Entity',
          oneOf: [
            'United States', 'China', 'India', 'Russia',
            'Japan', 'Germany', 'United Kingdom',
            'Canada', 'Brazil', 'France',
          ],
        },
      },
    ],
    mark: { type: 'line', strokeWidth: 3 },
    encoding: {
      x: { field: 'Year', type: 'quantitative', title: 'Year' },
      y: {
        field: 'Cumulative CO2 emissions',
        type: 'quantitative',
        title: 'Cumulative CO₂ Emissions',
      },
      color: { field: 'Entity' },
      opacity: { condition: { param: 'selectCountry', value: 1 }, value: 0.7 },
      tooltip: [
        { field: 'Entity' },
        { field: 'Year' },
        { field: 'Cumulative CO2 emissions' },
      ],
    },
    config: {
      axis: { labelFontSize: 14, titleFontSize: 14 },
      legend: { labelFontSize: 12, titleFontSize: 12 },
    },
  };

  // Clear container so reruns are idempotent.
  container.replaceChildren();

  // eslint-disable-next-line no-undef
  await window.vegaEmbed(container, spec, { actions: false });
}

export async function initAnnualShareBar(container, {
  dataUrl = './climate-visualization/data.csv',
  height = 350,
  year = 2000,
  minYear = 1850,
  maxYear = 2023,
} = {}) {
  if (!container) throw new Error('initAnnualShareBar: container is required');

  await ensureVega();

  const params = [
    {
      name: 'yearSlider',
      value: year,
      bind: {
        input: 'range',
        min: minYear,
        max: maxYear,
        step: 1,
      },
    },
    {
      name: 'selectCountry',
      select: { type: 'point', fields: ['Entity'] },
    },
  ];

  const baseTransform = [
    {
      filter: {
        field: 'Entity',
        oneOf: [
          'United States', 'China', 'India', 'Russia',
          'Japan', 'Germany', 'United Kingdom',
          'Canada', 'Brazil', 'France',
        ],
      },
    },
  ];

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height,
    data: { url: dataUrl },
    params,
    transform: [
      ...baseTransform,
      { filter: 'datum.Year == yearSlider' },
      { joinaggregate: [{ op: 'sum', field: 'Annual CO2 emissions', as: 'total' }] },
      { calculate: "datum['Annual CO2 emissions'] / datum.total * 100", as: 'share' },
    ],
    mark: { type: 'bar', cornerRadiusTopLeft: 6, cornerRadiusTopRight: 6 },
    encoding: {
      x: {
        field: 'Entity',
        type: 'nominal',
        sort: '-y',
        axis: { labelAngle: -25 },
      },
      y: {
        field: 'share',
        type: 'quantitative',
        title: 'Share of Global Emissions (%)',
      },
      color: {
        condition: { param: 'selectCountry', field: 'Entity' },
        value: '#bbb',
      },
      tooltip: [
        { field: 'Entity' },
        { field: 'share', title: 'Share (%)' },
      ],
    },
    config: {
      axis: { labelFontSize: 14, titleFontSize: 14 },
      legend: { labelFontSize: 12, titleFontSize: 12 },
    },
  };

  container.replaceChildren();

  // eslint-disable-next-line no-undef
  await window.vegaEmbed(container, spec, { actions: false });
}
