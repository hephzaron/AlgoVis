/**
 * @fileoverview Hook for controlling step-by-step animation playback
 * Manages play/pause, speed, and automatic step advancement
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for step-based animation playback
 * 
 * Controls the animation of step-by-step visualizations with:
 * - Play/Pause functionality
 * - Speed control
 * - Automatic step advancement
 * 
 * @param {any[]} steps - Array of all steps in the animation
 * @param {number} currentStep - Current step index from parent
 * @param {Function} onStepChange - Callback to update step in parent
 * @param {number} [initialSpeed=50] - Initial speed setting (0-100)
 * @returns {Object} Playback controls and state
 * @returns {boolean} isPlaying - Whether animation is playing
 * @returns {Function} setIsPlaying - Update playing state
 * @returns {number} speed - Current speed setting
 * @returns {Function} setSpeed - Update speed setting
 * @returns {Function} togglePlay - Toggle play/pause
 * @returns {Function} resetPlayback - Reset to first step and pause
 * 
 * @example
 * const { isPlaying, speed, togglePlay } = useStepPlayback(steps, currentStep, setCurrentStep);
 */
export function useStepPlayback(
  steps: any[],
  currentStep: number,
  onStepChange: (step: number) => void,
  initialSpeed: number = 50
) {
  /** Whether animation is currently playing */
  const [isPlaying, setIsPlaying] = useState(false);
  
  /** Animation speed (0 = slowest, 100 = fastest) */
  const [speed, setSpeed] = useState(initialSpeed);

  /**
   * Auto-advance to next step when playing
   * 
   * Uses setTimeout with calculated delay based on speed
   * Speed range: 0 (500ms) to 100 (50ms) per step
   * Automatically pauses at the end of the step sequence
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && currentStep < steps.length - 1) {
      const delayMs = 500 - (speed * 4.5);
      timer = setTimeout(() => {
        onStepChange(currentStep + 1);
      }, delayMs);
    } else if (currentStep >= steps.length - 1 && steps.length > 0) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed, onStepChange]);

  /**
   * Toggle play/pause state
   * If at the end, restart from beginning
   */
  const togglePlay = useCallback(() => {
    if (currentStep >= steps.length - 1 && !isPlaying) {
      onStepChange(0);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentStep, steps.length, onStepChange]);

  /**
   * Reset playback to first step and pause
   */
  const resetPlayback = useCallback(() => {
    setIsPlaying(false);
    onStepChange(0);
  }, [onStepChange]);

  return {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    togglePlay,
    resetPlayback,
  };
}