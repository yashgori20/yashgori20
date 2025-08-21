import React, { useState } from 'react';
import { X, Search, Home, User, Briefcase, Code, BrainCircuit, Mail, Phone, Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import XLogo from './XLogo';
import HuggingFaceLogo from './HuggingFaceLogo';

interface SearchChatsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionClick: (sectionId: string) => void;
  onProjectClick: (project: any) => void;
}

const SearchChatsOverlay = ({ isOpen, onClose, onSectionClick, onProjectClick }: SearchChatsOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const sections = [
    { id: 'home', title: 'Home', icon: Home },
    { id: 'about', title: 'About Me', icon: User },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'projects', title: 'Projects', icon: Code },
    { id: 'skills', title: 'Skills & Expertise', icon: BrainCircuit },
    { id: 'contact', title: 'Contact Me', icon: Mail },
  ];

  const projects = resumeData.projects;

  const socials = [
    { 
      title: 'Phone', 
      value: resumeData.contact.phone,
      icon: Phone,
      href: `tel:${resumeData.contact.phone}`
    },
    { 
      title: 'Email', 
      value: resumeData.contact.email,
      icon: Mail,
      href: `mailto:${resumeData.contact.email}`
    },
    { 
      title: 'LinkedIn', 
      value: 'linkedin.com/in/yashgori20',
      icon: Linkedin,
      href: resumeData.contact.links.linkedin
    },
    { 
      title: 'GitHub', 
      value: 'github.com/yashgori20',
      icon: Github,
      href: resumeData.contact.links.github
    },
    { 
      title: 'Instagram', 
      value: '@yashgori20',
      icon: Instagram,
      href: resumeData.contact.links.instagram
    },
    { 
      title: 'Twitter', 
      value: '@yashgori20',
      icon: XLogo,
      href: resumeData.contact.links.twitter
    },
    { 
      title: 'WhatsApp', 
      value: resumeData.contact.phone,
      icon: MessageSquare,
      href: `https://wa.me/${resumeData.contact.phone}`
    },
    { 
      title: 'HuggingFace', 
      value: 'huggingface.co/yashgori20',
      icon: HuggingFaceLogo,
      href: resumeData.contact.links.huggingface
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    onClose();
  };

  const handleProjectClick = (project: any) => {
    onProjectClick(project);
    onClose();
  };

  const handleSocialClick = (social: any) => {
    window.open(social.href, '_blank', 'noopener noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16"
      onClick={onClose}
    >
      <div 
        className="bg-[#2a2a2a] rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-600">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Sections */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Sections</h3>
              <div className="h-px bg-gray-600"></div>
            </div>
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[#303030] transition-colors text-white"
                  >
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Projects</h3>
              <div className="h-px bg-gray-600"></div>
            </div>
            <div className="space-y-1">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => handleProjectClick(project)}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[#303030] transition-colors text-white"
                >
                  <Code className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{project.title}</div>
                    <div className="text-xs text-gray-400 truncate">{project.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Socials</h3>
              <div className="h-px bg-gray-600"></div>
            </div>
            <div className="space-y-1">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(social)}
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[#303030] transition-colors text-white"
                  >
                    <Icon className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{social.title}</div>
                      <div className="text-xs text-gray-400">{social.value}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchChatsOverlay;