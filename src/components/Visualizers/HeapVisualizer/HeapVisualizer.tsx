// src/components/HeapVisualizer.tsx

import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, ArrowUp, RefreshCw } from 'lucide-react';
import CodePanel from '../../UI/CodePanel';
import { dataStructureCode } from '../../../data/dataStructureCode';
import { Heap } from './Heap';
import {
  getTreeNodeStyle,
  calculateHeapVisualProperties,
  getNodeKey,
  isLeafNode,
  getNodeLevel,
  type TreeVisualizationConfig,
} from './HeapViewOptimizer';
import { InfoHint } from '../../Info/InfoHint';
import { InfoButton } from '../../Info/InfoButton';

/**
 * Helper to find the line numbers for a function in the heap code
 */
function getFunctionLines(code: string, fnName: string, bodyLines = 1): number[] {
  const lines = code.split('\n');
  const result: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`def ${fnName}(`)) {
      result.push(i + 1);
      for (let j = 1; j <= bodyLines && i + j < lines.length; j++) {
        if (lines[i + j].trim() !== '') result.push(i + j + 1);
      }
      break;
    }
  }
  return result;
}

/**
 * Represents a heap node for visualization with position data
 */
interface HeapVisualNode<T> {
  value: T;
  index: number;
  level: number;
  position: number;
  isHighlighted: boolean;
  isLeaf: boolean;
}

/**
 * Visualization configuration
 */
const VISUAL_CONFIG: TreeVisualizationConfig = {
  containerHeight: 350,
  containerWidth: 700,
  padding: 20,
  minNodeSize: 28,
  maxNodeSize: 80,
};

/**
 * Visual component for interacting with a Heap data structure
 */
