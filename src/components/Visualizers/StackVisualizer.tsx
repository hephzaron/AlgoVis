import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, Eye } from 'lucide-react';
import CodePanel from '../UI/CodePanel';
import { dataStructureCode } from '../../data/dataStructureCode';
import { InfoHint } from '../Info/InfoHint';
import { InfoButton } from '../Info/InfoButton';

/**
 * Simple stack implementation used by the stack visualizer.
 * Supports push/pop/peek semantics and exposes the current item list.
 */
class Stack {
  private items: number[] = [];
  
  /**
   * Pushes a new value onto the stack.
   * @param item The value to push.
   */
  push(item: number): void {
    this.items.push(item);
  }
  
  /**
   * Removes and returns the top value from the stack.
   */
  pop(): number | undefined {
    return this.items.pop();
  }
  
  /**
   * Retrieves the top value without removing it.
   */
  peek(): number | undefined {
    return this.items[this.items.length - 1];
  }
  
  /**
   * Checks whether the stack is empty.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  /**
   * Returns the current number of items in the stack.
   */
  size(): number {
    return this.items.length;
  }
  
  /**
   * Returns a shallow copy of the stack contents.
   */
  getItems(): number[] {
    return [...this.items];
  }
  
  /**
   * Empties the stack.
   */
  clear(): void {
    this.items = [];
  }
}

/**
 * Visual component for interacting with and animating a stack.
 * Users can push, pop, peek, and clear the stack while watching the UI update.
 */
export default function StackVisualizer() {
  const [stack] = useState(() => new Stack());
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  
  const updateDisplay = useCallback(() => {
    setItems(stack.getItems());
  }, [stack]);

  function getFunctionLines(code: string, fnName: string, bodyLines = 1) {
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
  
  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      inputRef.current?.focus();
      return;
    }
    
    stack.push(value);
    const newItems = stack.getItems();
    setItems(newItems);
    setLastAction(`Pushed: ${value}`);
    setHighlightIndex(newItems.length - 1);
    setActiveLines(getFunctionLines(dataStructureCode.stack, 'push', 1));
    setTimeout(() => setHighlightIndex(null), 1000);
    setTimeout(() => setActiveLines([]), 1200);
    setInputValue('');
    inputRef.current?.focus();
  };
  
  const handlePop = () => {
    const popped = stack.pop();
    if (popped !== undefined) {
      const newItems = stack.getItems();
      setItems(newItems);
      setLastAction(`Popped: ${popped}`);
      setHighlightIndex(newItems.length - 1);
      setActiveLines(getFunctionLines(dataStructureCode.stack, 'pop', 2));
      setTimeout(() => setHighlightIndex(null), 1000);
      setTimeout(() => setActiveLines([]), 1200);
    } else {
      setLastAction('Stack is empty!');
      setTimeout(() => setLastAction(null), 1500);
    }
  };
  
  const handlePeek = () => {
    const top = stack.peek();
    if (top !== undefined) {
      setLastAction(`Top element: ${top}`);
      setHighlightIndex(items.length - 1);
      setTimeout(() => setHighlightIndex(null), 1000);
    } else {
      setLastAction('Stack is empty!');
      setTimeout(() => setLastAction(null), 1500);
    }
  };
  
  const handleClear = () => {
    stack.clear();
    updateDisplay();
    setLastAction('Stack cleared');
      setActiveLines(getFunctionLines(dataStructureCode.stack, 'is_empty', 1));
      setTimeout(() => setLastAction(null), 1000);
      setTimeout(() => setActiveLines([]), 1200);
  };

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
        <InfoButton noteFile="stack.md" title="Stack" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Stack (LIFO)</h2>
      
      {/* Top indicator */}
      {items.length > 0 && (
        <div className="text-center text-sm text-purple-600 font-semibold mb-4">
          ↑ TOP ↑
        </div>
      )}

      {/* Stack Visualization */}
      <div className="mb-6 p-6 bg-slate-100 rounded-xl min-h-[300px] flex flex-col-reverse items-center gap-2">
        <AnimatePresence>
          {items.length === 0 ? (
            <div className="w-full text-center text-slate-400 py-8">
              Stack is empty. Push items to see them here.
            </div>
          ) : (
            items.map((item, idx) => {
              return (
                <motion.div
                  key={`${idx}-${item}`}
                  initial={{ scale: 0, opacity: 0, y: -50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 50 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full"
                >
                  <div
                    className={`
                      w-full max-w-md mx-auto py-4 rounded-xl flex items-center justify-center text-2xl font-bold
                      transition-all duration-300
                      ${highlightIndex === idx ? 'ring-4 ring-yellow-500 scale-105' : ''}
                      ${idx === items.length - 1 ? 'bg-purple-500' : 'bg-blue-500'}
                      text-white shadow-lg
                    `}
                  >
                    {item}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handlePush()}
          placeholder="Enter value"
          className="flex-1 min-w-[150px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handlePush} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Push
        </button>
        <button onClick={handlePop} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Pop
        </button>
        <button onClick={handlePeek} className="btn-secondary flex items-center gap-2">
          <Eye size={18} /> Peek
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
      
      {/* Stack Info */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-500">
        <span>Stack Size: {items.length}</span>
        <span>LIFO (Last In, First Out)</span>
      </div>

      <div className="mt-6">
        <CodePanel title="Stack (Python)" code={dataStructureCode.stack} activeLines={activeLines} codeContext="operation" />
      </div>
    </div>
  );
}