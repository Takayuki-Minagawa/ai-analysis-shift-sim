import styles from "./ProgressRing.module.css";

type Props = {
  value: number;
  total: number;
  size?: number;
  stroke?: number;
  /** Text rendered in the center of the ring. */
  label?: string;
};

export function ProgressRing({ value, total, size = 40, stroke = 4, label }: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = total > 0 ? Math.min(value / total, 1) : 0;
  return (
    <span className={styles.ring} style={{ width: size, height: size }} aria-hidden>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className={[styles.bar, ratio >= 1 ? styles.full : ""].join(" ")}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
        />
      </svg>
      {label ? <span className={styles.label}>{label}</span> : null}
    </span>
  );
}
