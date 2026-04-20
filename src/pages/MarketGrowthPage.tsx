import { useMemo, useRef, useState } from "react";
import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { ParameterSlider } from "../components/common/ParameterSlider";
import { ExportButtons } from "../components/common/ExportButtons";
import { ChartCard } from "../components/charts/ChartCard";
import { EChart, type EChartHandle } from "../components/charts/EChart";
import { DataTable, type DataTableColumn } from "../components/common/DataTable";
import {
  DEFAULT_MARKET_BASE,
  DEFAULT_MARKET_SCENARIOS,
} from "../data/marketScenarios";
import { calculateMultiScenarioGrowth } from "../models/marketGrowth";
import { formatPercent } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
import { useFormatters } from "../i18n/useFormatters";
import shared from "./pageShared.module.css";

type ScenarioInput = {
  initialMarketSize: number;
  startYear: number;
  endYear: number;
  conservativeRate: number;
  baseRate: number;
  aggressiveRate: number;
};

const DEFAULT_INPUT: ScenarioInput = {
  initialMarketSize: DEFAULT_MARKET_BASE.initialMarketSize,
  startYear: DEFAULT_MARKET_BASE.startYear,
  endYear: DEFAULT_MARKET_BASE.endYear,
  conservativeRate: DEFAULT_MARKET_SCENARIOS[0].growthRate,
  baseRate: DEFAULT_MARKET_SCENARIOS[1].growthRate,
  aggressiveRate: DEFAULT_MARKET_SCENARIOS[2].growthRate,
};

const SCENARIO_COLORS = ["#17a673", "#1f6feb", "#ff8a3d"];

