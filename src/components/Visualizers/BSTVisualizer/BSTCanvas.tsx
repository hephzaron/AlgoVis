// components/Visualizers/BSTVisualizer/BSTCanvas.tsx

import React, { useRef, useEffect } from 'react';
import { BSTNode } from './types';
import { BSTNodeRenderer } from './BSTNodeRenderer';
import { CANVAS_CONFIG } from './constants';

interface BSTCanvasProps {
  tree: BSTNode | null;
  highlightedNode: number | null;
  searchResult: string | null;
  viewBox?: string;  // Optional viewBox override
  onScrollToRoot?: () => void;
}

export const BSTCanvas: React.FC<BSTCanvasProps> = ({
  tree,
  highlightedNode,
  searchResult,
  viewBox,
  onScrollToRoot
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to show the root node
  useEffect(() => {
    if (containerRef.current && tree && onScrollToRoot) {
      onScrollToRoot();
    }
  }, [tree, onScrollToRoot]);

  return (
    <div 
      ref={containerRef}
      className="h-[500px] bg-slate-50 rounded-xl overflow-auto relative border border-slate-200"
      style={{ 
        scrollBehavior: 'smooth',
        overscrollBehavior: 'contain'
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={viewBox || `0 0 ${CANVAS_CONFIG.width} ${CANVAS_CONFIG.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          minWidth: '200px',
          minHeight: '100px'
        }}
      >
        {tree && (
          <BSTNodeRenderer 
            node={tree} 
            highlightedNode={highlightedNode}
            searchResult={searchResult}
          />
        )}
      </svg>
      
      {!tree && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          Tree is empty. Insert values to begin.
        </div>
      )}

      {/* Tree stats */}
      {tree && (
        <div className="absolute top-2 right-2 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded border border-slate-200">
          {tree ? `${getTreeStats(tree)}` : 'Empty'}
        </div>
      )}
    </div>
  );
};

// Helper function to get tree stats (minimal)
function getTreeStats(node: BSTNode | null): string {
  if (!node) return 'Empty';
  let count = 0;
  let height = 0;
  
  const traverse = (n: BSTNode | null, depth: number) => {
    if (!n) return;
    count++;
    height = Math.max(height, depth);
    traverse(n.left, depth + 1);
    traverse(n.right, depth + 1);
  };
  traverse(node, 0);
  
  return `Nodes: ${count} • Height: ${height + 1}`;
}