
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const Section = ({ title, children, id }: SectionProps) => (
    <section id={id} className="p-6 pt-8 md:p-12 md:pt-16 pb-16 min-h-screen relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">
            {title}
          </h1>
          <div className="w-24 h-1 bg-white/20 rounded-full"></div>
        </div>
        {children}
      </div>
    </section>
  );

export default Section;
