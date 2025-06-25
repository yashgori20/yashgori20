
import React from 'react';
import { View } from '@/types';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/layout/Section';
import PageNavigation from '@/components/PageNavigation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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

  return (
    <Section title="Get In Touch">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            I'm always interested in hearing about new opportunities and exciting projects.
          </p>
          <Button 
            onClick={handleDownloadResume}
            variant="outline"
            className="bg-secondary/30 hover:bg-secondary/50 border-primary/20"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
        
        <ContactForm />
      </div>
      
      <PageNavigation activeView={activeView} setActiveView={setActiveView} />
    </Section>
  );
};

export default ContactView;
