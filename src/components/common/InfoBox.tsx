import { ReactNode } from "react";
import styles from "./InfoBox.module.css";

type Variant = "info" | "warn" | "hint";

type Props = {
  title: string;
  variant?: Variant;
  children: ReactNode;
};

export function InfoBox({ title, variant = "info", children }: Props) {
  return (
    <aside className={[styles.box, styles[variant]].join(" ")}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
