import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./MethodologyPage.module.css";

const MARKET_CODE = `marketSize(t) = initialMarketSize × (1 + growthRate) ^ t
  t       : years since the start year (0, 1, 2, ...)
  growth  : Conservative 8% / Base 15% / Aggressive 25% (default)`;

const ADOPTION_CODE = `adoption(t) = L / (1 + exp(-k × (year - x0)))
  L  : ceiling of the adoption rate (e.g. 0.85)
  k  : diffusion speed (steepness of the curve)
  x0 : midpoint year (at which adoption = L / 2)`;

const COST_CODE = `totalCost = fixedCost + costPerCase × monthlyCases
revenue   = revenuePerCase × monthlyCases
profit    = revenue − totalCost
breakEven = fixedCost / (revenuePerCase − costPerCase)`;

const FUNNEL_CODE = `passRate(i)     = stage(i).count / stage(i-1).count
overallRate(i)  = stage(i).count / stage(0).count`;

export function MethodologyPage() {
  const { t, tList } = useLanguage();
  return (
    <>
      <PageTitle
        title={t("page.methodology.title")}
        subtitle={t("page.methodology.subtitle")}
      />

      <InfoBox title={t("methodology.purpose.title")} variant="info">
        <p>{t("methodology.purpose.body")}</p>
      </InfoBox>

      <section className={styles.section}>
        <h2 className={styles.heading}>{t("methodology.modelsHeading")}</h2>

        <div className={styles.modelBlock}>
          <h3>{t("methodology.market.title")}</h3>
          <pre className={styles.code}>{MARKET_CODE}</pre>
          <p>{t("methodology.market.body")}</p>
        </div>

        <div className={styles.modelBlock}>
          <h3>{t("methodology.adoption.title")}</h3>
          <pre className={styles.code}>{ADOPTION_CODE}</pre>
          <p>{t("methodology.adoption.body")}</p>
        </div>

        <div className={styles.modelBlock}>
          <h3>{t("methodology.cost.title")}</h3>
          <pre className={styles.code}>{COST_CODE}</pre>
          <p>{t("methodology.cost.body")}</p>
        </div>

        <div className={styles.modelBlock}>
          <h3>{t("methodology.funnel.title")}</h3>
          <pre className={styles.code}>{FUNNEL_CODE}</pre>
          <p>{t("methodology.funnel.body")}</p>
        </div>

        <div className={styles.modelBlock}>
          <h3>{t("methodology.score.title")}</h3>
          <p>{t("methodology.score.body")}</p>
        </div>
      </section>

      <InfoBox title={t("methodology.dataNature.title")} variant="warn">
        <p>{t("methodology.dataNature.body")}</p>
      </InfoBox>

      <InfoBox title={t("methodology.realData.title")} variant="hint">
        <ul>
          {tList("methodology.realData.list").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfoBox>

      <InfoBox title={t("methodology.charts.title")}>
        <ul>
          {tList("methodology.charts.list").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfoBox>
    </>
  );
}
