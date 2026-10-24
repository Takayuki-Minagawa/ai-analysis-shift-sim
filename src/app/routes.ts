import type { IconName } from "../components/common/Icon";

export type RouteKind = "home" | "lesson" | "guide";

export type AppRoute = {
  path: string;
  labelKey: string;
  descKey: string;
  kind: RouteKind;
  icon: IconName;
  /** Accent color for the route's icon tile and highlights. */
  accent: string;
  /** Key concept learned on the page (lessons only). */
  conceptKey?: string;
  /** Curiosity question shown on the page and on the home map (lessons only). */
  questionKey?: string;
};

export const APP_ROUTES: AppRoute[] = [
  {
    path: "/",
    labelKey: "route.home.label",
    descKey: "route.home.desc",
    kind: "home",
    icon: "home",
    accent: "#4353e6",
  },
  {
    path: "/market-growth",
    labelKey: "route.marketGrowth.label",
    descKey: "route.marketGrowth.desc",
    kind: "lesson",
    icon: "trend",
    accent: "#3b82f6",
    conceptKey: "route.marketGrowth.concept",
    questionKey: "route.marketGrowth.question",
  },
  {
    path: "/adoption-curve",
    labelKey: "route.adoption.label",
    descKey: "route.adoption.desc",
    kind: "lesson",
    icon: "curve",
    accent: "#8b5cf6",
    conceptKey: "route.adoption.concept",
    questionKey: "route.adoption.question",
  },
  {
    path: "/cost-benefit",
    labelKey: "route.cost.label",
    descKey: "route.cost.desc",
    kind: "lesson",
    icon: "scale",
    accent: "#e8890c",
    conceptKey: "route.cost.concept",
    questionKey: "route.cost.question",
  },
  {
    path: "/poc-funnel",
    labelKey: "route.funnel.label",
    descKey: "route.funnel.desc",
    kind: "lesson",
    icon: "funnel",
    accent: "#e2468f",
    conceptKey: "route.funnel.concept",
    questionKey: "route.funnel.question",
  },
  {
    path: "/industry-demand",
    labelKey: "route.industry.label",
    descKey: "route.industry.desc",
    kind: "lesson",
    icon: "grid",
    accent: "#0ea5a0",
    conceptKey: "route.industry.concept",
    questionKey: "route.industry.question",
  },
  {
    path: "/competitive-score",
    labelKey: "route.competitive.label",
    descKey: "route.competitive.desc",
    kind: "lesson",
    icon: "radar",
    accent: "#ef5a4c",
    conceptKey: "route.competitive.concept",
    questionKey: "route.competitive.question",
  },
  {
    path: "/scenario-dashboard",
    labelKey: "route.dashboard.label",
    descKey: "route.dashboard.desc",
    kind: "lesson",
    icon: "gauge",
    accent: "#6366f1",
    conceptKey: "route.dashboard.concept",
    questionKey: "route.dashboard.question",
  },
  {
    path: "/manual",
    labelKey: "route.manual.label",
    descKey: "route.manual.desc",
    kind: "guide",
    icon: "book",
    accent: "#64748b",
  },
  {
    path: "/methodology",
    labelKey: "route.methodology.label",
    descKey: "route.methodology.desc",
    kind: "guide",
    icon: "bulb",
    accent: "#64748b",
  },
];

export const LESSON_ROUTES: AppRoute[] = APP_ROUTES.filter((r) => r.kind === "lesson");
export const GUIDE_ROUTES: AppRoute[] = APP_ROUTES.filter((r) => r.kind === "guide");

export function findRoute(path: string): AppRoute | undefined {
  return APP_ROUTES.find((r) => r.path === path);
}

/** 1-based step number of a lesson, or 0 when the path is not a lesson. */
export function lessonStep(path: string): number {
  return LESSON_ROUTES.findIndex((r) => r.path === path) + 1;
}
