import React, { useEffect, useRef, useState } from 'react';

/**
 * Tri: the portfolio's mascot. Yash's triquetra with a face.
 * - eyes follow the cursor and blink now and then
 * - hops and says something when you reach a new section
 * - click to open the chat
 */
const lines: Record<string, string> = {
  home: "Hi, I'm Tri. Scroll, or ask me anything.",
  experience: 'The MCP part is my favourite.',
  journey: 'This is where the building started.',
  projects: 'Click any card, they open up.',
  'case-studies': 'Good reads. Bring chai.',
  skills: 'All of these get used. Promise.',
  about: 'The background bit.',
  contact: 'The resume is the white button.',
};

type BuddyProps = {
  section: string;
  onOpenChat: () => void;
  hidden?: boolean;
};

const Buddy = ({ section, onOpenChat, hidden }: BuddyProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [say, setSay] = useState<string | null>(null);
  const [hop, setHop] = useState(0);
  const mounted = useRef(false);

  // eyes follow the cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = btnRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.56);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 240);
      setLook({ x: (dx / d) * k, y: (dy / d) * k });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // react to a new section
  useEffect(() => {
    const delay = mounted.current ? 250 : 1400;
    mounted.current = true;
    const show = setTimeout(() => {
      setSay(lines[section] ?? null);
      setHop((h) => h + 1);
    }, delay);
    const hide = setTimeout(() => setSay(null), delay + 3600);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [section]);

  const click = () => {
    setSay("Let's chat.");
    setHop((h) => h + 1);
    setTimeout(onOpenChat, 650);
  };

  if (hidden) return null;

  const eye = (left: string) => (
    <span className="tri-eye absolute top-[46%] h-[22%] w-[22%] rounded-full bg-g-text ring-2 ring-g-bg" style={{ left }}>
      <span
        className="absolute left-1/2 top-1/2 h-[52%] w-[52%] rounded-full bg-g-bg transition-transform duration-150 ease-out"
        style={{ transform: `translate(calc(-50% + ${look.x * 2.6}px), calc(-50% + ${look.y * 2.6}px))` }}
      />
    </span>
  );

  return (
    <div className="pointer-events-none fixed bottom-[92px] right-4 z-50 flex items-end gap-2 xl:bottom-6 xl:right-6">
      {say && (
        <div
          key={say + hop}
          role="status"
          className="tri-bubble pointer-events-auto mb-11 max-w-[210px] rounded-2xl rounded-br-md border border-g-line-2 bg-g-raised px-3.5 py-2.5 text-[13.5px] leading-snug text-g-text shadow-[0_14px_30px_-16px_rgba(0,0,0,0.9)]"
        >
          {say}
        </div>
      )}
      <button
        ref={btnRef}
        onClick={click}
        onMouseEnter={() => !say && setSay('Psst. Click me to chat.')}
        onMouseLeave={() => setSay((s) => (s === 'Psst. Click me to chat.' ? null : s))}
        aria-label="Chat with Tri, Yash's assistant"
        className="tri pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-transparent drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)] xl:h-14 xl:w-14"
      >
        <span key={hop} className="tri-body relative block h-full w-full">
          <img src="/images/triquetra-logo.png" alt="" draggable={false} className="h-full w-full select-none" />
          {eye('26.5%')}
          {eye('51.5%')}
        </span>
      </button>
    </div>
  );
};

export default Buddy;
