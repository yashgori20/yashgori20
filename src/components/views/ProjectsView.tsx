
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
              className={`py-6 group cursor-pointer animate-slideInUp animate-delay-${index * 100}`}
              onClick={() => handleProjectClick(proj)}
            >
              {/* 65/35 Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center mr-8">
                {/* 65% - Project Content */}
                <div className="lg:col-span-6 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">{proj.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 text-gray-300 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Click to view details</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* 35% - Project Image with Dark Glass Overlay */}
                <div className="lg:col-span-4 hidden lg:block">
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={getProjectImage(index)}
                      alt={`${proj.title} preview`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Dark Glass Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/40">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    {/* Optional overlay content */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-medium">Preview</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subtle separator line */}
            {index < resumeData.projects.length - 1 && (
              <div className="border-b border-gray-200/20 my-6"></div>
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
