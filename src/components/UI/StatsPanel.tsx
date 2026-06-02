/**
 * Props for the sorting visualization statistics panel.
 */
import React from 'react';
import { BarChart3, GitCompare, Shuffle, Clock, List, Layers } from 'lucide-react';

interface StatsPanelProps {
  algorithm: string;
  comparisons: number;
  swaps: number;
  timeMs: number;
  arraySize: number;
  step: number;
  totalSteps: number;
}

/**
 * Displays complexity and step metrics for sorting visualizations.
 */
export default function StatsPanel({
  algorithm,
  comparisons,
  swaps,
  timeMs,
  arraySize,
  step,
  totalSteps
}: StatsPanelProps) {
  const getComplexity = () => {
    switch (algorithm) {
      case 'merge':
      case 'heap':
        return { time: 'O(n log n)', space: 'O(n)' };
      case 'quick':
        return { time: 'O(n log n) avg / O(n²) worst', space: 'O(log n)' };
      case 'insertion':
      case 'bubble':
      case 'selection':
        return { time: 'O(n²)', space: 'O(1)' };
      default:
        return { time: 'O(n log n)', space: 'O(n)' };
    }
  };
  
  const complexity = getComplexity();
  
  return (
    <div className="card space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <BarChart3 size={20} /> Algorithm Stats
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 flex items-center gap-2">
            <Layers size={16} /> Algorithm:
          </span>
          <span className="font-semibold capitalize">{algorithm} Sort</span>
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
        
        <div className="border-t pt-3 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600 flex items-center gap-2">
              <GitCompare size={16} /> Comparisons:
            </span>
            <span className="font-bold text-blue-600">{comparisons}</span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-600 flex items-center gap-2">
              <Shuffle size={16} /> Swaps:
            </span>
            <span className="font-bold text-blue-600">{swaps}</span>
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
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}