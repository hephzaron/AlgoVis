import React from 'react';
import { motion } from 'framer-motion';

interface NodeTooltipProps {
  selectedNodeId: string | null;
  degree: number;
  value: number;
}

export const NodeTooltip: React.FC<NodeTooltipProps> = ({
  selectedNodeId,
  degree,
  value
}) => {
  if (!selectedNodeId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-slate-200"
    >
      <p className="font-semibold text-sm">Selected: {selectedNodeId}</p>
      <p className="text-xs text-slate-500">Degree: {degree}</p>
      <p className="text-xs text-slate-500">Value: {value}</p>
    </motion.div>
  );
};