import { Graph } from '../../GraphVisualizer';

interface DistancesTableProps {
  graph: Graph<string>;
  distances: Map<string, number>;
  visited: Set<string>;
  sourceNode: string;
  selectedPathNode: string | null;
  onNodeSelect: (nodeId: string | null) => void;
}

export function DistancesTable({
  graph,
  distances,
  visited,
  sourceNode,
  selectedPathNode,
  onNodeSelect,
}: DistancesTableProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Distances from {sourceNode}</h3>
      <p className="text-xs text-slate-500 mb-2">Click a node to highlight its shortest path</p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {Array.from(graph.getNodes()).map(node => {
          const dist = distances.get(node.id);
          const isVisitedNode = visited.has(node.id);
          const isSelectedPath = node.id === selectedPathNode;

          return (
            <div
              key={node.id}
              onClick={() => onNodeSelect(isSelectedPath ? null : node.id)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all cursor-pointer ${
                isSelectedPath
                  ? 'bg-cyan-900/50 text-cyan-300 ring-2 ring-cyan-500'
                  : isVisitedNode
                  ? 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{node.id}:</span>
                <span className="font-mono">
                  {dist === Infinity ? '∞' : dist}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}