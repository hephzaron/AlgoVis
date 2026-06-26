// src/components/HeapVisualizer.tsx

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, Eye, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import CodePanel from '../../UI/CodePanel';
import { dataStructureCode } from '../../../data/dataStructureCode';
import { Heap } from './Heap';

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
  isHighlighted?: boolean;
}

/**
 * Visual component for interacting with a Heap data structure
 * Supports max-heap, min-heap, insert, extractRoot, peek, clear operations
 */
export default function HeapVisualizer() {
  // State management
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [heap, setHeap] = useState(() => new Heap<number>({ type: heapType }));
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [animatingNode, setAnimatingNode] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Update display when heap changes
  const updateDisplay = useCallback(() => {
    setItems(heap.getItems());
  }, [heap]);

  // Handle heap type change - recreate heap with existing items
  const handleHeapTypeChange = useCallback((type: 'max' | 'min') => {
    // Save current items
    const currentItems = heap.getItems();
    
    // Create new heap with new type
    const newHeap = new Heap<number>({ type });
    
    // Re-insert all items into the new heap
    currentItems.forEach(value => newHeap.insert(value));
    
    setHeap(newHeap);
    setHeapType(type);
    setItems(newHeap.getItems());
    setLastAction(`Switched to ${type}-heap`);
    setTimeout(() => setLastAction(null), 2000);
  }, [heap]);

  // Insert a value into the heap
  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const insertIndex = heap.insert(value);
    updateDisplay();
    setLastAction(`Inserted: ${value}`);
    
    // Highlight the newly inserted node and its ancestors
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
  }, [inputValue, heap, updateDisplay]);


  // Extract the root element
  const handleExtractRoot = useCallback(() => {
    const extracted = heap.extractRoot();
    if (extracted !== undefined) {
      updateDisplay();
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
  }, [heap, updateDisplay]);

  // Peek at the root element
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

  // Clear the heap
  const handleClear = useCallback(() => {
    heap.clear();
    updateDisplay();
    setLastAction('Heap cleared');
    setActiveLines(getFunctionLines(dataStructureCode.heap, 'clear', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
    inputRef.current?.focus();
  }, [heap, updateDisplay]);

  // Batch insert random values
  const handleBatchInsert = useCallback(() => {
    const randomValues = Array.from({ length: 5 }, () => 
      Math.floor(Math.random() * 100)
    );
    
    randomValues.forEach(value => heap.insert(value));
    updateDisplay();
    setLastAction(`Inserted: ${randomValues.join(', ')}`);
    
    setTimeout(() => setLastAction(null), 2000);
    inputRef.current?.focus();
  }, [heap, updateDisplay]);

  // Build heap visualization with tree structure
  const buildVisualTree = useCallback((): HeapVisualNode<number>[] => {
    const visualNodes: HeapVisualNode<number>[] = [];
    const size = items.length;
    
    if (size === 0) return visualNodes;
    
    for (let i = 0; i < size; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const levelStart = Math.pow(2, level) - 1;
      const levelPosition = i - levelStart;
      const maxItemsInLevel = Math.pow(2, level);
      
      visualNodes.push({
        value: items[i],
        index: i,
        level: level,
        position: levelPosition / maxItemsInLevel,
        isHighlighted: highlightIndices.includes(i)
      });
    }
    
    return visualNodes;
  }, [items, highlightIndices]);

  const visualTree = buildVisualTree();

  // Calculate node positioning for tree visualization
  const getNodeStyle = (node: HeapVisualNode<number>, totalLevels: number) => {

    // Calculate dynamic spacing based on total levels
    const containerHeight = 280; // Available height for the tree
    const padding = 20;
    const availableHeight = containerHeight - (padding * 2);

    // Distribute levels evenly with more space for deeper trees
    const levelHeight = totalLevels > 1 
      ? availableHeight / (totalLevels) 
      : 80;
    const top = node.level * levelHeight + 10;
    
    const availableWidth = 100 - (padding * 2);
    const levelNodes = Math.pow(2, node.level);
    const nodeWidth = availableWidth / levelNodes;
    const left = padding + (node.position * availableWidth) + (nodeWidth / 2);
    
    return {
      top: `${top}px`,
      left: `${left}%`,
      transform: 'translateX(-50%)',
    };
  };

  // Get the maximum level for visualization
  const maxLevel = visualTree.reduce((max, node) => Math.max(max, node.level), 0);

  // Get the color for a node based on its state
  const getNodeColor = (node: HeapVisualNode<number>) => {
    if (node.isHighlighted) return 'ring-4 ring-yellow-500 bg-yellow-500';
    if (node.index === 0) return 'bg-purple-600';
    if (node.level === maxLevel) return 'bg-green-500';
    return 'bg-blue-500';
  };

  // Render tree edges
  const renderEdges = () => {
    const edges: JSX.Element[] = [];
    const size = items.length;
    
    for (let i = 0; i < size; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      
      const parentNode = visualTree.find(n => n.index === i);
      if (!parentNode) continue;
      
      const parentStyle = getNodeStyle(parentNode, maxLevel);
      
      // Left child edge
      if (left < size) {
        const childNode = visualTree.find(n => n.index === left);
        if (childNode) {
          const childStyle = getNodeStyle(childNode, maxLevel);
          edges.push(
            <line
              key={`edge-${i}-${left}`}
              x1={parentStyle.left}
              y1={parseFloat(parentStyle.top as string) + 35}
              x2={childStyle.left}
              y2={parseFloat(childStyle.top as string)}
              stroke="#94a3b8"
              strokeWidth="2"
              className="edge-line"
            />
          );
        }
      }
      
      // Right child edge
      if (right < size) {
        const childNode = visualTree.find(n => n.index === right);
        if (childNode) {
          const childStyle = getNodeStyle(childNode, maxLevel);
          edges.push(
            <line
              key={`edge-${i}-${right}`}
              x1={parentStyle.left}
              y1={parseFloat(parentStyle.top as string) + 35}
              x2={childStyle.left}
              y2={parseFloat(childStyle.top as string)}
              stroke="#94a3b8"
              strokeWidth="2"
              className="edge-line"
            />
          );
        }
      }
    }
    
    return edges;
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">
        Heap Data Structure
        <span className="ml-4 text-sm font-normal text-slate-500">
          ({heapType}-heap)
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
          }`}>
          Min-Heap (Smallest Root)
        </button>
      </div>
      {/* Heap Visualization */}
      <div className="relative mb-6 p-6 bg-slate-100 rounded-xl min-h-[300px]">
        {items.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400 py-8">
            Heap is empty. Insert values to build the heap.
          </div>
        ) : (
          <div className="relative w-full h-[300px]">
            {/* Render edges first */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {renderEdges()}
            </svg>
            
            {/* Render nodes */}
            <AnimatePresence>
              {visualTree.map((node) => {
                const style = getNodeStyle(node, maxLevel);
                const isRoot = node.index === 0;
                
                return (
                  <motion.div
                    key={`${node.index}-${node.value}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: 0
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 25,
                      delay: node.level * 0.05
                    }}
                    className={`
                      absolute w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold
                      transition-all duration-300
                      ${getNodeColor(node)}
                      ${node.isHighlighted ? 'scale-110 ring-4 ring-yellow-400' : ''}
                      ${animatingNode === node.index ? 'scale-110 ring-4 ring-green-400' : ''}
                      text-white shadow-lg
                    `}
                    style={style}
                  >
                    {node.value}
                    {isRoot && (
                      <div className="absolute -top-8 text-xs font-semibold text-purple-600 bg-white px-2 py-1 rounded-full shadow-sm">
                        ROOT
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
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-500">
        <span>Heap Size: {items.length}</span>
        <span>Type: {heapType.toUpperCase()}-HEAP</span>
        <span>Root: {items.length > 0 ? items[0] : 'None'}</span>
      </div>

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Heap Implementation" code={dataStructureCode.heap} activeLines={activeLines} />
      </div>
    </div>
  );
}