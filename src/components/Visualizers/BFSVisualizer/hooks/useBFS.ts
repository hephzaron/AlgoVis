import { useCallback, useState } from "react";
import { Graph } from "../../GraphVisualizer";
import { BFSStep } from "../../../../algorithms/graph/BFS/types";
import { BFS } from "../../../../algorithms/graph/BFS/BFS";

export function useBFS(graph: Graph<string>) {
    const [steps, setSteps] = useState<BFSStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [hasRun, setHasRun] = useState(false);
    const [finalParent, setFinalParent] = useState<Map<string, string | null>>(new Map());
    const [sourceNode, setSourceNode] = useState('A');
    const [selectedPathNode, setSelectedPathNode] = useState<string | null>(null);
    /**
     * Executes BFS algorithm from the selected source node
     **/
    const runBFS = useCallback(() => {
        const node = graph.getNode(sourceNode);
        if (!node) {
        alert('Invalid source node');
        return;
        }

        // Execute algorithm
        const bfs = new BFS(graph);
        const result = bfs.run(sourceNode);

        // Store steps and reset visualization
        setSteps(result.steps);
        setCurrentStep(0);
        setHasRun(true);
        setFinalParent(result.parent);
        setSelectedPathNode(null);
    }, [graph, sourceNode]);

    /**
     * Reconstructs the path from source to a target node
     */
    const reconstructPath = (targetNode: string): string[] => {
        const path: string[] = [];
        let current: string | null = targetNode;
        
        while (current !== null) {
            path.unshift(current);
            current = finalParent.get(current) || null;
        }
        
        return path;
    }
    
    return {
        steps,
        currentStep,
        hasRun,
        sourceNode,
        setHasRun,
        selectedPathNode,
        setSourceNode,
        runBFS,
        setCurrentStep,
        reconstructPath,
    };
}
