import * as echarts from "echarts";

const APP_LIGHT_THEME = {
  backgroundColor: "transparent",
  legend: { icon: "roundRect", itemWidth: 14, itemHeight: 8, textStyle: { color: "#3a4358" } },
  tooltip: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderColor: "#e2e6f0",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: "#1b2236", fontSize: 12 },
    extraCssText: "border-radius:10px;box-shadow:0 10px 24px -10px rgba(20,28,60,0.3);",
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: "#cdd3e3" } },
    axisTick: { show: false },
    axisLabel: { color: "#5a6478" },
    nameTextStyle: { color: "#5a6478" },
  },
  valueAxis: {
    axisLabel: { color: "#5a6478" },
    nameTextStyle: { color: "#5a6478" },
    splitLine: { lineStyle: { color: "#eceff6", type: "dashed" } },
  },
};

const APP_DARK_THEME = {
  backgroundColor: "transparent",
  textStyle: { color: "#e2e8f0" },
  title: {
    textStyle: { color: "#e2e8f0" },
    subtextStyle: { color: "#94a3b8" },
  },
  legend: {
    icon: "roundRect",
    itemWidth: 14,
    itemHeight: 8,
    textStyle: { color: "#cbd5e1" },
    inactiveColor: "#475569",
  },
  tooltip: {
    backgroundColor: "rgba(13,20,41,0.96)",
    borderColor: "#2a3558",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: "#e2e8f0", fontSize: 12 },
    extraCssText: "border-radius:10px;box-shadow:0 10px 24px -10px rgba(0,0,0,0.7);",
  },
  xAxis: {
    axisLine: { lineStyle: { color: "#334155" } },
    axisTick: { lineStyle: { color: "#334155" } },
    axisLabel: { color: "#cbd5e1" },
    nameTextStyle: { color: "#cbd5e1" },
    splitLine: { lineStyle: { color: "#1e293b" } },
    splitArea: { areaStyle: { color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.04)"] } },
  },
  yAxis: {
    axisLine: { lineStyle: { color: "#334155" } },
    axisTick: { lineStyle: { color: "#334155" } },
    axisLabel: { color: "#cbd5e1" },
    nameTextStyle: { color: "#cbd5e1" },
    splitLine: { lineStyle: { color: "#1e293b" } },
    splitArea: { areaStyle: { color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.04)"] } },
  },
  radar: {
    splitArea: { areaStyle: { color: ["rgba(255,255,255,0.03)", "rgba(255,255,255,0.06)"] } },
    splitLine: { lineStyle: { color: "#334155" } },
    axisLine: { lineStyle: { color: "#334155" } },
    axisName: { color: "#cbd5e1" },
  },
  visualMap: {
    textStyle: { color: "#cbd5e1" },
  },
};

let registered = false;

export function registerEchartsThemes(): void {
  if (registered) return;
  echarts.registerTheme("app-light", APP_LIGHT_THEME);
  echarts.registerTheme("app-dark", APP_DARK_THEME);
  registered = true;
}
