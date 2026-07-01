import { 
  Graph, 
  GraphNodeInterface 
} from '../../../components/Visualizers/GraphVisualizer';

import { BFSResult, BFSStep } from './types';

/**
 * Breadth-First Search Algorithm Implementation
 * 
 * This class implements the BFS algorithm to explore all nodes in a graph
 * from a source node, visiting them level-by-level (all neighbors before their neighbors).
 * 
 * Time Complexity: O(V + E) where V is vertices and E is edges
 * Space Complexity: O(V) for the queue and visited set
 * 
 * The algorithm is divided into modular, single-responsibility methods:
 * - initialize: Sets up initial state
 * - processNode: Handles current node processing
 * - discoverNeighbors: Discovers and enqueues unvisited neighbors
 * - recordStep: Tracks algorithm progress for visualization
 * 
 * @template T - The type of values stored in graph nodes
 */
export class BFS<T> {
  /** Reference to the graph being analyzed */
  private readonly graph: Graph<T>;

  /** 
   * Queue of nodes waiting to be processed.
   * BFS uses FIFO (First In First Out) order.
   */
  private queue: string[];

  /** 
   * Set of nodes that have been visited.
   * Prevents revisiting nodes and ensures each node is processed once.
   */
  private visited: Set<string>;

  /** 
   * Map storing the parent node for each node in the BFS tree.
   * Used for path reconstruction from source to any node.
   */
  private parent: Map<string, string | null>;

  /** 
   * Array recording the order in which nodes were visited.
   * Useful for understanding BFS traversal order.
   */
  private visitOrder: string[];

  /** 
   * Array of algorithm execution steps for visualization purposes.
   * Each step captures the state of the algorithm at different points.
   */
  private steps: BFSStep[];

  /**
   * Creates a new BFS algorithm instance for the given graph.
   * 
   * @param graph - The graph to explore
   */
  constructor(graph: Graph<T>) {
    this.graph = graph;
    this.queue = [];
    this.visited = new Set();
    this.parent = new Map();
    this.visitOrder = [];
    this.steps = [];
  }

  /**
   * Executes Breadth-First Search algorithm.
   * 
   * This is the main entry point for the algorithm. It:
   * 1. Initializes all data structures
   * 2. Repeatedly dequeues and processes nodes
   * 3. Discovers and enqueues unvisited neighbors
   * 4. Records visualization steps throughout
   * 
   * @param sourceId - The ID of the starting node
   * @returns BFSResult containing visit order, parent map, and execution steps
   * @throws Error if the source node doesn't exist in the graph
   */
  public run(sourceId: string): BFSResult {
    // Validate source node exists
    if (!this.graph.getNode(sourceId)) {
      throw new Error(`Source node with ID "${sourceId}" not found in graph`);
    }

    // Phase 1: Initialize algorithm state
    this.initialize(sourceId);

    // Phase 2: Main algorithm loop
    // Continue while there are nodes in the queue
    while (this.queue.length > 0) {
      // Dequeue the next node to process
      const currentId = this.queue.shift()!;

      // Get the current node from the graph
      const currentNode = this.graph.getNode(currentId);
      if (!currentNode) continue;

      // Phase 3: Process current node and discover neighbors
      this.processNode(currentId, currentNode);

      // Phase 4: Discover and enqueue unvisited neighbors
      this.discoverNeighbors(currentId, currentNode);
    }

    // Record final completion step
    this.recordStep('complete');

    // Return results with immutable copies to prevent external modifications
    return {
      visitOrder: [...this.visitOrder],
      parent: new Map(this.parent),
      steps: [...this.steps],
    };
  }

  /**
   * Initializes algorithm state before execution.
   * 
   * Sets up:
   * - Empty queue and visited set
   * - Source node in queue and visited
   * - Source node as parent null (it's the root)
   * - Records the start step for visualization
   * 
   * @param sourceId - The starting node ID
   */
  private initialize(sourceId: string): void {
    // Clear all data structures for a fresh start
    this.queue = [];
    this.visited.clear();
    this.parent.clear();
    this.visitOrder = [];
    this.steps = [];

    // Add source node to queue and mark as visited
    this.queue.push(sourceId);
    this.visited.add(sourceId);

    // Source has no parent (it's the root of the BFS tree)
    this.parent.set(sourceId, null);

    // Record initialization step for visualization
    this.recordStep('start', sourceId);
  }

  /**
   * Processes a node that was dequeued.
   * 
   * Mark it as visited and record it in the visit order.
   * This is called when a node moves from queue to active processing.
   * 
   * @param nodeId - The ID of the node being processed
   * @param node - The node object
   */
  private processNode(nodeId: string, node: GraphNodeInterface<T>): void {
    // Record that this node is being visited
    this.visitOrder.push(nodeId);

    // Record visit step for visualization
    this.recordStep('visit', nodeId);
  }

  /**
   * Discovers and enqueues all unvisited neighbors of a node.
   * 
   * For each neighbor of the current node:
   * 1. Check if it has been visited before
   * 2. If not visited, mark as visited, set parent, and enqueue
   * 3. Record discovery step for visualization
   * 
   * This is where BFS explores outward, one level at a time.
   * 
   * @param currentId - The ID of the current node
   * @param currentNode - The current node object
   */
  private discoverNeighbors(currentId: string, currentNode: GraphNodeInterface<T>): void {
    // Iterate through all neighbors of the current node
    for (const [, edge] of currentNode.getNeighbors()) {
      const neighborId = edge.node.id;

      // Skip if neighbor has already been visited
      if (this.visited.has(neighborId)) continue;

      // Mark neighbor as visited (to prevent revisiting)
      this.visited.add(neighborId);

      // Set current node as parent of this neighbor
      // This creates the BFS tree for path reconstruction
      this.parent.set(neighborId, currentId);

      // Add neighbor to queue for processing
      this.queue.push(neighborId);

      // Record discovery step for visualization
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
      queue: [...this.queue],
      parent: new Map(this.parent),
    });
  }
}
