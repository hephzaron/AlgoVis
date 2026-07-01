/**
 * Represents a position in 2D space for graph layout.
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Represents an edge between two nodes in the graph.
 */
export interface Edge {
  from: string;
  to: string;
  weight: number;
}

/**
 * Represents a node in the graph.
 * @template T - The type of value stored in the node
 * @interface GraphNodeInterface
 * @property {T} value - The value stored in the node
 * @property {string} id - Unique identifier for the node
 * @property {Position} position - Node position for layout
 * @property {Map<string, GraphNodeInterface<T>>} neighbors - Adjacency list
 * @property {(node: GraphNodeInterface<T>) => void} addNeighbor - Add a neighbor
 * @property {(nodeId: string) => boolean} removeNeighbor - Remove a neighbor
 * @property {(nodeId: string) => boolean} hasNeighbor - Check if neighbor exists
 * @property {() => ReadonlyMap<string, { node: GraphNodeInterface<T>; weight: number }>} getNeighbors - Get all neighbors and their weights
 * @property {() => number} getDegree - Get the degree of the node
 */
export interface GraphNodeInterface<T> {
  value: T;
  id: string;
  position: Position;
  neighbors: Map<string, { 
    node: GraphNodeInterface<T>;
    weight: number;}>;
  addNeighbor(node: GraphNodeInterface<T>, weight?: number): void;
  removeNeighbor(nodeId: string): boolean;
  hasNeighbor(nodeId: string): boolean;
  getNeighbors(): ReadonlyMap<string, { node: GraphNodeInterface<T>; weight: number }>;
  getDegree(): number;
}

/**
 * Represents the graph data structure.
 * @template T - The type of values stored in nodes
 * @interface GraphInterface
 * @property {Map<string, GraphNodeInterface<T>>} nodes - Collection of nodes
 * @property {number} size - Number of nodes in the graph
 * @property {(value: T, id: string) => GraphNodeInterface<T>} addNode - Add a node
 * @property {(id: string) => boolean} removeNode - Remove a node
 * @property {(id: string) => GraphNodeInterface<T> | undefined} getNode - Get a node
 * @property {(fromId: string, toId: string) => boolean} addEdge - Add an edge
 * @property {(fromId: string, toId: string) => boolean} removeEdge - Remove an edge
 * @property {(fromId: string, toId: string) => boolean} hasEdge - Check if edge exists
 * @property {() => GraphNodeInterface<T>[]} getNodes - Get all nodes
 * @property {() => Edge[]} getEdges - Get all edges
 * @property {() => void} clear - Clear the graph
 * @property {(iterations?: number, springConstant?: number, repulsionConstant?: number) => void} forceDirectedLayout - Apply layout
 * @property {() => GraphStats} getStats - Get graph statistics
 */
export interface GraphInterface<T> {
  nodes: Map<string, GraphNodeInterface<T>>;
  size: number;
  addNode(value: T, id: string): GraphNodeInterface<T>;
  removeNode(id: string): boolean;
  getNode(id: string): GraphNodeInterface<T> | undefined;
  addEdge(fromId: string, toId: string): boolean;
  removeEdge(fromId: string, toId: string): boolean;
  hasEdge(fromId: string, toId: string): boolean;
  getNodes(): GraphNodeInterface<T>[];
  getEdges(): Edge[];
  clear(): void;
  forceDirectedLayout(iterations?: number, springConstant?: number, repulsionConstant?: number): void;
  getStats(): GraphStats;
}

/**
 * Type for graph node ID (string primitive)
 */
export type NodeId = string;

/**
 * Type for graph value (number primitive)
 */
export type NodeValue = number;

/**
 * Type for graph operation result
 */
export type GraphResult = {
  success: boolean;
  message?: string;
  data?: any;
};

/**
 * Type for graph statistics
 */
export type GraphStats = {
  nodeCount: number;
  edgeCount: number;
  averageDegree: number;
  maxDegree: number;
  minDegree: number;
  connectedComponents: number;
  hasCycle: boolean;
};

/**
 * Type for layout configuration
 */
export type LayoutConfig = {
  iterations: number;
  springConstant: number;
  repulsionConstant: number;
  canvasWidth: number;
  canvasHeight: number;
  margin: number;
};

/**
 * Props for the GraphVisualizer component.
 */
export interface GraphVisualizerProps {
  initialNodes?: Array<{ id: string; value: number }>;
  initialEdges?: Edge[];
  layoutConfig?: Partial<LayoutConfig>;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edge: Edge) => void;
  className?: string;
}

/**
 * Type for node color based on degree
 */
export type NodeColorMap = {
  [key in 'high' | 'medium' | 'low' | 'selected']: string;
};

/**
 * Type for graph node with number values (using interface)
 */
export type NumberNode = GraphNodeInterface<number>;

/**
 * Type for graph with number values (using interface)
 */
export type NumberGraph = GraphInterface<number>;