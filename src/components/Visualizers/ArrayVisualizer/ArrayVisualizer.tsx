import { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Eye, Edit, ArrowUp, ArrowDown, 
  RefreshCw, RotateCw, SortAsc, X,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import CodePanel from '../../UI/CodePanel';
import { dataStructureCode } from '../../../data/dataStructureCode';
import { ArrayDS } from './Array';
import {
  calculateElementSize,
  getArrayElementStyle,
  calculateArrayLayout,
  getArrayElementKey,
  formatArrayValue,
  getIndexStatus,
  type ArrayVisualizationConfig,
} from './ArrayVisualizerOptimizer';
import { InfoButton } from '../../Info/InfoButton';

/**
 * Helper to find the line numbers for a function in the array code
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
 * Visualization configuration
 */
const VISUAL_CONFIG: ArrayVisualizationConfig = {
  elementsPerRow: 12,
  elementSize: 60,
  elementPadding: 8,
  maxHeight: 400,
};

/**
 * Visual component for interacting with an Array data structure
 */
export default function ArrayVisualizer() {
  // State
  const [array] = useState(() => new ArrayDS<number>(8));
  const [items, setItems] = useState<number[]>([]);
  const [capacity, setCapacity] = useState<number>(8);
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const indexRef = useRef<HTMLInputElement | null>(null);

  // Update display
  const updateDisplay = useCallback(() => {
    setItems(array.getItems());
    setCapacity(array.getCapacity());
  }, [array]);

  // Pagination
  const elementsPerPage = 10;
  const totalPages = Math.ceil(items.length / elementsPerPage);
  const startIndex = currentPage * elementsPerPage;
  const endIndex = Math.min(startIndex + elementsPerPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  // Push value
  const handlePush = useCallback(() => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const insertIndex = array.push(value);
    updateDisplay();
    setLastAction(`Pushed: ${value} at index ${insertIndex}`);
    setHighlightIndices([insertIndex]);
    setAnimatingIndex(insertIndex);
    setActiveLines(getFunctionLines(dataStructureCode.array, 'push', 3));
    
    // Go to last page
    setCurrentPage(Math.floor(insertIndex / elementsPerPage));
    
    setTimeout(() => {
      setHighlightIndices([]);
      setAnimatingIndex(null);
      setActiveLines([]);
    }, 1500);
    
    setInputValue('');
    inputRef.current?.focus();
  }, [inputValue, array, updateDisplay]);

  // Pop value
  const handlePop = useCallback(() => {
    const value = array.pop();
    if (value !== undefined) {
      updateDisplay();
      setLastAction(`Popped: ${value}`);
      setHighlightIndices([items.length - 1]);
      setActiveLines(getFunctionLines(dataStructureCode.array, 'pop', 3));
      setTimeout(() => {
        setHighlightIndices([]);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction('Array is empty!');
      setTimeout(() => setLastAction(null), 1500);
    }
    inputRef.current?.focus();
  }, [array, updateDisplay, items.length]);

  // Insert at index
  const handleInsertAt = useCallback(() => {
    const value = parseInt(inputValue);
    const index = parseInt(indexValue);
    if (isNaN(value) || isNaN(index)) return;

    const success = array.insertAt(value, index);
    if (success) {
      updateDisplay();
      setLastAction(`Inserted ${value} at index ${index}`);
      setHighlightIndices([index]);
      setAnimatingIndex(index);
      setActiveLines(getFunctionLines(dataStructureCode.array, 'insertAt', 5));
      
      // Go to page containing the index
      setCurrentPage(Math.floor(index / elementsPerPage));
      
      setTimeout(() => {
        setHighlightIndices([]);
        setAnimatingIndex(null);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setTimeout(() => setLastAction(null), 1500);
    }
    setInputValue('');
    setIndexValue('');
    inputRef.current?.focus();
  }, [inputValue, indexValue, array, updateDisplay]);

  // Remove at index
  const handleRemoveAt = useCallback(() => {
    const index = parseInt(indexValue);
    if (isNaN(index)) return;

    const value = array.removeAt(index);
    if (value !== undefined) {
      updateDisplay();
      setLastAction(`Removed ${value} at index ${index}`);
      setHighlightIndices([index]);
      setActiveLines(getFunctionLines(dataStructureCode.array, 'removeAt', 4));
      setTimeout(() => {
        setHighlightIndices([]);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setTimeout(() => setLastAction(null), 1500);
    }
    setIndexValue('');
    inputRef.current?.focus();
  }, [indexValue, array, updateDisplay]);

  // Get value at index
  const handleGet = useCallback(() => {
    const index = parseInt(indexValue);
    if (isNaN(index)) return;

    const value = array.get(index);
    if (value !== undefined) {
      setLastAction(`Value at index ${index}: ${value}`);
      setHighlightIndices([index]);
      setActiveLines(getFunctionLines(dataStructureCode.array, 'get', 1));
      setTimeout(() => {
        setHighlightIndices([]);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setTimeout(() => setLastAction(null), 1500);
    }
    setIndexValue('');
    inputRef.current?.focus();
  }, [indexValue, array]);

  // Set value at index
  const handleSet = useCallback(() => {
    const value = parseInt(inputValue);
    const index = parseInt(indexValue);
    if (isNaN(value) || isNaN(index)) return;

    const success = array.set(index, value);
    if (success) {
      updateDisplay();
      setLastAction(`Set index ${index} to ${value}`);
      setHighlightIndices([index]);
      setAnimatingIndex(index);
      setActiveLines(getFunctionLines(dataStructureCode.array, 'set', 1));
      setTimeout(() => {
        setHighlightIndices([]);
        setAnimatingIndex(null);
        setActiveLines([]);
      }, 1500);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setTimeout(() => setLastAction(null), 1500);
    }
    setInputValue('');
    setIndexValue('');
    inputRef.current?.focus();
  }, [inputValue, indexValue, array, updateDisplay]);

  // Clear array
  const handleClear = useCallback(() => {
    array.clear();
    updateDisplay();
    setLastAction('Array cleared');
    setCurrentPage(0);
    setActiveLines(getFunctionLines(dataStructureCode.array, 'clear', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
    inputRef.current?.focus();
  }, [array, updateDisplay]);

  // Batch insert
  const handleBatchInsert = useCallback(() => {
    const randomValues = Array.from({ length: 5 }, () => 
      Math.floor(Math.random() * 100)
    );
    const startIndex = items.length;
    randomValues.forEach(value => array.push(value));
    updateDisplay();
    setLastAction(`Inserted: ${randomValues.join(', ')}`);
    setHighlightIndices(
      Array.from({ length: randomValues.length }, (_, i) => startIndex + i)
    );
    setTimeout(() => {
      setHighlightIndices([]);
      setLastAction(null);
    }, 2000);
    inputRef.current?.focus();
  }, [array, updateDisplay, items.length]);

  // Sort array
  const handleSort = useCallback(() => {
    array.sort();
    updateDisplay();
    setLastAction('Array sorted');
    setActiveLines(getFunctionLines(dataStructureCode.array, 'sort', 3));
    setTimeout(() => {
      setActiveLines([]);
      setLastAction(null);
    }, 1500);
    inputRef.current?.focus();
  }, [array, updateDisplay]);

  // Reverse array
  const handleReverse = useCallback(() => {
    array.reverse();
    updateDisplay();
    setLastAction('Array reversed');
    setActiveLines(getFunctionLines(dataStructureCode.array, 'reverse', 3));
    setTimeout(() => {
      setActiveLines([]);
      setLastAction(null);
    }, 1500);
    inputRef.current?.focus();
  }, [array, updateDisplay]);

  // Calculate visual properties
  const elementSize = useMemo(() => {
    return calculateElementSize(items.length, VISUAL_CONFIG);
  }, [items.length]);

  const layout = useMemo(() => {
    return calculateArrayLayout(items.length, elementSize, VISUAL_CONFIG);
  }, [items.length, elementSize]);

  // Render array elements
  const renderArrayElements = () => {
    const elements: JSX.Element[] = [];
    const totalElements = items.length;
    
    // Render visible elements
    for (let i = 0; i < visibleItems.length; i++) {
      const globalIndex = startIndex + i;
      const value = visibleItems[i];
      const style = getArrayElementStyle(
        value,
        globalIndex,
        highlightIndices,
        elementSize
      );
      const status = getIndexStatus(globalIndex, totalElements, capacity);
      const isEmpty = status === 'empty' || status === 'undefined';
      
      elements.push(
        <motion.div
          key={getArrayElementKey(globalIndex)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            delay: i * 0.05
          }}
          className={`
            relative rounded-xl flex items-center justify-center font-bold
            transition-all duration-300
            ${style.backgroundColor}
            ${style.borderColor}
            ${style.className}
            ${isEmpty ? 'border-2 border-dashed' : 'border-2'}
            ${animatingIndex === globalIndex ? 'ring-4 ring-green-400 scale-110' : ''}
            ${highlightIndices.includes(globalIndex) ? 'ring-4 ring-yellow-400' : ''}
            text-white shadow-lg
          `}
          style={{
            width: `${style.width}px`,
            height: `${style.height}px`,
            fontSize: `${style.fontSize}px`,
            minWidth: `${style.width}px`,
            minHeight: `${style.height}px`,
          }}
        >
          {isEmpty ? '∅' : formatArrayValue(value)}
          
          {/* Index label */}
          <div className={`
            absolute -bottom-6 text-xs font-mono font-semibold
            ${highlightIndices.includes(globalIndex) 
              ? 'text-yellow-600' 
              : 'text-slate-400'}
          `}>
            [{globalIndex}]
          </div>
          
          {/* Animation indicator */}
          {animatingIndex === globalIndex && (
            <div className="absolute -top-8 text-xs font-semibold text-green-600 bg-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
              ← NEW
            </div>
          )}
        </motion.div>
      );
    }
    
    return elements;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📊 Array</h2>
        <InfoButton noteFile="array.md" title="Array" />
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Array Data Structure
        <span className="ml-4 text-sm font-normal text-slate-500">
          ({items.length} elements · capacity: {capacity})
        </span>
      </h2>

      {/* Array Visualization */}
      <div 
        className="relative mb-6 p-4 bg-slate-100 rounded-xl overflow-hidden"
        style={{ minHeight: `${layout.containerHeight + 40}px` }}
      >
        {items.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400 py-8">
            Array is empty. Push values to see them here.
            <span className="ml-2 text-sm">(Capacity: {capacity})</span>
          </div>
        ) : (
          <>
            <div 
              className="relative w-full flex flex-wrap justify-center gap-2"
              style={{ 
                padding: '8px',
                minHeight: `${layout.containerHeight}px`,
                alignContent: 'flex-start'
              }}
            >
              <AnimatePresence>
                {renderArrayElements()}
              </AnimatePresence>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-slate-500">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
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
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={indexRef}
          type="number"
          value={indexValue}
          onChange={(e) => setIndexValue(e.target.value)}
          placeholder="Index"
          className="w-24 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex flex-wrap gap-2">
          <button onClick={handlePush} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Push
          </button>
          <button onClick={handlePop} className="btn-secondary flex items-center gap-2">
            <Trash2 size={18} /> Pop
          </button>
          <button onClick={handleGet} className="btn-secondary flex items-center gap-2">
            <Eye size={18} /> Get
          </button>
          <button onClick={handleSet} className="btn-secondary flex items-center gap-2">
            <Edit size={18} /> Set
          </button>
          <button onClick={handleInsertAt} className="btn-secondary flex items-center gap-2">
            <ArrowUp size={18} /> Insert
          </button>
          <button onClick={handleRemoveAt} className="btn-secondary flex items-center gap-2">
            <ArrowDown size={18} /> Remove
          </button>
          <button onClick={handleSort} className="btn-secondary flex items-center gap-2">
            <SortAsc size={18} /> Sort
          </button>
          <button onClick={handleReverse} className="btn-secondary flex items-center gap-2">
            <RotateCw size={18} /> Reverse
          </button>
          <button onClick={handleBatchInsert} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={18} /> Batch
          </button>
          <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
            <X size={18} /> Clear
          </button>
        </div>
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

      {/* Array Info */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap justify-between text-sm text-slate-500 gap-2">
        <span>Size: {items.length}</span>
        <span>Capacity: {capacity}</span>
        <span>Element Size: {Math.round(elementSize)}px</span>
        <span>Rows: {layout.rows}</span>
        <span>Fill Ratio: {items.length > 0 ? Math.round((items.length / capacity) * 100) : 0}%</span>
      </div>

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Array Implementation" code={dataStructureCode.array} activeLines={activeLines} />
      </div>
    </div>
  );
}