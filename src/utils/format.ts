import type { Language } from "../i18n/translations";

const locales: Record<Language, string> = { ja: "ja-JP", en: "en-US" };

const numberFormatters: Record<Language, Intl.NumberFormat> = {
  ja: new Intl.NumberFormat(locales.ja),
  en: new Intl.NumberFormat(locales.en),
};
const decimal1Formatters: Record<Language, Intl.NumberFormat> = {
  ja: new Intl.NumberFormat(locales.ja, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  en: new Intl.NumberFormat(locales.en, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
};
const decimal2Formatters: Record<Language, Intl.NumberFormat> = {
  ja: new Intl.NumberFormat(locales.ja, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  en: new Intl.NumberFormat(locales.en, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};
const compactEn = new Intl.NumberFormat(locales.en, {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number, lang: Language = "ja"): string =>
  numberFormatters[lang].format(value);

export const formatDecimal1 = (value: number, lang: Language = "ja"): string =>
  decimal1Formatters[lang].format(value);

export const formatDecimal2 = (value: number, lang: Language = "ja"): string =>
  decimal2Formatters[lang].format(value);

export const formatPercent = (ratio: number, digits = 1): string => {
  const multiplier = Math.pow(10, digits);
  const pct = Math.round(ratio * 100 * multiplier) / multiplier;
  return `${pct.toFixed(digits)}%`;
};

export const formatYen = (value: number, lang: Language = "ja"): string =>
  `¥${formatNumber(Math.round(value), lang)}`;

export const formatCompactYen = (value: number, lang: Language = "ja"): string => {
  if (lang === "en") {
    const sign = value < 0 ? "-" : "";
    return `${sign}¥${compactEn.format(Math.abs(value))}`;
  }
  const abs = Math.abs(value);
  if (abs >= 1_0000_0000) return `${formatDecimal1(value / 1_0000_0000, "ja")}億円`;
  if (abs >= 1_0000) return `${formatDecimal1(value / 1_0000, "ja")}万円`;
  return `${formatNumber(Math.round(value), "ja")}円`;
};

export const formatIndex = (value: number, lang: Language = "ja"): string =>
  formatDecimal1(value, lang);
