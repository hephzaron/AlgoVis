import { 
  Graph, 
  GraphNodeInterface 
} from '../../../components/Visualizers/GraphVisualizer';

import { DFSResult, DFSStep } from './types';


/**
 * Depth-First Search Algorithm Implementation
 * 
 * This class implements DFS to explore all nodes in a graph
 * from a source node, visiting as deep as possible before backtracking.
 * 
 * Time Complexity: O(V + E) where V is vertices and E is edges
 * Space Complexity: O(V) for the stack and visited set
 */
export class DFS<T> {
  /** Reference to the graph being analyzed */
  private readonly graph: Graph<T>;

  /** 
   * Stack of nodes waiting to be processed.
   * DFS uses LIFO (Last In First Out) order.
   */
  private stack: string[];

  /** 
   * Set of nodes that have been visited.
   * Prevents revisiting nodes and ensures each node is processed once.
   */
  private visited: Set<string>;

  /** 
   * Map storing the parent node for each node in the DFS tree.
   * Used for path reconstruction from source to any node.
   */
  private parent: Map<string, string | null>;

  /** 
   * Array recording the order in which nodes were visited.
   * Useful for understanding DFS traversal order.
   */
  private visitOrder: string[];

  /** 
   * Array of algorithm execution steps for visualization purposes.
   * Each step captures the state of the algorithm at different points.
   */
  private steps: DFSStep[];

  constructor(graph: Graph<T>) {
    this.graph = graph;
    this.stack = [];
    this.visited = new Set();
    this.parent = new Map();
    this.visitOrder = [];
    this.steps = [];
  }

  public run(sourceId: string): DFSResult {
    if (!this.graph.getNode(sourceId)) {
      throw new Error(`Source node with ID "${sourceId}" not found in graph`);
    }

    this.initialize(sourceId);

    // Use stack with LIFO behavior
    while (this.stack.length > 0) {
      // Pop from end (LIFO)
      const currentId = this.stack.pop()!;
      
      const currentNode = this.graph.getNode(currentId);
      if (!currentNode) continue;

      // Check if node was already visited (could have been discovered multiple times)
      if (this.visited.has(currentId)) continue;

      this.processNode(currentId);
      this.discoverNeighbors(currentId, currentNode);
    }

    this.recordStep('complete');

    return {
      visitOrder: [...this.visitOrder],
      parent: new Map(this.parent),
      steps: [...this.steps],
    };
  }

  private initialize(sourceId: string): void {
    this.stack = [];
    this.visited.clear();
    this.parent.clear();
    this.visitOrder = [];
    this.steps = [];

    // Push source onto stack
    this.stack.push(sourceId);
    // Don't mark as visited until we actually process it
    // This allows us to discover paths correctly

    this.recordStep('start', sourceId);
  }

  private processNode(nodeId: string): void {
    // Mark as visited when we actually process it
    this.visited.add(nodeId);
    this.visitOrder.push(nodeId);
    this.recordStep('visit', nodeId);
  }

  private discoverNeighbors(currentId: string, currentNode: GraphNodeInterface<T>): void {
    // Process neighbors in reverse order for deterministic traversal
    const neighbors = Array.from(currentNode.getNeighbors());
    
    // Push all unvisited neighbors onto stack
    for (const [, edge] of neighbors) {
      const neighborId = edge.node.id;

      // Only check if already visited or in stack
      // In DFS, we don't want to revisit nodes we've already discovered
      if (this.visited.has(neighborId)) continue;
      if (this.stack.includes(neighborId)) continue;

      this.parent.set(neighborId, currentId);
      this.stack.push(neighborId);
      this.recordStep('discover', currentId, neighborId);
    }
  }

  /**
   * Records an algorithm execution step for visualization purposes.
   * 
   * Each step captures a snapshot of the algorithm state at key points:
   * - 'start': Algorithm initialization
   * - 'visit': Node being processed
   * - 'discover': Neighbor being discovered and enqueued
   * - 'complete': Algorithm finished
   * 
   * The step includes immutable copies of the current queue, visited set,
   * and parent map, allowing the visualization to replay the algorithm's progress.
   * 
   * @param type - The type of step (indicates what just happened)
   * @param current - Optional: ID of the current node being processed
   * @param discovered - Optional: ID of the neighbor being discovered
   */
  private recordStep(
    type: 'start' | 'visit' | 'discover' | 'complete',
    current?: string,
    discovered?: string
  ): void {
    // Create a new step with immutable copies of current state
    this.steps.push({
      type,
      current,
      discovered,
      // Create copies to preserve state at this moment
      visited: [...this.visited],
      stack: [...this.stack],
      parent: new Map(this.parent),
    });
  }
}