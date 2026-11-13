import React from 'react';
import { cn } from '@/lib/utils';

/**
 * The chat's mascot: Yash's triquetra mark with a few moods.
 *  idle   – slow breathing glow
 *  greet  – spins in once (page load)
 *  think  – one full turn (an answer is arriving)
 *  wait   – keeps turning (waiting on the live chatbot)
 */
export type MascotMood = 'idle' | 'greet' | 'think' | 'wait';

type MascotProps = {
  mood?: MascotMood;
  size?: number;
  framed?: boolean;
  className?: string;
};

const Mascot = ({ mood = 'idle', size = 26, framed = true, className }: MascotProps) => {
  const img = (
    <img
      src="/images/triquetra-logo.png"
      alt=""
      aria-hidden
      draggable={false}
      className={cn('mascot-mark select-none', `mascot-${mood}`)}
      style={{ width: framed ? Math.round(size * 0.62) : size, height: framed ? Math.round(size * 0.62) : size }}
    />
  );

  if (!framed) return <span className={cn('inline-grid place-items-center', className)}>{img}</span>;

  return (
    <span
      className={cn(
        'mascot inline-grid flex-none place-items-center rounded-[8px] border border-g-line-2 bg-g-raised',
        className
      )}
      style={{ width: size, height: size }}
    >
      {img}
    </span>
  );
};

export default Mascot;
