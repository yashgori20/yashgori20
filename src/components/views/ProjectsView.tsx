
import React, { useState } from 'react';
import { resumeData, Project } from '@/data/resume';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import { View } from '@/types';
import ProjectModal from '@/components/ProjectModal';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';

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
      <div className="space-y-6">
        {resumeData.projects.map((proj: Project, index) => (
          <div key={proj.title}>
            <div
              className={`bg-[#2a2a2a] rounded-xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-500 hover:scale-105 hover:shadow-lg group flex flex-col animate-slideInUp animate-delay-${index * 100} cursor-pointer`}
              onClick={() => handleProjectClick(proj)}
            >
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">{proj.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-[#404040] text-white text-xs font-medium rounded-full border border-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-600 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Click to view details</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
            {/* Subtle separator line */}
            {index < resumeData.projects.length - 1 && (
              <div className="mx-6 border-b border-gray-200/20 my-6"></div>
            )}
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="group bg-[#404040] hover:bg-[#505050] text-white border-none">
              View All Projects on GitHub
              <Github className="ml-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
            </Button>
          </a>
          <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="group border-gray-600 text-white hover:bg-[#404040] hover:border-gray-500 bg-transparent">
              View All Projects on Hugging Face
              <HuggingFaceLogo className="ml-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
            </Button>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsView;
