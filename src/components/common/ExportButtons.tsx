import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./ExportButtons.module.css";

type Props = {
  onExportCsv?: () => void;
  onExportPng?: () => void;
  onReset?: () => void;
};

export function ExportButtons({ onExportCsv, onExportPng, onReset }: Props) {
  const { t } = useLanguage();
  return (
    <div className={styles.wrapper}>
      {onReset ? (
        <button type="button" className={styles.buttonGhost} onClick={onReset}>
          {t("common.reset")}
        </button>
      ) : null}
      {onExportCsv ? (
        <button type="button" className={styles.button} onClick={onExportCsv}>
          {t("common.csv")}
        </button>
      ) : null}
      {onExportPng ? (
        <button type="button" className={styles.button} onClick={onExportPng}>
          {t("common.png")}
        </button>
      ) : null}
    </div>
  );
}
