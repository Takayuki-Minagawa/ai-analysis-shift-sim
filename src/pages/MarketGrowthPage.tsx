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
import { formatDecimal1, formatPercent } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { downloadDataUrl } from "../utils/downloadImage";
import { useLanguage } from "../i18n/LanguageContext";
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
  const { t } = useLanguage();
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
          { id: "conservative", label: "Conservative", growthRate: input.conservativeRate },
          { id: "base", label: "Base", growthRate: input.baseRate },
          { id: "aggressive", label: "Aggressive", growthRate: input.aggressiveRate },
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
        valueFormatter: (value: number) => `${formatDecimal1(Number(value))}`,
      },
      legend: { top: 0 },
      grid: { top: 40, left: 56, right: 24, bottom: 40 },
      xAxis: {
        type: "category" as const,
        name: "年",
        nameLocation: "middle" as const,
        nameGap: 28,
        data: years,
      },
      yAxis: {
        type: "value" as const,
        name: "市場規模指数 (初年=100基準)",
      },
      series: scenarios.map((s) => ({
        name: `${s.label} (${formatPercent(s.growthRate, 0)})`,
        type: "line" as const,
        smooth: true,
        lineStyle: { width: 3 },
        symbolSize: 6,
        data: s.series.map((p) => Number(p.marketSize.toFixed(2))),
      })),
    }),
    [scenarios, years],
  );

  const finalOption = useMemo(() => {
    const finalPoints = scenarios.map((s) => {
      const lastPoint = s.series[s.series.length - 1];
      return {
        label: s.label,
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
        name: `${input.endYear}年 市場規模指数`,
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
            formatter: (params: { value: number }) => formatDecimal1(params.value),
          },
        },
      ],
    };
  }, [scenarios, input.endYear]);

  const tableColumns: DataTableColumn<{ year: number; values: number[] }>[] = [
    { key: "year", header: "年", render: (row) => row.year },
    ...scenarios.map((s, i) => ({
      key: s.id,
      header: s.label,
      align: "right" as const,
      render: (row: { year: number; values: number[] }) => formatDecimal1(row.values[i]),
    })),
  ];

  const tableRows = years.map((year, idx) => ({
    year,
    values: scenarios.map((s) => s.series[idx].marketSize),
  }));

  const handleReset = () => setInput(DEFAULT_INPUT);

  const handleExportCsv = () => {
    const rows = years.map((year, idx) => {
      const row: Record<string, string | number> = { 年: year };
      scenarios.forEach((s) => {
        row[s.label] = Number(s.series[idx].marketSize.toFixed(2));
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
        <aside className={shared.controlPanel} aria-label="シミュレーションパラメータ">
          <div className={shared.controlGroupHeader}>市場条件</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="初期市場規模 (指数)"
              value={input.initialMarketSize}
              min={50}
              max={500}
              step={10}
              onChange={(v) => update("initialMarketSize", v)}
              description="開始年の市場規模を指数(例:100=基準値)として設定"
            />
            <ParameterSlider
              label="開始年"
              value={input.startYear}
              min={2020}
              max={2030}
              step={1}
              onChange={(v) => update("startYear", Math.min(v, input.endYear - 1))}
            />
            <ParameterSlider
              label="終了年"
              value={input.endYear}
              min={2026}
              max={2040}
              step={1}
              onChange={(v) => update("endYear", Math.max(v, input.startYear + 1))}
            />
          </div>

          <div className={shared.controlGroupHeader}>シナリオ別 成長率</div>
          <div className={shared.controlsStack}>
            <ParameterSlider
              label="Conservative 成長率"
              value={input.conservativeRate}
              min={0}
              max={0.3}
              step={0.01}
              onChange={(v) => update("conservativeRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description="規制・人材不足により緩やかに成長するケース"
            />
            <ParameterSlider
              label="Base 成長率"
              value={input.baseRate}
              min={0}
              max={0.4}
              step={0.01}
              onChange={(v) => update("baseRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description="AI活用が一般化し安定成長するケース"
            />
            <ParameterSlider
              label="Aggressive 成長率"
              value={input.aggressiveRate}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(v) => update("aggressiveRate", v)}
              formatValue={(v) => formatPercent(v, 0)}
              description="AIエージェントと自動化が急速に普及するケース"
            />
          </div>
        </aside>

        <div className={shared.chartsStack}>
          <ChartCard
            title="シナリオ別 市場規模推移"
            description="複利成長を前提とした3シナリオの年次推移。Y軸は開始年を100とした指数。"
            footerNote="注: 成長率は年率。シナリオ間で数%の差でも長期ではスプレッドが大きく開きます。"
          >
            <EChart
              ref={trendChartRef}
              option={trendOption}
              height={380}
              ariaLabel="シナリオ別市場規模推移 折れ線グラフ"
            />
          </ChartCard>

          <ChartCard
            title={`${input.endYear}年時点 シナリオ別市場規模`}
            description="各シナリオの最終年の市場規模指数を比較"
          >
            <EChart
              ref={finalChartRef}
              option={finalOption}
              height={280}
              ariaLabel="終了年時点の市場規模比較 棒グラフ"
            />
          </ChartCard>

          <ChartCard
            title="年別市場規模テーブル"
            description="数値データを確認・エクスポートするためのテーブル"
          >
            <DataTable columns={tableColumns} rows={tableRows} maxHeight={360} />
          </ChartCard>

          <div className={shared.twoColumnGrid}>
            <InfoBox title="分析コメント">
              <p>
                Aggressive
                シナリオでは、成長率の複利効果により最終年の市場規模がBaseを大きく上回ります。
                AI解析サービス市場は、導入率の上昇とともに線形ではなく加速的に成長する可能性があります。
              </p>
            </InfoBox>
            <InfoBox title="読み取り方" variant="hint">
              <ul>
                <li>Y軸は初期年を基準(=初期市場規模)とした相対指数</li>
                <li>成長率の差は短期では小さく見えても、10年後には大きな差になります</li>
                <li>Conservative と Aggressive の開きが、シナリオ不確実性の幅を示す</li>
              </ul>
            </InfoBox>
          </div>

          <InfoBox title="前提条件とサンプルデータ" variant="warn">
            <p>
              本ページの市場規模は、実データではなくサンプル入力です。
              モデルは単純な複利成長 <code>marketSize = initial * (1 + g)^t</code>{" "}
              に基づいており、飽和、景気変動、政策影響は織り込んでいません。
            </p>
          </InfoBox>
        </div>
      </div>
    </>
  );
}
