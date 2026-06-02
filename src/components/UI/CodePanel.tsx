/**
 * Props for a collapsible code display panel.
 */
import React, { useState } from 'react';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';

interface CodePanelProps {
  title: string;
  code: string;
}

/**
 * Shows an expand/collapse panel containing source code text.
 */
export default function CodePanel({ title, code }: CodePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
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
        <pre className="mt-4 p-4 bg-slate-900 rounded-xl overflow-x-auto">
          <code className="text-sm text-green-400 font-mono whitespace-pre-wrap">
            {code}
          </code>
        </pre>
      )}
    </div>
  );
}