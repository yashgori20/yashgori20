import { ProjectType, ExperienceType, SkillType } from "../types";

export const resumeData = {
  name: "Yash Gori",
  about:
    "I am a highly motivated and skilled AI Developer and Engineer with a passion for creating innovative solutions. With a strong foundation in machine learning, deep learning, and software development, I am eager to contribute my expertise to challenging projects and make a meaningful impact.",
  profileImage: "/profile.jpeg",
  whatIBring:
    "As an AI Developer and Engineer, I bring a unique blend of technical expertise, creative problem-solving skills, and a strong commitment to excellence. My proficiency in machine learning, deep learning, and software development allows me to tackle complex challenges and deliver innovative solutions that drive business value.",
  contact: {
    email: "yashgori20@gmail.com",
    phone: "+91 9324299427",
    location: "Mumbai, India",
    links: {
      linkedin: "https://www.linkedin.com/in/yash-gori-20/",
      github: "https://github.com/yashgori20",
      huggingface: "https://huggingface.co/yashgori20",
      instagram: "https://www.instagram.com/yashgori20/",
      twitter: "https://twitter.com/yashgori20",
    },
  },
  languages: ["English", "Hindi", "Gujarati"],
  education: [
    {
      institution: "K.J. SOMAIYA COLLEGE OF ENGINEERING",
      degree: "B.Tech in Information Technology",
      period: "2020-2024",
      details: "CGPA: 9.16/10",
    },
  ],
  skills: {
    technical: [
      { name: "Python", level: 95 },
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "SQL", level: 70 },
    ],
    soft: [
      { name: "Problem Solving", level: 90 },
      { name: "Communication", level: 85 },
      { name: "Teamwork", level: 95 },
      { name: "Adaptability", level: 80 },
      { name: "Leadership", level: 75 },
    ],
    tools: [
      { name: "Jupyter Notebook", level: 90 },
      { name: "VS Code", level: 85 },
      { name: "Git", level: 95 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 75 },
    ],
  },
  experience: [
    {
      role: "AI Developer",
      company: "Robert Bosch Engineering and Business Solutions",
      location: "Bangalore, India",
      period: "Jan 2024 - Present",
      points: [
        "Developed and deployed machine learning models for various applications.",
        "Collaborated with cross-functional teams to deliver AI-powered solutions.",
        "Optimized model performance and ensured scalability and reliability.",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "SQL",
        "Jupyter Notebook",
        "Git",
      ],
    },
    {
      role: "AI Research Intern",
      company: "IIT Bombay",
      location: "Mumbai, India",
      period: "May 2023 - Jul 2023",
      points: [
        "Conducted research on deep learning models for natural language processing.",
        "Published research papers in top-tier conferences.",
        "Collaborated with professors and PhD students on cutting-edge research.",
      ],
      technologies: ["Python", "TensorFlow", "NLP", "Research", "LaTeX"],
    },
    {
      role: "Software Engineer Intern",
      company: "JP Morgan Chase & Co.",
      location: "Mumbai, India",
      period: "May 2022 - Jul 2022",
      points: [
        "Developed and maintained web applications using React and JavaScript.",
        "Collaborated with senior engineers to deliver high-quality software.",
        "Participated in code reviews and testing.",
      ],
      technologies: ["JavaScript", "React", "HTML", "CSS", "Git"],
    },
  ],
  projects: [
    {
      title: "DocuTalk",
      description:
        "DocuTalk is a document summarization tool that uses natural language processing to generate concise summaries of long documents. It is built using Python, TensorFlow, and React.",
      technologies: ["Python", "TensorFlow", "React", "NLP"],
      codeUrl: "https://github.com/yashgori20/DocuTalk",
      liveUrl: "https://yashgori20.github.io/DocuTalk/",
    },
    {
      title: "AI Chatbot",
      description:
        "An AI chatbot that uses machine learning to answer questions about Yash Gori. It is built using Python, TensorFlow, and React.",
      technologies: ["Python", "TensorFlow", "React", "NLP"],
      codeUrl: "https://github.com/yashgori20/portfolio",
      liveUrl: "https://yashgori20-yashgori.hf.space/",
    },
  ],
  volunteering: {
    role: "AI Mentor",
    organization: "AI Club",
    period: "2022-2023",
    description:
      "Mentored students in AI and machine learning. Conducted workshops and seminars on AI-related topics.",
  },
};

export type ResumeData = typeof resumeData;
export type Project = ProjectType;
export type Experience = ExperienceType;
export type Skill = SkillType;
