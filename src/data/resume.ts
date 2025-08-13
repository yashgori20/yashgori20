export interface Project {
  title: string;
  description: string;
  technologies: string[];
  codeUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  location: string;
  technologies?: string[];
}

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
  about: "AI Product Manager with experience leading AI product development from ideation to B2B deployment. Drove 90% reduction in operational time for enterprise QC platform. Skilled in stakeholder management, feature prioritization, and translating complex technical requirements into market-ready AI solutions.",
  whatIBring: "I transform AI concepts into market-ready products. Whether it's leading cross-functional teams to build enterprise platforms, managing product lifecycles from ideation to deployment, or securing funding through strategic pitches - I bring AI product vision, stakeholder management, and business impact to every project.",
  languages: ["English (Fluent)", "Hindi (Native)", "Gujarati (Native)", "Marathi (Conversational)"],
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
    "AI/ML Core": [
      { name: "Retrieval-Augmented Generation (RAG) Systems", level: 95, category: "AI Architecture" },
      { name: "Prompt Engineering", level: 95, category: "AI Engineering" },
      { name: "Vector Databases (FAISS, Pinecone)", level: 90, category: "Vector DB" },
      { name: "LLM Integration (GPT, Mixtral, LLaMA, Gemini)", level: 90, category: "LLM" },
      { name: "OCR Processing", level: 85, category: "AI Processing" },
      { name: "Scikit-learn", level: 85, category: "ML Framework" },
      { name: "Natural Language Processing", level: 85, category: "ML Framework" },
    ],
    "Technical Delivery": [
      { name: "Python", level: 95, category: "Core" },
      { name: "LangChain", level: 90, category: "AI Framework" },
      { name: "Streamlit", level: 90, category: "ML Apps" },
      { name: "API Development (REST,FASTAPI, Flask)", level: 90, category: "Backend" },
      { name: "Azure (OpenAI, Cosmos DB, Container Apps)", level: 85, category: "Cloud" },
      { name: "Docker", level: 85, category: "Containerization" },
      { name: "GitHub Actions", level: 80, category: "CI/CD" },
    ],
    "Product & Collaboration": [
      { name: "Product Strategy", level: 95, category: "Product Management" },
      { name: "Agile/Scrum", level: 90, category: "Methodology" },
      { name: "Roadmap Planning", level: 90, category: "Planning" },
      { name: "Cross-functional Team Leadership", level: 90, category: "Leadership" },
      { name: "Stakeholder Communication", level: 95, category: "Communication" },
      { name: "Client Relations", level: 90, category: "Business" },
      { name: "Data-Driven Decision Making", level: 90, category: "Analytics" },
    ],
  },
  projects: [
    {
      title: "Swift Check AI: Enterprise QC Platform",
      description: "I led AI product development lifecycle from ideation to B2B deployment, securing Microsoft AI Hub funding and delivering multi-tenant SaaS platform serving manufacturing industries.",
      technologies: ["Product Strategy", "AI/ML", "B2B SaaS", "Azure OpenAI", "Flask", "Cosmos DB", "Redis", "Docker"],
      codeUrl: "https://github.com/yashgori20/swift-check-ai",
      liveUrl: "https://swift-check-ai.azurewebsites.net",
    },
    {
      title: "Interactive AI Portfolio",
      description: "Chat-based portfolio using custom AI model to answer questions about skills and experience.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "TanStack Query", "Shadcn UI"],
      codeUrl: "https://github.com/yashgori20/yashgori20",
      liveUrl: "https://yashgori20.vercel.app/",
    },
    {
      title: "AI-Powered Document Intelligence Platform",
      description: "I identified user pain points (70% time on manual document review) and designed conversational AI interface, improving adoption rate by 40% with cross-platform deployment.",
      technologies: ["User Research", "API Design", "Cross-platform", "Python", "FAISS", "LangChain", "Gemini Embeddings", "Flask", "Flutter"],
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
    {
      title: "Financial Compliance Automation Tool",
      description: "I analyzed RBI compliance requirements and identified automation opportunity worth ₹10% annual savings for banks, achieving 80% accuracy through iterative AI product refinement.",
      technologies: ["Regulatory Tech", "Market Analysis", "Python", "Mixtral LLM", "GROQ Cloud", "FAISS", "Custom Model Training"],
      codeUrl: "https://github.com/yashgori20/Finance-Advisor-Agent",
      liveUrl: "https://yashgori20-finllm-rag.hf.space/",
    },
    {
      title: "LinkedIn Profile Optimization Platform",
      description: "I identified market gap in professional profile optimization and designed AI solution targeting job seekers, creating feature prioritization matrix based on user interviews and competitive analysis.",
      technologies: ["Growth Hacking", "User Engagement", "Streamlit", "GROQ Cloud", "Mixtral LLM", "Multi-Agent System"],
      codeUrl: "https://github.com/yashgori20/Inhance",
      liveUrl: "https://yashgori20-inhance.hf.space/",
    },
    {
      title: "Customer Churn Predictor",
      description: "Machine learning model achieving 94% accuracy in telecom customer churn prediction with Power BI dashboard.",
      technologies: ["Python", "Random Forest", "Decision trees", "Power BI", "Numpy", "Pandas", "Seaborn", "Matplotlib"],
      codeUrl: "https://github.com/yashgori20/Customer-Churn-Perdiction",
    },
  ] as Project[],
  experience: [
    {
      role: "AI Product Lead (Intern)",
      company: "Webotix IT Consultancy",
      period: "December 2024 – June 2025",
      location: "Mumbai, Maharashtra (Remote)",
      technologies: ["Azure OpenAI", "Product Strategy", "AI/ML", "B2B SaaS", "Microsoft AI Hub"],
      points: [
        "I led AI product development lifecycle from ideation to B2B deployment with enterprise QC automation platform, securing Microsoft AI Hub funding.",
        "I collaborated with CEO on AI product strategy and roadmap with features that reduced document generation time by 90%.",
        "I managed cross-functional coordination between frontend (Flutter) and backend AI teams with timely feature delivery.",
        "I presented AI product demos to enterprise clients with successful pilot to B2B production deployment conversion.",
        "I defined AI success metrics and KPIs with 80% compliance accuracy, sub-second response times, 25+ parameter support.",
      ],
    },
    {
      role: "Business Analyst & Strategy Lead",
      company: "N.K. Engineering",
      period: "June 2024 – November 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Data Analytics", "Power BI", "Market Research", "Financial Modeling"],
      points: [
        "I developed product-market fit strategies through customer research and competitive analysis with 12% market share expansion.",
        "I identified new revenue opportunities through market analysis with investment from 5 new stakeholders.",
        "I created product analytics dashboards and market intelligence reports with ₹5Cr+ revenue opportunity identification.",
      ],
    },
    {
      role: "Product Design Lead",
      company: "MetaRizz",
      period: "December 2023 – May 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Product Management", "Figma", "UI/UX Design", "Flutter", "Stakeholder Management"],
      points: [
        "I led AI-enhanced product development for 2 major projects including GuestInMe app revamp with full product lifecycle management for 1,000+ active users.",
        "I negotiated project terms with PR representatives and club managers with AI-driven features like table booking that increased user engagement by 40%.",
        "I managed cross-functional development teams as primary mediator between clients and developers with on-time delivery across multiple concurrent AI projects.",
      ],
    },
    {
      role: "Business Development Manager",
      company: "Watermelon Gang",
      period: "August 2022 – November 2023",
      location: "Mumbai, Maharashtra",
      technologies: ["Content Strategy", "Social Media Marketing", "Client Management", "Analytics"],
      points: [
        "I managed team of 2 (editor, copywriter) for AI-driven content production pipeline with quality assurance.",
        "I onboarded 5 enterprise fintech and cryptocurrency clients through strategic outreach with AI content optimization.",
        "I increased engagement metrics by 35% through data-driven content strategy optimization with AI analytics tools.",
      ],
    },
  ] as Experience[],
  volunteering: {
    organization: "Vacha NGO",
    role: "English & Computer Instructor",
    period: "July 2024",
    description: "I designed innovative AI-enhanced learning modules for underprivileged students with improved digital literacy engagement."
  }
};
