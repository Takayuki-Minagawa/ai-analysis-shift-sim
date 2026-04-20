import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.inner}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
