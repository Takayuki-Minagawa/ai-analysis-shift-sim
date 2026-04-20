import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../pages/HomePage";

const MarketGrowthPage = lazy(() =>
  import("../pages/MarketGrowthPage").then((m) => ({ default: m.MarketGrowthPage })),
);
const AdoptionCurvePage = lazy(() =>
  import("../pages/AdoptionCurvePage").then((m) => ({ default: m.AdoptionCurvePage })),
);
const CostBenefitPage = lazy(() =>
  import("../pages/CostBenefitPage").then((m) => ({ default: m.CostBenefitPage })),
);
const PocFunnelPage = lazy(() =>
  import("../pages/PocFunnelPage").then((m) => ({ default: m.PocFunnelPage })),
);
const IndustryDemandPage = lazy(() =>
  import("../pages/IndustryDemandPage").then((m) => ({ default: m.IndustryDemandPage })),
);
const CompetitiveScorePage = lazy(() =>
  import("../pages/CompetitiveScorePage").then((m) => ({ default: m.CompetitiveScorePage })),
);
const ScenarioDashboardPage = lazy(() =>
  import("../pages/ScenarioDashboardPage").then((m) => ({
    default: m.ScenarioDashboardPage,
  })),
);
const MethodologyPage = lazy(() =>
  import("../pages/MethodologyPage").then((m) => ({ default: m.MethodologyPage })),
);
const ManualPage = lazy(() =>
  import("../pages/ManualPage").then((m) => ({ default: m.ManualPage })),
);

function PageFallback() {
  return <div style={{ padding: "24px", color: "var(--color-text-muted)" }}>…</div>;
}

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/market-growth"
            element={
              <Suspense fallback={<PageFallback />}>
                <MarketGrowthPage />
              </Suspense>
            }
          />
          <Route
            path="/adoption-curve"
            element={
              <Suspense fallback={<PageFallback />}>
                <AdoptionCurvePage />
              </Suspense>
            }
          />
          <Route
            path="/cost-benefit"
            element={
              <Suspense fallback={<PageFallback />}>
                <CostBenefitPage />
              </Suspense>
            }
          />
          <Route
            path="/poc-funnel"
            element={
              <Suspense fallback={<PageFallback />}>
                <PocFunnelPage />
              </Suspense>
            }
          />
          <Route
            path="/industry-demand"
            element={
              <Suspense fallback={<PageFallback />}>
                <IndustryDemandPage />
              </Suspense>
            }
          />
          <Route
            path="/competitive-score"
            element={
              <Suspense fallback={<PageFallback />}>
                <CompetitiveScorePage />
              </Suspense>
            }
          />
          <Route
            path="/scenario-dashboard"
            element={
              <Suspense fallback={<PageFallback />}>
                <ScenarioDashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/manual"
            element={
              <Suspense fallback={<PageFallback />}>
                <ManualPage />
              </Suspense>
            }
          />
          <Route
            path="/methodology"
            element={
              <Suspense fallback={<PageFallback />}>
                <MethodologyPage />
              </Suspense>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
