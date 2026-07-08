/**
 * @fileoverview Playback controls for BFS visualization
 * Provides play/pause, step, reset, and speed controls
 */

import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import { BFSControlsProps } from '../types';

/**
 * BFSControls Component
 * 
 * Provides complete playback controls:
 * - Progress bar showing current step
 * - Play/Pause button with state indication
 * - Step forward button for manual progression
 * - Reset button to restart visualization
 * - Speed slider for animation speed control
 * 
 * The component is disabled appropriately based on playback state
 * 
 * @param {BFSControlsProps} props - Component props
 * @returns {JSX.Element} Rendered controls
 * 
 * @example
 * <BFSControls
 *   isPlaying={isPlaying}
 *   onPlayPause={togglePlay}
 *   onStep={handleStep}
 *   onReset={handleReset}
 *   currentStep={5}
 *   totalSteps={20}
 *   speed={50}
 *   onSpeedChange={setSpeed}
 *   isStepDisabled={false}
 * />
 */
export function BFSControls({
  isPlaying,
  onPlayPause,
  onStep,
  onReset,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  isStepDisabled,
}: BFSControlsProps) {
  return (
    <div className="space-y-4 border-t border-slate-700 pt-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Progress</span>
          <span>Step {currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-purple-500 h-full transition-all"
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onPlayPause}
          className={`px-4 py-2 ${
            isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } disabled:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
          disabled={!isPlaying && currentStep >= totalSteps - 1}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onStep}
          disabled={isStepDisabled}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <StepForward size={16} /> Step
        </button>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 w-16">Speed:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <span className="text-xs text-slate-500 w-12 text-right">
          {Math.round((speed / 100) * 100)}%
        </span>
      </div>
    </div>
  );
}