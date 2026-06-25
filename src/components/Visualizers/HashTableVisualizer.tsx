import { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, Trash2, Search, RotateCcw } from 'lucide-react';
import CodePanel from '../UI/CodePanel';
import { dataStructureCode } from '../../data/dataStructureCode';

/**
 * Represents a key-value pair entry in a hash table bucket.
 * @typedef {[string, number]} Entry
 * @property {string} 0 - The key string
 * @property {number} 1 - The value number
 */

/**
 * Simple hash table implementation for visualization purposes.
 * Uses separate chaining for collision resolution with buckets stored as arrays.
 * Implements a basic hash function and supports CRUD operations.
 * 
 * @class HashTable
 * @example
 * const table = new HashTable();
 * table.set('apple', 5);
 * table.set('banana', 10);
 * const value = table.get('apple'); // returns 5
 */
class HashTable {
  /** 
   * Internal storage using Map for buckets.
   * Key: bucket index (number), Value: array of [key, value] entries
   * @private
   * @type {Map<number, [string, number][]>}
   */
  private buckets: Map<number, [string, number][]> = new Map();
  
  /** 
   * Number of buckets in the hash table.
   * @private
   * @type {number}
   */
  private size: number = 16;

  /**
   * Inserts or updates a key-value pair in the hash table.
   * If the key already exists, its value is updated.
   * 
   * @param {string} key - The key to insert or update
   * @param {number} value - The value to associate with the key
   * @returns {void}
   * 
   * @example
   * hashTable.set('username', 12345);
   * hashTable.set('username', 67890); // Updates existing key
   */
  set(key: string, value: number): void {
    const idx = this.hash(key);
    if (!this.buckets.has(idx)) {
      this.buckets.set(idx, []);
    }
    const bucket = this.buckets.get(idx)!;
    const existing = bucket.findIndex(([k]) => k === key);
    if (existing >= 0) {
      bucket[existing] = [key, value];
    } else {
      bucket.push([key, value]);
    }
  }

  /**
   * Retrieves the value associated with a given key.
   * 
   * @param {string} key - The key to look up
   * @returns {number | undefined} The value if found, undefined otherwise
   * 
   * @example
   * const value = hashTable.get('username');
   * if (value !== undefined) {
   *   console.log(`Found: ${value}`);
   * }
   */
  get(key: string): number | undefined {
    const idx = this.hash(key);
    const bucket = this.buckets.get(idx);
    if (!bucket) return undefined;
    const entry = bucket.find(([k]) => k === key);
    return entry ? entry[1] : undefined;
  }

