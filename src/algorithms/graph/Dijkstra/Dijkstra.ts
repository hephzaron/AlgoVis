
import { 
  Graph, 
  GraphNodeInterface 
} from '../../../components/Visualizers/GraphVisualizer';

import { Heap } from '../../../components/Visualizers/HeapVisualizer';
import { DijkstraResult, DijkstraStep } from './types';

/**
 * Dijkstra's Shortest Path Algorithm Implementation
 * 
 * This class implements Dijkstra's algorithm to compute the shortest paths
 * from a source node to all other nodes in a weighted graph with non-negative edge weights.
 * 
 * Time Complexity: O((V + E) log V) with min-heap implementation
 * Space Complexity: O(V)
 * 
 * The algorithm is divided into modular, single-responsibility methods:
 * - initialize: Sets up initial state
 * - selectMinNode: Extracts the unvisited node with minimum distance
 * - relaxEdges: Updates distances to neighbors
 * - recordStep: Tracks algorithm progress for visualization
 * 
 * @template T - The type of values stored in graph nodes
 */
export class Dijkstra<T> {
  /** Reference to the graph being analyzed */
  private readonly graph: Graph<T>;

  /** 
   * Min-heap priority queue storing nodes by their distance.
   * Uses a min-heap to efficiently select the node with minimum distance.
   * Each item contains: { nodeId: string, distance: number }
   */
  private priorityQueue: Heap<any>;

  /** 
   * Map storing shortest known distance from source to each node.
   * Initialized to Infinity for all nodes except the source (0).
   */
  private distances: Map<string, number>;

  /** 
   * Map storing the previous node on the shortest path to each node.
   * Used for path reconstruction and visualization.
   */
  private previous: Map<string, string | null>;

  /** 
   * Set of nodes that have been permanently processed.
   * A node is marked as visited when it's extracted from the priority queue,
   * ensuring each node is processed exactly once.
   */
  private visited: Set<string>;

  /** 
   * Array of algorithm execution steps for visualization purposes.
   * Each step captures the state of the algorithm at different points.
   */
  private steps: DijkstraStep[];

  /**
   * Creates a new Dijkstra algorithm instance for the given graph.
   * 
   * @param graph - The weighted graph to analyze
   */
  constructor(graph: Graph<T>) {
    this.graph = graph;
    this.priorityQueue = new Heap({ type: 'min', usePriority: true });
    this.distances = new Map();
    this.previous = new Map();
    this.visited = new Set();
    this.steps = [];
  }

  /**
   * Executes Dijkstra's shortest path algorithm.
   * 
   * This is the main entry point for the algorithm. It:
   * 1. Initializes all data structures
   * 2. Repeatedly extracts the minimum-distance unvisited node
   * 3. Relaxes all edges from that node
   * 4. Records visualization steps throughout
   * 
   * @param sourceId - The ID of the starting node
   * @returns DijkstraResult containing final distances, previous nodes, and execution steps
   * @throws Error if the source node doesn't exist in the graph
   */
  public run(sourceId: string): DijkstraResult {
    // Validate source node exists
    if (!this.graph.getNode(sourceId)) {
      throw new Error(`Source node with ID "${sourceId}" not found in graph`);
    }

    // Phase 1: Initialize algorithm state
    this.initialize(sourceId);

    // Phase 2: Main algorithm loop
    // Continue while there are unvisited nodes in the priority queue
    while (!this.priorityQueue.isEmpty()) {
      // Extract the unvisited node with minimum distance
      const currentItem = this.priorityQueue.extractRoot();
      
      if (!currentItem) break;

      const currentId = currentItem.nodeId;

      // Skip if already visited (handles duplicate entries in priority queue)
      if (this.visited.has(currentId)) continue;

      // Mark node as permanently processed
      this.visitNode(currentId);

      // Get the current node from the graph
      const currentNode = this.graph.getNode(currentId);
      if (!currentNode) continue;

      // Phase 3: Relax all outgoing edges from current node
      this.relaxEdges(currentId, currentNode);
    }

    // Record final completion step
    this.recordStep('complete');

    // Return results with immutable copies to prevent external modifications
    return {
      distances: new Map(this.distances),
      previous: new Map(this.previous),
      steps: [...this.steps],
    };
  }

