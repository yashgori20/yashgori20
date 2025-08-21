import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    let currentSections: IntersectionObserverEntry[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Update the current sections array
      entries.forEach(entry => {
        const existingIndex = currentSections.findIndex(s => s.target.id === entry.target.id);
        if (existingIndex >= 0) {
          currentSections[existingIndex] = entry;
        } else {
          currentSections.push(entry);
        }
      });

      // Filter to only intersecting sections
      const intersectingEntries = currentSections.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // Sort sections by their position on the page (top to bottom)
        const sortedSections = intersectingEntries.sort((a, b) => {
          const aRect = a.target.getBoundingClientRect();
          const bRect = b.target.getBoundingClientRect();
          return aRect.top - bRect.top;
        });

        // Find the section that's most prominently visible (highest intersection ratio)
        let mostVisible = sortedSections[0];
        for (const section of sortedSections) {
          if (section.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = section;
          }
        }
        
        // Only update if intersection ratio is meaningful
        if (mostVisible.intersectionRatio > 0.05) {
          setActiveSection(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Backup scroll-based detection
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      let activeId = 'home'; // default
      let bestScore = -1;
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        // Multiple detection strategies
        let score = 0;
        
        // Strategy 1: Top of section is visible in upper half of viewport
        if (rect.top >= 0 && rect.top <= viewportHeight * 0.5) {
          score = Math.max(score, 1 - (rect.top / (viewportHeight * 0.5)));
        }
        
        // Strategy 2: Section center is in viewport
        const sectionCenter = rect.top + rect.height / 2;
        if (sectionCenter >= 0 && sectionCenter <= viewportHeight) {
          score = Math.max(score, 0.8);
        }
        
        // Strategy 3: Section occupies significant portion of viewport
        const visibleStart = Math.max(0, -rect.top);
        const visibleEnd = Math.min(rect.height, viewportHeight - rect.top);
        const visibleHeight = Math.max(0, visibleEnd - visibleStart);
        const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight);
        
        if (visibilityRatio > 0.3) {
          score = Math.max(score, visibilityRatio);
        }
        
        // Special handling for experience section (more aggressive detection)
        if (section.id === 'experience') {
          // Very aggressive detection for experience section
          if (rect.top <= viewportHeight * 0.8 && rect.bottom >= viewportHeight * 0.1) {
            score = Math.max(score, 0.95);
          }
          // Also check if we're scrolling through the experience area
          if (rect.top < 0 && rect.bottom > viewportHeight * 0.3) {
            score = Math.max(score, 0.92);
          }
        }
        
        if (score > bestScore) {
          bestScore = score;
          activeId = section.id;
        }
      });
      
      setActiveSection(activeId);
    };

    // Wait for DOM to be ready and observe all section elements
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length > 0) {
        sections.forEach((section) => observer.observe(section));
        
        // Set initial active section
        handleScroll();
      }
    };

    // Setup observers and scroll listener
    observeSections();
    const timeoutId = setTimeout(observeSections, 100);
    
    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
};