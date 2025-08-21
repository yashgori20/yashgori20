import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { MapPin, Globe, GraduationCap, MessageCircle, Download, Linkedin, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { View } from '@/types';
import XLogo from '@/components/XLogo';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const HomeView = ({ activeView, setActiveView }: ViewProps) => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="p-6 pt-0 md:p-8 md:pt-0 pb-16 min-h-screen relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-6">
          {/* Dynamic Greeting */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {(() => {
                const hour = new Date().getHours();
                if (hour < 12) return "Good Morning!";
                if (hour < 17) return "Good Afternoon!";
                return "Good Evening!";
              })()}
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Welcome to my portfolio
            </p>
            <p className="text-base md:text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Building AI-powered products from concept to deployment blending technical depth with product vision to turn complex ideas into scalable, impactful solutions.
            </p>
          </div>

          {/* Profile Picture */}
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border shadow-2xl">
            <img
              src={resumeData.profileImage}
              alt="Yash Gori"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white text-center">Connect With Me</h3>
            <div className="flex items-center justify-center gap-4">
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
                <Github className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
                <HuggingFaceLogo className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
                <XLogo className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Download Resume Button */}
          <div>
            <button
              onClick={handleDownloadResume}
              className="group py-2"
            >
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <Download className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Download Resume</p>
                  <p className="text-xs text-gray-400">Get my latest CV</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeView;