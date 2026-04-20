import { ReactNode } from "react";
import styles from "./PageTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function PageTitle({ title, subtitle, children }: Props) {
  return (
    <header className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {children ? <div className={styles.actions}>{children}</div> : null}
    </header>
  );
}
