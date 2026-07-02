import { DijkstraStep } from '../../../../algorithms/graph/Dijkstra/types';

interface InfoPanelProps {
  stepData: DijkstraStep | undefined;
  stepDescription: string;
}

export function InfoPanel({ stepData, stepDescription }: InfoPanelProps) {
  return (
    <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Step Information</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-slate-500">Type:</span>
          <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 capitalize">
            {stepData?.type || 'idle'}
          </div>
        </div>
        <div>
          <span className="text-slate-500 block mb-1">Description:</span>
          <p className="text-slate-300 text-xs leading-relaxed">
            {stepDescription}
          </p>
        </div>
        {stepData?.current && (
          <div>
            <span className="text-slate-500">Current Node:</span>
            <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
              {stepData.current}
            </div>
          </div>
        )}
        {stepData?.neighbor && (
          <div>
            <span className="text-slate-500">Neighbor:</span>
            <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
              {stepData.neighbor}
            </div>
          </div>
        )}
        {stepData?.oldDistance !== undefined && (
          <div>
            <span className="text-slate-500">Distance Change:</span>
            <div className="mt-1 space-y-1 text-xs">
              <div className="text-red-400">
                Old: {stepData.oldDistance === Infinity ? '∞' : stepData.oldDistance}
              </div>
              <div className="text-green-400">
                New: {stepData.newDistance === Infinity ? '∞' : stepData.newDistance}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}