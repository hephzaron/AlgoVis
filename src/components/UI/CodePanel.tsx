/**
 * Props for a collapsible code display panel.
 */
import { useState } from 'react';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';

interface CodePanelProps {
  title: string;
  code: string;
  activeLines?: number[];
  codeContext?: string;
}

/**
 * Shows an expand/collapse panel containing source code text.
 */
export default function CodePanel({ title, code, activeLines = [], codeContext }: CodePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const codeLines = code.split('\n');
  
  const contextLabel = codeContext ? (
    codeContext === 'loop' ? 'Loop active' :
    codeContext === 'compare' ? 'Comparing' :
    codeContext === 'swap' ? 'Swapping' :
    codeContext === 'partition' ? 'Partition step' :
    codeContext === 'search' ? 'Search control' :
    'Current step'
  ) : undefined;
  
  return (
    <div className="card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Code2 size={20} /> {title} Code
        </h3>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isExpanded && (
        <div className="mt-4">
          {contextLabel && (
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              {contextLabel}
            </div>
          )}
          <pre className="bg-slate-900 rounded-xl overflow-x-auto">
            <code className="text-sm font-mono block p-4">
              {codeLines.map((line, index) => {
                const lineNumber = index + 1;
                const isActive = activeLines.includes(lineNumber);
                return (
                  <div
                    key={lineNumber}
                    className={`flex gap-3 ${isActive ? 'bg-slate-700 text-white rounded px-2' : 'text-slate-300'}`}
                  >
                    <span className="w-8 text-right text-slate-500 select-none">
                      {lineNumber}
                    </span>
                    <span className="whitespace-pre">{line || ' '}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}