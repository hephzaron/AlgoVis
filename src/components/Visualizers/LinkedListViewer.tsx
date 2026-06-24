import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, Eye } from 'lucide-react';
import CodePanel from '../UI/CodePanel';
import { dataStructureCode } from '../../data/dataStructureCode';

/**
 * Represents a single node in a Linked List.
 * @template T
 */
class LinkedListNode<T> {
  /** @type {T} */
  value: T;
  /** @type {LinkedListNode<T> | null} */
  next: LinkedListNode<T> | null = null;

  /**
   * Creates an instance of LinkedListNode.
   * @param {T} value - The data value to store in the node.
   */
  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Represents a Singly Linked List data structure.
 * @template T
 */
class LinkedList<T> {
  /** @type {LinkedListNode<T> | null} @private */
  private _head: LinkedListNode<T> | null = null;
  /** @type {LinkedListNode<T> | null} @private */
  private _tail: LinkedListNode<T> | null = null;
  /** @type {number} @private */
  private _size: number = 0;

  /**
   * Appends a new value to the end of the linked list.
   * @param {T} value - The value to add.
   * @returns {void}
   */
  append(value: T): void {
    const newNode = new LinkedListNode(value);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    this._size++;
  }

  /**
   * Removes and returns the first node from the linked list.
   * @returns {T | undefined} The value of the removed node.
   */
  removeFirst(): T | undefined {
    if (!this._head) return undefined;

    const value = this._head.value;
    this._head = this._head.next;
    this._size--;

    if (!this._head) {
      this._tail = null;
    }

    return value;
  }

  /**
   * Returns the value at the front of the list without removing it.
   * @returns {T | undefined} The value at the front.
   */
  peek(): T | undefined {
    return this._head?.value;
  }

  /**
   * Returns true when the list contains no items.
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Returns the number of items currently in the list.
   * @returns {number}
   */
  size(): number {
    return this._size;
  }

  /**
   * Returns a copy of the list contents as an array.
   * @returns {T[]}
   */
  getItems(): T[] {
    const items: T[] = [];
    let current = this._head;
    while (current) {
      items.push(current.value);
      current = current.next;
    }
    return items;
  }

