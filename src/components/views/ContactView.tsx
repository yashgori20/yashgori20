
import React from 'react';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Download, MessageCircle } from 'lucide-react';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';
import XLogo from '@/components/XLogo';
import { View } from '@/types';
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
    <Section title="Get In Touch" id="contact">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              I'm always interested in hearing about new opportunities and interesting projects.
              Feel free to reach out if you'd like to discuss potential collaborations or just say hello!
            </p>
          </div>

          <div className="space-y-3">
            <a href={`mailto:${resumeData.contact.email}`} className="block group">
              <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 group-hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-muted-foreground text-xs">{resumeData.contact.email}</p>
                </div>
              </div>
            </a>

            <a href={`tel:${resumeData.contact.phone}`} className="block group">
              <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 group-hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Phone</p>
                  <p className="text-muted-foreground text-xs">{resumeData.contact.phone}</p>
                </div>
              </div>
            </a>

            <a
              href={`https://wa.me/91${resumeData.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Yash! 👋 I saw your portfolio and would like to connect.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 group-hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-muted-foreground text-xs">Quick message</p>
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-muted-foreground text-xs">{resumeData.contact.location}</p>
              </div>
            </div>

            <div>
              <button
                onClick={handleDownloadResume}
                className="w-full block group"
              >
                <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-600 group-hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">Download Resume</p>
                    <p className="text-muted-foreground text-xs">Get my latest CV</p>
                  </div>
                </div>
              </button>
              <div className="text-center mt-2">
                <button
                  onClick={handleDownloadTechnicalResume}
                  className="text-xs text-muted-foreground hover:text-white underline-offset-4 hover:underline"
                >
                  Need a more technical version? Download here
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Follow Me</h3>
            <div className="flex items-center gap-4">
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 block">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 block">
                <Github className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 block">
                <HuggingFaceLogo className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 block">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 block">
                <XLogo className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
};

export default ContactView;
