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
  about: "AI Engineer specializing in RAG systems and enterprise AI solutions. Led development of production-ready quality control platform reducing document generation time by 90%. Experienced in building scalable AI systems with Azure cloud services, achieving 80% compliance accuracy for regulatory predictions.",
  whatIBring: "I transform complex problems into elegant AI solutions. Whether it's building conversational interfaces that understand context, creating prediction models that drive decisions, or designing systems that learn and adapt - I bring creativity, technical expertise, and a passion for innovation to every project.",
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
    programming: [
      { name: "Python", level: 95, category: "Core" },
      { name: "SQL", level: 85, category: "Database" },
      { name: "JavaScript", level: 80, category: "Web" },
      { name: "TypeScript", level: 75, category: "Web" },
    ],
    aiml: [
      { name: "LangChain", level: 90, category: "AI Framework" },
      { name: "RAG Systems", level: 95, category: "AI Architecture" },
      { name: "FAISS", level: 85, category: "Vector DB" },
      { name: "Pinecone", level: 80, category: "Vector DB" },
      { name: "Azure AI Search", level: 85, category: "Cloud AI" },
      { name: "GPT-4", level: 90, category: "LLM" },
      { name: "Mixtral", level: 85, category: "LLM" },
      { name: "Gemini", level: 85, category: "LLM" },
      { name: "Prompt Engineering", level: 95, category: "AI Engineering" },
    ],
    frameworks: [
      { name: "Flask", level: 90, category: "Backend" },
      { name: "Streamlit", level: 90, category: "ML Apps" },
      { name: "FastAPI", level: 85, category: "Backend" },
      { name: "React", level: 80, category: "Frontend" },
      { name: "Flutter", level: 75, category: "Mobile" },
    ],
    cloud: [
      { name: "Azure OpenAI", level: 90, category: "AI Services" },
      { name: "Azure Cosmos DB", level: 85, category: "Database" },
      { name: "Azure Container Apps", level: 80, category: "Deployment" },
      { name: "Docker", level: 85, category: "Containerization" },
      { name: "GitHub Actions", level: 80, category: "CI/CD" },
    ],
    data: [
      { name: "Pandas", level: 90, category: "Data Processing" },
      { name: "NumPy", level: 85, category: "Scientific Computing" },
      { name: "Power BI", level: 85, category: "Visualization" },
      { name: "PostgreSQL", level: 85, category: "Database" },
      { name: "Redis", level: 80, category: "Caching" },
    ],
    soft: [
      { name: "Team Management", level: 90 },
      { name: "Stakeholder Communication", level: 95 },
      { name: "Problem Solving", level: 95 },
      { name: "Strategic Thinking", level: 85 },
      { name: "Adaptability", level: 90 },
      { name: "Technical Documentation", level: 85 },
    ],
  },
  projects: [
    {
      title: "Swift Check AI: Enterprise QC Platform",
      description: "Architected complete AI microservice handling template generation, OCR digitization, and compliance validation. Integrated Azure Document Intelligence for paper form digitization with 95% field extraction accuracy. Reduced template generation time by 90% while maintaining 80% regulatory compliance accuracy.",
      technologies: ["Azure OpenAI", "Flask", "Cosmos DB", "Redis", "Docker", "Azure Document Intelligence"],
      codeUrl: "https://github.com/yashgori20/swift-check-ai",
      liveUrl: "https://swift-check-ai.azurewebsites.net",
    },
    {
      title: "Interactive AI Portfolio",
      description: "A dynamic personal portfolio designed as a chat-based experience. Built with React, Vite, and Tailwind CSS, it leverages a custom-trained AI model to answer questions about my skills, projects, and experience, offering a unique and interactive way to explore my profile.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "TanStack Query", "Shadcn UI"],
      codeUrl: "https://github.com/yashgori20/yashgori20",
      liveUrl: "https://yashgori20.vercel.app/",
    },
    {
      title: "DocuTalk: Conversational Document Intelligence",
      description: "Engineered semantic search system using FAISS vector database with Gemini sentence embeddings for context-aware document Q&A up to 100+ pages. Deployed cross-platform solution with Flutter frontend and Flask API backend.",
      technologies: ["Python", "FAISS", "LangChain", "Gemini Embeddings", "Flask", "Flutter"],
      codeUrl: "https://github.com/yashgori20/DocuTalk",
    },
    {
      title: "RBI Compliance Finance Advisor",
      description: "Trained custom model on RBI regulatory documents achieving 80% accuracy in loan compliance predictions. Built multi-agent system for MPBF/DP computations and automated compliance verification. Implemented dynamic vector search with FAISS for real-time regulatory updates.",
      technologies: ["Python", "Mixtral LLM", "GROQ Cloud", "FAISS", "Custom Model Training"],
      codeUrl: "https://github.com/yashgori20/Finance-Advisor-Agent",
    },
    {
      title: "LinkedIn Profile Optimization Platform",
      description: "Designed multi-agent evaluation system providing role-specific profile optimization with conversational AI guidance. Implemented feedback generation pipeline analyzing profile, keyword optimization, and industry alignment.",
      technologies: ["Streamlit", "GROQ Cloud", "Mixtral LLM", "Multi-Agent System"],
      codeUrl: "https://github.com/yashgori20/Inhance",
      liveUrl: "https://huggingface.co/spaces/yashgori20/Inhance",
    },
    {
      title: "Customer Churn Predictor",
      description: "Implemented a machine learning model using Python and a Random Forest classifier to predict customer churn in the telecommunications industry with 94% accuracy. Presented key findings and actionable insights through an interactive Power BI dashboard.",
      technologies: ["Python", "Random Forest", "Decision trees", "Power BI", "Numpy", "Pandas", "Seaborn", "Matplotlib"],
      codeUrl: "https://github.com/yashgori20/Customer_Churn_Predictor",
    },
  ] as Project[],
  experience: [
    {
      role: "AI Engineer",
      company: "Webotix IT Consultancy",
      period: "December 2024 – June 2025",
      location: "Mumbai, Maharashtra (Remote)",
      technologies: ["Azure OpenAI", "Flask", "Cosmos DB", "Redis", "Docker", "Azure Document Intelligence"],
      points: [
        "Architected end-to-end AI-powered QC platform using Azure OpenAI GPT-4o and RAG, reducing template generation time by 90% while maintaining 80% regulatory compliance accuracy.",
        "Implemented multi-tenant architecture with Azure Cosmos DB and Redis caching, achieving sub-second response times for cached queries.",
        "Built intelligent document processing pipeline using Azure Document Intelligence OCR for digitizing legacy QC docs.",
        "Led AI development independently with Microsoft AI Hub funding and support, integrating 25+ parameter types for comprehensive QC templates.",
      ],
    },
    {
      role: "Business Analyst & Strategy",
      company: "N.K. Engineering",
      period: "June 2024 – November 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Data Analytics", "Power BI", "Market Research", "Financial Modeling"],
      points: [
        "Implemented data-driven strategies using predictive analytics to identify growth opportunities.",
        "Expanded market share by 12% through targeted investor acquisition and strategic planning.",
        "Built automated BI dashboards tracking 15+ KPIs, identifying market opportunity through competitor analysis.",
      ],
    },
    {
      role: "Product Design Lead",
      company: "MetaRizz",
      period: "December 2023 – May 2024",
      location: "Mumbai, Maharashtra",
      technologies: ["Figma", "UI/UX Design", "Product Management", "Flutter"],
      points: [
        "Collaborated with stakeholders to create comprehensive product requirements and wireframes using Figma, implementing user feedback-driven features that achieved 40% improvement in completion times.",
        "Led GuestInMe app revamp with enhanced UI/UX features including table booking and club pass functionality, serving 1,000+ users with improved performance metrics.",
      ],
    },
    {
      role: "Business Development Manager",
      company: "Watermelon Gang",
      period: "August 2022 – November 2023",
      location: "Mumbai, Maharashtra",
      technologies: ["Content Strategy", "Social Media Marketing", "Client Management", "Analytics"],
      points: [
        "Managed team of 2 (editor, copywriter) for content production pipeline and quality assurance.",
        "Onboarded 5 enterprise clients fintech and cryptocurrency clients, through strategic outreach.",
        "Increased engagement metrics by 35% through data-driven content strategy optimization.",
      ],
    },
  ] as Experience[],
  volunteering: {
      organization: "Vacha NGO",
      role: "English & Computer Instructor",
      period: "July 2024",
      description: "Coached English and computer skills to students, crafted innovative learning aids to improve engagement."
  }
};
