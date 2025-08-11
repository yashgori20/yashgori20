
import React, { useState } from 'react';
import { resumeData, Project } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import { View } from '@/types';
import ProjectModal from '@/components/ProjectModal';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ProjectsView = ({ activeView, setActiveView }: ViewProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getProjectImage = (index: number) => {
    // Projects are listed in descending order (latest first), so map accordingly
    const projectNumber = index + 1;
    return `/images/projects/p${projectNumber}.png`;
  };

  return (
    <Section title="Featured Projects" id="projects">
      <div className="grid md:grid-cols-2 gap-8">
        {resumeData.projects.map((proj: Project, index) => (
          <div 
            key={proj.title} 
            className={`bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg group flex flex-col animate-slideInUp animate-delay-${index * 100} cursor-pointer`}
            onClick={() => handleProjectClick(proj)}
          >
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{proj.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-secondary text-xs font-medium rounded-full border">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Click to view details</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        onNavigate={(project) => {
          setSelectedProject(project);
        }}
      />
      <div className="text-center mt-12">
        <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="group">
            View All Projects on GitHub
            <Github className="ml-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
          </Button>
        </a>
      </div>
    </Section>
  );
};

export default ProjectsView;
