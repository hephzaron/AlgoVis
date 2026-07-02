import { useState, useCallback } from 'react';
import { Dijkstra } from '../../../../algorithms/graph/Dijkstra/Dijkstra';
import { DijkstraStep } from '../../../../algorithms/graph/Dijkstra/types';
import { Graph } from '../../GraphVisualizer';

export function useDijkstra(graph: Graph<string>) {
  const [steps, setSteps] = useState<DijkstraStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [finalPrevious, setFinalPrevious] = useState<Map<string, string | null>>(new Map());
  const [sourceNode, setSourceNode] = useState('A');

  const runAlgorithm = useCallback((source: string) => {
    const node = graph.getNode(source);
    if (!node) {
      alert('Invalid source node');
      return;
    }

    const dijkstra = new Dijkstra(graph);
    const result = dijkstra.run(source);

    setSteps(result.steps);
    setCurrentStep(0);
    setHasRun(true);
    setFinalPrevious(result.previous);
    setSourceNode(source);
  }, [graph]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setHasRun(false);
    setSteps([]);
    setFinalPrevious(new Map());
  }, []);

  const reconstructPath = useCallback((targetNode: string): string[] => {
    const path: string[] = [];
    let current: string | null = targetNode;

    while (current !== null) {
      path.unshift(current);
      current = finalPrevious.get(current) || null;
    }

    return path;
  }, [finalPrevious]);

  return {
    steps,
    currentStep,
    setCurrentStep,
    hasRun,
    setHasRun,
    finalPrevious,
    sourceNode,
    setSourceNode,
    runAlgorithm,
    reset,
    reconstructPath,
  };
}