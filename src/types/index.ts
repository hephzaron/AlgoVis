// Algorithm step types
export type AlgorithmStep = {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  pivot?: number;
  sorted?: number[];
};

// Sorting algorithms
export type SortingAlgorithm = 'merge' | 'quick' | 'insertion' | 'bubble' | 'selection' | 'heap';

// Searching algorithms
export type SearchingAlgorithm = 'linear' | 'binary';

// Data structures
export type DataStructure = 'stack' | 'queue' | 'bst' | 'hash';

// Graph algorithms
export type GraphAlgorithm = 'dijkstra';

// Compression algorithms
export type CompressionAlgorithm = 'huffman';

// Animation state
export type AnimationState = 'idle' | 'running' | 'paused' | 'completed';

// Node for BST
export interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x: number;
  y: number;
}

// Graph node for Dijkstra
export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

// Huffman tree node
export interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

// Hash table bucket
export interface HashBucket {
  key: string;
  value: number;
}