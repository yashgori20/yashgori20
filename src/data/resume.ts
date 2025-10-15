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
    "Building AI-powered products from concept to deployment blending technical depth with product vision to turn complex ideas into scalable, impactful solutions.",

  whatIBring:
    `Technical Depth   I design RAG systems, production APIs, and low-latency inference pipelines with an obsession for reliability and measurable impact.
Product Strategy   I convert ambiguous opportunities into clear roadmaps, PRDs, and prioritised backlogs that align engineering effort with business outcomes.
Execution Ownership   I take products from prototype → pilot → paid deployment, handling architecture, delivery and stakeholder alignment end-to-end.
Systems Thinking   I optimise the whole system (data, infra, UX, human-in-the-loop) rather than only tuning models.
Cross-functional Communication   I translate technical tradeoffs into business language for execs while giving engineers concrete acceptance criteria and metrics.
Impact-minded Metrics   I focus on the numbers that matter (accuracy, latency, adoption, ROI) and design experiments to make them move.`,

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
    "Product & Collaboration": [
      { name: "Product Strategy", level: 95, category: "Product Management" },
      { name: "Agile/Scrum", level: 92, category: "Methodology" },
      { name: "Roadmap Planning", level: 90, category: "Planning" },
      { name: "Cross-functional Team Leadership", level: 90, category: "Leadership" },
      { name: "Stakeholder Communication", level: 95, category: "Communication" },
      { name: "Client Relations", level: 90, category: "Business" },
      { name: "Data-Driven Decision Making", level: 92, category: "Analytics" },
    ],
    "AI/ML Core": [
      { name: "Retrieval-Augmented Generation (RAG)", level: 96, category: "AI Architecture" },
      { name: "Prompt Engineering", level: 95, category: "AI Engineering" },
      { name: "Vector Databases (FAISS, Pinecone)", level: 92, category: "Vector DB" },
      { name: "LLM Integration (GPT, Mixtral, LLaMA, Gemini)", level: 90, category: "LLM" },
      { name: "OCR & Document Intelligence", level: 88, category: "AI Processing" },
      { name: "Natural Language Processing (NLP)", level: 86, category: "ML Framework" },
      { name: "Model Evaluation & Fine-Tuning", level: 86, category: "AI Optimization" },
    ],
    "Technical Delivery": [
      { name: "Python", level: 96, category: "Core" },
      { name: "LangChain", level: 92, category: "AI Framework" },
      { name: "Streamlit", level: 90, category: "ML Apps" },
      { name: "API Development (REST, FastAPI, Flask)", level: 92, category: "Backend" },
      { name: "Azure (OpenAI, Cosmos DB, Container Apps)", level: 88, category: "Cloud" },
      { name: "Docker", level: 88, category: "Containerization" },
      { name: "GitHub Actions", level: 84, category: "CI/CD" },
    ],
    "Tools": [
      { name: "Jira", level: 92, category: "Project Management" },
      { name: "Notion", level: 92, category: "Documentation" },
      { name: "Figma", level: 92, category: "Design Collaboration" },
      { name: "Power BI", level: 88, category: "Analytics" },
      { name: "VS Code", level: 88, category: "Development" },
      { name: "Postman", level: 86, category: "API Testing" },
      { name: "GitHub", level: 92, category: "Version Control" },
      { name: "Docker Hub / Container Registry", level: 84, category: "Deployment" }
    ]
  },

  projects: [
    {
      title: "Swift Check AI: Enterprise QC Platform",
      description:
        `Led architecture, product strategy and delivery for an enterprise-grade quality control platform that automates document validation for regulated clients.
Integrated Azure Document Intelligence OCR with vector-based retrieval and LLM reasoning to create a template-driven compliance checker.`,
      technologies: [
        "Product Strategy",
        "AI/ML",
        "Azure OpenAI",
        "Flask",
        "Cosmos DB",
        "Redis",
        "Docker",
      ],
      features: [
        "Reduced document ingestion + validation time by ~90% through parallel OCR pipelines and cached retrievers.",
        "Designed 25+ parameterized compliance templates with human-review loops; end-to-end validation accuracy ~80% in production pilots.",
        "Achieved sub-second responses for cached queries and <500ms cold-starts on optimized endpoints.",
        "Secured Microsoft AI Founders Hub funding ($5k) and converted multiple pilot engagements to paid customers.",
        "Built multi-tenant isolation, role-based access, and audit trails for enterprise compliance.",
        "Ship-ready docs: demo scripts, API contract, rollout playbook, and ROI dashboard for buyer conversations."
      ],
      codeUrl: "https://github.com/yashgori20/swift-check-ai",
      liveUrl: "https://swift-check-ai.azurewebsites.net",
    },
    {
      title: "Interactive AI Portfolio (this site)",
      description:
        `A chat-first portfolio that behaves like the products I build: interactive, contextual, and discoverable.
The assistant answers questions about my skills, shows demos, and guides visitors through my case studies and code.`,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "TanStack Query", "Shadcn UI"],
      features: [
        "Context-retention chatbot that maps a user's query to portfolio sections and code samples.",
        "Semantic routing for direct access to project demos and code links from conversation context.",
        "Mobile-first gestures, accessible dark mode, and micro-interactions for fast, pleasant exploration.",
        "Live deployment with CI and analytics to measure engagement and top queries.",
        "Design intent: demonstrate conversational UX patterns and act as a meta proof-of-concept."
      ],
      codeUrl: "https://github.com/yashgori20/yashgori20",
      liveUrl: "https://yashgori20.vercel.app/",
    },
    {
      title: "DocuTalk: AI Document Intelligence Platform",
      description:
        `Cross-platform conversational assistant for document Q&A. Engineered embedding pipelines, vector retrieval and a multi-turn dialogue manager for context-aware answers.`,
      technologies: [
        "Python",
        "FAISS",
        "LangChain",
        "Gemini Embeddings",
        "Flask",
        "Flutter",
      ],
      features: [
        "Built FAISS-backed semantic search and LLM layer to answer document queries with provenance and citation tracebacks.",
        "Delivered a Flutter front-end for cross-device usage and a demo API for enterprise integration.",
        "Reduced manual review hours by ~40% in pilot trials through precise retrieval and highlight extraction.",
        "Implemented chunking, metadata-aware embeddings, and caching strategies to reduce retrieval latency.",
        "Open-sourced example dataset and evaluation harness for reviewers to validate retrieval quality."
      ],
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
    {
      title: "FinLLM-RAG: RBI Compliance Automation",
      description:
        `A regulatory intelligence prototype that automates rule extraction and mapping from RBI documents into an auditable RAG pipeline.
Worked with policy texts to generate candidate rules, human-in-the-loop verification, and exception reporting.`,
      technologies: [
        "Python",
        "Mixtral LLM",
        "GROQ Cloud",
        "FAISS",
        "Custom Model Training"
      ],
      features: [
        "Achieved ~80% prediction accuracy on labeled compliance checks after iterative prompt + retrieval tuning.",
        "Quantified potential operational savings (~10% annual cost reduction) using a conservative automation-to-review tradeoff model.",
        "Provided confusion matrices, rule-mapping visualizations, and a human-review loop to ensure auditability.",
        "Packaged a lightweight API and demo dashboard for stakeholder validation and investor briefings.",
        "Documentation included: dataset provenance, evaluation scripts, and responsible-use guidelines."
      ],
      codeUrl: "https://github.com/yashgori20/FinLLM-RAG-rbi",
      liveUrl: "https://yashgori20-FinLLM-RAG.hf.space",
    },
    {
      title: "Inhance: AI Profile Optimizer",
      description:
        `Multi-agent system that evaluates LinkedIn profiles and resumes, giving targeted, ATS-aware recommendations and generating LaTeX resumes tailored to job descriptions.`,
      technologies: [
        "Streamlit",
        "GROQ Cloud",
        "Mixtral LLM",
        "Multi-Agent System",
        "LinkedIn API",
        "LaTeX"
      ],
      features: [
        "Implemented ATS-scoring, role-mapping and concrete rewrites to improve recruiter-facing signals.",
        "Built exportable LaTeX resume templates and a 'Score My LinkedIn' interactive demo for recruiters.",
        "Reduced manual profile review time by ~75% for test users through automated suggestions and prioritized edits.",
        "Designed evaluation metrics and A/B test plan to assess impact on interview conversion rate."
      ],
      codeUrl: "https://github.com/yashgori20/Inhance",
      liveUrl: "https://yashgori20-Inhance.hf.space",
    },
    {
      title: "Customer Churn Predictor",
      description:
        `Various data products and utilities that demonstrate end-to-end ML thinking   from collection and cleaning to modelling, evaluation and visualization.`,
      technologies: ["Python", "Random Forest", "Decision Trees", "Power BI", "NumPy", "Pandas", "Matplotlib"],
      features: [
        "Built a churn predictor with Random Forest yielding ~94% train accuracy; productionized evaluation and feature importance reporting.",
        "Delivered Power BI dashboards that surface actionable business signals and feature-level insights.",
        "Shared reproducible notebooks, data preprocessing pipelines, and evaluation metrics for transparency.",
        "Designed experiments and monitoring to guard against model drift and to measure long-term performance."
      ],
      codeUrl: "https://github.com/yashgori20/Customer-Churn-Perdiction",
    },
  ],
  caseStudies: [
    {
      title: "ChargeOrFill – EV Charging Aggregator App",
      role: "Product Strategist & Research Lead",
      timeline: "Independent Project",
      focus: ["Market discovery", "User research", "Product validation"],
      context:
        `India's public charging infrastructure is fragmented across networks with inconsistent APIs, pricing and reliability. ChargeOrFill explored a single-pane aggregator to reduce friction for EV drivers and improve utilization for operators.`,
      problem:
        `Drivers struggled to find available, compatible chargers and trusted uptime metrics; operators struggled with demand visibility and dynamic pricing integration.`,
      process: [
        "Landscape analysis: aggregated public provider data to map coverage, overlap and blackspots.",
        "Market sizing: TAM/SAM/SOM modelling and sensitivity analysis for adoption assumptions.",
        "User research: moderated interviews, prototype testing via Figma and surveys to validate user journeys.",
        "Business modelling: pricing experiments, operator incentive structures and partnership frameworks for B2B2C integration."
      ],
      outcome:
        `Findings showed a strong long-term value proposition but near-term fragmentation and lack of API standards made immediate launch risky. Recommended a partner-first, phased approach focused on data-sharing pilots and operator tools.`,
      reflection:
        `The project emphasised disciplined product thinking: validation can be a feature too. We saved upfront costs by recommending partnerships and a phased pilot program rather than a full standalone build.`
    },
  ],

  experience: [
    {
      role: "AI Product Lead",
      company: "Webotix IT Consultancy",
      period: "December 2024 – June 2025",
      location: "Mumbai, Maharashtra (Remote)",
      technologies: [
        "Azure OpenAI GPT-4o",
        "Azure Cosmos DB",
        "Azure Document Intelligence OCR",
        "Redis",
        "Docker",
        "Product Strategy",
        "B2B SaaS"
      ],
      points: [
        "Led architecture and product strategy for SwiftCheck AI   a GenAI QC platform targeting regulated industries (food, finance).",
        "Scoped, prototyped and delivered a demo-ready MVP within 4 weeks using open-source and cloud services; validated product–market fit with pilot clients.",
        "Partnered with C-suite to define GTM, pricing, and enterprise SLAs; secured Microsoft AI Founders Hub funding ($5,000) to accelerate pilot expansion."
      ],
      additionalPoints: [
        "Designed a compliance-first pipeline (OCR → chunking → embeddings → RAG → template validator) achieving ~80% validated output accuracy in pilots.",
        "Built multi-tenant API endpoints with role-based access and audit logs suitable for compliance review.",
        "Optimised throughput with Redis caching and container orchestration to achieve ~2.3× higher throughput and ~30% lower infra costs.",
        "Created Power BI reporting for execs covering latency, accuracy, pilot-to-paid conversion, and projected ROI for enterprise customers.",
        "Authored deployment runbooks, API contracts and a customer onboarding playbook that reduced time-to-first-value for pilot clients."
      ],
    },
    {
      role: "Product Design Lead",
      company: "MetaRizz",
      period: "December 2023 – May 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Figma", "Product Management", "UI/UX", "Flutter", "Agile"],
      points: [
        "Owned product for GuestInMe (UX revamp) and MediNobel (0→1 hospitality platform), including discovery, PRD creation and release planning.",
        "Drove a 40% increase in engagement by designing and shipping monetization features and streamlined booking flows.",
        "Introduced sprint rituals, backlog hygiene and acceptance criteria templates to improve handoff and reduce dev ambiguity."
      ],
      additionalPoints: [
        "Wrote PRDs, feature specs and acceptance criteria; handoff artifacts reduced rework by ~30%.",
        "Led cross-functional reviews to align product, design and engineering which improved release predictability.",
        "Added lightweight telemetry and event tracking to inform post-launch iterations and A/B test prioritisation."
      ],
    },
    {
      role: "Business & Growth Manager",
      company: "Watermelon Gang",
      period: "August 2022 – November 2023",
      location: "Mumbai, Maharashtra",
      technologies: ["AI Content Systems", "Market Strategy", "Client Management", "Data Analytics"],
      points: [
        "Directed AI-assisted content workflows for 5+ enterprise clients in fintech and crypto, overseeing creative + ML-assisted tooling.",
        "Scaled creator channels using iterative content testing: example   Ali Solanki channel grew from 50K → 70K subscribers under my strategy.",
        "Implemented A/B testing cycles and KPI-driven content experiments that improved campaign CTRs and engagement metrics."
      ],
      additionalPoints: [
        "Built modular content generation pipelines using prompt templates and human-in-the-loop checks to ensure quality and brand tone.",
        "Introduced sentiment analysis and reporting to provide clients with deeper engagement insights and content optimizations.",
        "Reduced average campaign production time by ~40% through templating and automation."
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
