
import { useCallback } from 'react';

export const useSound = () => {
    const playPopSound = useCallback(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            return;
        }

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            
            oscillator.start(audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.05);
            oscillator.stop(audioContext.currentTime + 0.05);
        } catch (error) {
            console.error("Could not play sound", error);
        }
    }, []);
    
    return { playPopSound };
}
