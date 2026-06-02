import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward, ChevronRight } from 'lucide-react';
import { 
  mergeSortSteps, 
  quickSortSteps, 
  insertionSortSteps, 
  bubbleSortSteps, 
  selectionSortSteps,
  heapSortSteps 
} from '../../algorithms/sorting';
import { AlgorithmStep, SortingAlgorithm } from '../../types';
import Controls from '../UI/Controls';
import StatsPanel from '../UI/StatsPanel';
import CodePanel from '../UI/CodePanel';

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
}

const algorithmCode: Record<SortingAlgorithm, string> = {
  merge: `function mergeSort(arr):
    if length(arr) <= 1: return arr
    mid = length(arr) / 2
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)`,
  
  quick: `function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)`,
  
  insertion: `function insertionSort(arr):
    for i = 1 to length(arr)-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key`,
  
  bubble: `function bubbleSort(arr):
    n = length(arr)
    for i = 0 to n-1:
        for j = 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])`,
  
  selection: `function selectionSort(arr):
    n = length(arr)
    for i = 0 to n-1:
        min_idx = i
        for j = i+1 to n-1:
            if arr[j] < arr[min_idx]:
                min_idx = j
        swap(arr[i], arr[min_idx])`,
  
  heap: `function heapSort(arr):
    buildMaxHeap(arr)
    for i = length(arr)-1 down to 1:
        swap(arr[0], arr[i])
        heapify(arr, 0, i)`
};

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
    const size = 30;
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    
    // Generate algorithm steps
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
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        
        // Update stats
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
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);
  
  const currentArray = steps[currentStep]?.array || array;
  const comparing = steps[currentStep]?.comparing || [];
  const swapping = steps[currentStep]?.swapping || [];
  const sorted = steps[currentStep]?.sorted || [];
  const pivot = steps[currentStep]?.pivot;
  
  const maxValue = Math.max(...currentArray, 100);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visualization Area */}
      <div className="lg:col-span-2 card">
        <h2 className="text-2xl font-bold mb-4">Sorting Visualization</h2>
        
        <div className="h-96 flex items-end justify-center gap-1">
          <AnimatePresence>
            {currentArray.map((value, idx) => (
              <motion.div
                key={`${idx}-${value}`}
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.3 }}
                className={`w-8 rounded-t-lg transition-all duration-200 ${
                  sorted.includes(idx) ? 'bg-green-500' :
                  comparing.includes(idx) ? 'bg-yellow-500' :
                  swapping.includes(idx) ? 'bg-red-500' :
                  pivot === idx ? 'bg-purple-500' :
                  'bg-primary-500'
                }`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                <div className="text-center text-xs text-white -mt-6">{value}</div>
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
          progress={currentStep / (steps.length - 1)}
        />
      </div>
      
      {/* Stats Panel */}
      <div className="space-y-6">
        <StatsPanel
          algorithm={algorithm}
          comparisons={stats.comparisons}
          swaps={stats.swaps}
          timeMs={stats.timeMs}
          arraySize={currentArray.length}
          step={currentStep}
          totalSteps={steps.length}
        />
        
        <CodePanel
          title={`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`}
          code={algorithmCode[algorithm]}
        />
      </div>
    </div>
  );
}