
import React from 'react';
import { resumeData, Project } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, Github } from 'lucide-react';
import { View } from '@/types';
import PageNavigation from '@/components/PageNavigation';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ProjectsView = ({ activeView, setActiveView }: ViewProps) => (
    <Section title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {resumeData.projects.map((proj: Project, index) => (
          <div key={proj.title} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border overflow-hidden hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg group flex flex-col">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Code className="h-16 w-16 text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-secondary text-xs font-medium rounded-full border">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4">
                {proj.codeUrl && (
                   <a href={proj.codeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full">
                         <Code className="mr-2 h-4 w-4" /> View Code
                      </Button>
                   </a>
                )}
                {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="default" className="w-full">
                         <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Button>
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="text-center mt-12">
        <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="group">
            View All Projects on GitHub
            <Github className="ml-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
          </Button>
        </a>
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );

export default ProjectsView;
