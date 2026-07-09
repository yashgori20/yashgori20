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
    "I'm an AI Product Manager who ships. I don't just write the spec, I build and deploy the product, using AI as my engineering force-multiplier to take ideas from PRD to production. I've shipped GenAI products to enterprise clients, secured Microsoft Founders Hub funding, and turned manual workflows into systems that run themselves.",

  // One-line positioning shown under the greeting; names the AI-builder edge explicitly
  // (hiring managers now screen for AI fluency / ability to ship, not just talk about it).
  tagline:
    "AI Product Manager who ships. I scope, build and deploy AI products end-to-end, not just spec them.",

  // Front-loaded outcome metrics for the home screen (the "first 6 seconds" proof).
  // These reflect real shipped work: FactWise PO/API volume and enterprise clients,
  // plus the Webotix processing-time and Microsoft Founders Hub outcomes.
  headlineMetrics: [
    { value: "20K-40K", label: "POs & contracts", sub: "created via my procurement APIs" },
    { value: "4+", label: "enterprise clients", sub: "live in production" },
    { value: "90%", label: "less processing time", sub: "GenAI QC at Webotix" },
    { value: "$5K", label: "Microsoft Founders Hub grant", sub: "secured by pitching" },
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
      { name: "Ship production full-stack features end-to-end with AI (Claude Code, Cursor, Codex, Gemini), from PRD to deployed", level: 95, category: "AI-Assisted Build" },
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
        "Llama 3.3",
        "RAG",
      ],
      features: [
        "Built a live assistant that answers visitor questions about my background, skills and projects, grounded in my real resume content.",
        "Engineered grounding, model selection and guardrails to cut hallucination and token cost.",
        "Chat-first UX that guides visitors through case studies and code from conversation context."
      ],
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
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
    {
      title: "Product Case Studies",
      description:
        `Product teardowns across GPay, JioCinema, Vercel, Blinkit and Fireflies AI, covering acquisition, engagement/retention and onboarding.`,
      technologies: [
        "Product Strategy",
        "Acquisition",
        "Engagement & Retention",
        "Onboarding",
      ],
      features: [
        "GPay and JioCinema: engagement and retention strategy teardowns.",
        "Vercel and Fireflies AI: B2B acquisition and channel strategy.",
        "Blinkit: onboarding and activation funnel teardown."
      ],
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
      title: "ChargeOrFill – EV Charging Aggregator App",
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
        "Own the Purchase Order (PO) product area end-to-end for 4+ enterprise EMS (electronics manufacturing) clients: gathered requirements from client stakeholders, authored PRDs and acceptance criteria, and drove cross-functional engineering to deliver PO creation, line-item management, role-based approvals and standard T&C workflows, replacing a hectic manual process (clients previously exported and rebuilt POs on their own software) and saving hours per PO.",
        "Defined and shipped OpenAPI/Swagger procurement APIs (bulk create, update and read across Item Master, Vendor Master, PO and Contracts, plus an ID-mapping API linking FactWise records to clients' SAP IDs) enabling bidirectional SAP/ERP integration; now used daily, with 20K to 40K POs and contracts created through them across 3 enterprise clients.",
        "Built a FactWise MCP (Model Context Protocol) server (AI-assisted) that lets clients connect FactWise to Claude or any AI client and ask natural-language questions about their live RFQs, POs and contracts; handles tool calling and context management over the hosted API layer, shipping agentic, conversational access to enterprise procurement data."
      ],
      additionalPoints: [
        "Own the BOM (Bill of Materials) module end-to-end for EMS clients who source against multi-level bills of materials rather than flat line-items; shipped parallel BOM revisions so a single BOM can hold multiple versions in use at once (one event runs on R1 while another runs on R2), configured once and reused; sole PM for all BOM requirements, bugs and enhancements.",
        "Owned and defined the PO revision workflow, translating a recurring enterprise need into exact requirements and a PRD: revise already-issued POs in place (re-validate, re-approve) instead of cancel-and-recreate, with a clean audit trail; also shipped client-requested enhancements that directly lifted satisfaction."
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
        "Owned SwiftCheck AI (GenAI QC) 0 to 1 as PM and built it to production with AI as my engineering force-multiplier: discovery to PRD to deployed pilot, solo in ~4 weeks, aligning internal stakeholders (CEO, COO) on scope and roadmap.",
        "Built end-to-end GenAI features (RAG over vector databases (FAISS/Pinecone), autonomous agents, self-resolving workflows) to 80% accuracy and 90% less processing time, keeping the model trustworthy via grounding, prompt engineering and context management rather than a bigger model.",
        "Ran user research with Dubai-based pilot clients, validating product assumptions through enterprise demos and iterating workflows on real feedback, lifting adoption 30%."
      ],
      additionalPoints: [
        "Secured $5,000 from Microsoft Founders Hub by pitching product vision, technical feasibility and early business potential; built Power BI dashboards for ROI tracking and data-driven pricing."
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
        "Managed strategy and execution for 5+ B2B fintech & crypto clients (incl. CoinDCX, Binance, Kotak 811); scaled a client YouTube channel 50K to 70K subscribers and lifted campaign performance 30 to 60% via KPI-driven, A/B-tested content cycles."
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
