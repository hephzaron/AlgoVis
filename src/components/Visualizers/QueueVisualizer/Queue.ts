/**
 * Simple queue implementation used by the queue visualizer.
 * Implements FIFO (First In, First Out) operations and exposes the item list.
 * 
 * @template T - The type of elements stored in the queue
 */
export class Queue<T = number> {
  private items: T[] = [];
  
  /**
   * Adds an item to the back of the queue.
   * 
   * @param item - The value to enqueue
   * @returns void
   */
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  /**
   * Removes and returns the item at the front of the queue.
   * 
   * @returns The item at the front of the queue, or undefined if the queue is empty
   */
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  /**
   * Returns the front item without removing it.
   * 
   * @returns The item at the front of the queue, or undefined if the queue is empty
   */
  peek(): T | undefined {
    return this.items[0];
  }
  
  /**
   * Returns true when the queue contains no items.
   * 
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  /**
   * Returns the number of items currently in the queue.
   * 
   * @returns The number of items in the queue
   */
  size(): number {
    return this.items.length;
  }
  
  /**
   * Returns a copy of the queue contents.
   * 
   * @returns A new array containing all items in the queue
   */
  getItems(): T[] {
    return [...this.items];
  }
  
  /**
   * Clears all items from the queue.
   * 
   * @returns void
   */
  clear(): void {
    this.items = [];
  }
  
  /**
   * Returns a string representation of the queue.
   * Useful for debugging purposes.
   * 
   * @returns A string representation of the queue
   */
  toString(): string {
    return `Queue: [${this.items.join(', ')}]`;
  }
  
  /**
   * Returns an iterator for the queue items.
   * Allows the queue to be used in for...of loops.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) {
      yield item;
    }
  }
}