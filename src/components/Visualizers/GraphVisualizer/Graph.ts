
import { GraphNode } from './GraphNode';
import { Edge, GraphStats, GraphInterface, GraphNodeInterface } from './types';

/**
 * Represents a Graph data structure.
 * @template T - The type of values stored in nodes
 * @implements {GraphInterface<T>}
 */
export class Graph<T> implements GraphInterface<T> {
  nodes: Map<string, GraphNodeInterface<T>> = new Map();
  size: number = 0;

  /**
   * Adds a new node to the graph.
   * @param {T} value - The value to store.
   * @param {string} id - Unique identifier for the node.
   * @returns {GraphNodeInterface<T>} The created node.
   */
  addNode(value: T, id: string): GraphNodeInterface<T> {
    if (this.nodes.has(id)) {
      throw new Error(`Node with ID ${id} already exists`);
    }
    const node = new GraphNode(value, id);
    this.nodes.set(id, node);
    this.size++;
    return node;
  }

  /**
   * Removes a node from the graph.
   * @param {string} id - The ID of the node to remove.
   * @returns {boolean} True if removed successfully.
   */
  removeNode(id: string): boolean {
    const node = this.nodes.get(id);
    if (!node) return false;

    // Remove all edges pointing to this node
    for (const [, otherNode] of this.nodes) {
      otherNode.removeNeighbor(id);
    }

    this.nodes.delete(id);
    this.size--;
    return true;
  }

  /**
   * Gets a node by ID.
   * @param {string} id - The ID of the node.
   * @returns {GraphNodeInterface<T> | undefined} The node if found.
   */
  getNode(id: string): GraphNodeInterface<T> | undefined {
    return this.nodes.get(id);
  }

  /**
   * Adds an edge between two nodes.
   * @param {string} fromId - The source node ID.
   * @param {string} toId - The target node ID.
   * @returns {boolean} True if edge was added.
   */
  addEdge(fromId: string, toId: string): boolean {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);
    if (!fromNode || !toNode) return false;

