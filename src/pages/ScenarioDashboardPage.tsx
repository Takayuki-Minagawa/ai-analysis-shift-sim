import { useMemo, useState } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ParameterSlider } from "../components/common/ParameterSlider";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart } from "../components/charts/EChart";
import { calculateMarketGrowth } from "../models/marketGrowth";
import { calculateAdoptionCurve } from "../models/adoptionCurve";
import { findCrossoverCases } from "../models/costBenefit";
import { analyzeFunnel } from "../models/funnel";
import { clamp } from "../utils/math";
import { formatDecimal1, formatNumber, formatPercent } from "../utils/format";
import { useLanguage } from "../i18n/LanguageContext";
import shared from "./pageShared.module.css";

type DashboardParams = {
  initialMarketSize: number;
  marketGrowthRate: number;
  maxAdoptionRate: number;
  adoptionSpeed: number;
  adoptionCenterYear: number;
  aiCostReduction: number;
  governanceCostRatio: number;
  talentShortageImpact: number;
  regulationRisk: number;
  retentionRate: number;
  pocSuccessRate: number;
  productionAdoptionRate: number;
};

const DEFAULT_PARAMS: DashboardParams = {
  initialMarketSize: 100,
  marketGrowthRate: 0.15,
  maxAdoptionRate: 0.85,
  adoptionSpeed: 0.6,
  adoptionCenterYear: 2029,
  aiCostReduction: 0.4,
  governanceCostRatio: 0.1,
  talentShortageImpact: 0.15,
  regulationRisk: 0.3,
  retentionRate: 0.75,
  pocSuccessRate: 0.6,
  productionAdoptionRate: 0.5,
};

const SCENARIO_DEFS = [
  { id: "pessimistic", label: "悲観", growthAdjust: -0.05, adoptionAdjust: -0.1 },
  { id: "base", label: "標準", growthAdjust: 0, adoptionAdjust: 0 },
  { id: "optimistic", label: "楽観", growthAdjust: 0.05, adoptionAdjust: 0.1 },
];

const START_YEAR = 2025;
const END_YEAR = 2035;

