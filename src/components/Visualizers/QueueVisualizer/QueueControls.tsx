import { Plus, Minus, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface QueueControlsProps {
  inputValue: string;
  lastAction: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnqueue: () => void;
  onDequeue: () => void;
  onPeek: () => void;
  onClear: () => void;
}

export function QueueControls({
  inputValue,
  lastAction,
  inputRef,
  onInputChange,
  onEnqueue,
  onDequeue,
  onPeek,
  onClear
}: QueueControlsProps) {
  return (
    <>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={(e) => e.key === 'Enter' && onEnqueue()}
          placeholder="Enter value"
          className="flex-1 min-w-[150px] px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={onEnqueue} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Enqueue
        </button>
        <button onClick={onDequeue} className="btn-secondary flex items-center gap-2">
          <Minus size={18} /> Dequeue
        </button>
        <button onClick={onPeek} className="btn-secondary">
          Peek
        </button>
        <button onClick={onClear} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={18} /> Clear
        </button>
      </div>
      
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
    </>
  );
}