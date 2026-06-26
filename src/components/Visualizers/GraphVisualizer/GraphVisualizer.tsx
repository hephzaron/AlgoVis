import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodePanel from '../../UI/CodePanel';
import { dataStructureCode } from '../../../data/dataStructureCode';
import { Graph } from './Graph';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import { GraphStats } from './GraphStats';
import { NodeTooltip } from './NodeTooltip';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { defaultLayoutConfig, getFunctionLines } from './constants';
import { GraphVisualizerProps, NumberNode, Edge, GraphStats as GraphStatsType } from './types';

export default function GraphVisualizer({ 
  initialNodes = [],
  initialEdges = [],
  layoutConfig = {},
  onNodeClick: externalOnNodeClick,
  onEdgeClick: externalOnEdgeClick,
  className = ''
}: GraphVisualizerProps) {
  const config = {
    ...defaultLayoutConfig,
    ...layoutConfig
  };

  const [graph] = useState(() => {
    const g = new Graph<number>();
    
    initialNodes.forEach(({ id, value }) => {
      try {
        g.addNode(value, id);
      } catch (error) {
        console.warn(`Failed to add initial node ${id}:`, error);
      }
    });
    
    initialEdges.forEach(({ from, to }) => {
      try {
        g.addEdge(from, to);
      } catch (error) {
        console.warn(`Failed to add initial edge ${from}-${to}:`, error);
      }
    });
    
    return g;
  });
  
  const [nodes, setNodes] = useState<NumberNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeId, setNodeId] = useState('');
  const [nodeValue, setNodeValue] = useState('');
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [stats, setStats] = useState<GraphStatsType | null>(null);
  
  // Slider value: 0 = closest, 50 = default, 100 = farthest
  const [layoutSpread, setLayoutSpread] = useState(50);
  const [canvasSize] = useState({ 
    width: config.canvasWidth, 
    height: config.canvasHeight 
  });
  
  const nodeIdRef = useRef<HTMLInputElement | null>(null);
  const nodeValueRef = useRef<HTMLInputElement | null>(null);
  const fromIdRef = useRef<HTMLInputElement | null>(null);
  const toIdRef = useRef<HTMLInputElement | null>(null);
  const layoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateDisplay = useCallback(() => {
    setNodes(graph.getNodes());
    setEdges(graph.getEdges());
    setStats(graph.getStats());
  }, [graph]);

  /**
   * Runs the force-directed layout with distance based on slider value.
   */
  const runLayout = useCallback(() => {
    if (nodes.length === 0) return;

    // Map slider value (0-100) to distance (50-300)
    // 0 = closest (50px), 50 = default (150px), 100 = farthest (300px)
    const minDistance = 50;
    const maxDistance = 300;
    const targetDistance = minDistance + (layoutSpread / 100) * (maxDistance - minDistance);
    
    console.log(`Slider: ${layoutSpread}% → Distance: ${Math.round(targetDistance)}px`);
    
    // Apply layout with the calculated target distance
    graph.forceDirectedLayout(
      80,                     // iterations
      0.05,                   // spring constant
      200,                    // repulsion constant
      0.85,                   // damping
      30,                     // nodeRadius
      targetDistance          // target distance between nodes
    );
    
    // Update the display with new positions
    setNodes([...graph.getNodes()]);
  }, [graph, nodes, layoutSpread]);

  /**
   * Handles slider change - updates distance between nodes.
   */
  const handleLayoutSpreadChange = useCallback((value: number) => {
    setLayoutSpread(value);
    
    // Clear any pending layout timeout
    if (layoutTimeoutRef.current) {
      clearTimeout(layoutTimeoutRef.current);
    }
    
    // Debounce the layout update
    layoutTimeoutRef.current = setTimeout(() => {
      runLayout();
      layoutTimeoutRef.current = null;
    }, 50);
  }, [runLayout]);

  // Initial layout on mount
  useEffect(() => {
    updateDisplay();
    setTimeout(runLayout, 100);
    
    return () => {
      if (layoutTimeoutRef.current) {
        clearTimeout(layoutTimeoutRef.current);
      }
    };
  }, [updateDisplay, runLayout]);

  // ... all handler functions (handleAddNode, handleRemoveNode, etc.) ...

  const handleAddNode = (): void => {
    if (!nodeId.trim() || !nodeValue.trim()) return;
    const value = parseInt(nodeValue);
    if (isNaN(value)) return;

    try {
      graph.addNode(value, nodeId);
      updateDisplay();
      setLastAction(`Added node: ${nodeId} (${value})`);
      setActiveLines(getFunctionLines(dataStructureCode.graph, 'addNode', 5));
      
      setTimeout(runLayout, 50);
      
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1000);
      setNodeId('');
      setNodeValue('');
      nodeIdRef.current?.focus();
    } catch (error) {
      setLastAction(`Error: ${(error as Error).message}`);
      setTimeout(() => setLastAction(null), 1500);
    }
  };

  const handleRemoveNode = (): void => {
    if (!nodeId.trim()) return;
    
    const success = graph.removeNode(nodeId);
    if (success) {
      updateDisplay();
      setLastAction(`Removed node: ${nodeId}`);
      setActiveLines(getFunctionLines(dataStructureCode.graph, 'removeNode', 6));
      
      setTimeout(runLayout, 50);
      
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1000);
      setNodeId('');
      setNodeValue('');
      if (selectedNodeId === nodeId) setSelectedNodeId(null);
    } else {
      setLastAction(`Node not found: ${nodeId}`);
      setTimeout(() => setLastAction(null), 1500);
    }
    nodeIdRef.current?.focus();
  };

  const handleAddEdge = (): void => {
    if (!fromId.trim() || !toId.trim()) return;
    
    const success = graph.addEdge(fromId, toId);
    if (success) {
      updateDisplay();
      setLastAction(`Added edge: ${fromId} ↔ ${toId}`);
      setActiveLines(getFunctionLines(dataStructureCode.graph, 'addEdge', 4));
      
      setTimeout(runLayout, 50);
      
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1000);
      setFromId('');
      setToId('');
      fromIdRef.current?.focus();
    } else {
      setLastAction(`Invalid edge: ${fromId} ↔ ${toId}`);
      setTimeout(() => setLastAction(null), 1500);
    }
  };

  const handleRemoveEdge = (): void => {
    if (!fromId.trim() || !toId.trim()) return;
    
    const success = graph.removeEdge(fromId, toId);
    if (success) {
      updateDisplay();
      setLastAction(`Removed edge: ${fromId} ↔ ${toId}`);
      setActiveLines(getFunctionLines(dataStructureCode.graph, 'removeEdge', 4));
      
      setTimeout(runLayout, 50);
      
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1000);
      setFromId('');
      setToId('');
      fromIdRef.current?.focus();
    } else {
      setLastAction(`Edge not found: ${fromId} ↔ ${toId}`);
      setTimeout(() => setLastAction(null), 1500);
    }
  };

  const handleClear = (): void => {
    graph.clear();
    updateDisplay();
    setLastAction('Graph cleared');
    setActiveLines(getFunctionLines(dataStructureCode.graph, 'clear', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
    setNodeId('');
    setNodeValue('');
    setFromId('');
    setToId('');
    setSelectedNodeId(null);
    nodeIdRef.current?.focus();
  };

  const handleNodeClick = (nodeId: string): void => {
    const newSelectedId = nodeId === selectedNodeId ? null : nodeId;
    setSelectedNodeId(newSelectedId);
    const node = graph.getNode(nodeId);
    if (node) {
      setNodeId(nodeId);
      setNodeValue(node.value.toString());
    }
    
    if (externalOnNodeClick && newSelectedId) {
      externalOnNodeClick(nodeId);
    }
  };

  const handleEdgeClick = (edge: Edge): void => {
    if (externalOnEdgeClick) {
      externalOnEdgeClick(edge);
    }
    setLastAction(`Edge clicked: ${edge.from} ↔ ${edge.to}`);
    setTimeout(() => setLastAction(null), 1000);
  };

  const handleNodeIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        if (nodeValue.trim()) {
          handleAddNode();
        } else {
          nodeValueRef.current?.focus();
        }
      } else {
        nodeValueRef.current?.focus();
      }
    }
  };

  const handleNodeValueKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        nodeIdRef.current?.focus();
      } else if (nodeId.trim()) {
        handleAddNode();
      } else {
        nodeIdRef.current?.focus();
      }
    }
  };

  const handleFromIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toIdRef.current?.focus();
    }
  };

  const handleToIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        fromIdRef.current?.focus();
      } else if (fromId.trim() && toId.trim()) {
        handleAddEdge();
      } else {
        fromIdRef.current?.focus();
      }
    }
  };

  const selectedNode = selectedNodeId ? graph.getNode(selectedNodeId) : null;

  return (
    <div className={`card ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Graph (Force-Directed Layout)</h2>

      <GraphCanvas
        nodes={nodes}
        edges={edges}
        selectedNodeId={selectedNodeId}
        graph={graph}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        canvasSize={canvasSize}
      />

      <NodeTooltip
        selectedNodeId={selectedNodeId}
        degree={selectedNode?.getDegree() || 0}
        value={selectedNode?.value || 0}
      />

      <GraphControls
        nodeId={nodeId}
        nodeValue={nodeValue}
        fromId={fromId}
        toId={toId}
        nodeIdRef={nodeIdRef}
        nodeValueRef={nodeValueRef}
        fromIdRef={fromIdRef}
        toIdRef={toIdRef}
        layoutSpread={layoutSpread}
        onNodeIdChange={setNodeId}
        onNodeValueChange={setNodeValue}
        onFromIdChange={setFromId}
        onToIdChange={setToId}
        onAddNode={handleAddNode}
        onRemoveNode={handleRemoveNode}
        onAddEdge={handleAddEdge}
        onRemoveEdge={handleRemoveEdge}
        onRunLayout={runLayout}
        onLayoutSpreadChange={handleLayoutSpreadChange}
        onClear={handleClear}
        onNodeIdKeyPress={handleNodeIdKeyPress}
        onNodeValueKeyPress={handleNodeValueKeyPress}
        onFromIdKeyPress={handleFromIdKeyPress}
        onToIdKeyPress={handleToIdKeyPress}
      />

      <KeyboardShortcuts />

      {lastAction && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 p-3 bg-blue-50 rounded-xl text-blue-700 text-center font-medium"
        >
          {lastAction}
        </motion.div>
      )}

      {stats && <GraphStats stats={stats} />}

      <div className="mt-6">
        <CodePanel title="Graph" code={dataStructureCode.graph} activeLines={activeLines} />
      </div>
    </div>
  );
}