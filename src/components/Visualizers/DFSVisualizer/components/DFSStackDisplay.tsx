/**
 * @fileoverview Stack visualization component for DFS
 * Displays the LIFO stack with visual indicators
 */

import { DFSStackDisplayProps } from '../types';

/**
 * DFSStackDisplay Component
 * 
 * Visualizes the DFS stack with:
 * - Stack items displayed in order
 * - Front indicator for the first item
 * - Visual distinction for front vs. rest
 * - Empty state message
 * 
 * The stack follows LIFO (Last-In-Last-Out) order
 * 
 * @param {DFSStackDisplayProps} props - Component props
 * @param {string[]} props.stack - Current stack contents
 * @returns {JSX.Element} Rendered stack display
 * 
 * @example
 * <DFSStackDisplay stack={['A', 'B', 'C']} />
 */
export function DFSStackDisplay({ stack }: DFSStackDisplayProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Stack (LIFO)</h3>
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {stack.length > 0 ? (
          stack.map((nodeId, idx) => (
            <div
              key={nodeId}
              className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                idx === 0
                  ? 'bg-purple-900/50 text-purple-300 ring-1 ring-purple-500'
                  : 'bg-indigo-900/30 text-indigo-300'
              }`}>
              {nodeId}
              {idx === stack.length - 1 && <span className="text-xs ml-1">← front</span>}
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">Stack is empty</p>
        )}
      </div>
    </div>
  );
}