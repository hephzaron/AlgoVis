import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { linearSearchSteps, binarySearchSteps } from '../../algorithms/searching';
import { AlgorithmStep, SearchingAlgorithm } from '../../types';
import { searchingAlgorithmCode } from '../../data/algorithmCode';
import { generateRandomArray as createRandomArray } from '../../utils/helpers';
import Controls from '../UI/Controls';
import SearchStatsPanel from '../UI/SearchStatsPanel';
import CodePanel from '../UI/CodePanel';

interface SearchingVisualizerProps {
  algorithm: SearchingAlgorithm;
}

const algorithmSteps: Record<
  SearchingAlgorithm,
  (arr: number[], target: number) => Generator<AlgorithmStep>
> = {
  linear: linearSearchSteps,
  binary: binarySearchSteps,
};

export default function SearchingVisualizer({ algorithm }: SearchingVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [targetValue, setTargetValue] = useState('');
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({ comparisons: 0, timeMs: 0 });
  const [result, setResult] = useState('Not started');

  const parsedTarget = Number(targetValue);
  const isTargetValid = !Number.isNaN(parsedTarget);

  const generateRandomArray = useCallback(() => {
    const newArray = createRandomArray(20, 100);
    const randomTarget = newArray[Math.floor(Math.random() * newArray.length)];

    setArray(newArray);
    setTargetValue(String(randomTarget));
    setCurrentStep(0);
    setIsPlaying(false);
    setStats({ comparisons: 0, timeMs: 0 });
    setResult('Not started');
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  useEffect(() => {
    if (!isTargetValid) {
      setSteps([]);
      return;
    }

    const searchFn = algorithmSteps[algorithm];
    if (typeof searchFn !== 'function') {
      setSteps([]);
      setResult('Invalid search algorithm');
      return;
    }

    const generator = searchFn(array, parsedTarget);
    const newSteps: AlgorithmStep[] = [];
    for (const step of generator) newSteps.push(step);

    setSteps(newSteps);
    setCurrentStep(0);
    setStats({ comparisons: 0, timeMs: 0 });
    setResult(newSteps.length === 0 ? 'Not found' : 'Searching...');
  }, [algorithm, array, parsedTarget, isTargetValid]);

  useEffect(() => {
    let timer = 0;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        const step = steps[currentStep + 1];
        if (step) {
          setStats((prev) => ({
            comparisons: prev.comparisons + (step.comparing?.length || 0),
            timeMs: prev.timeMs + (100 - speed) / 10,
          }));
        }
      }, 200 - speed);
    } else if (currentStep >= steps.length - 1 && steps.length > 0) {
      setIsPlaying(false);
    }
    return () => window.clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  useEffect(() => {
    const step = steps[currentStep];
    if (step?.sorted?.length) {
      setResult(`Found at index ${step.sorted[0]}`);
    } else if (currentStep === steps.length - 1 && steps.length > 0 && !step?.sorted?.length) {
      setResult('Not found');
    } else {
      setResult('Searching...');
    }
  }, [currentStep, steps]);

  const currentArray = steps[currentStep]?.array || array;
  const comparing = steps[currentStep]?.comparing || [];
  const sorted = steps[currentStep]?.sorted || [];
  const activeLines = steps[currentStep]?.activeLines || [];
  const codeContext = steps[currentStep]?.codeContext;

  const maxValue = Math.max(...currentArray, 100);

  return (
    <div className="space-y-6 min-w-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,66%)_minmax(320px,34%)] lg:items-stretch min-w-0">
        <div className="card flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Searching Visualization</h2>
              <p className="text-sm text-slate-500 mt-1">Using {algorithm} search on an array of {array.length} values.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                Target value
                <input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="input-field"
                />
              </label>

              <button onClick={generateRandomArray} className="btn-secondary w-full h-11">
                Regenerate
              </button>
            </div>
          </div>

          <div className="h-96 flex items-end justify-center gap-1">
            <AnimatePresence>
              {currentArray.map((value, idx) => (
                <motion.div
                  key={`${idx}-${value}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / maxValue) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 rounded-t-lg transition-all duration-200 ${
                    sorted.includes(idx) ? 'bg-green-500' : comparing.includes(idx) ? 'bg-yellow-500' : 'bg-primary-500'
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
            onStep={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            speed={speed}
            onSpeedChange={setSpeed}
            progress={steps.length > 1 ? currentStep / (steps.length - 1) : 0}
          />
        </div>

        <div className="h-full">
          <SearchStatsPanel
            className="h-full"
            algorithm={algorithm}
            comparisons={stats.comparisons}
            timeMs={stats.timeMs}
            arraySize={currentArray.length}
            step={currentStep}
            totalSteps={steps.length}
            target={parsedTarget}
            result={result}
          />
        </div>
      </div>

      <CodePanel
        title={`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Search`}
        code={searchingAlgorithmCode[algorithm]}
        activeLines={activeLines}
        codeContext={codeContext}
      />
    </div>
  );
}
