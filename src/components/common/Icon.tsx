import type { CSSProperties } from "react";

// Hand-drawn 24x24 stroke icons. Kept inline to avoid adding an icon library.
const PATHS = {
  home: ["M3 10.5 12 3l9 7.5", "M5 9v11h5v-6h4v6h5V9"],
  trend: ["M3 20h18", "M4 16l5-5 4 3 7-8", "M15 6h5v5"],
  curve: ["M3 20h18", "M3 4v16", "M5 18c5 0 5-12 15-12"],
  scale: [
    "M12 3v18",
    "M7 21h10",
    "M4 7h16",
    "M4 7l-2.5 6a3 3 0 0 0 5 0z",
    "M20 7l-2.5 6a3 3 0 0 0 5 0z",
  ],
  funnel: ["M3 4h18l-7 8.5V19l-4 2v-8.5z"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
  radar: ["M12 2.5 20.5 8.5 17.5 19h-11L3.5 8.5z", "M12 7.5l4.5 3-1.5 5H9l-1.5-5z"],
  gauge: ["M3.5 16a8.5 8.5 0 1 1 17 0", "M12 16l4.5-5", "M12 16h.01"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z", "M4 20.5V5.5", "M8 7h8"],
  bulb: [
    "M9 18h6",
    "M10 21h4",
    "M12 3a6 6 0 0 0-3.8 10.6c.6.5.8 1.2.8 2V16h6v-.4c0-.8.3-1.5.8-2A6 6 0 0 0 12 3z",
  ],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  arrowRight: ["M5 12h14", "M13 6l6 6-6 6"],
  arrowLeft: ["M19 12H5", "M11 6l-6 6 6 6"],
  reset: ["M3.5 12a8.5 8.5 0 1 0 2.5-6", "M3 3.5V8h4.5"],
  download: ["M12 4v11", "M7 10.5l5 5 5-5", "M4 20h16"],
  image: ["M4 5h16v14H4z", "M4 16l4.5-4.5 4 4 2.5-2.5L20 18", "M15.5 9.5h.01"],
  sun: [
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    "M12 2v2",
    "M12 20v2",
    "M4.9 4.9l1.4 1.4",
    "M17.7 17.7l1.4 1.4",
    "M2 12h2",
    "M20 12h2",
    "M4.9 19.1l1.4-1.4",
    "M17.7 6.3l1.4-1.4",
  ],
  moon: ["M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"],
  globe: [
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    "M3 12h18",
    "M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9z",
  ],
  sparkle: [
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
    "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  ],
  info: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 11v5", "M12 7.5h.01"],
  alert: ["M12 3.5 2.5 20h19z", "M12 10v4.5", "M12 17.5h.01"],
  trophy: [
    "M8 4h8v5a4 4 0 0 1-8 0z",
    "M8 6H5a3 3 0 0 0 3 4",
    "M16 6h3a3 3 0 0 1-3 4",
    "M12 13v4",
    "M8.5 20.5h7",
    "M10 17h4v3.5h-4z",
  ],
  flag: ["M5 21V4", "M5 4h11l-2 4 2 4H5"],
  play: ["M7 4.5v15l12-7.5z"],
  close: ["M6 6l12 12", "M18 6L6 18"],
  question: [
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    "M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6",
    "M12 17h.01",
  ],
} as const;

export type IconName = keyof typeof PATHS;

type Props = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  /** Accessible label. When omitted, the icon is treated as decorative. */
  title?: string;
};

export function Icon({ name, size = 20, strokeWidth = 1.8, className, style, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
