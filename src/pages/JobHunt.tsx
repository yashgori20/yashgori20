import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Clipboard,
  Check,
  ExternalLink,
  Flame,
  Newspaper,
  Radar,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';

type QueryCard = {
  id: string;
  title: string;
  tag?: string;
  why: string;
  query: string;
  hot?: boolean;
};

type LinkCard = {
  title: string;
  description: string;
  url: string;
  source?: string;
};

const dayOffset = (days: number) => {
  const date = new Date(Date.now() - days * 864e5);
  return date.toISOString().slice(0, 10);
};

const xSearchUrl = (query: string) =>
  `https://x.com/search?f=live&q=${encodeURIComponent(query)}`;

const redditSearchUrl = (subreddit: string, query: string) =>
  `https://www.reddit.com/r/${subreddit}/search/?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new&t=month`;

const googleUrl = (query: string, range = 'm') =>
  `https://www.google.com/search?q=${encodeURIComponent(query)}&tbs=qdr:${range}`;

const userBoards: LinkCard[] = [
  {
    title: 'JobLeads',
    description: 'Product Manager roles in India with salary filter already set.',
    url: 'https://www.jobleads.com/search/jobs?keywords=Product+Manager&location=&location_country=IND&minSalary=10000&maxSalary=-1',
    source: 'Active board',
  },
  {
    title: 'Instahyre',
    description: 'Remote and India product-management matches with 2 years selected.',
    url: 'https://www.instahyre.com/candidate/opportunities/?company_size=0&job_functions=%2Fapi%2Fv1%2Fjob_function%2F11,%2Fapi%2Fv1%2Fjob_category%2F2,%2Fapi%2Fv1%2Fjob_function%2F12&job_type=0&location=Work+From+Home,Anywhere+in+India&search=true&skills=Product+Management&years=2',
    source: 'Active board',
  },
  {
    title: 'Wellfound',
    description: 'Startup product roles and founder-led hiring.',
    url: 'https://wellfound.com/jobs',
    source: 'Active board',
  },
  {
    title: 'Naukri',
    description: 'Associate PM roles with 1 year and 15-25 LPA filter.',
    url: 'https://www.naukri.com/associate-product-manager-jobs?k=associate%20product%20manager&nignbevent_src=jobsearchDeskGNB&experience=1&ctcFilter=15to25',
    source: 'Active board',
  },
  {
    title: 'SimpleApply',
    description: 'Application dashboard for tracked job applications.',
    url: 'https://simpleapply.ai/dashboard',
    source: 'Tracker',
  },
  {
    title: 'Foundit',
    description: 'India job-board profile and recommendations.',
    url: 'https://www.foundit.in/user',
    source: 'Active board',
  },
  {
    title: 'Cutshort',
    description: 'Matched roles and startup hiring conversations.',
    url: 'https://cutshort.io/profile/all-jobs?matchesfor=685952c1695421bd9592119c',
    source: 'Active board',
  },
  {
    title: 'Hirist',
    description: 'Early-career tech and product feed.',
    url: 'https://www.hirist.tech/jobfeed?minexp=0&maxexp=1',
    source: 'Active board',
  },
];

const signalBoards: LinkCard[] = [
  {
    title: 'GeekWire fundings',
    description: 'Fresh funding signals. Look for newly funded teams before PM jobs appear.',
    url: 'https://www.geekwire.com/fundings/',
    source: 'Funding signal',
  },
  {
    title: 'Product Hunt',
    description: 'New AI products, launch teams, and founders worth replying to.',
    url: 'https://www.producthunt.com/',
    source: 'Launch signal',
  },
  {
    title: 'Peerlist',
    description: 'Founder and operator posts from the Indian product community.',
    url: 'https://peerlist.io/scroll',
    source: 'Community signal',
  },
  {
    title: 'AIApply',
    description: 'Application tooling and AI role discovery.',
    url: 'https://aiapply.co/',
    source: 'Search helper',
  },
  {
    title: 'YC AI companies',
    description: 'Target list for AI startups to research and contact directly.',
    url: 'https://www.ycombinator.com/companies/industry/ai',
    source: 'Company list',
  },
];

const startupBoards: LinkCard[] = [
  {
    title: 'Wellfound India PM',
    description: 'Startup-first PM roles in India.',
    url: 'https://wellfound.com/role/l/product-manager/india',
  },
  {
    title: 'Y Combinator PM jobs',
    description: 'Product roles at YC-backed startups.',
    url: 'https://www.ycombinator.com/jobs/role/product-manager',
  },
  {
    title: 'Work at a Startup',
    description: 'Direct applications into YC startup teams.',
    url: 'https://www.workatastartup.com/jobs',
  },
  {
    title: 'iimjobs AI PM',
    description: 'India PM roles, usually more senior-skewed.',
    url: 'https://www.iimjobs.com/k/ai-product-management-jobs',
  },
  {
    title: 'The Product Folks',
    description: 'India PM community, events, referrals, and job board.',
    url: 'https://www.theproductfolks.com/',
  },
  {
    title: 'Startup.jobs India PM',
    description: 'Aggregator for smaller startup roles.',
    url: 'https://startup.jobs/locations/india/product-manager',
  },
];

