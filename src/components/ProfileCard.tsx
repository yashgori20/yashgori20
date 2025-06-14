
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/data/resume';

interface ProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isOpen, onClose, position }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="fixed z-50 bg-card border rounded-lg shadow-lg p-4 w-64"
        style={{
          top: `${position.y + 10}px`,
          left: `${Math.min(position.x - 128, window.innerWidth - 280)}px`
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
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{resumeData.contact.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{resumeData.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{resumeData.contact.location}</span>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => {
            window.location.href = `mailto:${resumeData.contact.email}`;
            onClose();
          }}
        >
          Send Message
        </Button>
      </div>
    </>
  );
};

export default ProfileCard;
