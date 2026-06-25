
import { BSTNode } from './types';

/**
 * Configuration for view optimization.
 */
export interface ViewConfig {
  horizontalSpacing: number;
  verticalSpacing: number;
  nodeRadius: number;
  padding: number;
  minViewportWidth: number;
  minViewportHeight: number;
}

/**
 * Viewport dimensions and scroll position.
 */
export interface Viewport {
  width: number;
  height: number;
  scrollLeft: number;
  scrollTop: number;
}

/**
 * Tree dimensions including bounding box.
 */
export interface TreeDimensions {
  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * ViewOptimizer handles all view-related calculations for the BST.
 * This includes positioning nodes to prevent overlap and calculating
 * the optimal viewport for scrolling.
 */
export class ViewOptimizer {
  private config: ViewConfig;

  constructor(config?: Partial<ViewConfig>) {
    this.config = {
      horizontalSpacing: 70,
      verticalSpacing: 80,
      nodeRadius: 25,
      padding: 50,
      minViewportWidth: 200,
      minViewportHeight: 100,
      ...config
    };
  }

  /**
   * Calculates the width of each subtree to determine spacing.
   */
  private getSubtreeWidth(node: BSTNode | null): number {
    if (!node) return 0;
    return 1 + this.getSubtreeWidth(node.left) + this.getSubtreeWidth(node.right);
  }

  /**
   * Recursively positions nodes in the tree with no overlap.
   * Uses a divide-and-conquer approach based on subtree sizes.
   * Now properly uses both horizontal and vertical bounds.
   */
  private positionNodes(
    node: BSTNode | null,
    leftBound: number,
    rightBound: number,
    y: number,
    maxY: number
  ): void {
    if (!node) return;

    // Place node at the midpoint of its bounds
    const x = (leftBound + rightBound) / 2;
    node.x = x;
    node.y = y;

    if (node.left || node.right) {
      const leftCount = node.left ? this.getSubtreeWidth(node.left) : 0;
      const rightCount = node.right ? this.getSubtreeWidth(node.right) : 0;
      const totalCount = leftCount + rightCount;

      // Calculate split point based on subtree sizes
      const splitRatio = totalCount > 0 ? leftCount / totalCount : 0.5;
      const splitPoint = leftBound + (rightBound - leftBound) * splitRatio;

      const nextY = y + this.config.verticalSpacing;

      // Position children
      this.positionNodes(node.left, leftBound, splitPoint, nextY, maxY);
      this.positionNodes(node.right, splitPoint, rightBound, nextY, maxY);
    }
  }