  /**
   * Removes a key-value pair from the hash table.
   * 
   * @param {string} key - The key to delete
   * @returns {boolean} True if the key was found and deleted, false otherwise
   * 
   * @example
   * const deleted = hashTable.delete('username');
   * if (deleted) {
   *   console.log('Key was removed');
   * }
   */
  delete(key: string): boolean {
    const idx = this.hash(key);
    const bucket = this.buckets.get(idx);
    if (!bucket) return false;
    const index = bucket.findIndex(([k]) => k === key);
    if (index >= 0) {
      bucket.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Computes the bucket index for a given key using a simple hash function.
   * Uses the Java hashCode algorithm variant with bit shifting.
   * 
   * @private
   * @param {string} key - The key to hash
   * @returns {number} The bucket index (0 to size-1)
   * 
   * @example
   * const idx = hashTable.hash('apple'); // returns a number between 0-15
   */
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.size;
  }

  /**
   * Returns all entries in the hash table for visualization purposes.
   * 
   * @returns {Array<[number, [string, number][]]>} Array of [bucketIndex, entries] pairs
   * 
   * @example
   * const entries = hashTable.getEntries();
   * // Returns: [[0, [['key1', 1], ['key2', 2]]], [1, [['key3', 3]]]]
   */
  getEntries(): Array<[number, [string, number][]]> {
    return Array.from(this.buckets.entries());
  }

  /**
   * Removes all entries from the hash table.
   * 
   * @returns {void}
   * 
   * @example
   * hashTable.clear();
   * // hashTable is now empty
   */
  clear(): void {
    this.buckets.clear();
  }
}

/**
 * Finds the line numbers for a function in the hash table code.
 * Used for highlighting the relevant code section in the CodePanel.
 * 
 * @param {string} code - The full source code string
 * @param {string} fnName - The name of the function to locate
 * @param {number} [bodyLines=1] - Number of body lines to include after the function definition
 * @returns {number[]} Array of 1-indexed line numbers to highlight
 * 
 * @example
 * const lines = getFunctionLines(code, 'set', 8);
 * // Returns [25, 26, 27, 28, 29, 30, 31, 32, 33] for the set function
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
 * React component for visualizing and interacting with a hash table.
 * Supports set, get, delete, and clear operations with visual feedback.
 * 
 * @component
 * @returns {JSX.Element} Rendered hash table visualizer component
 * 
 * @example
 * // In a parent component
 * <HashTableVisualizer />
 */
function HashTableVisualizer() {
  /** 
   * State for the hash table instance.
   * Initialized once using lazy initialization.
   * @type {[HashTable, React.Dispatch<React.SetStateAction<HashTable>>]}
   */
  const [hashTable] = useState(() => new HashTable());
  
  /** 
   * State for the current entries to display.
   * @type {[Array<[number, [string, number][]]>, React.Dispatch<React.SetStateAction<Array<[number, [string, number][]]>>>]}
   */
  const [entries, setEntries] = useState<Array<[number, [string, number][]]>>([]);
  
  /** 
   * State for the key input field.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [keyInput, setKeyInput] = useState('');
  
  /** 
   * State for the value input field.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [valueInput, setValueInput] = useState('');
  
  /** 
   * State for the status message displayed to the user.
   * @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]}
   */
  const [message, setMessage] = useState<string | null>(null);
  
  /** 
   * State for the active lines to highlight in the code panel.
   * @type {[number[], React.Dispatch<React.SetStateAction<number[]>>]}
   */
  const [activeLines, setActiveLines] = useState<number[]>([]);

  /** 
   * Ref for the key input field to enable auto-focus.
   * @type {React.RefObject<HTMLInputElement>}
   */
  const keyInputRef = useRef<HTMLInputElement>(null);
  
  /** 
   * Ref for the value input field to enable auto-focus.
   * @type {React.RefObject<HTMLInputElement>}
   */
  const valueInputRef = useRef<HTMLInputElement>(null);

  /**
   * Updates the display with the current state of the hash table.
   * Memoized to prevent unnecessary re-renders.
   * 
   * @type {() => void}
   */
  const updateDisplay = useCallback(() => {
    setEntries(hashTable.getEntries());
  }, [hashTable]);

  /**
   * Auto-focus the key input field when the component mounts.
   * This enables immediate typing without clicking the input first.
   */
  useEffect(() => {
    keyInputRef.current?.focus();
  }, []);

  /**
   * Handles the set operation:
   * - Inserts or updates a key-value pair
   * - Updates the display
   * - Shows feedback message
   * - Highlights relevant code
   * - Resets input fields
   * - Auto-focuses the key input for continuous entry
   * 
   * @returns {void}
   */
  const handleSet = () => {
    if (!keyInput.trim()) return;
    const value = parseInt(valueInput) || 0;
    hashTable.set(keyInput, value);
    updateDisplay();
    setMessage(`Set: ${keyInput} = ${value}`);
    setActiveLines(getFunctionLines(dataStructureCode.hash, 'set', 8));
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
    setKeyInput('');
    setValueInput('');
    // Focus the key input after a short delay to ensure smooth UX
    setTimeout(() => {
      keyInputRef.current?.focus();
    }, 50);
  };

  /**
   * Handles the get operation:
   * - Retrieves a value by key
   * - Shows found or not found message
   * - Highlights relevant code
   * - Keeps the current key and value for reference
   * - Auto-focuses the key input for continuous entry
   * 
   * @returns {void}
   */
  const handleGet = () => {
    if (!keyInput.trim()) return;
    const value = hashTable.get(keyInput);
    if (value !== undefined) {
      setMessage(`Found: ${keyInput} = ${value}`);
      // Auto-fill the value input with the retrieved value for quick editing
      setValueInput(value.toString());
    } else {
      setMessage(`Not found: ${keyInput}`);
    }
    setActiveLines(getFunctionLines(dataStructureCode.hash, 'get', 5));
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
    // Focus the key input after a short delay
    setTimeout(() => {
      keyInputRef.current?.focus();
    }, 50);
  };

  /**
   * Handles the delete operation:
   * - Removes a key-value pair
   * - Updates the display
   * - Shows success or failure message
   * - Highlights relevant code
   * - Resets input fields
   * - Auto-focuses the key input for continuous entry
   * 
   * @returns {void}
   */
  const handleDelete = () => {
    if (!keyInput.trim()) return;
    const deleted = hashTable.delete(keyInput);
    updateDisplay();
    setMessage(deleted ? `Deleted: ${keyInput}` : `Not found: ${keyInput}`);
    setActiveLines(getFunctionLines(dataStructureCode.hash, 'delete', 6));
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
    setKeyInput('');
    setValueInput('');
    // Focus the key input after a short delay
    setTimeout(() => {
      keyInputRef.current?.focus();
    }, 50);
  };

  /**
   * Handles the clear operation:
   * - Removes all entries
   * - Updates the display
   * - Shows confirmation message
   * - Resets input fields
   * - Auto-focuses the key input for continuous entry
   * 
   * @returns {void}
   */
  const handleClear = () => {
    hashTable.clear();
    updateDisplay();
    setMessage('Hash table cleared');
    setTimeout(() => setMessage(null), 1000);
    setKeyInput('');
    setValueInput('');
    // Focus the key input after a short delay
    setTimeout(() => {
      keyInputRef.current?.focus();
    }, 50);
  };

  /**
   * Handles keyboard events on the key input field.
   * - Enter: Triggers the set operation
   * - Tab: Moves focus to the value input
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event
   * @returns {void}
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If value is empty, focus value input
      if (!valueInput.trim()) {
        valueInputRef.current?.focus();
      } else {
        handleSet();
      }
    }
  };

  /**
   * Handles keyboard events on the value input field.
   * - Enter: Triggers the set operation
   * - Shift+Enter: Moves focus back to key input
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event
   * @returns {void}
   */
  const handleValueKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Enter: Go back to key input
        keyInputRef.current?.focus();
      } else if (keyInput.trim()) {
        // Enter: Perform set operation
        handleSet();
      } else {
        // If key is empty, focus key input
        keyInputRef.current?.focus();
      }
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Hash Table</h2>

