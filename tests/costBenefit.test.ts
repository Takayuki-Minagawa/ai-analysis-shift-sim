import { describe, it, expect } from "vitest";
import {
  calculateCostBenefit,
  findBreakEvenCases,
  findCrossoverCases,
} from "../src/models/costBenefit";

const baseParams = {
  minCases: 100,
  maxCases: 5000,
  step: 100,
  humanFixedCost: 500000,
  humanCostPerCase: 8000,
  humanRevenuePerCase: 12000,
  aiFixedCost: 3000000,
  aiCostPerCase: 1200,
  aiRevenuePerCase: 8000,
};

describe("calculateCostBenefit", () => {
  it("件数が増えると平均コスト(固定費あり)は下がる", () => {
    const result = calculateCostBenefit(baseParams);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].aiAverageCost).toBeLessThan(result[i - 1].aiAverageCost);
      expect(result[i].humanAverageCost).toBeLessThan(result[i - 1].humanAverageCost);
    }
  });

  it("利益計算が正しい (人手, 1000件)", () => {
    const result = calculateCostBenefit({ ...baseParams, minCases: 1000, maxCases: 1000 });
    const p = result[0];
    expect(p.humanRevenue).toBe(12000 * 1000);
    expect(p.humanTotalCost).toBe(500000 + 8000 * 1000);
    expect(p.humanProfit).toBe(p.humanRevenue - p.humanTotalCost);
  });

  it("不正なstep=0なら空配列", () => {
    const result = calculateCostBenefit({ ...baseParams, step: 0 });
    expect(result).toEqual([]);
  });
});

describe("findBreakEvenCases", () => {
  it("固定費 / 限界利益", () => {
    // human: 500000 / (12000 - 8000) = 125
    expect(findBreakEvenCases(500000, 8000, 12000)).toBe(125);
  });

  it("限界利益が0以下ならnull", () => {
    expect(findBreakEvenCases(500000, 12000, 12000)).toBeNull();
    expect(findBreakEvenCases(500000, 15000, 12000)).toBeNull();
  });
});

describe("findCrossoverCases", () => {
  it("人手とAIの利益が一致する件数が返る", () => {
    // human margin 4000, ai margin 6800. fixed diff = 2500000. cross = 2500000/2800 ≈ 892.86
    const cross = findCrossoverCases(baseParams);
    expect(cross).not.toBeNull();
    expect(cross).toBeCloseTo(2500000 / 2800, 2);
  });

  it("限界利益差が0ならnull", () => {
    const cross = findCrossoverCases({
      ...baseParams,
      aiCostPerCase: baseParams.aiRevenuePerCase - (baseParams.humanRevenuePerCase - baseParams.humanCostPerCase),
    });
    expect(cross).toBeNull();
  });
});
