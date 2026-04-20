import { logistic } from "../utils/math";

export type AdoptionCurveParams = {
  maxAdoptionRate: number;
  speed: number;
  centerYear: number;
  startYear: number;
  endYear: number;
};

export type AdoptionCurvePoint = {
  year: number;
  adoptionRate: number;
  adoptionRatePercent: number;
  phase: "初期" | "成長期" | "成熟期";
};

export function calculateAdoptionCurve(params: AdoptionCurveParams): AdoptionCurvePoint[] {
  const results: AdoptionCurvePoint[] = [];
  const { maxAdoptionRate, speed, centerYear, startYear, endYear } = params;
  if (endYear < startYear) return results;
  for (let year = startYear; year <= endYear; year++) {
    const adoptionRate = logistic(year, maxAdoptionRate, speed, centerYear);
    const ratio = adoptionRate / maxAdoptionRate;
    let phase: AdoptionCurvePoint["phase"] = "成長期";
    if (ratio < 0.2) phase = "初期";
    else if (ratio > 0.8) phase = "成熟期";
    results.push({
      year,
      adoptionRate,
      adoptionRatePercent: adoptionRate * 100,
      phase,
    });
  }
  return results;
}