const redditBoards: LinkCard[] = [
  {
    title: 'r/ProductManagement',
    description: 'Hiring posts from product managers.',
    url: redditSearchUrl('ProductManagement', 'hiring OR "we are hiring" OR job'),
  },
  {
    title: 'r/PMCareers',
    description: 'Breaking-in posts, referrals, and PM career leads.',
    url: redditSearchUrl('PMCareers', 'APM OR "associate product manager" OR "junior product manager" OR referral'),
  },
  {
    title: 'r/developersIndia',
    description: 'India roles that may not show up on PM boards.',
    url: redditSearchUrl('developersIndia', '"product manager" OR "product role"'),
  },
  {
    title: 'r/startups',
    description: 'Founder-posted hiring threads.',
    url: redditSearchUrl('startups', 'hiring "product manager"'),
  },
  {
    title: 'r/LocalLLaMA',
    description: 'AI teams hiring builders and product people.',
    url: redditSearchUrl('LocalLLaMA', 'hiring OR "looking for"'),
  },
  {
    title: 'Reddit catch-all',
    description: 'All-subreddit sweep for APM and associate PM hiring in India.',
    url: `https://www.reddit.com/search/?q=${encodeURIComponent('("associate product manager" OR APM OR "junior product manager") India hiring')}&sort=new&t=month`,
  },
];

const xrayBoards: LinkCard[] = [
  {
    title: 'Ashby APM / Associate PM',
    description: 'Associate and junior product roles on Ashby boards.',
    url: googleUrl('site:jobs.ashbyhq.com ("associate product manager" OR "APM" OR "junior product manager") (india OR remote OR mumbai OR bangalore OR bengaluru OR pune)'),
  },
  {
    title: 'Greenhouse APM / Associate PM',
    description: 'Early-career product roles across Greenhouse.',
    url: googleUrl('site:job-boards.greenhouse.io ("associate product manager" OR "APM" OR "junior product manager") (india OR remote OR mumbai OR bangalore OR bengaluru OR pune)'),
  },
  {
    title: 'Lever APM / Associate PM',
    description: 'Direct company board search for APM and associate PM roles.',
    url: googleUrl('site:jobs.lever.co ("associate product manager" OR "APM" OR "junior product manager") (india OR remote OR mumbai OR bangalore OR bengaluru OR pune)'),
  },
  {
    title: '0-2 years across ATS',
    description: 'Early-career PM variants on Ashby, Greenhouse, and Lever.',
    url: googleUrl('(site:jobs.ashbyhq.com OR site:job-boards.greenhouse.io OR site:jobs.lever.co) ("0-2 years" OR "0 to 2 years" OR "1-2 years" OR "1 to 2 years" OR "entry level" OR "early career") ("product manager" OR "associate product manager" OR APM) (india OR remote)'),
  },
  {
    title: 'Mumbai / Pune PM roles',
    description: 'Local-first PM search, with nearby Pune included.',
    url: googleUrl('(site:jobs.ashbyhq.com OR site:job-boards.greenhouse.io OR site:jobs.lever.co) ("associate product manager" OR "APM" OR "junior product manager" OR "product manager") (mumbai OR pune)'),
  },
  {
    title: 'Fintech PM roles',
    description: 'Fintech is a priority lane, not a hard requirement.',
    url: googleUrl('(site:jobs.ashbyhq.com OR site:job-boards.greenhouse.io OR site:jobs.lever.co) (fintech OR payments OR banking OR lending OR credit OR wealth) ("associate product manager" OR "APM" OR "junior product manager" OR "product manager") (india OR remote OR mumbai)'),
  },
  {
    title: 'AI PM roles',
    description: 'AI-focused PM roles as a preference lane.',
    url: googleUrl('(site:jobs.ashbyhq.com OR site:job-boards.greenhouse.io OR site:jobs.lever.co) (AI OR "artificial intelligence") ("associate product manager" OR "APM" OR "junior product manager" OR "product manager") (india OR remote OR mumbai)'),
  },
  {
    title: 'LinkedIn APM hiring posts',
    description: 'People posting APM and associate PM openings directly.',
    url: googleUrl('site:linkedin.com/posts ("associate product manager" OR "APM" OR "junior product manager") ("we are hiring" OR "we\'re hiring" OR "hiring for" OR "looking for") (india OR mumbai OR bangalore OR bengaluru OR pune) -internship -intern'),
  },
  {
    title: 'LinkedIn 0-2 years posts',
    description: 'LinkedIn posts mentioning early-career PM experience bands.',
    url: googleUrl('site:linkedin.com/posts ("product manager" OR "associate product manager" OR "APM") ("0-2 years" OR "0 to 2 years" OR "1-2 years" OR "1 to 2 years" OR "early career") (india OR mumbai OR bangalore OR bengaluru OR pune) -internship -intern'),
  },
  {
    title: 'LinkedIn fintech PM posts',
    description: 'Fintech hiring posts for PM, APM, and associate PM roles.',
    url: googleUrl('site:linkedin.com/posts ("product manager" OR "associate product manager" OR "APM") (fintech OR payments OR banking OR lending OR credit OR wealth) ("we are hiring" OR "we\'re hiring" OR "hiring for" OR "looking for") india -internship -intern'),
  },
  {
    title: 'VC portfolio jobs',
    description: 'Peak XV, Blume, Accel, Elevation, and Antler portfolio hiring.',
    url: googleUrl('(peak xv OR blume OR accel india OR elevation capital OR antler india) portfolio jobs ("associate product manager" OR "APM" OR "junior product manager" OR "product manager")'),
  },
];

