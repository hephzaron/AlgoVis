
import { Position, GraphNodeInterface } from './types';

/**
 * Represents a single node in a Graph.
 * @template T - The type of value stored in the node
 * @implements {GraphNodeInterface<T>}
 */
export class GraphNode<T> implements GraphNodeInterface<T> {
  value: T;
  id: string;
  neighbors: Map<string, { 
    node: GraphNodeInterface<T>;
    weight: number;
  }> = new Map();
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
   * @param {number} weight - Weight of the edge.
   */
  addNeighbor(
    node: GraphNodeInterface<T>,
    weight: number = 1
  ): void {
    this.neighbors.set(node.id, {
      node,
      weight
    });
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
   * Gets all neighbor neighbouring nodesand edge weights.
   * @returns Read-only ,map of neighbours.
   */
  getNeighbors(): ReadonlyMap<string, { 
    node: GraphNodeInterface<T>; weight: number }> {
    return new Map(this.neighbors );
  }

  /**
   * Gets the degree of this node.
   * @returns {number} Number of neighbors.
   */
  getDegree(): number {
    return this.neighbors.size;
  }
}