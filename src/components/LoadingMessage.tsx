
import React from 'react';
import Mascot from '@/components/convo/Mascot';

const LoadingMessage = () => (
  <div className="mb-8 text-left animate-fadeIn">
    <div className="max-w-4xl mr-auto">
      <div className="flex items-center gap-2.5 text-[13.5px] text-g-muted"><Mascot mood="wait" size={28} />Thinking…</div>
    </div>
  </div>
);

export default LoadingMessage;
