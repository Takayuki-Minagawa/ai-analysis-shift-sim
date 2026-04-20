import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./app/router";
import { ThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { registerEchartsThemes } from "./theme/echartsTheme";
import "./styles/global.css";

registerEchartsThemes();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
