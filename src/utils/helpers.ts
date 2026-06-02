export function generateRandomArray(length: number, maxValue = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
