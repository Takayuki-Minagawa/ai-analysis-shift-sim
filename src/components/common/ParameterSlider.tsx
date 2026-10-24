import { useId, type CSSProperties } from "react";
import styles from "./ParameterSlider.module.css";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description?: string;
  suffix?: string;
  formatValue?: (v: number) => string;
  onChange: (v: number) => void;
};

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  description,
  suffix,
  formatValue,
  onChange,
}: Props) {
  const id = useId();
  const descId = `${id}-desc`;
  const display = formatValue ? formatValue(value) : value.toString();
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <span key={display} className={styles.value}>
          {display}
          {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
        </span>
      </div>
      <input
        id={id}
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={suffix ? `${display}${suffix}` : display}
        aria-describedby={description ? descId : undefined}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div className={styles.bounds} aria-hidden>
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
      {description ? (
        <p id={descId} className={styles.description}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
