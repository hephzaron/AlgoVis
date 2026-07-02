import { useState, useMemo } from 'react';
import { Graph } from '../../GraphVisualizer';
import { NodePosition } from '../type';

export function useGraphData() {
  const [graph] = useState(() => {
    const g = new Graph<string>();
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
    nodes.forEach(id => g.addNode(id, id));
    
    g.addEdge('A', 'B', 4);
    g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 1);
    g.addEdge('B', 'D', 5);
    g.addEdge('C', 'D', 8);
    g.addEdge('C', 'E', 10);
    g.addEdge('D', 'E', 2);
    g.addEdge('D', 'F', 6);
    g.addEdge('E', 'F', 3);
    
    return g;
  });

  const nodePositions = useMemo<Map<string, NodePosition>>(() => {
    const positions = new Map<string, NodePosition>();
    const nodes = Array.from(graph.getNodes());
    const angle = (2 * Math.PI) / nodes.length;
    const radius = 120;
    const centerX = 250;
    const centerY = 200;

    nodes.forEach((node, index) => {
      positions.set(node.id, {
        x: centerX + radius * Math.cos(index * angle),
        y: centerY + radius * Math.sin(index * angle),
      });
    });

    return positions;
  }, [graph]);

  return { graph, nodePositions };
}