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

export function CompetitiveScorePage() {
  const { t } = useLanguage();
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
      xAxis: { type: "value" as const, name: "総合スコア (合計点)" },
      yAxis: {
        type: "category" as const,
        data: totals.map((t) => `${t.company.name} - ${t.company.type}`).reverse(),
        axisLabel: { fontSize: 11 },
      },
      series: [
        {
          type: "bar" as const,
          data: totals.map((t) => ({ value: t.total, itemStyle: { color: t.color } })).reverse(),
          label: { show: true, position: "right" as const },
          barMaxWidth: 20,
        },
      ],
    }),
    [totals],
  );

  const radarOption = useMemo(
    () => ({
      color: COMPANY_COLORS,
      tooltip: { trigger: "item" as const },
      legend: { top: 0, type: "scroll" as const },
      radar: {
        indicator: COMPETITIVE_AXES.map((a) => ({ name: a.label, max: 5 })),
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
    [],
  );

  const groupedBarOption = useMemo(
    () => ({
      color: COMPANY_COLORS,
      tooltip: { trigger: "axis" as const, axisPointer: { type: "shadow" as const } },
      legend: { top: 0 },
      grid: { top: 40, left: 56, right: 30, bottom: 60 },
      xAxis: {
        type: "category" as const,
        data: COMPETITIVE_AXES.map((a) => a.label),
        axisLabel: { rotate: 25 },
      },
      yAxis: { type: "value" as const, max: 5, name: "スコア" },
      series: COMPANY_SCORES.map((c) => ({
        name: c.name,
        type: "bar" as const,
        data: COMPETITIVE_AXES.map((a) => c[a.key]),
      })),
    }),
    [],
  );

  const tableColumns: DataTableColumn<CompanyScore>[] = [
    { key: "name", header: "企業", render: (r) => r.name },
    { key: "type", header: "タイプ", render: (r) => r.type },
    ...COMPETITIVE_AXES.map((a) => ({
      key: a.key,
      header: a.label,
      align: "right" as const,
      render: (r: CompanyScore) => r[a.key],
    })),
    {
      key: "total",
      header: "合計",
      align: "right" as const,
      render: (r: CompanyScore) => calculateCompanyTotal(r),
    },
  ];

  const handleExportCsv = () => {
    const rows = COMPANY_SCORES.map((c) => {
      const row: Record<string, string | number> = {
        企業: c.name,
        タイプ: c.type,
      };
      COMPETITIVE_AXES.forEach((a) => {
        row[a.label] = c[a.key];
      });
      row["合計"] = calculateCompanyTotal(c);
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
        <ChartCard title="企業別 総合スコア" description="8軸の合計点で相対比較">
          <EChart option={totalOption} height={320} />
        </ChartCard>

        <ChartCard
          title="競争力レーダーチャート"
          description="企業ごとの強み弱みプロファイルを重ね合わせ"
          footerNote="レーダーの形が広いほど全方位に強く、尖っているほど特化型。"
        >
          <EChart ref={radarRef} option={radarOption} height={420} />
        </ChartCard>

        <ChartCard title="評価軸別 グループ比較" description="各軸での企業間の相対差を確認">
          <EChart option={groupedBarOption} height={360} />
        </ChartCard>

        <ChartCard title="強み / 弱みサマリー">
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
                    {c.name} — <span style={{ color: "var(--color-text-muted)" }}>{c.type}</span>
                  </div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    <span style={{ color: "var(--color-success)", fontWeight: 600 }}>強み:</span>{" "}
                    {strengths.map((s) => `${s.label}(${s.score})`).join(" / ")}
                    {"  "}
                    <span style={{ color: "var(--color-warn)", fontWeight: 600, marginLeft: 8 }}>
                      弱み:
                    </span>{" "}
                    {weaknesses.map((w) => `${w.label}(${w.score})`).join(" / ")}
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="スコアテーブル">
          <DataTable columns={tableColumns} rows={COMPANY_SCORES} />
        </ChartCard>

        <div className={shared.twoColumnGrid}>
          <InfoBox title="分析コメント">
            <p>
              汎用AI分析プラットフォームはコスト効率や汎用性で強みがあります。
              一方で、規制産業や専門業界では、業界知識、説明可能性、セキュリティが競争力を左右します。
            </p>
          </InfoBox>
          <InfoBox title="読み取り方" variant="hint">
            <ul>
              <li>合計スコアが高い = 総合力が強い (ただし特化型の価値は総合点で測れない)</li>
              <li>レーダーの形: 円に近い = バランス型 / 尖り = 特化型</li>
              <li>同一軸で全社低い場合、業界共通の構造的課題</li>
            </ul>
          </InfoBox>
        </div>

        <InfoBox title="前提" variant="warn">
          <p>
            本企業データは架空の比較用サンプルです。実企業のスコアとは無関係であり、戦略判断には実調査が必要です。
          </p>
        </InfoBox>
      </div>
    </>
  );
}