export function ScenarioDashboardPage() {
  const { t } = useLanguage();
  const [params, setParams] = useState<DashboardParams>(DEFAULT_PARAMS);

  const update = <K extends keyof DashboardParams>(key: K, value: DashboardParams[K]) =>
    setParams((prev) => ({ ...prev, [key]: value }));

  const scenarios = useMemo(() => {
    return SCENARIO_DEFS.map((scenario) => {
      const growth = calculateMarketGrowth({
        initialMarketSize: params.initialMarketSize,
        startYear: START_YEAR,
        endYear: END_YEAR,
        growthRate: clamp(params.marketGrowthRate + scenario.growthAdjust, 0, 0.6),
      });
      const adoption = calculateAdoptionCurve({
        maxAdoptionRate: clamp(params.maxAdoptionRate + scenario.adoptionAdjust, 0.1, 1),
        speed: params.adoptionSpeed,
        centerYear: params.adoptionCenterYear,
        startYear: START_YEAR,
        endYear: END_YEAR,
      });
      const profit = growth.map((g, i) => {
        const a = adoption[i];
        const aiContribution =
          g.marketSize *
          a.adoptionRate *
          (1 - params.governanceCostRatio) *
          (1 - params.talentShortageImpact * 0.5);
        const humanContribution = g.marketSize * (1 - a.adoptionRate) * 0.6;
        return {
          year: g.year,
          profit: aiContribution + humanContribution,
          ai: aiContribution,
          human: humanContribution,
        };
      });
      return {
        ...scenario,
        growth,
        adoption,
        profit,
      };
    });
  }, [params]);

  const baseScenario = scenarios[1];
  const finalMarket =
    baseScenario.growth[baseScenario.growth.length - 1]?.marketSize ?? 0;
  const finalAdoption =
    baseScenario.adoption[baseScenario.adoption.length - 1]?.adoptionRate ?? 0;

  const crossover = useMemo(
    () =>
      findCrossoverCases({
        humanFixedCost: 500000,
        humanCostPerCase: 8000,
        humanRevenuePerCase: 12000,
        aiFixedCost: 3000000 * (1 - params.aiCostReduction * 0.3),
        aiCostPerCase: 1200 * (1 - params.aiCostReduction),
        aiRevenuePerCase: 8000,
      }),
    [params.aiCostReduction],
  );

  const sampleFunnel = useMemo(() => {
    const inquiry = 1000;
    const proposal = inquiry * 0.6;
    const pocStart = proposal * 0.5;
    const pocSuccess = pocStart * params.pocSuccessRate;
    const production = pocSuccess * params.productionAdoptionRate;
    const retention = production * params.retentionRate;
    const expansion = retention * 0.5;
    return analyzeFunnel([
      { id: "inquiry", label: "問い合わせ", count: Math.round(inquiry) },
      { id: "proposal", label: "初回提案", count: Math.round(proposal) },
      { id: "poc_start", label: "PoC開始", count: Math.round(pocStart) },
      { id: "poc_success", label: "PoC成功", count: Math.round(pocSuccess) },
      { id: "production", label: "本番導入", count: Math.round(production) },
      { id: "retention", label: "継続利用", count: Math.round(retention) },
      { id: "expansion", label: "拡張利用", count: Math.round(expansion) },
    ]);
  }, [params.pocSuccessRate, params.productionAdoptionRate, params.retentionRate]);

  const riskScore = useMemo(() => {
    const score =
      params.regulationRisk * 40 +
      params.talentShortageImpact * 60 +
      params.governanceCostRatio * 40 -
      params.retentionRate * 30 -
      params.pocSuccessRate * 20;
    return clamp(score, 0, 100);
  }, [params]);

  const years = baseScenario.growth.map((g) => g.year);

  const marketOption = useMemo(
    () => ({
      color: ["#6b7280", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: "年" },
      yAxis: { type: "value" as const, name: "市場規模指数" },
      series: scenarios.map((s) => ({
        name: s.label,
        type: "line" as const,
        smooth: true,
        data: s.growth.map((p) => Number(p.marketSize.toFixed(1))),
      })),
    }),
    [scenarios, years],
  );

  const adoptionOption = useMemo(
    () => ({
      color: ["#6b7280", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: "年" },
      yAxis: {
        type: "value" as const,
        name: "AI導入率 (%)",
        min: 0,
        max: 100,
        axisLabel: { formatter: "{value}%" },
      },
      series: scenarios.map((s) => ({
        name: s.label,
        type: "line" as const,
        smooth: true,
        areaStyle: s.id === "base" ? { opacity: 0.1 } : undefined,
        data: s.adoption.map((p) => Number(p.adoptionRatePercent.toFixed(1))),
      })),
    }),
    [scenarios, years],
  );

  const profitOption = useMemo(
    () => ({
      color: ["#17a673", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: "年" },
      yAxis: { type: "value" as const, name: "推定貢献度 (仮想単位)" },
      series: scenarios.map((s) => ({
        name: s.label,
        type: "line" as const,
        smooth: true,
        data: s.profit.map((p) => Number(p.profit.toFixed(1))),
      })),
    }),
    [scenarios, years],
  );

  const riskGaugeOption = useMemo(
    () => ({
      series: [
        {
          type: "gauge" as const,
          progress: { show: true, width: 18 },
          axisLine: { lineStyle: { width: 18 } },
          axisTick: { show: false },
          splitLine: { length: 10, lineStyle: { color: "#cbd5e1" } },
          pointer: { width: 5 },
          detail: {
            valueAnimation: true,
            fontSize: 22,
            offsetCenter: [0, "70%"],
            formatter: "{value}",
          },
          data: [{ value: Math.round(riskScore), name: "リスクスコア" }],
          min: 0,
          max: 100,
        },
      ],
    }),
    [riskScore],
  );

  const funnelFinalRate =
    sampleFunnel.length > 0 ? sampleFunnel[sampleFunnel.length - 1].overallRate : 0;

  const handleReset = () => setParams(DEFAULT_PARAMS);

  return (
    <>
      <PageTitle
        title={t("page.dashboard.title")}
        subtitle={t("page.dashboard.subtitle")}
      >
        <ExportButtons onReset={handleReset} />
      </PageTitle>

      <div className={shared.layout}>
        <aside className={shared.controlPanel}>
          <div className={shared.controlGroupHeader}>市場条件</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="初期市場規模"
              value={params.initialMarketSize}
              min={50}
              max={300}
              step={10}
              onChange={(v) => update("initialMarketSize", v)}
            />
            <ParameterSlider
              label="市場成長率"
              value={params.marketGrowthRate}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("marketGrowthRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
          </div>

          <div className={shared.controlGroupHeader}>AI導入</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="最大AI導入率"
              value={params.maxAdoptionRate}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => update("maxAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="AI導入速度"
              value={params.adoptionSpeed}
              min={0.2}
              max={1.5}
              step={0.05}
              onChange={(v) => update("adoptionSpeed", v)}
              formatValue={(v) => v.toFixed(2)}
            />
            <ParameterSlider
              label="AI導入加速年"
              value={params.adoptionCenterYear}
              min={2025}
              max={2034}
              step={1}
              onChange={(v) => update("adoptionCenterYear", v)}
            />
          </div>

          <div className={shared.controlGroupHeader}>リスク & 運用</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="AIコスト削減率"
              value={params.aiCostReduction}
              min={0}
              max={0.8}
              step={0.05}
              onChange={(v) => update("aiCostReduction", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="ガバナンス対応コスト率"
              value={params.governanceCostRatio}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("governanceCostRatio", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="人材不足影響度"
              value={params.talentShortageImpact}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(v) => update("talentShortageImpact", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="規制リスク"
              value={params.regulationRisk}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => update("regulationRisk", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
          </div>

          <div className={shared.controlGroupHeader}>顧客ファネル</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="PoC成功率"
              value={params.pocSuccessRate}
              min={0.2}
              max={0.95}
              step={0.05}
              onChange={(v) => update("pocSuccessRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="本番移行率"
              value={params.productionAdoptionRate}
              min={0.2}
              max={0.95}
              step={0.05}
              onChange={(v) => update("productionAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label="顧客継続率"
              value={params.retentionRate}
              min={0.3}
              max={0.98}
              step={0.02}
              onChange={(v) => update("retentionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <div className={shared.kpiRow}>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>2035年 市場規模指数</span>
              <span className={shared.kpiValue}>{formatDecimal1(finalMarket)}</span>
              <span className={shared.kpiNote}>標準シナリオ</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>2035年 AI導入率</span>
              <span className={shared.kpiValue}>{formatPercent(finalAdoption)}</span>
              <span className={shared.kpiNote}>標準シナリオ</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>AI活用 逆転件数</span>
              <span className={shared.kpiValue}>
                {crossover ? formatNumber(Math.round(crossover)) : "—"}
              </span>
              <span className={shared.kpiNote}>件/月で AI &gt; 人手</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>最終転換率</span>
              <span className={shared.kpiValue}>{formatPercent(funnelFinalRate)}</span>
              <span className={shared.kpiNote}>問い合わせ → 拡張利用</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>総合リスクスコア</span>
              <span className={shared.kpiValue}>{Math.round(riskScore)}</span>
              <span className={shared.kpiNote}>0=低 / 100=高</span>
            </div>
          </div>

          <ChartCard
            title="市場規模予測 (悲観・標準・楽観)"
            description="市場成長率を±5ptずつずらして3シナリオを並列表示"
          >
            <EChart option={marketOption} height={320} />
          </ChartCard>

          <ChartCard
            title="AI導入率予測"
            description="最大導入率を±10ptずつずらした3シナリオ"
          >
            <EChart option={adoptionOption} height={320} />
          </ChartCard>

          <ChartCard
            title="推定貢献度 (市場 × AI導入率 × 運用負担補正)"
            description="シナリオごとのビジネス貢献度の推移"
          >
            <EChart option={profitOption} height={320} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <ChartCard title="総合リスクスコア" description="規制・人材・ガバナンス・継続率・PoC成功率を合成">
              <EChart option={riskGaugeOption} height={280} />
            </ChartCard>
            <InfoBox title="成功条件コメント">
              <ul>
                <li>PoC成功率と継続率が高いほど、リスクスコアは下がる</li>
                <li>規制リスク・人材不足は大きいほど実行難易度が上がる</li>
                <li>AIコスト削減率を上げると、逆転件数が小さく(有利)なる</li>
                <li>市場成長率と最大導入率が同時に上振れると楽観シナリオに寄る</li>
              </ul>
            </InfoBox>
          </div>

          <InfoBox title="シナリオ比較" variant="hint">
            <p>
              グラフの上下の幅が「楽観 − 悲観」のレンジを示し、このレンジが大きいほど将来の不確実性が高いと解釈できます。
              標準シナリオを基準に、リスク要因 (規制・人材・ガバナンス)
              を抑制できれば楽観側に寄せやすくなります。
            </p>
          </InfoBox>

          <InfoBox title="前提" variant="warn">
            <p>
              本ダッシュボードは単純化した合成モデルで、意思決定にそのまま使える精度ではありません。
              方向感と感度を掴むためのツールとしてご利用ください。
            </p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
