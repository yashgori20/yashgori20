
import { useState, useEffect } from 'react';

const VIST_KEY = 'yash-portfolio-visited';

export const useFirstVisit = (): boolean => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(VIST_KEY);
    if (!hasVisited) {
      localStorage.setItem(VIST_KEY, 'true');
      setIsFirstVisit(true);
    }
  }, []);

  return isFirstVisit;
};
