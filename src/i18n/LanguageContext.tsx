import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TRANSLATIONS, type Language } from "./translations";

type LanguageContextValue = {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "app:lang";

function readInitialLanguage(): Language {
  if (typeof window === "undefined") return "ja";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ja" || saved === "en") return saved;
  } catch {
    // ignore
  }
  return "ja";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLanguage = useCallback((next: Language) => setLangState(next), []);
  const toggleLanguage = useCallback(
    () => setLangState((prev) => (prev === "ja" ? "en" : "ja")),
    [],
  );

  const t = useCallback(
    (key: string): string => {
      const value = TRANSLATIONS[lang][key] ?? TRANSLATIONS.ja[key];
      if (typeof value === "string") return value;
      return key;
    },
    [lang],
  );

  const tList = useCallback(
    (key: string): string[] => {
      const value = TRANSLATIONS[lang][key] ?? TRANSLATIONS.ja[key];
      if (Array.isArray(value)) return value;
      return [];
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t, tList }),
    [lang, setLanguage, toggleLanguage, t, tList],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useT(): (key: string) => string {
  return useLanguage().t;
}
