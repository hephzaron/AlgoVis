/**
 * Searching algorithm implementations that return visualization steps.
 */
import { AlgorithmStep } from '../../types';

/**
 * Yields visualization steps for a linear search over the array.
 * @param arr The search array.
 * @param target The value to locate.
 */
export function* linearSearchSteps(arr: number[], target: number): Generator<AlgorithmStep> {
  const array = [...arr];
  
  for (let i = 0; i < array.length; i++) {
    yield { array: [...array], comparing: [i] };
    
    if (array[i] === target) {
      yield { array: [...array], sorted: [i] };
      return;
    }
  }
  
  yield { array: [...array] };
}

/**
 * Yields visualization steps for a binary search on a sorted array.
 * @param arr The input array.
 * @param target The value to locate.
 */
export function* binarySearchSteps(arr: number[], target: number): Generator<AlgorithmStep> {
  const array = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    yield { array: [...array], comparing: [mid] };
    
    if (array[mid] === target) {
      yield { array: [...array], sorted: [mid] };
      return;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  yield { array: [...array] };
}