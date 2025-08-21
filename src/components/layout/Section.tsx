
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const Section = ({ title, children, id }: SectionProps) => {
  // Convert section titles to conversational questions
  const getQuestionFromTitle = (title: string) => {
    switch (title) {
      case 'About Me':
        return 'Tell me more about Yash';
      case 'Work Experience':
        return "What's your work experience?";
      case 'Projects':
        return 'Show me your projects';
      case 'Skills & Expertise':
        return 'What are your key skills?';
      case 'Get In Touch':
        return 'How can I contact you?';
      default:
        return title;
    }
  };

  return (
    <section id={id} className="p-6 pt-8 md:p-12 md:pt-16 pb-16 min-h-screen relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* User Question Bubble - Right Aligned */}
        <div className="mb-8 text-right">
          <div className="inline-block bg-[#303030] px-6 py-4 rounded-2xl text-white text-lg md:text-xl font-bold shadow-lg">
            {getQuestionFromTitle(title)}
          </div>
        </div>
        
        {/* AI Response Content - Left Aligned with margin */}
        <div className="ml-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
