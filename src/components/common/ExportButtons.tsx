import { useLanguage } from "../../i18n/LanguageContext";
import { Icon } from "./Icon";
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
          <Icon name="reset" size={15} className={styles.resetIcon} />
          {t("common.reset")}
        </button>
      ) : null}
      {onExportCsv ? (
        <button type="button" className={styles.button} onClick={onExportCsv}>
          <Icon name="download" size={15} />
          {t("common.csv")}
        </button>
      ) : null}
      {onExportPng ? (
        <button type="button" className={styles.button} onClick={onExportPng}>
          <Icon name="image" size={15} />
          {t("common.png")}
        </button>
      ) : null}
    </div>
  );
}
