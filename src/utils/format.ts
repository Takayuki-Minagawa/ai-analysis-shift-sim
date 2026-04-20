const numberFormatter = new Intl.NumberFormat("ja-JP");
const decimal1 = new Intl.NumberFormat("ja-JP", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const decimal2 = new Intl.NumberFormat("ja-JP", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = (value: number): string => numberFormatter.format(value);

export const formatDecimal1 = (value: number): string => decimal1.format(value);

export const formatDecimal2 = (value: number): string => decimal2.format(value);

export const formatPercent = (ratio: number, digits = 1): string => {
  const multiplier = Math.pow(10, digits);
  const pct = Math.round(ratio * 100 * multiplier) / multiplier;
  return `${pct.toFixed(digits)}%`;
};

export const formatYen = (value: number): string => `¥${formatNumber(Math.round(value))}`;

export const formatCompactYen = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1_0000_0000) return `${formatDecimal1(value / 1_0000_0000)}億円`;
  if (abs >= 1_0000) return `${formatDecimal1(value / 1_0000)}万円`;
  return `${formatNumber(Math.round(value))}円`;
};

export const formatIndex = (value: number): string => formatDecimal1(value);
