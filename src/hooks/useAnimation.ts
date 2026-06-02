import { useEffect, useRef } from 'react';

export default function useAnimation(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const id = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay]);
}
