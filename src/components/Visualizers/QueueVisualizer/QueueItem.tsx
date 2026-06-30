import { motion } from 'framer-motion';

interface QueueItemProps {
  item: number;
  index: number;
  isHighlighted: boolean;
  isFront: boolean;
  isRear: boolean;
}

export function QueueItem({ item, index, isHighlighted, isFront, isRear }: QueueItemProps) {
  return (
    <motion.div
      key={`${index}-${item}`}
      initial={{ scale: 0, opacity: 0, x: -50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0, opacity: 0, x: 50 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative"
    >
      <div
        className={`
          w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold
          transition-all duration-300
          ${isHighlighted ? 'ring-4 ring-yellow-500 scale-110' : ''}
          ${isFront ? 'bg-green-500' : 'bg-blue-500'}
          text-white shadow-lg
        `}
      >
        {item}
      </div>
      {isFront && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-green-600">
          FRONT
        </div>
      )}
      {isRear && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-600">
          REAR
        </div>
      )}
    </motion.div>
  );
}