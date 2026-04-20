export type MarketGrowthParams = {
  initialMarketSize: number;
  startYear: number;
  endYear: number;
  growthRate: number;
};

export type MarketGrowthPoint = {
  year: number;
  marketSize: number;
};

export function calculateMarketGrowth(params: MarketGrowthParams): MarketGrowthPoint[] {
  const results: MarketGrowthPoint[] = [];
  const { initialMarketSize, startYear, endYear, growthRate } = params;
  if (endYear < startYear) return results;
  for (let year = startYear; year <= endYear; year++) {
    const yearIndex = year - startYear;
    const marketSize = initialMarketSize * Math.pow(1 + growthRate, yearIndex);
    results.push({ year, marketSize });
  }
  return results;
}

export function calculateMultiScenarioGrowth(
  baseParams: Omit<MarketGrowthParams, "growthRate">,
  scenarios: { id: string; label: string; growthRate: number }[],
) {
  return scenarios.map((s) => ({
    id: s.id,
    label: s.label,
    growthRate: s.growthRate,
    series: calculateMarketGrowth({ ...baseParams, growthRate: s.growthRate }),
  }));
}
