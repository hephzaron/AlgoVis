import { useState, useCallback } from 'react';
import { useGraphData, useAnimation } from '../CustomHooks';
import { useDijkstra } from './hooks/useDijkstra';
import { Header } from './components/Header';
import { GraphCanvas } from './components/GraphCanvas';
import { InfoPanel } from './components/InfoPanel';
import { DistancesTable } from './components/DistancesTable';
import { VisitedNodes } from './components/VisitedNodes';
import { Controls } from './components/Controls';
import { EmptyState } from './components/EmptyState';

const stepTypeDescriptions: Record<string, string> = {
  start: 'Initializing algorithm with source node',
  visit: 'Processing node - extracting from priority queue',
  relax: 'Examining edge to neighbor node',
  update: 'Found shorter path - updating distance',
  complete: 'Algorithm complete - all shortest paths found',
};

export default function DijkstraVisualizer() {
  const { graph, nodePositions } = useGraphData();
  const {
    steps,
    currentStep,
    setCurrentStep,
    hasRun,
    sourceNode,
    setSourceNode,
    runAlgorithm,
    reset,
    reconstructPath,
  } = useDijkstra(graph);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [selectedPathNode, setSelectedPathNode] = useState<string | null>(null);

  // Get current step data
  const currentStepData = steps[currentStep];
  const distances = currentStepData?.distances || new Map<string, number>();
  const visited = currentStepData?.visited || new Set<string>();
  const currentNode = currentStepData?.current;

  const examiningEdge = currentStepData?.neighbor
    ? { from: currentStepData.current, to: currentStepData.neighbor }
    : null;

  const stepDescription = stepTypeDescriptions[currentStepData?.type || 'start'];

  // Path highlighting
  const highlightedPath = selectedPathNode ? reconstructPath(selectedPathNode) : [];
  const pathNodeSet = new Set(highlightedPath);
  const pathEdgeSet = new Set<string>();
  for (let i = 0; i < highlightedPath.length - 1; i++) {
    const from = highlightedPath[i];
    const to = highlightedPath[i + 1];
    pathEdgeSet.add(`${from}-${to}`);
    pathEdgeSet.add(`${to}-${from}`);
  }

  // Handlers
  const handleRun = useCallback(() => {
    runAlgorithm(sourceNode);
    setIsPlaying(false);
    setSelectedPathNode(null);
  }, [runAlgorithm, sourceNode]);

  const handleReset = useCallback(() => {
    reset();
    setIsPlaying(false);
    setSelectedPathNode(null);
  }, [reset]);

  const handleStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length, setCurrentStep]);

  const handlePlayPause = useCallback(() => {
    if (currentStep >= steps.length - 1 && !isPlaying) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentStep, steps.length, setCurrentStep]);

  useAnimation({
    isPlaying,
    currentStep,
    totalSteps: steps.length,
    speed,
    onStepChange: setCurrentStep,
    onComplete: () => setIsPlaying(false),
  });

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20 space-y-6">
      <Header
        sourceNode={sourceNode}
        onSourceChange={setSourceNode}
        onRun={handleRun}
        isPlaying={isPlaying}
        nodes={Array.from(graph.getNodes())}
        hasRun={hasRun}
      />

      {!hasRun ? (
        <EmptyState onRun={handleRun} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph Visualization */}
          <div className="lg:col-span-2">
            <GraphCanvas
              graph={graph}
              nodePositions={nodePositions}
              sourceNode={sourceNode}
              visited={visited}
              currentNode={currentNode}
              examiningEdge={examiningEdge}
              pathNodeSet={pathNodeSet}
              pathEdgeSet={pathEdgeSet}
              selectedPathNode={selectedPathNode}
            />
          </div>

          {/* Information Panel */}
          <div className="space-y-4">
            <InfoPanel stepData={currentStepData} stepDescription={stepDescription} />
            <DistancesTable
              graph={graph}
              distances={distances}
              visited={visited}
              sourceNode={sourceNode}
              selectedPathNode={selectedPathNode}
              onNodeSelect={setSelectedPathNode}
            />
            <VisitedNodes visited={visited} />
          </div>
        </div>
      )}

      {hasRun && (
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
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