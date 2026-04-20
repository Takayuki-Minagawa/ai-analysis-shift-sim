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

const industryKey = (id: string) => `industry.${id}`;
const axisKey = (k: string) => `axis.industry.${k}`;

export function IndustryDemandPage() {
  const { t, tList } = useLanguage();
  const heatmapRef = useRef<EChartHandle>(null);

  const sorted = useMemo(() => sortByTotalScore(INDUSTRY_SCORES), []);

  const axisLabels = useMemo(
    () => INDUSTRY_AXES.map((a) => t(axisKey(a.key))),
    [t],
  );
  const industryLabels = useMemo(
    () => sorted.map((s) => t(industryKey(s.id))),
    [sorted, t],
  );

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
          return `${industryLabels[info.data[1]]} × ${axisLabels[info.data[0]]}<br/>${t("common.score")}: <b>${info.data[2]}</b>`;
        },
      },
      grid: { top: 40, left: 100, right: 30, bottom: 60 },
      xAxis: {
        type: "category" as const,
        data: axisLabels,
        axisLabel: { interval: 0, rotate: 20 },
        splitArea: { show: true },
      },
      yAxis: {
        type: "category" as const,
        data: industryLabels,
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
          name: t("common.score"),
          type: "heatmap" as const,
          data: heatmapData,
          label: { show: true, color: "#0f172a", fontWeight: 600 },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: "rgba(15,23,42,0.3)" },
          },
        },
      ],
    }),
    [heatmapData, axisLabels, industryLabels, t],
  );

  const totalOption = useMemo(
    () => ({
      color: ["#1f6feb"],
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      grid: { top: 20, left: 100, right: 40, bottom: 30 },
      xAxis: { type: "value" as const, name: t("industry.total.xAxis") },
      yAxis: {
        type: "category" as const,
        data: industryLabels.slice().reverse(),
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
    [sorted, industryLabels, t],
  );

  const scatterOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item" as const,
        formatter: (p: unknown) => {
          const info = p as { data: [number, number, string] };
          return t("industry.scatter.tooltipTpl")
            .replace("{name}", info.data[2])
            .replace("{x}", String(info.data[0]))
            .replace("{y}", String(info.data[1]));
        },
      },
      grid: { top: 30, left: 56, right: 30, bottom: 50 },
      xAxis: {
        type: "value" as const,
        name: t("industry.scatter.xAxis"),
        min: 0,
        max: 6,
        nameLocation: "middle" as const,
        nameGap: 28,
      },
      yAxis: {
        type: "value" as const,
        name: t("industry.scatter.yAxis"),
        min: 0,
        max: 6,
      },
      series: [
        {
          type: "scatter" as const,
          symbolSize: 22,
          itemStyle: { color: "#ff8a3d", opacity: 0.85 },
          data: INDUSTRY_SCORES.map((s) => [
            s.regulationRisk,
            s.roiPotential,
            t(industryKey(s.id)),
          ]),
          label: {
            show: true,
            position: "right" as const,
            formatter: (p: { data: [number, number, string] }) => p.data[2],
            fontSize: 11,
          },
        },
      ],
    }),
    [t],
  );

  const tableColumns: DataTableColumn<IndustryScore>[] = [
    { key: "industry", header: t("common.industry"), render: (r) => t(industryKey(r.id)) },
    ...INDUSTRY_AXES.map((axis) => ({
      key: axis.key,
      header: t(axisKey(axis.key)),
      align: "right" as const,
      render: (r: IndustryScore) => r[axis.key],
    })),
    {
      key: "total",
      header: t("common.total"),
      align: "right" as const,
      render: (r: IndustryScore) => calculateTotalScore(r),
    },
  ];

  const handleExportCsv = () => {
    const rows = INDUSTRY_SCORES.map((s) => {
      const row: Record<string, string | number> = { [t("common.industry")]: t(industryKey(s.id)) };
      INDUSTRY_AXES.forEach((a) => {
        row[t(axisKey(a.key))] = s[a.key];
      });
      row[t("common.total")] = calculateTotalScore(s);
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
          title={t("industry.heatmap.title")}
          description={t("industry.heatmap.desc")}
          footerNote={t("industry.heatmap.footer")}
        >
          <EChart ref={heatmapRef} option={heatmapOption} height={420} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <ChartCard title={t("industry.total.title")} description={t("industry.total.desc")}>
            <EChart option={totalOption} height={380} />
          </ChartCard>
          <ChartCard
            title={t("industry.scatter.title")}
            description={t("industry.scatter.desc")}
          >
            <EChart option={scatterOption} height={380} />
          </ChartCard>
        </div>

        <ChartCard title={t("industry.table.title")}>
          <DataTable columns={tableColumns} rows={INDUSTRY_SCORES} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <InfoBox title={t("market.comment.title")}>
            <p>{t("industry.comment.body")}</p>
          </InfoBox>
          <InfoBox title={t("market.read.title")} variant="hint">
            <ul>
              {tList("industry.read.list").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InfoBox>
        </div>

        <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
          <p>{t("industry.assumptions.body")}</p>
        </InfoBox>
      </div>
    </>
  );
}
