import { useMemo, useRef } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import { COMPANY_SCORES } from "../data/companyScores";
import {
  COMPETITIVE_AXES,
  calculateCompanyTotal,
  getStrengthsAndWeaknesses,
} from "../models/competitiveScore";
import type { CompanyScore } from "../types/analysis";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import shared from "./pageShared.module.css";

const COMPANY_COLORS = ["#1f6feb", "#ff8a3d", "#17a673", "#8e44ad", "#d97706"];
const axisKey = (k: string) => `axis.competitive.${k}`;

export function CompetitiveScorePage() {
  const { t, tList } = useLanguage();
  const radarRef = useRef<EChartHandle>(null);

  const totals = useMemo(
    () =>
      COMPANY_SCORES.map((c, i) => ({
        company: c,
        total: calculateCompanyTotal(c),
        color: COMPANY_COLORS[i % COMPANY_COLORS.length],
      })).sort((a, b) => b.total - a.total),
    [],
  );

  const totalOption = useMemo(
    () => ({
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      grid: { top: 20, left: 120, right: 40, bottom: 30 },
      xAxis: { type: "value" as const, name: t("competitive.total.xAxis") },
      yAxis: {
        type: "category" as const,
        data: totals.map((x) => `${x.company.name} - ${t(x.company.typeKey)}`).reverse(),
        axisLabel: { fontSize: 11 },
      },
      series: [
        {
          type: "bar" as const,
          data: totals.map((x) => ({ value: x.total, itemStyle: { color: x.color } })).reverse(),
          label: { show: true, position: "right" as const },
          barMaxWidth: 20,
        },
      ],
    }),
    [totals, t],
  );

  const radarOption = useMemo(
    () => ({
      color: COMPANY_COLORS,
      tooltip: { trigger: "item" as const },
      legend: { top: 0, type: "scroll" as const },
      radar: {
        indicator: COMPETITIVE_AXES.map((a) => ({ name: t(axisKey(a.key)), max: 5 })),
        shape: "polygon" as const,
        radius: "65%",
        splitArea: { areaStyle: { color: ["#f8fbff", "#ffffff"] } },
      },
      series: [
        {
          type: "radar" as const,
          data: COMPANY_SCORES.map((c) => ({
            name: `${c.name}`,
            value: COMPETITIVE_AXES.map((a) => c[a.key]),
            areaStyle: { opacity: 0.12 },
            lineStyle: { width: 2 },
          })),
        },
      ],
    }),
    [t],
  );

  const groupedBarOption = useMemo(
    () => ({
      color: COMPANY_COLORS,
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      legend: { top: 0 },
      grid: { top: 40, left: 56, right: 30, bottom: 60 },
      xAxis: {
        type: "category" as const,
        data: COMPETITIVE_AXES.map((a) => t(axisKey(a.key))),
        axisLabel: { rotate: 25 },
      },
      yAxis: { type: "value" as const, max: 5, name: t("common.score") },
      series: COMPANY_SCORES.map((c) => ({
        name: c.name,
        type: "bar" as const,
        data: COMPETITIVE_AXES.map((a) => c[a.key]),
      })),
    }),
    [t],
  );

  const tableColumns: DataTableColumn<CompanyScore>[] = [
    { key: "name", header: t("common.company"), render: (r) => r.name },
    { key: "type", header: t("common.type"), render: (r) => t(r.typeKey) },
    ...COMPETITIVE_AXES.map((a) => ({
      key: a.key,
      header: t(axisKey(a.key)),
      align: "right" as const,
      render: (r: CompanyScore) => r[a.key],
    })),
    {
      key: "total",
      header: t("common.total"),
      align: "right" as const,
      render: (r: CompanyScore) => calculateCompanyTotal(r),
    },
  ];

  const handleExportCsv = () => {
    const rows = COMPANY_SCORES.map((c) => {
      const row: Record<string, string | number> = {
        [t("common.company")]: c.name,
        [t("common.type")]: t(c.typeKey),
      };
      COMPETITIVE_AXES.forEach((a) => {
        row[t(axisKey(a.key))] = c[a.key];
      });
      row[t("common.total")] = calculateCompanyTotal(c);
      return row;
    });
    downloadCsv(rows, "competitive-score.csv");
  };

  const handleExportPng = () => {
    const url = radarRef.current?.getDataUrl();
    if (url) downloadDataUrl(url, "competitive-score.png");
  };

  return (
    <>
      <PageTitle
        title={t("page.competitive.title")}
        subtitle={t("page.competitive.subtitle")}
      >
        <ExportButtons onExportCsv={handleExportCsv} onExportPng={handleExportPng} />
      </PageTitle>

      <div className={shared.chartsStack}>
        <ChartCard title={t("competitive.total.title")} description={t("competitive.total.desc")}>
          <EChart option={totalOption} height={320} />
        </ChartCard>

        <ChartCard
          title={t("competitive.radar.title")}
          description={t("competitive.radar.desc")}
          footerNote={t("competitive.radar.footer")}
        >
          <EChart ref={radarRef} option={radarOption} height={420} />
        </ChartCard>

        <ChartCard title={t("competitive.grouped.title")} description={t("competitive.grouped.desc")}>
          <EChart option={groupedBarOption} height={360} />
        </ChartCard>

        <ChartCard title={t("competitive.strengths.title")}>
          <div style={{ display: "grid", gap: 12 }}>
            {COMPANY_SCORES.map((c) => {
              const { strengths, weaknesses } = getStrengthsAndWeaknesses(c);
              return (
                <div
                  key={c.id}
                  style={{
                    padding: "10px 14px",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    background: "var(--color-surface-alt)",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {c.name} — <span style={{ color: "var(--color-text-muted)" }}>{t(c.typeKey)}</span>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                      {t("competitive.strengths.label")}
                    </span>{" "}
                    {strengths.map((s) => `${t(axisKey(s.key))}(${s.score})`).join(" / ")}
                    {"  "}
                    <span style={{ color: "var(--color-warn)", fontWeight: 600, marginLeft: 8 }}>
                      {t("competitive.weaknesses.label")}
                    </span>{" "}
                    {weaknesses.map((w) => `${t(axisKey(w.key))}(${w.score})`).join(" / ")}
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title={t("competitive.table.title")}>
          <DataTable columns={tableColumns} rows={COMPANY_SCORES} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <InfoBox title={t("market.comment.title")}>
            <p>{t("competitive.comment.body")}</p>
          </InfoBox>
          <InfoBox title={t("market.read.title")} variant="hint">
            <ul>
              {tList("competitive.read.list").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InfoBox>
        </div>

        <InfoBox title={t("dashboard.assumptions.title")} variant="warn">
          <p>{t("competitive.assumptions.body")}</p>
        </InfoBox>
      </div>
    </>
  );
}
