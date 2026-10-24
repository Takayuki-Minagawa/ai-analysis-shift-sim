import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  APP_ROUTES,
  GUIDE_ROUTES,
  LESSON_ROUTES,
  accentStyle,
  type AppRoute,
} from "../../app/routes";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../progress/ProgressContext";
import { fillTemplate } from "../../utils/format";
import { Icon } from "../common/Icon";
import styles from "./Sidebar.module.css";

const HOME_ROUTE = APP_ROUTES[0];

export function Sidebar() {
  const { t } = useLanguage();
  const { statusOf, completedCount, totalLessons } = useProgress();
  const { pathname } = useLocation();
  const listRef = useRef<HTMLElement | null>(null);

  // On the horizontal (mobile) nav, keep the active item in view.
  useEffect(() => {
    const nav = listRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    // Measure against the scroller itself; offsetLeft is relative to the nearest positioned <ul>.
    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left =
      nav.scrollLeft + activeRect.left - navRect.left - (nav.clientWidth - activeRect.width) / 2;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    nav.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [pathname]);

  const renderLink = (route: AppRoute, step?: number) => {
    const status = route.kind === "lesson" ? statusOf(route.path) : undefined;
    return (
      <li key={route.path}>
        <NavLink
          to={route.path}
          end={route.path === "/"}
          className={({ isActive }) => [styles.link, isActive ? styles.active : ""].join(" ")}
          style={accentStyle(route)}
        >
          <span className={styles.iconTile}>
            <Icon name={route.icon} size={17} />
          </span>
          <span className={styles.linkText}>
            <span className={styles.linkLabel}>
              {step ? <span className={styles.stepNo}>{step}</span> : null}
              {t(route.labelKey)}
            </span>
            <span className={styles.linkDesc}>{t(route.descKey)}</span>
          </span>
          {status ? (
            <span
              className={[styles.status, styles[status]].join(" ")}
              title={t(`status.${status}`)}
            >
              {status === "completed" ? <Icon name="check" size={12} strokeWidth={3} /> : null}
              <span className={styles.srOnly}>{t(`status.${status}`)}</span>
            </span>
          ) : null}
        </NavLink>
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav ref={listRef} className={styles.nav} aria-label={t("nav.section")}>
        <ul className={styles.list}>{renderLink(HOME_ROUTE)}</ul>

        <div className={styles.sectionLabel}>
          <span>{t("nav.lessons")}</span>
          <span className={styles.sectionCount}>
            {fillTemplate("{done}/{total}", { done: completedCount, total: totalLessons })}
          </span>
        </div>
        <div className={styles.meter} aria-hidden>
          <span style={{ width: `${(completedCount / totalLessons) * 100}%` }} />
        </div>
        <ul className={[styles.list, styles.lessonList].join(" ")}>
          {LESSON_ROUTES.map((route, i) => renderLink(route, i + 1))}
        </ul>

        <div className={styles.sectionLabel}>
          <span>{t("nav.guides")}</span>
        </div>
        <ul className={styles.list}>{GUIDE_ROUTES.map((route) => renderLink(route))}</ul>
      </nav>
    </aside>
  );
}
