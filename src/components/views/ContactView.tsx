
import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Twitter, Download } from 'lucide-react';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';
import { View } from '@/types';
import PageNavigation from '@/components/PageNavigation';
import { Button } from '@/components/ui/button';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const ContactView = ({ activeView, setActiveView }: ViewProps) => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTechnicalResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume-Technical.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume-Technical.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section title="Get In Touch">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always interested in hearing about new opportunities and interesting projects. 
              Feel free to reach out if you'd like to discuss potential collaborations or just say hello!
            </p>
          </div>
          
          <div className="space-y-4">
            <a href={`mailto:${resumeData.contact.email}`} className="block group">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border group-hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{resumeData.contact.email}</p>
                </div>
              </div>
            </a>
            
            <a href={`tel:${resumeData.contact.phone}`} className="block group">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border group-hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{resumeData.contact.phone}</p>
                </div>
              </div>
            </a>

             <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{resumeData.contact.location}</p>
                </div>
            </div>
            
            <div>
              <Button 
                onClick={handleDownloadResume}
                className="w-full p-4 h-auto bg-gradient-to-br from-primary/5 to-secondary/5 text-foreground hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                variant="ghost"
              >
                <div className="flex items-center gap-4 justify-start w-full">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Download className="h-6 w-6 text-primary"/>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Download Resume</p>
                    <p className="text-muted-foreground text-sm">Get my latest CV</p>
                  </div>
                </div>
              </Button>
              <div className="text-center mt-2">
                <button
                  onClick={handleDownloadTechnicalResume}
                  className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                >
                  Need a more technical version? Download here
                </button>
              </div>
            </div>
          </div>
          
           <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-semibold">Follow Me</h3>
            <div className="flex items-center gap-6">
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Linkedin className="h-7 w-7"/>
              </a>
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Github className="h-7 w-7"/>
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                 <HuggingFaceLogo className="h-7 w-7" />
              </a>
               <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Instagram className="h-7 w-7"/>
              </a>
               <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Twitter className="h-7 w-7"/>
              </a>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </div>
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );
};

export default ContactView;
