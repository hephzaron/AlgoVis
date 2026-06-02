/**
 * Sorting algorithms that yield visualization steps for the stack-based visualizer.
 * Each generator returns a sequence of AlgorithmStep objects describing comparisons,
 * swaps, and final sorting progress.
 */
import { AlgorithmStep } from '../../types';

/**
 * Generates visualization steps for merge sort.
 * @param arr The input array to sort.
 */
export function* mergeSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  
  /**
   * Merges two sorted subarrays and yields animation steps.
   */
  function* merge(l: number, m: number, r: number): Generator<AlgorithmStep> {
    const left = array.slice(l, m + 1);
    const right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    
    while (i < left.length && j < right.length) {
      yield {
        array: [...array],
        comparing: [l + i, m + 1 + j],
        activeLines: [13, 14],
        codeContext: 'loop'
      };
      
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
        yield {
          array: [...array],
          swapping: [k],
          activeLines: [15, 16],
          codeContext: 'swap'
        };
      } else {
        array[k] = right[j];
        j++;
        yield {
          array: [...array],
          swapping: [k],
          activeLines: [18, 19],
          codeContext: 'swap'
        };
      }
      
      k++;
    }
    
    while (i < left.length) {
      array[k] = left[i];
      yield {
        array: [...array],
        swapping: [k],
        activeLines: [20],
        codeContext: 'swap'
      };
      i++;
      k++;
    }
    
    while (j < right.length) {
      array[k] = right[j];
      yield {
        array: [...array],
        swapping: [k],
        activeLines: [21],
        codeContext: 'swap'
      };
      j++;
      k++;
    }
  }
  
  /**
   * Recursively sorts the array and yields merge steps.
   */
  function* sort(l: number, r: number): Generator<AlgorithmStep> {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      yield* sort(l, m);
      yield* sort(m + 1, r);
      yield* merge(l, m, r);
    }
  }
  
  yield* sort(0, n - 1);
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}

/**
 * Generates visualization steps for quick sort.
 * @param arr The array to sort.
 */
// Quick Sort Implementation
export function* quickSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  
  /**
   * Partitions the current array segment around a pivot element.
   */
  function* partition(low: number, high: number): Generator<number> {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      yield {
        array: [...array],
        comparing: [j, high],
        pivot: high,
        activeLines: [10, 11],
        codeContext: 'loop'
      };
      
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        yield {
          array: [...array],
          swapping: [i, j],
          activeLines: [12, 13],
          codeContext: 'swap'
        };
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    yield {
      array: [...array],
      swapping: [i + 1, high],
      activeLines: [14],
      codeContext: 'swap'
    };
    return i + 1;
  }
  
  /**
   * Recursively sorts the array segments around the pivot.
   */
  function* sort(low: number, high: number): Generator<AlgorithmStep> {
    if (low < high) {
      const pi = yield* partition(low, high);
      yield* sort(low, pi - 1);
      yield* sort(pi + 1, high);
    }
  }
  
  yield* sort(0, array.length - 1);
  yield { array: [...array], sorted: Array.from({ length: array.length }, (_, i) => i) };
}

/**
 * Generates visualization steps for insertion sort.
 * @param arr The array to sort.
 */
// Insertion Sort
export function* insertionSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > key) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        activeLines: [5],
        codeContext: 'loop'
      };
      array[j + 1] = array[j];
      yield {
        array: [...array],
        swapping: [j + 1],
        activeLines: [6],
        codeContext: 'swap'
      };
      j--;
    }
    array[j + 1] = key;
    yield {
      array: [...array],
      swapping: [j + 1],
      activeLines: [8],
      codeContext: 'swap'
    };
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}

/**
 * Generates visualization steps for bubble sort.
 * @param arr The array to sort.
 */
// Bubble Sort
export function* bubbleSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        activeLines: [4, 5],
        codeContext: 'loop'
      };
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield {
          array: [...array],
          swapping: [j, j + 1],
          activeLines: [6],
          codeContext: 'swap'
        };
      }
    }
    yield { array: [...array], sorted: [n - i - 1] };
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}

/**
 * Generates visualization steps for selection sort.
 * @param arr The array to sort.
 */
// Selection Sort
export function* selectionSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...array],
        comparing: [j, minIdx],
        activeLines: [5, 6],
        codeContext: 'loop'
      };
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield {
        array: [...array],
        swapping: [i, minIdx],
        activeLines: [8],
        codeContext: 'swap'
      };
    }
    yield { array: [...array], sorted: [i] };
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}

/**
 * Generates visualization steps for heap sort.
 * @param arr The array to sort.
 */
// Heap Sort
export function* heapSortSteps(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  
  function* heapify(i: number, size: number): Generator<AlgorithmStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < size) {
      yield {
        array: [...array],
        comparing: [left, largest],
        activeLines: [12],
        codeContext: 'compare'
      };
      if (array[left] > array[largest]) largest = left;
    }
    
    if (right < size) {
      yield {
        array: [...array],
        comparing: [right, largest],
        activeLines: [14],
        codeContext: 'compare'
      };
      if (array[right] > array[largest]) largest = right;
    }
    
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      yield {
        array: [...array],
        swapping: [i, largest],
        activeLines: [17],
        codeContext: 'swap'
      };
      yield* heapify(largest, size);
    }
  }
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(i, n);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    yield {
      array: [...array],
      swapping: [0, i],
      sorted: [i],
      activeLines: [5],
      codeContext: 'swap'
    };
    yield* heapify(0, i);
  }
  
  yield { array: [...array], sorted: Array.from({ length: n }, (_, i) => i) };
}