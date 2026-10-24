import { useEffect, useState } from "react";
import { findRoute } from "../app/routes";
import { Icon } from "../components/common/Icon";
import { ProgressRing } from "../components/common/ProgressRing";
import { useLanguage } from "../i18n/LanguageContext";
import { fillTemplate } from "../utils/format";
import { useProgress } from "./ProgressContext";
import styles from "./AchievementToast.module.css";

const AUTO_DISMISS_MS = 4200;
const SPARKS = Array.from({ length: 8 }, (_, i) => i);

export function AchievementToast() {
  const { t } = useLanguage();
  const { achievement, dismissAchievement, totalLessons } = useProgress();
  // Hovering or focusing the toast pauses auto-dismiss so it can be read.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!achievement || paused) return;
    const timer = window.setTimeout(dismissAchievement, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [achievement, paused, dismissAchievement]);

  const route = achievement ? findRoute(achievement.path) : undefined;
  const allDone = achievement ? achievement.completedCount >= totalLessons : false;

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {achievement && route ? (
        <div
          key={achievement.id}
          className={[styles.toast, allDone ? styles.grand : ""].join(" ")}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className={styles.badge}>
            <ProgressRing
              value={achievement.completedCount}
              total={totalLessons}
              size={44}
              stroke={4}
            />
            <span className={styles.badgeIcon}>
              <Icon name={allDone ? "trophy" : "check"} size={18} strokeWidth={2.6} />
            </span>
            <span className={styles.sparks} aria-hidden>
              {SPARKS.map((i) => (
                <span key={i} style={{ transform: `rotate(${i * 45}deg)` }} />
              ))}
            </span>
          </span>
          <span className={styles.text}>
            <span className={styles.title}>
              {fillTemplate(t("toast.completedTpl"), { label: t(route.labelKey) })}
            </span>
            <span className={styles.sub}>
              {allDone
                ? t("toast.allDone")
                : fillTemplate(t("toast.progressTpl"), {
                    done: achievement.completedCount,
                    total: totalLessons,
                  })}
            </span>
          </span>
          <button
            type="button"
            className={styles.close}
            onClick={() => {
              setPaused(false);
              dismissAchievement();
            }}
            aria-label={t("toast.close")}
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
