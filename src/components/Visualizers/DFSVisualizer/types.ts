/**
 * @fileoverview Type definitions for the DFS Visualizer component
 * Contains all interfaces and type declarations used across the module
 */

import { DFSStep } from '../../../algorithms/graph/DFS/types';

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
 * Props for the DFSHeader component
 */
export interface DFSHeaderProps {
  /** Currently selected source node */
  sourceNode: string;
  /** Callback when source node changes */
  onSourceChange: (value: string) => void;
  /** Callback to run the DFS algorithm */
  onRun: () => void;
  /** Whether animation is currently playing */
  isPlaying: boolean;
  /** List of all nodes in the graph */
  nodes: GraphNode[];
  /** Whether the algorithm has been run */
  hasRun: boolean;
}

/**
 * Props for the DFSGraphCanvas component
 */
export interface DFSGraphCanvasProps {
  /** Graph instance containing nodes and edges */
  graph: any;
  /** Map of node IDs to their positions */
  nodePositions: Map<string, NodePosition>;
  /** Source node ID */
  sourceNode: string;
  /** List of visited node IDs in order */
  visited: string[];
  /** Current stack contents */
  stack: string[];
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
 * Props for the DFSInfoPanel component
 */
export interface DFSInfoPanelProps {
  /** Current step data from the algorithm */
  stepData?: DFSStep;
}

/**
 * Props for the DFSStackDisplay component
 */
export interface DFSStackDisplayProps {
  /** Current stack contents */
  stack: string[];
}

/**
 * Props for the DFSVisitedList component
 */
export interface DFSVisitedListProps {
  /** List of visited nodes in order */
  visited: string[];
  /** Currently selected node for path highlighting */
  selectedPathNode: string | null;
  /** Callback when a node is selected/deselected */
  onNodeSelect: (nodeId: string | null ) => void;
}

/**
 * Props for the DFSControls component
 */
export interface DFSControlsProps {
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
 * Props for the DFSEmptyState component
 */
export interface DFSEmptyStateProps {
  /** Callback to run the algorithm */
  onRun: () => void;
}

/**
 * Props for the DFSLegend component (optional)
 */
export interface DFSLegendProps {
  /** Custom legend items (optional) */
  items?: Array<{ color: string; label: string }>;
}