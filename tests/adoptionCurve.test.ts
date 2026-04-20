import { describe, it, expect } from "vitest";
import { calculateAdoptionCurve } from "../src/models/adoptionCurve";

describe("calculateAdoptionCurve", () => {
  const params = {
    maxAdoptionRate: 0.85,
    speed: 0.6,
    centerYear: 2029,
    startYear: 2025,
    endYear: 2035,
  };

  it("導入率は0〜最大導入率の範囲に収まる", () => {
    const result = calculateAdoptionCurve(params);
    result.forEach((p) => {
      expect(p.adoptionRate).toBeGreaterThanOrEqual(0);
      expect(p.adoptionRate).toBeLessThanOrEqual(params.maxAdoptionRate);
    });
  });

  it("導入率は単調増加する (成長速度>0)", () => {
    const result = calculateAdoptionCurve(params);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].adoptionRate).toBeGreaterThan(result[i - 1].adoptionRate);
    }
  });

  it("普及中心年で導入率はちょうど L/2", () => {
    const result = calculateAdoptionCurve(params);
    const center = result.find((p) => p.year === params.centerYear);
    expect(center?.adoptionRate).toBeCloseTo(params.maxAdoptionRate / 2, 5);
  });

  it("フェーズ判定 (初期・成長期・成熟期) が機能する", () => {
    const result = calculateAdoptionCurve(params);
    const phases = new Set(result.map((p) => p.phase));
    expect(phases.size).toBeGreaterThanOrEqual(2);
  });

  it("終了年が開始年より前なら空配列", () => {
    const result = calculateAdoptionCurve({
      ...params,
      startYear: 2035,
      endYear: 2030,
    });
    expect(result).toEqual([]);
  });
});
