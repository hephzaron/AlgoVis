import { AnimatePresence } from 'framer-motion';
import { QueueItem } from './QueueItem';

interface QueueVisualizationProps {
  items: number[];
  highlightIndex: number | null;
}

export function QueueVisualization({ items, highlightIndex }: QueueVisualizationProps) {
  return (
    <div className="mb-6 p-6 bg-slate-100 rounded-xl min-h-[200px] flex items-center justify-start gap-2 flex-wrap">
      <AnimatePresence>
        {items.length === 0 ? (
          <div className="w-full text-center text-slate-400 py-8">
            Queue is empty. Enqueue items to see them here.
          </div>
        ) : (
          items.map((item, idx) => (
            <QueueItem
              key={`${idx}-${item}`}
              item={item}
              index={idx}
              isHighlighted={highlightIndex === idx}
              isFront={idx === 0}
              isRear={idx === items.length - 1}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}