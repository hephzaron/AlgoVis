/**
 * @fileoverview Main DFS Visualizer component
 * Orchestrates all hooks and components for the visualization
 */

import { useGraphData } from '../CustomHooks/useGraphData';
import { useDFS } from './hooks/useDFS';
import { useStepPlayback } from './hooks/useStepPlayback';
import { usePathHighlight } from './hooks/usePathHighlight';
import { DFSHeader } from './components/DFSHeader';
import { DFSGraphCanvas } from './components/DFSGraphCanvas';
import { DFSInfoPanel } from './components/DFSInfoPanel';
import { DFSStackDisplay } from './components/DFSStackDisplay';
import { DFSVisitedList } from './components/DFSVisitedListed';
import { DFSControls } from './components/DFSControls';
import { DFSEmptyState } from './components/DFSEmptyState';

/**
 * DFSVisualizer Component
 * 
 * The main orchestrator component that:
 * 1. Initializes graph data using useGraphData
 * 2. Manages DFS algorithm execution with useDFS
 * 3. Controls animation playback with useStepPlayback
 * 4. Handles path highlighting with usePathHighlight
 * 5. Composes all UI components
 * 
 * Features:
 * - Interactive graph visualization
 * - Step-by-step algorithm display
 * - Playback controls (play, pause, step, reset)
 * - Speed control
 * - Path highlighting
 * - Queue visualization
 * - Step information display
 * 
 * @returns {JSX.Element} Rendered DFS Visualizer
 * 
 * @example
 * <DFSVisualizer />
 */
export default function DFSVisualizer() {
  // ============================================================
  // 1. Data Hooks
  // ============================================================
  const { graph, nodePositions, nodesList } = useGraphData();
  const {
    steps,
    currentStep,
    setCurrentStep,
    hasRun,
    finalParent,
    sourceNode,
    setSourceNode,
    runAlgorithm,
    reset,
  } = useDFS(graph);

  // ============================================================
  // 2. Playback Hook
  // ============================================================
  const {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    togglePlay,
  } = useStepPlayback(steps, currentStep, setCurrentStep);

  // ============================================================
  // 3. Path Highlighting Hook
  // ============================================================
  const {
    selectedPathNode,
    pathNodeSet,
    pathEdgeSet,
    togglePath,
    clearPath,
  } = usePathHighlight(finalParent);

  // ============================================================
  // 4. Data Extraction
  // ============================================================
  const currentStepData = steps[currentStep];
  const visited = currentStepData?.visited || [];
  const stack = currentStepData?.stack || [];

  // ============================================================
  // 5. Event Handlers
  // ============================================================
  
  /** Handle running the DFS algorithm */
  const handleRun = () => {
    runAlgorithm(sourceNode);
    setIsPlaying(false);
    clearPath();
  };

  /** Handle resetting the visualization */
  const handleReset = () => {
    reset();
    setIsPlaying(false);
    clearPath();
  };

  /** Handle advancing one step */
  const handleStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // ============================================================
  // 6. Render
  // ============================================================
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20 space-y-6">
      {/* Header with source selector and run button */}
      <DFSHeader
        sourceNode={sourceNode}
        onSourceChange={setSourceNode}
        onRun={handleRun}
        isPlaying={isPlaying}
        nodes={nodesList}
        hasRun={hasRun}
      />

      {/* Main content area */}
      {!hasRun ? (
        <DFSEmptyState onRun={handleRun} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph visualization */}
          <div className="lg:col-span-2">
            <DFSGraphCanvas
              graph={graph}
              nodePositions={nodePositions}
              sourceNode={sourceNode}
              visited={visited}
              stack={stack}
              currentNode={currentStepData?.current}
              discoveringNode={currentStepData?.discovered}
              pathNodeSet={pathNodeSet}
              pathEdgeSet={pathEdgeSet}
              selectedPathNode={selectedPathNode}
              currentStepType={currentStepData?.type}
            />
          </div>

          {/* Information panels */}
          <div className="space-y-4">
            <DFSInfoPanel stepData={currentStepData} />
            <DFSStackDisplay stack={stack} />
            <DFSVisitedList
              visited={visited}
              selectedPathNode={selectedPathNode}
              onNodeSelect={togglePath}
            />
          </div>
        </div>
      )}

      {/* Controls section */}
      {hasRun && (
        <DFSControls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          onStep={handleStep}
          onReset={handleReset}
          currentStep={currentStep}
          totalSteps={steps.length}
          speed={speed}
          onSpeedChange={setSpeed}
          isStepDisabled={currentStep >= steps.length - 1 || isPlaying}
        />
      )}
    </section>
  );
}