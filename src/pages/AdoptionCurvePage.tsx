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
  type AdoptionPhase,
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

const PHASE_COLORS: Record<AdoptionPhase, string> = {
  early: "#94a3b8",
  growth: "#1f6feb",
  mature: "#17a673",
};

const PHASE_KEY: Record<AdoptionPhase, string> = {
  early: "phase.early",
  growth: "phase.growth",
  mature: "phase.mature",
};

export function AdoptionCurvePage() {
  const { t, tList } = useLanguage();
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
          return `${v.axisValue}<br/>${t("adoption.chart.series")}: <b>${v.data.toFixed(1)}%</b>`;
        },
      },
      grid: { top: 30, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        name: t("common.year"),
        nameLocation: "middle" as const,
        nameGap: 28,
        data: years,
      },
      yAxis: {
        type: "value" as const,
        name: t("adoption.yAxis"),
        min: 0,
        max: 100,
        axisLabel: { formatter: "{value}%" },
      },
      series: [
        {
          name: t("adoption.chart.series"),
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
            label: { formatter: t("adoption.chart.markLine") },
            data: [{ xAxis: params.centerYear.toString() }],
          },
        },
      ],
    };
  }, [series, params.centerYear, t]);

  const tableColumns: DataTableColumn<AdoptionCurvePoint>[] = [
    { key: "year", header: t("common.year"), render: (r) => r.year },
    {
      key: "rate",
      header: t("adoption.table.rate"),
      align: "right",
      render: (r) => formatPercent(r.adoptionRate),
    },
    { key: "phase", header: t("adoption.table.phase"), render: (r) => t(PHASE_KEY[r.phase]) },
  ];

  const handleReset = () => setParams(DEFAULT_PARAMS);

  const handleExportCsv = () => {
    downloadCsv(
      series.map((p) => ({
        [t("common.year")]: p.year,
        [t("adoption.table.rate")]: Number(p.adoptionRate.toFixed(4)),
        [`${t("adoption.table.rate")}(%)`]: Number(p.adoptionRatePercent.toFixed(2)),
        [t("adoption.table.phase")]: t(PHASE_KEY[p.phase]),
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
        <aside className={shared.controlPanel} aria-label={t("adoption.aside.aria")}>
          <div className={shared.controlGroupHeader}>{t("adoption.group.logistic")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("adoption.control.maxRate")}
              value={params.maxAdoptionRate}
              min={0.3}
              max={1}
              step={0.01}
              onChange={(v) => update("maxAdoptionRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description={t("adoption.control.maxRate.desc")}
            />
            <ParameterSlider
              label={t("adoption.control.speed")}
              value={params.speed}
              min={0.2}
              max={1.5}
              step={0.05}
              onChange={(v) => update("speed", v)}
              formatValue={(v) => v.toFixed(2)}
              description={t("adoption.control.speed.desc")}
            />
            <ParameterSlider
              label={t("adoption.control.center")}
              value={params.centerYear}
              min={2025}
              max={2034}
              step={1}
              onChange={(v) => update("centerYear", v)}
              description={t("adoption.control.center.desc")}
            />
          </div>
          <div className={shared.controlGroupHeader}>{t("adoption.group.period")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("adoption.control.startYear")}
              value={params.startYear}
              min={2020}
              max={2030}
              step={1}
              onChange={(v) => update("startYear", Math.min(v, params.endYear - 1))}
            />
            <ParameterSlider
              label={t("adoption.control.endYear")}
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
              <span className={shared.kpiLabel}>{t("adoption.kpi.center")}</span>
              <span className={shared.kpiValue}>{params.centerYear}</span>
              <span className={shared.kpiNote}>{t("adoption.kpi.center.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>{t("adoption.kpi.firstCross")}</span>
              <span className={shared.kpiValue}>{firstCrossYear ?? "—"}</span>
              <span className={shared.kpiNote}>{t("adoption.kpi.firstCross.note")}</span>
            </div>
            <div className={shared.kpiCard}>
              <span className={shared.kpiLabel}>
                {t("adoption.kpi.finalRateTpl").replace("{year}", String(params.endYear))}
              </span>
              <span className={shared.kpiValue}>{formatPercent(finalRate)}</span>
              <span className={shared.kpiNote}>{t("adoption.kpi.finalRate.note")}</span>
            </div>
          </div>

          <ChartCard
            title={t("adoption.chart.title")}
            description={t("adoption.chart.descTpl")
              .replace("{L}", formatPercent(params.maxAdoptionRate, 0))
              .replace("{k}", params.speed.toFixed(2))
              .replace("{x0}", String(params.centerYear))}
            footerNote={t("adoption.chart.footer")}
          >
            <EChart
              ref={chartRef}
              option={option}
              height={380}
              ariaLabel={t("adoption.chart.aria")}
            />
          </ChartCard>

          <ChartCard title={t("adoption.table.title")}>
            <DataTable columns={tableColumns} rows={series} maxHeight={320} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title={t("market.comment.title")}>
              <p>
                {t("adoption.comment.body").replace("{year}", String(params.centerYear))}
              </p>
            </InfoBox>
            <InfoBox title={t("market.read.title")} variant="hint">
              <ul>
                {tList("adoption.read.list").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>

          <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
            <p>{t("adoption.assumptions.body")}</p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
