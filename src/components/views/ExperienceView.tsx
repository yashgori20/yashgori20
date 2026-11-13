import React from 'react';
import Turn from '@/components/convo/Turn';
import Badges from '@/components/convo/Badges';
import { resumeData } from '@/data/resume';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const bullets: React.ReactNode[] = [
  <><strong>An AI agent with 140+ tools.</strong> It works off each company's own data: comparing suppliers, converting costs across currencies, running bulk actions. If a request is unclear it asks, if data is missing it says so, and it doesn't change anything without approval. We check its behaviour with evals.</>,
  <><strong>An MCP server over our APIs.</strong> You ask in plain English and it picks the right endpoint, fills in the payload and runs it. I built it because clients found the raw API format hard to work with. It's the agent we lead with in sales demos.</>,
  <><strong>OpenAPIs for SAP and ERP sync.</strong> Bulk create, update and fetch for items, vendors, POs and contracts, plus ID mapping and per-client API keys. Three clients bought them at ₹7⁠–⁠10L each and call them every day.</>,
  <><strong>A BOM Data Mapper.</strong> It takes the messy Excel, CSV and scanned PDF files clients send and turns them into clean multi-level parts lists. Two clients validated it at ₹10⁠–⁠12L a year.</>,
  <>I also own the purchase order and BOM modules for 4+ enterprise clients.</>,
];

const stats = [
  { value: '140+', label: 'tools in the agent' },
  { value: '40K+', label: 'POs and contracts on the APIs' },
  { value: '₹7⁠–⁠10L', label: 'per client, 3 clients paying' },
];

// "What are you working on right now?" → FactWise
const ExperienceView = (_props: ViewProps) => (
  <Turn
    id="experience"
    question="What are you working on right now?"
    tool="looked up experience · FactWise"
    headline="AI agents and APIs at FactWise."
  >
    <p className="rise max-w-[62ch] text-pretty text-[16.5px] leading-[1.7] text-g-text2">
      FactWise makes the software manufacturers use to source and buy parts. I'm the AI PM there: I talk to clients,
      write the specs and stay with engineering until it ships. When an idea is still fuzzy, I prototype it with AI first.
    </p>

    <div className="rise mt-6 rounded-[18px] border border-g-line bg-g-surface p-5 md:p-7" style={{ '--d': 1 } as React.CSSProperties}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[17px] font-semibold text-g-text">AI Product Manager · FactWise</h3>
        <span className="text-[13.5px] text-g-muted">Dec 2025 – now · Mumbai</span>
      </header>
      <ul className="mt-4 grid max-w-[66ch] list-disc gap-2.5 pl-[18px] text-[15.5px] leading-[1.65] text-g-text2 marker:text-g-faint [&_strong]:font-semibold [&_strong]:text-g-text">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {resumeData.experience[0].technologies && <Badges items={resumeData.experience[0].technologies} className="mt-5" />}
      <div className="mt-6 grid grid-cols-1 border-t border-g-line sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={
              i === 0
                ? 'py-4 sm:pb-0 sm:pr-4 sm:pt-5'
                : 'border-t border-g-line py-4 sm:border-l sm:border-t-0 sm:pb-0 sm:pl-5 sm:pr-4 sm:pt-5'
            }
          >
            <div className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-g-text tabular-nums">{s.value}</div>
            <div className="mt-2 text-[13.5px] leading-snug text-g-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </Turn>
);

export default ExperienceView;
