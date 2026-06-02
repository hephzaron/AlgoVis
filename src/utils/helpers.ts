/**
 * Generates a random array of integers in the range [1, maxValue].
 * @param length The number of elements to generate.
 * @param maxValue The maximum value for each element.
 * @returns A new array of random integers.
 */
export function generateRandomArray(length: number, maxValue = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
}

/**
 * Clamps a value between a minimum and maximum.
 * @param value The input value.
 * @param min The lower bound.
 * @param max The upper bound.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
