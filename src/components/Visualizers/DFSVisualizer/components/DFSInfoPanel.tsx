/**
 * @fileoverview Information panel showing current step details
 * Displays step type, description, and relevant data
 */

import { DFSInfoPanelProps } from '../types';

/** Mapping of step types to user-friendly descriptions */
const STEP_DESCRIPTIONS: Record<string, string> = {
  start: 'Starting DFS from source node',
  visit: 'Processing node from the stack',
  discover: 'Discovering unvisited neighbor and adding to stack',
  complete: 'DFS complete - all reachable nodes explored',
};

/**
 * DFSInfoPanel Component
 * 
 * Displays detailed information about the current DFS step:
 * - Step type (start, visit, discover, complete)
 * - Human-readable description
 * - Current node being processed
 * - Node being discovered (if applicable)
 * 
 * @param {DFSInfoPanelProps} props - Component props
 * @param {DFSStep} [props.stepData] - Current step data
 * @returns {JSX.Element} Rendered info panel
 * 
 * @example
 * <DFSInfoPanel stepData={currentStepData} />
 */
export function DFSInfoPanel({ stepData }: DFSInfoPanelProps) {
  const description = stepData?.type 
    ? STEP_DESCRIPTIONS[stepData.type] || 'Processing...'
    : 'Waiting to start';

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
          <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
        </div>
        
        {stepData?.current && (
          <div>
            <span className="text-slate-500">Current Node:</span>
            <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
              {stepData.current}
            </div>
          </div>
        )}
        
        {stepData?.discovered && (
          <div>
            <span className="text-slate-500">Discovered:</span>
            <div className="mt-1 px-2 py-1 bg-slate-800 rounded text-slate-200 font-semibold">
              {stepData.discovered}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}