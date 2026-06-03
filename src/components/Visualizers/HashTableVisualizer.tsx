import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Search, RotateCcw } from 'lucide-react';
import CodePanel from '../UI/CodePanel';
import { dataStructureCode } from '../../data/dataStructureCode';

/**
 * Simple hash table implementation for visualization.
 */
class HashTable {
  private buckets: Map<number, [string, number][]> = new Map();
  private size: number = 16;

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

  get(key: string): number | undefined {
    const idx = this.hash(key);
    const bucket = this.buckets.get(idx);
    if (!bucket) return undefined;
    const entry = bucket.find(([k]) => k === key);
    return entry ? entry[1] : undefined;
  }

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

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.size;
  }

  getEntries(): Array<[number, [string, number][]]> {
    return Array.from(this.buckets.entries());
  }

  clear(): void {
    this.buckets.clear();
  }
}

/**
 * Helper to find the line range for a function in the hash table code.
 */
function getFunctionLines(fnName: string): number[] {
  const lines = dataStructureCode.hash.split('\n');
  const start = lines.findIndex((line) => line.includes(`def ${fnName}(`));
  if (start === -1) return [];
  return [start + 1, Math.min(start + 8, lines.length)];
}

function HashTableVisualizer() {
  const [hashTable] = useState(() => new HashTable());
  const [entries, setEntries] = useState<Array<[number, [string, number][]]>>([]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [activeLines, setActiveLines] = useState<number[]>([]);

  const updateDisplay = useCallback(() => {
    setEntries(hashTable.getEntries());
  }, [hashTable]);

  const handleSet = () => {
    if (!keyInput.trim()) return;
    const value = parseInt(valueInput) || 0;
    hashTable.set(keyInput, value);
    updateDisplay();
    setMessage(`Set: ${keyInput} = ${value}`);
    const lines = getFunctionLines('set');
    setActiveLines(lines);
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
    setKeyInput('');
    setValueInput('');
  };

  const handleGet = () => {
    if (!keyInput.trim()) return;
    const value = hashTable.get(keyInput);
    if (value !== undefined) {
      setMessage(`Found: ${keyInput} = ${value}`);
    } else {
      setMessage(`Not found: ${keyInput}`);
    }
    const lines = getFunctionLines('get');
    setActiveLines(lines);
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
  };

  const handleDelete = () => {
    if (!keyInput.trim()) return;
    const deleted = hashTable.delete(keyInput);
    updateDisplay();
    setMessage(deleted ? `Deleted: ${keyInput}` : `Not found: ${keyInput}`);
    const lines = getFunctionLines('delete');
    setActiveLines(lines);
    setTimeout(() => {
      setMessage(null);
      setActiveLines([]);
    }, 1000);
    setKeyInput('');
    setValueInput('');
  };

  const handleClear = () => {
    hashTable.clear();
    updateDisplay();
    setMessage('Hash table cleared');
    setTimeout(() => setMessage(null), 1000);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Hash Table</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Key"
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Value"
          className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

      {/* Message feedback */}
      {message && (
        <div className="mb-4 p-3 bg-blue-50 rounded-xl text-blue-700 text-center font-medium">
          {message}
        </div>
      )}

      {/* Hash Table Visualization */}
      <div className="mb-6 p-4 bg-slate-100 rounded-xl">
        {entries.length === 0 ? (
          <div className="text-center text-slate-400 py-8">Hash table is empty</div>
        ) : (
          <div className="space-y-2">
            {entries.map(([idx, bucket]) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm bg-slate-300 px-2 py-1 rounded">Bucket {idx}</span>
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

      {/* Code Panel */}
      <div className="mt-6">
        <CodePanel title="Hash Table" code={dataStructureCode.hash} activeLines={activeLines} />
      </div>
    </div>
  );
}

export default HashTableVisualizer;
