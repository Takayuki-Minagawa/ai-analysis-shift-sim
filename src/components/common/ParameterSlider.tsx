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
  const display = formatValue ? formatValue(value) : value.toString();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label className={styles.label}>{label}</label>
        <span className={styles.value}>
          {display}
          {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
        </span>
      </div>
      <input
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className={styles.bounds}>
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
