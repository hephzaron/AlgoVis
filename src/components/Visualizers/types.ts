/**
 * Represents the position of a node in the graph visualization
 */
export interface NodePosition {
  /** X coordinate in the SVG viewport */
  x: number;
  /** Y coordinate in the SVG viewport */
  y: number;
}

/**
 * Represents a node in the graph with its display properties
 */
export interface GraphNode {
  /** Unique identifier for the node */
  id: string;
  /** Display value of the node */
  value: string;
}
/**
 * Props for the Animation component 
 */
export interface UseAnimationProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}

export interface HeaderProps {
  sourceNode: string;
  onSourceChange: (value: string) => void;
  onRun: () => void;
  isPlaying: boolean;
  nodes: GraphNode[];
  hasRun: boolean;
}
