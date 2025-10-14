
import React, { useState } from 'react';
import { resumeData, CaseStudy } from '@/data/resume';
import Section from '@/components/layout/Section';
import { ArrowUpRight } from 'lucide-react';
import { View } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const CaseStudiesView = ({ activeView, setActiveView }: ViewProps) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const getCaseStudyImage = (index: number) => {
    // Case studies use c1.png, c2.png, etc.
    const caseStudyNumber = index + 1;
    return `/images/projects/c${caseStudyNumber}.png`;
  };

  return (
    <Section title="Case Studies" id="case-studies">
      <div className="space-y-6">
        {resumeData.caseStudies.map((study: CaseStudy, index) => (
          <div key={study.title}>
            <div
              className={`py-6 group cursor-pointer animate-slideInUp animate-delay-${index * 100}`}
              onClick={() => handleCaseStudyClick(study)}
            >
              {/* 65/35 Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-center mr-8">
                {/* 65% - Case Study Content */}
                <div className="lg:col-span-6 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gray-200 transition-colors">{study.title}</h3>
                  <div className="text-sm text-gray-400 mb-3">
                    <span className="font-medium">{study.role}</span> • {study.timeline}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{study.context}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.focus.map(item => (
                      <span key={item} className="px-3 py-1 text-gray-300 text-xs font-medium">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Click to read full case study</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* 35% - Case Study Image with Dark Glass Overlay */}
                <div className="lg:col-span-4 hidden lg:block">
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-gray-900 to-gray-800">
                    <img
                      src={getCaseStudyImage(index)}
                      alt={`${study.title} preview`}
                      className="w-full h-48 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Dark Glass Overlay */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subtle separator line */}
            {index < resumeData.caseStudies.length - 1 && (
              <div className="border-b border-gray-200/20 my-6"></div>
            )}
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-gray-700">
          {selectedCaseStudy && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-2">
                  {selectedCaseStudy.title}
                </DialogTitle>
                <div className="text-sm text-gray-400">
                  <span className="font-medium">{selectedCaseStudy.role}</span> • {selectedCaseStudy.timeline}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Focus Areas */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.focus.map(item => (
                      <span key={item} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Context */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Context</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedCaseStudy.context}</p>
                </div>

                {/* Problem */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Problem</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedCaseStudy.problem}</p>
                </div>

                {/* Process */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Process</h4>
                  <div className="space-y-3">
                    {selectedCaseStudy.process.map((step, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                          {idx + 1}
                        </div>
                        <p className="text-gray-400 leading-relaxed flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Outcome</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedCaseStudy.outcome}</p>
                </div>

                {/* Reflection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Reflection</h4>
                  <p className="text-gray-400 leading-relaxed">{selectedCaseStudy.reflection}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default CaseStudiesView;
