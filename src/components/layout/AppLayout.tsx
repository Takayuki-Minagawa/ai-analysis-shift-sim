import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { lessonStep } from "../../app/routes";
import { useLanguage } from "../../i18n/LanguageContext";
import { useProgress } from "../../progress/ProgressContext";
import { AchievementToast } from "../../progress/AchievementToast";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { LessonNav } from "./LessonNav";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const { markVisited, markCompleted } = useProgress();
  const isLesson = lessonStep(pathname) > 0;
  const mainRef = useRef<HTMLElement | null>(null);
  const isFirstRoute = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    markVisited(pathname);
    // After in-app navigation, move focus to the new content so keyboard and
    // screen-reader users don't fall back to <body>.
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
    } else {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [pathname, markVisited]);

  // HashRouter owns the URL hash, so the skip link focuses <main> directly.
  const handleSkip = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    mainRef.current?.focus();
  };

  // A lesson counts as "experienced" once the learner changes a parameter or
  // touches a chart. Listening here keeps the pages themselves unchanged.
  const handleInput = () => {
    if (isLesson) markCompleted(pathname);
  };
  // `click` (not `pointerdown`) so a touch scroll that starts on a chart doesn't count.
  const handleChartClick = (e: SyntheticEvent) => {
    if (!isLesson) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('[role="img"]')) markCompleted(pathname);
  };

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link" onClick={handleSkip}>
        {t("a11y.skip")}
      </a>
      <Header />
      <Sidebar />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className={styles.main}
        onInputCapture={handleInput}
        onClickCapture={handleChartClick}
      >
        <div key={pathname} className={styles.inner}>
          <Outlet />
          {isLesson ? <LessonNav path={pathname} /> : null}
        </div>
      </main>
      <Footer />
      <AchievementToast />
    </div>
  );
}
