import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../progress/ProgressContext";
import { fillTemplate } from "../../utils/format";
import { Icon } from "../common/Icon";
import { ProgressRing } from "../common/ProgressRing";
import styles from "./Header.module.css";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const { completedCount, totalLessons } = useProgress();

  const themeLabel = theme === "light" ? t("theme.toggle.toDark") : t("theme.toggle.toLight");
  const nextLanguageLabel = lang === "ja" ? "EN" : "JA";
  const progressLabel = fillTemplate(t("progress.ariaTpl"), {
    done: completedCount,
    total: totalLessons,
  });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden>
            <svg viewBox="0 0 32 32" width="22" height="22">
              <path d="M5 25c6 0 7-15 13-15 3 0 5 3 9 3" />
              <circle cx="18" cy="10" r="2.6" />
            </svg>
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>{t("app.title")}</span>
            <span className={styles.brandSubtitle}>{t("app.subtitle")}</span>
          </span>
        </Link>
        <div className={styles.actions}>
          <span className={styles.badge}>{t("app.sampleBadge")}</span>
          <Link to="/" className={styles.progress} aria-label={progressLabel} title={progressLabel}>
            <ProgressRing value={completedCount} total={totalLessons} size={30} stroke={3.5} />
            <span className={styles.progressText}>
              <span className={styles.progressLabel}>{t("progress.label")}</span>
              <span className={styles.progressCount}>
                {completedCount}
                <span className={styles.progressTotal}>/{totalLessons}</span>
              </span>
            </span>
          </Link>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleLanguage}
            aria-label={t("language.toggle")}
            title={t("language.toggle")}
          >
            <Icon name="globe" size={16} />
            <span className={styles.iconText}>{nextLanguageLabel}</span>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span key={theme} className={styles.themeGlyph}>
              <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
