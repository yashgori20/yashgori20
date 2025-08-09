
import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { MapPin, Globe, GraduationCap } from 'lucide-react';
import { View } from '@/types';
import PageNavigation from '@/components/PageNavigation';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const AboutView = ({ activeView, setActiveView }: ViewProps) => (
    <Section title="About Me">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-8">
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
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-2">What I Bring to the Table</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {resumeData.whatIBring}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-2">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "English", level: 95, description: "Fluent" },
                { name: "Hindi", level: 100, description: "Native" },
                { name: "Gujarati", level: 100, description: "Native" },
                { name: "Marathi", level: 75, description: "Conversational" }
              ].map((language, index) => {
                const percentage = language.level;
                return (
                  <div key={language.name} className={`group bg-gradient-to-br from-primary/5 to-secondary/5 p-3 rounded-lg border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg animate-slideInUp animate-delay-${index * 100}`}>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      
                      <div className="relative w-full h-3 bg-secondary/20 rounded-sm overflow-hidden">
                        <div 
                          className="h-full bg-foreground/80 transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                        <div 
                          className="absolute top-0 right-0 h-full opacity-50"
                          style={{ 
                            width: `${100 - percentage}%`,
                            backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
                            backgroundSize: '3px 3px'
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-background mix-blend-difference">
                            {language.description}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-xs text-center">{language.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border">
              <img 
                src={resumeData.profileImage} 
                alt="Yash Gori" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-2">Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-3">
                   <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border">
                      <GraduationCap className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                      <h4 className="font-semibold text-base">{edu.institution}</h4>
                      <p className="text-sm text-primary font-medium">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.period}</p>
                      <p className="text-xs text-muted-foreground">{edu.details}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );

export default AboutView;