    fromNode.addNeighbor(toNode);
    toNode.addNeighbor(fromNode); // Undirected graph
    return true;
  }

  /**
   * Removes an edge between two nodes.
   * @param {string} fromId - The source node ID.
   * @param {string} toId - The target node ID.
   * @returns {boolean} True if edge was removed.
   */
  removeEdge(fromId: string, toId: string): boolean {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);
    if (!fromNode || !toNode) return false;

    return fromNode.removeNeighbor(toId) && toNode.removeNeighbor(fromId);
  }

  /**
   * Checks if an edge exists between two nodes.
   * @param {string} fromId - The source node ID.
   * @param {string} toId - The target node ID.
   * @returns {boolean} True if edge exists.
   */
  hasEdge(fromId: string, toId: string): boolean {
    const fromNode = this.nodes.get(fromId);
    if (!fromNode) return false;
    return fromNode.hasNeighbor(toId);
  }

  /**
   * Gets all nodes in the graph.
   * @returns {GraphNodeInterface<T>[]} Array of nodes.
   */
  getNodes(): GraphNodeInterface<T>[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Gets all edges in the graph.
   * @returns {Edge[]} Array of edge objects.
   */
  getEdges(): Edge[] {
    const edges: Edge[] = [];
    const seen = new Set<string>();

    for (const [id, node] of this.nodes) {
      for (const neighborId of node.getNeighbors()) {
        const key = [id, neighborId].sort().join('-');
        if (!seen.has(key)) {
          edges.push({ from: id, to: neighborId });
          seen.add(key);
        }
      }
    }
    return edges;
  }

  /**
   * Clears all nodes and edges from the graph.
   * @returns {void}
   */
  clear(): void {
    this.nodes.clear();
    this.size = 0;
  }

  /**
   * Gets graph statistics.
   * @returns {GraphStats} Statistics about the graph.
   */
  getStats(): GraphStats {
    const nodeArray = this.getNodes();
    const edgeArray = this.getEdges();
    const degrees = nodeArray.map(node => node.getDegree());
    const maxDegree = degrees.length > 0 ? Math.max(...degrees) : 0;
    const minDegree = degrees.length > 0 ? Math.min(...degrees) : 0;
    const avgDegree = nodeArray.length > 0 ? (edgeArray.length * 2) / nodeArray.length : 0;

    // Detect cycles (simplified - checks if any node has degree > 1)
    const hasCycle = degrees.some(d => d > 1) && nodeArray.length > 2;

    // Count connected components (simplified BFS)
    let components = 0;
    const visited = new Set<string>();
    for (const node of nodeArray) {
      if (!visited.has(node.id)) {
        components++;
        const queue = [node.id];
        while (queue.length > 0) {
          const currentId = queue.shift()!;
          if (visited.has(currentId)) continue;
          visited.add(currentId);
          const currentNode = this.nodes.get(currentId);
          if (currentNode) {
            for (const neighborId of currentNode.getNeighbors()) {
              if (!visited.has(neighborId)) {
                queue.push(neighborId);
              }
            }
          }
        }
      }
    }

    return {
      nodeCount: nodeArray.length,
      edgeCount: edgeArray.length,
      averageDegree: avgDegree,
      maxDegree,
      minDegree,
      connectedComponents: components,
      hasCycle
    };
  }

   /**
   * Applies force-directed layout with configurable distance between nodes.
   * @param {number} iterations - Number of iterations to run.
   * @param {number} springConstant - Spring constant for the layout.
   * @param {number} repulsionConstant - Repulsion constant for the layout.
   * @param {number} damping - Damping factor to smooth movements.
   * @param {number} nodeRadius - Radius of nodes for collision detection.
   * @param {number} targetDistance - The desired distance between connected nodes.
   */
  forceDirectedLayout(
    iterations: number = 100, 
    springConstant: number = 0.05, 
    repulsionConstant: number = 200,
    damping: number = 0.85,
    nodeRadius: number = 30,
    targetDistance: number = 150  // NEW: Controls how far apart nodes should be
  ): void {
    const nodeArray = this.getNodes();
    const edgeArray = this.getEdges();

    if (nodeArray.length === 0) return;

    const canvasWidth = 700;
    const canvasHeight = 500;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Initialize velocities
    const velocities = new Map<string, { x: number; y: number }>();
    for (const node of nodeArray) {
      velocities.set(node.id, { x: 0, y: 0 });
    }

    for (let iter = 0; iter < iterations; iter++) {
      // Apply repulsion between all nodes (prevents overlap)
      for (let i = 0; i < nodeArray.length; i++) {
        for (let j = i + 1; j < nodeArray.length; j++) {
          const dx = nodeArray[i].position.x - nodeArray[j].position.x;
          const dy = nodeArray[i].position.y - nodeArray[j].position.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
          
          // Strong repulsion when nodes are too close
          const minDist = nodeRadius * 1.5;
          const force = dist < minDist 
            ? repulsionConstant * 3 / (dist + 0.1) 
            : repulsionConstant / (dist * dist);
          
          const forceX = (dx / dist) * force * 0.01;
          const forceY = (dy / dist) * force * 0.01;
          
          const v1 = velocities.get(nodeArray[i].id)!;
          const v2 = velocities.get(nodeArray[j].id)!;
          v1.x += forceX;
          v1.y += forceY;
          v2.x -= forceX;
          v2.y -= forceY;
        }
      }

      // Apply attraction along edges with target distance
      for (const edge of edgeArray) {
        const fromNode = this.nodes.get(edge.from);
        const toNode = this.nodes.get(edge.to);
        if (!fromNode || !toNode) continue;

        const dx = fromNode.position.x - toNode.position.x;
        const dy = fromNode.position.y - toNode.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        
        // Spring force - pull nodes to target distance
        // If dist > targetDistance, pull them together
        // If dist < targetDistance, push them apart
        const force = springConstant * (dist - targetDistance);
        const forceX = (dx / dist) * force * 0.01;
        const forceY = (dy / dist) * force * 0.01;
        
        const v1 = velocities.get(fromNode.id)!;
        const v2 = velocities.get(toNode.id)!;
        v1.x -= forceX;
        v1.y -= forceY;
        v2.x += forceX;
        v2.y += forceY;
      }

      // Apply central gravity to keep nodes on screen
      for (const node of nodeArray) {
        const dx = node.position.x - centerX;
        const dy = node.position.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        const gravity = 0.0005 * dist;
        const v = velocities.get(node.id)!;
        v.x -= (dx / dist) * gravity;
        v.y -= (dy / dist) * gravity;
      }

      // Apply damping and update positions
      for (const node of nodeArray) {
        const v = velocities.get(node.id)!;
        v.x *= damping;
        v.y *= damping;
        
        node.position.x += v.x;
        node.position.y += v.y;
        
        const margin = nodeRadius + 20;
        node.position.x = Math.max(margin, Math.min(canvasWidth - margin, node.position.x));
        node.position.y = Math.max(margin, Math.min(canvasHeight - margin, node.position.y));
      }
    }
  }

  /**
   * Updates the layout with a new target distance.
   * @param {number} distance - The new target distance between nodes.
   */
  updateLayoutWithDistance(distance: number): void {
    const nodeArray = this.getNodes();
    if (nodeArray.length === 0) return;

    // Calculate current average distance between connected nodes
    const edges = this.getEdges();
    let avgDist = 0;
    let count = 0;
    for (const edge of edges) {
      const fromNode = this.nodes.get(edge.from);
      const toNode = this.nodes.get(edge.to);
      if (fromNode && toNode) {
        const dx = fromNode.position.x - toNode.position.x;
        const dy = fromNode.position.y - toNode.position.y;
        avgDist += Math.sqrt(dx * dx + dy * dy);
        count++;
      }
    }
    
    if (count === 0) {
      // If no edges, just spread nodes out uniformly
      this.spreadNodesUniformly(distance);
      return;
    }
    
    avgDist /= count;
    
    // Scale positions based on the ratio of target distance to current distance
    if (avgDist > 0) {
      const scale = distance / avgDist;
      const centerX = 350;
      const centerY = 250;
      
      // Scale all positions relative to center
      for (const node of nodeArray) {
        const dx = node.position.x - centerX;
        const dy = node.position.y - centerY;
        node.position.x = centerX + (dx * scale);
        node.position.y = centerY + (dy * scale);
        
        // Clamp positions
        const margin = 50;
        node.position.x = Math.max(margin, Math.min(700 - margin, node.position.x));
        node.position.y = Math.max(margin, Math.min(500 - margin, node.position.y));
      }
    }
  }

  /**
   * Spreads nodes uniformly when there are no edges.
   * @param {number} distance - The distance between nodes.
   */
  private spreadNodesUniformly(distance: number): void {
    const nodeArray = this.getNodes();
    if (nodeArray.length === 0) return;
    
    const cols = Math.ceil(Math.sqrt(nodeArray.length));
    const rows = Math.ceil(nodeArray.length / cols);
    const spacing = distance * 0.8;
    const startX = (700 - (cols - 1) * spacing) / 2;
    const startY = (500 - (rows - 1) * spacing) / 2;
    
    nodeArray.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      node.position.x = startX + col * spacing;
      node.position.y = startY + row * spacing;
    });
  }

}