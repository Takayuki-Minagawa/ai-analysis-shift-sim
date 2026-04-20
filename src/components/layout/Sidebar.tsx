import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../app/routes";
import { useLanguage } from "../../i18n/LanguageContext";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { t } = useLanguage();
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label={t("nav.section")}>
        <div className={styles.sectionLabel}>{t("nav.section")}</div>
        <ul className={styles.list}>
          {APP_ROUTES.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                end={route.path === "/"}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ""].join(" ")
                }
              >
                <span className={styles.linkLabel}>{t(route.labelKey)}</span>
                <span className={styles.linkDesc}>{t(route.descKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
