/**
 * @fileoverview Hook for BFS algorithm execution and state management
 * Handles running the algorithm and managing its execution state
 */

import { useState, useCallback } from 'react';
import { BFS } from '../../../../algorithms/graph/BFS/BFS';

/**
 * Custom hook for BFS algorithm execution
 * 
 * Manages the algorithm's execution state, including:
 * - Step-by-step results
 * - Current progress
 * - Source node selection
 * - Parent relationships for path reconstruction
 * 
 * @param {any} graph - The graph instance to run BFS on
 * @returns {Object} BFS execution state and controls
 * @returns {any[]} steps - Array of BFS execution steps
 * @returns {number} currentStep - Current step index
 * @returns {Function} setCurrentStep - Update current step
 * @returns {boolean} hasRun - Whether algorithm has been run
 * @returns {Function} setHasRun - Update hasRun state
 * @returns {Map<string, string | null>} finalParent - Parent map for path reconstruction
 * @returns {string} sourceNode - Currently selected source node
 * @returns {Function} setSourceNode - Update source node
 * @returns {Function} runAlgorithm - Execute BFS from given source
 * @returns {Function} reset - Reset all algorithm state
 * 
 * @example
 * const { steps, currentStep, runAlgorithm, reset } = useBFS(graph);
 */
export function useBFS(graph: any) {
  /** Store all BFS execution steps */
  const [steps, setSteps] = useState<any[]>([]);
  
  /** Current position in the step sequence */
  const [currentStep, setCurrentStep] = useState(0);
  
  /** Track if algorithm has been run */
  const [hasRun, setHasRun] = useState(false);
  
  /** Parent map for reconstructing paths after completion */
  const [finalParent, setFinalParent] = useState<Map<string, string | null>>(new Map());
  
  /** User-selected starting node */
  const [sourceNode, setSourceNode] = useState('A');

  /**
   * Execute BFS algorithm from a given source node
   * 
   * Validates the source node exists, runs BFS, and stores results
   * 
   * @param {string} source - ID of the source node
   * @throws {Alert} Shows alert if source node is invalid
   */
  const runAlgorithm = useCallback((source: string) => {
    const node = graph.getNode(source);
    if (!node) {
      alert('Invalid source node');
      return;
    }

    const bfs = new BFS(graph);
    const result = bfs.run(source);

    setSteps(result.steps);
    setCurrentStep(0);
    setHasRun(true);
    setFinalParent(result.parent);
  }, [graph]);

  /**
   * Reset algorithm state to initial conditions
   * Clears all steps and resets progress
   */
  const reset = useCallback(() => {
    setCurrentStep(0);
    setHasRun(false);
    setSteps([]);
    setFinalParent(new Map());
  }, []);

  return {
    steps,
    currentStep,
    setCurrentStep,
    hasRun,
    setHasRun,
    finalParent,
    sourceNode,
    setSourceNode,
    runAlgorithm,
    reset,
  };
}