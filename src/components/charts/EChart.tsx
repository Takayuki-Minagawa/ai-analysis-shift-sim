import { forwardRef, useImperativeHandle, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "../../theme/ThemeContext";
import { registerEchartsThemes } from "../../theme/echartsTheme";

registerEchartsThemes();

export type EChartHandle = {
  getDataUrl: () => string | undefined;
  getEchartsInstance: () => ReturnType<ReactECharts["getEchartsInstance"]> | undefined;
};

type Props = {
  option: Record<string, unknown>;
  height?: number | string;
  ariaLabel?: string;
};

export const EChart = forwardRef<EChartHandle, Props>(function EChart(
  { option, height = 360, ariaLabel },
  ref,
) {
  const chartRef = useRef<ReactECharts | null>(null);
  const { theme } = useTheme();
  const echartsTheme = theme === "dark" ? "app-dark" : undefined;

  useImperativeHandle(
    ref,
    () => ({
      getDataUrl: () => {
        const instance = chartRef.current?.getEchartsInstance();
        return instance?.getDataURL({
          type: "png",
          pixelRatio: 2,
          backgroundColor: theme === "dark" ? "#111a2e" : "#ffffff",
        });
      },
      getEchartsInstance: () => chartRef.current?.getEchartsInstance(),
    }),
    [theme],
  );

  return (
    <div role="img" aria-label={ariaLabel}>
      <ReactECharts
        key={theme}
        ref={chartRef}
        theme={echartsTheme}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        option={option as any}
        notMerge
        lazyUpdate
        style={{ height, width: "100%" }}
      />
    </div>
  );
});
