interface EmptyStateProps {
  onRun: () => void;
}

export function EmptyState({ onRun }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-12 text-center">
      <p className="text-slate-400 mb-4">
        Select a source node and click "Run Algorithm" to begin visualization
      </p>
      <button
        onClick={onRun}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        Start Dijkstra's Algorithm
      </button>
    </div>
  );
}