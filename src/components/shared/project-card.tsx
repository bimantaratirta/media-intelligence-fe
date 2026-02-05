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
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
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
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Most recent
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-xl text-slate-900 dark:text-slate-100 line-clamp-1">
                  {topic.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                  {topic.description}
                </p>
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

  // Compact variant - list item style
  if (variant === "compact") {
    return (
      <div
        className="group flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
        onClick={handleOpen}
      >
        {/* Status dot */}
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full shrink-0",
            topic.status === "active"
              ? "bg-green-500"
              : "bg-yellow-500"
          )}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
            {topic.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {topic.description}
          </p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 shrink-0">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formatCompact(topic.mentionCount)}
          </span>
          <span className="text-xs">
            {formatRelative(topic.lastCrawledAt)}
          </span>
        </div>

        {/* Arrow */}
        <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
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
