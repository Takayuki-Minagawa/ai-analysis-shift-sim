import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./app/router";
import { ThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ProgressProvider } from "./progress/ProgressContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <AppRouter />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
