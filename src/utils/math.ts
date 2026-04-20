export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const logistic = (x: number, L: number, k: number, x0: number): number =>
  L / (1 + Math.exp(-k * (x - x0)));

export const average = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
};

export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : numerator / denominator;
