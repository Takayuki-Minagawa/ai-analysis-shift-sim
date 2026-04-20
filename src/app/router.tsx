import { HashRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { MarketGrowthPage } from "../pages/MarketGrowthPage";
import { AdoptionCurvePage } from "../pages/AdoptionCurvePage";
import { CostBenefitPage } from "../pages/CostBenefitPage";
import { PocFunnelPage } from "../pages/PocFunnelPage";
import { IndustryDemandPage } from "../pages/IndustryDemandPage";
import { CompetitiveScorePage } from "../pages/CompetitiveScorePage";
import { ScenarioDashboardPage } from "../pages/ScenarioDashboardPage";
import { MethodologyPage } from "../pages/MethodologyPage";
import { ManualPage } from "../pages/ManualPage";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/market-growth" element={<MarketGrowthPage />} />
          <Route path="/adoption-curve" element={<AdoptionCurvePage />} />
          <Route path="/cost-benefit" element={<CostBenefitPage />} />
          <Route path="/poc-funnel" element={<PocFunnelPage />} />
          <Route path="/industry-demand" element={<IndustryDemandPage />} />
          <Route path="/competitive-score" element={<CompetitiveScorePage />} />
          <Route path="/scenario-dashboard" element={<ScenarioDashboardPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
