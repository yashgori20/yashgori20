
import React, { useState } from 'react';
import { resumeData, Experience } from '@/data/resume';
import Section from '@/components/layout/Section';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ExperienceView = ({ activeView, setActiveView }: ViewProps) => {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(new Set());

  const toggleExpanded = (company: string) => {
    const newExpanded = new Set(expandedExperiences);
    if (newExpanded.has(company)) {
      newExpanded.delete(company);
    } else {
      newExpanded.add(company);
    }
    setExpandedExperiences(newExpanded);
  };

  return (
    <Section title="Work Experience" id="experience">
      <div className="space-y-16">
        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Career Path</h2>
          <div className="space-y-0">
            {resumeData.experience.map((exp: Experience, index) => (
              <div key={exp.company} className="relative group">
                <div className="p-6">
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

                    {/* Additional Points - Seamlessly integrated */}
                    {exp.additionalPoints && exp.additionalPoints.length > 0 && expandedExperiences.has(exp.company) && (
                      exp.additionalPoints.map((point, i) => (
                        <li key={`additional-${i}`} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{point}</span>
                        </li>
                      ))
                    )}
                  </ul>

                  {/* Show More/Less Button */}
                  {exp.additionalPoints && exp.additionalPoints.length > 0 && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpanded(exp.company)}
                        className="border-gray-600 text-white hover:bg-[#404040] hover:border-gray-500 bg-transparent"
                      >
                        {expandedExperiences.has(exp.company) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show more
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                {/* Subtle separator line */}
                {index < resumeData.experience.length - 1 && (
                  <div className="mx-6 border-b border-gray-200/20 my-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Volunteering</h2>
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{resumeData.volunteering.role}</h3>
                <p className="text-gray-300 font-medium">{resumeData.volunteering.organization}</p>
              </div>
              <div className="text-sm font-medium mt-2 md:mt-0 whitespace-nowrap text-gray-400">
                {resumeData.volunteering.period}
              </div>
            </div>
            <p className="text-muted-foreground">{resumeData.volunteering.description}</p>
          </div>
        </div>
      </div>
    </Section >
  );
};

export default ExperienceView;
