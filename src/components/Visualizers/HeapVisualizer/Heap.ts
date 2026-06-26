/**
 * Represents a Heap node with optional priority
 */
export interface HeapNode<T> {
  value: T;
  priority?: number;
}

/**
 * Configuration options for the Heap
 */
export interface HeapOptions {
  /** Whether it's a max-heap (largest value first) or min-heap (smallest value first) */
  type?: 'max' | 'min';
  /** Whether to use priority-based comparison for objects */
  usePriority?: boolean;
}

/**
 * Heap Data Structure implementation
 * Supports both max-heap and min-heap, with optional priority values
 */
export class Heap<T> {
  private heap: (HeapNode<T> | T)[];
  private type: 'max' | 'min';
  private usePriority: boolean;

  /**
   * Creates a new Heap instance
   * @param options - Configuration options for the heap
   */
  constructor(options: HeapOptions = {}) {
    this.heap = [];
    this.type = options.type || 'max';
    this.usePriority = options.usePriority || false;
  }

  /**
   * Gets the numeric value from a node for comparison
   */
  private getNumericValue(node: T | HeapNode<T>): number {
    if (this.usePriority) {
      return (node as HeapNode<T>).priority ?? 0;
    }
    return node as unknown as number;
  }

  /**
   * Compares two elements for heap property
   * Returns true if 'a' should be above 'b' in the heap
   */
  private shouldBeAbove(a: T | HeapNode<T>, b: T | HeapNode<T>): boolean {
    const aVal = this.getNumericValue(a);
    const bVal = this.getNumericValue(b);
    
    if (this.type === 'max') {
      return aVal > bVal;  // Larger values go up for max-heap
    } else {
      return aVal < bVal;  // Smaller values go up for min-heap
    }
  }

  /**
   * Maintains the heap property by moving a node up
   */
  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      // If current node should be above its parent, swap
      if (this.shouldBeAbove(this.heap[index], this.heap[parentIndex])) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Maintains the heap property by moving a node down
   */
  private heapifyDown(index: number): void {
    const size = this.heap.length;
    
    while (index < size) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let targetIndex = index;

      // Check if left child should be above current target
      if (leftChildIndex < size && 
          this.shouldBeAbove(this.heap[leftChildIndex], this.heap[targetIndex])) {
        targetIndex = leftChildIndex;
      }

      // Check if right child should be above current target
      if (rightChildIndex < size && 
          this.shouldBeAbove(this.heap[rightChildIndex], this.heap[targetIndex])) {
        targetIndex = rightChildIndex;
      }

      // If current node is in the right position, we're done
      if (targetIndex === index) {
        break;
      }

      // Swap with the child that has higher priority
      this.swap(index, targetIndex);
      index = targetIndex;
    }
  }

  /**
   * Gets the index of the parent node
   */
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Gets the index of the left child
   */
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Gets the index of the right child
   */
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  /**
   * Swaps two elements in the heap
   */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Gets the value of a node (handles both primitive and HeapNode types)
   */
  private getValue(node: T | HeapNode<T>): T {
    if (this.usePriority) {
      return (node as HeapNode<T>).value;
    }
    return node as T;
  }

  /**
   * Gets the value at a specific index
   */
  private getValueAtIndex(index: number): T {
    const node = this.heap[index];
    return this.getValue(node);
  }

  /**
   * Inserts a new value into the heap
   * @param value - The value to insert
   * @param priority - Optional priority value (required if usePriority is true)
   * @returns The index where the value was inserted
   */
  insert(value: T, priority?: number): number {
    if (this.usePriority && priority === undefined) {
      throw new Error('Priority is required when usePriority is enabled');
    }

    if (this.usePriority) {
      this.heap.push({ value, priority: priority! });
    } else {
      this.heap.push(value);
    }

    const index = this.heap.length - 1;
    this.heapifyUp(index);
    return index;
  }

  /**
   * Removes and returns the root element (maximum or minimum)
   * @returns The value of the root element, or undefined if empty
   */
  extractRoot(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const root = this.getValueAtIndex(0);
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return root;
  }

  /**
   * Returns the root element without removing it
   * @returns The value of the root element, or undefined if empty
   */
  peek(): T | undefined {
    if (this.heap.length === 0) return undefined;
    return this.getValueAtIndex(0);
  }

  /**
   * Returns the current size of the heap
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Returns true if the heap is empty
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Removes all elements from the heap
   */
  clear(): void {
    this.heap = [];
  }

  /**
   * Returns a copy of the heap as a flat array
   */
  getItems(): T[] {
    return this.heap.map(node => this.getValue(node));
  }

  /**
   * Returns the raw heap array with all node data
   */
  getRawHeap(): (T | HeapNode<T>)[] {
    return [...this.heap];
  }

  /**
   * Checks if the heap maintains its invariant
   * @returns True if heap property is maintained
   */
  validateHeap(): boolean {
    for (let i = 0; i < this.heap.length; i++) {
      const left = this.getLeftChildIndex(i);
      const right = this.getRightChildIndex(i);

      if (left < this.heap.length) {
        // Parent should have higher priority than left child
        if (this.shouldBeAbove(this.heap[left], this.heap[i])) {
          return false;
        }
      }
      if (right < this.heap.length) {
        // Parent should have higher priority than right child
        if (this.shouldBeAbove(this.heap[right], this.heap[i])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Builds a heap from an existing array (heapify operation)
   * @param array - The array to convert into a heap
   */
  buildHeap(array: T[]): void {
    this.heap = array.map(value => 
      this.usePriority ? { value, priority: (value as unknown as number) } : value
    );
    
    // Start from the last non-leaf node and heapify down
    const lastNonLeafIndex = Math.floor((this.heap.length - 2) / 2);
    for (let i = lastNonLeafIndex; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  /**
   * Returns the index of a value in the heap (if found)
   * @param value - The value to search for
   * @returns The index of the value, or -1 if not found
   */
  indexOf(value: T): number {
    for (let i = 0; i < this.heap.length; i++) {
      if (this.getValueAtIndex(i) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Removes a specific value from the heap
   * @param value - The value to remove
   * @returns True if the value was removed, false otherwise
   */
  removeValue(value: T): boolean {
    const index = this.indexOf(value);
    if (index === -1) return false;
    
    // If it's the last element, just pop it
    if (index === this.heap.length - 1) {
      this.heap.pop();
      return true;
    }
    
    // Replace with the last element and heapify
    this.heap[index] = this.heap.pop()!;
    
    // Try to heapify up first (in case the new value has higher priority)
    this.heapifyUp(index);
    // Then heapify down (in case it has lower priority)
    this.heapifyDown(index);
    
    return true;
  }
}