  /**
   * Clears all items from the list.
   * @returns {void}
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Inserts a value at a specific index.
   * @param {T} value - The value to insert.
   * @param {number} index - The position to insert at.
   * @returns {boolean} True if insertion was successful.
   */
  insertAt(value: T, index: number): boolean {
    if (index < 0 || index > this._size) return false;

    if (index === this._size) {
      this.append(value);
      return true;
    }

    const newNode = new LinkedListNode(value);

    if (index === 0) {
      newNode.next = this._head;
      this._head = newNode;
      if (!this._tail) this._tail = newNode;
      this._size++;
      return true;
    }

    let current = this._head;
    let currentIndex = 0;
    while (current && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (current) {
      newNode.next = current.next;
      current.next = newNode;
      this._size++;
      return true;
    }

    return false;
  }

  /**
   * Removes a value at a specific index.
   * @param {number} index - The position to remove from.
   * @returns {T | undefined} The removed value.
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;

    if (index === 0) {
      return this.removeFirst();
    }

    let current = this._head;
    let currentIndex = 0;
    while (current && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (current && current.next) {
      const value = current.next.value;
      current.next = current.next.next;
      this._size--;
      if (!current.next) this._tail = current;
      return value;
    }

    return undefined;
  }

  /**
   * Finds the index of a value in the list.
   * @param {T} value - The value to find.
   * @returns {number} The index of the value, or -1 if not found.
   */
  indexOf(value: T): number {
    let current = this._head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }
}

/**
 * Helper to find the line numbers for a function in the linked list code.
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
 * Visual component for interacting with a linked list.
 * Supports append, removeFirst, peek, insertAt, removeAt, and clear operations.
 */
export default function LinkedListVisualizer() {
  const [list] = useState(() => new LinkedList<number>());
  const [items, setItems] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const indexRef = useRef<HTMLInputElement | null>(null);

  const updateDisplay = useCallback(() => {
    setItems(list.getItems());
  }, [list]);

  const handleAppend = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    list.append(value);
    updateDisplay();
    setLastAction(`Appended: ${value}`);
    setHighlightIndex(items.length);
    setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'append', 2));
    setTimeout(() => {
      setHighlightIndex(null);
      setActiveLines([]);
    }, 1000);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemoveFirst = () => {
    const removed = list.removeFirst();
    if (removed !== undefined) {
      updateDisplay();
      setLastAction(`Removed first: ${removed}`);
      setHighlightIndex(0);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'removeFirst', 3));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction('List is empty!');
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'removeFirst', 3));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
    inputRef.current?.focus();
  };

  const handlePeek = () => {
    const front = list.peek();
    if (front !== undefined) {
      setLastAction(`First element: ${front}`);
      setHighlightIndex(0);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'peek', 1));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction('List is empty!');
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'peek', 1));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
    inputRef.current?.focus();
  };

  const handleInsertAt = () => {
    const value = parseInt(inputValue);
    const index = parseInt(indexValue);
    if (isNaN(value) || isNaN(index)) return;

    const success = list.insertAt(value, index);
    if (success) {
      updateDisplay();
      setLastAction(`Inserted ${value} at index ${index}`);
      setHighlightIndex(index);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'insertAt', 5));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'insertAt', 1));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
    setInputValue('');
    setIndexValue('');
    inputRef.current?.focus();
  };

  const handleRemoveAt = () => {
    const index = parseInt(indexValue);
    if (isNaN(index)) return;

    const removed = list.removeAt(index);
    if (removed !== undefined) {
      updateDisplay();
      setLastAction(`Removed ${removed} at index ${index}`);
      setHighlightIndex(index);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'removeAt', 4));
      setTimeout(() => {
        setHighlightIndex(null);
        setActiveLines([]);
      }, 1000);
    } else {
      setLastAction(`Invalid index: ${index}`);
      setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'removeAt', 1));
      setTimeout(() => {
        setLastAction(null);
        setActiveLines([]);
      }, 1500);
    }
    setIndexValue('');
    inputRef.current?.focus();
  };

  const handleClear = () => {
    list.clear();
    updateDisplay();
    setLastAction('List cleared');
    setActiveLines(getFunctionLines(dataStructureCode.linkedList, 'clear', 1));
    setTimeout(() => {
      setLastAction(null);
      setActiveLines([]);
    }, 1000);
    inputRef.current?.focus();
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Singly Linked List</h2>

      {/* List Visualization */}
      <div className="mb-6 p-6 bg-slate-100 rounded-xl min-h-[200px] flex items-center justify-start gap-2 flex-wrap">
        <AnimatePresence>
          {items.length === 0 ? (
            <div className="w-full text-center text-slate-400 py-8">
              List is empty. Append items to see them here.
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold text-slate-500 mr-2">HEAD →</div>
              {items.map((item, idx) => (
                <motion.div
                  key={`${idx}-${item}`}
                  initial={{ scale: 0, opacity: 0, x: -50 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0, opacity: 0, x: 50 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-center gap-1"
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
                  {idx < items.length - 1 && (
                    <div className="text-slate-400 font-bold">→</div>
                  )}
                  {idx === 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-green-600">
                      HEAD
                    </div>
                  )}
                  {idx === items.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600">
                      TAIL
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="text-xs font-semibold text-slate-500 ml-2">← TAIL</div>
            </>
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
          onKeyPress={(e) => e.key === 'Enter' && handleAppend()}
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
        <button onClick={handleAppend} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Append
        </button>
        <button onClick={handleRemoveFirst} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Remove First
        </button>
        <button onClick={handlePeek} className="btn-secondary flex items-center gap-2">
          <Eye size={18} /> Peek
        </button>
        <button onClick={handleInsertAt} className="btn-secondary flex items-center gap-2">
          <Plus size={18} /> Insert At
        </button>
        <button onClick={handleRemoveAt} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Remove At
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

      {/* List Info */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-500">
        <span>List Size: {items.length}</span>
        <span>Dynamic Array Implementation</span>
      </div>

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Linked List" code={dataStructureCode.linkedList} activeLines={activeLines} />
      </div>
    </div>
  );
}