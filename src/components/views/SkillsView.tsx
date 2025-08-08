
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

const SkillsView = ({ activeView, setActiveView }: ViewProps) => (
    <Section title="Skills & Expertise">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.skills.technical.map((skill, index) => (
              <div key={skill.name} className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${skill.level}, 100`}
                        className="text-primary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-secondary/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Soft Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.skills.soft.map((skill, index) => (
              <div key={skill.name} className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${skill.level}, 100`}
                        className="text-primary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-secondary/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <BrainCircuit className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Tools & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.skills.tools.map((tool, index) => (
              <div key={tool.name} className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${tool.level}, 100`}
                        className="text-primary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-secondary/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );

export default SkillsView;
