import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Code, BrainCircuit, Monitor, Users, Database, Cloud } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const getSkillIcon = (category: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'Programming': <Code className="h-4 w-4 text-primary" />,
    'AI/ML': <BrainCircuit className="h-4 w-4 text-primary" />,
    'Frameworks': <Monitor className="h-4 w-4 text-primary" />,
    'Cloud': <Cloud className="h-4 w-4 text-primary" />,
    'Data': <Database className="h-4 w-4 text-primary" />,
    'Soft Skills': <Users className="h-4 w-4 text-primary" />
  };
  return iconMap[category] || <Code className="h-4 w-4 text-primary" />;
};

const SkillItem = ({ name, level, category, index }: { name: string; level?: number; category: string; index: number }) => {
  const percentage = level || 0;
  return (
    <div className={`group bg-gradient-to-br from-primary/5 to-secondary/5 p-3 rounded-lg border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg animate-slideInUp animate-delay-${index * 100}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          {getSkillIcon(category)}
        </div>
        
        <div className="relative w-full h-3 bg-secondary/20 rounded-sm overflow-hidden border border-dashed border-muted-foreground/30">
          <div 
            className="h-full bg-foreground/80 transition-all duration-1000 ease-out rounded-sm"
            style={{ 
              width: `${percentage}%`,
              margin: '1px'
            }}
          />
          <div 
            className="absolute top-0 right-0 h-full opacity-50"
            style={{ 
              width: `${100 - percentage}%`,
              backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
              backgroundSize: '3px 3px',
              right: '1px',
              top: '1px'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-background mix-blend-difference">
              {percentage}%
            </span>
          </div>
        </div>
        
        <h3 className="font-medium text-xs text-center group-hover:text-primary transition-colors">{name}</h3>
      </div>
    </div>
  );
};

const SkillsView = ({ activeView, setActiveView }: ViewProps) => {
  const skillCategories = {
    'Programming': resumeData.skills.programming,
    'AI/ML': resumeData.skills.aiml,
    'Frameworks': resumeData.skills.frameworks,
    'Cloud': resumeData.skills.cloud,
    'Data': resumeData.skills.data,
    'Soft Skills': resumeData.skills.soft
  };

  return (
    <Section title="Skills & Expertise" id="skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="space-y-2 md:space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border">
                {getSkillIcon(category)}
                <h3 className="font-semibold text-sm md:text-base">{category}</h3>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              {skills.map((skill, index) => (
                <SkillItem 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  category={category} 
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsView;