
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

          <div className="space-y-2">
            <a href={`mailto:${resumeData.contact.email}`} className="block group py-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Email</p>
                  <p className="text-xs text-gray-400">{resumeData.contact.email}</p>
                </div>
              </div>
              <div className="border-b border-gray-200/20 my-2"></div>
            </a>

            <a href={`tel:${resumeData.contact.phone}`} className="block group py-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Phone</p>
                  <p className="text-xs text-gray-400">{resumeData.contact.phone}</p>
                </div>
              </div>
              <div className="border-b border-gray-200/20 my-2"></div>
            </a>

            <a
              href={`https://wa.me/91${resumeData.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Yash! 👋 I saw your portfolio and would like to connect.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group py-2"
            >
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">WhatsApp</p>
                  <p className="text-xs text-gray-400">Quick message</p>
                </div>
              </div>
              <div className="border-b border-gray-200/20 my-2"></div>
            </a>

            <div className="group py-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Location</p>
                  <p className="text-xs text-gray-400">{resumeData.contact.location}</p>
                </div>
              </div>
              <div className="border-b border-gray-200/20 my-2"></div>
            </div>

            <button
              onClick={handleDownloadResume}
              className="w-full block group py-2"
            >
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                  <Download className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Download Resume</p>
                  <p className="text-xs text-gray-400">Get my latest CV</p>
                </div>
              </div>
            </button>
            
            <div className="text-center mt-2">
              <button
                onClick={handleDownloadTechnicalResume}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Need a more technical version? Download here
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Follow Me</h3>
            <div className="flex items-center gap-4">
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
        </div>

        <ContactForm />
      </div>
    </Section>
  );
};

export default ContactView;
