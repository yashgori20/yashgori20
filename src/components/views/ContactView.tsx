import React from 'react';
import { resumeData } from '@/data/resume';
import Turn from '@/components/convo/Turn';
import ContactForm from '@/components/ContactForm';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { View } from '@/types';

type ViewProps = {
  activeView: View;
  setActiveView: (view: View) => void;
};

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/pm.pdf';
  link.setAttribute('download', 'Yash Gori Resume.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const btn =
  'flex items-center justify-between rounded-xl px-[18px] py-3.5 text-[15.5px] transition-colors';

// "Can I get your resume?" → resume, email, LinkedIn, then the message form
const ContactView = (_props: ViewProps) => {
  const { contact } = resumeData;
  const whatsapp = `https://wa.me/91${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hi Yash! I saw your portfolio and would like to connect.'
  )}`;

  return (
    <Turn id="contact" question="Can I get your resume?" tool="attached Yash-Gori-Resume.pdf" headline="Sure, here it is.">
      <div className="rise mt-4 grid items-end gap-7 rounded-[20px] border border-g-line bg-g-surface p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
        <div>
          <p className="text-[clamp(26px,3vw,36px)] font-semibold leading-[1.1] tracking-[-0.035em] text-g-text">
            Yash Gori
          </p>
          <p className="mt-2 text-[15.5px] leading-relaxed text-g-muted">
            AI Product Manager · Based in {contact.location.split(',')[0]}.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-g-muted">
            <a href={contact.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-g-text">GitHub</a>
            <a href={contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="hover:text-g-text">Hugging Face</a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-g-text">WhatsApp</a>
            <a href={contact.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-g-text">X</a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={downloadResume} className={`${btn} bg-g-text font-semibold text-g-bg hover:bg-white`}>
            Download resume <ArrowDown className="h-4 w-4" />
          </button>
          <a href={`mailto:${contact.email}`} className={`${btn} border border-g-line text-g-text hover:bg-g-raised`}>
            Email Yash <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={contact.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn} border border-g-line text-g-text hover:bg-g-raised`}
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="rise mt-10" style={{ '--d': 1 } as React.CSSProperties}>
        <p className="mb-4 text-[14px] text-g-muted">You can also message me here</p>
        <ContactForm />
      </div>
    </Turn>
  );
};

export default ContactView;
