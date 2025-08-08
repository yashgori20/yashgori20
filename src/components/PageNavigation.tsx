
import React from 'react';
import { View } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const contentViews: View[] = ['about', 'experience', 'projects', 'skills', 'contact'];

type PageNavigationProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const PageNavigation = ({ activeView, setActiveView }: PageNavigationProps) => {
  const currentIndex = contentViews.indexOf(activeView);

  if (currentIndex === -1) {
    return null; // Don't render for 'chat' or other non-content views
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveView(contentViews[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < contentViews.length - 1) {
      setActiveView(contentViews[currentIndex + 1]);
    }
  };

  const showPrevious = currentIndex > 0;
  const showNext = currentIndex < contentViews.length - 1;

  return (
    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center w-full">
      {showPrevious ? (
        <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Previous page">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      ) : <div />}
      
      {showNext ? (
        <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next page">
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : <div />}
    </div>
  );
};

export default PageNavigation;
