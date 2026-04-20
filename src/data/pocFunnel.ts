import type { FunnelStageData } from "../types/scenario";

export const DEFAULT_POC_FUNNEL: FunnelStageData[] = [
  { id: "inquiry", label: "問い合わせ", count: 1000 },
  { id: "proposal", label: "初回提案", count: 600 },
  { id: "poc_start", label: "PoC開始", count: 300 },
  { id: "poc_success", label: "PoC成功", count: 180 },
  { id: "production", label: "本番導入", count: 90 },
  { id: "retention", label: "継続利用", count: 65 },
  { id: "expansion", label: "拡張利用", count: 30 },
];
