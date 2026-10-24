import { Link } from "react-router-dom";
import { LESSON_ROUTES, accentStyle, lessonStep } from "../../app/routes";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../progress/ProgressContext";
import { fillTemplate } from "../../utils/format";
import { Icon } from "../common/Icon";
import styles from "./LessonNav.module.css";

type Props = {
  path: string;
};

export function LessonNav({ path }: Props) {
  const { t } = useLanguage();
  const { statusOf, markCompleted, completedCount, totalLessons } = useProgress();
  const step = lessonStep(path);
  const prev = LESSON_ROUTES[step - 2];
  const next = LESSON_ROUTES[step];
  const done = statusOf(path) === "completed";
  const allDone = completedCount >= totalLessons;

  return (
    <nav className={styles.wrapper} aria-label={t("nav.lessons")}>
      <div className={[styles.status, done ? styles.statusDone : ""].join(" ")}>
        <span className={styles.statusIcon}>
          <Icon name={done ? "check" : "flag"} size={18} strokeWidth={done ? 3 : 2} />
        </span>
        <div className={styles.statusText}>
          <span className={styles.statusStep}>
            {fillTemplate(t("lesson.stepOfTpl"), { n: step, total: totalLessons })}
          </span>
          <span className={styles.statusTitle}>
            {done ? t("lesson.completed") : t("lesson.completeHint")}
          </span>
        </div>
        {done ? null : (
          <button
            type="button"
            className={styles.completeButton}
            onClick={() => markCompleted(path)}
          >
            <Icon name="check" size={16} strokeWidth={2.4} />
            {t("lesson.complete")}
          </button>
        )}
      </div>

      <div className={styles.links}>
        {prev ? (
          <Link
            to={prev.path}
            className={[styles.card, styles.prev].join(" ")}
            style={accentStyle(prev)}
          >
            <Icon name="arrowLeft" size={18} className={styles.arrow} />
            <span className={styles.cardText}>
              <span className={styles.cardEyebrow}>{t("lesson.prev")}</span>
              <span className={styles.cardTitle}>{t(prev.labelKey)}</span>
            </span>
          </Link>
        ) : (
          <span className={styles.spacer} />
        )}
        {next ? (
          <Link
            to={next.path}
            className={[styles.card, styles.next].join(" ")}
            style={accentStyle(next)}
          >
            <span className={styles.cardIcon}>
              <Icon name={next.icon} size={20} />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardEyebrow}>
                {t("lesson.next")} · {fillTemplate(t("lesson.stepTpl"), { n: step + 1 })}
              </span>
              <span className={styles.cardTitle}>{t(next.labelKey)}</span>
              {next.questionKey ? (
                <span className={styles.cardQuestion}>{t(next.questionKey)}</span>
              ) : null}
            </span>
            <Icon name="arrowRight" size={18} className={styles.arrow} />
          </Link>
        ) : (
          <Link
            to={allDone ? "/methodology" : "/"}
            className={[styles.card, styles.next].join(" ")}
          >
            <span className={styles.cardIcon}>
              <Icon name={allDone ? "trophy" : "home"} size={20} />
            </span>
            <span className={styles.cardText}>
              <span className={styles.cardEyebrow}>
                {allDone ? t("lesson.finishTitle") : t("lesson.next")}
              </span>
              <span className={styles.cardTitle}>
                {allDone ? t("route.methodology.label") : t("lesson.backHome")}
              </span>
            </span>
            <Icon name="arrowRight" size={18} className={styles.arrow} />
          </Link>
        )}
      </div>
    </nav>
  );
}
