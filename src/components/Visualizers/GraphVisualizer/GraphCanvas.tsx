import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import { Edge, NumberNode } from './types';
import { getNodeColorClass } from './constants';

interface GraphCanvasProps {
  nodes: NumberNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  graph: any; // Graph instance
  onNodeClick: (nodeId: string) => void;
  onEdgeClick: (edge: Edge) => void;
  canvasSize: { width: number; height: number };
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  graph,
  onNodeClick,
  onEdgeClick,
  canvasSize
}) => {
  return (
    <div 
      className="mb-6 p-6 bg-slate-100 rounded-xl min-h-[550px] relative overflow-hidden"
      style={{ height: canvasSize.height + 40 }}
    >
      <svg 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Draw edges */}
        <AnimatePresence>
          {edges.map((edge) => {
            const fromNode = graph.getNode(edge.from);
            const toNode = graph.getNode(edge.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                x1={fromNode.position.x}
                y1={fromNode.position.y}
                x2={toNode.position.x}
                y2={toNode.position.y}
                stroke="#94a3b8"
                strokeWidth="2"
                className="transition-all duration-300 hover:stroke-blue-500 hover:stroke-4 cursor-pointer"
                onClick={() => onEdgeClick(edge)}
              />
            );
          })}
        </AnimatePresence>

        {/* Draw nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: node.position.x - 30,
                y: node.position.y - 30
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => onNodeClick(node.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx="30"
                cy="30"
                r="25"
                className={`${getNodeColorClass(node.id, selectedNodeId, node.getDegree())} text-white shadow-lg transition-all duration-300`}
              />
              <text
                x="30"
                y="35"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                className="select-none"
              >
                {node.id}
              </text>
              <text
                x="30"
                y="55"
                textAnchor="middle"
                fill="white"
                fontSize="10"
                opacity="0.8"
                className="select-none"
              >
                {node.value}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <GitBranch size={48} className="mx-auto mb-2 opacity-50" />
            <p>Graph is empty. Add nodes and edges to see them here.</p>
          </div>
        </div>
      )}
    </div>
  );
};