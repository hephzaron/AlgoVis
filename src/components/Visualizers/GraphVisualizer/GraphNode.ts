// components/GraphVisualizer/GraphNode.ts

import { Position, GraphNodeInterface } from './types';

/**
 * Represents a single node in a Graph.
 * @template T - The type of value stored in the node
 * @implements {GraphNodeInterface<T>}
 */
export class GraphNode<T> implements GraphNodeInterface<T> {
  value: T;
  id: string;
  neighbors: Map<string, GraphNodeInterface<T>> = new Map();
  position: Position;

  /**
   * Creates an instance of GraphNode.
   * @param {T} value - The data value to store in the node.
   * @param {string} id - Unique identifier for the node.
   */
  constructor(value: T, id: string) {
    this.value = value;
    this.id = id;
    this.position = { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 };
  }

  /**
   * Adds a neighbor to this node.
   * @param {GraphNodeInterface<T>} node - The node to add as neighbor.
   */
  addNeighbor(node: GraphNodeInterface<T>): void {
    this.neighbors.set(node.id, node);
  }

  /**
   * Removes a neighbor from this node.
   * @param {string} nodeId - The ID of the node to remove.
   * @returns {boolean} True if removed successfully.
   */
  removeNeighbor(nodeId: string): boolean {
    return this.neighbors.delete(nodeId);
  }

  /**
   * Checks if this node is connected to another.
   * @param {string} nodeId - The ID of the node to check.
   * @returns {boolean} True if connected.
   */
  hasNeighbor(nodeId: string): boolean {
    return this.neighbors.has(nodeId);
  }

  /**
   * Gets all neighbor IDs.
   * @returns {string[]} Array of neighbor IDs.
   */
  getNeighbors(): string[] {
    return Array.from(this.neighbors.keys());
  }

  /**
   * Gets the degree of this node.
   * @returns {number} Number of neighbors.
   */
  getDegree(): number {
    return this.neighbors.size;
  }
}