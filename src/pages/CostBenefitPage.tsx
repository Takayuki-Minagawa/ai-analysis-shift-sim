import { useMemo, useRef, useState } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ParameterSlider } from "../components/common/ParameterSlider";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import {
  calculateCostBenefit,
  findBreakEvenCases,
  findCrossoverCases,
  type CostBenefitParams,
  type CostBenefitPoint,
} from "../models/costBenefit";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import { useFormatters } from "../i18n/useFormatters";
import shared from "./pageShared.module.css";

const DEFAULT_PARAMS: CostBenefitParams = {
  minCases: 100,
  maxCases: 5000,
  step: 100,
  humanFixedCost: 500000,
  humanCostPerCase: 8000,
  humanRevenuePerCase: 12000,
  aiFixedCost: 3000000,
  aiCostPerCase: 1200,
  aiRevenuePerCase: 8000,
};

export function CostBenefitPage() {
  const { t, tList } = useLanguage();
  const f = useFormatters();
  const [params, setParams] = useState<CostBenefitParams>(DEFAULT_PARAMS);
  const costChartRef = useRef<EChartHandle>(null);
  const profitChartRef = useRef<EChartHandle>(null);
  const avgChartRef = useRef<EChartHandle>(null);

  const points = useMemo(() => calculateCostBenefit(params), [params]);

  const humanBreakEven = findBreakEvenCases(
    params.humanFixedCost,
    params.humanCostPerCase,
    params.humanRevenuePerCase,
  );
  const aiBreakEven = findBreakEvenCases(
    params.aiFixedCost,
    params.aiCostPerCase,
    params.aiRevenuePerCase,
  );
  const crossover = findCrossoverCases(params);

  const xAxisData = points.map((p) => p.monthlyCases);

  const buildLineOption = useMemo(
    () =>
      (
        yAxisName: string,
        humanValues: number[],
        aiValues: number[],
        markLines?: { x: number | null; label: string; color: string }[],
        formatter?: (v: number) => string,
      ) => {
        const fmt = formatter ?? ((v: number) => f.compactYen(v));
        return {
          color: ["#6b7280", "#1f6feb"],
          tooltip: {
            trigger: "axis" as const,
            valueFormatter: (value: unknown) => fmt(Number(value)),
          },
          legend: { top: 0 },
          grid: { top: 40, left: 72, right: 24, bottom: 40 },
          xAxis: {
            type: "category" as const,
            name: t("cost.xAxis.cases"),
            nameLocation: "middle" as const,
            nameGap: 28,
            data: xAxisData,
          },
          yAxis: {
            type: "value" as const,
            name: yAxisName,
            axisLabel: { formatter: (v: number) => fmt(v) },
          },
          series: [
            {
              name: t("cost.series.human"),
              type: "line" as const,
              smooth: true,
              data: humanValues,
              lineStyle: { width: 2.5 },
            },
            {
              name: t("cost.series.ai"),
              type: "line" as const,
              smooth: true,
              data: aiValues,
              lineStyle: { width: 2.5 },
              markLine: markLines?.some((m) => m.x !== null)
                ? {
                    symbol: "none",
                    label: { formatter: (p: { name: string }) => p.name },
                    data: markLines
                      .filter((m) => m.x !== null)
                      .map((m) => ({
                        name: m.label,
                        xAxis: Math.round(m.x ?? 0).toString(),
                        lineStyle: { color: m.color, type: "dashed" as const },
                      })),
                  }
                : undefined,
            },
          ],
        };
      },
    [t, f, xAxisData],
  );

  const costOption = useMemo(
    () =>
      buildLineOption(
        t("cost.yAxis.total"),
        points.map((p) => Math.round(p.humanTotalCost)),
        points.map((p) => Math.round(p.aiTotalCost)),
      ),
    [points, buildLineOption, t],
  );

  const profitOption = useMemo(
    () =>
      buildLineOption(
        t("cost.yAxis.profit"),
        points.map((p) => Math.round(p.humanProfit)),
        points.map((p) => Math.round(p.aiProfit)),
        [
          { x: humanBreakEven, label: t("cost.mark.humanBE"), color: "#6b7280" },
          { x: aiBreakEven, label: t("cost.mark.aiBE"), color: "#1f6feb" },
          { x: crossover, label: t("cost.mark.crossover"), color: "#ff8a3d" },
        ],
      ),
    [points, humanBreakEven, aiBreakEven, crossover, buildLineOption, t],
  );

  const avgOption = useMemo(
    () =>
      buildLineOption(
        t("cost.yAxis.avg"),
        points.map((p) => Math.round(p.humanAverageCost)),
        points.map((p) => Math.round(p.aiAverageCost)),
        undefined,
        (v: number) => f.yen(v),
      ),
    [points, buildLineOption, t, f],
  );

  const tableColumns: DataTableColumn<CostBenefitPoint>[] = [
    {
      key: "cases",
      header: t("common.perMonth"),
      align: "right",
      render: (r) => f.number(r.monthlyCases),
    },
    {
      key: "humanProfit",
      header: t("cost.table.human.profit"),
      align: "right",
      render: (r) => f.compactYen(r.humanProfit),
    },
    {
      key: "aiProfit",
      header: t("cost.table.ai.profit"),
      align: "right",
      render: (r) => f.compactYen(r.aiProfit),
    },
    {
      key: "aiAdvantage",
      header: t("cost.table.ai.advantage"),
      align: "right",
      render: (r) => f.compactYen(r.aiAdvantage),
    },
    {
      key: "humanAvg",
      header: t("cost.table.human.avg"),
      align: "right",
      render: (r) => f.yen(r.humanAverageCost),
    },
    {
      key: "aiAvg",
      header: t("cost.table.ai.avg"),
      align: "right",
      render: (r) => f.yen(r.aiAverageCost),
    },
  ];

  const handleReset = () => setParams(DEFAULT_PARAMS);

  const handleExportCsv = () => {
    const rows = points.map((p) => ({
      [t("cost.xAxis.cases")]: p.monthlyCases,
      [`${t("cost.series.human")}_${t("cost.yAxis.total")}`]: Math.round(p.humanTotalCost),
      [`${t("cost.series.human")}_${t("cost.yAxis.profit")}`]: Math.round(p.humanProfit),
      [`${t("cost.series.human")}_${t("cost.yAxis.avg")}`]: Math.round(p.humanAverageCost),
      [`${t("cost.series.ai")}_${t("cost.yAxis.total")}`]: Math.round(p.aiTotalCost),
      [`${t("cost.series.ai")}_${t("cost.yAxis.profit")}`]: Math.round(p.aiProfit),
      [`${t("cost.series.ai")}_${t("cost.yAxis.avg")}`]: Math.round(p.aiAverageCost),
      [t("cost.table.ai.advantage")]: Math.round(p.aiAdvantage),
    }));
    downloadCsv(rows, "cost-benefit.csv");
  };

  const handleExportPng = () => {
    const dataUrl = profitChartRef.current?.getDataUrl();
    if (dataUrl) downloadDataUrl(dataUrl, "cost-benefit.png");
  };

  const update = <K extends keyof CostBenefitParams>(
    key: K,
    value: CostBenefitParams[K],
  ) => setParams((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <PageTitle
        title={t("page.cost.title")}
        subtitle={t("page.cost.subtitle")}
      >
        <ExportButtons
          onReset={handleReset}
          onExportCsv={handleExportCsv}
          onExportPng={handleExportPng}
        />
      </PageTitle>

      <div className={shared.layout}>
        <aside className={shared.controlPanel}>
          <div className={shared.controlGroupHeader}>{t("cost.group.range")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("cost.control.minCases")}
              value={params.minCases}
              min={50}
              max={2000}
              step={50}
              onChange={(v) => update("minCases", v)}
              formatValue={f.number}
            />
            <ParameterSlider
              label={t("cost.control.maxCases")}
              value={params.maxCases}
              min={500}
              max={10000}
              step={500}
              onChange={(v) => update("maxCases", v)}
              formatValue={f.number}
            />
            <ParameterSlider
              label={t("cost.control.step")}
              value={params.step}
              min={50}
              max={500}
              step={50}
              onChange={(v) => update("step", v)}
              formatValue={f.number}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("cost.group.human")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("cost.control.fixed")}
              value={params.humanFixedCost}
              min={100000}
              max={2000000}
              step={50000}
              onChange={(v) => update("humanFixedCost", v)}
              formatValue={f.compactYen}
            />
            <ParameterSlider
              label={t("cost.control.perCaseCost")}
              value={params.humanCostPerCase}
              min={2000}
              max={20000}
              step={500}
              onChange={(v) => update("humanCostPerCase", v)}
              formatValue={f.yen}
            />
            <ParameterSlider
              label={t("cost.control.perCaseRevenue")}
              value={params.humanRevenuePerCase}
              min={3000}
              max={30000}
              step={500}
              onChange={(v) => update("humanRevenuePerCase", v)}
              formatValue={f.yen}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("cost.group.ai")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("cost.control.fixed")}
              value={params.aiFixedCost}
              min={500000}
              max={10000000}
              step={100000}
              onChange={(v) => update("aiFixedCost", v)}
              formatValue={f.compactYen}
            />
            <ParameterSlider
              label={t("cost.control.perCaseCost")}
              value={params.aiCostPerCase}
              min={200}
              max={6000}
              step={100}
              onChange={(v) => update("aiCostPerCase", v)}
              formatValue={f.yen}
            />
            <ParameterSlider
              label={t("cost.control.perCaseRevenue")}
              value={params.aiRevenuePerCase}
              min={2000}
              max={20000}
              step={500}
              onChange={(v) => update("aiRevenuePerCase", v)}
              formatValue={f.yen}
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <div className={shared.kpiRow}>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("cost.kpi.humanBE")}</span>
              <span className={shared.kpiValue}>
                {humanBreakEven !== null ? f.number(Math.round(humanBreakEven)) : "—"}
              </span>
              <span className={shared.kpiNote}>{t("cost.kpi.unit")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("cost.kpi.aiBE")}</span>
              <span className={shared.kpiValue}>
                {aiBreakEven !== null ? f.number(Math.round(aiBreakEven)) : "—"}
              </span>
              <span className={shared.kpiNote}>{t("cost.kpi.unit")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("cost.kpi.crossover")}</span>
              <span className={shared.kpiValue}>
                {crossover !== null ? f.number(Math.round(crossover)) : "—"}
              </span>
              <span className={shared.kpiNote}>{t("cost.kpi.crossover.note")}</span>
            </div>
          </div>

          <ChartCard
            title={t("cost.chart.cost.title")}
            description={t("cost.chart.cost.desc")}
          >
            <EChart ref={costChartRef} option={costOption} height={320} />
          </ChartCard>

          <ChartCard
            title={t("cost.chart.profit.title")}
            description={t("cost.chart.profit.desc")}
          >
            <EChart ref={profitChartRef} option={profitOption} height={320} />
          </ChartCard>

          <ChartCard
            title={t("cost.chart.avg.title")}
            description={t("cost.chart.avg.desc")}
          >
            <EChart ref={avgChartRef} option={avgOption} height={320} />
          </ChartCard>

          <ChartCard title={t("cost.table.title")}>
            <DataTable columns={tableColumns} rows={points} maxHeight={360} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title={t("market.comment.title")}>
              <p>{t("cost.comment.body")}</p>
            </InfoBox>
            <InfoBox title={t("market.read.title")} variant="hint">
              <ul>
                {tList("cost.read.list").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>

          <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
            <p>{t("cost.assumptions.body")}</p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
