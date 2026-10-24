import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { LESSON_ROUTES, accentStyle, findRoute, lessonStep } from "../../app/routes";
import { useLanguage } from "../../i18n/LanguageContext";
import { fillTemplate } from "../../utils/format";
import { Icon } from "./Icon";
import styles from "./PageTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function PageTitle({ title, subtitle, children }: Props) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const route = findRoute(pathname);
  const step = lessonStep(pathname);

  return (
    <header className={styles.wrapper} style={route ? accentStyle(route) : undefined}>
      <div className={styles.top}>
        {route ? (
          <span className={styles.iconTile}>
            <Icon name={route.icon} size={26} />
          </span>
        ) : null}
        <div className={styles.heading}>
          {step > 0 ? (
            <div className={styles.eyebrow}>
              <span className={styles.step}>
                {fillTemplate(t("lesson.stepOfTpl"), { n: step, total: LESSON_ROUTES.length })}
              </span>
              {route?.conceptKey ? (
                <span className={styles.concept}>
                  <span className={styles.conceptLabel}>{t("lesson.concept")}</span>
                  {t(route.conceptKey)}
                </span>
              ) : null}
            </div>
          ) : null}
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>

      {route?.questionKey ? (
        <p className={styles.question}>
          <span className={styles.questionBadge}>
            <Icon name="question" size={15} />
            {t("lesson.question")}
          </span>
          <span>{t(route.questionKey)}</span>
        </p>
      ) : null}
    </header>
  );
}
