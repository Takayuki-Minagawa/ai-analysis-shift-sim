export type CostBenefitParams = {
  minCases: number;
  maxCases: number;
  step: number;
  humanFixedCost: number;
  humanCostPerCase: number;
  humanRevenuePerCase: number;
  aiFixedCost: number;
  aiCostPerCase: number;
  aiRevenuePerCase: number;
};

export type CostBenefitPoint = {
  monthlyCases: number;
  humanTotalCost: number;
  humanRevenue: number;
  humanProfit: number;
  humanAverageCost: number;
  aiTotalCost: number;
  aiRevenue: number;
  aiProfit: number;
  aiAverageCost: number;
  aiAdvantage: number;
};

export function calculateCostBenefit(params: CostBenefitParams): CostBenefitPoint[] {
  const results: CostBenefitPoint[] = [];
  const {
    minCases,
    maxCases,
    step,
    humanFixedCost,
    humanCostPerCase,
    humanRevenuePerCase,
    aiFixedCost,
    aiCostPerCase,
    aiRevenuePerCase,
  } = params;
  if (step <= 0 || maxCases < minCases) return results;
  for (let monthlyCases = minCases; monthlyCases <= maxCases; monthlyCases += step) {
    const humanTotalCost = humanFixedCost + humanCostPerCase * monthlyCases;
    const humanRevenue = humanRevenuePerCase * monthlyCases;
    const humanProfit = humanRevenue - humanTotalCost;
    const aiTotalCost = aiFixedCost + aiCostPerCase * monthlyCases;
    const aiRevenue = aiRevenuePerCase * monthlyCases;
    const aiProfit = aiRevenue - aiTotalCost;
    results.push({
      monthlyCases,
      humanTotalCost,
      humanRevenue,
      humanProfit,
      humanAverageCost: monthlyCases === 0 ? 0 : humanTotalCost / monthlyCases,
      aiTotalCost,
      aiRevenue,
      aiProfit,
      aiAverageCost: monthlyCases === 0 ? 0 : aiTotalCost / monthlyCases,
      aiAdvantage: aiProfit - humanProfit,
    });
  }
  return results;
}

export function findBreakEvenCases(
  fixedCost: number,
  costPerCase: number,
  revenuePerCase: number,
): number | null {
  const margin = revenuePerCase - costPerCase;
  if (margin <= 0) return null;
  return fixedCost / margin;
}

export function findCrossoverCases(params: {
  humanFixedCost: number;
  humanCostPerCase: number;
  humanRevenuePerCase: number;
  aiFixedCost: number;
  aiCostPerCase: number;
  aiRevenuePerCase: number;
}): number | null {
  const humanMargin = params.humanRevenuePerCase - params.humanCostPerCase;
  const aiMargin = params.aiRevenuePerCase - params.aiCostPerCase;
  const diffMargin = aiMargin - humanMargin;
  if (diffMargin === 0) return null;
  const diffFixed = params.aiFixedCost - params.humanFixedCost;
  const crossover = diffFixed / diffMargin;
  return crossover > 0 ? crossover : null;
}
