import type { MarketScenario } from "../types/scenario";

export const DEFAULT_MARKET_SCENARIOS: MarketScenario[] = [
  {
    id: "conservative",
    label: "Conservative",
    description: "規制・人材不足により成長が緩やかなケース",
    growthRate: 0.08,
  },
  {
    id: "base",
    label: "Base",
    description: "AI活用が一般化し、安定成長するケース",
    growthRate: 0.15,
  },
  {
    id: "aggressive",
    label: "Aggressive",
    description: "AIエージェントと自動化が急速に普及するケース",
    growthRate: 0.25,
  },
];

export const DEFAULT_MARKET_BASE = {
  initialMarketSize: 100,
  startYear: 2025,
  endYear: 2035,
};
