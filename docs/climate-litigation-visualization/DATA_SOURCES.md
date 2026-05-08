# 气候诉讼可视化数据集说明

## 数据集版本
- **更新日期**: 2026年5月7日
- **数据覆盖**: 1986-2025年
- **总案例数**: 50个典型案例 + 40个国家统计 + 年度趋势数据

---

## 一、权威数据来源

### 1. Sabin Center for Climate Change Law ⭐⭐⭐⭐⭐
| 项目 | 内容 |
|------|------|
| **机构** | 哥伦比亚大学法学院 |
| **网址** | https://climatecasechart.com/ |
| **数据量** | 3,000+ 案例，55+ 司法管辖区 |
| **更新频率** | 每月更新 |
| **下载格式** | 在线数据库，2025版支持CSV导出 |

### 2. UNEP 全球气候诉讼报告 ⭐⭐⭐⭐⭐
| 项目 | 内容 |
|------|------|
| **机构** | 联合国环境规划署 |
| **网址** | https://www.unep.org/ |
| **报告** | Global Climate Litigation Report 2025 Status Review |
| **数据量** | 3,000+ 案例 |
| **下载** | https://www.preventionweb.net/publication/documents-and-publications/global-climate-litigation-report-2025-status-review |

### 3. Grantham Research Institute (LSE) ⭐⭐⭐⭐⭐
| 项目 | 内容 |
|------|------|
| **机构** | 伦敦政治经济学院 |
| **网址** | https://www.lse.ac.uk/granthaminstitute |
| **数据集** | Global Climate Change Litigation database |
| **格式** | CSV |
| **下载** | https://opennetzero.org/808cdd23-e2d9-46f6-bf52-e004edf536c8/global-climate-change-litigation-database |

### 4. Climate Policy Radar ⭐⭐⭐⭐
| 项目 | 内容 |
|------|------|
| **网址** | https://www.climatepolicyradar.org/ |
| **特点** | 与Sabin Center合作，AI增强版数据 |
| **下载** | 支持搜索结果和完整数据库下载 |

---

## 二、本地数据集文件

### 文件清单

| 文件名 | 记录数 | 主要字段 |
|--------|--------|----------|
| `climate_litigation_cases.csv` | 50个案例 | 案例名称、年份、国家、原告/被告类型、结果、关键议题 |
| `climate_litigation_by_country.csv` | 40个国家 | 国家、地区、案件数、各类占比、地标案件 |
| `climate_litigation_trend.csv` | 40年 | 年度数据、新增案件、累计案件、分类统计 |

---

## 三、数据字段说明

### 3.1 climate_litigation_cases.csv

| 字段名 | 中文说明 | 示例 |
|--------|----------|------|
| case_id | 案例编号 | 1 |
| case_name | 案例名称 | Massachusetts v. EPA |
| year_filed | 立案年份 | 2003 |
| country | 国家 | 美国 |
| region | 地区 | 北美 |
| case_type | 案件类型 | 民事诉讼/司法审查/行政诉讼 |
| plaintiff_type | 原告类型 | 州政府/非政府组织/青年个人 |
| defendant_type | 被告类型 | 联邦政府/企业/多国政府 |
| case_outcome | 案件结果 | 原告胜诉/被告胜诉/和解/审理中 |
| key_issue | 关键议题 | 政府监管义务/减排目标/人权 |
| litigation_basis | 诉讼依据 | 宪法/清洁空气法/人权法 |
| case_number | 案例编号 | 549 U.S. 497 |
| court | 受理法院 | 美国最高法院 |
| climate_relevance | 气候相关性 | 直接相关/间接相关 |
| emissions_sector | 排放行业 | 能源/化石燃料/全行业 |

### 3.2 climate_litigation_by_country.csv

