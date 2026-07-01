/**
 * Enumeration of different step types that occur during BFS algorithm execution.
 * 
 * Each step type represents a significant event in the algorithm:
 * - "start": Algorithm begins with a source node
 * - "visit": A node has been dequeued and is being processed
 * - "discover": A neighboring node is discovered and added to queue
 * - "complete": Algorithm has finished executing
 */
export type BFSStepType = "start" | "visit" | "discover" | "complete";

/**
 * Represents a single step in the BFS algorithm execution.
 * 
 * Each step captures the algorithm state at a specific moment in time,
 * including what action just occurred and the complete state of all data structures.
 * This allows the visualization to replay the algorithm's progress step-by-step.
 * 
 * @interface BFSStep
 * @property {BFSStepType} type - The type of action that just occurred
 * @property {string} [current] - ID of the current node being processed
 * @property {string} [discovered] - ID of the neighbor node being discovered
 * @property {string[]} visited - Complete snapshot of which nodes have been processed
 * @property {string[]} queue - Complete snapshot of nodes in the queue
 * @property {Map<string, string | null>} parent - Complete snapshot of parent nodes for path reconstruction
 */
export interface BFSStep {
  /** The type of operation that occurred in this step */
  type: BFSStepType;

  /** The ID of the node currently being processed */
  current?: string;

  /** The ID of the neighbor node being discovered */
  discovered?: string;

  /** 
   * Immutable snapshot of which nodes have been permanently visited.
   * Nodes in this array won't be processed again.
   */
  visited: string[];

  /** 
   * Immutable snapshot of nodes currently in the queue.
   * These nodes are waiting to be processed.
   */
  queue: string[];

  /** 
   * Immutable snapshot of parent nodes on the BFS tree.
   * Maps node IDs to their parent node ID (or null for source).
   * Used for path reconstruction.
   */
  parent: Map<string, string | null>;
}

/**
 * Final result of BFS algorithm execution.
 * 
 * Contains the complete solution including:
 * - Visit order of all nodes
 * - Parent nodes for path reconstruction
 * - Complete step-by-step execution trace for visualization
 * 
 * @interface BFSResult
 * @property {string[]} visitOrder - Array showing the order nodes were visited
 * @property {Map<string, string | null>} parent - Map from node ID to parent node on BFS tree (null for source)
 * @property {BFSStep[]} steps - Array of all algorithm steps for visualization playback
 */
export interface BFSResult {
  /** 
   * Array showing the order in which nodes were visited/processed.
   * First element is always the source node.
   */
  visitOrder: string[];

  /** 
   * 2D array showing nodes grouped by their level in the tree.
   * Each sub-array represents one level (root is level 0).
   */
  levels?: string[][];

  /** 
   * Map used for path reconstruction.
   * For each node, stores the parent node on the BFS tree from source.
   * The source node has null as its parent node.
   */
  parent: Map<string, string | null>;

  /** 
   * Array of all execution steps for visualization.
   * Can be replayed step-by-step to show how the algorithm explored the graph.
   */
  steps: BFSStep[];
}
