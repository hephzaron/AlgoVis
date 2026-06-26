/**
 * Configuration for tree visualization
 */
export interface TreeVisualizationConfig {
  /** Total height available for the tree in pixels */
  containerHeight?: number;
  /** Total width available for the tree in pixels */
  containerWidth?: number;
  /** Padding from the edges of the container */
  padding?: number;
  /** Minimum node size in pixels */
  minNodeSize?: number;
  /** Maximum node size in pixels */
  maxNodeSize?: number;
  /** Base font size for node text */
  baseFontSize?: number;
}

/**
 * Node position and styling information
 */
export interface NodeStyle {
  /** Top position in pixels */
  top: string;
  /** Left position as percentage */
  left: string;
  /** Node size in pixels */
  size: number;
  /** Font size for the node text */
  fontSize: number;
  /** CSS transform */
  transform: string;
}

/**
 * Calculates the optimal node size based on tree density
 */
export function calculateNodeSize(
  totalNodes: number,
  maxLevel: number,
  config: TreeVisualizationConfig = {}
): number {
  const {
    containerWidth = 600,
    padding = 20,
    minNodeSize = 32,
    maxNodeSize = 72,
  } = config;

  // Calculate available width
  const availableWidth = containerWidth - (padding * 2);
  
  // Estimate maximum nodes in the widest level
  const maxNodesInLevel = Math.pow(2, maxLevel);
  
  // Calculate optimal size based on width constraints
  const widthBasedSize = availableWidth / (maxNodesInLevel + 1);
  
  // Calculate size based on total nodes (density)
  const densityBasedSize = Math.max(
    minNodeSize,
    Math.min(maxNodeSize, 200 / Math.sqrt(totalNodes + 1))
  );
  
  // Take the minimum to prevent overlap
  const optimalSize = Math.min(widthBasedSize, densityBasedSize);
  
  // Clamp to min/max
  return Math.max(minNodeSize, Math.min(maxNodeSize, optimalSize));
}

/**
 * Calculates font size based on node size
 */
export function calculateFontSize(nodeSize: number): number {
  // Font size should be roughly 40-50% of node size
  return Math.max(10, Math.round(nodeSize * 0.45));
}

/**
 * Gets the style for a tree node
 */
export function getTreeNodeStyle(
  node: { level: number; position: number },
  totalLevels: number,
  nodeSize: number,
  config: TreeVisualizationConfig = {}
): NodeStyle {
  const {
    containerHeight = 300,
    padding = 20,
  } = config;

  // Calculate vertical position
  const availableHeight = containerHeight - (padding * 2);
  const levelHeight = totalLevels > 1 
    ? availableHeight / (totalLevels) 
    : 80;
  const top = node.level * levelHeight + padding;

  // Calculate horizontal position
  const horizontalPadding = 20;
  const availableWidth = 100 - (horizontalPadding * 2);
  const levelNodes = Math.pow(2, node.level);
  const nodeWidth = availableWidth / levelNodes;
  const left = horizontalPadding + (node.position * availableWidth) + (nodeWidth / 2);

  return {
    top: `${top}px`,
    left: `${left}%`,
    size: nodeSize,
    fontSize: calculateFontSize(nodeSize),
    transform: 'translateX(-50%)',
  };
}

/**
 * Calculates the visual properties for a heap
 */
export function calculateHeapVisualProperties(
  itemCount: number,
  maxLevel: number,
  config: TreeVisualizationConfig = {}
): {
  nodeSize: number;
  totalLevels: number;
  containerHeight: number;
} {
  const totalLevels = maxLevel + 1;
  const nodeSize = calculateNodeSize(itemCount, maxLevel, config);
  
  // Adjust container height based on levels
  const minHeight = 200;
  const maxHeight = 400;
  const heightPerLevel = 80;
  const containerHeight = Math.max(
    minHeight,
    Math.min(maxHeight, totalLevels * heightPerLevel + 40)
  );
  
  return {
    nodeSize,
    totalLevels,
    containerHeight,
  };
}

/**
 * Creates a unique key for a node
 */
export function getNodeKey(index: number, value: any): string {
  return `${index}-${value}`;
}

/**
 * Checks if a node is a leaf in the heap
 */
export function isLeafNode(index: number, totalItems: number): boolean {
  const leftChild = 2 * index + 1;
  return leftChild >= totalItems;
}

/**
 * Gets the level of a node in a binary tree
 */
export function getNodeLevel(index: number): number {
  return Math.floor(Math.log2(index + 1));
}