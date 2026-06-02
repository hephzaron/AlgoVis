import { AlgorithmStep } from '../../types';

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