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
 * Props for the BFSHeader component
 */
export interface BFSHeaderProps {
  /** Currently selected source node */
  sourceNode: string;
  /** Callback when source node changes */
  onSourceChange: (value: string) => void;
  /** Callback to run the BFS algorithm */
  onRun: () => void;
  /** Whether animation is currently playing */
  isPlaying: boolean;
  /** List of all nodes in the graph */
  nodes: GraphNode[];
  /** Whether the algorithm has been run */
  hasRun: boolean;
}

/**
 * Props for the BFSGraphCanvas component
 */
export interface BFSGraphCanvasProps {
  /** Graph instance containing nodes and edges */
  graph: any;
  /** Map of node IDs to their positions */
  nodePositions: Map<string, NodePosition>;
  /** Source node ID */
  sourceNode: string;
  /** List of visited node IDs in order */
  visited: string[];
  /** Current queue contents */
  queue: string[];
  /** Currently processing node (optional) */
  currentNode?: string;
  /** Node being discovered (optional) */
  discoveringNode?: string;
  /** Set of nodes in the highlighted path */
  pathNodeSet: Set<string>;
  /** Set of edges in the highlighted path */
  pathEdgeSet: Set<string>;
  /** Currently selected node for path highlighting */
  selectedPathNode: string | null;
  /** Type of the current step (for edge highlighting) */
  currentStepType?: string;
}

/**
 * Props for the BFSQueueDisplay component
 */
export interface BFSQueueDisplayProps {
  /** Current queue contents */
  queue: string[];
}

/**
 * Props for the BFSVisitedList component
 */
export interface BFSVisitedListProps {
  /** List of visited nodes in order */
  visited: string[];
  /** Currently selected node for path highlighting */
  selectedPathNode: string | null;
  /** Callback when a node is selected/deselected */
  onNodeSelect: (nodeId: string | null) => void;
}

/**
 * Props for the BFSControls component
 */
export interface BFSControlsProps {
  /** Whether animation is playing */
  isPlaying: boolean;
  /** Callback to toggle play/pause */
  onPlayPause: () => void;
  /** Callback to advance one step */
  onStep: () => void;
  /** Callback to reset the visualization */
  onReset: () => void;
  /** Current step index */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Current speed setting (0-100) */
  speed: number;
  /** Callback when speed changes */
  onSpeedChange: (value: number) => void;
  /** Whether the step button should be disabled */
  isStepDisabled: boolean;
}

/**
 * Props for the BFSEmptyState component
 */
export interface BFSEmptyStateProps {
  /** Callback to run the algorithm */
  onRun: () => void;
}

/**
 * Props for the BFSLegend component
 */
export interface BFSLegendProps {
  /** Custom legend items (optional) */
  items?: Array<{ color: string; label: string }>;
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