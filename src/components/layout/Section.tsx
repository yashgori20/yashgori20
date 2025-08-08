
import React from 'react';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="h-screen p-6 pt-20 md:p-12 pb-32 snap-start flex flex-col">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="w-24 h-1 bg-primary rounded-full"></div>
        </div>
        {children}
      </div>
    </div>
  );

export default Section;
