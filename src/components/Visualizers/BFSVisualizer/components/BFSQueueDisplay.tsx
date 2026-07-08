/**
 * @fileoverview Queue visualization component for BFS
 * Displays the FIFO queue with visual indicators
 */

import { BFSQueueDisplayProps } from '../types';

/**
 * BFSQueueDisplay Component
 * 
 * Visualizes the BFS queue with:
 * - Queue items displayed in order
 * - Front indicator for the first item
 * - Visual distinction for front vs. rest
 * - Empty state message
 * 
 * The queue follows FIFO (First-In-First-Out) order
 * 
 * @param {BFSQueueDisplayProps} props - Component props
 * @param {string[]} props.queue - Current queue contents
 * @returns {JSX.Element} Rendered queue display
 * 
 * @example
 * <BFSQueueDisplay queue={['A', 'B', 'C']} />
 */
export function BFSQueueDisplay({ queue }: BFSQueueDisplayProps) {
  return (
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
  );
}