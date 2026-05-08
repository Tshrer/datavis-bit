# Forest area by type: naturally regenerating vs. planted - Data package

This data package contains the data that powers the chart ["Forest area by type: naturally regenerating vs. planted"](https://ourworldindata.org/grapher/forest-area-primary-planted?v=1&csvType=full&useColumnShortNames=false) on the Our World in Data website.

## CSV Structure

The high level structure of the CSV file is that each row is an observation for an entity (usually a country or region) and a timepoint (usually a year).

The first two columns in the CSV file are "Entity" and "Code". "Entity" is the name of the entity (e.g. "United States"). "Code" is the OWID internal entity code that we use if the entity is a country or region. For most countries, this is the same as the [iso alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code of the entity (e.g. "USA") - for non-standard countries like historical countries these are custom codes.

The third column is either "Year" or "Day". If the data is annual, this is "Year" and contains only the year as an integer. If the column is "Day", the column contains a date string in the form "YYYY-MM-DD".

The remaining columns are the data columns, each of which is a time series. If the CSV data is downloaded using the "full data" option, then each column corresponds to one time series below. If the CSV data is downloaded using the "only selected data visible in the chart" option then the data columns are transformed depending on the chart type and thus the association with the time series might not be as straightforward.


## Metadata.json structure

The .metadata.json file contains metadata about the data package. The "charts" key contains information to recreate the chart, like the title, subtitle etc.. The "columns" key contains information about each of the columns in the csv, like the unit, timespan covered, citation for the data etc..

## About the data

Our World in Data is almost never the original producer of the data - almost all of the data we use has been compiled by others. If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license and to credit them correctly. Please note that a single time series may have more than one source - e.g. when we stich together data from different time periods by different producers or when we calculate per capita metrics using population data from a second source.

### How we process data at Our World In Data
All data and visualizations on Our World in Data rely on data sourced from one or several original data providers. Preparing this original data involves several processing steps. Depending on the data, this can include standardizing country names and world region definitions, converting units, calculating derived indicators such as per capita measures, as well as adding or adapting metadata such as the name or the description given to an indicator.
[Read about our data pipeline](https://docs.owid.io/projects/etl/)

## Detailed information about each time series


## Area of planted forest – UN FAO
Last updated: February 25, 2026  
Next update: February 2027  
Date range: 1990–2025  
Unit: hectares  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World in Data

#### Full citation
Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World in Data. “Area of planted forest – UN FAO” [dataset]. Food and Agriculture Organization of the United Nations, “Land, Inputs and Sustainability: Land Use” [original data].
Source: Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World In Data

### How is this data described by its producer - Food and Agriculture Organization of the United Nations (2025)?
Item: Planted Forest

Description: Forest predominantly composed of trees established through planting and/or deliberate seeding.Explanatory notes1. In this context, predominantly means that the planted/seeded trees are expected to constitute more than 50 percent of the growing stock at maturity. 2. Includes coppice from trees that were originally planted or seeded.

Metric: Area

Description: Extent of surface of land or water.

### Source

#### Food and Agriculture Organization of the United Nations – Land, Inputs and Sustainability: Land Use
Retrieved on: 2026-02-25  
Retrieved from: http://www.fao.org/faostat/en/#data/RL  


## Area of naturally regenerating forest – UN FAO
Last updated: February 25, 2026  
Next update: February 2027  
Date range: 1990–2025  
Unit: hectares  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World in Data

#### Full citation
Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World in Data. “Area of naturally regenerating forest – UN FAO” [dataset]. Food and Agriculture Organization of the United Nations, “Land, Inputs and Sustainability: Land Use” [original data].
Source: Food and Agriculture Organization of the United Nations (2025) – with major processing by Our World In Data

### How is this data described by its producer - Food and Agriculture Organization of the United Nations (2025)?
Item: Naturally regenerating forest

Description: Forest predominantly composed of trees established through natural regeneration.Explanatory notes1. Includes forests for which it is not possible to distinguish whether planted or naturally regenerated. 2. Includes forests with a mix of naturally regenerated native tree species and planted/seeded trees, and where the naturally regenerated trees are expected to constitute the major part of the growing stock at stand maturity. 3. Includes coppice from trees originally established through natural regeneration. 4. Includes naturally regenerated trees of introduced species.

Metric: Area

Description: Extent of surface of land or water.

### Source

#### Food and Agriculture Organization of the United Nations – Land, Inputs and Sustainability: Land Use
Retrieved on: 2026-02-25  
Retrieved from: http://www.fao.org/faostat/en/#data/RL  


    