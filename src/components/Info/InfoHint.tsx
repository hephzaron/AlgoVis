import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface InfoHintProps {
  /** Duration in milliseconds before hint disappears */
  duration?: number;
  /** Time in milliseconds before hint reappears */
  repeatDelay?: number;
  /** Position of the hint relative to the info button */
  position?: 'left' | 'right';
  /** Custom text to display */
  text?: string;
  /** Whether the hint is active */
  isHovered?: boolean;
}

export const InfoHint: React.FC<InfoHintProps> = ({
  duration = 4000,
  repeatDelay = 4000,
  position = 'left',
  text = 'Find out more',
  isHovered = false
}) => {
  const [showHint, setShowHint] = useState(true);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // If hovered, keep showing
    if (isHovered) {
      setShowHint(true);
      return;
    }

    const showHintWithDelay = () => {
      setShowHint(true);
      
      timeoutIdRef.current = setTimeout(() => {
        setShowHint(false);
        
        timeoutIdRef.current = setTimeout(() => {
          showHintWithDelay();
        }, repeatDelay);
      }, duration);
    };

    showHintWithDelay();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [duration, repeatDelay, isHovered]);

  if (!showHint) return null;

  return (
    <div className="flex items-center gap-1 text-blue-500 animate-pulse">
      {position === 'right' && (
        <>
          <ArrowRight size={16} className="animate-pulse" />
          <ArrowRight size={16} className="animate-pulse delay-150" />
          <ArrowRight size={16} className="animate-pulse delay-300" />
        </>
      )}
      
      <span className="text-xs font-medium whitespace-nowrap">{text}</span>
      
      {position === 'left' && (
        <>
          <ArrowRight size={16} className="animate-pulse" />
          <ArrowRight size={16} className="animate-pulse delay-150" />
          <ArrowRight size={16} className="animate-pulse delay-300" />
        </>
      )}
    </div>
  );
};