import { useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import {
  formatCompactYen,
  formatDecimal1,
  formatDecimal2,
  formatIndex,
  formatNumber,
  formatPercent,
  formatYen,
} from "../utils/format";

export function useFormatters() {
  const { lang } = useLanguage();
  return useMemo(
    () => ({
      lang,
      number: (v: number) => formatNumber(v, lang),
      decimal1: (v: number) => formatDecimal1(v, lang),
      decimal2: (v: number) => formatDecimal2(v, lang),
      percent: (v: number, digits = 1) => formatPercent(v, digits),
      yen: (v: number) => formatYen(v, lang),
      compactYen: (v: number) => formatCompactYen(v, lang),
      index: (v: number) => formatIndex(v, lang),
    }),
    [lang],
  );
}
