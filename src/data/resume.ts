export type Project = {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image?: string;
  codeUrl?: string;
  liveUrl?: string;
};

export const resumeData = {
  name: "Yash Gori",
  contact: {
    email: "yashnileshgori@gmail.com",
    phone: "7718081766",
    location: "Mumbai, Maharashtra",
    links: {
      linkedin: "https://linkedin.com/in/yashgori20",
      github: "https://github.com/yashgori20",
      huggingface: "https://huggingface.co/yashgori20",
      instagram: "https://www.instagram.com/yashgori20",
      twitter: "https://twitter.com/yashgori20",
    },
  },
  profileImage: "https://avatars.githubusercontent.com/u/72080079?v=4",

  about:
    "I'm an AI Product Manager who ships. I don't just write the spec, I build and deploy the product, using AI as my engineering force-multiplier to take ideas from PRD to production. I've shipped GenAI products to enterprise clients, secured Microsoft for Startups funding, and turned manual workflows into systems that run themselves.",

  // One-line positioning shown under the greeting; names the AI-builder edge explicitly
  // (hiring managers now screen for AI fluency / ability to ship, not just talk about it).
  tagline:
    "AI Product Manager who ships. I scope, build and deploy AI products end-to-end, not just spec them.",

  // Front-loaded outcome metrics for the home screen (the "first 6 seconds" proof).
  // These reflect real shipped work: FactWise OpenAPI volume and enterprise clients,
  // plus the Webotix QC-document outcome and Microsoft for Startups funding.
  headlineMetrics: [
    { value: "40K+", label: "live POs & contracts", sub: "created via my OpenAPIs" },
    { value: "4+", label: "enterprise clients", sub: "live in production" },
    { value: "90%", label: "faster QC-doc creation", sub: "GenAI QC at Webotix" },
    { value: "$5K", label: "Microsoft for Startups grant", sub: "secured by pitching" },
  ],

  whatIBring:
    `Technical Depth: I design RAG systems, production APIs, and low-latency inference pipelines with an obsession for reliability and measurable impact.
Product Strategy: I convert ambiguous opportunities into clear roadmaps, PRDs, and prioritised backlogs that align engineering effort with business outcomes.
Execution Ownership: I take products from prototype → pilot → paid deployment, handling architecture, delivery and stakeholder alignment end-to-end.
Systems Thinking: I optimise the whole system (data, infra, UX, human-in-the-loop) rather than only tuning models.
Cross-functional Communication: I translate technical tradeoffs into business language for execs while giving engineers concrete acceptance criteria and metrics.
Impact-minded Metrics: I focus on the numbers that matter (accuracy, latency, adoption, ROI) and design experiments to make them move.`,

  languages: [
    "English (Fluent)",
    "Hindi (Native)",
    "Gujarati (Native)",
    "Marathi (Conversational)"
  ],

  education: [
    {
      institution: "K.J. SOMAIYA COLLEGE OF ENGINEERING",
      degree: "B.Tech in Information Technology",
      period: "2021 – 2025",
      details: "CGPA – 8.12/10",
    },
    {
      institution: "LAKSHYA JUNIOR COLLEGE",
      degree: "12th (HSC)",
      period: "2021",
      details: "84.17%",
    },
  ],

  skills: {
    "Product": [
      { name: "Product Strategy", level: 95, category: "Product" },
      { name: "Roadmap Planning", level: 92, category: "Product" },
      { name: "Go-to-Market (GTM)", level: 90, category: "Product" },
      { name: "Product Discovery", level: 92, category: "Product" },
      { name: "Agile/Scrum", level: 92, category: "Product" },
      { name: "Prioritization (MoSCoW/RICE)", level: 90, category: "Product" },
      { name: "KPI & Success Metrics", level: 92, category: "Product" },
      { name: "A/B Testing", level: 88, category: "Product" },
      { name: "Agentic/AI Product Design", level: 92, category: "Product" },
    ],
    "AI/ML": [
      { name: "Agentic AI & MCP (Model Context Protocol)", level: 94, category: "AI/ML" },
      { name: "RAG with vector databases (FAISS/Pinecone)", level: 96, category: "AI/ML" },
      { name: "LLM integration (GPT, Claude, Gemini, Mixtral)", level: 92, category: "AI/ML" },
      { name: "Prompt Engineering", level: 95, category: "AI/ML" },
      { name: "Context Management", level: 92, category: "AI/ML" },
    ],
    "AI-Assisted Build": [
      { name: "Claude Code", level: 95, category: "AI-Assisted Build" },
      { name: "Cursor", level: 92, category: "AI-Assisted Build" },
      { name: "Codex", level: 90, category: "AI-Assisted Build" },
      { name: "Gemini CLI", level: 88, category: "AI-Assisted Build" },
    ],
    "Tools & Data": [
      { name: "Jira", level: 92, category: "Tools & Data" },
      { name: "Figma", level: 92, category: "Tools & Data" },
      { name: "Notion", level: 92, category: "Tools & Data" },
      { name: "Power BI", level: 88, category: "Tools & Data" },
      { name: "Python", level: 96, category: "Tools & Data" },
      { name: "SQL", level: 90, category: "Tools & Data" },
      { name: "FastAPI", level: 90, category: "Tools & Data" },
      { name: "React", level: 88, category: "Tools & Data" },
      { name: "Azure", level: 88, category: "Tools & Data" },
      { name: "Docker", level: 88, category: "Tools & Data" },
      { name: "REST APIs", level: 92, category: "Tools & Data" }
    ]
  },

  projects: [
    {
      title: "Interactive AI Portfolio + Chatbot",
      description:
        `A chat-first portfolio whose live assistant answers questions about me. I engineered grounding, model selection and guardrails to cut hallucination and token cost.`,
      technologies: [
        "React",
        "TypeScript",
        "Flask",
        "Groq",
        "GPT-OSS-120B",
        "RAG",
      ],
      features: [
        "Built a live assistant that answers visitor questions about my background, skills and projects, grounded in my real resume content.",
        "Engineered grounding, model selection and guardrails to cut hallucination and token cost.",
        "Chat-first UX that guides visitors through case studies and code from conversation context."
      ],
      image: "/images/projects/p1.png",
      codeUrl: "https://github.com/yashgori20/yashgori20",
      liveUrl: "https://yashgori20.vercel.app/",
    },
    {
      title: "Inhance: LinkedIn & Resume Optimization Platform",
      description:
        `A multi-agent, ATS-scoring pipeline that produces role-optimized suggestions and a LaTeX resume.`,
      technologies: [
        "Streamlit",
        "GROQ",
        "Mixtral",
        "Multi-Agent",
      ],
      features: [
        "Built a multi-agent pipeline that evaluates LinkedIn profiles and resumes against a target role.",
        "Implemented ATS scoring and role-optimized suggestions to improve recruiter-facing signals.",
        "Generates a tailored LaTeX resume from the optimized content."
      ],
      image: "/images/projects/p3.png",
      codeUrl: "https://github.com/yashgori20/Inhance",
      liveUrl: "https://yashgori20-Inhance.hf.space",
    },
    {
      title: "DocuTalk: AI Document Intelligence Platform",
      description:
        `A cross-platform RAG assistant for conversational Q&A across any document.`,
      technologies: [
        "Gemini",
        "FAISS",
        "LangChain",
        "Flutter",
      ],
      features: [
        "Built a RAG assistant for conversational Q&A across any document.",
        "Engineered FAISS-backed semantic retrieval and a multi-turn dialogue layer for context-aware answers.",
        "Delivered a Flutter front-end for cross-platform usage."
      ],
      image: "/images/projects/p2.png",
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
  ],
  // Case studies are content-driven: list cards use this metadata, and the full
  // write-up lives as Markdown in /public/case-studies/<slug>.md (rendered on a
  // dedicated, shareable page at /case-studies/<slug>). ChargeOrFill has no export
  // yet, so its full text stays inline via `body`.
  caseStudies: [
    {
      slug: "jiocinema-acquisition",
      title: "JioCinema Premium: Acquisition Strategy",
      tag: "B2C",
      role: "Product Strategy · Acquisition",
      timeline: "Independent Case Study",
      focus: ["B2C Acquisition", "ICP Definition", "Channel Strategy", "OTT/Streaming"],
      summary:
        "How JioCinema Premium should convert free viewers into loyal paying subscribers: market and ICP analysis across two professional segments, then an acquisition-channel prioritisation pointing to referrals, paid trials and product integrations.",
      markdownPath: "/case-studies/jiocinema-acquisition.md",
    },
    {
      slug: "blinkit-engagement-retention",
      title: "Blinkit: Engagement & Retention Strategy",
      tag: "B2C",
      role: "Growth · Engagement & Retention",
      timeline: "Independent Case Study",
      focus: ["Engagement Frameworks", "User Segmentation", "Retention", "Resurrection Campaigns"],
      summary:
        "A frequency-first engagement model for the 10-minute grocery platform: user/ICP segmentation, six engagement campaigns to upgrade users between tiers, a retention curve analysis, and resurrection campaigns for churned users.",
      markdownPath: "/case-studies/blinkit-engagement-retention.md",
    },
    {
      slug: "googlepay-engagement-retention",
      title: "Google Pay: Engagement & Retention Strategy",
      tag: "Fintech",
      role: "Growth · Engagement & Retention",
      timeline: "Independent Case Study",
      focus: ["Engagement Frameworks", "User Segmentation", "Retention Analysis", "Fintech/UPI"],
      summary:
        "A breadth + frequency engagement framework for Google Pay grounded in a 150-user survey: who counts as an active user, six feature-tied engagement campaigns, and trigger-based resurrection campaigns set against India's UPI retention dynamics.",
      markdownPath: "/case-studies/googlepay-engagement-retention.md",
    },
    {
      slug: "blinkit-onboarding",
      title: "Blinkit: Onboarding Flow & Activation Teardown",
      tag: "B2C",
      role: "Product Analyst · Onboarding & UX",
      timeline: "Independent Case Study",
      focus: ["Onboarding Teardown", "Activation Metrics", "Cognitive Biases", "UX Critique"],
      summary:
        "A hands-on teardown of Blinkit's acquisition-to-activation funnel, from app-store discovery through first order, mapping the cognitive biases at each step and the moments where the 'delivery in minutes' promise breaks, with a prioritised fix list and activation metrics.",
      markdownPath: "/case-studies/blinkit-onboarding.md",
    },
    {
      slug: "vercel-acquisition",
      title: "Vercel: Acquisition Strategy",
      tag: "B2B",
      role: "Growth · Acquisition",
      timeline: "Independent Case Study",
      focus: ["B2B Acquisition", "ICP Prioritisation", "TAM-SAM-SOM", "Referral & Content Loops"],
      summary:
        "Which segments and channels Vercel should prioritise to grow its developer base: five buyer personas, an ICP prioritisation favouring startups/SMEs, top-down market sizing, and a channel strategy doubling down on referral/partner programs and content loops.",
      markdownPath: "/case-studies/vercel-acquisition.md",
    },
    {
      slug: "fireflies-acquisition",
      title: "Fireflies.ai: Acquisition Strategy",
      tag: "B2B SaaS",
      role: "Growth · Acquisition",
      timeline: "Independent Case Study",
      focus: ["B2B SaaS Acquisition", "Persona Research", "JTBD", "Channel Prioritisation"],
      summary:
        "Persona and channel strategy for the AI meeting assistant as it scales against bundled competitors: three interview-driven personas, a sales-persona P0 priority, market sizing, and a recommendation to lead with content loops and a sales-enablement partner program over individual referrals.",
      markdownPath: "/case-studies/fireflies-acquisition.md",
    },
    {
      slug: "chargeorfill",
      title: "ChargeOrFill: EV Charging Aggregator App",
      tag: "0→1",
      role: "Product Strategist & Research Lead",
      timeline: "Independent Project",
      focus: ["Market Discovery", "User Research", "Product Validation"],
      summary:
        "A 0→1 validation study for a single-pane EV-charging aggregator in India: landscape and market sizing, moderated user research, and a go/no-go that recommended a partner-first phased approach over a full standalone build.",
      markdownPath: null,
      body:
        `India's public charging infrastructure is fragmented across networks with inconsistent APIs, pricing and reliability. ChargeOrFill explored a single-pane aggregator to reduce friction for EV drivers and improve utilization for operators.\n\n## Problem\nDrivers struggled to find available, compatible chargers and trusted uptime metrics; operators struggled with demand visibility and dynamic pricing integration.\n\n## Process\n- Landscape analysis: aggregated public provider data to map coverage, overlap and blackspots.\n- Market sizing: TAM/SAM/SOM modelling and sensitivity analysis for adoption assumptions.\n- User research: moderated interviews, prototype testing via Figma and surveys to validate user journeys.\n- Business modelling: pricing experiments, operator incentive structures and partnership frameworks for B2B2C integration.\n\n## Outcome\nFindings showed a strong long-term value proposition but near-term fragmentation and lack of API standards made immediate launch risky. Recommended a partner-first, phased approach focused on data-sharing pilots and operator tools.\n\n## Reflection\nThe project emphasised disciplined product thinking: validation can be a feature too. We saved upfront costs by recommending partnerships and a phased pilot program rather than a full standalone build.`,
    },
  ],

  experience: [
    {
      role: "AI Product Manager",
      company: "FactWise",
      period: "December 2025 – Present",
      location: "Mumbai, India",
      technologies: [
        "OpenAPI",
        "SAP",
        "MCP",
        "FastAPI",
        "Python",
        "Azure",
        "Product Strategy"
      ],
      points: [
        "I own the two modules at the heart of how manufacturers buy on FactWise: Purchase Orders (POs) and Bills of Materials (BOMs), the multi-level parts lists products are built from. Every requirement, bug and enhancement for both lands with me; I sit with client teams, turn what they need into PRDs, and drive engineering to ship it. My favourite PO ship: an in-place revision workflow, so changing an issued PO no longer means cancelling and recreating it.",
        "When enterprise clients told us they wouldn't adopt without connecting to their SAP, I defined and shipped FactWise's OpenAPIs: bulk create, update and get across items, vendors, POs and contracts, plus an ID-mapping API, with each client getting their own API keys. Clients use them every single day, because creating a thousand records through an API beats any UI. FactWise now sells this as a licensed offering (INR 7-10L per client); 3 enterprise clients have bought it, and 40K+ live POs and contracts have been created through it.",
        "The OpenAPIs had one problem: strict request formats that clients found hard to get right. So I built an AI agent, served via MCP, that sits on top of them. You tell it what you need in plain language; it picks the right API, asks for whatever's missing, builds the request and executes it. Bulk procurement actions become a conversation. It's now the flagship demo in enterprise sales conversations."
      ],
      additionalPoints: [
        "Signature BOM ship: parallel revisions, so a single BOM can run multiple versions across live orders at the same time (one order on R1 while another runs on R2), configured once and reused.",
        "As a PM I define, spec and drive engineering rather than hand-coding the modules, but I personally built the MCP agent with AI, and I ship small enhancement features myself."
      ],
    },
    {
      role: "AI Product Manager",
      company: "Webotix IT Consultancy",
      period: "December 2024 – December 2025",
      location: "Remote / Dubai",
      technologies: [
        "AI-Assisted Build",
        "RAG",
        "FAISS",
        "Pinecone",
        "Azure",
        "Power BI",
        "Product Strategy"
      ],
      points: [
        "SwiftCheck AI started with a painful picture: food-manufacturing compliance teams hand-building QC templates for every production stage and reviewing thousands of QC documents a week, all on paper. I took it 0 to 1 as PM: an app where AI generates the inspection templates from product specs, floor staff fill them on mobile, and approvals happen digitally with a full record.",
        "I built the prototype myself with AI in about four weeks, pitched it and secured $5,000 from Microsoft for Startups, then led a cross-functional team of 3 (mobile, UI/UX, web) to take it to production.",
        "Under the hood: a GenAI engine using RAG over FAISS/Pinecone vector databases and AI agents that auto-generates the QC templates, hitting 80% accuracy against client specs and cutting QC-document creation time by 90% compared to building templates by hand."
      ],
      additionalPoints: [
        "Shaped the product through demos and feedback from multiple enterprise clients, including a design-partner client involved from day one, and aligned the CEO and COO on scope and roadmap throughout."
      ],
    },
    {
      role: "Product Management Intern",
      company: "MetaRizz",
      period: "December 2023 – May 2024",
      location: "Mumbai, India",
      technologies: ["Figma", "Product Management", "User Research", "Wireframing", "Scrum"],
      points: [
        "Acted as product owner for two initiatives (GuestInMe, MediNobel), owning problem definition, feature prioritization and delivery planning across design and engineering while introducing Scrum-based sprint planning.",
        "Led a UX revamp for GuestInMe: ran user research to identify user-flow friction, wireframed improved journeys and prioritized high-impact changes with cross-functional teams, growing the active user base to 1K+ users.",
        "Drove 0 to 1 delivery of MediNobel and resolved delivery/stakeholder risks by proactively unblocking teams, maintaining 95% on-time execution."
      ],
    },
    {
      role: "Business & Growth Management Intern",
      company: "Watermelon Gang",
      period: "August 2022 – November 2023",
      location: "Mumbai, India",
      technologies: ["Market Strategy", "Client Management", "A/B Testing", "Data Analytics"],
      points: [
        "Drove growth strategy for 5+ enterprise fintech & crypto clients, including CoinDCX, Binance and Kotak 811, running A/B tests that lifted campaign performance 30 to 60%.",
        "Acquired several of those clients myself through targeted outreach and personalized pitches, then grew the accounts through upsells into long-term partnerships.",
        "Scaled Ali Solanki's YouTube channel from 50K to 80K subscribers, running a Kanban content pipeline that moved every video from ideation through scripting, recording, editing and publishing with a cross-functional creative team."
      ],
    },
  ],

  volunteering: {
    organization: "Vacha NGO",
    role: "English & Computer Instructor",
    period: "July 2024",
    description:
      `Designed and taught AI-augmented digital literacy programs for 30+ underprivileged students:
- Created interactive lesson plans combining fundamental English, basic digital skills and simple computational thinking activities.
- Led a career-guidance session that helped students identify strengths and set realistic academic/career goals.
- Built lightweight assessments and hands-on exercises that increased engagement and basic competency in computer usage.
- Packaged lesson materials and teacher notes to enable repeatable delivery by volunteer instructors.`
  }
};
