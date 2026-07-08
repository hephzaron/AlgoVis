/**
 * @fileoverview Hook for managing path highlighting in the graph
 * Handles path reconstruction and selection state
 */

import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for path highlighting functionality
 * 
 * Manages the selection and highlighting of paths from source to any visited node
 * Uses the final parent map to reconstruct paths
 * 
 * @param {Map<string, string | null>} finalParent - Parent map from BFS execution
 * @returns {Object} Path highlighting state and controls
 * @returns {string | null} selectedPathNode - Currently selected target node
 * @returns {Set<string>} pathNodeSet - Set of nodes in the highlighted path
 * @returns {Set<string>} pathEdgeSet - Set of edges in the highlighted path
 * @returns {Function} togglePath - Toggle path highlighting for a node
 * @returns {Function} clearPath - Clear current path highlighting
 * 
 * @example
 * const { selectedPathNode, pathNodeSet, togglePath } = usePathHighlight(finalParent);
 */
export function usePathHighlight(finalParent: Map<string, string | null>) {
  /** Currently selected node for path highlighting */
  const [selectedPathNode, setSelectedPathNode] = useState<string | null>(null);

  /**
   * Reconstruct path from source to target node
   * 
   * Uses the parent map to trace back from target to source
   * Returns empty array if no path exists
   * 
   * @param {string} targetNode - The target node ID
   * @returns {string[]} Array of node IDs in order from source to target
   */
  const reconstructPath = useCallback((targetNode: string): string[] => {
    const path: string[] = [];
    let current: string | null = targetNode;

    while (current !== null) {
      path.unshift(current);
      current = finalParent.get(current) || null;
    }

    return path;
  }, [finalParent]);

  /**
   * Memoized path nodes for the selected target
   * Automatically recalculates when selection changes
   */
  const highlightedPath = useMemo(() => {
    return selectedPathNode ? reconstructPath(selectedPathNode) : [];
  }, [selectedPathNode, reconstructPath]);

  /**
   * Set of nodes in the highlighted path for quick lookup
   */
  const pathNodeSet = useMemo(() => new Set(highlightedPath), [highlightedPath]);

  /**
   * Set of edges in the highlighted path
   * Stores both directions for undirected graph support
   */
  const pathEdgeSet = useMemo(() => {
    const edgeSet = new Set<string>();
    for (let i = 0; i < highlightedPath.length - 1; i++) {
      const from = highlightedPath[i];
      const to = highlightedPath[i + 1];
      edgeSet.add(`${from}-${to}`);
      edgeSet.add(`${to}-${from}`);
    }
    return edgeSet;
  }, [highlightedPath]);

  /**
   * Toggle path highlighting for a node
   * If node is already selected, deselect it
   * 
   * @param {string} nodeId - ID of the node to toggle
   */
  const togglePath = useCallback((nodeId: string) => {
    setSelectedPathNode(prev => prev === nodeId ? null : nodeId);
  }, []);

  /**
   * Clear current path highlighting
   */
  const clearPath = useCallback(() => {
    setSelectedPathNode(null);
  }, []);

  return {
    selectedPathNode,
    pathNodeSet,
    pathEdgeSet,
    togglePath,
    clearPath,
  };
}