
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface GraphLayoutSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

/**
 * A standalone slider control for adjusting graph layout spread.
 * Slide right to expand, left to shrink.
 */
export const GraphLayoutSlider: React.FC<GraphLayoutSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Map slider value to visual percentage (0-100%)
  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center gap-1">
        <Minimize2 size={16} className="text-slate-400" />
        <span className="text-xs text-slate-500 font-medium">Shrink</span>
      </div>
      
      <div className="relative flex-1 min-w-[150px]">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer 
            disabled:opacity-50 disabled:cursor-not-allowed
            accent-blue-500 hover:accent-blue-600
            transition-all duration-200"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
          }}
        />
        {/* Custom thumb styling via CSS */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            background: #2563eb;
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
            background: #2563eb;
          }
        `}</style>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs text-slate-500 font-medium">Expand</span>
        <Maximize2 size={16} className="text-slate-400" />
      </div>

      {/* Show current value */}
      <div className="hidden sm:block min-w-[40px] text-center">
        <span className="text-xs font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
          {Math.round((localValue / max) * 100)}%
        </span>
      </div>
    </div>
  );
};