
import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Code, BrainCircuit, Wrench } from 'lucide-react';
import { View } from '@/types';
import PageNavigation from '@/components/PageNavigation';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const getSkillIcon = (skillType: 'programming' | 'aiml' | 'frameworks' | 'cloud' | 'data' | 'soft') => {
  const iconMap = {
    programming: <Code className="h-6 w-6 text-primary" />,
    aiml: <BrainCircuit className="h-6 w-6 text-primary" />,
    frameworks: <Code className="h-6 w-6 text-primary" />,
    cloud: <Wrench className="h-6 w-6 text-primary" />,
    data: <Wrench className="h-6 w-6 text-primary" />,
    soft: <BrainCircuit className="h-6 w-6 text-primary" />
  };
  return iconMap[skillType];
};

const SkillBox = ({ skill, skillType }: { 
  skill: { name: string; level: number; category?: string }; 
  skillType: 'programming' | 'aiml' | 'frameworks' | 'cloud' | 'data' | 'soft';
}) => {
  const percentage = Math.random() > 0.5 ? 65 : 75;
  
  return (
    <div className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          {getSkillIcon(skillType)}
        </div>
        
        <div className="relative w-full h-4 bg-secondary/20 rounded-sm overflow-hidden">
          {/* Filled portion */}
          <div 
            className="h-full bg-foreground/80 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Dotted matrix texture for unfilled portion */}
          <div 
            className="absolute top-0 right-0 h-full opacity-50"
            style={{ 
              width: `${100 - percentage}%`,
              backgroundImage: `radial-gradient(circle, currentColor 0.5px, transparent 0.5px)`,
              backgroundSize: '3px 3px',
              backgroundPosition: '1px 1px'
            }}
          />
          
          {/* Percentage text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-background mix-blend-difference">
              {percentage}%
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-sm text-center">{skill.name}</h3>
      </div>
    </div>
  );
};

const SkillsView = ({ activeView, setActiveView }: ViewProps) => (
  <Section title="Skills & Expertise">
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Programming Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.programming.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="programming" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">AI & Machine Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.aiml.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="aiml" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Frameworks & Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.frameworks.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="frameworks" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Cloud & DevOps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.cloud.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="cloud" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Data & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.data.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="data" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Leadership & Soft Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {resumeData.skills.soft.map((skill, index) => (
            <SkillBox key={skill.name} skill={skill} skillType="soft" />
          ))}
        </div>
      </div>
    </div>
    <PageNavigation activeView={activeView} setActiveView={setActiveView} />
  </Section>
);

export default SkillsView;
