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
import { formatCompactYen, formatNumber, formatYen } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
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
  const { t } = useLanguage();
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

  const buildLineOption = (
    title: string,
    yAxisName: string,
    humanValues: number[],
    aiValues: number[],
    markLines?: { x: number | null; label: string; color: string }[],
    formatter?: (v: number) => string,
  ) => {
    const fmt = formatter ?? ((v: number) => formatCompactYen(v));
    return {
      color: ["#6b7280", "#1f6feb"],
      tooltip: {
        trigger: "axis" as const,
        valueFormatter: (value: unknown) => fmt(Number(value)),
      },
      legend: { top: 0 },
      grid: { top: 40, left: 72, right: 24, bottom: 40 },
      title: title ? { show: false } : undefined,
      xAxis: {
        type: "category" as const,
        name: "月間処理件数",
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
          name: "人手中心",
          type: "line" as const,
          smooth: true,
          data: humanValues,
          lineStyle: { width: 2.5 },
        },
        {
          name: "AI活用",
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
  };

  const costOption = useMemo(
    () =>
      buildLineOption(
        "月間処理件数別 総コスト",
        "月間総コスト",
        points.map((p) => Math.round(p.humanTotalCost)),
        points.map((p) => Math.round(p.aiTotalCost)),
      ),
    [points, xAxisData],
  );

  const profitOption = useMemo(
    () =>
      buildLineOption(
        "月間処理件数別 利益",
        "月間利益",
        points.map((p) => Math.round(p.humanProfit)),
        points.map((p) => Math.round(p.aiProfit)),
        [
          { x: humanBreakEven, label: "人手 BE", color: "#6b7280" },
          { x: aiBreakEven, label: "AI BE", color: "#1f6feb" },
          { x: crossover, label: "逆転点", color: "#ff8a3d" },
        ],
      ),
    [points, xAxisData, humanBreakEven, aiBreakEven, crossover],
  );

  const avgOption = useMemo(
    () =>
      buildLineOption(
        "1件あたり平均コスト",
        "1件あたり平均コスト",
        points.map((p) => Math.round(p.humanAverageCost)),
        points.map((p) => Math.round(p.aiAverageCost)),
        undefined,
        (v: number) => formatYen(v),
      ),
    [points, xAxisData],
  );

  const tableColumns: DataTableColumn<CostBenefitPoint>[] = [
    { key: "cases", header: "件数/月", align: "right", render: (r) => formatNumber(r.monthlyCases) },
    {
      key: "humanProfit",
      header: "人手 利益",
      align: "right",
      render: (r) => formatCompactYen(r.humanProfit),
    },
    {
      key: "aiProfit",
      header: "AI 利益",
      align: "right",
      render: (r) => formatCompactYen(r.aiProfit),
    },
    {
      key: "aiAdvantage",
      header: "AI優位額",
      align: "right",
      render: (r) => formatCompactYen(r.aiAdvantage),
    },
    {
      key: "humanAvg",
      header: "人手 平均",
      align: "right",
      render: (r) => formatYen(r.humanAverageCost),
    },
    {
      key: "aiAvg",
      header: "AI 平均",
      align: "right",
      render: (r) => formatYen(r.aiAverageCost),
    },
  ];

  const handleReset = () => setParams(DEFAULT_PARAMS);

  const handleExportCsv = () => {
    const rows = points.map((p) => ({
      月間件数: p.monthlyCases,
      "人手_総コスト": Math.round(p.humanTotalCost),
      "人手_売上": Math.round(p.humanRevenue),
      "人手_利益": Math.round(p.humanProfit),
      "人手_平均コスト": Math.round(p.humanAverageCost),
      "AI_総コスト": Math.round(p.aiTotalCost),
      "AI_売上": Math.round(p.aiRevenue),
      "AI_利益": Math.round(p.aiProfit),
      "AI_平均コスト": Math.round(p.aiAverageCost),
      "AI優位額": Math.round(p.aiAdvantage),
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
          <div className={shared.controlGroupHeader}>処理件数レンジ</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="最小件数/月"
              value={params.minCases}
              min={50}
              max={2000}
              step={50}
              onChange={(v) => update("minCases", v)}
              formatValue={formatNumber}
            />
            <ParameterSlider
              label="最大件数/月"
              value={params.maxCases}
              min={500}
              max={10000}
              step={500}
              onChange={(v) => update("maxCases", v)}
              formatValue={formatNumber}
            />
            <ParameterSlider
              label="刻み"
              value={params.step}
              min={50}
              max={500}
              step={50}
              onChange={(v) => update("step", v)}
              formatValue={formatNumber}
            />
          </div>

          <div className={shared.controlGroupHeader}>人手中心 コスト</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="固定費/月"
              value={params.humanFixedCost}
              min={100000}
              max={2000000}
              step={50000}
              onChange={(v) => update("humanFixedCost", v)}
              formatValue={formatCompactYen}
            />
            <ParameterSlider
              label="1件あたり変動費"
              value={params.humanCostPerCase}
              min={2000}
              max={20000}
              step={500}
              onChange={(v) => update("humanCostPerCase", v)}
              formatValue={formatYen}
            />
            <ParameterSlider
              label="1件あたり売上"
              value={params.humanRevenuePerCase}
              min={3000}
              max={30000}
              step={500}
              onChange={(v) => update("humanRevenuePerCase", v)}
              formatValue={formatYen}
            />
          </div>

          <div className={shared.controlGroupHeader}>AI活用 コスト</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="固定費/月"
              value={params.aiFixedCost}
              min={500000}
              max={10000000}
              step={100000}
              onChange={(v) => update("aiFixedCost", v)}
              formatValue={formatCompactYen}
            />
            <ParameterSlider
              label="1件あたり変動費"
              value={params.aiCostPerCase}
              min={200}
              max={6000}
              step={100}
              onChange={(v) => update("aiCostPerCase", v)}
              formatValue={formatYen}
            />
            <ParameterSlider
              label="1件あたり売上"
              value={params.aiRevenuePerCase}
              min={2000}
              max={20000}
              step={500}
              onChange={(v) => update("aiRevenuePerCase", v)}
              formatValue={formatYen}
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <div className={shared.kpiRow}>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>人手 損益分岐件数</span>
              <span className={shared.kpiValue}>
                {humanBreakEven !== null ? formatNumber(Math.round(humanBreakEven)) : "—"}
              </span>
              <span className={shared.kpiNote}>件/月</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>AI 損益分岐件数</span>
              <span className={shared.kpiValue}>
                {aiBreakEven !== null ? formatNumber(Math.round(aiBreakEven)) : "—"}
              </span>
              <span className={shared.kpiNote}>件/月</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>AI優位となる件数</span>
              <span className={shared.kpiValue}>
                {crossover !== null ? formatNumber(Math.round(crossover)) : "—"}
              </span>
              <span className={shared.kpiNote}>この件数を超えるとAIが有利</span>
            </div>
          </div>

          <ChartCard
            title="月間処理件数別 総コスト"
            description="固定費+変動費で総コストを比較"
          >
            <EChart ref={costChartRef} option={costOption} height={320} />
          </ChartCard>

          <ChartCard
            title="月間処理件数別 利益 (損益分岐と逆転点)"
            description="縦破線は各モデルの損益分岐件数、AI vs 人手の利益逆転点"
          >
            <EChart ref={profitChartRef} option={profitOption} height={320} />
          </ChartCard>

          <ChartCard
            title="1件あたり 平均コスト"
            description="件数が増えるほど固定費が薄まり、平均コストは下がる"
          >
            <EChart ref={avgChartRef} option={avgOption} height={320} />
          </ChartCard>

          <ChartCard title="月別サマリーテーブル">
            <DataTable columns={tableColumns} rows={points} maxHeight={360} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title="分析コメント">
              <p>
                少量案件では人手中心の方が有利な場合があります。
                一方で処理件数が増えるほどAI活用型の平均コストは下がり、利益率が高まりやすくなります。
              </p>
            </InfoBox>
            <InfoBox title="読み取り方" variant="hint">
              <ul>
                <li>損益分岐件数: その月間件数で利益ゼロ</li>
                <li>逆転点: これ以上の件数でAI活用の利益が人手を上回る</li>
                <li>固定費が大きいAIは、量が出ないと不利</li>
              </ul>
            </InfoBox>
          </div>

          <InfoBox title="前提" variant="warn">
            <p>
              本モデルは固定費と線形変動費のみの単純化モデルで、品質、スケール障壁、学習コスト、価格弾力性は考慮していません。
            </p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