export default function HeapVisualizer() {
  // State - FIXED: heap is now a state variable that can be updated
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [heap, setHeap] = useState(() => new Heap<number>({ type: 'max' }));
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [animatingNode, setAnimatingNode] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Update display
  const updateDisplay = useCallback(() => {
    setItems(heap.getItems());
  }, [heap]);

  // Handle heap type change - FIXED: properly creates new heap with correct type
  const handleHeapTypeChange = useCallback((type: 'max' | 'min') => {
    // Get current items before clearing
    const currentItems = heap.getItems();
    
    // Create new heap with the new type
    const newHeap = new Heap<number>({ type });
    
    // Re-insert all items into the new heap
    currentItems.forEach(value => newHeap.insert(value));
    
    // Update state with new heap
    setHeap(newHeap);
    setHeapType(type);
    setItems(newHeap.getItems());
    setLastAction(`Switched to ${type}-heap`);
    
    setTimeout(() => setLastAction(null), 2000);
  }, [heap]);

  // Insert value - FIXED: now uses setHeap when needed
  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const insertIndex = heap.insert(value);
    setItems(heap.getItems()); // Update items directly
    setLastAction(`Inserted: ${value}`);
    
    // Highlight path to root
    const indices = [insertIndex];
    let parent = Math.floor((insertIndex - 1) / 2);
    while (parent >= 0) {
      indices.push(parent);
      parent = Math.floor((parent - 1) / 2);
    }
    setHighlightIndices(indices);
    setAnimatingNode(insertIndex);
    setActiveLines(getFunctionLines(dataStructureCode.heap, 'insert', 3));
    
    setTimeout(() => {
      setHighlightIndices([]);
      setAnimatingNode(null);
      setActiveLines([]);
    }, 1500);
    
    setInputValue('');
    inputRef.current?.focus();
  }, [inputValue, heap]);

  // Extract root - FIXED: now uses setHeap when needed
  const handleExtractRoot = useCallback(() => {
    const extracted = heap.extractRoot();
    if (extracted !== undefined) {
      setItems(heap.getItems());
      setLastAction(`Extracted root: ${extracted}`);
      setHighlightIndices([0]);
      setActiveLines(getFunctionLines(dataStructureCode.heap, 'extractRoot', 4));
      setTimeout(() => {
        setHighlightIndices([]);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction('Heap is empty!');
      setTimeout(() => setLastAction(null), 1500);
    }
    inputRef.current?.focus();
  }, [heap]);

  // Peek root
  const handlePeek = useCallback(() => {
    const root = heap.peek();
    if (root !== undefined) {
      setLastAction(`Root element: ${root}`);
      setHighlightIndices([0]);
      setActiveLines(getFunctionLines(dataStructureCode.heap, 'peek', 1));
      setTimeout(() => {
        setHighlightIndices([]);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction('Heap is empty!');
      setTimeout(() => setLastAction(null), 1500);
    }
    inputRef.current?.focus();
  }, [heap]);

  // Clear heap
  const handleClear = useCallback(() => {
    heap.clear();
    setItems([]);
    setLastAction('Heap cleared');
    setActiveLines(getFunctionLines(dataStructureCode.heap, 'clear', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
    inputRef.current?.focus();
  }, [heap]);

  // Batch insert
  const handleBatchInsert = useCallback(() => {
    const randomValues = Array.from({ length: 5 }, () => 
      Math.floor(Math.random() * 100)
    );
    randomValues.forEach(value => heap.insert(value));
    setItems(heap.getItems());
    setLastAction(`Inserted: ${randomValues.join(', ')}`);
    setTimeout(() => setLastAction(null), 2000);
    inputRef.current?.focus();
  }, [heap]);

  // Build visual tree with memoization
  const visualTree = useMemo(() => {
    const size = items.length;
    if (size === 0) return [];

    const nodes: HeapVisualNode<number>[] = [];

    for (let i = 0; i < size; i++) {
      const level = getNodeLevel(i);
      const levelStart = Math.pow(2, level) - 1;
      const levelPosition = i - levelStart;
      const maxItemsInLevel = Math.pow(2, level);
      
      nodes.push({
        value: items[i],
        index: i,
        level: level,
        position: levelPosition / maxItemsInLevel,
        isHighlighted: highlightIndices.includes(i),
        isLeaf: isLeafNode(i, size),
      });
    }

    return nodes;
  }, [items, highlightIndices]);

  // Calculate the maximum level from the visual tree
  const maxLevel = useMemo(() => {
    if (visualTree.length === 0) return 0;
    return visualTree.reduce((max, node) => Math.max(max, node.level), 0);
  }, [visualTree]);

  // Calculate visual properties using maxLevel
  const visualProps = useMemo(() => {
    if (visualTree.length === 0) {
      return { nodeSize: 60, totalLevels: 1, containerHeight: 300 };
    }
    return calculateHeapVisualProperties(
      visualTree.length,
      maxLevel,
      VISUAL_CONFIG
    );
  }, [visualTree, maxLevel]);

  // Render edges between nodes
  const renderEdges = useCallback(() => {
    const edges: JSX.Element[] = [];
    const size = items.length;
    const { nodeSize, totalLevels } = visualProps;

    for (let i = 0; i < size; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      
      const parentNode = visualTree.find(n => n.index === i);
      if (!parentNode) continue;
      
      const parentStyle = getTreeNodeStyle(
        parentNode,
        totalLevels,
        nodeSize,
        VISUAL_CONFIG
      );

      // Left child
      if (left < size) {
        const childNode = visualTree.find(n => n.index === left);
        if (childNode) {
          const childStyle = getTreeNodeStyle(
            childNode,
            totalLevels,
            nodeSize,
            VISUAL_CONFIG
          );
          edges.push(
            <line
              key={`edge-${i}-${left}`}
              x1={parentStyle.left}
              y1={parseFloat(parentStyle.top) + nodeSize / 2}
              x2={childStyle.left}
              y2={parseFloat(childStyle.top)}
              stroke="#94a3b8"
              strokeWidth="2"
              className="edge-line"
            />
          );
        }
      }

      // Right child
      if (right < size) {
        const childNode = visualTree.find(n => n.index === right);
        if (childNode) {
          const childStyle = getTreeNodeStyle(
            childNode,
            totalLevels,
            nodeSize,
            VISUAL_CONFIG
          );
          edges.push(
            <line
              key={`edge-${i}-${right}`}
              x1={parentStyle.left}
              y1={parseFloat(parentStyle.top) + nodeSize / 2}
              x2={childStyle.left}
              y2={parseFloat(childStyle.top)}
              stroke="#94a3b8"
              strokeWidth="2"
              className="edge-line"
            />
          );
        }
      }
    }

    return edges;
  }, [items, visualTree, visualProps]);

  // Get node color based on state
  const getNodeColor = useCallback((node: HeapVisualNode<number>) => {
    if (node.isHighlighted) return 'ring-4 ring-yellow-500 bg-yellow-500';
    if (animatingNode === node.index) return 'ring-4 ring-green-400 bg-green-500';
    if (node.index === 0) return 'bg-purple-600';
    if (node.isLeaf) return 'bg-green-500';
    return 'bg-blue-500';
  }, [animatingNode]);

  return (
    <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="flex items-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <InfoHint position="left" duration={4000} repeatDelay={4000} 
                isHovered={isHovered}/>
            </div>
            <InfoButton noteFile="heap.md" title="Heap" />
          </div>
      <h2 className="text-2xl font-bold mb-4">
        Heap Data Structure
        <span className="ml-4 text-sm font-normal text-slate-500">
          ({heapType}-heap · {items.length} nodes · {visualProps.totalLevels} levels)
        </span>
      </h2>

      {/* Heap Type Selection */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleHeapTypeChange('max')}
          className={`px-4 py-2 rounded-xl transition-all ${
            heapType === 'max'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          Max-Heap (Largest Root)
        </button>
        <button
          onClick={() => handleHeapTypeChange('min')}
          className={`px-4 py-2 rounded-xl transition-all ${
            heapType === 'min'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          Min-Heap (Smallest Root)
        </button>
      </div>

      {/* Heap Visualization */}
      <div 
        className="relative mb-6 p-4 bg-slate-100 rounded-xl overflow-hidden"
        style={{ minHeight: `${visualProps.containerHeight}px` }}
      >
        {items.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400 py-8">
            Heap is empty. Insert values to build the heap.
          </div>
        ) : (
          <div 
            className="relative w-full"
            style={{ height: `${visualProps.containerHeight}px` }}
          >
            {/* Edges */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {renderEdges()}
            </svg>
            
            {/* Nodes */}
            <AnimatePresence>
              {visualTree.map((node) => {
                const { nodeSize, totalLevels } = visualProps;
                const style = getTreeNodeStyle(
                  node,
                  totalLevels,
                  nodeSize,
                  VISUAL_CONFIG
                );
                const isRoot = node.index === 0;
                const nodeColor = getNodeColor(node);
                
                return (
                  <motion.div
                    key={getNodeKey(node.index, node.value)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 25,
                      delay: node.level * 0.05
                    }}
                    className={`
                      absolute rounded-xl flex items-center justify-center font-bold
                      transition-all duration-300
                      ${nodeColor}
                      ${node.isHighlighted ? 'scale-110' : ''}
                      ${animatingNode === node.index ? 'scale-110' : ''}
                      text-white shadow-lg
                    `}
                    style={{
                      width: `${style.size}px`,
                      height: `${style.size}px`,
                      fontSize: `${style.fontSize}px`,
                      top: style.top,
                      left: style.left,
                      transform: style.transform,
                    }}
                  >
                    {node.value}
                    {isRoot && (
                      <div className="absolute -top-8 text-xs font-semibold text-purple-600 bg-white px-2 py-1 rounded-full shadow-sm whitespace-nowrap">
                        ROOT
                      </div>
                    )}
                    {node.isLeaf && (
                      <div className="absolute -bottom-6 text-[10px] font-semibold text-green-600 bg-white px-1.5 py-0.5 rounded shadow-sm">
                        LEAF
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          placeholder="Enter value"
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleInsert} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Insert
        </button>
        <button onClick={handleExtractRoot} className="btn-secondary flex items-center gap-2">
          <ArrowUp size={18} /> Extract Root
        </button>
        <button onClick={handlePeek} className="btn-secondary flex items-center gap-2">
          <Eye size={18} /> Peek
        </button>
        <button onClick={handleBatchInsert} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={18} /> Batch Insert
        </button>
        <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
          <Trash2 size={18} /> Clear
        </button>
      </div>

      {/* Action feedback */}
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

      {/* Heap Info */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap justify-between text-sm text-slate-500 gap-2">
        <span>Heap Size: {items.length}</span>
        <span>Type: {heapType.toUpperCase()}-HEAP</span>
        <span>Root: {items.length > 0 ? items[0] : 'None'}</span>
        <span>Node Size: {Math.round(visualProps.nodeSize)}px</span>
        <span>Levels: {visualProps.totalLevels}</span>
        <span>Max Level: {maxLevel}</span>
      </div>

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Heap Implementation" code={dataStructureCode.heap} activeLines={activeLines} />
      </div>
    </div>
  );
}