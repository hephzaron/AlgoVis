import { HeaderProps } from "../../types";

export function Header({
  sourceNode, 
  onSourceChange, 
  onRun, 
  isPlaying, 
  nodes,
  hasRun 
}:HeaderProps){
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Breadth-First Search (BFS)</h2>
          <p className="text-sm text-slate-400 mt-1">
            Explore graph level-by-level from source to all reachable nodes
          </p>
        </div>
        {/* Source Node Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-300">Start from:</label>
          <select
            value={sourceNode}
            onChange={(e) => {
              onSourceChange(e.target.value);
            }}
            disabled={isPlaying}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm disabled:opacity-50"
          >
            {nodes.map(node => (
              <option key={node.id} value={node.id}>
                Node {node.id}
              </option>
            ))}
          </select>

          <button
            onClick={onRun}
            disabled={isPlaying}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
            {hasRun ? 'Re-run' : 'Run BFS'}
          </button>
        </div>
      </div>
      )
}