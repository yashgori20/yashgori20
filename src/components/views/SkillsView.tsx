import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Code, BrainCircuit, Wrench, Users } from 'lucide-react';
import { View } from '@/types';
import PageNavigation from '@/components/PageNavigation';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const getSkillIcon = (category: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'Tools': <Wrench className="h-5 w-5 text-primary" />,
    'Technical': <Code className="h-5 w-5 text-primary" />,
    'AI/ML': <BrainCircuit className="h-5 w-5 text-primary" />,
    'Soft Skills': <Users className="h-5 w-5 text-primary" />
  };
  return iconMap[category] || <Code className="h-5 w-5 text-primary" />;
};

const SkillItem = ({ name, category }: { name: string; category: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-sm group">
    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
      {getSkillIcon(category)}
    </div>
    <span className="font-medium text-sm group-hover:text-primary transition-colors">{name}</span>
  </div>
);

const SkillsView = ({ activeView, setActiveView }: ViewProps) => {
  // Organize skills into 4 clear categories
  const skillCategories = {
    'Tools': [
      'Docker',
      'GitHub Actions',
      'Power BI',
      'PostgreSQL',
      'Redis',
      'FAISS',
      'Pinecone'
    ],
    'Technical': [
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Flask',
      'React',
      'FastAPI',
      'Azure OpenAI'
    ],
    'AI/ML': [
      'LangChain',
      'RAG Systems',
      'Prompt Engineering',
      'Azure AI Search',
      'Streamlit',
      'Pandas',
      'NumPy'
    ],
    'Soft Skills': [
      'Team Management',
      'Problem Solving',
      'Communication',
      'Strategic Thinking',
      'Adaptability',
      'Documentation'
    ]
  };

  return (
    <Section title="Skills & Expertise">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border">
                {getSkillIcon(category)}
                <h3 className="font-semibold text-lg">{category}</h3>
              </div>
            </div>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <SkillItem key={skill} name={skill} category={category} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );
};

export default SkillsView;