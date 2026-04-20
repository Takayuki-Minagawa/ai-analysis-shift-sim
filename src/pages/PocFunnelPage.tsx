import { useMemo, useRef, useState } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import { analyzeFunnel } from "../models/funnel";
import { DEFAULT_POC_FUNNEL } from "../data/pocFunnel";
import type { FunnelStageData } from "../types/scenario";
import { formatNumber, formatPercent } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import shared from "./pageShared.module.css";
import styles from "./PocFunnelPage.module.css";

export function PocFunnelPage() {
  const { t } = useLanguage();
  const [stages, setStages] = useState<FunnelStageData[]>(DEFAULT_POC_FUNNEL);
  const funnelRef = useRef<EChartHandle>(null);

  const analysis = useMemo(() => analyzeFunnel(stages), [stages]);

  const warnings = useMemo(() => {
    const msgs: string[] = [];
    for (let i = 1; i < stages.length; i++) {
      if (stages[i].count > stages[i - 1].count) {
        msgs.push(`${stages[i].label} が前のステージ (${stages[i - 1].label}) を超えています`);
      }
    }
    return msgs;
  }, [stages]);

  const finalConversion =
    analysis.length > 0 ? analysis[analysis.length - 1].overallRate : 0;

  const funnelOption = useMemo(
    () => ({
      color: ["#1f6feb"],
      tooltip: {
        trigger: "item" as const,
        formatter: (p: unknown) => {
          const info = p as { name: string; value: number; data: { overall: string } };
          return `${info.name}<br/>件数: <b>${formatNumber(info.value)}</b><br/>累計通過率: ${info.data.overall}`;
        },
      },
      legend: { show: false },
      series: [
        {
          type: "funnel" as const,
          left: "8%",
          right: "8%",
          top: 20,
          bottom: 20,
          minSize: "10%",
          maxSize: "100%",
          sort: "descending" as const,
          gap: 2,
          label: { show: true, position: "inside" as const, formatter: "{b}: {c}" },
          data: analysis.map((a) => ({
            name: a.stage.label,
            value: a.stage.count,
            overall: formatPercent(a.overallRate),
          })),
        },
      ],
    }),
    [analysis],
  );

  const rateBarOption = useMemo(
    () => ({
      color: ["#17a673", "#d97706"],
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      legend: { top: 0 },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        data: analysis.slice(1).map((a) => a.stage.label),
        axisLabel: { rotate: 20 },
      },
      yAxis: {
        type: "value" as const,
        max: 1,
        axisLabel: { formatter: (v: number) => formatPercent(v, 0) },
      },
      series: [
        {
          name: "通過率",
          type: "bar" as const,
          data: analysis.slice(1).map((a) => Number(a.passRate.toFixed(4))),
          label: {
            show: true,
            position: "top" as const,
            formatter: (p: { value: number }) => formatPercent(p.value),
          },
        },
        {
          name: "離脱率",
          type: "bar" as const,
          data: analysis.slice(1).map((a) => Number(a.dropRate.toFixed(4))),
          label: {
            show: true,
            position: "top" as const,
            formatter: (p: { value: number }) => formatPercent(p.value),
          },
        },
      ],
    }),
    [analysis],
  );

  const tableColumns: DataTableColumn<(typeof analysis)[number]>[] = [
    { key: "stage", header: "ステージ", render: (r) => r.stage.label },
    { key: "count", header: "件数", align: "right", render: (r) => formatNumber(r.stage.count) },
    {
      key: "pass",
      header: "通過率",
      align: "right",
      render: (r) => formatPercent(r.passRate),
    },
    {
      key: "drop",
      header: "離脱率",
      align: "right",
      render: (r) => formatPercent(r.dropRate),
    },
    {
      key: "overall",
      header: "累計通過率",
      align: "right",
      render: (r) => formatPercent(r.overallRate),
    },
  ];

  const handleReset = () => setStages(DEFAULT_POC_FUNNEL);

  const handleExportCsv = () => {
    downloadCsv(
      analysis.map((a) => ({
        ステージ: a.stage.label,
        件数: a.stage.count,
        通過率: Number(a.passRate.toFixed(4)),
        離脱率: Number(a.dropRate.toFixed(4)),
        累計通過率: Number(a.overallRate.toFixed(4)),
      })),
      "poc-funnel.csv",
    );
  };

  const handleExportPng = () => {
    const dataUrl = funnelRef.current?.getDataUrl();
    if (dataUrl) downloadDataUrl(dataUrl, "poc-funnel.png");
  };

  const updateStageCount = (index: number, value: number) => {
    setStages((prev) =>
      prev.map((s, i) => (i === index ? { ...s, count: Math.max(0, Math.round(value)) } : s)),
    );
  };

  return (
    <>
      <PageTitle
        title={t("page.funnel.title")}
        subtitle={t("page.funnel.subtitle")}
      >
        <ExportButtons
          onReset={handleReset}
          onExportCsv={handleExportCsv}
          onExportPng={handleExportPng}
        />
      </PageTitle>

      <div className={shared.layout}>
        <aside className={shared.controlPanel}>
          <div className={shared.controlGroupHeader}>各ステージの件数</div>
          <div className={styles.stageList}>
            {stages.map((stage, idx) => (
              <label key={stage.id} className={styles.stageField}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <input
                  className={styles.numberInput}
                  type="number"
                  min={0}
                  value={stage.count}
                  onChange={(e) => updateStageCount(idx, Number(e.target.value))}
                />
              </label>
            ))}
          </div>
          {warnings.length > 0 ? (
            <div className={styles.warning}>
              {warnings.map((w) => (
                <p key={w}>⚠ {w}</p>
              ))}
            </div>
          ) : null}
        </aside>

        <div className={shared.chartsStack}>
          <div className={shared.kpiRow}>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>最終転換率</span>
              <span className={shared.kpiValue}>{formatPercent(finalConversion)}</span>
              <span className={shared.kpiNote}>問い合わせ → 拡張利用</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>問い合わせ件数</span>
              <span className={shared.kpiValue}>
                {formatNumber(stages[0]?.count ?? 0)}
              </span>
              <span className={shared.kpiNote}>ファネル起点</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>拡張利用件数</span>
              <span className={shared.kpiValue}>
                {formatNumber(stages[stages.length - 1]?.count ?? 0)}
              </span>
              <span className={shared.kpiNote}>最終ステージ</span>
            </div>
          </div>

          <ChartCard
            title="案件ファネル"
            description="各ステージの件数と累計通過率"
            footerNote="累計通過率 = 当該ステージ件数 / 問い合わせ件数"
          >
            <EChart ref={funnelRef} option={funnelOption} height={380} />
          </ChartCard>

          <ChartCard
            title="ステージ別 通過率と離脱率"
            description="直前ステージからの遷移率を表示"
          >
            <EChart option={rateBarOption} height={320} />
          </ChartCard>

          <ChartCard title="ステージ別サマリー">
            <DataTable columns={tableColumns} rows={analysis} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title="分析コメント">
              <p>
                PoC開始までは進んでも、本番導入や継続利用に進む案件は大きく減少します。
                AI解析サービスでは、技術検証だけでなく業務実装、データ整備、運用体制が重要になります。
              </p>
            </InfoBox>
            <InfoBox title="読み取り方" variant="hint">
              <ul>
                <li>大きな段差があるステージが改善機会</li>
                <li>PoC成功 → 本番導入の段差は業務実装・体制依存であることが多い</li>
                <li>拡張利用の増減は顧客満足・効果実証の指標</li>
              </ul>
            </InfoBox>
          </div>

          <InfoBox title="前提" variant="warn">
            <p>
              本ファネルはサンプル値であり、自社実データに差し替えることで現実的な示唆が得られます。
            </p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
