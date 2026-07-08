/**
 * @fileoverview List of visited nodes with path highlighting
 * Allows users to click on nodes to view paths from source
 */

import { BFSVisitedListProps } from '../types';

/**
 * BFSVisitedList Component
 * 
 * Displays all visited nodes in order with:
 * - Interactive nodes that can be clicked
 * - Path highlighting when a node is selected
 * - Visual feedback for selected node
 * - Count of visited nodes
 * 
 * Clicking a node toggles path highlighting from source to that node
 * 
 * @param {BFSVisitedListProps} props - Component props
 * @param {string[]} props.visited - List of visited node IDs in order
 * @param {string | null} props.selectedPathNode - Currently selected node
 * @param {Function} props.onNodeSelect - Callback when node is selected/deselected
 * @returns {JSX.Element} Rendered visited list
 * 
 * @example
 * <BFSVisitedList
 *   visited={['A', 'B', 'C']}
 *   selectedPathNode="C"
 *   onNodeSelect={togglePath}
 * />
 */
export function BFSVisitedList({
  visited,
  selectedPathNode,
  onNodeSelect,
}: BFSVisitedListProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Visited Nodes ({visited.length})
      </h3>
      <p className="text-xs text-slate-500 mb-2">Click a node to highlight path from source</p>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {visited.length > 0 ? (
          visited.map(nodeId => {
            const isSelected = nodeId === selectedPathNode;
            return (
              <div
                key={nodeId}
                onClick={() => onNodeSelect(isSelected ? null : nodeId)}
                className={`px-3 py-2 rounded text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-900/50 text-cyan-300 ring-2 ring-cyan-500'
                    : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                }`}
              >
                {nodeId}
              </div>
            );
          })
        ) : (
          <p className="text-slate-500 text-sm">No nodes visited yet</p>
        )}
      </div>
    </div>
  );
}