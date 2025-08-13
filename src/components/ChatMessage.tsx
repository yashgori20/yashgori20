
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
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

