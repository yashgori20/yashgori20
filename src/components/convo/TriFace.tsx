import React from 'react';

/** Tri's face (triquetra + blinking eyes), for places where Tri introduces itself. */
const TriFace = ({ size = 72, look = { x: 0, y: 0 } }: { size?: number; look?: { x: number; y: number } }) => {
  const eye = (left: string) => (
    <span className="tri-eye absolute top-[46%] h-[22%] w-[22%] rounded-full bg-g-text ring-2 ring-g-bg" style={{ left }}>
      <span
        className="absolute left-1/2 top-1/2 h-[52%] w-[52%] rounded-full bg-g-bg"
        style={{ transform: `translate(calc(-50% + ${look.x * 2.6}px), calc(-50% + ${look.y * 2.6}px))` }}
      />
    </span>
  );
  return (
    <span className="tri-body relative inline-block drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)]" style={{ width: size, height: size }}>
      <img src="/images/triquetra-logo.png" alt="" aria-hidden draggable={false} className="h-full w-full select-none" />
      {eye('26.5%')}
      {eye('51.5%')}
    </span>
  );
};

export default TriFace;
