
import { useCallback } from 'react';

let audioContext: AudioContext | null = null;
const getAudioContext = () => {
    if (typeof window !== 'undefined') {
        if (!audioContext) {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }
    return audioContext;
};

export const useSound = () => {
  const playPop = useCallback(() => {
    const context = getAudioContext();
    if (!context) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
        if (context.state === 'suspended') {
            context.resume();
        }
        
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, context.currentTime);
        gainNode.gain.setValueAtTime(0.5, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    } catch (error) {
        console.error("Error playing sound:", error);
    }
  }, []);

  return { playPop };
};
