/**
 * Array Data Structure implementation with dynamic resizing
 * Supports common array operations with visualization support
 */
export class ArrayDS<T> {
  private data: T[];
  private capacity: number;
  private length: number;

  /**
   * Creates a new Array instance
   * @param initialCapacity - Initial capacity of the array
   */
  constructor(initialCapacity: number = 10) {
    this.data = new Array(initialCapacity);
    this.capacity = initialCapacity;
    this.length = 0;
  }

  /**
   * Resizes the internal array when capacity is exceeded
   * @param newCapacity - New capacity for the array
   */
  private resize(newCapacity: number): void {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
  }

  /**
   * Adds an element to the end of the array
   * @param value - The value to add
   * @returns The index where the value was inserted
   */
  push(value: T): number {
    if (this.length === this.capacity) {
      this.resize(this.capacity * 2);
    }
    this.data[this.length] = value;
    this.length++;
    return this.length - 1;
  }

  /**
   * Removes and returns the last element
   * @returns The removed value, or undefined if empty
   */
  pop(): T | undefined {
    if (this.length === 0) return undefined;
    
    this.length--;
    const value = this.data[this.length];
    this.data[this.length] = undefined as any;
    
    // Shrink if array is too sparse
    if (this.length > 0 && this.length === Math.floor(this.capacity / 4)) {
      this.resize(Math.floor(this.capacity / 2));
    }
    
    return value;
  }

  /**
   * Inserts a value at a specific index
   * @param value - The value to insert
   * @param index - The position to insert at
   * @returns True if insertion was successful
   */
  insertAt(value: T, index: number): boolean {
    if (index < 0 || index > this.length) return false;
    
    if (this.length === this.capacity) {
      this.resize(this.capacity * 2);
    }
    
    // Shift elements to the right
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    
    this.data[index] = value;
    this.length++;
    return true;
  }

  /**
   * Removes and returns the element at a specific index
   * @param index - The position to remove from
   * @returns The removed value, or undefined if invalid
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;
    
    const value = this.data[index];
    
    // Shift elements to the left
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    
    this.length--;
    this.data[this.length] = undefined as any;
    
    // Shrink if array is too sparse
    if (this.length > 0 && this.length === Math.floor(this.capacity / 4)) {
      this.resize(Math.floor(this.capacity / 2));
    }
    
    return value;
  }

  /**
   * Returns the element at a specific index
   * @param index - The position to retrieve
   * @returns The value at the index, or undefined if invalid
   */
  get(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;
    return this.data[index];
  }

  /**
   * Updates the value at a specific index
   * @param index - The position to update
   * @param value - The new value
   * @returns True if update was successful
   */
  set(index: number, value: T): boolean {
    if (index < 0 || index >= this.length) return false;
    this.data[index] = value;
    return true;
  }

  /**
   * Finds the index of a value
   * @param value - The value to search for
   * @returns The index of the value, or -1 if not found
   */
  indexOf(value: T): number {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) return i;
    }
    return -1;
  }

  /**
   * Checks if the array contains a value
   * @param value - The value to search for
   * @returns True if the value exists
   */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  /**
   * Returns the current length of the array
   */
  size(): number {
    return this.length;
  }

  /**
   * Returns true if the array is empty
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Returns the current capacity of the array
   */
  getCapacity(): number {
    return this.capacity;
  }

  /**
   * Removes all elements from the array
   */
  clear(): void {
    this.data = new Array(this.capacity);
    this.length = 0;
  }

  /**
   * Returns a copy of the array contents
   */
  getItems(): T[] {
    const items: T[] = [];
    for (let i = 0; i < this.length; i++) {
      items.push(this.data[i] as T);
    }
    return items;
  }

  /**
   * Returns the raw internal array (for visualization)
   */
  getRawData(): (T | undefined)[] {
    return [...this.data];
  }

  /**
   * Reverses the array in place
   */
  reverse(): void {
    for (let i = 0; i < Math.floor(this.length / 2); i++) {
      const temp = this.data[i];
      this.data[i] = this.data[this.length - 1 - i];
      this.data[this.length - 1 - i] = temp;
    }
  }

  /**
   * Sorts the array (assuming numeric values)
   */
  sort(): void {
    // Simple bubble sort for visualization
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1 - i; j++) {
        if ((this.data[j] as any) > (this.data[j + 1] as any)) {
          const temp = this.data[j];
          this.data[j] = this.data[j + 1];
          this.data[j + 1] = temp;
        }
      }
    }
  }

  /**
   * Maps a function to each element
   * @param callback - Function to apply to each element
   * @returns A new array with the mapped values
   */
  map<U>(callback: (value: T, index: number) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this.data[i] as T, i));
    }
    return result;
  }

  /**
   * Filters elements based on a predicate
   * @param predicate - Function to test each element
   * @returns A new array with filtered values
   */
  filter(predicate: (value: T, index: number) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.length; i++) {
      if (predicate(this.data[i] as T, i)) {
        result.push(this.data[i] as T);
      }
    }
    return result;
  }
}