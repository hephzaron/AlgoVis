/**
 * @fileoverview Hook for managing graph data and node positions
 * Creates and provides the graph structure with predefined nodes and edges
 */

import { useState, useMemo } from 'react';
import { Graph } from '../GraphVisualizer';
import { NodePosition } from '../types';

/**
 * Custom hook for initializing and managing graph data
 * Also calculates node positions in a circular layout for visualization
 * 
 * @returns {Object} Graph data and utilities
 * @returns {Graph} graph - The graph instance
 * @returns {Map<string, NodePosition>} nodePositions - Map of node IDs to their positions
 * @returns {GraphNode[]} nodesList - Array of all nodes in the graph
 * 
 * @example
 * const { graph, nodePositions, nodesList } = useGraphData();
 */
export function useGraphData() {
  /**
   * Initialize the graph with sample nodes and edges
   * Uses useState to maintain graph instance across re-renders
   */
  const [graph] = useState(() => {
    const g = new Graph<string>();
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    nodes.forEach(id => g.addNode(id, id));
    
    g.addEdge('A', 'B', 4);
    g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 1);
    g.addEdge('B', 'D', 5);
    g.addEdge('C', 'D', 8);
    g.addEdge('C', 'E', 10);
    g.addEdge('D', 'E', 2);
    g.addEdge('D', 'F', 6);
    g.addEdge('E', 'F', 3);
    
    return g;
  });

  /**
   * Calculate positions for each node in a circular layout
   * Uses trigonometric functions to distribute nodes evenly
   */
  const nodePositions = useMemo<Map<string, NodePosition>>(() => {
    const positions = new Map<string, NodePosition>();
    const nodes = Array.from(graph.getNodes());
    const angle = (2 * Math.PI) / nodes.length;
    const radius = 130;
    const centerX = 260;
    const centerY = 210;

    nodes.forEach((node, index) => {
      positions.set(node.id, {
        x: centerX + radius * Math.cos(index * angle),
        y: centerY + radius * Math.sin(index * angle),
      });
    });

    return positions;
  }, [graph]);

  /**
   * Convert graph nodes to a simpler format for consumption
   * Memoized to prevent unnecessary recalculations
   */
  const nodesList = useMemo(() => {
    return Array.from(graph.getNodes()).map(node => ({
      id: node.id,
      value: node.value as string,
    }));
  }, [graph]);

  return { graph, nodePositions, nodesList };
}