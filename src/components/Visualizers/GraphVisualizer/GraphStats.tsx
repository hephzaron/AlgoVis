// components/GraphVisualizer/GraphStats.tsx

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { GraphStats as GraphStatsType } from './types';

interface GraphStatsProps {
  stats: GraphStatsType;
}

export const GraphStats: React.FC<GraphStatsProps> = ({ stats }) => {
  return (
    <div className="mt-4 pt-4 border-t border-slate-200">
      <div className="flex flex-wrap justify-between text-sm text-slate-500 gap-2">
        <span>Nodes: <strong>{stats.nodeCount}</strong></span>
        <span>Edges: <strong>{stats.edgeCount}</strong></span>
        <span>Avg. Degree: <strong>{stats.averageDegree.toFixed(1)}</strong></span>
        <span>Max Degree: <strong>{stats.maxDegree}</strong></span>
        <span>Min Degree: <strong>{stats.minDegree}</strong></span>
        <span>Components: <strong>{stats.connectedComponents}</strong></span>
        <span className="flex items-center gap-1">
          Has Cycle: 
          <strong className="flex items-center gap-1">
            {stats.hasCycle ? (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-green-600">Yes</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-red-500" />
                <span className="text-red-600">No</span>
              </>
            )}
          </strong>
        </span>
      </div>
    </div>
  );
};