  /**
   * Calculates the bounding box of the tree.
   */
  private getTreeBounds(node: BSTNode | null): TreeDimensions | null {
    if (!node) return null;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    const traverse = (n: BSTNode | null) => {
      if (!n) return;
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
      traverse(n.left);
      traverse(n.right);
    };
    traverse(node);

    return {
      minX,
      maxX,
      minY,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  /**
   * Calculates the total tree width based on nodes at each level.
   */
  private getMaxWidthAtLevel(node: BSTNode | null): number {
    if (!node) return 0;

    const levelNodes: { [key: number]: number } = {};
    const traverse = (n: BSTNode | null, level: number) => {
      if (!n) return;
      levelNodes[level] = (levelNodes[level] || 0) + 1;
      traverse(n.left, level + 1);
      traverse(n.right, level + 1);
    };
    traverse(node, 0);

    return Math.max(...Object.values(levelNodes));
  }

  /**
   * Calculates the tree height (number of levels).
   */
  private getTreeHeight(node: BSTNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(
      this.getTreeHeight(node.left),
      this.getTreeHeight(node.right)
    );
  }

  /**
   * Main method to calculate optimal positions for all nodes.
   * Optimizes both horizontally and vertically.
   * @param root - The root of the BST
   * @param viewportWidth - Current viewport width
   * @param viewportHeight - Current viewport height
   * @returns The tree dimensions after positioning
   */
  optimizeLayout(
    root: BSTNode | null,
    viewportWidth: number = 800,
    viewportHeight: number = 500
  ): TreeDimensions | null {
    if (!root) return null;

    const maxNodesAtLevel = this.getMaxWidthAtLevel(root);
    const treeHeight = this.getTreeHeight(root);

    // Calculate total width needed
    const totalWidth = Math.max(
      maxNodesAtLevel * this.config.horizontalSpacing + this.config.padding * 2,
      viewportWidth
    );

    // Calculate total height needed (VERTICAL OPTIMIZATION)
    const totalHeight = Math.max(
      treeHeight * this.config.verticalSpacing + this.config.padding * 2,
      viewportHeight
    );

    // Calculate starting position (centered horizontally)
    const startX = (totalWidth - (maxNodesAtLevel - 1) * this.config.horizontalSpacing) / 2;
    const startY = this.config.padding;
    const endX = startX + (maxNodesAtLevel - 1) * this.config.horizontalSpacing;

    // Calculate vertical center offset if tree is smaller than viewport
    const verticalOffset = Math.max(0, (viewportHeight - (treeHeight - 1) * this.config.verticalSpacing) / 2);

    // Position all nodes with both horizontal and vertical optimization
    this.positionNodes(root, startX, endX, startY + verticalOffset, totalHeight);

    return this.getTreeBounds(root);
  }

  /**
   * Calculates the optimal viewBox for the SVG.
   * Uses both totalWidth and totalHeight for proper viewport sizing.
   */
  getViewBox(
    root: BSTNode | null,
    viewportWidth: number = 800,
    viewportHeight: number = 500
  ): string {
    if (!root) {
      return `0 0 ${viewportWidth} ${viewportHeight}`;
    }

    const bounds = this.getTreeBounds(root);
    if (!bounds) {
      return `0 0 ${viewportWidth} ${viewportHeight}`;
    }

    const padding = this.config.padding;
    const width = Math.max(bounds.width + padding * 2, this.config.minViewportWidth);
    const height = Math.max(bounds.height + padding * 2, this.config.minViewportHeight);
    const x = bounds.minX - padding;
    const y = bounds.minY - padding;

    return `${x} ${y} ${width} ${height}`;
  }

  /**
   * Calculates the scroll position to center the root node.
   */
  getRootScrollPosition(
    root: BSTNode | null,
    containerWidth: number,
    containerHeight: number
  ): { scrollLeft: number; scrollTop: number } {
    if (!root) {
      return { scrollLeft: 0, scrollTop: 0 };
    }

    const rootX = root.x || 0;
    const rootY = root.y || 0;

    return {
      scrollLeft: Math.max(0, rootX - containerWidth / 2),
      scrollTop: Math.max(0, rootY - containerHeight / 2)
    };
  }

  /**
   * Checks if the tree exceeds the viewport dimensions.
   */
  needsScrolling(
    root: BSTNode | null,
    viewportWidth: number,
    viewportHeight: number
  ): { horizontal: boolean; vertical: boolean } {
    if (!root) {
      return { horizontal: false, vertical: false };
    }

    const bounds = this.getTreeBounds(root);
    if (!bounds) {
      return { horizontal: false, vertical: false };
    }

    const padding = this.config.padding;
    const neededWidth = bounds.width + padding * 2;
    const neededHeight = bounds.height + padding * 2;

    return {
      horizontal: neededWidth > viewportWidth,
      vertical: neededHeight > viewportHeight
    };
  }

  /**
   * Gets recommended viewport size for the tree.
   */
  getRecommendedViewport(
    root: BSTNode | null,
    minWidth: number = 800,
    minHeight: number = 500
  ): { width: number; height: number } {
    if (!root) {
      return { width: minWidth, height: minHeight };
    }

    const maxNodesAtLevel = this.getMaxWidthAtLevel(root);
    const treeHeight = this.getTreeHeight(root);

    const width = Math.max(
      maxNodesAtLevel * this.config.horizontalSpacing + this.config.padding * 2,
      minWidth
    );
    const height = Math.max(
      treeHeight * this.config.verticalSpacing + this.config.padding * 2,
      minHeight
    );

    return { width, height };
  }

  /**
   * Gets tree statistics for display.
   */
  getTreeStats(root: BSTNode | null): { nodeCount: number; height: number; leafCount: number } {
    if (!root) {
      return { nodeCount: 0, height: 0, leafCount: 0 };
    }

    let nodeCount = 0;
    let leafCount = 0;
    let height = 0;

    const traverse = (node: BSTNode | null, depth: number) => {
      if (!node) return;
      nodeCount++;
      height = Math.max(height, depth);
      if (!node.left && !node.right) {
        leafCount++;
      }
      traverse(node.left, depth + 1);
      traverse(node.right, depth + 1);
    };
    traverse(root, 0);

    return { nodeCount, height: height + 1, leafCount };
  }
}