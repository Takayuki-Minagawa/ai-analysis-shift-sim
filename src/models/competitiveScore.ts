import type { CompanyScore, CompetitiveAxisKey } from "../types/analysis";

export const COMPETITIVE_AXES: {
  key: CompetitiveAxisKey;
  label: string;
  description: string;
}[] = [
  { key: "domainKnowledge", label: "業界知識", description: "対象業界に関する知見" },
  { key: "dataAccess", label: "データ利活用", description: "独自データへのアクセス" },
  { key: "modelQuality", label: "モデル品質", description: "AIモデルの精度と信頼性" },
  { key: "operationCapability", label: "運用力", description: "導入後の運用・改善能力" },
  { key: "security", label: "セキュリティ", description: "情報セキュリティ体制" },
  {
    key: "explainability",
    label: "説明可能性",
    description: "モデル判断の説明・監査性",
  },
  {
    key: "integration",
    label: "システム連携",
    description: "既存システムとの統合容易性",
  },
  { key: "costEfficiency", label: "コスト効率", description: "提供価格とコスト効率" },
];

export function calculateCompanyTotal(company: CompanyScore): number {
  let total = 0;
  for (const axis of COMPETITIVE_AXES) {
    total += company[axis.key];
  }
  return total;
}

export function getStrengthsAndWeaknesses(company: CompanyScore): {
  strengths: { key: CompetitiveAxisKey; label: string; score: number }[];
  weaknesses: { key: CompetitiveAxisKey; label: string; score: number }[];
} {
  const axisScores = COMPETITIVE_AXES.map((axis) => ({
    key: axis.key,
    label: axis.label,
    score: company[axis.key],
  }));
  const sorted = [...axisScores].sort((a, b) => b.score - a.score);
  return {
    strengths: sorted.slice(0, 2),
    weaknesses: sorted.slice(-2).reverse(),
  };
}
