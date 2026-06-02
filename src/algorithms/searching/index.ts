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
    yield {
      array: [...array],
      comparing: [i],
      activeLines: [2, 3],
      codeContext: 'loop'
    };
    
    if (array[i] === target) {
      yield {
        array: [...array],
        sorted: [i],
        activeLines: [4],
        codeContext: 'search'
      };
      return;
    }
  }
  
  yield {
    array: [...array],
    activeLines: [5],
    codeContext: 'search'
  };
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
    yield {
      array: [...array],
      comparing: [mid],
      activeLines: [4, 5, 6],
      codeContext: 'loop'
    };
    
    if (array[mid] === target) {
      yield {
        array: [...array],
        sorted: [mid],
        activeLines: [6, 7],
        codeContext: 'search'
      };
      return;
    } else if (array[mid] < target) {
      left = mid + 1;
      yield {
        array: [...array],
        activeLines: [8, 9],
        codeContext: 'search'
      };
    } else {
      right = mid - 1;
      yield {
        array: [...array],
        activeLines: [10, 11],
        codeContext: 'search'
      };
    }
  }
  
  yield {
    array: [...array],
    activeLines: [12],
    codeContext: 'search'
  };
}