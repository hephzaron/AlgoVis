/**
 * Represents a single step in a sorting or searching visualization.
 */
export type AlgorithmStep = {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  pivot?: number;
  sorted?: number[];
  activeLines?: number[];
  codeContext?: 'loop' | 'compare' | 'swap' | 'search' | 'partition' | 'recursive';
};

/**
 * Available sorting algorithm identifiers.
 */
export type SortingAlgorithm = 'merge' | 'quick' | 'insertion' | 'bubble' | 'selection' | 'heap';

/**
 * Available searching algorithm identifiers.
 */
export type SearchingAlgorithm = 'linear' | 'binary';

/**s
 * Supported data structure visualizer names.
 */
export type DataStructure = 'array'|'stack' | 'queue' | 'bst' | 'hash' |'linkedList' | 'graph' |'heap';

/**
 * Supported graph algorithm visualizer names.
 */
export type GraphAlgorithm = 'dijkstra' | 'bfs' | 'bst-bfs';

/**
 * Supported compression algorithm identifiers.
 */
export type CompressionAlgorithm = 'huffman';

/**
 * Union type representing all visualizer types in the application.
 * This includes sorting algorithms, searching algorithms, data structures,
 * graph algorithms, and compression algorithms.
 */
export type VisualizerType = SortingAlgorithm | SearchingAlgorithm | DataStructure | GraphAlgorithm | CompressionAlgorithm;

/**
 * Animation lifecycle states used across visualizers.
 */
export type AnimationState = 'idle' | 'running' | 'paused' | 'completed';

/**
 * A node in the binary search tree used for visualization.
 */
export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x: number;
  y: number;
}

/**
 * Graph node metadata used in graph visualizations.
 */
export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

/**
 * Represents a weighted edge in a graph visualization.
 */
export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

/**
 * Node type used for Huffman tree construction.
 */
export interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

/**
 * Represents a single bucket entry in a hash table.
 */
export interface HashBucket {
  key: string;
  value: number;
}

