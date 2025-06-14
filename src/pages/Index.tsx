import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { 
  CornerDownLeft, Github, Linkedin, Mail, Menu, User, Bot, Briefcase, Code, Sparkles, Phone, BrainCircuit, Users, ChevronLeft, ChevronRight, Download, MapPin, Instagram, Twitter, ExternalLink, GraduationCap, Wrench 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { resumeData, Project, Experience } from '@/data/resume';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import ContactForm from '@/components/ContactForm';
import ProfileCard from '@/components/ProfileCard';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type View = 'chat' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

const HuggingFaceLogo = ({ className }: { className?: string }) => (
  <img 
    src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo-pirate.svg" 
    alt="Hugging Face" 
    className={cn("w-6 h-6", className)}
  />
);

const Index = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardPosition, setProfileCardPosition] = useState({ x: 0, y: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  const askApi = useMutation({
    mutationFn: async (userInput: string): Promise<string> => {
      try {
        const response = await fetch('https://yashgori20-yashgori.hf.space/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "question": userInput }),
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.answer || "I'm not sure how to answer that. Try asking about Yash's skills or projects.";
      } catch (error) {
        console.error("API call failed:", error);
        return "Sorry, something went wrong while connecting to my brain. Please try again later.";
      }
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setActiveView('chat');
      const newMessages: Message[] = [...messages, { role: 'user', content: input }];
      setMessages(newMessages);
      askApi.mutate(input);
      setInput('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setActiveView('chat');
    const newMessages: Message[] = [...messages, { role: 'user', content: suggestion }];
    setMessages(newMessages);
    askApi.mutate(suggestion);
    setInput('');
  };

  const scrollToContact = () => {
    setActiveView('contact');
    // Small delay to ensure the view has switched before focusing
    setTimeout(() => {
      const messageInput = document.querySelector('textarea[placeholder="Your Message"]') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.focus();
      }
    }, 100);
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setProfileCardPosition({
      x: rect.left,
      y: rect.bottom
    });
    setProfileCardOpen(!profileCardOpen);
  };

  const SidebarContent = () => (
    <div className={cn(
      "flex flex-col h-full bg-card text-foreground transition-all duration-300",
      isSidebarCollapsed ? "w-16" : "w-72"
    )}>
      <div className={cn("p-4 flex flex-col", isSidebarCollapsed ? 'items-center' : '')}>
        {!isSidebarCollapsed && (
          <div className="mb-4 text-center">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={resumeData.profileImage} 
                alt="Yash Gori" 
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {resumeData.name}
                </h2>
                <div className="w-full h-px bg-border my-1"></div>
                <p className="text-sm text-muted-foreground">AI Developer & Engineer</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center w-full">
          <Button 
            variant="ghost"
            className={cn(
              "justify-start transition-all", 
              isSidebarCollapsed ? 'w-10 h-10 p-0' : 'flex-1 mr-2'
            )}
            onClick={() => { 
              if (activeView === 'chat') {
                setMessages([]);
              } else {
                setActiveView('chat');
              }
              setSidebarOpen(false); 
            }}
          >
            <Sparkles className={cn("h-4 w-4", !isSidebarCollapsed && "mr-2")} /> 
            {!isSidebarCollapsed && (activeView === 'chat' ? 'Home' : 'Back to Home')}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          <SidebarButton icon={User} label="About" view="about" />
          <SidebarButton icon={Briefcase} label="Experience" view="experience" />
          <SidebarButton icon={Code} label="Projects" view="projects" />
          <SidebarButton icon={BrainCircuit} label="Skills" view="skills" />
          <SidebarButton icon={Mail} label="Contact" view="contact" />
        </div>
      </ScrollArea>
      
      <div className="mt-auto p-4 border-t border-border">
        {!isSidebarCollapsed && (
          <>
            <div className="flex justify-center space-x-4 mb-4">
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Github className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <HuggingFaceLogo className="h-6 w-6 hover:text-primary transition-colors" />
              </a>
              <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
            </div>
            <div className="space-y-3">
              <a href="https://drive.google.com/file/d/1aWrJqUWgxKvDZ9zWgvZg6GYxUi96Px-N/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full bg-secondary/30 border-secondary hover:bg-secondary/50">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
              <Button variant="outline" className="w-full bg-secondary/30 border-secondary hover:bg-secondary/50" onClick={scrollToContact}>
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const SidebarButton = ({ icon: Icon, label, view }: { icon: React.ElementType, label: string, view: View }) => (
    <Button 
      variant={activeView === view ? "secondary" : "ghost"} 
      className={cn(
        "w-full transition-all duration-200",
        isSidebarCollapsed ? "justify-center px-2" : "justify-start"
      )}
      onClick={() => { setActiveView(view); setSidebarOpen(false); }}
      title={isSidebarCollapsed ? label : undefined}
    >
      <Icon className={cn("h-4 w-4", !isSidebarCollapsed && "mr-2")} />
      {!isSidebarCollapsed && label}
    </Button>
  );

  const renderView = () => {
    switch (activeView) {
      case 'chat': return <ChatInterface />;
      case 'about': return <AboutView />;
      case 'experience': return <ExperienceView />;
      case 'projects': return <ProjectsView />;
      case 'skills': return <SkillsView />;
      case 'contact': return <ContactView />;
      default: return <ChatInterface />;
    }
  };

  const ChatInterface = () => (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 max-w-4xl mx-auto w-full">
          <div className="absolute top-8 right-8">
            <div 
              className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={handleProfileClick}
            >
              <img 
                src={resumeData.profileImage} 
                alt="Yash Gori" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <Button variant="outline" className="text-sm text-muted-foreground hover:text-foreground">
              Prefer a classic view?
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
          <p className="text-muted-foreground mb-8 text-sm">Welcome to Yash Gori's Portfolio</p>
          
          <div className="w-full max-w-2xl mb-8">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about Yash Gori..."
                className="pr-12 h-12 text-center"
              />
              <Button 
                size="icon" 
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2" 
                onClick={handleSend} 
                disabled={askApi.isPending}
              >
                <CornerDownLeft className="h-5 w-5 font-bold" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-4">
            <SuggestionCard title="What are your key skills?" onClick={() => handleSuggestionClick("What are your key skills?")} />
            <SuggestionCard title="Tell me about DocuTalk" onClick={() => handleSuggestionClick("Tell me about the DocuTalk project")} />
            <SuggestionCard title="Summarize experience" onClick={() => handleSuggestionClick("Summarize my experience")} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
            <SuggestionCard title="How to contact you?" onClick={() => handleSuggestionClick("How can I contact you?")} />
            <SuggestionCard title="Your latest projects?" onClick={() => handleSuggestionClick("What are your latest projects?")} />
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {askApi.isPending && <LoadingMessage />}
          </div>
        </ScrollArea>
      )}
    </div>
  );
  
  const SuggestionCard = ({ title, onClick }: { title: string; onClick: () => void }) => (
    <button onClick={onClick} className="bg-card p-4 rounded-lg hover:bg-secondary transition-colors text-left flex items-center border">
        <p className="flex-1 text-sm">{title}</p>
        <CornerDownLeft className="h-4 w-4 text-muted-foreground ml-2" />
    </button>
  );

  const ChatMessage = ({ message }: { message: Message }) => {
    const isUser = message.role === 'user';
    return (
      <div className={cn("flex items-start gap-4", isUser ? "justify-end" : "justify-start")}>
        {!isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"><Bot className="w-5 h-5 text-primary-foreground" /></div>}
        <div className={cn("max-w-xl p-4 rounded-lg whitespace-pre-wrap", isUser ? "bg-primary text-primary-foreground" : "bg-secondary")}>
          {message.content}
        </div>
        {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><User className="w-5 h-5 text-secondary-foreground" /></div>}
      </div>
    );
  };
  
  const LoadingMessage = () => (
      <div className="flex items-start gap-4 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"><Bot className="w-5 h-5 text-primary-foreground animate-pulse" /></div>
        <div className="max-w-xl p-4 rounded-lg bg-secondary flex items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
      </div>
  )

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="w-24 h-1 bg-primary rounded-full"></div>
        </div>
        {children}
      </div>
    </div>
  );

  const AboutView = () => (
    <Section title="About Me">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-12">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {resumeData.about}
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="bg-card p-4 rounded-lg border flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="text-muted-foreground">{resumeData.contact.location}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">What I Bring to the Table</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {resumeData.whatIBring}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">Languages</h3>
            <div className="grid grid-cols-2 gap-4">
              {resumeData.languages.map((language, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{language}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent border-b pb-3">Education</h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border">
                      <GraduationCap className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                      <h4 className="font-semibold text-lg">{edu.institution}</h4>
                      <p className="text-sm text-primary font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.period}</p>
                      <p className="text-sm text-muted-foreground">{edu.details}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border">
            <img 
              src={resumeData.profileImage} 
              alt="Yash Gori" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
  
  const SkillsView = () => (
    <Section title="Skills & Expertise">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.skills.technical.map((skill) => (
              <div key={skill.name} className="group bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${skill.level}, 100`}
                        className="text-primary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-secondary/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Tools & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.skills.tools.map((tool) => (
              <div key={tool.name} className="group bg-gradient-to-br from-accent/5 to-primary/5 p-6 rounded-xl border hover:border-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${tool.level}, 100`}
                        className="text-accent"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-accent/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Soft Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.skills.soft.map((skill) => (
              <div key={skill.name} className="group bg-gradient-to-br from-secondary/5 to-muted/5 p-6 rounded-xl border hover:border-secondary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${skill.level}, 100`}
                        className="text-secondary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-secondary/20"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <BrainCircuit className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
  
  const ExperienceView = () => (
    <Section title="Work Experience">
      <div className="space-y-16">
        <div>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Career Path</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp: Experience, index) => (
              <div key={exp.company} className="relative group">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full transition-transform duration-300 group-hover:scale-y-105"></div>
                <div className="ml-8 bg-card p-6 rounded-lg border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {exp.location}
                      </p>
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  {exp.technologies && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-primary">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Volunteering</h2>
            <div className="relative group">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full transition-transform duration-300 group-hover:scale-y-105"></div>
                <div className="ml-8 bg-card p-6 rounded-lg border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold">{resumeData.volunteering.role}</h3>
                            <p className="text-primary font-medium">{resumeData.volunteering.organization}</p>
                        </div>
                        <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 whitespace-nowrap">
                            {resumeData.volunteering.period}
                        </div>
                    </div>
                    <p className="text-muted-foreground">{resumeData.volunteering.description}</p>
                </div>
            </div>
        </div>
      </div>
    </Section>
  );

  const ProjectsView = () => (
    <Section title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {resumeData.projects.map((proj: Project, index) => (
          <div key={proj.title} className="bg-card rounded-lg border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group flex flex-col">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Code className="h-16 w-16 text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-secondary text-xs font-medium rounded-full border">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4">
                {proj.codeUrl && (
                   <a href={proj.codeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full">
                         <Code className="mr-2 h-4 w-4" /> View Code
                      </Button>
                   </a>
                )}
                {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="default" className="w-full">
                         <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Button>
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
       <div className="text-center mt-12">
        <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="group">
            View All Projects on GitHub
            <Github className="ml-2 h-5 w-5 transition-transform group-hover:animate-bounce" />
          </Button>
        </a>
      </div>
    </Section>
  );

  const ContactView = () => (
    <Section title="Get In Touch">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always interested in hearing about new opportunities and interesting projects. 
              Feel free to reach out if you'd like to discuss potential collaborations or just say hello!
            </p>
          </div>
          
          <div className="space-y-4">
            <a href={`mailto:${resumeData.contact.email}`} className="block group">
              <div className="flex items-center gap-4 p-4 bg-card rounded-lg border group-hover:border-primary/50 transition-colors group-hover:scale-105 transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{resumeData.contact.email}</p>
                </div>
              </div>
            </a>
            
            <a href={`tel:${resumeData.contact.phone}`} className="block group">
              <div className="flex items-center gap-4 p-4 bg-card rounded-lg border group-hover:border-primary/50 transition-colors group-hover:scale-105 transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary"/>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{resumeData.contact.phone}</p>
                </div>
              </div>
            </a>

             <div className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:border-primary/50 transition-colors hover:scale-105 transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{resumeData.contact.location}</p>
                </div>
            </div>
          </div>
           <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-semibold">Follow Me</h3>
            <div className="flex items-center gap-6">
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Linkedin className="h-7 w-7"/>
              </a>
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Github className="h-7 w-7"/>
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                 <HuggingFaceLogo className="h-7 w-7" />
              </a>
               <a href={resumeData.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Instagram className="h-7 w-7"/>
              </a>
               <a href={resumeData.contact.links.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 block">
                <Twitter className="h-7 w-7"/>
              </a>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </div>
    </Section>
  );

  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <ProfileCard 
        isOpen={profileCardOpen} 
        onClose={() => setProfileCardOpen(false)} 
        position={profileCardPosition} 
      />
      
      <div className="md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10">
                      <Menu className="h-6 w-6" />
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none">
                  <div className="w-72"><SidebarContent /></div>
              </SheetContent>
          </Sheet>
      </div>
      
      <div className={cn(
        "hidden md:block h-full transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-72"
      )}>
          <SidebarContent />
      </div>
      
      <main className="flex-1 flex flex-col h-full bg-background overflow-hidden">
          <ScrollArea className="flex-1">
            {renderView()}
          </ScrollArea>
        {activeView === 'chat' && messages.length > 0 && (
          <div className="p-4 border-t border-border bg-background">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about Yash Gori..."
                  className="pr-12 h-12"
                />
                <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleSend} disabled={askApi.isPending}>
                  <CornerDownLeft className="h-5 w-5 font-bold" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                  YashGori-GPT can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
