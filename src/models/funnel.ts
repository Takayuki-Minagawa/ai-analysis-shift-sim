export type FunnelStage = {
  id: string;
  label: string;
  count: number;
};

export type FunnelAnalysis = {
  stage: FunnelStage;
  passRate: number;
  dropRate: number;
  overallRate: number;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export function analyzeFunnel(stages: FunnelStage[]): FunnelAnalysis[] {
  if (stages.length === 0) return [];
  const first = stages[0].count;
  return stages.map((stage, index) => {
    if (index === 0) {
      return {
        stage,
        passRate: 1,
        dropRate: 0,
        overallRate: 1,
      };
    }
    const prev = stages[index - 1].count;
    const rawPass = prev === 0 ? 0 : stage.count / prev;
    const passRate = clamp01(rawPass);
    return {
      stage,
      passRate,
      dropRate: clamp01(1 - passRate),
      overallRate: first === 0 ? 0 : clamp01(stage.count / first),
    };
  });
}

export function sanitizeFunnelCounts(stages: FunnelStage[]): FunnelStage[] {
  const result: FunnelStage[] = [];
  for (let i = 0; i < stages.length; i++) {
    const raw = Math.max(0, Math.round(stages[i].count));
    const cap = i === 0 ? raw : Math.min(raw, result[i - 1].count);
    result.push({ ...stages[i], count: cap });
  }
  return result;
}
