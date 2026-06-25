// components/Visualizers/BSTVisualizer/BST.ts

import { BSTNode } from './types';
import { ViewOptimizer, ViewConfig } from './ViewOptimizer';

/**
 * Simple binary search tree implementation for visualization.
 * Supports insert, delete, search, and exposes the tree root.
 */
export class BinarySearchTree {
  root: BSTNode | null = null;
  private viewOptimizer: ViewOptimizer;

  constructor(viewConfig?: Partial<ViewConfig>) {
    this.viewOptimizer = new ViewOptimizer(viewConfig);
  }
  
  /**
   * Inserts a new value into the BST.
   * @param value The value to insert.
   * @returns The created node or null for duplicates.
   */
  insert(value: number): BSTNode | null {
    const newNode: BSTNode = { value, left: null, right: null, x: 0, y: 0 };
    
    if (!this.root) {
      this.root = newNode;
      return this.root;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return newNode;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return newNode;
        }
        current = current.right;
      } else {
        return null; // Duplicate
      }
    }
  }
  
  /**
   * Deletes a value from the BST if present.
   * @param value The value to delete.
   * @returns True when deletion occurred.
   */
  delete(value: number): boolean {
    const deleteNode = (node: BSTNode | null, val: number): BSTNode | null => {
      if (!node) return null;
      
      if (val < node.value) {
        node.left = deleteNode(node.left, val);
      } else if (val > node.value) {
        node.right = deleteNode(node.right, val);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        
        let minNode = node.right;
        while (minNode.left) minNode = minNode.left;
        node.value = minNode.value;
        node.right = deleteNode(node.right, minNode.value);
      }
      return node;
    };
    
    const newRoot = deleteNode(this.root, value);
    if (newRoot !== this.root) {
      this.root = newRoot;
      return true;
    }
    return newRoot !== null;
  }
  
  /**
   * Searches the BST for the given value.
   * @param value The value to search for.
   * @returns The found node or null.
   */
  search(value: number): BSTNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }
  
  
  /**
   * Returns the current BST root node.
   */
  getTree(): BSTNode | null {
    return this.root;
  }

  /**
   * Clears the tree.
   */
  clear(): void {
    this.root = null;
  }

  /**
   * Calculates positions for all nodes in the tree.
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   */
  calculatePositions(
    viewportWidth: number = 800,
    viewportHeight: number = 500
  ): void {
    if (!this.root) return;
    this.viewOptimizer.optimizeLayout(this.root, viewportWidth, viewportHeight);
  }

  /**
   * Gets the viewBox for the SVG.
   */
  getViewBox(viewportWidth: number = 800, viewportHeight: number = 500): string {
    return this.viewOptimizer.getViewBox(this.root, viewportWidth, viewportHeight);
  }

  /**
   * Gets the scroll position to center the root.
   */
  getRootScrollPosition(containerWidth: number, containerHeight: number) {
    return this.viewOptimizer.getRootScrollPosition(
      this.root,
      containerWidth,
      containerHeight
    );
  }

  /**
   * Checks if scrolling is needed.
   */
  needsScrolling(viewportWidth: number, viewportHeight: number) {
    return this.viewOptimizer.needsScrolling(
      this.root,
      viewportWidth,
      viewportHeight
    );
  }

  /**
   * Gets tree statistics.
   */
  getStats() {
    return this.viewOptimizer.getTreeStats(this.root);
  }


  /**
   * Gets the height of the tree.
   * @returns {number} The height of the tree.
   */
  getHeight(): number {
    const getHeightRec = (node: BSTNode | null): number => {
      if (!node) return 0;
      return 1 + Math.max(getHeightRec(node.left), getHeightRec(node.right));
    };
    return getHeightRec(this.root);
  }

  /**
   * Gets the count of nodes in the tree.
   * @returns {number} The number of nodes.
   */
  getNodeCount(): number {
    const count = (node: BSTNode | null): number => {
      if (!node) return 0;
      return 1 + count(node.left) + count(node.right);
    };
    return count(this.root);
  }
}