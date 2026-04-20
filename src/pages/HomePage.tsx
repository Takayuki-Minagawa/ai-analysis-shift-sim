import { Link } from "react-router-dom";
import { APP_ROUTES } from "../app/routes";
import { InfoBox } from "../components/common/InfoBox";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./HomePage.module.css";

const pageCards = APP_ROUTES.filter((r) => r.path !== "/");

export function HomePage() {
  const { t, tList } = useLanguage();
  const hypotheses = tList("home.hypotheses");

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.kicker}>{t("home.kicker")}</p>
        <h1 className={styles.heroTitle}>{t("home.title")}</h1>
        <p className={styles.heroLead}>{t("home.lead")}</p>
      </section>

      <section>
        <h2 className={styles.sectionHeading}>{t("home.sectionTopics")}</h2>
        <div className={styles.cards}>
          {pageCards.map((card) => (
            <Link key={card.path} to={card.path} className={styles.card}>
              <span className={styles.cardLabel}>{t(card.labelKey)}</span>
              <span className={styles.cardDesc}>{t(card.descKey)}</span>
              <span className={styles.cardArrow} aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.hypothesesSection}>
        <h2 className={styles.sectionHeading}>{t("home.sectionHypotheses")}</h2>
        <ul className={styles.hypotheses}>
          {hypotheses.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <InfoBox title={t("home.dataWarnTitle")} variant="warn">
        <p>{t("home.dataWarnBody")}</p>
      </InfoBox>
    </>
  );
}
