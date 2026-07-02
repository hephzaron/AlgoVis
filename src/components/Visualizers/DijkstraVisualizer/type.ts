import { DijkstraStep } from '../../../algorithms/graph/Dijkstra/types';

export interface NodePosition {
  x: number;
  y: number;
}

export interface GraphNode {
  id: string;
}

export interface DijkstraVisualizerState {
  steps: DijkstraStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  sourceNode: string;
  hasRun: boolean;
  selectedPathNode: string | null;
  finalPrevious: Map<string, string | null>;
}