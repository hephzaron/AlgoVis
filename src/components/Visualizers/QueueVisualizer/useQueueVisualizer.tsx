import { useState, useCallback, useRef } from 'react';
import { Queue } from './Queue';
import { getFunctionLines } from '../../../utils/helpers';
import { dataStructureCode } from '../../../data/dataStructureCode';

interface UseQueueVisualizerReturn {
  items: number[];
  inputValue: string;
  lastAction: string | null;
  highlightIndex: number | null;
  activeLines: number[];
  inputRef: React.RefObject<HTMLInputElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnqueue: () => void;
  handleDequeue: () => void;
  handlePeek: () => void;
  handleClear: () => void;
}

export function useQueueVisualizer(): UseQueueVisualizerReturn {
  const [queue] = useState(() => new Queue());
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const updateDisplay = useCallback(() => {
    setItems(queue.getItems());
  }, [queue]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
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
    inputRef.current?.focus();
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
    inputRef.current?.focus();
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
    inputRef.current?.focus();
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
    inputRef.current?.focus();
  };
  
  return {
    items,
    inputValue,
    lastAction,
    highlightIndex,
    activeLines,
    inputRef,
    handleInputChange,
    handleEnqueue,
    handleDequeue,
    handlePeek,
    handleClear
  };
}