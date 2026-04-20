import * as echarts from "echarts";

const APP_DARK_THEME = {
  backgroundColor: "transparent",
  textStyle: { color: "#e2e8f0" },
  title: {
    textStyle: { color: "#e2e8f0" },
    subtextStyle: { color: "#94a3b8" },
  },
  legend: {
    textStyle: { color: "#cbd5e1" },
    inactiveColor: "#475569",
  },
  tooltip: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    textStyle: { color: "#e2e8f0" },
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
  echarts.registerTheme("app-dark", APP_DARK_THEME);
  registered = true;
}
