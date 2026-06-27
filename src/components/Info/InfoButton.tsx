import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { InfoModal } from './InfoModal';
import { InfoHint } from './InfoHint';

interface InfoButtonProps {
  noteFile: string;
  title: string;
  showHint?: boolean;
}

export const InfoButton: React.FC<InfoButtonProps> = ({ 
  noteFile, 
  title,
  showHint = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div 
        className="flex items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showHint && (
          <InfoHint 
            text="info" 
            position="left" 
            duration={4000}
            repeatDelay={4000}
            isHovered={isHovered}
          />
        )}
        
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full hover:bg-slate-100 transition-all hover:scale-110"
          aria-label={`Learn about ${title}`}
        >
          <Info size={20} className="text-slate-400 hover:text-blue-500 transition-colors" />
        </button>
      </div>

      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        noteFile={noteFile}
        title={title}
      />
    </>
  );
};