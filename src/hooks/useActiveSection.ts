import { useState, useEffect } from 'react';

/**
 * Which conversation section is "current": the one crossing a thin band
 * just above the middle of the viewport. Works inside nested scroll containers
 * because IntersectionObserver with root=null measures against the viewport.
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    const observeSections = () => {
      document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    };

    observeSections();
    // Sections mount after the page container measures the window; observe again shortly after.
    const t = setTimeout(observeSections, 300);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return activeSection;
};
