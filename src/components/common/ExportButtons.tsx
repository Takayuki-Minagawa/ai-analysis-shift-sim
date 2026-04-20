import styles from "./ExportButtons.module.css";

type Props = {
  onExportCsv?: () => void;
  onExportPng?: () => void;
  onReset?: () => void;
};

export function ExportButtons({ onExportCsv, onExportPng, onReset }: Props) {
  return (
    <div className={styles.wrapper}>
      {onReset ? (
        <button type="button" className={styles.buttonGhost} onClick={onReset}>
          リセット
        </button>
      ) : null}
      {onExportCsv ? (
        <button type="button" className={styles.button} onClick={onExportCsv}>
          CSV
        </button>
      ) : null}
      {onExportPng ? (
        <button type="button" className={styles.button} onClick={onExportPng}>
          PNG
        </button>
      ) : null}
    </div>
  );
}
