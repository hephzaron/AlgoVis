interface VisitedNodesProps {
  visited: Set<string>;
}

export function VisitedNodes({ visited }: VisitedNodesProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Processed Nodes ({visited.size})
      </h3>
      <div className="flex flex-wrap gap-2">
        {visited.size > 0 ? (
          Array.from(visited).map(nodeId => (
            <div
              key={nodeId}
              className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-sm font-semibold"
            >
              {nodeId}
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">No nodes processed yet</p>
        )}
      </div>
    </div>
  );
}