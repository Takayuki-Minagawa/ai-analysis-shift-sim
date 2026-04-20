import { describe, it, expect } from "vitest";
import { analyzeFunnel, sanitizeFunnelCounts } from "../src/models/funnel";

describe("analyzeFunnel", () => {
  it("pass rate is clamped to [0,1] even when later stage exceeds previous", () => {
    const result = analyzeFunnel([
      { id: "a", label: "A", count: 100 },
      { id: "b", label: "B", count: 150 },
    ]);
    expect(result[1].passRate).toBeLessThanOrEqual(1);
    expect(result[1].passRate).toBeGreaterThanOrEqual(0);
    expect(result[1].dropRate).toBeGreaterThanOrEqual(0);
  });

  it("overallRate stays within [0,1]", () => {
    const result = analyzeFunnel([
      { id: "a", label: "A", count: 10 },
      { id: "b", label: "B", count: 5 },
      { id: "c", label: "C", count: 20 },
    ]);
    result.forEach((r) => {
      expect(r.overallRate).toBeLessThanOrEqual(1);
      expect(r.overallRate).toBeGreaterThanOrEqual(0);
    });
  });
});

describe("sanitizeFunnelCounts", () => {
  it("caps later stages to the prior stage count", () => {
    const out = sanitizeFunnelCounts([
      { id: "a", label: "A", count: 100 },
      { id: "b", label: "B", count: 200 },
      { id: "c", label: "C", count: 50 },
    ]);
    expect(out[1].count).toBe(100);
    expect(out[2].count).toBe(50);
  });

  it("rounds and floors negative inputs to zero", () => {
    const out = sanitizeFunnelCounts([
      { id: "a", label: "A", count: 10.7 },
      { id: "b", label: "B", count: -3 },
    ]);
    expect(out[0].count).toBe(11);
    expect(out[1].count).toBe(0);
  });
});
