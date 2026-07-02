import React from 'react';

const legendItems = [
  { color: 'bg-blue-500', label: 'Source' },
  { color: 'bg-yellow-500', label: 'Current' },
  { color: 'bg-green-500', label: 'Visited' },
  { color: 'bg-cyan-500', label: 'Path' },
  { color: 'bg-slate-500', label: 'Unvisited' },
];

export function Legend() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
      {legendItems.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${color}`} />
          <span className="text-slate-400">{label}</span>
        </div>
      ))}
    </div>
  );
}