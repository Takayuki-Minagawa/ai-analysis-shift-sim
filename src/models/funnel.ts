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
    const passRate = prev === 0 ? 0 : stage.count / prev;
    return {
      stage,
      passRate,
      dropRate: 1 - passRate,
      overallRate: first === 0 ? 0 : stage.count / first,
    };
  });
}
