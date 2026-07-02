import { useEffect, useState } from 'react';

interface UseAnimationProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}

export function useAnimation({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onStepChange,
  onComplete,
}: UseAnimationProps) {
  const [isPlayingState, setIsPlayingState] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPlaying && currentStep < totalSteps - 1) {
      const delayMs = 500 - (speed * 4.5);
      timer = setTimeout(() => {
        onStepChange(currentStep + 1);
      }, delayMs);
    } else if (currentStep >= totalSteps - 1 && totalSteps > 0) {
      setIsPlayingState(false);
      onComplete();
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, totalSteps, speed, onStepChange, onComplete]);

  return { isPlayingState, setIsPlayingState };
}