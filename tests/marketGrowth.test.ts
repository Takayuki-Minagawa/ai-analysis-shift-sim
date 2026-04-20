import { describe, it, expect } from "vitest";
import { calculateMarketGrowth } from "../src/models/marketGrowth";

describe("calculateMarketGrowth", () => {
  it("成長率0%の場合、市場規模は一定", () => {
    const result = calculateMarketGrowth({
      initialMarketSize: 100,
      startYear: 2025,
      endYear: 2030,
      growthRate: 0,
    });
    expect(result).toHaveLength(6);
    result.forEach((p) => expect(p.marketSize).toBeCloseTo(100, 5));
  });

  it("成長率が正の場合、市場規模は単調増加する", () => {
    const result = calculateMarketGrowth({
      initialMarketSize: 100,
      startYear: 2025,
      endYear: 2030,
      growthRate: 0.1,
    });
    for (let i = 1; i < result.length; i++) {
      expect(result[i].marketSize).toBeGreaterThan(result[i - 1].marketSize);
    }
  });

  it("複利計算が正しい (10%成長, 1年後)", () => {
    const result = calculateMarketGrowth({
      initialMarketSize: 100,
      startYear: 2025,
      endYear: 2026,
      growthRate: 0.1,
    });
    expect(result[1].marketSize).toBeCloseTo(110, 5);
  });

  it("終了年が開始年より前なら空配列", () => {
    const result = calculateMarketGrowth({
      initialMarketSize: 100,
      startYear: 2030,
      endYear: 2025,
      growthRate: 0.1,
    });
    expect(result).toEqual([]);
  });
});
