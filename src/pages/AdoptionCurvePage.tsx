import { useMemo, useRef, useState } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ParameterSlider } from "../components/common/ParameterSlider";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import {
  calculateAdoptionCurve,
  type AdoptionCurvePoint,
  type AdoptionCurveParams,
} from "../models/adoptionCurve";
import { formatPercent } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import shared from "./pageShared.module.css";

const DEFAULT_PARAMS: AdoptionCurveParams = {
  maxAdoptionRate: 0.85,
  speed: 0.6,
  centerYear: 2029,
  startYear: 2025,
  endYear: 2035,
};

const PHASE_COLORS: Record<AdoptionCurvePoint["phase"], string> = {
  初期: "#94a3b8",
  成長期: "#1f6feb",
  成熟期: "#17a673",
};

export function AdoptionCurvePage() {
  const { t } = useLanguage();
  const [params, setParams] = useState<AdoptionCurveParams>(DEFAULT_PARAMS);
  const chartRef = useRef<EChartHandle>(null);

  const series = useMemo(() => calculateAdoptionCurve(params), [params]);

  const firstCrossYear = useMemo(() => {
    const crossPoint = series.find((p) => p.adoptionRate >= params.maxAdoptionRate * 0.5);
    return crossPoint?.year ?? null;
  }, [series, params.maxAdoptionRate]);

  const finalRate = series.length > 0 ? series[series.length - 1].adoptionRate : 0;

  const option = useMemo(() => {
    const years = series.map((p) => p.year);
    const percents = series.map((p) => Number(p.adoptionRatePercent.toFixed(2)));
    return {
      tooltip: {
        trigger: "axis" as const,
        formatter: (params: unknown) => {
          const arr = params as { axisValue: string; data: number }[];
          const v = arr[0];
          return `${v.axisValue}年<br/>導入率: <b>${v.data.toFixed(1)}%</b>`;
        },
      },
      grid: { top: 30, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        name: "年",
        nameLocation: "middle" as const,
        nameGap: 28,
        data: years,
      },
      yAxis: {
        type: "value" as const,
        name: "AI導入率 (%)",
        min: 0,
        max: 100,
        axisLabel: { formatter: "{value}%" },
      },
      series: [
        {
          name: "AI導入率",
          type: "line" as const,
          smooth: true,
          symbol: "circle",
          symbolSize: 7,
          lineStyle: { width: 3, color: "#1f6feb" },
          areaStyle: { color: "rgba(31, 111, 235, 0.12)" },
          data: percents.map((value, i) => ({
            value,
            itemStyle: { color: PHASE_COLORS[series[i].phase] },
          })),
          markLine: {
            symbol: "none",
            lineStyle: { type: "dashed", color: "#ff8a3d" },
            label: { formatter: "普及中心年" },
            data: [{ xAxis: params.centerYear.toString() }],
          },
        },
      ],
    };
  }, [series, params.centerYear]);

  const tableColumns: DataTableColumn<AdoptionCurvePoint>[] = [
    { key: "year", header: "年", render: (r) => r.year },
    {
      key: "rate",
      header: "導入率",
      align: "right",
      render: (r) => formatPercent(r.adoptionRate),
    },
    { key: "phase", header: "フェーズ", render: (r) => r.phase },
  ];

  const handleReset = () => setParams(DEFAULT_PARAMS);

  const handleExportCsv = () => {
    downloadCsv(
      series.map((p) => ({
        年: p.year,
        導入率: Number(p.adoptionRate.toFixed(4)),
        "導入率(%)": Number(p.adoptionRatePercent.toFixed(2)),
        フェーズ: p.phase,
      })),
      "adoption-curve.csv",
    );
  };

  const handleExportPng = () => {
    const dataUrl = chartRef.current?.getDataUrl();
    if (dataUrl) downloadDataUrl(dataUrl, "adoption-curve.png");
  };

  const update = <K extends keyof AdoptionCurveParams>(
    key: K,
    value: AdoptionCurveParams[K],
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <PageTitle
        title={t("page.adoption.title")}
        subtitle={t("page.adoption.subtitle")}
      >
        <ExportButtons
          onReset={handleReset}
          onExportCsv={handleExportCsv}
          onExportPng={handleExportPng}
        />
      </PageTitle>

      <div className={shared.layout}>
        <aside className={shared.controlPanel} aria-label="パラメータ操作">
          <div className={shared.controlGroupHeader}>ロジスティックパラメータ</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="最大導入率 L"
              value={params.maxAdoptionRate}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => update("maxAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description="長期的に到達する導入率の上限"
            />
            <ParameterSlider
              label="普及速度 k"
              value={params.speed}
              min={0.2}
              max={1.5}
              step={0.05}
              onChange={(v) => update("speed", v)}
              formatValue={(v) => v.toFixed(2)}
              description="S字カーブの立ち上がりの急峻さ"
            />
            <ParameterSlider
              label="普及中心年 x0"
              value={params.centerYear}
              min={2025}
              max={2034}
              step={1}
              onChange={(v) => update("centerYear", v)}
              description="導入率が上限の半分に達する年"
            />
          </div>
          <div className={shared.controlGroupHeader}>表示期間</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="開始年"
              value={params.startYear}
              min={2020}
              max={2030}
              step={1}
              onChange={(v) => update("startYear", Math.min(v, params.endYear - 1))}
            />
            <ParameterSlider
              label="終了年"
              value={params.endYear}
              min={2026}
              max={2040}
              step={1}
              onChange={(v) => update("endYear", Math.max(v, params.startYear + 1))}
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <div className={shared.kpiRow}>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>普及中心年</span>
              <span className={shared.kpiValue}>{params.centerYear}</span>
              <span className={shared.kpiNote}>最大導入率の50%到達</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>50%到達年 (推定)</span>
              <span className={shared.kpiValue}>{firstCrossYear ?? "—"}</span>
              <span className={shared.kpiNote}>最大値の半分に届く最初の年</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{params.endYear}年の導入率</span>
              <span className={shared.kpiValue}>{formatPercent(finalRate)}</span>
              <span className={shared.kpiNote}>表示期間最終年</span>
            </div>
          </div>

          <ChartCard
            title="AI導入率のS字カーブ"
            description={`L=${formatPercent(params.maxAdoptionRate, 0)}, k=${params.speed.toFixed(2)}, x0=${params.centerYear}`}
            footerNote="点の色はフェーズ (灰=初期 / 青=成長期 / 緑=成熟期) を示します。"
          >
            <EChart
              ref={chartRef}
              option={option}
              height={380}
              ariaLabel="AI導入率のS字カーブ 折れ線グラフ"
            />
          </ChartCard>

          <ChartCard title="年別導入率テーブル">
            <DataTable columns={tableColumns} rows={series} maxHeight={320} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title="分析コメント">
              <p>
                AI導入率は初期には緩やかで、一定の時期を超えると急速に上昇します。
                このモデルでは、普及中心年 ({params.centerYear})
                前後が導入加速期として表現されます。
              </p>
            </InfoBox>
            <InfoBox title="読み取り方" variant="hint">
              <ul>
                <li>L は長期的な上限 (天井)、k はカーブの急峻さ、x0 が変曲点</li>
                <li>初期 (20% 未満)、成長期、成熟期 (80% 超) でフェーズ分け</li>
                <li>k を大きくするほど普及は急激に進む</li>
              </ul>
            </InfoBox>
          </div>

          <InfoBox title="前提" variant="warn">
            <p>
              本モデルは単一ロジスティック関数で単純化したサンプルシミュレーションです。
              実際の普及には、規制、景気、競合、業界特性など多くの要因が影響します。
            </p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
