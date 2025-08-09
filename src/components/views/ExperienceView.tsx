
import React from 'react';
import { resumeData, Experience } from '@/data/resume';
import Section from '@/components/layout/Section';
import { MapPin } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ExperienceView = ({ activeView, setActiveView }: ViewProps) => (
    <Section title="Work Experience" id="experience">
      <div className="space-y-16">
        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Career Path</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp: Experience, index) => (
              <div key={exp.company} className="relative group">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full transition-transform duration-300 group-hover:scale-y-105"></div>
                <div className="ml-8 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {exp.location}
                      </p>
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  {exp.technologies && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-primary">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Volunteering</h2>
            <div className="relative group">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full transition-transform duration-300 group-hover:scale-y-105"></div>
                <div className="ml-8 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold">{resumeData.volunteering.role}</h3>
                            <p className="text-primary font-medium">{resumeData.volunteering.organization}</p>
                        </div>
                        <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 whitespace-nowrap">
                            {resumeData.volunteering.period}
                        </div>
                    </div>
                    <p className="text-muted-foreground">{resumeData.volunteering.description}</p>
                </div>
            </div>
        </div>
      </div>
    </Section>
  );

export default ExperienceView;
