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
import { formatPercent } from "../utils/format";
import { useLanguage } from "../i18n/LanguageContext";
import { useFormatters } from "../i18n/useFormatters";
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
  { id: "pessimistic", labelKey: "dashboard.scenario.pessimistic", growthAdjust: -0.05, adoptionAdjust: -0.1 },
  { id: "base", labelKey: "dashboard.scenario.base", growthAdjust: 0, adoptionAdjust: 0 },
  { id: "optimistic", labelKey: "dashboard.scenario.optimistic", growthAdjust: 0.05, adoptionAdjust: 0.1 },
];

const FUNNEL_STAGE_IDS = [
  "inquiry",
  "proposal",
  "poc_start",
  "poc_success",
  "production",
  "retention",
  "expansion",
];

const START_YEAR = 2025;
const END_YEAR = 2035;

export function ScenarioDashboardPage() {
  const { t, tList } = useLanguage();
  const f = useFormatters();
  const [params, setParams] = useState<DashboardParams>(DEFAULT_PARAMS);

  const update = <K extends keyof DashboardParams>(key: K, value: DashboardParams[K]) =>
    setParams((prev) => ({ ...prev, [key]: value }));

  const scenarios = useMemo(() => {
    const regulationDrag = 1 - params.regulationRisk * 0.2;
    const aiSavingsFactor = 1 + params.aiCostReduction * 0.4;
    return SCENARIO_DEFS.map((scenario) => {
      const growth = calculateMarketGrowth({
        initialMarketSize: params.initialMarketSize,
        startYear: START_YEAR,
        endYear: END_YEAR,
        growthRate: clamp(params.marketGrowthRate + scenario.growthAdjust, 0, 0.6),
      });
      const adoption = calculateAdoptionCurve({
        maxAdoptionRate: clamp(
          (params.maxAdoptionRate + scenario.adoptionAdjust) * (1 - params.regulationRisk * 0.15),
          0.1,
          1,
        ),
        speed: params.adoptionSpeed,
        centerYear: params.adoptionCenterYear,
        startYear: START_YEAR,
        endYear: END_YEAR,
      });
      const profit = growth.map((g, i) => {
        const a = adoption[i];
        const effectiveMarket = g.marketSize * regulationDrag;
        const aiContribution =
          effectiveMarket *
          a.adoptionRate *
          (1 - params.governanceCostRatio) *
          (1 - params.talentShortageImpact * 0.5) *
          aiSavingsFactor;
        const humanContribution = effectiveMarket * (1 - a.adoptionRate) * 0.6;
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
    const counts = [inquiry, proposal, pocStart, pocSuccess, production, retention, expansion];
    return analyzeFunnel(
      FUNNEL_STAGE_IDS.map((id, i) => ({
        id,
        label: t(`funnel.stage.${id}`),
        count: Math.round(counts[i]),
      })),
    );
  }, [params.pocSuccessRate, params.productionAdoptionRate, params.retentionRate, t]);

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
  const scenarioLabels = scenarios.map((s) => t(s.labelKey));

  const marketOption = useMemo(
    () => ({
      color: ["#6b7280", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: t("common.year") },
      yAxis: { type: "value" as const, name: t("dashboard.yAxis.market") },
      series: scenarios.map((s, i) => ({
        name: scenarioLabels[i],
        type: "line" as const,
        smooth: true,
        data: s.growth.map((p) => Number(p.marketSize.toFixed(1))),
      })),
    }),
    [scenarios, years, scenarioLabels, t],
  );

  const adoptionOption = useMemo(
    () => ({
      color: ["#6b7280", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: t("common.year") },
      yAxis: {
        type: "value" as const,
        name: t("dashboard.yAxis.adoption"),
        min: 0,
        max: 100,
        axisLabel: { formatter: "{value}%" },
      },
      series: scenarios.map((s, i) => ({
        name: scenarioLabels[i],
        type: "line" as const,
        smooth: true,
        areaStyle: s.id === "base" ? { opacity: 0.1 } : undefined,
        data: s.adoption.map((p) => Number(p.adoptionRatePercent.toFixed(1))),
      })),
    }),
    [scenarios, years, scenarioLabels, t],
  );

  const profitOption = useMemo(
    () => ({
      color: ["#17a673", "#1f6feb", "#ff8a3d"],
      legend: { top: 0 },
      tooltip: { trigger: "axis" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: { type: "category" as const, data: years, name: t("common.year") },
      yAxis: { type: "value" as const, name: t("dashboard.yAxis.profit") },
      series: scenarios.map((s, i) => ({
        name: scenarioLabels[i],
        type: "line" as const,
        smooth: true,
        data: s.profit.map((p) => Number(p.profit.toFixed(1))),
      })),
    }),
    [scenarios, years, scenarioLabels, t],
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
          data: [{ value: Math.round(riskScore), name: t("dashboard.gauge.name") }],
          min: 0,
          max: 100,
        },
      ],
    }),
    [riskScore, t],
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
          <div className={shared.controlGroupHeader}>{t("dashboard.group.market")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("dashboard.control.initialMarket")}
              value={params.initialMarketSize}
              min={50}
              max={300}
              step={10}
              onChange={(v) => update("initialMarketSize", v)}
            />
            <ParameterSlider
              label={t("dashboard.control.marketGrowth")}
              value={params.marketGrowthRate}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("marketGrowthRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("dashboard.group.ai")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("dashboard.control.maxAdoption")}
              value={params.maxAdoptionRate}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => update("maxAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.adoptionSpeed")}
              value={params.adoptionSpeed}
              min={0.2}
              max={1.5}
              step={0.05}
              onChange={(v) => update("adoptionSpeed", v)}
              formatValue={(v) => v.toFixed(2)}
            />
            <ParameterSlider
              label={t("dashboard.control.adoptionCenter")}
              value={params.adoptionCenterYear}
              min={2025}
              max={2034}
              step={1}
              onChange={(v) => update("adoptionCenterYear", v)}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("dashboard.group.risk")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("dashboard.control.aiCostReduction")}
              value={params.aiCostReduction}
              min={0}
              max={0.8}
              step={0.05}
              onChange={(v) => update("aiCostReduction", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.governance")}
              value={params.governanceCostRatio}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("governanceCostRatio", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.talent")}
              value={params.talentShortageImpact}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(v) => update("talentShortageImpact", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.regulation")}
              value={params.regulationRisk}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => update("regulationRisk", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("dashboard.group.funnel")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("dashboard.control.pocSuccess")}
              value={params.pocSuccessRate}
              min={0.2}
              max={0.95}
              step={0.05}
              onChange={(v) => update("pocSuccessRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.production")}
              value={params.productionAdoptionRate}
              min={0.2}
              max={0.95}
              step={0.05}
              onChange={(v) => update("productionAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
            />
            <ParameterSlider
              label={t("dashboard.control.retention")}
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
              <span className={shared.kpiLabel}>
                {t("dashboard.kpi.marketTpl").replace("{year}", String(END_YEAR))}
              </span>
              <span className={shared.kpiValue}>{f.decimal1(finalMarket)}</span>
              <span className={shared.kpiNote}>{t("dashboard.kpi.baseNote")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>
                {t("dashboard.kpi.adoptionTpl").replace("{year}", String(END_YEAR))}
              </span>
              <span className={shared.kpiValue}>{formatPercent(finalAdoption)}</span>
              <span className={shared.kpiNote}>{t("dashboard.kpi.baseNote")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("dashboard.kpi.crossover")}</span>
              <span className={shared.kpiValue}>
                {crossover ? f.number(Math.round(crossover)) : "—"}
              </span>
              <span className={shared.kpiNote}>{t("dashboard.kpi.crossover.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("dashboard.kpi.finalConversion")}</span>
              <span className={shared.kpiValue}>{formatPercent(funnelFinalRate)}</span>
              <span className={shared.kpiNote}>{t("dashboard.kpi.finalConversion.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("dashboard.kpi.risk")}</span>
              <span className={shared.kpiValue}>{Math.round(riskScore)}</span>
              <span className={shared.kpiNote}>{t("dashboard.kpi.risk.note")}</span>
            </div>
          </div>

          <ChartCard
            title={t("dashboard.chart.market.title")}
            description={t("dashboard.chart.market.desc")}
          >
            <EChart option={marketOption} height={320} />
          </ChartCard>

          <ChartCard
            title={t("dashboard.chart.adoption.title")}
            description={t("dashboard.chart.adoption.desc")}
          >
            <EChart option={adoptionOption} height={320} />
          </ChartCard>

          <ChartCard
            title={t("dashboard.chart.profit.title")}
            description={t("dashboard.chart.profit.desc")}
          >
            <EChart option={profitOption} height={320} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <ChartCard
              title={t("dashboard.chart.risk.title")}
              description={t("dashboard.chart.risk.desc")}
            >
              <EChart option={riskGaugeOption} height={280} />
            </ChartCard>
            <InfoBox title={t("dashboard.success.title")}>
              <ul>
                {tList("dashboard.success.list").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>

          <InfoBox title={t("dashboard.compare.title")} variant="hint">
            <p>{t("dashboard.compare.body")}</p>
          </InfoBox>

          <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
            <p>{t("dashboard.assumptions.body")}</p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
