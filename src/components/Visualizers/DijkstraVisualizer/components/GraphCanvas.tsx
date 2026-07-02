import { motion, AnimatePresence } from 'framer-motion';
import { Graph } from '../../GraphVisualizer';
import { NodePosition } from '../type';
import { Legend } from './Legend';

interface GraphCanvasProps {
  graph: Graph<string>;
  nodePositions: Map<string, NodePosition>;
  sourceNode: string;
  visited: Set<string>;
  currentNode: string | undefined;
  examiningEdge: { from: string | undefined; to: string } | null;
  pathNodeSet: Set<string>;
  pathEdgeSet: Set<string>;
  selectedPathNode: string | null;
}

export function GraphCanvas({
  graph,
  nodePositions,
  sourceNode,
  visited,
  currentNode,
  examiningEdge,
  pathNodeSet,
  pathEdgeSet,
  selectedPathNode,
}: GraphCanvasProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Graph Visualization</h3>
      
      <svg
        width="100%"
        height="450"
        viewBox="0 0 500 400"
        className="bg-slate-100 rounded-lg border border-slate-300"
      >
        {/* Edges */}
        {Array.from(graph.getNodes()).map(node => {
          const fromPos = nodePositions.get(node.id)!;
          return Array.from(node.getNeighbors()).map(([, edge]) => {
            const toPos = nodePositions.get(edge.node.id)!;
            const isExamining =
              examiningEdge &&
              ((examiningEdge.from === node.id &&
                examiningEdge.to === edge.node.id) ||
                (examiningEdge.from === edge.node.id &&
                  examiningEdge.to === node.id));

            const isPartOfPath =
              pathEdgeSet.has(`${node.id}-${edge.node.id}`) ||
              pathEdgeSet.has(`${edge.node.id}-${node.id}`);

            let edgeColor = '#64748b';
            let edgeWidth = 2;

            if (isExamining) {
              edgeColor = '#fbbf24';
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
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2 - 8}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {edge.weight}
                </text>
              </g>
            );
          });
        })}

        {/* Nodes */}
        <AnimatePresence>
          {Array.from(graph.getNodes()).map(node => {
            const pos = nodePositions.get(node.id)!;
            const isSource = node.id === sourceNode;
            const isVisited = visited.has(node.id);
            const isCurrent = node.id === currentNode;
            const isPartOfPath = pathNodeSet.has(node.id);

            let nodeColor = '#64748b';
            let ringColor = 'none';

            if (isPartOfPath && selectedPathNode) {
              nodeColor = '#06b6d4';
              if (node.id === selectedPathNode) {
                ringColor = '#06b6d4';
              }
            } else if (isSource) {
              nodeColor = '#3b82f6';
            } else if (isCurrent) {
              nodeColor = '#fbbf24';
              ringColor = '#fbbf24';
            } else if (isVisited) {
              nodeColor = '#10b981';
            }

            return (
              <motion.g
                key={`node-${node.id}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {(isCurrent || (node.id === selectedPathNode && selectedPathNode)) && (
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

                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={30}
                  fill={nodeColor}
                  animate={{ fill: nodeColor }}
                  transition={{ duration: 0.3 }}
                />

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

      <div className="mt-4">
        <Legend />
      </div>
    </div>
  );
}