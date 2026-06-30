import { ArrowRight } from 'lucide-react';

interface QueueDirectionIndicatorProps {
  visible: boolean;
}

export function QueueDirectionIndicator({ visible }: QueueDirectionIndicatorProps) {
  if (!visible) return null;
  
  return (
    <div className="flex justify-between items-center mb-6 text-sm text-slate-500 px-4">
      <span>← Dequeue from front</span>
      <ArrowRight size={20} />
      <span>Enqueue to rear →</span>
    </div>
  );
}