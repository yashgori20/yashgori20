
import { useState } from 'react';

export const useProfileCard = () => {
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });

  const handleProfileClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const rect = event.currentTarget.getBoundingClientRect();
    setProfileCardPosition({
      x: rect.left,
      y: rect.bottom
    });
    setProfileCardOpen(!profileCardOpen);
  };

  return {
    profileCardOpen,
    setProfileCardOpen,
    profileCardPosition,
    handleProfileClick
  };
};
