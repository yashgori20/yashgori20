import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { 
    Code, 
    BrainCircuit, 
    Monitor, 
    Users, 
    Database,
    Cloud,
    Bot,
    Cpu,
    FileText,
    Globe,
    GitBranch,
    Zap,
    Target,
    MessageSquare,
    TrendingUp,
    Settings,
    Workflow,
    BookOpen
} from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
    activeView: View;
    setActiveView: (view: View) => void;
};

const getSkillIcon = (skillName: string, category: string) => {
    // Real technology logos and icons
    const skillIconMap: { [key: string]: JSX.Element } = {
        // AI/ML Core
        'Retrieval-Augmented Generation (RAG)': <BrainCircuit className="h-4 w-4 text-blue-400" />,
        'Prompt Engineering': <MessageSquare className="h-4 w-4 text-green-400" />,
        'Vector Databases (FAISS, Pinecone)': (
            <svg className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        ),
        'LLM Integration (GPT, Mixtral, LLaMA, Gemini)': <Bot className="h-4 w-4 text-orange-400" />,
        'OCR Processing': <FileText className="h-4 w-4 text-yellow-400" />,
        'Scikit-learn': (
            <svg className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 2.07C8.125 2.07 4.97 5.225 4.97 9.117c0 3.892 3.155 7.047 7.047 7.047 3.892 0 7.047-3.155 7.047-7.047C19.064 5.225 15.909 2.07 12.017 2.07zm2.842 6.094c-.434 1.433-1.284 2.669-2.408 3.506-.016-.072-.025-.146-.025-.221 0-.65.527-1.177 1.177-1.177.65 0 1.177.527 1.177 1.177 0 .076-.009.15-.025.221 1.124-.837 1.974-2.073 2.408-3.506.199-.656.299-1.353.299-2.066 0-.713-.1-1.41-.299-2.066-.434 1.433-1.284 2.669-2.408 3.506.016.071.025.145.025.221 0 .65-.527 1.177-1.177 1.177-.65 0-1.177-.527-1.177-1.177 0-.076.009-.15.025-.221-1.124.837-1.974 2.073-2.408 3.506-.199.656-.299 1.353-.299 2.066 0 .713.1 1.41.299 2.066z"/>
            </svg>
        ),
        'Natural Language Processing': <BookOpen className="h-4 w-4 text-indigo-400" />,
        
        // Technical Delivery
        'Python': (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13v8.38l-.05.63-.13.58-.21.52-.28.45-.33.38-.38.33-.43.29-.49.24-.52.2-.55.16-.56.1-.55.07-.51.04-.46.02-.5-.02-.55-.04-.55-.06-.53-.09-.52-.12-.5-.16-.46-.18-.44-.2-.4-.24-.38-.26-.34-.28-.32-.3-.3-.32-.28-.33-.26-.35-.24-.37-.21-.38-.2-.39-.18-.4-.17-.41-.15-.42-.14-.42-.13-.43-.11-.44-.1-.44-.08-.45-.06-.45-.05-.46-.03-.46-.02-.47-.01-.47v-5.09l.05-.63.13-.58.21-.52.28-.45.33-.38.38-.33.43-.29.49-.24.52-.2.55-.16.56-.1.55-.07.51-.04.46-.02.5.02z" fill="#306998"/>
                <path d="M12.03 2.16c-.17 0-.33.01-.48.02-.86.05-1.02.22-1.02 1.02v.74h2.04v.26H9.45c-.59 0-1.11.36-1.28.99-.19.73-.2 1.19 0 1.95.15.56.5.99 1.09.99h.71v-.94c0-.67.58-1.26 1.28-1.26h2.03c.56 0 1.02-.47 1.02-1.03v-1.91c0-.54-.46-.98-1.02-1.02-.2-.01-.41-.02-.64-.02z" fill="#FFD43B"/>
                <circle cx="10.44" cy="3.41" r=".34" fill="#306998"/>
            </svg>
        ),
        'LangChain': (
            <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.5 4.5a1.5 1.5 0 00-3 0v15a1.5 1.5 0 003 0v-6h7v6a1.5 1.5 0 003 0v-15a1.5 1.5 0 00-3 0v6h-7v-6z"/>
            </svg>
        ),
        'Streamlit': (
            <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        ),
        'API Development (REST,FASTAPI, Flask)': (
            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
        ),
        'Azure (OpenAI, Cosmos DB, Container Apps)': (
            <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.05 3.6L8.47 11.04l-5.17.85L8.15 20.4l9.4-14.52L13.05 3.6zM16.17 8.47l-6.03 9.32-3.47-6.03 6.03-9.32 3.47 6.03z"/>
            </svg>
        ),
        'Docker': (
            <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.938-.089 2.833-.266a11.192 11.192 0 003.823-1.389c.967-.567 1.784-1.31 2.428-2.208 1.18-1.611 1.962-3.608 2.315-5.937h.137c1.343 0 2.071-.579 2.403-1.168.169-.299.265-.63.265-.972v-.009c-.01-.07-.04-.182-.15-.322z"/>
            </svg>
        ),
        'GitHub Actions': (
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
        
        // Product & Collaboration
        'Product Strategy': <Target className="h-4 w-4 text-emerald-400" />,
        'Agile/Scrum': <Settings className="h-4 w-4 text-orange-400" />,
        'Roadmap Planning': <TrendingUp className="h-4 w-4 text-purple-400" />,
        'Cross-functional Team Leadership': <Users className="h-4 w-4 text-pink-400" />,
        'Stakeholder Communication': <MessageSquare className="h-4 w-4 text-yellow-400" />,
        'Client Relations': <Users className="h-4 w-4 text-green-400" />,
        'Data-Driven Decision Making': <TrendingUp className="h-4 w-4 text-blue-400" />,
    };
    
    // Fallback to category icons
    const categoryIconMap: { [key: string]: JSX.Element } = {
        'AI/ML Core': <BrainCircuit className="h-4 w-4 text-blue-400" />,
        'Technical Delivery': <Monitor className="h-4 w-4 text-green-400" />,
        'Product & Collaboration': <Users className="h-4 w-4 text-purple-400" />
    };
    
    return skillIconMap[skillName] || categoryIconMap[category] || <Code className="h-4 w-4 text-gray-400" />;
};

const SkillItem = ({ name, category, index }: { name: string; category: string; index: number }) => {
    return (
        <div className={`group transition-all duration-300 animate-slideInUp animate-delay-${index * 100} py-2`}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                    {getSkillIcon(name, category)}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                        <div className="space-y-3">
                            {skills.map((skill, skillIndex) => (
                                <div key={skill.name}>
                                    <SkillItem
                                        name={skill.name}
                                        category={category}
                                        index={skillIndex}
                                    />
                                    {/* Subtle separator line between items */}
                                    {skillIndex < skills.length - 1 && (
                                        <div className="border-b border-gray-200/20 my-2"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default SkillsView;