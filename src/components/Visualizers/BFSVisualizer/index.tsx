import { useState, useCallback } from 'react';
import { useGraphData, useAnimation } from '../CustomHooks';
import { useBFS } from './hooks/useBFS';
import { Header } from './components/Header';

/** Step type description */
const stepTypeDescriptions: Record<string, string> = {
    start: 'Starting BFS from source node',
    visit: 'Processing node from the queue',
    discover: 'Discovering unvisited neighbor and adding to queue',
    complete: 'BFS complete - all reachable nodes explored',
  };

export default function BFSVisualizer() {
    const { graph, nodePositions } = useGraphData();
    const {
        steps,
        currentStep,
        hasRun,
        sourceNode,
        setHasRun,
        selectedPathNode,
        setSourceNode,
        runBFS,
        setCurrentStep,
        reconstructPath
    } = useBFS(graph);
    
    
    /** Whether animation is playing */
    const [isPlaying, setIsPlaying] = useState(false);

    /** Animation speed (0-100) */
    const [speed, setSpeed] = useState(50);

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
                onRun={runBFS}
                isPlaying={isPlaying}
                nodes={Array.from(graph.getNodes())}
                hasRun={hasRun}/>
        </section>
    );    
}