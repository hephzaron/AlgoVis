import React, { RefObject } from 'react';
import { Plus, Trash2, Search, RotateCcw } from 'lucide-react';

interface BSTControlsProps {
  inputValue: string;
  inputRef: RefObject<HTMLInputElement>;
  onInputChange: (value: string) => void;
  onInsert: () => void;
  onDelete: () => void;
  onSearch: () => void;
  onReset: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const BSTControls: React.FC<BSTControlsProps> = ({
  inputValue,
  inputRef,
  onInputChange,
  onInsert,
  onDelete,
  onSearch,
  onReset,
  onKeyPress
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        ref={inputRef}
        type="number"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Enter value"
        className="flex-1 min-w-[120px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={onInsert} className="btn-primary flex items-center gap-2">
        <Plus size={18} /> Insert
      </button>
      <button onClick={onDelete} className="btn-secondary flex items-center gap-2">
        <Trash2 size={18} /> Delete
      </button>
      <button onClick={onSearch} className="btn-secondary flex items-center gap-2">
        <Search size={18} /> Search
      </button>
      <button onClick={onReset} className="btn-secondary flex items-center gap-2">
        <RotateCcw size={18} /> Reset
      </button>
    </div>
  );
};