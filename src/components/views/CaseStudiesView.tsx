import React from 'react';
import { Link } from 'react-router-dom';
import { resumeData } from '@/data/resume';
import Section from '@/components/layout/Section';
import { ArrowUpRight } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const CaseStudiesView = ({ activeView, setActiveView }: ViewProps) => {
  return (
    <Section title="Case Studies" id="case-studies">
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
        Product teardowns and strategy write-ups across acquisition, engagement &amp; retention, and
        onboarding for products like JioCinema, Blinkit, Google Pay, Vercel and Fireflies.ai.
        Click any to read the full case study.
      </p>

      <div className="space-y-3">
        {resumeData.caseStudies.map((study, index) => (
          <Link
            key={study.slug}
            to={`/case-studies/${study.slug}`}
            className={`group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.05] animate-slideInUp animate-delay-${index * 100}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300">
                    {study.tag}
                  </span>
                  <span className="text-xs text-gray-500">
                    {study.role} · {study.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-white">
                  {study.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {study.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {study.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-gray-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-gray-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default CaseStudiesView;
