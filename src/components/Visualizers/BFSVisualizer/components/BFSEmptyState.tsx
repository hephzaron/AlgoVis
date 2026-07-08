/**
 * @fileoverview Empty state placeholder for BFS Visualizer
 * Shown when the algorithm hasn't been run yet
 */

import { BFSEmptyStateProps } from '../types';

/**
 * BFSEmptyState Component
 * 
 * Displays a placeholder with:
 * - Instructional message
 * - Call-to-action button to start the algorithm
 * - Dashed border styling for visual distinction
 * 
 * This component is shown before the algorithm is first run
 * 
 * @param {BFSEmptyStateProps} props - Component props
 * @param {Function} props.onRun - Callback to run the algorithm
 * @returns {JSX.Element} Rendered empty state
 * 
 * @example
 * <BFSEmptyState onRun={handleRun} />
 */
export function BFSEmptyState({ onRun }: BFSEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-12 text-center">
      <p className="text-slate-400 mb-4">
        Select a source node and click "Run BFS" to begin visualization
      </p>
      <button
        onClick={onRun}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
      >
        Start BFS Algorithm
      </button>
    </div>
  );
}