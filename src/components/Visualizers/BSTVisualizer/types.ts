// components/Visualizers/BSTVisualizer/types.ts

/**
 * Represents a node in a Binary Search Tree.
 * @interface BSTNode
 * @property {number} value - The value stored in the node
 * @property {BSTNode | null} left - Left child node
 * @property {BSTNode | null} right - Right child node
 * @property {number} x - X position for rendering
 * @property {number} y - Y position for rendering
 */
export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x: number;
  y: number;
}

/**
 * Props for the BSTVisualizer component.
 * @interface BSTVisualizerProps
 * @property {string} [className] - Additional CSS classes
 * @property {number[]} [initialValues] - Initial values to populate the tree
 */
export interface BSTVisualizerProps {
  className?: string;
  initialValues?: number[];
}

/**
 * Type for BST operation result
 * @type {BSTResult}
 */
export type BSTResult = {
  success: boolean;
  message?: string;
  node?: BSTNode;
};

/**
 * Type for search result
 * @type {SearchResult}
 */
export type SearchResult = {
  found: boolean;
  value: number;
  message: string;
};

/**
 * Type for node color based on state
 * @type {NodeColorMap}
 */
export type NodeColorMap = {
  [key in 'default' | 'highlighted' | 'found' | 'notFound']: string;
};