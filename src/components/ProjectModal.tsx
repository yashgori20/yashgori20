import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink, X, Calendar, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Project, resumeData } from '@/data/resume';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onNavigate }) => {
  const isMobile = window.innerWidth < 768;

  // Get current project index and navigation functions
  const currentIndex = project ? resumeData.projects.findIndex(p => p.title === project.title) : 0;
  const totalProjects = resumeData.projects.length;

  const getProjectImage = (project: Project) => {
    const projectIndex = resumeData.projects.findIndex(p => p.title === project.title);
    const projectNumber = projectIndex + 1;
    return `/images/projects/p${projectNumber}.png`;
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalProjects - 1;
    const prevProject = resumeData.projects[prevIndex];
    if (onNavigate && prevProject) {
      onNavigate(prevProject);
    }
  };

  const goToNext = () => {
    const nextIndex = currentIndex < totalProjects - 1 ? currentIndex + 1 : 0;
    const nextProject = resumeData.projects[nextIndex];
    if (onNavigate && nextProject) {
      onNavigate(nextProject);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, goToNext, goToPrevious, onClose]);

  if (!project) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto border shadow-2xl rounded-xl bg-card backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="relative" 
               onTouchStart={isMobile ? (e) => {
                 const touch = e.touches[0];
                 e.currentTarget.dataset.startX = touch.clientX.toString();
               } : undefined}
               onTouchEnd={isMobile ? (e) => {
                 const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                 const endX = e.changedTouches[0].clientX;
                 const diff = startX - endX;
                 
                 if (Math.abs(diff) > 50) { // Minimum swipe distance
                   if (diff > 0) {
                     goToNext();
                   } else {
                     goToPrevious();
                   }
                 }
               } : undefined}>


          {/* Project Image */}
          <div className="relative h-80 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden rounded-t-xl">
            <img 
              src={getProjectImage(project)}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <User className="h-4 w-4" />
                  <span>Yash Gori</span>
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-4 md:p-8 px-6 md:px-12 bg-card">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Modern and responsive user interface</li>
                  <li>Optimized for performance and scalability</li>
                  <li>Clean, maintainable code architecture</li>
                  <li>Cross-platform compatibility</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="group">
                      <Code className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      View Source Code
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="group ml-auto">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Navigation Arrows - Smaller size */}
          <button
            className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-10 p-2 hover:scale-110 transition-transform"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-white drop-shadow-lg" strokeWidth={2.5} />
          </button>
          
          <button
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-10 p-2 hover:scale-110 transition-transform"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-white drop-shadow-lg" strokeWidth={2.5} />
          </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectModal;