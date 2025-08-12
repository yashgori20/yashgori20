
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, ExternalLink, Github } from 'lucide-react';
import { Message, RichContent, ProjectContent } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMessageProps = {
    message: Message;
    richContent?: RichContent;
};

const ChatMessage = ({ message, richContent }: ChatMessageProps) => {
    const isUser = message.role === 'user';
    
    const ProjectCard = ({ projectName, project }: { projectName: string, project: ProjectContent }) => (
      <Card className="w-full mt-3">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">{projectName}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {project.key_achievement}
              </CardDescription>
            </div>
            {project.github_link && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 flex-shrink-0"
                onClick={() => window.open(project.github_link, '_blank')}
              >
                <Github className="w-3 h-3 mr-1" />
                View
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {project.technical_specs?.map((spec: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );

    return (
      <div className={cn("flex items-start gap-4", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <Avatar className="w-8 h-8 rounded-none animate-gentle-pulse">
            <AvatarImage src="/images/triquetra-logo.png" alt="AI Assistant" />
            <AvatarFallback>
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        )}
        <div className={cn("max-w-xl", isUser ? "text-right" : "")}>
          <div className={cn("p-4 rounded-lg", isUser ? "bg-primary text-primary-foreground" : "bg-secondary")}>
            {isUser ? (
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-headings:mb-3 prose-headings:mt-4 first:prose-headings:mt-0 prose-strong:font-semibold prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-md prose-pre:p-4 prose-pre:overflow-x-auto"
                components={{
                  // Customize list styling
                  ul: ({ children }) => <ul className="space-y-1 ml-4">{children}</ul>,
                  li: ({ children }) => <li className="flex items-start"><span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0"></span><span>{children}</span></li>,
                  // Customize strong text
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  // Enhanced code blocks
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const language = match ? match[1] : ''
                    
                    if (!inline && language) {
                      // Block code with language
                      return (
                        <div className="relative">
                          {language && (
                            <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded border">
                              {language}
                            </div>
                          )}
                          <pre className="bg-muted border border-border rounded-md p-4 overflow-x-auto">
                            <code className="text-sm font-mono text-foreground" {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      )
                    }
                    
                    // Inline code
                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border" {...props}>
                        {children}
                      </code>
                    )
                  },
                  // Enhanced pre blocks
                  pre: ({ children }) => <div className="my-4">{children}</div>,
                  // Better headings for README-style content
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0 text-foreground">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-4 first:mt-0 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mb-2 mt-3 first:mt-0 text-foreground">{children}</h3>,
                  // Enhanced blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-border bg-muted/30 pl-4 py-2 my-3 italic">
                      {children}
                    </blockquote>
                  ),
                  // Better tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-border rounded-md">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border bg-muted px-3 py-2 text-left font-semibold text-sm">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-3 py-2 text-sm">
                      {children}
                    </td>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          
          {/* Rich content - only show for assistant messages with actual content */}
          {!isUser && richContent && Object.keys(richContent).length > 0 && 
            Object.entries(richContent).some(([_, project]) => 
              project.github_link || 
              (project.technical_specs && project.technical_specs.length > 0) || 
              project.key_achievement
            ) && (
            <div className="space-y-2 mt-3">
              {Object.entries(richContent)
                .filter(([_, project]) => 
                  project.github_link || 
                  (project.technical_specs && project.technical_specs.length > 0) || 
                  project.key_achievement
                )
                .map(([projectName, project]) => (
                  <ProjectCard key={projectName} projectName={projectName} project={project} />
                ))}
            </div>
          )}
        </div>
        {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><User className="w-5 h-5 text-secondary-foreground" /></div>}
      </div>
    );
};

export default ChatMessage;

