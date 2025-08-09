
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
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {resumeData.about}
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="text-muted-foreground">{resumeData.contact.location}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">What I Bring to the Table</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {resumeData.whatIBring}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "English", level: 95 },
                { name: "Hindi", level: 100 },
                { name: "Gujarati", level: 100 },
                { name: "Marathi", level: 75 }
              ].map((language, index) => {
                const filledBoxes = Math.random() > 0.5 ? 6 : 7;
                return (
                  <div key={language.name} className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }, (_, boxIndex) => (
                          <div
                            key={boxIndex}
                            className={`w-1.5 h-4 ${
                              boxIndex < filledBoxes 
                                ? 'bg-primary' 
                                : 'bg-secondary/30'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <h3 className="font-semibold text-sm text-center">{language.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">Education</h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border">
                      <GraduationCap className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                      <h4 className="font-semibold text-lg">{edu.institution}</h4>
                      <p className="text-sm text-primary font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.period}</p>
                      <p className="text-sm text-muted-foreground">{edu.details}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border">
            <img 
              src={resumeData.profileImage} 
              alt="Yash Gori" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );

export default AboutView;
