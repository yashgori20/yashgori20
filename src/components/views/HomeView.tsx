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

const HomeView = ({ activeView, setActiveView }: ViewProps) => (
  <section id="home" className="p-6 pt-8 md:p-12 md:pt-16 pb-16 min-h-screen relative">
    <div className="max-w-6xl mx-auto w-full">


      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-8">
        {/* Dynamic Greeting */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return "Good Morning!";
              if (hour < 17) return "Good Afternoon!";
              return "Good Evening!";
            })()}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Welcome to my portfolio
          </p>
        </div>

        {/* Profile Picture */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border shadow-2xl">
          <img
            src={resumeData.profileImage}
            alt="Yash Gori"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HomeView;