| 字段名 | 中文说明 | 示例 |
|--------|----------|------|
| country | 国家(中文) | 美国 |
| country_en | 国家(英文) | United States |
| iso3 | ISO代码 | USA |
| region | 地区 | 北美 |
| cases_count | 案件数量 | 1280 |
| growth_rate_2023 | 2023年增长率 | 0.12 |
| plaintiff_govt_pct | 政府原告占比 | 0.18 |
| plaintiff_individual_pct | 个人原告占比 | 0.35 |
| plaintiff_ngo_pct | NGO原告占比 | 0.22 |
| plaintiff_youth_pct | 青年原告占比 | 0.12 |
| defendant_govt_pct | 政府被告占比 | 0.52 |
| defendant_fossil_pct | 化石燃料被告占比 | 0.18 |
| plaintiff_win_pct | 原告胜诉率 | 0.22 |
| landmark_case | 是否有里程碑案件 | 1 |
| key_case_name | 关键案例 | Massachusetts v. EPA |

### 3.3 climate_litigation_trend.csv

| 字段名 | 中文说明 | 单位 |
|--------|----------|------|
| year | 年份 | 年 |
| total_cases | 年度新增案件 | 起 |
| new_cases | 当年新增 | 起 |
| cumulative_cases | 累计案件 | 起 |
| us_cases | 美国案件 | 起 |
| non_us_cases | 非美国案件 | 起 |
| govt_defendant_cases | 起诉政府案件 | 起 |
| fossil_defendant_cases | 起诉化石燃料案件 | 起 |
| plaintiff_win_cases | 原告胜诉案件 | 起 |
| youth_plaintiff_cases | 青年原告案件 | 起 |
| ngo_plaintiff_cases | NGO原告案件 | 起 |
| landmark_cases | 里程碑案件 | 起 |

---

## 四、如何获取最新数据

### 方法1: Sabin Center 数据库 (推荐)
1. 访问 https://climatecasechart.com/
2. 使用搜索和筛选功能
3. 2025年新版本支持直接下载数据

### 方法2: Climate Policy Radar
1. 访问 https://www.climatepolicyradar.org/
2. 搜索或浏览气候诉讼数据
3. 支持按地区、议题、年份筛选
4. 下载搜索结果或完整数据集

### 方法3: Open Net Zero (Grantham数据集)
1. 访问 https://opennetzero.org/
2. 搜索 "Grantham Research Institute"
3. 下载 Global Climate Change Litigation database (CSV)

### 方法4: UNEP 报告附件
1. 访问 https://www.preventionweb.net/
2. 搜索 "Global Climate Litigation Report"
3. 下载PDF报告及数据附件

---

## 五、数据使用建议

### 5.1 引用格式

**APA格式:**
```
Sabin Center for Climate Change Law. (2025). Climate Litigation Database. 
Columbia Law School. Retrieved May 7, 2026, from https://climatecasechart.com/

UNEP. (2025). Global Climate Litigation Report: 2025 Status Review. 
United Nations Environment Programme.
```

**中文格式:**
```
哥伦比亚大学萨宾气候变化法律中心。(2025). 气候诉讼数据库.
climatecasechart.com

联合国环境规划署。(2025). 全球气候诉讼报告：2025年状况审查.
```

### 5.2 数据验证建议

1. 交叉验证多个来源的数据
2. 重要数据请查阅原始文献
3. 关注数据更新日期
4. 记录数据下载时间

### 5.3 数据局限性

- 部分发展中国家数据可能不完整
- 案件分类标准可能因机构而异
- "进行中"案件数量持续变化
- 建议定期更新至最新版本

---

## 六、相关资源链接

| 资源 | 网址 |
|------|------|
| Sabin Center 主页 | https://climate.law.columbia.edu/ |
| UNEP 气候行动 | https://www.unep.org/explore-topics/climate-action |
| Grantham Institute | https://www.lse.ac.uk/granthaminstitute |
| Climate Policy Radar | https://www.climatepolicyradar.org/ |
| 气候诉讼同行评审网络 | https://climate-litigation-peerreview.net/ |

---

## 七、数据文件更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-05-07 | 1.0 | 初始版本：3个CSV文件，共50个案例详情，40个国家统计，40年趋势数据 |

---

*文档生成时间: 2026年5月7日*
