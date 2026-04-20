export type AppRoute = {
  path: string;
  labelKey: string;
  descKey: string;
};

export const APP_ROUTES: AppRoute[] = [
  { path: "/", labelKey: "route.home.label", descKey: "route.home.desc" },
  {
    path: "/market-growth",
    labelKey: "route.marketGrowth.label",
    descKey: "route.marketGrowth.desc",
  },
  {
    path: "/adoption-curve",
    labelKey: "route.adoption.label",
    descKey: "route.adoption.desc",
  },
  { path: "/cost-benefit", labelKey: "route.cost.label", descKey: "route.cost.desc" },
  { path: "/poc-funnel", labelKey: "route.funnel.label", descKey: "route.funnel.desc" },
  {
    path: "/industry-demand",
    labelKey: "route.industry.label",
    descKey: "route.industry.desc",
  },
  {
    path: "/competitive-score",
    labelKey: "route.competitive.label",
    descKey: "route.competitive.desc",
  },
  {
    path: "/scenario-dashboard",
    labelKey: "route.dashboard.label",
    descKey: "route.dashboard.desc",
  },
  { path: "/manual", labelKey: "route.manual.label", descKey: "route.manual.desc" },
  {
    path: "/methodology",
    labelKey: "route.methodology.label",
    descKey: "route.methodology.desc",
  },
];
