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
import { formatPercent } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import { useFormatters } from "../i18n/useFormatters";
import shared from "./pageShared.module.css";
import styles from "./PocFunnelPage.module.css";

const stageLabelKey = (id: string) => `funnel.stage.${id}`;

export function PocFunnelPage() {
  const { t, tList } = useLanguage();
  const f = useFormatters();
  const [stages, setStages] = useState<FunnelStageData[]>(DEFAULT_POC_FUNNEL);
  const funnelRef = useRef<EChartHandle>(null);

  const translatedStages = useMemo(
    () => stages.map((s) => ({ ...s, label: t(stageLabelKey(s.id)) })),
    [stages, t],
  );

  const analysis = useMemo(() => analyzeFunnel(translatedStages), [translatedStages]);

  const warnings = useMemo(() => {
    const msgs: string[] = [];
    for (let i = 1; i < translatedStages.length; i++) {
      if (translatedStages[i].count > translatedStages[i - 1].count) {
        msgs.push(
          t("funnel.warn.exceeds")
            .replace("{stage}", translatedStages[i].label)
            .replace("{prev}", translatedStages[i - 1].label),
        );
      }
    }
    return msgs;
  }, [translatedStages, t]);

  const finalConversion =
    analysis.length > 0 ? analysis[analysis.length - 1].overallRate : 0;

  const funnelOption = useMemo(
    () => ({
      color: ["#1f6feb"],
      tooltip: {
        trigger: "item" as const,
        formatter: (p: unknown) => {
          const info = p as { name: string; value: number; data: { overall: string } };
          return `${info.name}<br/>${t("funnel.tooltip.count")}: <b>${f.number(info.value)}</b><br/>${t("funnel.tooltip.overall")}: ${info.data.overall}`;
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
    [analysis, t, f],
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
          name: t("common.passRate"),
          type: "bar" as const,
          data: analysis.slice(1).map((a) => Number(a.passRate.toFixed(4))),
          label: {
            show: true,
            position: "top" as const,
            formatter: (p: { value: number }) => formatPercent(p.value),
          },
        },
        {
          name: t("common.dropRate"),
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
    [analysis, t],
  );

  const tableColumns: DataTableColumn<(typeof analysis)[number]>[] = [
    { key: "stage", header: t("common.stage"), render: (r) => r.stage.label },
    { key: "count", header: t("common.count"), align: "right", render: (r) => f.number(r.stage.count) },
    {
      key: "pass",
      header: t("common.passRate"),
      align: "right",
      render: (r) => formatPercent(r.passRate),
    },
    {
      key: "drop",
      header: t("common.dropRate"),
      align: "right",
      render: (r) => formatPercent(r.dropRate),
    },
    {
      key: "overall",
      header: t("common.overallRate"),
      align: "right",
      render: (r) => formatPercent(r.overallRate),
    },
  ];

  const handleReset = () => setStages(DEFAULT_POC_FUNNEL);

  const handleExportCsv = () => {
    downloadCsv(
      analysis.map((a) => ({
        [t("common.stage")]: a.stage.label,
        [t("common.count")]: a.stage.count,
        [t("common.passRate")]: Number(a.passRate.toFixed(4)),
        [t("common.dropRate")]: Number(a.dropRate.toFixed(4)),
        [t("common.overallRate")]: Number(a.overallRate.toFixed(4)),
      })),
      "poc-funnel.csv",
    );
  };

  const handleExportPng = () => {
    const dataUrl = funnelRef.current?.getDataUrl();
    if (dataUrl) downloadDataUrl(dataUrl, "poc-funnel.png");
  };

  const updateStageCount = (index: number, value: number) => {
    const safeValue = Math.max(0, Math.round(value));
    setStages((prev) => {
      const next = prev.map((s) => ({ ...s }));
      const cap = index === 0 ? safeValue : Math.min(safeValue, next[index - 1].count);
      next[index].count = cap;
      for (let i = index + 1; i < next.length; i++) {
        if (next[i].count > next[i - 1].count) {
          next[i].count = next[i - 1].count;
        }
      }
      return next;
    });
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
          <div className={shared.controlGroupHeader}>{t("funnel.group.stageCounts")}</div>
          <div className={styles.stageList}>
            {translatedStages.map((stage, idx) => (
              <label key={stage.id} className={styles.stageField}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <input
                  className={styles.numberInput}
                  type="number"
                  min={0}
                  max={idx === 0 ? undefined : translatedStages[idx - 1].count}
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
              <span className={shared.kpiLabel}>{t("funnel.kpi.finalConversion")}</span>
              <span className={shared.kpiValue}>{formatPercent(finalConversion)}</span>
              <span className={shared.kpiNote}>{t("funnel.kpi.finalConversion.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("funnel.kpi.inquiryCount")}</span>
              <span className={shared.kpiValue}>
                {f.number(stages[0]?.count ?? 0)}
              </span>
              <span className={shared.kpiNote}>{t("funnel.kpi.inquiryCount.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("funnel.kpi.expansionCount")}</span>
              <span className={shared.kpiValue}>
                {f.number(stages[stages.length - 1]?.count ?? 0)}
              </span>
              <span className={shared.kpiNote}>{t("funnel.kpi.expansionCount.note")}</span>
            </div>
          </div>

          <ChartCard
            title={t("funnel.chart.funnel.title")}
            description={t("funnel.chart.funnel.desc")}
            footerNote={t("funnel.chart.funnel.footer")}
          >
            <EChart ref={funnelRef} option={funnelOption} height={380} />
          </ChartCard>

          <ChartCard
            title={t("funnel.chart.rates.title")}
            description={t("funnel.chart.rates.desc")}
          >
            <EChart option={rateBarOption} height={320} />
          </ChartCard>

          <ChartCard title={t("funnel.chart.summary.title")}>
            <DataTable columns={tableColumns} rows={analysis} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title={t("market.comment.title")}>
              <p>{t("funnel.comment.body")}</p>
            </InfoBox>
            <InfoBox title={t("market.read.title")} variant="hint">
              <ul>
                {tList("funnel.read.list").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>

          <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
            <p>{t("funnel.assumptions.body")}</p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
