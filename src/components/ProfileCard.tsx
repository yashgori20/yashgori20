import React from 'react';
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/data/resume';

interface ProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isOpen, onClose, position }) => {
  if (!isOpen) return null;

  const handleSendMessage = () => {
    const mailtoLink = `mailto:${resumeData.contact.email}`;
    window.open(mailtoLink, '_blank');
    onClose();
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  const handleDownloadTechnicalResume = () => {
    const link = document.createElement('a');
    link.href = '/Yash-Gori-Resume-Technical.pdf';
    link.setAttribute('download', 'Yash-Gori-Resume-Technical.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[100]" onClick={onClose} />
      <div 
        className="fixed z-[101] bg-card border rounded-lg shadow-lg p-4 w-64 touch-manipulation"
        style={{
          top: `${position.y + 10}px`,
          left: `${Math.min(position.x - 128, window.innerWidth - 280)}px`,
          touchAction: 'manipulation'
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={resumeData.profileImage} 
            alt="Yash Gori" 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{resumeData.name}</h3>
            <p className="text-sm text-muted-foreground">AI Developer & Engineer</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <a 
            href={`mailto:${resumeData.contact.email}`}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground hover:text-primary transition-colors">{resumeData.contact.email}</span>
          </a>
          <a 
            href={`tel:${resumeData.contact.phone}`}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground hover:text-primary transition-colors">{resumeData.contact.phone}</span>
          </a>
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(resumeData.contact.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground hover:text-primary transition-colors">{resumeData.contact.location}</span>
          </a>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            size="sm" 
            className="w-full"
            onClick={handleSendMessage}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          <Button
            size="sm"
            className="w-full"
            onClick={handleDownloadResume}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
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
    </>
  );
};

export default ProfileCard;
