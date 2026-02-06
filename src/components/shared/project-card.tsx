"use client";

import { useRouter } from "next/navigation";
import { BarChart3, Clock, ArrowRight, Pause, Play } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCompact, formatRelative, cn } from "@/lib/utils";
import { useProjectStore } from "@/stores/project-store";
import type { Topic } from "@/types";

interface ProjectCardProps {
  topic: Topic;
  variant?: "default" | "featured" | "compact";
}

export function ProjectCard({ topic, variant = "default" }: ProjectCardProps) {
  const router = useRouter();
  const setTopic = useProjectStore((state) => state.setTopic);

  const handleOpen = () => {
    setTopic(topic.id, topic.name);
    router.push(`/${topic.id}/issue-monitoring/overview`);
  };

  const StatusBadge = () => (
    <Badge
      variant={topic.status === "active" ? "default" : "secondary"}
      className={cn(
        "text-xs",
        topic.status === "active"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      )}
    >
      {topic.status === "active" ? (
        <>
          <Play className="h-3 w-3 mr-1" />
          Active
        </>
      ) : (
        <>
          <Pause className="h-3 w-3 mr-1" />
          Paused
        </>
      )}
    </Badge>
  );

  // Featured variant - large horizontal card
  if (variant === "featured") {
    return (
      <Card
        className="group hover:shadow-md transition-all cursor-pointer border-l-4 border-l-blue-500"
        onClick={handleOpen}
      >
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left content */}
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex items-center gap-3">
                <StatusBadge />
                <span className="text-xs text-slate-400 dark:text-slate-500">Most recent</span>
              </div>

              <div>
                <h3 className="font-semibold text-xl text-slate-900 dark:text-slate-100 line-clamp-1">{topic.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">{topic.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold">{formatCompact(topic.mentionCount)}</span>
                  <span className="text-slate-400">mentions</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Updated {formatRelative(topic.lastCrawledAt)}</span>
                </div>
              </div>
            </div>

            {/* Right action */}
            <div className="flex lg:flex-col items-center lg:items-end gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              >
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Compact variant - redesigned with visible card styling
  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-200",
          "border border-slate-200 dark:border-slate-700/50",
          "hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600/50",
          "hover:scale-[1.01]",
          "bg-white dark:bg-slate-800/50",
          "backdrop-blur-sm",
        )}
        onClick={handleOpen}
      >
        <div className="flex items-center gap-4 p-4">
          {/* Status indicator with glow effect */}
          <div className="relative shrink-0">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                topic.status === "active"
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]",
              )}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {topic.name}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">{topic.description}</p>
          </div>

          {/* Stats with visual separation */}
          <div className="hidden sm:flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20">
              <BarChart3 className="h-3.5 w-3.5 text-blue-500" />
              <span className="font-semibold text-sm text-blue-700 dark:text-blue-300">
                {formatCompact(topic.mentionCount)}
              </span>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">{formatRelative(topic.lastCrawledAt)}</div>
          </div>

          {/* Arrow with animation */}
          <div className="shrink-0 p-2 rounded-full bg-slate-100 dark:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-all group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </Card>
    );
  }

  // Default variant - original card design
  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={handleOpen}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <StatusBadge />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{topic.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{topic.description}</p>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <BarChart3 className="h-4 w-4" />
          <span className="font-medium">{formatCompact(topic.mentionCount)}</span>
          <span className="text-sm text-slate-500">mentions</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Clock className="h-4 w-4" />
          <span>Updated {formatRelative(topic.lastCrawledAt)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" className="w-full group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
          Open Dashboard
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
