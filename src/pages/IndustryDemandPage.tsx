import { useMemo, useRef } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import { INDUSTRY_SCORES } from "../data/industryScores";
import { INDUSTRY_AXES, calculateTotalScore, sortByTotalScore } from "../models/industryDemand";
import type { IndustryScore } from "../types/analysis";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import shared from "./pageShared.module.css";

export function IndustryDemandPage() {
  const { t } = useLanguage();
  const heatmapRef = useRef<EChartHandle>(null);

  const sorted = useMemo(() => sortByTotalScore(INDUSTRY_SCORES), []);

  const heatmapData = useMemo(() => {
    const data: [number, number, number][] = [];
    sorted.forEach((industry, y) => {
      INDUSTRY_AXES.forEach((axis, x) => {
        data.push([x, y, industry[axis.key]]);
      });
    });
    return data;
  }, [sorted]);

  const heatmapOption = useMemo(
    () => ({
      tooltip: {
        position: "top" as const,
        formatter: (p: unknown) => {
          const info = p as { data: [number, number, number] };
          const axis = INDUSTRY_AXES[info.data[0]];
          const industry = sorted[info.data[1]];
          return `${industry.industry} × ${axis.label}<br/>スコア: <b>${info.data[2]}</b>`;
        },
      },
      grid: { top: 40, left: 100, right: 30, bottom: 60 },
      xAxis: {
        type: "category" as const,
        data: INDUSTRY_AXES.map((a) => a.label),
        axisLabel: { interval: 0, rotate: 20 },
        splitArea: { show: true },
      },
      yAxis: {
        type: "category" as const,
        data: sorted.map((s) => s.industry),
        splitArea: { show: true },
      },
      visualMap: {
        min: 1,
        max: 5,
        calculable: true,
        orient: "horizontal" as const,
        left: "center",
        bottom: 0,
        inRange: { color: ["#e7efff", "#5087ea", "#0d4fbb"] },
      },
      series: [
        {
          name: "スコア",
          type: "heatmap" as const,
          data: heatmapData,
          label: { show: true, color: "#0f172a", fontWeight: 600 },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: "rgba(15,23,42,0.3)" },
          },
        },
      ],
    }),
    [heatmapData, sorted],
  );

  const totalOption = useMemo(
    () => ({
      color: ["#1f6feb"],
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      grid: { top: 20, left: 100, right: 40, bottom: 30 },
      xAxis: { type: "value" as const, name: "総合スコア" },
      yAxis: {
        type: "category" as const,
        data: sorted.map((s) => s.industry).reverse(),
      },
      series: [
        {
          type: "bar" as const,
          data: sorted.map((s) => calculateTotalScore(s)).reverse(),
          label: { show: true, position: "right" as const },
          barMaxWidth: 20,
        },
      ],
    }),
    [sorted],
  );

  const scatterOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item" as const,
        formatter: (p: unknown) => {
          const info = p as { data: [number, number, string] };
          return `${info.data[2]}<br/>規制リスク: ${info.data[0]} / ROI: ${info.data[1]}`;
        },
      },
      grid: { top: 30, left: 56, right: 30, bottom: 50 },
      xAxis: {
        type: "value" as const,
        name: "規制リスク",
        min: 0,
        max: 6,
        nameLocation: "middle" as const,
        nameGap: 28,
      },
      yAxis: {
        type: "value" as const,
        name: "ROI Potential",
        min: 0,
        max: 6,
      },
      series: [
        {
          type: "scatter" as const,
          symbolSize: 22,
          itemStyle: { color: "#ff8a3d", opacity: 0.85 },
          data: INDUSTRY_SCORES.map((s) => [s.regulationRisk, s.roiPotential, s.industry]),
          label: {
            show: true,
            position: "right" as const,
            formatter: (p: { data: [number, number, string] }) => p.data[2],
            fontSize: 11,
          },
        },
      ],
    }),
    [],
  );

  const tableColumns: DataTableColumn<IndustryScore>[] = [
    { key: "industry", header: "業界", render: (r) => r.industry },
    ...INDUSTRY_AXES.map((axis) => ({
      key: axis.key,
      header: axis.label,
      align: "right" as const,
      render: (r: IndustryScore) => r[axis.key],
    })),
    {
      key: "total",
      header: "総合",
      align: "right" as const,
      render: (r: IndustryScore) => calculateTotalScore(r),
    },
  ];

  const handleExportCsv = () => {
    const rows = INDUSTRY_SCORES.map((s) => {
      const row: Record<string, string | number> = { 業界: s.industry };
      INDUSTRY_AXES.forEach((a) => {
        row[a.label] = s[a.key];
      });
      row["総合"] = calculateTotalScore(s);
      return row;
    });
    downloadCsv(rows, "industry-demand.csv");
  };

  const handleExportPng = () => {
    const url = heatmapRef.current?.getDataUrl();
    if (url) downloadDataUrl(url, "industry-demand.png");
  };

  return (
    <>
      <PageTitle
        title={t("page.industry.title")}
        subtitle={t("page.industry.subtitle")}
      >
        <ExportButtons onExportCsv={handleExportCsv} onExportPng={handleExportPng} />
      </PageTitle>

      <div className={shared.chartsStack}>
        <ChartCard
          title="業界 × 評価軸 ヒートマップ"
          description="1〜5点のスコア。総合スコアの高い順に並べ替え"
          footerNote="スコアは相対評価のサンプル値です。"
        >
          <EChart ref={heatmapRef} option={heatmapOption} height={420} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <ChartCard title="業界別 総合スコア" description="6軸合計スコアで業界を並べ替え">
            <EChart option={totalOption} height={380} />
          </ChartCard>
          <ChartCard
            title="規制リスク × ROI"
            description="右上は ROI が高く規制も厳しい業界 (潜在的高リターン × 高難易度)"
          >
            <EChart option={scatterOption} height={380} />
          </ChartCard>
        </div>

        <ChartCard title="業界スコアテーブル">
          <DataTable columns={tableColumns} rows={INDUSTRY_SCORES} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <InfoBox title="分析コメント">
            <p>
              製造、金融、医療はAI解析サービスの需要が大きい一方、規制や品質管理の重要性も高くなります。
              小売やマーケティングは、比較的導入しやすく、短期的なROIを確認しやすい領域です。
            </p>
          </InfoBox>
          <InfoBox title="読み取り方" variant="hint">
            <ul>
              <li>ヒートマップ: 濃い青=高スコア、薄い=低スコア</li>
              <li>総合スコアが高い = AI解析サービスの総合的な需要余地が大きい</li>
              <li>散布図: 右上=高ROI高規制、左上=高ROI低規制 (攻めやすい)</li>
            </ul>
          </InfoBox>
        </div>

        <InfoBox title="前提" variant="warn">
          <p>
            評価軸とスコアはサンプルであり、実際の導入検討には業界固有データと複数情報源の参照が必要です。
          </p>
        </InfoBox>
      </div>
    </>
  );
}
