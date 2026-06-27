import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { InfoModal } from './InfoModal';

interface InfoButtonProps {
  noteFile: string;  
  title: string;    
}

export const InfoButton: React.FC<InfoButtonProps> = ({ noteFile, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-slate-100 transition-all hover:scale-110"
        aria-label={`Learn about ${title}`}>
        <Info size={20} className="text-slate-400 hover:text-blue-500 transition-colors" />
      </button>

      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        noteFile={noteFile}
        title={title}
      />
    </>
  );
};