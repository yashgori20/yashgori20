
export interface Project {
  title: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const resumeData = {
  name: "YASH GORI",
  contact: {
    email: "yashnileshgori@gmail.com",
    phone: "7718081766",
    location: "Mumbai, Maharashtra",
    links: {
      linkedin: "https://linkedin.com/in/yashgori20",
      github: "https://github.com/yashgori20",
      huggingface: "https://huggingface.co/yashgori20",
    },
  },
  about: "An AI Developer with a passion for building intelligent systems and creative solutions. Proficient in Python, LangChain, and various machine learning frameworks, with experience in developing RAG-based applications, multi-agent systems, and data-driven prediction models. A detail-oriented, adaptable, and creative problem solver.",
  education: [
    {
      institution: "KJ SOMAIYA COLLEGE OF ENGINEERING",
      degree: "BTech in Information Technology",
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
    technical: ["Python", "LangChain", "PostgreSQL", "Prompt Engineering", "Streamlit", "Firebase", "Natural Language Processing", "Flask"],
    soft: ["Detail Oriented", "Adaptability", "Critical Thinking", "Creative problem solving"],
    tools: ["Canva", "Figma", "Git", "Github", "PowerBI", "Looker"],
  },
  projects: [
    {
      title: "DocuTalk (AI-Enhanced Conversational Interface for Document Understanding)",
      description: "Developed a cross-platform application that allows users to interact with documents through a conversational interface. Implemented semantic search functionality using FAISS and Langchain to provide contextually relevant answers to user queries.",
      technologies: ["Python", "Flutter", "Flask", "Gemini LLM", "FAISS", "Langchain"],
    },
    {
      title: "Inhance (AI-Powered LinkedIn Profile Optimizer)",
      description: "Hosted an app to provide personalized feedback and improvement suggestions for LinkedIn profiles, including targeted role optimization and chatbot guidance. Designed a multi-agent system for profile evaluation and recommendation, enhancing user profiles based on specific job roles.",
      technologies: ["Python", "Streamlit", "GROQ Cloud", "Mixtral LLM"],
    },
    {
      title: "Finance Advisor Agent",
      description: "Developed an AI assistant for financial computations (MPBF, DP), RBI compliance checks, and industry classification with a vector database for seamless updates. Designed an intuitive GUI leveraging dynamic embeddings and vector search to provide real-time, scenario-based insights and actionable recommendations.",
      technologies: ["Python", "Streamlit", "GROQ Cloud", "Gemma 9B", "Vector databases", "FAISS"],
    },
    {
      title: "Cryptocurrency Fetching Agent",
      description: "Built an AI Agent to provide real-time cryptocurrency prices and multilingual query handling with dynamic error management and multi-currency support for seamless interactions.",
      technologies: ["Python", "Streamlit", "Scrapping", "Google Translation", "Together AI", "Llama 3.2 8B"],
    },
    {
      title: "Customer Churn Predictor",
      description: "Implemented a machine learning model using Python and a Random Forest classifier to predict customer churn in the telecommunications industry with 94% accuracy. Presented key findings and actionable insights through an interactive Power BI dashboard.",
      technologies: ["Python", "Random Forest", "Decision trees", "Power BI", "Numpy", "Pandas", "Seaborn", "Matplotlib"],
    },
  ] as Project[],
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Webotix IT Consultancy",
      period: "December 2024 – Ongoing",
      points: [
        "Developed RAG-based AI template generator using Flask + Azure + RAG with dynamic prompt pipelines for intelligent document generation and compliance prediction.",
        "Collaborated on frontend integration with Flutter web.",
        "Spearheaded ideation and documentation for an AI-powered QC document automation platform, contributing to product roadmap and feature scoping.",
      ],
    },
    {
      role: "Business Analyst",
      company: "N.K. Engineering",
      period: "May 2024 – July 2024",
      points: [
        "Led data-driven strategies to identify growth opportunities and secure financial support. Successfully attracted new investors, resulting in a significant increase in funding and 12% expansion in market share.",
      ],
    },
    {
      role: "Front-End Development",
      company: "MetaRizz",
      period: "Sept 2023 – Oct 2023",
      points: [
        "Led the front-end development and UI/UX design for Medinobel, a healthcare app, ensuring a seamless user experience.",
      ],
    },
    {
      role: "Business Development",
      company: "Watermelon Gang",
      period: "Aug 2022 - Feb 2023",
      points: [
        "Created and curated engaging content, increasing follower engagement and boosting brand visibility for a leading banking app and a global cryptocurrency platform across multiple platforms.",
        "Onboarded 5 new clients and ensured high-quality content delivery.",
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
