import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BinarySearchTree } from './BSTVisualizer/BST';
import { BSTNode } from './BSTVisualizer/types';
import { BFSForBST } from '../../algorithms/tree/BFSForBST';
import { BSTBFSResult } from '../../algorithms/tree/BFSForBSTTypes';

/**
 * Interactive visualizer for Breadth-First Search (Level-Order Traversal) on Binary Search Tree
 * 
 * This component demonstrates how BFS explores a BST level-by-level from root to leaves.
 * Features include:
 * - Step-by-step animation showing BFS traversal
 * - Real-time queue and visited nodes tracking
 * - Level-by-level node organization
 * - Node highlighting for different states
 * - Speed control for animation playback
 * - Play, Pause, Step, and Reset controls
 * 
 * Node colors represent their state:
 * - Blue: Root node (starting point)
 * - Yellow: Currently processing node
 * - Light Purple: Discovering/enqueueing
 * - Indigo: In queue (waiting to be processed)
 * - Green: Already visited
 * - Cyan: Part of selected path
 */
export default function BSTBFSVisualizer() {
  // ===== Tree and Algorithm State =====
  const [bst] = useState(() => {
    const tree = new BinarySearchTree();
    // Initialize with sample values to demonstrate BFS
    [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65].forEach(val => {
      tree.insert(val);
    });
    return tree;
  });

  const [root] = useState<BSTNode | null>(bst.getTree());

  // ===== BFS State =====
  const [bfsResult, setBfsResult] = useState<BSTBFSResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);

  // ===== UI State =====
  const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [queueDisplay, setQueueDisplay] = useState<number[]>([]);
  const [visitedDisplay, setVisitedDisplay] = useState<Set<number>>(new Set());
  const [selectedPathNode, setSelectedPathNode] = useState<number | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<Set<number>>(new Set());

  // ===== Refs =====
  const playbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ===== Initialization =====
  useEffect(() => {
    // Initialize BFS algorithm on component mount
    if (root) {
      const bfs = new BFSForBST(root);
      const result = bfs.run();
      setBfsResult(result);
      setCurrentStep(0);
      updateStepDisplay(0, result);
    }
  }, [root]);

  // ===== Animation Playback =====
  useEffect(() => {
    if (!bfsResult) return;

    if (isPlaying) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < bfsResult.steps.length - 1) {
            const nextStep = prev + 1;
            updateStepDisplay(nextStep, bfsResult);
            return nextStep;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, Math.max(100, 500 - speed * 4));
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, speed, bfsResult]);

  // ===== Step Display Update =====
  const updateStepDisplay = useCallback(
    (stepIndex: number, result: BSTBFSResult) => {
      if (stepIndex < 0 || stepIndex >= result.steps.length) return;

      const step = result.steps[stepIndex];

      // Update display based on step type
      switch (step.type) {
        case 'start':
          setCurrentNode(step.current ?? null);
          setQueueDisplay(step.current ? [step.current] : []);
          setVisitedDisplay(new Set(step.current ? [step.current] : []));
          break;

        case 'visit':
          setCurrentNode(step.current ?? null);
          setQueueDisplay(step.queue);
          setVisitedDisplay(new Set(step.visited));
          break;

        case 'discover':
          setQueueDisplay(step.queue);
          setVisitedDisplay(new Set(step.visited));
          if (step.discovered) {
            setHighlightedNodes(new Set([step.discovered]));
            setTimeout(() => setHighlightedNodes(new Set()), 300);
          }
          break;

        case 'complete':
          setCurrentNode(null);
          setQueueDisplay([]);
          break;
      }
    },
    []
  );

  // ===== Path Reconstruction =====
  const reconstructPath = useCallback(
    (targetValue: number) => {
      if (!bfsResult) return;

      if (selectedPathNode === targetValue) {
        // Deselect if clicking same node
        setSelectedPathNode(null);
        setHighlightedPath(new Set());
        return;
      }

      const path: Set<number> = new Set();
      let current: number | null = targetValue;

      while (current !== null) {
        path.add(current);
        const parent = bfsResult.parent.get(current);
        current = parent ?? null;
      }

      setSelectedPathNode(targetValue);
      setHighlightedPath(path);
    },
    [bfsResult, selectedPathNode]
  );

  // ===== Control Handlers =====
  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else if (currentStep < (bfsResult?.steps.length || 0) - 1) {
      setIsPlaying(true);
    }
  }, [isPlaying, currentStep, bfsResult]);

  const handleStep = useCallback(() => {
    if (!bfsResult) return;
    if (currentStep < bfsResult.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateStepDisplay(nextStep, bfsResult);
    }
  }, [currentStep, bfsResult, updateStepDisplay]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (bfsResult) {
      updateStepDisplay(0, bfsResult);
    }
  }, [bfsResult, updateStepDisplay]);

  // ===== Render Functions =====

  /**
   * Recursively renders tree nodes in SVG
   */
  const renderNode = (node: BSTNode | null, x: number, y: number, offsetX: number): JSX.Element | null => {
    if (!node) return null;

    const childOffsetX = offsetX / 2;
    const childY = y + 100;

    // Determine node fill color based on state
    let fill = '#e5e7eb'; // Default gray
    if (selectedPathNode === node.value) {
      fill = '#34d399'; // Green for selected path
    } else if (highlightedPath.has(node.value)) {
      fill = '#06b6d4'; // Cyan for path
    } else if (currentNode === node.value) {
      fill = '#fbbf24'; // Yellow for current
    } else if (highlightedNodes.has(node.value)) {
      fill = '#c4b5fd'; // Light purple for discovering
    } else if (queueDisplay.includes(node.value)) {
      fill = '#818cf8'; // Indigo for in queue
    } else if (visitedDisplay.has(node.value)) {
      fill = '#10b981'; // Green for visited
    } else if (node.value === root?.value) {
      fill = '#3b82f6'; // Blue for root
    }

    return (
      <g key={node.value}>
        {/* Edges to children */}
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={x - childOffsetX}
            y2={childY}
            stroke="#9ca3af"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={x + childOffsetX}
            y2={childY}
            stroke="#9ca3af"
            strokeWidth="2"
          />
        )}

        {/* Render children first (so they appear behind parent) */}
        {renderNode(node.left, x - childOffsetX, childY, childOffsetX)}
        {renderNode(node.right, x + childOffsetX, childY, childOffsetX)}

        {/* Node circle */}
        <motion.circle
          cx={x}
          cy={y}
          r="25"
          fill={fill}
          stroke={
            selectedPathNode === node.value ? '#059669' : '#4b5563'
          }
          strokeWidth="2"
          animate={{
            r: highlightedNodes.has(node.value) ? 32 : 25,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Node value text */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dy="0.3em"
          className="font-bold"
          fill={fill === '#e5e7eb' ? '#1f2937' : 'white'}
          fontSize="14"
          pointerEvents="none"
        >
          {node.value}
        </text>
      </g>
    );
  };

  if (!root || !bfsResult) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Initializing BFS on BST...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex gap-4 p-4 bg-slate-50">
      {/* Main Visualization Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex-1 bg-white border border-slate-300 rounded-lg overflow-hidden shadow-sm"
        >
          <svg
            viewBox="150 0 700 600"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          >
            <rect x="150" y="0" width="700" height="600" fill="#f8fafc" />
            {renderNode(root, 500, 30, 180)}
          </svg>
        </div>

        {/* Controls */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={handleStep}
                className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition"
              >
                Step
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition"
              >
                Reset
              </button>
            </div>

            {/* Step Counter */}
            <div className="text-slate-700 font-semibold">
              Step {currentStep + 1} / {bfsResult.steps.length}
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Speed:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </div>

        {/* Info Panels */}
        <div className="grid grid-cols-3 gap-4">
          {/* Queue Display */}
          <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-slate-700 mb-2">Queue</h3>
            <div className="flex flex-wrap gap-2">
              {queueDisplay.length === 0 ? (
                <span className="text-slate-400 text-sm">Empty</span>
              ) : (
                queueDisplay.map((val, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded text-sm font-mono ${
                      idx === 0
                        ? 'bg-yellow-200 text-yellow-800 border-2 border-yellow-400'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Visited Nodes */}
          <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-slate-700 mb-2">Visited</h3>
            <div className="flex flex-wrap gap-2">
              {visitedDisplay.size === 0 ? (
                <span className="text-slate-400 text-sm">None</span>
              ) : (
                Array.from(visitedDisplay)
                  .sort((a, b) => a - b)
                  .map((val) => (
                    <div
                      key={val}
                      className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm font-mono"
                    >
                      {val}
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Level Info */}
          <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-slate-700 mb-2">Levels</h3>
            <div className="text-sm text-slate-600">
              {(bfsResult.levels || []).map((level, idx) => (
                <div key={idx} className="font-mono">
                  Level {idx}: [{level.join(', ')}]
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-96 flex flex-col gap-4">
        {/* Step Information */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-3">Step Information</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div>
              <span className="font-medium">Type:</span>{' '}
              {currentStep < bfsResult.steps.length
                ? bfsResult.steps[currentStep].type
                : 'complete'}
            </div>
            {currentStep < bfsResult.steps.length && bfsResult.steps[currentStep].current && (
              <div>
                <span className="font-medium">Current:</span>{' '}
                {bfsResult.steps[currentStep].current}
              </div>
            )}
            {currentStep < bfsResult.steps.length && bfsResult.steps[currentStep].discovered && (
              <div>
                <span className="font-medium">Discovered:</span>{' '}
                {bfsResult.steps[currentStep].discovered}
              </div>
            )}
          </div>
        </div>

        {/* Visit Order */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-sm flex-1 overflow-auto">
          <h3 className="font-semibold text-slate-700 mb-3">Visit Order</h3>
          <div className="space-y-2">
            {bfsResult.visitOrder.map((val, idx) => (
              <button
                key={idx}
                onClick={() => reconstructPath(val)}
                className={`w-full text-left px-3 py-2 rounded font-mono text-sm transition ${
                  selectedPathNode === val
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {idx + 1}. Node {val}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-slate-700 mb-3">Node Colors</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Root</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
              <span>Discovering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
              <span>In Queue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
              <span>Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
