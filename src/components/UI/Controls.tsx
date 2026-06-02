/**
 * Controls props used by multiple visualizer playback components.
 */
import React from 'react';
import { Play, Pause, RotateCcw, StepForward, Zap } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  progress: number;
}

/**
 * Playback and progress controls for algorithm visualizers.
 */
export default function Controls({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStep,
  speed,
  onSpeedChange,
  progress
}: ControlsProps) {
  return (
    <div className="mt-6 space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      
      {/* Buttons */}
      <div className="flex justify-center gap-3">
        {isPlaying ? (
          <button onClick={onPause} className="btn-primary flex items-center gap-2">
            <Pause size={18} /> Pause
          </button>
        ) : (
          <button onClick={onPlay} className="btn-primary flex items-center gap-2">
            <Play size={18} /> Play
          </button>
        )}
        <button onClick={onStep} className="btn-secondary flex items-center gap-2">
          <StepForward size={18} /> Step
        </button>
        <button onClick={onReset} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={18} /> Reset
        </button>
      </div>
      
      {/* Speed Slider */}
      <div className="flex items-center gap-4">
        <Zap size={16} className="text-slate-500" />
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-sm text-slate-500 w-12">Fast</span>
      </div>
    </div>
  );
}