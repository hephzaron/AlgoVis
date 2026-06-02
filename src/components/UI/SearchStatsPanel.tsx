import React from 'react';
import { BarChart3, Clock, List, Search as SearchIcon, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SearchStatsPanelProps {
  algorithm: string;
  comparisons: number;
  timeMs: number;
  arraySize: number;
  step: number;
  totalSteps: number;
  target: number;
  result: string;
}

export default function SearchStatsPanel({
  algorithm,
  comparisons,
  timeMs,
  arraySize,
  step,
  totalSteps,
  target,
  result
}: SearchStatsPanelProps) {
  const getComplexity = () => {
    switch (algorithm) {
      case 'linear':
        return { time: 'O(n)', space: 'O(1)' };
      case 'binary':
        return { time: 'O(log n)', space: 'O(1)' };
      default:
        return { time: 'O(n)', space: 'O(1)' };
    }
  };

  const complexity = getComplexity();
  const resultIcon = result.includes('Found') ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-amber-500" />;

  return (
    <div className="card space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <BarChart3 size={20} /> Search Stats
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 flex items-center gap-2">
            <SearchIcon size={16} /> Algorithm:
          </span>
          <span className="font-semibold capitalize">{algorithm} Search</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-600 flex items-center gap-2">
            <Clock size={16} /> Time Complexity:
          </span>
          <span className="font-mono text-sm">{complexity.time}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-600 flex items-center gap-2">
            <List size={16} /> Space Complexity:
          </span>
          <span className="font-mono text-sm">{complexity.space}</span>
        </div>

        <div className="border-t pt-3 mt-2 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Comparisons:</span>
            <span className="font-bold text-blue-600">{comparisons}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">Target:</span>
            <span className="font-semibold">{target}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">Result:</span>
            <span className="font-semibold flex items-center gap-2">{resultIcon}{result}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">Array Size:</span>
            <span className="font-semibold">{arraySize}</span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Progress:</span>
            <span className="font-semibold">{step} / {totalSteps} steps</span>
          </div>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full transition-all"
              style={{ width: `${(totalSteps > 0 ? (step / totalSteps) * 100 : 0)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
