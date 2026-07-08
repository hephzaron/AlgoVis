/**
 * @fileoverview Graph visualization component using SVG
 * Renders nodes, edges, and animations for DFS visualization
 */

import { motion, AnimatePresence } from 'framer-motion';
import { DFSGraphCanvasProps } from '../types';

/** Color legend items for the graph */
const LEGEND_ITEMS = [
  { color: 'bg-blue-500', label: 'Source' },
  { color: 'bg-purple-500', label: 'Current' },
  { color: 'bg-indigo-500', label: 'In Stack' },
  { color: 'bg-green-500', label: 'Visited' },
  { color: 'bg-cyan-500', label: 'Path' },
];

/**
 * DFSGraphCanvas Component
 * 
 * Renders an interactive SVG graph visualization with:
 * - Nodes with color coding for different states
 * - Edges with weight display
 * - Smooth animations for state changes
 * - Pulsing rings for active nodes
 * - Legend for color reference
 * 
 * Node states:
 * - Source: Blue
 * - Current: Purple (with pulsing ring)
 * - Discovering: Light Purple (with pulsing ring)
 * - In Stack: Indigo
 * - Visited: Green
 * - Path: Cyan
 * - Unvisited: Gray
 * 
 * @param {DFSGraphCanvasProps} props - Component props
 * @returns {JSX.Element} Rendered SVG canvas
 * 
 * @example
 * <DFSGraphCanvas
 *   graph={graph}
 *   nodePositions={nodePositions}
 *   sourceNode="A"
 *   visited={['A', 'B', 'C']}
 *   stack={['D', 'E']}
 *   currentNode="B"
 *   discoveringNode="E"
 *   pathNodeSet={new Set(['A', 'B', 'E'])}
 *   pathEdgeSet={new Set(['A-B', 'B-E'])}
 *   selectedPathNode="E"
 * />
 */
export function DFSGraphCanvas({
    graph,
    nodePositions,
    sourceNode,
    visited,
    stack,
    currentNode,
    discoveringNode,
    pathNodeSet,
    pathEdgeSet,
    selectedPathNode,
    currentStepType }: DFSGraphCanvasProps) {
        const visitedSet = new Set(visited);
        const stackSet = new Set(stack);
        return (
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Graph Visualization</h3>
            <svg
                width="100%"
                height="450"
                viewBox="0 0 500 400"
                className="bg-slate-100 rounded-lg border border-slate-300">
                {/* Render all edges first so they appear behind nodes */}
                {Array.from(graph.getNodes()).map((node: any) => {
                const fromPos = nodePositions.get(node.id)!;
                return Array.from(node.getNeighbors()).map(([, edge]: any) => {
                    const toPos = nodePositions.get(edge.node.id)!;

                    // Determine if this edge is being discovered
                    const isDiscovering =
                    currentStepType === 'discover' &&
                    ((currentNode === node.id && discoveringNode === edge.node.id) ||
                        (currentNode === edge.node.id && discoveringNode === node.id));

                    // Determine if this edge is part of the highlighted path
                    const isPartOfPath =
                    pathEdgeSet.has(`${node.id}-${edge.node.id}`) ||
                    pathEdgeSet.has(`${edge.node.id}-${node.id}`);

                    let edgeColor = '#94a3b8';
                    let edgeWidth = 2;

                    if (isDiscovering) {
                        edgeColor = '#a78bfa';
                        edgeWidth = 3;
                    } else if (isPartOfPath) {
                        edgeColor = '#06b6d4';
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
                    </g>);
                    });
                })}

                {/* Render all nodes with animation */}
                <AnimatePresence>
                {Array.from(graph.getNodes()).map((node: any) => {
                    const pos = nodePositions.get(node.id)!;
                    const isSource = node.id === sourceNode;
                    const isVisited = visitedSet.has(node.id);
                    const isInStack = stackSet.has(node.id);
                    const isCurrent = node.id === currentNode;
                    const isDiscovering = node.id === discoveringNode;
                    const isPartOfPath = pathNodeSet.has(node.id);

                    let nodeColor = '#64748b';
                    let ringColor = 'none';

                    // Determine node color based on state
                    if (isPartOfPath && selectedPathNode) {
                    nodeColor = '#06b6d4';
                    if (node.id === selectedPathNode) {
                        ringColor = '#06b6d4';
                    }
                } else if (isSource) {
                    nodeColor = '#3b82f6';
                    } else if (isCurrent) {
                    nodeColor = '#8b5cf6';
                    ringColor = '#8b5cf6';
                    } else if (isDiscovering) {
                    nodeColor = '#a78bfa';
                    ringColor = '#a78bfa';
                    } else if (isInStack) {
                    nodeColor = '#6366f1';
                    } else if (isVisited) {
                    nodeColor = '#10b981';
                    }

                    return (
                    <motion.g
                        key={`node-${node.id}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        {/* Pulsing ring for active nodes */}
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

                        {/* Main node circle */}
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

            {/* Color legend */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {LEGEND_ITEMS.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${color}`} />
                    <span className="text-slate-400">{label}</span>
                </div>
                ))}
            </div>
        </div>
    );
}