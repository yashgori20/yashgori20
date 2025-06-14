import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CornerDownLeft, Github, Linkedin, Mail, Menu, Send, User, Bot, Briefcase, Code, Sparkles, Phone, FileText, BrainCircuit, Users, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { resumeData, Project, Experience } from '@/data/resume';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type View = 'chat' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

const HuggingFaceLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
        <path d="M2.52999 13.2C2.52999 12.59 2.88999 12.04 3.42999 11.73L8.15999 9.35C8.39999 9.23 8.52999 8.97 8.52999 8.7V4.28C8.52999 3.55 9.11999 2.96 9.84999 2.96H10.16C10.89 2.96 11.48 3.55 11.48 4.28V8.7C11.48 8.97 11.61 9.23 11.85 9.35L16.58 11.73C17.12 12.04 17.48 12.59 17.48 13.2V13.68C17.48 14.02 17.37 14.34 17.16 14.6L15.3 17.47C15.01 17.92 14.48 18.2 13.92 18.2H12.08C11.52 18.2 10.99 17.92 10.7 17.47L8.84001 14.6C8.63001 14.34 8.52001 14.02 8.52001 13.68V13.2H2.52999Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18.2102V21.0002" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.3008 17.4702L17.1008 20.3202" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.7012 17.4702L8.90117 20.3202" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.97 12.52C21.27 12.52 21.52 12.77 21.52 13.07V13.43C21.52 14.01 21.24 14.54 20.78 14.88L18.84 16.2C18.59 16.37 18.49 16.69 18.57 16.99L19.26 19.48C19.41 20.01 19.06 20.55 18.5 20.72L18.15 20.83C17.59 21 17.02 20.62 16.85 20.08L16.16 17.59C16.08 17.29 15.82 17.09 15.53 17.05L13.1 16.71C12.56 16.64 12.14 16.14 12.21 15.6L12.55 13.17C12.62 12.63 13.12 12.21 13.66 12.28L16.09 12.62C16.38 12.66 16.63 12.45 16.73 12.18L18.67 10.86C18.91 10.7 19.22 10.82 19.33 11.08L20.39 12.3C20.57 12.44 20.77 12.52 20.97 12.52Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const Index = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  const SidebarContent = () => (
    <div className={cn(
      "flex flex-col h-full bg-card text-foreground transition-all duration-300",
      isSidebarCollapsed ? "w-16" : "w-72"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!isSidebarCollapsed && (
            <Button 
              variant="outline" 
              className="flex-1 justify-start mr-2" 
              onClick={() => { 
                if (activeView === 'chat') {
                  setMessages([]);
                } else {
                  setActiveView('chat');
                }
                setSidebarOpen(false); 
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" /> 
              {activeView === 'chat' ? 'Home' : 'Back to Home'}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 px-4">
          {!isSidebarCollapsed && <h3 className="px-2 text-sm font-semibold text-muted-foreground">Ask Me About</h3>}
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
              <a href={resumeData.contact.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors"/>
              </a>
              <a href={resumeData.contact.links.huggingface} target="_blank" rel="noopener noreferrer">
                <HuggingFaceLogo />
              </a>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button variant="outline" className="w-full">
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
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" 
                alt="Yash Gori" 
                className="w-full h-full object-cover"
              />
            </div>
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
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
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
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {resumeData.about}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Available Worldwide</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Status</h3>
              <p className="text-muted-foreground">Open to Opportunities</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-4 border-border">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" 
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
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
          <div className="space-y-2">
            {resumeData.skills.technical.map(skill => (
              <div key={skill} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                <span>{skill}</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
          <div className="space-y-2">
            {resumeData.skills.soft.map(skill => (
              <div key={skill} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                <span>{skill}</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
          <div className="space-y-2">
            {resumeData.skills.tools.map(tool => (
              <div key={tool} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                <span>{tool}</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
  
  const ExperienceView = () => (
    <Section title="Work Experience">
      <div className="space-y-8">
        {resumeData.experience.map((exp: Experience, index) => (
          <div key={exp.company} className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full"></div>
            <div className="ml-8 bg-card p-6 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <div className="bg-secondary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
                  {exp.period}
                </div>
              </div>
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
    </Section>
  );

  const ProjectsView = () => (
    <Section title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-8">
        {resumeData.projects.map((proj: Project, index) => (
          <div key={proj.title} className="bg-card rounded-lg border overflow-hidden hover:border-primary/50 transition-colors group">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Code className="h-16 w-16 text-primary/50 group-hover:text-primary transition-colors" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-secondary text-xs font-medium rounded-full border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  const ContactView = () => (
    <Section title="Get In Touch">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always interested in hearing about new opportunities and interesting projects. 
              Feel free to reach out if you'd like to discuss potential collaborations or just say hello!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{resumeData.contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{resumeData.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Follow Me</h3>
          <div className="grid gap-4">
            <a 
              href={resumeData.contact.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-6 bg-card rounded-lg border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Linkedin className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <p className="font-medium">LinkedIn</p>
                <p className="text-muted-foreground">Professional Network</p>
              </div>
            </a>
            
            <a 
              href={resumeData.contact.links.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-6 bg-card rounded-lg border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Github className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-muted-foreground">Code Repository</p>
              </div>
            </a>
            
            <a 
              href={resumeData.contact.links.huggingface} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-6 bg-card rounded-lg border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <HuggingFaceLogo />
              </div>
              <div>
                <p className="font-medium">Hugging Face</p>
                <p className="text-muted-foreground">AI/ML Projects</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );

  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
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
