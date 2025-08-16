export interface Project {
  title: string;
  description: string;
  technologies: string[];
  features?: string[];
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
  additionalPoints?: string[];
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
  about: "I design and launch AI-powered solutions that deliver measurable business impact. With expertise spanning LLM architectures to product strategy, I've led projects that improved system performance and shaped product direction. I specialize in translating cutting-edge AI capabilities into scalable, real-world products.",
  whatIBring: "Technical Execution: Hands-on expertise in building and deploying AI/ML solutions, from LLM-powered applications to production-grade APIs and scalable data pipelines. Product Vision: Proven ability to translate complex AI technologies into user-centric features that align with business objectives and drive real value. End-to-End Ownership: Adept at guiding projects from initial concept to full deployment, striking an optimal balance between speed and high-quality outcomes. Cross-Functional Collaboration: Strong communicator who bridges engineering, design, and business teams to foster alignment and achieve shared goals. Impact-First Approach: Prioritizes measurable results, focusing on enhancements in accuracy, latency, user adoption, or revenue to deliver tangible business impact.",
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
      description: "Led product architecture and implementation: Azure OpenAI RAG templates, OCR ingestion, multi-tenant design; converted pilots into paid deployments.",
      technologies: ["Product Strategy", "AI/ML", "B2B SaaS", "Azure OpenAI", "Flask", "Cosmos DB", "Redis", "Docker"],
      features: [
        "Framed value for buyers: 90% time reduction on document workflows and clear compliance accuracy KPIs",
        "Live demo link + short video: show template generation (before vs after) and config UI for 25+ parameters",
        "Diagram: pipeline (OCR → embeddings → RAG → template renderer); annotate latency and compliance checks",
        "Include pilot case study: client name (anonymized if needed), pilot-to-paid conversion rate, and ROI table",
        "Multi-tenant SaaS architecture for enterprise clients with Microsoft AI Hub funding secured"
      ],
      codeUrl: "https://github.com/yashgori20/swift-check-ai",
      liveUrl: "https://swift-check-ai.azurewebsites.net",
    },
    {
      title: "Interactive AI Portfolio",
      description: "Chat-based portfolio using custom AI model to answer questions about skills and experience.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "TanStack Query", "Shadcn UI"],
      features: [
        "AI-powered chatbot with conversation memory",
        "Multi-modal interface with smooth animations",
        "Responsive design with mobile gesture support",
        "Real-time chat with smart suggestions",
        "Professional portfolio showcase with interactive elements"
      ],
      codeUrl: "https://github.com/yashgori20/yashgori20",
      liveUrl: "https://yashgori20.vercel.app/",
    },
    {
      title: "DocuTalk: AI Document Intelligence Platform",
      description: "Scoped conversational UI from user interviews; delivered FAISS-backed retrieval and Flutter client for multi-platform reach.",
      technologies: ["User Research", "API Design", "Cross-platform", "Python", "FAISS", "LangChain", "Gemini Embeddings", "Flask", "Flutter"],
      features: [
        "Outcome: major time-savings on document review and measurable adoption lift",
        "Embed interactive demo (upload a doc + ask Q) and short screencast of Flutter UX",
        "Show FAISS + embedding architecture graphic and call out 40% adoption improvement",
        "Link to code and a sample dataset (redacted) so reviewers can validate retrieval accuracy",
        "Cross-platform deployment with conversational AI interface for document queries"
      ],
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
    {
      title: "FinLLM-RAG: RBI Compliance Automation",
      description: "Combined regulatory research with RAG model engineering; validated ₹10% cost-savings case and improved model accuracy to ~80%.",
      technologies: ["Regulatory Tech", "Market Analysis", "Python", "Mixtral LLM", "GROQ Cloud", "FAISS", "Custom Model Training"],
      features: [
        "Packaged outputs into investor-ready demos and compliance dashboards",
        "Publish a short compliance playbook showing sample rule → model output → human review loop",
        "Include accuracy/confusion matrix screenshot and cost-savings calculation that led to the ₹10% claim",
        "Custom RAG system for regulatory document processing with Mixtral LLM integration",
        "Iterative AI product refinement methodology for compliance automation"
      ],
      codeUrl: "https://github.com/yashgori20/FinLLM-RAG-rbi",
      liveUrl: "https://yashgori20-FinLLM-RAG.hf.space",
    },
    {
      title: "Inhance & Interactive Portfolio",
      description: "Built the product flow (evaluation → recommendation → resume generation) and integrated LLM agents for conversational help.",
      technologies: ["Streamlit", "GROQ Cloud", "Mixtral LLM", "Multi-Agent System", "LinkedIn API", "ATS Analysis", "LaTeX", "PDF Processing"],
      features: [
        "Result: tangible recruiter-facing demos, ATS scoring, and exportable resumes",
        "Add an interactive widget on portfolio: 'Score my LinkedIn' demo with live ATS output",
        "Provide before/after LinkedIn profile examples and downloadable LaTeX resume templates",
        "Multi-agent AI system for profile evaluation with optimization suggestions",
        "Multi-format support (PDF, DOCX, TXT) with professional LaTeX formatting"
      ],
      codeUrl: "https://github.com/yashgori20/Inhance",
      liveUrl: "https://yashgori20-Inhance.hf.space",
    },
    {
      title: "Additional Tools: Churn Predictor & Utilities",
      description: "Produced robust analytics (churn 94% accuracy) and multimodal utilities that showcase end-to-end AI product thinking — from data collection to deployment and UX.",
      technologies: ["Python", "Random Forest", "Decision trees", "Power BI", "Numpy", "Pandas", "Seaborn", "Matplotlib"],
      features: [
        "Attach Power BI embed or screenshots highlighting feature importance and actionable insights",
        "Provide code link + README showing evaluation pipeline and data preprocessing steps",
        "94% accuracy in customer churn prediction with Random Forest and Decision Tree algorithms",
        "Interactive Power BI dashboard for comprehensive business insights",
        "Visual analytics pipeline with Seaborn and Matplotlib for data storytelling"
      ],
      codeUrl: "https://github.com/yashgori20/Customer-Churn-Perdiction",
    },
  ] as Project[],
  experience: [
    {
      role: "AI Product Lead",
      company: "Webotix IT Consultancy",
      period: "December 2024 – June 2025",
      location: "Mumbai, Maharashtra (Remote)",
      technologies: ["Azure OpenAI GPT-4o", "Azure Cosmos DB", "Azure Document Intelligence OCR", "Product Strategy", "B2B SaaS"],
      points: [
        "I led technical architecture and product strategy for enterprise QC automation platform serving food industry clients.",
        "I scoped and delivered MVP using Azure OpenAI GPT-4o, Azure Cosmos DB, and Azure Document Intelligence OCR.",
        "I coordinated with C-suite on positioning, securing $5k Microsoft AI Hub funding.",
      ],
      additionalPoints: [
        "Translated compliance requirements into 25+ parameterized templates, achieving 80% accuracy and sub-second performance.",
        "First B2B SaaS product from Webotix to receive Microsoft AI Hub funding.",
        "Independently handled architecture and deployment for production-ready enterprise solution.",
        "Designed compliance-first AI pipeline for regulated industries.",
      ],
    },
    {
      role: "Business Analyst",
      company: "N.K. Engineering",
      period: "June 2024 – November 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Predictive Analytics", "Business Intelligence", "HTML/CSS/JS", "Market Research", "Financial Modeling"],
      points: [
        "I used predictive analytics and BI to identify ₹5Cr+ market potential and packaged insights into investor-ready decks.",
        "I spearheaded responsive e-commerce launch   from wireframes to deployment   while aligning scope to market demand.",
        "I balanced product delivery with investor relations: closed 5 new funding deals while hitting digital product launch timelines.",
      ],
      additionalPoints: [
        "Rolled out automated competitor tracking tools, enabling faster pivots in market strategy.",
        "Developed fully responsive e-commerce site in HTML, CSS, JS   integrated with BI dashboards for sales tracking.",
        "Automated competitor monitoring to refresh market intelligence weekly, cutting manual research by 80%.",
        "Built predictive models for demand forecasting; results informed product roadmap and stock planning.",
        "Authored concise investor one-pagers with key metrics and opportunities; reduced funding pitch cycles by 30%.",
      ],
    },
    {
      role: "Product Design Lead",
      company: "MetaRizz",
      period: "December 2023 – May 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Product Management", "Figma", "UI/UX Design", "Flutter", "Stakeholder Management"],
      points: [
        "I owned end-to-end product for two projects including GuestInMe (1,000+ users) with AI-assisted content and UX updates.",
        "I shipped monetization features (table booking, club passes) and aligned them with stakeholder goals achieving 40% engagement increase.",
        "I ran roadmap, prioritization, and stakeholder communications while mediating clients ↔ devs to keep releases on schedule.",
      ],
      additionalPoints: [
        "Defined PRD-level specs from stakeholder asks and converted to developer-ready tickets with clear acceptance criteria.",
        "Mapped UX via Figma and coordinated handoff to Flutter devs, reducing back-and-forth during implementation.",
        "Introduced lightweight post-release reviews to decide what iterates, what ships, and what gets cut.",
      ],
    },
    {
      role: "Business Development Manager",
      company: "Watermelon Gang",
      period: "August 2022 – November 2023",
      location: "Mumbai, Maharashtra",
      technologies: ["AI Content Workflows", "Market Analysis", "Client Lifecycle Management", "Data Analytics"],
      points: [
        "I directed AI-powered content workflows, managing a 2-person creative team to deliver for 5 enterprise clients.",
        "I combined market analysis with AI content optimization to boost engagement metrics by 35%.",
        "I owned client relationship lifecycle, from outreach to delivery, across fintech and cryptocurrency sectors.",
      ],
      additionalPoints: [
        "Built a modular AI-assisted content system that reduced production time by 40%.",
        "Introduced data-backed A/B testing for social media creatives, influencing future campaign strategies.",
        "Integrated sentiment analysis into reporting to better gauge audience reception.",
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
