import { useState } from 'react';
import type { VisualizerState } from '../types';

export default function useVisualizer(initialData: number[]) {
  const [state, setState] = useState<VisualizerState>({
    data: initialData,
    activeIndices: [],
    completed: false,
  });

  const reset = (data: number[]) => {
    setState({ data, activeIndices: [], completed: false });
  };

  return {
    state,
    setState,
    reset,
  };
}
