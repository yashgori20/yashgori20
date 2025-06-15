
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, X } from 'lucide-react';

type WelcomeOverlayProps = {
  onClose: () => void;
};

const WelcomeOverlay = ({ onClose }: WelcomeOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
    >
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="absolute top-1/4 left-4 md:left-24 text-left max-w-[200px] p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border pointer-events-none"
        >
            <ArrowLeft className="h-6 w-6 text-primary mb-2" />
            <p className="text-sm font-semibold">Explore my journey!</p>
            <p className="text-xs text-muted-foreground">Check out my About, Experience, Projects, and Skills over here.</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center max-w-sm p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border pointer-events-none"
        >
            <ArrowDown className="h-6 w-6 text-primary mb-2 mx-auto" />
            <p className="text-sm font-semibold">Talk to my AI twin!</p>
            <p className="text-xs text-muted-foreground">Ask me anything about Yash, or use the suggestions to start.</p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.8, type: 'spring' } }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
            <div className="relative p-8 bg-background/50 backdrop-blur-md rounded-xl border border-border" onClick={onClose}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground cursor-pointer z-10">
                    <X className="h-5 w-5" />
                </button>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Welcome to my Portfolio! 🚀</h2>
                <p className="text-muted-foreground">Click anywhere to start the interview.</p>
            </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
