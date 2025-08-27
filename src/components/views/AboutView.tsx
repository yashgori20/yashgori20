
import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { MapPin, Globe, GraduationCap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const AboutView = ({ activeView, setActiveView }: ViewProps) => (
  <section id="about" className="p-6 pt-8 md:p-12 md:pt-16 pb-16 min-h-screen relative">
    <div className="max-w-6xl mx-auto w-full">
      {/* User Question Bubble - Right Aligned */}
      <div className="mb-8 text-right">
        <div className="inline-block bg-[#303030] px-6 py-4 rounded-2xl text-white text-lg md:text-xl font-bold shadow-lg">
          Tell me more about Yash
        </div>
      </div>

      {/* AI Response Content - Two column layout */}
      <div className="mx-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - About and My Edge */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                {resumeData.about}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-3 rounded-lg border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-muted-foreground text-sm">{resumeData.contact.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-2">My Edge</h3>
              <div className="space-y-2 mb-6">
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">Technical Execution:</h4>
                  <p className="text-sm text-muted-foreground">Building and deploying AI/ML solutions from LLMs to production APIs.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">Product Vision:</h4>
                  <p className="text-sm text-muted-foreground">Translating complex AI tech into user-centric features that drive business value.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">End-to-End Ownership:</h4>
                  <p className="text-sm text-muted-foreground">Guiding projects from concept to deployment with speed and quality balance.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">Cross-Functional Collaboration:</h4>
                  <p className="text-sm text-muted-foreground">Bridging engineering, design, and business teams for shared goals.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">Impact-First Approach:</h4>
                  <p className="text-sm text-muted-foreground">Focusing on measurable results in accuracy, latency, adoption, and revenue.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Languages and Education */}
          <div className="lg:w-1/3 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Languages</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "English", level: 95, description: "Fluent" },
                  { name: "Hindi", level: 100, description: "Native" },
                  { name: "Gujarati", level: 100, description: "Native" },
                  { name: "Marathi", level: 75, description: "Conversational" }
                ].map((language, index) => (
                  <div key={language.name} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-2 rounded-lg border hover:border-primary/30 transition-all duration-300 hover:scale-105 text-center">
                    <Globe className="h-3 w-3 text-primary mx-auto mb-1" />
                    <h4 className="font-medium text-xs">{language.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{language.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Education</h3>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{edu.institution}</h4>
                      <p className="text-xs text-primary font-medium">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.period}</p>
                      <p className="text-xs text-muted-foreground">{edu.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutView;
