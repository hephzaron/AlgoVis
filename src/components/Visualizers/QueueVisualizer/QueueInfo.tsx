interface QueueInfoProps {
  size: number;
}

export function QueueInfo({ size }: QueueInfoProps) {
  return (
    <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-500">
      <span>Queue Size: {size}</span>
      <span>FIFO (First In, First Out)</span>
    </div>
  );
}