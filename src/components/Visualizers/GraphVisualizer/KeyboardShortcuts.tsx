// components/GraphVisualizer/KeyboardShortcuts.tsx

import React from 'react';

export const KeyboardShortcuts: React.FC = () => {
  return (
    <div className="mt-4 mb-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200">
      <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
      <ul className="space-y-1">
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on Node ID → Move to Value field</li>
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on Value → Add Node</li>
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on Value → Move back to Node ID</li>
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on From ID → Move to To ID</li>
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on To ID → Add Edge</li>
        <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on To ID → Move back to From ID</li>
      </ul>
    </div>
  );
};