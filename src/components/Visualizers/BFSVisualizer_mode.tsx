import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BFS } from '../../algorithms/graph/BFS/BFS';
import { BFSStep } from '../../algorithms/graph/BFS/types';
import { Graph } from './GraphVisualizer/Graph';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';

/**
 * Position interface for node visualization
 */
interface NodePosition {
  x: number;
  y: number;
}

/**
 * BFSVisualizer Component
 * 
 * Provides interactive step-by-step visualization of Breadth-First Search algorithm.
 * Features include:
 * - Graph rendering with node highlighting
 * - Level-by-level exploration visualization
 * - Queue state tracking
 * - Step-by-step animation playback
 * - Speed control
 * - Manual step navigation
 * - Path highlighting on node click
 */
export default function BFSVisualizer() {
  // ============================================================================
  // State Management
  // ============================================================================

  /** The graph instance for algorithm execution */
  const [graph] = useState(() => {
    // Create a sample graph for demonstration
    const g = new Graph<string>();

    // Add nodes
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    nodes.forEach(id => g.addNode(id, id));

    // Add edges to create an interesting BFS tree
    g.addEdge('A', 'B', 1);
    g.addEdge('A', 'C', 1);
    g.addEdge('B', 'D', 1);
    g.addEdge('B', 'E', 1);
    g.addEdge('C', 'F', 1);
    g.addEdge('E', 'G', 1);

    return g;
  });

  /** Node positions for canvas rendering */
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

  /** Algorithm execution steps */
  const [steps, setSteps] = useState<BFSStep[]>([]);

  /** Current step being displayed */
  const [currentStep, setCurrentStep] = useState(0);

  /** Whether animation is playing */
  const [isPlaying, setIsPlaying] = useState(false);

  /** Animation speed (0-100) */
  const [speed, setSpeed] = useState(50);

  /** Source node for the algorithm */
  const [sourceNode, setSourceNode] = useState('A');

  /** Whether the algorithm has been run */
  const [hasRun, setHasRun] = useState(false);

  /** Selected node to display path */
  const [selectedPathNode, setSelectedPathNode] = useState<string | null>(null);

  /** Final parent map for path reconstruction */
  const [finalParent, setFinalParent] = useState<Map<string, string | null>>(new Map());

  // ============================================================================
  // Algorithm Execution
  // ============================================================================

  /**
   * Executes BFS algorithm from the selected source node
   */
  const runBFS = useCallback(() => {
    const node = graph.getNode(sourceNode);
    if (!node) {
      alert('Invalid source node');
      return;
    }

    // Execute algorithm
    const bfs = new BFS(graph);
    const result = bfs.run(sourceNode);

    // Store steps and reset visualization
    setSteps(result.steps);
    setCurrentStep(0);
    setIsPlaying(false);
    setHasRun(true);
    setFinalParent(result.parent);
    setSelectedPathNode(null);
  }, [graph, sourceNode]);

  /**
   * Reconstructs the path from source to a target node
   */
  const reconstructPath = (targetNode: string): string[] => {
    const path: string[] = [];
    let current: string | null = targetNode;

    while (current !== null) {
      path.unshift(current);
      current = finalParent.get(current) || null;
    }

    return path;
  };

  // ============================================================================
  // Animation Playback
  // ============================================================================

  /**
   * Auto-advance to next step when playing
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && currentStep < steps.length - 1) {
      // Speed range: 0 = slowest (500ms), 100 = fastest (50ms)
      const delayMs = 500 - (speed * 4.5);
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delayMs);
    } else if (currentStep >= steps.length - 1 && steps.length > 0) {
      // Auto-pause at end
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // ============================================================================
  // Data Extraction
  // ============================================================================

  /** Get current step data */
  const currentStepData = steps[currentStep];

  /** Nodes that have been visited */
  const visited = currentStepData?.visited || [];

  /** Current queue contents */
  const queue = currentStepData?.queue || [];

  /** Currently processing node */
  const currentNode = currentStepData?.current;

  /** Node being discovered */
  const discoveringNode = currentStepData?.discovered;

  /** Step type description */
  const stepTypeDescriptions: Record<string, string> = {
    start: 'Starting BFS from source node',
    visit: 'Processing node from the queue',
    discover: 'Discovering unvisited neighbor and adding to queue',
    complete: 'BFS complete - all reachable nodes explored',
  };

  const stepDescription = stepTypeDescriptions[currentStepData?.type || 'start'];

  /** Get highlighted path nodes and edges */
  const highlightedPath = selectedPathNode ? reconstructPath(selectedPathNode) : [];
  const pathNodeSet = new Set(highlightedPath);
  const pathEdgeSet = new Set<string>();
  for (let i = 0; i < highlightedPath.length - 1; i++) {
    const from = highlightedPath[i];
    const to = highlightedPath[i + 1];
    pathEdgeSet.add(`${from}-${to}`);
    pathEdgeSet.add(`${to}-${from}`);
  }

  const visitedSet = new Set(visited);
  const queueSet = new Set(queue);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20 space-y-6">
      {/* ========== Header ========== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Breadth-First Search (BFS)</h2>
          <p className="text-sm text-slate-400 mt-1">
            Explore graph level-by-level from source to all reachable nodes
          </p>
        </div>

        {/* Source Node Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-300">Start from:</label>
          <select
            value={sourceNode}
            onChange={(e) => {
              setSourceNode(e.target.value);
              setHasRun(false);
            }}
            disabled={isPlaying}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm disabled:opacity-50"
          >
            {Array.from(graph.getNodes()).map(node => (
              <option key={node.id} value={node.id}>
                Node {node.id}
              </option>
            ))}
          </select>

          <button
            onClick={runBFS}
            disabled={isPlaying}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Run BFS
          </button>
        </div>
      </div>

      {/* ========== Main Content ========== */}
      {!hasRun ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-12 text-center">
          <p className="text-slate-400 mb-4">
            Select a source node and click "Run BFS" to begin visualization
          </p>
          <button
            onClick={runBFS}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Start BFS Algorithm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ========== Graph Canvas (left) ========== */}
          <div className="lg:col-span-2">
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Graph Visualization</h3>

              {/* SVG Canvas for graph rendering */}
              <svg
                width="100%"
                height="450"
                viewBox="0 0 500 400"
                className="bg-slate-100 rounded-lg border border-slate-300"
              >
                {/* Draw edges */}
                {Array.from(graph.getNodes()).map(node => {
                  const fromPos = nodePositions.get(node.id)!;
                  return Array.from(node.getNeighbors()).map(([, edge]) => {
                    const toPos = nodePositions.get(edge.node.id)!;

                    const isDiscovering =
                      currentStepData?.type === 'discover' &&
                      ((currentStepData.current === node.id &&
                        currentStepData.discovered === edge.node.id) ||
                        (currentStepData.current === edge.node.id &&
                          currentStepData.discovered === node.id));

                    const isPartOfPath =
                      pathEdgeSet.has(`${node.id}-${edge.node.id}`) ||
                      pathEdgeSet.has(`${edge.node.id}-${node.id}`);

                    let edgeColor = '#94a3b8'; // gray - normal
                    let edgeWidth = 2;

                    if (isDiscovering) {
                      edgeColor = '#a78bfa'; // purple - discovering
                      edgeWidth = 3;
                    } else if (isPartOfPath) {
                      edgeColor = '#06b6d4'; // cyan - path
                      edgeWidth = 4;
                    }

                    return (
                      <g key={`edge-${node.id}-${edge.node.id}`}>
                        <motion.line
                          x1={fromPos.x}
                          y1={fromPos.y}
                          x2={toPos.x}
                          y2={toPos.y}
                          stroke={edgeColor}
                          strokeWidth={edgeWidth}
                          animate={{
                            stroke: edgeColor,
                            strokeWidth: edgeWidth,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </g>
                    );
                  });
                })}

                {/* Draw nodes */}
                <AnimatePresence>
                  {Array.from(graph.getNodes()).map(node => {
                    const pos = nodePositions.get(node.id)!;
                    const isSource = node.id === sourceNode;
                    const isVisited = visitedSet.has(node.id);
                    const isInQueue = queueSet.has(node.id);
                    const isCurrent = node.id === currentNode;
                    const isDiscovering = node.id === discoveringNode;
                    const isPartOfPath = pathNodeSet.has(node.id);

                    // Color coding
                    let nodeColor = '#64748b'; // gray - unvisited
                    let ringColor = 'none';

                    if (isPartOfPath && selectedPathNode) {
                      nodeColor = '#06b6d4'; // cyan - path
                      if (node.id === selectedPathNode) {
                        ringColor = '#06b6d4';
                      }
                    } else if (isSource) {
                      nodeColor = '#3b82f6'; // blue - source
                    } else if (isCurrent) {
                      nodeColor = '#8b5cf6'; // purple - current
                      ringColor = '#8b5cf6';
                    } else if (isDiscovering) {
                      nodeColor = '#a78bfa'; // light purple - discovering
                      ringColor = '#a78bfa';
                    } else if (isInQueue) {
                      nodeColor = '#6366f1'; // indigo - in queue
                    } else if (isVisited) {
                      nodeColor = '#10b981'; // green - visited
                    }

                    return (
                      <motion.g
                        key={`node-${node.id}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {/* Outer ring */}
                        {(isCurrent || isDiscovering || (node.id === selectedPathNode && selectedPathNode)) && (
                          <motion.circle
                            cx={pos.x}
                            cy={pos.y}
                            r={38}
                            fill="none"
                            stroke={ringColor}
                            strokeWidth={2}
                            animate={{
                              r: [38, 42, 38],
                              opacity: [1, 0.5, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        )}

                        {/* Node circle */}
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r={30}
                          fill={nodeColor}
                          animate={{ fill: nodeColor }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Node label */}
                        <text
                          x={pos.x}
                          y={pos.y + 8}
                          textAnchor="middle"
                          fill="white"
                          fontSize="18"
                          fontWeight="bold"
                          className="pointer-events-none select-none"
                        >
                          {node.id}
                        </text>
                      </motion.g>
                    );
                  })}
                </AnimatePresence>
              </svg>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span className="text-slate-400">Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <span className="text-slate-400">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-indigo-500" />
                  <span className="text-slate-400">In Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-slate-400">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-500" />
                  <span className="text-slate-400">Path</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== Information Panel (right) ========== */}
          <div className="space-y-4">
            {/* Step Information */}
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Step Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Type:</span>
                  <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 capitalize">
                    {currentStepData?.type || 'idle'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Description:</span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {stepDescription}
                  </p>
                </div>
                {currentStepData?.current && (
                  <div>
                    <span className="text-slate-500">Current Node:</span>
                    <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
                      {currentStepData.current}
                    </div>
                  </div>
                )}
                {currentStepData?.discovered && (
                  <div>
                    <span className="text-slate-500">Discovered:</span>
                    <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
                      {currentStepData.discovered}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Queue Display */}
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Queue (FIFO)</h3>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {queue.length > 0 ? (
                  queue.map((nodeId, idx) => (
                    <div
                      key={nodeId}
                      className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                        idx === 0
                          ? 'bg-purple-900/50 text-purple-300 ring-1 ring-purple-500'
                          : 'bg-indigo-900/30 text-indigo-300'
                      }`}
                    >
                      {nodeId}
                      {idx === 0 && <span className="text-xs ml-1">← front</span>}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">Queue is empty</p>
                )}
              </div>
            </div>

            {/* Visit Order */}
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Visited Nodes ({visited.length})
              </h3>
              <p className="text-xs text-slate-500 mb-2">Click a node to highlight path from source</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {visited.length > 0 ? (
                  visited.map(nodeId => {
                    const isSelectedPath = nodeId === selectedPathNode;
                    return (
                      <div
                        key={nodeId}
                        onClick={() => {
                          setSelectedPathNode(isSelectedPath ? null : nodeId);
                        }}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all cursor-pointer ${
                          isSelectedPath
                            ? 'bg-cyan-900/50 text-cyan-300 ring-2 ring-cyan-500'
                            : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                        }`}
                      >
                        {nodeId}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 text-sm">No nodes visited yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== Controls ========== */}
      {hasRun && (
        <div className="space-y-4 border-t border-slate-700 pt-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Progress</span>
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-purple-500 h-full transition-all"
                animate={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {isPlaying ? (
              <button
                onClick={() => setIsPlaying(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Pause size={16} /> Pause
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                disabled={currentStep >= steps.length - 1}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Play size={16} /> Play
              </button>
            )}

            <button
              onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
              disabled={currentStep >= steps.length - 1 || isPlaying}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <StepForward size={16} /> Step
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {/* Speed Slider */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 w-16">Speed:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-xs text-slate-500 w-12 text-right">
              {Math.round((speed / 100) * 100)}%
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
