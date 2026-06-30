/**
 * Generates a random array of integers in the range [1, maxValue].
 * @param length The number of elements to generate.
 * @param maxValue The maximum value for each element.
 * @returns A new array of random integers.
 */
export function generateRandomArray(length: number, maxValue = 99) {
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

/**
 * Helper to find the line numbers for a function in the queue code.
 */
export function getFunctionLines(code: string, fnName: string, bodyLines = 1): number[] {
  const lines = code.split('\n');
  const result: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`def ${fnName}(`)) {
      result.push(i + 1);
      for (let j = 1; j <= bodyLines && i + j < lines.length; j++) {
        if (lines[i + j].trim() !== '') result.push(i + j + 1);
      }
      break;
    }
  }
  return result;
}