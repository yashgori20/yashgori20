import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { resumeData } from '@/data/resume';

type CaseStudyMeta = (typeof resumeData.caseStudies)[number];

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = resumeData.caseStudies.find((c) => c.slug === slug) as CaseStudyMeta | undefined;

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);

    if (!study) {
      setStatus('error');
      return;
    }

    // Inline-body case studies (no exported markdown file) render directly.
    if (!study.markdownPath) {
      setMarkdown(study.body ?? '');
      setStatus('ready');
      return;
    }

    setStatus('loading');
    fetch(study.markdownPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        // The exported markdown leads with an H1 title we already show in the header,
        // so strip that first heading to avoid a duplicate title. Handle CRLF (\r\n)
        // line endings from the Notion export and normalise them for the renderer.
        const normalised = text.replace(/\r\n/g, '\n');
        const cleaned = normalised.replace(/^\s*#\s.*\n+/, '');
        setMarkdown(cleaned);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [study]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      {/* Sticky top bar with back navigation */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0f0f0f]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link
            to="/?view=case-studies"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Case Studies
          </Link>
          <span className="text-xs text-gray-500">Yash Gori</span>
        </div>
      </header>

      {!study ? (
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="text-2xl font-bold text-white">Case study not found</h1>
          <p className="mt-2 text-gray-400">This case study doesn’t exist or may have moved.</p>
          <Link to="/?view=case-studies" className="mt-6 inline-block text-sm text-blue-400 hover:underline">
            ← Back to all case studies
          </Link>
        </div>
      ) : (
        <article className="mx-auto max-w-3xl px-5 py-10">
          {/* Title block */}
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-medium text-gray-300">
                {study.tag}
              </span>
              <span className="text-gray-500">
                {study.role} · {study.timeline}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{study.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">{study.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.focus.map((f) => (
                <span key={f} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          {status === 'loading' && (
            <div className="flex items-center gap-2 py-16 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading case study…
            </div>
          )}

          {status === 'error' && (
            <div className="py-16 text-gray-400">
              Couldn’t load this case study’s content. Please try again later.
            </div>
          )}

          {status === 'ready' && markdown && (
            <div
              className="prose prose-invert max-w-none
                prose-headings:font-semibold prose-headings:text-white
                prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                prose-h3:mt-6 prose-h3:text-gray-100
                prose-p:text-gray-300 prose-li:text-gray-300
                prose-strong:text-white
                prose-a:text-blue-400 hover:prose-a:text-blue-300
                prose-table:text-sm prose-th:text-gray-200 prose-td:text-gray-300
                prose-img:rounded-lg prose-img:border prose-img:border-white/10
                prose-hr:border-white/10
                prose-blockquote:border-l-white/20 prose-blockquote:text-gray-400"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          )}
        </article>
      )}
    </div>
  );
};

export default CaseStudyDetail;
