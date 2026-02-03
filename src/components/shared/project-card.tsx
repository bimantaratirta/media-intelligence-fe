"use client";

import { useRouter } from "next/navigation";
import { BarChart3, Clock, ArrowRight, Pause, Play } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCompact, formatRelative } from "@/lib/utils";
import { useProjectStore } from "@/stores/project-store";
import type { Topic } from "@/types";

interface ProjectCardProps {
  topic: Topic;
}

export function ProjectCard({ topic }: ProjectCardProps) {
  const router = useRouter();
  const setTopic = useProjectStore((state) => state.setTopic);

  const handleOpen = () => {
    setTopic(topic.id, topic.name);
    router.push(`/${topic.id}/issue-monitoring/overview`);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={handleOpen}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge
            variant={topic.status === "active" ? "default" : "secondary"}
            className={
              topic.status === "active"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            }
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
