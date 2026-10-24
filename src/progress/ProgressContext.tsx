import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LESSON_ROUTES } from "../app/routes";

export type LessonStatus = "new" | "visited" | "completed";

type ProgressState = {
  visited: string[];
  completed: string[];
};

export type Achievement = {
  path: string;
  completedCount: number;
  /** Increments on every achievement so repeated toasts re-trigger. */
  id: number;
};

type ProgressContextValue = {
  visited: string[];
  completed: string[];
  completedCount: number;
  totalLessons: number;
  statusOf: (path: string) => LessonStatus;
  markVisited: (path: string) => void;
  markCompleted: (path: string) => void;
  resetProgress: () => void;
  achievement: Achievement | null;
  dismissAchievement: () => void;
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

const STORAGE_KEY = "app:progress";
const LESSON_PATHS = new Set(LESSON_ROUTES.map((r) => r.path));
const EMPTY: ProgressState = { visited: [], completed: [] };

function sanitize(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return list.filter((p): p is string => typeof p === "string" && LESSON_PATHS.has(p));
}

function readInitialProgress(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { visited: sanitize(parsed.visited), completed: sanitize(parsed.completed) };
  } catch {
    // ignore storage / parse errors
    return EMPTY;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(readInitialProgress);
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  // Mirrors state.completed synchronously so bursts of input events award only once.
  const completedRef = useRef<string[]>(state.completed);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  // Keep several open tabs in sync instead of letting them overwrite each other.
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      // key is null when another tab calls localStorage.clear().
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      const next = readInitialProgress();
      completedRef.current = next.completed;
      setState(next);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const markVisited = useCallback((path: string) => {
    if (!LESSON_PATHS.has(path)) return;
    setState((prev) =>
      prev.visited.includes(path) ? prev : { ...prev, visited: [...prev.visited, path] },
    );
  }, []);

  const markCompleted = useCallback((path: string) => {
    if (!LESSON_PATHS.has(path) || completedRef.current.includes(path)) return;
    const completed = [...completedRef.current, path];
    completedRef.current = completed;
    setState((prev) => ({
      visited: prev.visited.includes(path) ? prev.visited : [...prev.visited, path],
      completed,
    }));
    setAchievement((prev) => ({
      path,
      completedCount: completed.length,
      id: (prev?.id ?? 0) + 1,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    completedRef.current = [];
    setState(EMPTY);
    setAchievement(null);
  }, []);

  const dismissAchievement = useCallback(() => setAchievement(null), []);

  const statusOf = useCallback(
    (path: string): LessonStatus => {
      if (state.completed.includes(path)) return "completed";
      if (state.visited.includes(path)) return "visited";
      return "new";
    },
    [state],
  );

  const value = useMemo(
    () => ({
      visited: state.visited,
      completed: state.completed,
      completedCount: state.completed.length,
      totalLessons: LESSON_ROUTES.length,
      statusOf,
      markVisited,
      markCompleted,
      resetProgress,
      achievement,
      dismissAchievement,
    }),
    [state, statusOf, markVisited, markCompleted, resetProgress, achievement, dismissAchievement],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
