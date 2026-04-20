import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Header.module.css";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  const themeLabel =
    theme === "light" ? t("theme.toggle.toDark") : t("theme.toggle.toLight");
  const nextLanguageLabel = lang === "ja" ? "English" : "日本語";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>AI</span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>{t("app.title")}</span>
            <span className={styles.brandSubtitle}>{t("app.subtitle")}</span>
          </span>
        </Link>
        <div className={styles.actions}>
          <span className={styles.badge}>{t("app.sampleBadge")}</span>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleLanguage}
            aria-label={t("language.toggle")}
            title={t("language.toggle")}
          >
            <span className={styles.iconText}>{nextLanguageLabel}</span>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span aria-hidden className={styles.iconGlyph}>
              {theme === "light" ? "🌙" : "☀"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
