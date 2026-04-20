import { logistic } from "../utils/math";

export type AdoptionCurveParams = {
  maxAdoptionRate: number;
  speed: number;
  centerYear: number;
  startYear: number;
  endYear: number;
};

export type AdoptionPhase = "early" | "growth" | "mature";

export type AdoptionCurvePoint = {
  year: number;
  adoptionRate: number;
  adoptionRatePercent: number;
  phase: AdoptionPhase;
};

export function calculateAdoptionCurve(params: AdoptionCurveParams): AdoptionCurvePoint[] {
  const results: AdoptionCurvePoint[] = [];
  const { maxAdoptionRate, speed, centerYear, startYear, endYear } = params;
  if (endYear < startYear) return results;
  for (let year = startYear; year <= endYear; year++) {
    const adoptionRate = logistic(year, maxAdoptionRate, speed, centerYear);
    const ratio = maxAdoptionRate === 0 ? 0 : adoptionRate / maxAdoptionRate;
    let phase: AdoptionPhase = "growth";
    if (ratio < 0.2) phase = "early";
    else if (ratio > 0.8) phase = "mature";
    results.push({
      year,
      adoptionRate,
      adoptionRatePercent: adoptionRate * 100,
      phase,
    });
  }
  return results;
}
