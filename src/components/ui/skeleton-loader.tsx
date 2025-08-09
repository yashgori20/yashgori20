import { cn } from "@/lib/utils"

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  className?: string
}

export function SkeletonLoader({ lines = 1, className, ...props }: SkeletonLoaderProps) {
  return (
    <div className={cn("animate-pulse", className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-4 bg-muted rounded",
            index < lines - 1 && "mb-2",
            index === lines - 1 && lines > 1 && "w-3/4"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 border rounded-lg animate-pulse", className)} {...props}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-muted rounded-lg" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
    </div>
  )
}

export function SkeletonMessage({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={cn("flex w-full animate-pulse", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[85%] space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        {!isUser && <div className="w-8 h-8 bg-muted rounded-full mb-2" />}
        <div className={cn(
          "p-3 rounded-lg space-y-2",
          isUser ? "bg-primary/20" : "bg-muted/50"
        )}>
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}