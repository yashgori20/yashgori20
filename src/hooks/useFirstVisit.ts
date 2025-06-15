
import { useState, useEffect } from 'react';

const IS_FIRST_VISIT_KEY = 'yashgori-portfolio-first-visit';

export const useFirstVisit = (): boolean => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedValue = localStorage.getItem(IS_FIRST_VISIT_KEY);
        if (storedValue === null) {
          localStorage.setItem(IS_FIRST_VISIT_KEY, 'no');
          setIsFirstVisit(true);
        }
      } catch (error) {
        console.error('Could not access localStorage:', error);
        setIsFirstVisit(false);
      }
    }
  }, []);

  return isFirstVisit;
};
