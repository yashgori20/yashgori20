import React, { useEffect, useRef, useState } from 'react';
import Mascot from './Mascot';

/**
 * One exchange in the portfolio "conversation":
 * visitor's question (right bubble) → tool-call line → answer headline → answer body.
 * Reveals itself once when scrolled into view; children opt into the stagger with `.rise`.
 */
type TurnProps = {
  id: string;
  question: string;
  tool: string;
  headline: string;
  children?: React.ReactNode;
};


const Turn = ({ id, question, tool, headline, children }: TurnProps) => {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = headline.split(' ');

  return (
    <section id={id} ref={ref} data-seen={seen} className="convo-turn scroll-mt-4 pb-4 pt-20 md:pt-28">
      <div className="mb-8 flex justify-end">
        <p className="turn-q max-w-[90%] rounded-[20px] rounded-br-md border border-g-line-2 bg-g-bubble px-[18px] py-3 text-[17px] font-medium leading-snug text-g-text md:max-w-[75%]">
          {question}
        </p>
      </div>

      <div className="turn-tool mb-6 flex items-center gap-2 font-mono text-[12.5px] text-g-muted md:ml-[40px]">
        <span className="md:hidden">
          <Mascot mood={seen ? 'think' : 'idle'} size={22} />
        </span>
        <span className="hidden h-1.5 w-1.5 rounded-full bg-g-faint md:inline-block" />
        {tool}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[28px_1fr]">
        <div className="hidden pt-[5px] md:block">
          <Mascot mood={seen ? 'think' : 'idle'} size={28} />
        </div>
        <div className="min-w-0">
          <h2
            aria-label={headline}
            className="mb-3 text-balance text-[clamp(26px,3vw,38px)] font-semibold leading-[1.12] tracking-[-0.03em] text-g-text"
          >
            {words.flatMap((w, i) => {
              const word = (
                <span key={i} aria-hidden className="turn-w inline-block" style={{ '--i': i } as React.CSSProperties}>
                  {w}
                </span>
              );
              // plain-string spaces between inline-block words keep normal line wrapping
              return i === 0 ? [word] : [' ', word];
            })}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Turn;
