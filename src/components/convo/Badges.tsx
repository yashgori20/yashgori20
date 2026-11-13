import React from 'react';

// Small tech badges for role cards: quiet outlined pills in the Graphite palette
const Badges = ({ items, className = '' }: { items: string[]; className?: string }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`}>
    {items.map((t) => (
      <li
        key={t}
        className="rounded-full border border-g-line-2 bg-g-raised px-2.5 py-[3px] text-[12px] font-medium text-g-text2"
      >
        {t}
      </li>
    ))}
  </ul>
);

export default Badges;
