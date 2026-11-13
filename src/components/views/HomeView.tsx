import React from 'react';
import { resumeData } from '@/data/resume';
import { View } from '@/types';
import { Download, Linkedin, Github, Mail } from 'lucide-react';
import HuggingFaceLogo from '@/components/HuggingFaceLogo';
import XLogo from '@/components/XLogo';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const suggestions = [
  { label: 'What are you working on?', target: 'experience' },
  { label: 'What have you built?', target: 'projects' },
  { label: 'Can I get your resume?', target: 'contact' },
];

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/pm.pdf';
  link.setAttribute('download', 'Yash Gori Resume.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const { contact } = resumeData;
const pill =
  'inline-flex items-center gap-2 rounded-full border border-g-line px-4 py-2 text-[14px] text-g-text2 transition-colors hover:border-g-faint hover:bg-g-raised hover:text-g-text';
const iconBtn =
  'grid h-9 w-9 place-items-center rounded-full border border-g-line text-g-muted transition-colors hover:border-g-faint hover:bg-g-raised hover:text-g-text';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// The assistant's opening message
const HomeView = (_props: ViewProps) => (
  <section id="home" className="flex min-h-[calc(100vh-56px)] flex-col justify-center pb-28 pt-6 md:pt-8">
    <div className="hero-in">
      <div className="mb-6 flex items-center gap-3 text-[14px] text-g-muted">
        <img
          src={resumeData.profileImage}
          alt="Yash Gori"
          className="h-11 w-11 rounded-full border border-g-line-2 object-cover"
        />
        <span>
          <span className="block font-medium text-g-text2">AI Product Manager · FactWise</span>
          {contact.location}
        </span>
      </div>

      <h1 className="text-[clamp(50px,7.2vw,100px)] leading-[0.98] tracking-[-0.05em]">
        <span className="font-light text-g-hello">Hi, I'm </span>
        <span className="whitespace-nowrap font-bold text-g-text">Yash Gori.</span>
      </h1>

      <p className="mt-6 max-w-[40ch] text-pretty text-[clamp(18px,1.7vw,21px)] leading-[1.6] text-g-text2">
        {resumeData.heroLede}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        <button
          onClick={downloadResume}
          className="inline-flex items-center gap-2 rounded-full bg-g-text px-4 py-2 text-[14px] font-semibold text-g-bg transition-colors hover:bg-white"
        >
          <Download className="h-4 w-4" /> Resume
        </button>
        <a href={contact.links.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a href={contact.links.github} target="_blank" rel="noopener noreferrer" className={pill}>
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a href={`mailto:${contact.email}`} className={pill}>
          <Mail className="h-4 w-4" /> Email
        </a>
        <a href={contact.links.huggingface} target="_blank" rel="noopener noreferrer" aria-label="Hugging Face" className={iconBtn}>
          <HuggingFaceLogo className="h-4 w-4" />
        </a>
        <a href={contact.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className={iconBtn}>
          <XLogo className="h-3.5 w-3.5" />
        </a>
      </div>

      <dl className="mt-9 grid max-w-[720px] grid-cols-2 border-t border-g-line pt-6 sm:grid-cols-3">
        {resumeData.headlineMetrics.map((m, i) => (
          <div
            key={m.label}
            className={
              i === 0
                ? 'pr-5'
                : i === 1
                  ? 'border-l border-g-line pl-5 pr-5'
                  : 'col-span-2 mt-5 sm:col-span-1 sm:mt-0 sm:border-l sm:border-g-line sm:pl-5'
            }
          >
            <dt className="sr-only">{m.label}</dt>
            <dd className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-g-text tabular-nums">{m.value}</dd>
            <dd className="mt-2 text-balance text-[13.5px] leading-snug text-g-muted">{m.label}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-9">
        <p className="mb-3 text-[13.5px] text-g-muted">Or ask me</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => scrollTo(s.target)}
              className="rounded-xl border border-g-line px-[15px] py-2.5 text-[14.5px] text-g-text2 transition-colors hover:border-g-faint hover:bg-g-raised hover:text-g-text"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default HomeView;
