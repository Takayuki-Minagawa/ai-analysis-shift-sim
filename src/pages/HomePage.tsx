import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { GUIDE_ROUTES, LESSON_ROUTES, accentStyle } from "../app/routes";
import { Icon } from "../components/common/Icon";
import { InfoBox } from "../components/common/InfoBox";
import { ProgressRing } from "../components/common/ProgressRing";
import { useLanguage } from "../i18n/LanguageContext";
import { useFormatters } from "../i18n/useFormatters";
import { calculateMarketGrowth } from "../models/marketGrowth";
import { useProgress } from "../progress/ProgressContext";
import { fillTemplate, formatPercent } from "../utils/format";
import styles from "./HomePage.module.css";

// Lesson that lets the learner test each entry of "home.hypotheses" (same order).
const HYPOTHESIS_PATHS = [
  "/scenario-dashboard",
  "/adoption-curve",
  "/cost-benefit",
  "/poc-funnel",
  "/competitive-score",
];

const DEMO_YEARS = 10;

function HeroDemo() {
  const { t } = useLanguage();
  const f = useFormatters();
  const [rate, setRate] = useState(0.15);
  const series = useMemo(
    () =>
      calculateMarketGrowth({
        initialMarketSize: 1,
        startYear: 0,
        endYear: DEMO_YEARS,
        growthRate: rate,
      }),
    [rate],
  );
  const final = series[series.length - 1]?.marketSize ?? 1;
  // Keep a floor so slow growth reads as "flat" instead of filling the box.
  const scale = Math.max(final, 3);

  return (
    <div className={styles.demo}>
      <div className={styles.demoHead}>
        <span className={styles.demoTitle}>
          <Icon name="sparkle" size={15} />
          {t("home.demo.title")}
        </span>
        <span className={styles.demoResult}>
          <span className={styles.demoResultLabel}>{t("home.demo.resultTpl")}</span>
          <span key={final.toFixed(1)} className={styles.demoResultValue}>
            {f.decimal1(final)}
            <small>{t("home.demo.times")}</small>
          </span>
        </span>
      </div>
      <div className={styles.demoBars} role="img" aria-label={t("home.demo.aria")}>
        {series.map((p, i) => (
          <span
            key={p.year}
            className={styles.demoBar}
            style={
              {
                height: `${(p.marketSize / scale) * 100}%`,
                "--i": i,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.demoControl}>
        <span className={styles.demoControlLabel}>
          <label htmlFor="hero-demo-rate">{t("home.demo.rate")}</label>
          <strong aria-hidden>{formatPercent(rate, 0)}</strong>
        </span>
        <input
          id="hero-demo-rate"
          type="range"
          min={0}
          max={0.4}
          step={0.01}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          aria-valuetext={formatPercent(rate, 0)}
          style={{ "--fill": `${(rate / 0.4) * 100}%` } as CSSProperties}
        />
      </div>
      <Link to={LESSON_ROUTES[0].path} className={styles.demoMore}>
        {t("home.demo.more")}
        <Icon name="arrowRight" size={14} />
      </Link>
    </div>
  );
}

export function HomePage() {
  const { lang, t, tList } = useLanguage();
  const { statusOf, completedCount, totalLessons, resetProgress } = useProgress();
  const hypotheses = tList("home.hypotheses");
  const titleParts = tList("home.titleParts");

  const nextIndex = LESSON_ROUTES.findIndex((r) => statusOf(r.path) !== "completed");
  const allDone = nextIndex === -1;
  const nextLesson = allDone ? LESSON_ROUTES[LESSON_ROUTES.length - 1] : LESSON_ROUTES[nextIndex];
  const ctaLabel = allDone
    ? t("home.cta.review")
    : completedCount === 0
      ? t("home.cta.start")
      : fillTemplate(t("home.cta.continueTpl"), {
          label: `${fillTemplate(t("lesson.stepTpl"), { n: nextIndex + 1 })} ${t(nextLesson.labelKey)}`,
        });

  const progressMessage = allDone
    ? t("home.progress.msg3")
    : completedCount === 0
      ? t("home.progress.msg0")
      : completedCount >= totalLessons - 2
        ? t("home.progress.msg2")
        : t("home.progress.msg1");

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroText}>
          <p className={styles.kicker}>{t("home.kicker")}</p>
          <h1 className={styles.heroTitle}>
            {titleParts.length > 0
              ? titleParts.map((part, i) => (
                  <span key={part}>
                    {i > 0 && lang === "en" ? " " : null}
                    <span className={styles.titlePart}>{part}</span>
                  </span>
                ))
              : t("home.title")}
          </h1>
          <p className={styles.heroLead}>{t("home.lead")}</p>
          <div className={styles.ctaRow}>
            <Link to={nextLesson.path} className={styles.ctaPrimary}>
              <Icon name={allDone ? "gauge" : "play"} size={16} />
              {ctaLabel}
            </Link>
            <Link to="/manual" className={styles.ctaSecondary}>
              <Icon name="book" size={16} />
              {t("home.cta.manual")}
            </Link>
          </div>
        </div>
        <HeroDemo />
      </section>

      <section className={styles.progressPanel} aria-labelledby="home-progress-title">
        <ProgressRing
          value={completedCount}
          total={totalLessons}
          size={76}
          stroke={7}
          label={`${Math.round((completedCount / totalLessons) * 100)}%`}
        />
        <div className={styles.progressBody}>
          <h2 id="home-progress-title" className={styles.progressTitle}>
            {t("home.progress.title")}
            <span className={styles.progressCount}>
              {fillTemplate(t("home.progress.countTpl"), {
                done: completedCount,
                total: totalLessons,
              })}
            </span>
          </h2>
          <p className={styles.progressMessage}>{progressMessage}</p>
          <ol className={styles.progressDots} aria-hidden>
            {LESSON_ROUTES.map((r, i) => (
              <li
                key={r.path}
                className={styles[`dot_${statusOf(r.path)}`]}
                style={accentStyle(r)}
                title={t(r.labelKey)}
              >
                {statusOf(r.path) === "completed" ? (
                  <Icon name="check" size={11} strokeWidth={3.2} />
                ) : (
                  i + 1
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.progressSide}>
          {completedCount > 0 || allDone ? (
            <button type="button" className={styles.resetButton} onClick={resetProgress}>
              <Icon name="reset" size={14} />
              {t("home.progress.reset")}
            </button>
          ) : null}
          <span className={styles.progressNote}>{t("home.progress.note")}</span>
        </div>
      </section>

      <section>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHeading}>{t("home.sectionPath")}</h2>
          <p className={styles.sectionLead}>{t("home.sectionPathLead")}</p>
        </div>
        <ol className={styles.lessons}>
          {LESSON_ROUTES.map((route, i) => {
            const status = statusOf(route.path);
            return (
              <li key={route.path} className={styles.lessonItem}>
                <Link
                  to={route.path}
                  className={[styles.lessonCard, styles[`lesson_${status}`]].join(" ")}
                  style={accentStyle(route)}
                >
                  <span className={styles.lessonTop}>
                    <span className={styles.lessonIcon}>
                      <Icon name={route.icon} size={22} />
                    </span>
                    <span className={styles.lessonStep}>
                      {fillTemplate(t("lesson.stepTpl"), { n: i + 1 })}
                    </span>
                    <span className={[styles.statusChip, styles[`chip_${status}`]].join(" ")}>
                      {status === "completed" ? (
                        <Icon name="check" size={12} strokeWidth={3} />
                      ) : null}
                      {t(`status.${status}`)}
                    </span>
                  </span>
                  <span className={styles.lessonMain}>
                    <span className={styles.lessonTitle}>{t(route.labelKey)}</span>
                    <span className={styles.lessonDesc}>{t(route.descKey)}</span>
                    {route.conceptKey ? (
                      <span className={styles.lessonConcept}>#{t(route.conceptKey)}</span>
                    ) : null}
                  </span>
                  {route.questionKey ? (
                    <span className={styles.lessonQuestion}>
                      <span className={styles.qMark} aria-hidden>
                        Q
                      </span>
                      {t(route.questionKey)}
                    </span>
                  ) : null}
                  <span className={styles.lessonGo} aria-hidden>
                    <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHeading}>{t("home.sectionHypotheses")}</h2>
          <p className={styles.sectionLead}>{t("home.sectionHypothesesLead")}</p>
        </div>
        <ul className={styles.hypotheses}>
          {hypotheses.map((h, i) => {
            const path = HYPOTHESIS_PATHS[i];
            const lesson = LESSON_ROUTES.find((r) => r.path === path);
            const step = LESSON_ROUTES.findIndex((r) => r.path === path) + 1;
            return (
              <li
                key={h}
                className={styles.hypothesis}
                style={lesson ? accentStyle(lesson) : undefined}
              >
                <span className={styles.hypothesisNo} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.hypothesisText}>{h}</p>
                {lesson ? (
                  <Link to={lesson.path} className={styles.hypothesisLink}>
                    <Icon name={lesson.icon} size={14} />
                    {fillTemplate(t("home.hypothesis.verifyTpl"), { n: step })}
                    <Icon name="arrowRight" size={14} />
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionHeading}>{t("home.sectionGuides")}</h2>
        </div>
        <div className={styles.guides}>
          {GUIDE_ROUTES.map((route) => (
            <Link key={route.path} to={route.path} className={styles.guideCard}>
              <span className={styles.guideIcon}>
                <Icon name={route.icon} size={20} />
              </span>
              <span className={styles.guideText}>
                <span className={styles.guideTitle}>{t(route.labelKey)}</span>
                <span className={styles.guideDesc}>{t(route.descKey)}</span>
              </span>
              <Icon name="arrowRight" size={18} className={styles.guideArrow} />
            </Link>
          ))}
        </div>
      </section>

      <InfoBox title={t("home.dataWarnTitle")} variant="warn">
        <p>{t("home.dataWarnBody")}</p>
      </InfoBox>
    </>
  );
}
