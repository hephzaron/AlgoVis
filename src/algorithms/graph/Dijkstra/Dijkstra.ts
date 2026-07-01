import { 
  Graph, 
  GraphNodeInterface, 
  GraphInterface } from '../../../components/Visualizers/GraphVisualizer';

import { Queue } from '../../../components/Visualizers/QueueVisualizer';
import { DijkstraResult, DijkstraStep } from './types';

/**
 * Dijkstra shortest path algorithm.
 *
 * Computes the shortest distance from a source node to every
 * other node in a weighted graph with non-negative edge weights.
 */
export class Dijkstra<T> {
  private readonly graph: Graph<T>;

  private readonly queue = new Queue<string>();

  private readonly distances = new Map<string, number>();

  private readonly previous = new Map<string, string | null>();

  private readonly visited = new Set<string>();

  private readonly steps: DijkstraStep[] = [];

  constructor(graph: Graph<T>) {
    this.graph = graph;
  }

  /**
   * Executes Dijkstra's algorithm.
   */
  public run(sourceId: string): DijkstraResult {
    this.initialize(sourceId);

    while (!this.queue.isEmpty()) {
      const currentId = this.queue.dequeue();

      if (currentId === undefined) break;

      if (this.visited.has(currentId)) continue;

      this.visit(currentId);

      const currentNode = this.graph.getNode(currentId);

      if (!currentNode) continue;

      for (const [, edge] of currentNode.getNeighbors()) {
        this.relax(currentId, edge.node.id, edge.weight);
      }
    }

    this.recordStep("complete");

    return {
      distances: new Map(this.distances),
      previous: new Map(this.previous),
      steps: [...this.steps],
    };
  }

  /**
   * Initializes algorithm state.
   */
  private initialize(sourceId: string): void {
    this.queue.clear();
    this.visited.clear();
    this.steps.length = 0;
    this.distances.clear();
    this.previous.clear();

    for (const node of this.graph.getNodes()) {
      this.distances.set(node.id, Infinity);
      this.previous.set(node.id, null);
    }

    this.distances.set(sourceId, 0);

    this.queue.enqueue(sourceId, 0);

    this.recordStep("start", sourceId);
  }

  /**
   * Marks a node as visited.
   */
  private visit(nodeId: string): void {
    this.visited.add(nodeId);

    this.recordStep("visit", nodeId);
  }

  /**
   * Relaxes an edge.
   */
  private relax(
    currentId: string,
    neighborId: string,
    weight: number
  ): void {
    this.recordStep(
      "relax",
      currentId,
      neighborId,
      weight
    );

    if (this.visited.has(neighborId)) return;

    const currentDistance = this.distances.get(currentId)!;

    const candidate = currentDistance + weight;

    const known = this.distances.get(neighborId)!;

    if (candidate >= known) return;

    this.distances.set(neighborId, candidate);

    this.previous.set(neighborId, currentId);

    this.queue.enqueue(neighborId, candidate);

    this.recordStep(
      "update",
      currentId,
      neighborId,
      weight,
      known,
      candidate
    );
  }

  /**
   * Saves one immutable visualization step.
   */
  private recordStep(
    type: DijkstraStep["type"],
    current?: string,
    neighbor?: string,
    weight?: number,
    oldDistance?: number,
    newDistance?: number
  ): void {
    this.steps.push({
      type,
      current,
      neighbor,
      edgeWeight: weight,
      oldDistance,
      newDistance,
      distances: new Map(this.distances),
      previous: new Map(this.previous),
      visited: new Set(this.visited),
    });
  }
}