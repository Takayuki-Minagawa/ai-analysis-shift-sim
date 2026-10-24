import { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./InfoBox.module.css";

type Variant = "info" | "warn" | "hint";

type Props = {
  title: string;
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_ICONS: Record<Variant, IconName> = {
  info: "info",
  warn: "alert",
  hint: "bulb",
};

export function InfoBox({ title, variant = "info", children }: Props) {
  return (
    <aside className={[styles.box, styles[variant]].join(" ")}>
      <h3 className={styles.title}>
        <span className={styles.icon}>
          <Icon name={VARIANT_ICONS[variant]} size={16} strokeWidth={2} />
        </span>
        {title}
      </h3>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
