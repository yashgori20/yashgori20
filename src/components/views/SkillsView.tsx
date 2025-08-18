import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Code, BrainCircuit, Monitor, Users } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
    activeView: View;
    setActiveView: (view: View) => void;
};

const getSkillIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
        'AI/ML Core': <BrainCircuit className="h-4 w-4 text-white" />,
        'Technical Delivery': <Monitor className="h-4 w-4 text-white" />,
        'Product & Collaboration': <Users className="h-4 w-4 text-white" />
    };
    return iconMap[category] || <Code className="h-4 w-4 text-white" />;
};

const SkillItem = ({ name, category, index }: { name: string; category: string; index: number }) => {
    return (
        <div className={`group transition-all duration-300 animate-slideInUp animate-delay-${index * 100} py-2`}>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {getSkillIcon(category)}
                </div>
                <div className="flex-1">
                    <span className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">{name}</span>
                </div>
            </div>
        </div>
    );
};

const SkillsView = ({ activeView, setActiveView }: ViewProps) => {
    // Use the new skills structure directly
    const skillCategories = {
        'AI/ML Core': resumeData.skills["AI/ML Core"],
        'Technical Delivery': resumeData.skills["Technical Delivery"],
        'Product & Collaboration': resumeData.skills["Product & Collaboration"]
    };

    return (
        <Section title="Skills & Expertise" id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Object.entries(skillCategories).flatMap(([category, skills]) =>
                    skills.map((skill, skillIndex, skillsArray) => {
                        const globalIndex = Object.entries(skillCategories)
                            .slice(0, Object.keys(skillCategories).indexOf(category))
                            .reduce((acc, [, prevSkills]) => acc + prevSkills.length, 0) + skillIndex;
                        
                        const totalSkills = Object.values(skillCategories).flat().length;
                        
                        return (
                            <div key={skill.name}>
                                <SkillItem
                                    name={skill.name}
                                    category={category}
                                    index={globalIndex}
                                />
                                {/* Subtle separator line between items */}
                                {globalIndex < totalSkills - 1 && (
                                    <div className="mt-4 border-b border-gray-200/20"></div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </Section>
    );
};

export default SkillsView;