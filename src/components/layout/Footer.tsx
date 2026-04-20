import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.note}>{t("footer.note")}</p>
        <p className={styles.meta}>{t("footer.meta")}</p>
      </div>
    </footer>
  );
}
