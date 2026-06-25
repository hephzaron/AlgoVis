// components/Visualizers/BSTVisualizer/BSTNodeRenderer.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { BSTNode } from './types';
import { getNodeColor, CANVAS_CONFIG } from './constants';

interface BSTNodeRendererProps {
  node: BSTNode | null;
  highlightedNode: number | null;
  searchResult: string | null;
}

export const BSTNodeRenderer: React.FC<BSTNodeRendererProps> = ({
  node,
  highlightedNode,
  searchResult
}) => {
  if (!node) return null;
  
  const nodeColor = getNodeColor(node.value, highlightedNode, searchResult);
  const nodeRadius = CANVAS_CONFIG.nodeRadius;
  
  return (
    <g key={node.value}>
      {/* Lines to children */}
      {node.left && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="#94a3b8"
          strokeWidth="2"
        />
      )}
      {node.right && (
        <line
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="#94a3b8"
          strokeWidth="2"
        />
      )}
      
      {/* Node circle */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={nodeRadius}
        fill={nodeColor}
        stroke="#fff"
        strokeWidth="3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      
      {/* Node value */}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff"
        fontWeight="bold"
        fontSize="14"
      >
        {node.value}
      </text>
      
      {/* Render children recursively */}
      <BSTNodeRenderer 
        node={node.left} 
        highlightedNode={highlightedNode}
        searchResult={searchResult}
      />
      <BSTNodeRenderer 
        node={node.right} 
        highlightedNode={highlightedNode}
        searchResult={searchResult}
      />
    </g>
  );
};