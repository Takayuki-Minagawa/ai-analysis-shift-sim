import { PageTitle } from "../components/common/PageTitle";
import { InfoBox } from "../components/common/InfoBox";
import { useLanguage } from "../i18n/LanguageContext";
import styles from "./ManualPage.module.css";

const SECTION_KEYS = [
  "manual.sec.nav",
  "manual.sec.params",
  "manual.sec.export",
  "manual.sec.theme",
  "manual.sec.lang",
  "manual.sec.data",
  "manual.sec.tips",
];

export function ManualPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageTitle title={t("page.manual.title")} subtitle={t("page.manual.subtitle")} />

      <InfoBox title={t("page.manual.title")} variant="info">
        <p>{t("manual.intro")}</p>
      </InfoBox>

      <section className={styles.sections}>
        {SECTION_KEYS.map((key) => (
          <article key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>{t(`${key}.title`)}</h2>
            <p className={styles.sectionBody}>{t(`${key}.body`)}</p>
          </article>
        ))}
      </section>

      <InfoBox title={t("home.dataWarnTitle")} variant="warn">
        <p>{t("home.dataWarnBody")}</p>
      </InfoBox>
    </>
  );
}
