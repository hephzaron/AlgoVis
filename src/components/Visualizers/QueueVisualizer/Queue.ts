/**
 * Simple queue implementation used by the queue visualizer.
 * Implements FIFO operations and exposes the item list.
 */
export class Queue {
  private items: number[] = [];
  
  /**
   * Adds an item to the back of the queue.
   * @param item The value to enqueue.
   */
  enqueue(item: number): void {
    this.items.push(item);
  }
  
  /**
   * Removes and returns the item at the front of the queue.
   */
  dequeue(): number | undefined {
    return this.items.shift();
  }
  
  /**
   * Returns the front item without removing it.
   */
  peek(): number | undefined {
    return this.items[0];
  }
  
  /**
   * Returns true when the queue contains no items.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  /**
   * Returns the number of items currently in the queue.
   */
  size(): number {
    return this.items.length;
  }
  
  /**
   * Returns a copy of the queue contents.
   */
  getItems(): number[] {
    return [...this.items];
  }
  
  /**
   * Clears all items from the queue.
   */
  clear(): void {
    this.items = [];
  }
}