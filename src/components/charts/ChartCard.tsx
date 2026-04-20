import { ReactNode } from "react";
import styles from "./ChartCard.module.css";

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
  footerNote?: ReactNode;
  children: ReactNode;
};

export function ChartCard({ title, description, actions, footerNote, children }: Props) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </header>
      <div className={styles.body}>{children}</div>
      {footerNote ? <footer className={styles.footer}>{footerNote}</footer> : null}
    </section>
  );
}