const JobHunt = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const queries = useMemo<QueryCard[]>(() => {
    const d14 = dayOffset(14);
    const d30 = dayOffset(30);
    const d45 = dayOffset(45);
    const india = '(india OR mumbai OR pune OR bangalore OR bengaluru OR gurgaon OR gurugram OR delhi OR noida OR hyderabad OR chennai OR remote)';
    const earlyProductRoles = '("associate product manager" OR "APM" OR "junior product manager")';
    const hiringIntent = '("we are hiring" OR "we\'re hiring" OR "I am hiring" OR "we\'re looking for" OR "looking for" OR "join us")';
    const noiseBlockers = '-filter:replies -course -courses -webinar -newsletter -"job alert" -"job alerts" -"hiring platform" -"apply now"';

    return [
      {
        id: 'funding',
        title: 'APM / Associate PM, India',
        tag: 'daily core',
        hot: true,
        why: 'The main search: PM-only, early-career titles, India and relocation-friendly locations.',
        query: `${hiringIntent} ${earlyProductRoles} ${india} ${noiseBlockers} since:${d14}`,
      },
      {
        id: 'mumbai',
        title: 'Mumbai and nearby PM roles',
        tag: 'home base',
        why: 'Mumbai first, Pune nearby, but still only product roles.',
        query: `${hiringIntent} ("product manager" OR "associate product manager" OR "APM" OR "junior product manager") (mumbai OR pune OR "navi mumbai" OR thane) ${noiseBlockers} since:${d30}`,
      },
      {
        id: 'zero-two',
        title: 'PM roles with 0-2 years',
        tag: 'early career',
        why: 'Some posts say experience band instead of APM, so this catches 0-2, 1-2, and entry-level variants.',
        query: `${hiringIntent} ("product manager" OR "associate product manager" OR "APM") ("0-2 years" OR "0 to 2 years" OR "1-2 years" OR "1 to 2 years" OR "entry level" OR "early career" OR "1.5 years") ${india} ${noiseBlockers} since:${d30}`,
      },
      {
        id: 'fintech',
        title: 'Fintech PM roles',
        tag: 'priority',
        why: 'Fintech is a target lane, especially payments, banking, lending, credit, wealth, and compliance products.',
        query: `${hiringIntent} ("product manager" OR "associate product manager" OR "APM" OR "junior product manager") (fintech OR payments OR banking OR lending OR credit OR wealth OR compliance) ${india} ${noiseBlockers} since:${d30}`,
      },
      {
        id: 'ai-pm',
        title: 'AI PM preference lane',
        why: 'AI is a strong preference, so it gets its own focused search instead of becoming a blocker everywhere.',
        query: `${hiringIntent} ("AI product manager" OR "AI PM" OR "associate product manager" OR "APM" OR "product manager") (AI OR "artificial intelligence") ${india} ${noiseBlockers} since:${d30}`,
      },
      {
        id: 'founding',
        title: 'Founding or first PM',
        why: 'Startup teams may skip APM titles but still need someone early who can own product work.',
        query: `${hiringIntent} ("founding PM" OR "founding product manager" OR "first PM" OR "first product hire" OR "product generalist") ${india} ${noiseBlockers} since:${d45}`,
      },
    ];
  }, []);

  const copyQuery = async (id: string, query: string) => {
    await navigator.clipboard.writeText(query);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1200);
  };

  const openDaily = () => {
    queries.forEach((query, index) => {
      window.setTimeout(() => window.open(xSearchUrl(query.query), '_blank', 'noopener,noreferrer'), index * 350);
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f8]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0c10]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-[#a4a8b5] transition hover:bg-white/5 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <div className="hidden items-center gap-2 text-xs text-[#a4a8b5] sm:flex">
            <Radar className="h-4 w-4 text-[#ffe94b]" />
            Dates roll to {today}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <section className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#ffe94b]/30 bg-[#ffe94b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffe94b]">
              <Sparkles className="h-3.5 w-3.5" />
              Job hunt console
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              A live launchpad for finding APM and PM roles before they get crowded.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#aeb2bd]">
              Daily X searches, saved job boards, startup signals, Reddit, and ATS X-ray searches in one place.
              Built for a Mumbai-based PM with 1.5 years of experience, open to relocate in India,
              with fintech and AI as priority lanes.
            </p>
          </div>

          <div className="border-l-2 border-[#a78bfa] bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-3">
              <Flame className="h-5 w-5 text-[#ffe94b]" />
              <div>
                <p className="text-sm font-semibold text-white">Morning sweep</p>
                <p className="text-xs text-[#8f95a3]">Open the six X searches, switch to Latest, act on anything under 48 hours.</p>
              </div>
            </div>
            <button
              onClick={openDaily}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ffe94b] bg-[#ffe94b] px-4 py-3 text-sm font-bold text-[#171407] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ffe94b]/60"
            >
              <Search className="h-4 w-4" />
              Open the 6 daily searches
            </button>
          </div>
        </section>

        <SectionTitle icon={Target} title="X searches" aside="Daily - 5 minutes" />
        <div className="grid gap-3">
          {queries.map((query) => (
            <article
              key={query.id}
              className={`rounded-lg border p-4 ${
                query.hot
                  ? 'border-[#a78bfa]/45 bg-[linear-gradient(180deg,#171225,#111217)]'
                  : 'border-white/10 bg-white/[0.035]'
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-white">{query.title}</h2>
                    {query.tag && (
                      <span className="rounded bg-[#2a2440] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c4b5fd]">
                        {query.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#9aa0ad]">{query.why}</p>
                </div>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-md border border-white/10 bg-[#17191f] p-3 text-xs leading-5 text-[#c4c8d2]">
                <code>{query.query}</code>
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={xSearchUrl(query.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-[#a78bfa] bg-[#a78bfa] px-3 py-2 text-sm font-semibold text-[#141020] transition hover:brightness-110"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open on X
                </a>
                <button
                  onClick={() => copyQuery(query.id, query.query)}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white transition hover:border-[#a78bfa] hover:text-[#c4b5fd] focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/50"
                >
                  {copiedId === query.id ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  {copiedId === query.id ? 'Copied' : 'Copy'}
                </button>
              </div>
            </article>
          ))}
        </div>

        <SectionTitle icon={BriefcaseBusiness} title="Boards you check" aside="Your saved links" />
        <LinkGrid items={userBoards} />

        <SectionTitle icon={Newspaper} title="Signal feeds" aside="Find companies before roles" />
        <LinkGrid items={signalBoards} />

        <SectionTitle icon={Building2} title="Startup boards" aside="Already in the old console" />
        <LinkGrid items={startupBoards} />

        <SectionTitle icon={Search} title="Google X-ray" aside="ATS pages before aggregators" />
        <LinkGrid items={xrayBoards} />

        <SectionTitle icon={Radar} title="Reddit" aside="Community-led leads" />
        <LinkGrid items={redditBoards} />
      </main>
    </div>
  );
};

const SectionTitle = ({
  icon: Icon,
  title,
  aside,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  aside: string;
}) => (
  <div className="mb-4 mt-12 flex flex-wrap items-center gap-3">
    <Icon className="h-5 w-5 text-[#ffe94b]" />
    <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#aeb2bd]">{title}</h2>
    <span className="text-sm text-[#a78bfa]">{aside}</span>
  </div>
);

const LinkGrid = ({ items }: { items: LinkCard[] }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <a
        key={`${item.title}-${item.url}`}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#a78bfa] hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-[#a78bfa]/50"
      >
        <div className="flex min-h-8 items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-white">{item.title}</h3>
          <ExternalLink className="h-4 w-4 shrink-0 text-[#7e8491] transition group-hover:text-[#c4b5fd]" />
        </div>
        <p className="mt-2 text-sm leading-6 text-[#9aa0ad]">{item.description}</p>
        {item.source && (
          <span className="mt-3 inline-flex rounded border border-white/10 px-2 py-1 text-[11px] text-[#aeb2bd]">
            {item.source}
          </span>
        )}
      </a>
    ))}
  </div>
);

export default JobHunt;
