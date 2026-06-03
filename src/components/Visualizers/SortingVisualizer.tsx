import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  mergeSortSteps, 
  quickSortSteps, 
  insertionSortSteps, 
  bubbleSortSteps, 
  selectionSortSteps,
  heapSortSteps 
} from '../../algorithms/sorting';
import { AlgorithmStep, SortingAlgorithm } from '../../types';
import { sortingAlgorithmCode } from '../../data/algorithmCode';
import { generateRandomArray as createRandomArray } from '../../utils/helpers';
import Controls from '../UI/Controls';
import StatsPanel from '../UI/StatsPanel';
import CodePanel from '../UI/CodePanel';

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
}

const algorithmSteps: Record<SortingAlgorithm, (arr: number[]) => Generator<AlgorithmStep>> = {
  merge: mergeSortSteps,
  quick: quickSortSteps,
  insertion: insertionSortSteps,
  bubble: bubbleSortSteps,
  selection: selectionSortSteps,
  heap: heapSortSteps
};

export default function SortingVisualizer({ algorithm }: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeMs: 0 });
  
  const generateRandomArray = useCallback(() => {
    const newArray = createRandomArray(30, 99);
    setArray(newArray);
    
    const generator = algorithmSteps[algorithm](newArray);
    const newSteps: AlgorithmStep[] = [];
    for (const step of generator) {
      newSteps.push(step);
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setStats({ comparisons: 0, swaps: 0, timeMs: 0 });
  }, [algorithm]);
  
  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);
  
  useEffect(() => {
    let timer = 0;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        
        const step = steps[currentStep + 1];
        if (step) {
          setStats(prev => ({
            comparisons: prev.comparisons + (step.comparing?.length || 0),
            swaps: prev.swaps + (step.swapping?.length || 0),
            timeMs: prev.timeMs + (100 - speed) / 10
          }));
        }
      }, 200 - speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => window.clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);
  
  const currentArray = steps[currentStep]?.array || array;
  const comparing = steps[currentStep]?.comparing || [];
  const swapping = steps[currentStep]?.swapping || [];
  const sorted = steps[currentStep]?.sorted || [];
  const pivot = steps[currentStep]?.pivot;
  const activeLines = steps[currentStep]?.activeLines || [];
  const codeContext = steps[currentStep]?.codeContext;
  
  const maxValue = Math.max(...currentArray, 99);
  
  return (
    <div className="space-y-6 min-w-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,66%)_minmax(320px,34%)] lg:items-stretch min-w-0">
        <div className="card flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4">Sorting Visualization</h2>
          
          <div className="h-96 flex items-end justify-center gap-1">
            <AnimatePresence>
              {currentArray.map((value, idx) => (
                <motion.div
                  key={`${idx}-${value}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / maxValue) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-8 rounded-t-lg transition-all duration-200 ${
                    sorted.includes(idx) ? 'bg-green-500' :
                    comparing.includes(idx) ? 'bg-yellow-500' :
                    swapping.includes(idx) ? 'bg-red-500' :
                    pivot === idx ? 'bg-purple-500' :
                    'bg-primary-500'
                  }`}
                  style={{ height: `${(value / maxValue) * 100}%` }}
                >
                  <div className="absolute inset-x-0 top-1 text-center text-xs font-semibold text-white">
                    {value}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <Controls
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onReset={generateRandomArray}
            onStep={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
            speed={speed}
            onSpeedChange={setSpeed}
            progress={steps.length > 1 ? currentStep / (steps.length - 1) : 0}
          />
        </div>
        
        <div className="h-full">
          <StatsPanel
            className="h-full"
            algorithm={algorithm}
            comparisons={stats.comparisons}
            swaps={stats.swaps}
            timeMs={stats.timeMs}
            arraySize={currentArray.length}
            step={currentStep}
            totalSteps={steps.length}
          />
        </div>
      </div>

      <CodePanel
        title={`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`}
        code={sortingAlgorithmCode[algorithm]}
        activeLines={activeLines}
        codeContext={codeContext}
      />
    </div>
  );
}