      {/* Controls Section */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/** Key input field - auto-focused for continuous entry */}
        <input
          ref={keyInputRef}
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter key"
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/** Value input field - auto-focused when needed */}
        <input
          ref={valueInputRef}
          type="number"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={handleValueKeyPress}
          placeholder="Value (optional)"
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/** Operation buttons */}
        <button onClick={handleSet} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Set
        </button>
        <button onClick={handleGet} className="btn-secondary flex items-center gap-2">
          <Search size={18} /> Get
        </button>
        <button onClick={handleDelete} className="btn-secondary flex items-center gap-2">
          <Trash2 size={18} /> Delete
        </button>
        <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={18} /> Clear
        </button>
      </div>

      {/* Message feedback section */}
      {message && (
        <div className="mb-4 p-3 bg-blue-50 rounded-xl text-blue-700 text-center font-medium">
          {message}
        </div>
      )}

      {/* Hash Table Visualization Section */}
      <div className="mb-6 p-4 bg-slate-100 rounded-xl">
        {entries.length === 0 ? (
          /** Empty state message */
          <div className="text-center text-slate-400 py-8">Hash table is empty</div>
        ) : (
          /** Render each bucket with its entries */
          <div className="space-y-2">
            {entries.map(([idx, bucket]) => (
              <div key={idx} className="flex items-center gap-2">
                {/** Bucket label */}
                <span className="font-mono font-bold text-sm bg-slate-300 px-2 py-1 rounded">Bucket {idx}</span>
                {/** Bucket entries */}
                <div className="flex flex-wrap gap-2">
                  {bucket.map(([key, value], i) => (
                    <div key={i} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-mono">
                      {key}: {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 mb-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200">
        <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
        <ul className="space-y-1">
          <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on key field → Move to value field</li>
          <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on value field → Perform Set operation</li>
          <li>• <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">Enter</kbd> on value field → Move back to key field</li>
        </ul>
      </div>

      {/* Code Panel Section */}
      <div className="mt-6">
        <CodePanel title="Hash Table" code={dataStructureCode.hash} activeLines={activeLines} />
      </div>
    </div>
  );
}

export default HashTableVisualizer;