/**
 * Enumeration of different step types that occur during Dijkstra's algorithm execution.
 * 
 * Each step type represents a significant event in the algorithm:
 * - "start": Algorithm begins initialization with a source node
 * - "visit": A node has been extracted from the priority queue and is being processed
 * - "relax": An edge from the current node to a neighbor is being examined
 * - "update": A shorter path to a neighbor is discovered, updating its distance
 * - "complete": Algorithm has finished executing
 */
export type StepType =
  | "start"
  | "visit"
  | "relax"
  | "update"
  | "complete";

/**
 * Represents a single step in the Dijkstra algorithm execution.
 * 
 * Each step captures the algorithm state at a specific moment in time,
 * including what action just occurred and the complete state of all data structures.
 * This allows the visualization to replay the algorithm's progress step-by-step.
 * 
 * @interface DijkstraStep
 * @property {StepType} type - The type of action that just occurred
 * @property {string} [current] - ID of the current node being processed
 * @property {string} [neighbor] - ID of the neighbor node being examined (for relax/update steps)
 * @property {number} [edgeWeight] - Weight of the edge being relaxed
 * @property {number} [oldDistance] - The distance before an update (for update steps)
 * @property {number} [newDistance] - The distance after an update (for update steps)
 * @property {Map<string, number>} distances - Complete snapshot of shortest distances from source to all nodes
 * @property {Map<string, string | null>} previous - Complete snapshot of previous nodes on shortest paths
 * @property {Set<string>} visited - Complete snapshot of which nodes have been permanently processed
 */
export interface DijkstraStep {
  /** The type of operation that occurred in this step */
  type: StepType;

  /** The ID of the node currently being processed (available for start, visit, and relax steps) */
  current?: string;

  /** The ID of the neighbor node being examined (available for relax and update steps) */
  neighbor?: string;

  /** The weight of the edge being examined (available for relax and update steps) */
  edgeWeight?: number;

  /** The shortest distance before it was updated (only for update steps) */
  oldDistance?: number;

  /** The new shortest distance after updating (only for update steps) */
  newDistance?: number;

  /** 
   * Immutable snapshot of shortest known distances from source to each node.
   * Maps node IDs to their shortest distance. Unreachable nodes have Infinity distance.
   */
  distances: Map<string, number>;

  /** 
   * Immutable snapshot of the previous node on the shortest path to each node.
   * Used for path reconstruction. Maps node IDs to their predecessor node ID (or null for source).
   */
  previous: Map<string, string | null>;

  /** 
   * Immutable snapshot of which nodes have been permanently processed.
   * Nodes in this set won't be processed again as their optimal distance is confirmed.
   */
  visited: Set<string>;
}

/**
 * Final result of Dijkstra's algorithm execution.
 * 
 * Contains the complete solution including:
 * - Shortest distances from source to all nodes
 * - Previous nodes for path reconstruction
 * - Complete step-by-step execution trace for visualization
 * 
 * @interface DijkstraResult
 * @property {Map<string, number>} distances - Map from node ID to shortest distance from source
 * @property {Map<string, string | null>} previous - Map from node ID to previous node on shortest path (null for source)
 * @property {DijkstraStep[]} steps - Array of all algorithm steps for visualization playback
 */
export interface DijkstraResult {
  /** 
   * Map of shortest distances from the source node to each node in the graph.
   * Non-reachable nodes will have Infinity as their distance.
   */
  distances: Map<string, number>;

  /** 
   * Map used for path reconstruction.
   * For each node, stores the previous node on the shortest path from source.
   * The source node has null as its previous node.
   */
  previous: Map<string, string | null>;

  /** 
   * Array of all execution steps for visualization.
   * Can be replayed step-by-step to show how the algorithm discovered shortest paths.
   */
  steps: DijkstraStep[];
}