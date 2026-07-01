/**
 * Type definitions for BFS on Binary Search Tree
 */

/**
 * Enumeration of different step types that occur during BST BFS algorithm execution.
 */
export type BSTBFSStepType = "start" | "visit" | "discover" | "complete";

/**
 * Represents a single step in the BST BFS algorithm execution.
 */
export interface BSTBFSStep {
  /** The type of operation that occurred in this step */
  type: BSTBFSStepType;

  /** The value of the node currently being processed */
  current?: number;

  /** The value of the child node being discovered */
  discovered?: number;

  /** Immutable snapshot of which nodes have been permanently visited */
  visited: number[];

  /** Immutable snapshot of nodes currently in the queue */
  queue: number[];

  /** Immutable snapshot of parent nodes on the BFS tree */
  parent: Map<number, number | null>;
}

/**
 * Final result of BST BFS algorithm execution.
 */
export interface BSTBFSResult {
  /** Array showing the order in which nodes were visited */
  visitOrder: number[];

  /** 2D array showing nodes grouped by their level in the tree */
  levels: number[][];

  /** Map used for path reconstruction */
  parent: Map<number, number | null>;

  /** Array of all execution steps for visualization */
  steps: BSTBFSStep[];
}
