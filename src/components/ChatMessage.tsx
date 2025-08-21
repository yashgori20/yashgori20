
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
    <div className={cn("mb-8", isUser ? "text-right" : "text-left")}>
      <div className={cn("max-w-4xl", isUser ? "ml-auto" : "mr-auto")}>
        {isUser ? (
          <div className="inline-block bg-[#303030] px-4 py-3 rounded-2xl text-white text-lg font-medium whitespace-pre-wrap">
            {message.content}
          </div>
        ) : (
          <div className="text-white text-base leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Rich content - only show for assistant messages with actual content */}
        {!isUser && richContent && Object.keys(richContent).length > 0 &&
          Object.entries(richContent).some(([_, project]) =>
            project.github_link ||
            (project.technical_specs && project.technical_specs.length > 0) ||
            project.key_achievement
          ) && (
            <div className="space-y-2 mt-4">
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
    </div>
  );
};

export default ChatMessage;