export function MarketGrowthPage() {
  const { t, tList } = useLanguage();
  const f = useFormatters();
  const [input, setInput] = useState<ScenarioInput>(DEFAULT_INPUT);
  const trendChartRef = useRef<EChartHandle>(null);
  const finalChartRef = useRef<EChartHandle>(null);

  const scenarios = useMemo(
    () =>
      calculateMultiScenarioGrowth(
        {
          initialMarketSize: input.initialMarketSize,
          startYear: input.startYear,
          endYear: input.endYear,
        },
        [
          { id: "conservative", labelKey: "market.scenario.conservative", growthRate: input.conservativeRate },
          { id: "base", labelKey: "market.scenario.base", growthRate: input.baseRate },
          { id: "aggressive", labelKey: "market.scenario.aggressive", growthRate: input.aggressiveRate },
        ],
      ),
    [input],
  );

  const years = useMemo(() => {
    if (scenarios.length === 0) return [];
    return scenarios[0].series.map((p) => p.year);
  }, [scenarios]);

  const trendOption = useMemo(
    () => ({
      color: SCENARIO_COLORS,
      tooltip: {
        trigger: "axis" as const,
        valueFormatter: (value: number) => `${f.decimal1(Number(value))}`,
      },
      legend: { top: 0 },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        name: t("common.year"),
        nameLocation: "middle" as const,
        nameGap: 28,
        data: years,
      },
      yAxis: {
        type: "value" as const,
        name: t("market.yAxis.index"),
      },
      series: scenarios.map((s) => ({
        name: `${t(s.labelKey)} (${formatPercent(s.growthRate, 0)})`,
        type: "line" as const,
        smooth: true,
        lineStyle: { width: 3 },
        symbolSize: 6,
        data: s.series.map((p) => Number(p.marketSize.toFixed(2))),
      })),
    }),
    [scenarios, years, t, f],
  );

  const finalOption = useMemo(() => {
    const finalPoints = scenarios.map((s) => {
      const lastPoint = s.series[s.series.length - 1];
      return {
        label: t(s.labelKey),
        value: lastPoint ? Number(lastPoint.marketSize.toFixed(1)) : 0,
      };
    });
    return {
      color: SCENARIO_COLORS,
      tooltip: { trigger: "item" as const },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        data: finalPoints.map((p) => p.label),
      },
      yAxis: {
        type: "value" as const,
        name: t("market.yAxis.finalTpl").replace("{year}", String(input.endYear)),
      },
      series: [
        {
          type: "bar" as const,
          barMaxWidth: 80,
          data: finalPoints.map((p, i) => ({
            value: p.value,
            itemStyle: { color: SCENARIO_COLORS[i % SCENARIO_COLORS.length] },
          })),
          label: {
            show: true,
            position: "top" as const,
            formatter: (params: { value: number }) => f.decimal1(params.value),
          },
        },
      ],
    };
  }, [scenarios, input.endYear, t, f]);

  const tableColumns: DataTableColumn<{ year: number; values: number[] }>[] = [
    { key: "year", header: t("common.year"), render: (row) => row.year },
    ...scenarios.map((s, i) => ({
      key: s.id,
      header: t(s.labelKey),
      align: "right" as const,
      render: (row: { year: number; values: number[] }) => f.decimal1(row.values[i]),
    })),
  ];

  const tableRows = years.map((year, idx) => ({
    year,
    values: scenarios.map((s) => s.series[idx].marketSize),
  }));

  const handleReset = () => setInput(DEFAULT_INPUT);

  const handleExportCsv = () => {
    const rows = years.map((year, idx) => {
      const row: Record<string, string | number> = { [t("common.year")]: year };
      scenarios.forEach((s) => {
        row[t(s.labelKey)] = Number(s.series[idx].marketSize.toFixed(2));
      });
      return row;
    });
    downloadCsv(rows, "market-growth.csv");
  };

  const handleExportPng = () => {
    const dataUrl = trendChartRef.current?.getDataUrl();
    if (dataUrl) downloadDataUrl(dataUrl, "market-growth.png");
  };

  const update = <K extends keyof ScenarioInput>(key: K, value: ScenarioInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <PageTitle
        title={t("page.market.title")}
        subtitle={t("page.market.subtitle")}
      >
        <ExportButtons
          onReset={handleReset}
          onExportCsv={handleExportCsv}
          onExportPng={handleExportPng}
        />
      </PageTitle>

      <div className={shared.layout}>
        <aside className={shared.controlPanel} aria-label={t("market.aside.aria")}>
          <div className={shared.controlGroupHeader}>{t("market.group.conditions")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("market.control.initialSize")}
              value={input.initialMarketSize}
              min={50}
              max={500}
              step={10}
              onChange={(v) => update("initialMarketSize", v)}
              description={t("market.control.initialSize.desc")}
            />
            <ParameterSlider
              label={t("market.control.startYear")}
              value={input.startYear}
              min={2020}
              max={2030}
              step={1}
              onChange={(v) => update("startYear", Math.min(v, input.endYear - 1))}
            />
            <ParameterSlider
              label={t("market.control.endYear")}
              value={input.endYear}
              min={2026}
              max={2040}
              step={1}
              onChange={(v) => update("endYear", Math.max(v, input.startYear + 1))}
            />
          </div>

          <div className={shared.controlGroupHeader}>{t("market.group.scenarios")}</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label={t("market.control.conservativeRate")}
              value={input.conservativeRate}
              min={0}
              max={0.3}
              step={0.01}
              onChange={(v) => update("conservativeRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description={t("market.scenario.conservative.desc")}
            />
            <ParameterSlider
              label={t("market.control.baseRate")}
              value={input.baseRate}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("baseRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description={t("market.scenario.base.desc")}
            />
            <ParameterSlider
              label={t("market.control.aggressiveRate")}
              value={input.aggressiveRate}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(v) => update("aggressiveRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description={t("market.scenario.aggressive.desc")}
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <ChartCard
            title={t("market.trend.title")}
            description={t("market.trend.desc")}
            footerNote={t("market.trend.footer")}
          >
            <EChart
              ref={trendChartRef}
              option={trendOption}
              height={380}
              ariaLabel={t("market.trend.aria")}
            />
          </ChartCard>

          <ChartCard
            title={t("market.final.titleTpl").replace("{year}", String(input.endYear))}
            description={t("market.final.desc")}
          >
            <EChart
              ref={finalChartRef}
              option={finalOption}
              height={280}
              ariaLabel={t("market.final.aria")}
            />
          </ChartCard>

          <ChartCard
            title={t("market.table.title")}
            description={t("market.table.desc")}
          >
            <DataTable columns={tableColumns} rows={tableRows} maxHeight={360} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title={t("market.comment.title")}>
              <p>{t("market.comment.body")}</p>
            </InfoBox>
            <InfoBox title={t("market.read.title")} variant="hint">
              <ul>
                {tList("market.read.list").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoBox>
          </div>

          <InfoBox title={t("market.assumptions.title")} variant="warn">
            <p>{t("market.assumptions.body")}</p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
