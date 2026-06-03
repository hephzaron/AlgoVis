import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, ArrowRight } from 'lucide-react';
import CodePanel from '../UI/CodePanel';
import { dataStructureCode } from '../../data/dataStructureCode';

/**
 * Simple queue implementation used by the queue visualizer.
 * Implements FIFO operations and exposes the item list.
 */
class Queue {
  private items: number[] = [];
  
  /**
   * Adds an item to the back of the queue.
   * @param item The value to enqueue.
   */
  enqueue(item: number): void {
    this.items.push(item);
  }
  
  /**
   * Removes and returns the item at the front of the queue.
   */
  dequeue(): number | undefined {
    return this.items.shift();
  }
  
  /**
   * Returns the front item without removing it.
   */
  peek(): number | undefined {
    return this.items[0];
  }
  
  /**
   * Returns true when the queue contains no items.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  /**
   * Returns the number of items currently in the queue.
   */
  size(): number {
    return this.items.length;
  }
  
  /**
   * Returns a copy of the queue contents.
   */
  getItems(): number[] {
    return [...this.items];
  }
  
  /**
   * Clears all items from the queue.
   */
  clear(): void {
    this.items = [];
  }
}

/**
 * Helper to find the line numbers for a function in the queue code.
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
 * Visual component for interacting with a queue.
 * Supports enqueue, dequeue, peek, and clear operations.
 */
export default function QueueVisualizer() {
  const [queue] = useState(() => new Queue());
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  
  const updateDisplay = useCallback(() => {
    setItems(queue.getItems());
  }, [queue]);
  
  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    queue.enqueue(value);
    updateDisplay();
    setLastAction(`Enqueued: ${value}`);
    setHighlightIndex(items.length);
    setActiveLines(getFunctionLines(dataStructureCode.queue, 'enqueue', 1));
    setTimeout(() => {
      setHighlightIndex(null);
      setActiveLines([]);
    }, 1000);
    setInputValue('');
  };
  
  const handleDequeue = () => {
    const dequeued = queue.dequeue();
    if (dequeued !== undefined) {
      updateDisplay();
      setLastAction(`Dequeued: ${dequeued}`);
      setHighlightIndex(0);
      setActiveLines(getFunctionLines(dataStructureCode.queue, 'dequeue', 3));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction('Queue is empty!');
      setActiveLines(getFunctionLines(dataStructureCode.queue, 'dequeue', 3));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
  };
  
  const handlePeek = () => {
    const front = queue.peek();
    if (front !== undefined) {
      setLastAction(`Front element: ${front}`);
      setHighlightIndex(0);
      setActiveLines(getFunctionLines(dataStructureCode.queue, 'front', 2));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction('Queue is empty!');
      setActiveLines(getFunctionLines(dataStructureCode.queue, 'front', 2));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
  };
  
  const handleClear = () => {
    queue.clear();
    updateDisplay();
    setLastAction('Queue cleared');
    setActiveLines(getFunctionLines(dataStructureCode.queue, '__init__', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
  };
  
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Queue (FIFO)</h2>
      
      {/* Queue Visualization */}
      <div className="mb-6 p-6 bg-slate-100 rounded-xl min-h-[200px] flex items-center justify-start gap-2 flex-wrap">
        <AnimatePresence>
          {items.length === 0 ? (
            <div className="w-full text-center text-slate-400 py-8">
              Queue is empty. Enqueue items to see them here.
            </div>
          ) : (
            items.map((item, idx) => (
              <motion.div
                key={`${idx}-${item}`}
                initial={{ scale: 0, opacity: 0, x: -50 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: 50 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative`}
              >
                <div
                  className={`
                    w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold
                    transition-all duration-300
                    ${highlightIndex === idx ? 'ring-4 ring-yellow-500 scale-110' : ''}
                    ${idx === 0 ? 'bg-green-500' : 'bg-blue-500'}
                    text-white shadow-lg
                  `}
                >
                  {item}
                </div>
                {idx === 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-green-600">
                    FRONT
                  </div>
                )}
                {idx === items.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600">
                    REAR
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      {/* Arrow indicator */}
      {items.length > 0 && (
        <div className="flex justify-between items-center mb-6 text-sm text-slate-500 px-4">
          <span>← Dequeue from front</span>
          <ArrowRight size={20} />
          <span>Enqueue to rear →</span>
        </div>
      )}
      
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
          placeholder="Enter value"
          className="flex-1 min-w-[150px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleEnqueue} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Enqueue
        </button>
        <button onClick={handleDequeue} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Dequeue
        </button>
        <button onClick={handlePeek} className="btn-secondary">
          Peek
        </button>
        <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={18} /> Clear
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
      
      {/* Queue Info */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-500">
        <span>Queue Size: {items.length}</span>
        <span>FIFO (First In, First Out)</span>
      </div>

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Queue" code={dataStructureCode.queue} activeLines={activeLines} />
      </div>
    </div>
  );
}