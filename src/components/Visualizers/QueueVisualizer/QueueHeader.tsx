import { useState } from 'react';
import { InfoHint } from '../../Info/InfoHint';
import { InfoButton } from '../../Info/InfoButton';

export function QueueHeader() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div 
        className="flex items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <InfoHint position="left" duration={4000} repeatDelay={4000} isHovered={isHovered} />
      </div>
      <InfoButton noteFile="queue.md" title="Queue" />
    </div>
  );
}