  /**
   * Initializes algorithm state before execution.
   * 
   * Sets up:
   * - All nodes with infinite distance except source (distance = 0)
   * - All nodes with no previous node
   * - Empty visited set
   * - Source node as first entry in priority queue
   * - Records the start step for visualization
   * 
   * @param sourceId - The starting node ID
   */
  private initialize(sourceId: string): void {
    // Clear all data structures for a fresh start
    this.priorityQueue.clear();
    this.visited.clear();
    this.steps = [];
    this.distances.clear();
    this.previous.clear();

    // Set all nodes to infinite distance initially
    // This represents "not yet discovered"
    for (const node of this.graph.getNodes()) {
      this.distances.set(node.id, Infinity);
      this.previous.set(node.id, null);
    }

    // Source node has distance 0 to itself
    this.distances.set(sourceId, 0);

    // Add source node to priority queue with distance 0
    // Using { nodeId, distance } object with priority field for heap
    this.priorityQueue.insert(
      { nodeId: sourceId, distance: 0 },
      0 // priority is the distance value
    );

    // Record initialization step for visualization
    this.recordStep('start', sourceId);
  }

  /**
   * Marks a node as visited (permanently processed).
   * 
   * Once a node is visited, it will not be processed again.
   * This ensures the algorithm terminates and each node is processed optimally.
   * 
   * @param nodeId - The ID of the node being visited
   */
  private visitNode(nodeId: string): void {
    // Add to visited set to prevent reprocessing
    this.visited.add(nodeId);

    // Record visit step for visualization
    this.recordStep('visit', nodeId);
  }

  /**
   * Relaxes all edges from a given node.
   * 
   * For each neighbor of the current node, this method:
   * 1. Calculates the distance via the current node
   * 2. Compares with the known shortest distance to that neighbor
   * 3. If a shorter path is found, updates the distance and adds to priority queue
   * 
   * Edge relaxation is the core operation of Dijkstra's algorithm.
   * It explores alternative paths and updates distances when improvements are found.
   * 
   * @param currentId - The ID of the current node being processed
   * @param currentNode - The current node object
   */
  private relaxEdges(currentId: string, currentNode: GraphNodeInterface<T>): void {
    // Get the distance from source to current node
    const currentDistance = this.distances.get(currentId);

    if (currentDistance === undefined || currentDistance === Infinity) {
      return; // Skip if current node is unreachable
    }

    // Iterate through all neighbors of the current node
    for (const [, edge] of currentNode.getNeighbors()) {
      const neighborId = edge.node.id;
      const edgeWeight = edge.weight;

      // First, record that we're examining this edge
      this.recordStep('relax', currentId, neighborId, edgeWeight);

      // Skip if neighbor is already visited (has optimal distance)
      if (this.visited.has(neighborId)) continue;

      // Calculate the distance to neighbor through current node
      // This represents the alternative path: source -> ... -> current -> neighbor
      const candidateDistance = currentDistance + edgeWeight;

      // Get the previously known distance to this neighbor
      const knownDistance = this.distances.get(neighborId)!;

      // Check if the new path is better (shorter) than the known path
      if (candidateDistance >= knownDistance) {
        continue; // No improvement, skip this edge
      }

      // Improvement found! Update the distance to this neighbor
      this.distances.set(neighborId, candidateDistance);

      // Update the previous node for path reconstruction
      this.previous.set(neighborId, currentId);

      // Add the neighbor to the priority queue with new distance
      // The priority queue will use the distance as the priority,
      // ensuring we always process the minimum-distance node next
      this.priorityQueue.insert(
        { nodeId: neighborId, distance: candidateDistance },
        candidateDistance // Use distance as priority (min-heap will put smaller first)
      );

      // Record update step for visualization, showing the improvement
      this.recordStep(
        'update',
        currentId,
        neighborId,
        edgeWeight,
        knownDistance,
        candidateDistance
      );
    }
  }

  /**
   * Records an algorithm execution step for visualization purposes.
   * 
   * Each step captures a snapshot of the algorithm state at key points:
   * - 'start': Algorithm initialization
   * - 'visit': Node being processed
   * - 'relax': Edge being examined
   * - 'update': Distance being improved
   * - 'complete': Algorithm finished
   * 
   * The step includes immutable copies of the current distances, previous nodes,
   * and visited set, allowing the visualization to replay the algorithm's progress.
   * 
   * @param type - The type of step (indicates what just happened)
   * @param current - Optional: ID of the current node being processed
   * @param neighbor - Optional: ID of the neighbor node being examined
   * @param weight - Optional: Weight of the edge being relaxed
   * @param oldDistance - Optional: Previous distance before relaxation
   * @param newDistance - Optional: New distance after relaxation
   */
  private recordStep(
    type: DijkstraStep['type'],
    current?: string,
    neighbor?: string,
    weight?: number,
    oldDistance?: number,
    newDistance?: number
  ): void {
    // Create a new step with immutable copies of current state
    this.steps.push({
      type,
      current,
      neighbor,
      edgeWeight: weight,
      oldDistance,
      newDistance,
      // Create copies to preserve state at this moment
      distances: new Map(this.distances),
      previous: new Map(this.previous),
      visited: new Set(this.visited),
    });
  }
}