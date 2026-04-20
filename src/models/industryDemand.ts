import type { IndustryScore, IndustryAxisKey } from "../types/analysis";

export const INDUSTRY_AXES: { key: IndustryAxisKey; label: string; description: string }[] = [
  { key: "dataVolume", label: "データ量", description: "業界が保有・生成するデータ量" },
  {
    key: "automationPotential",
    label: "自動化余地",
    description: "AIによる業務自動化の余地",
  },
  {
    key: "regulationRisk",
    label: "規制リスク",
    description: "規制・コンプライアンスの重さ",
  },
  { key: "roiPotential", label: "投資対効果", description: "短中期でのROI期待値" },
  { key: "aiReadiness", label: "AI準備度", description: "AI導入基盤の整備度合い" },
  { key: "marketGrowth", label: "市場成長", description: "業界自体の成長期待" },
];

export function calculateTotalScore(score: IndustryScore): number {
  let total = 0;
  for (const axis of INDUSTRY_AXES) {
    total += score[axis.key];
  }
  return total;
}

export function sortByTotalScore(scores: IndustryScore[]): IndustryScore[] {
  return [...scores].sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a));
}
