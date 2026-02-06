"use client";

import { useRouter } from "next/navigation";
import {
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  Bot,
  Newspaper,
  Users,
  HelpCircle,
  ThumbsUp,
  Clock,
  List,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCompact, cn } from "@/lib/utils";
import { useProjectStore } from "@/stores/project-store";

interface TriageCardProps {
  cluster: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    count: number;
    newToday: number;
  };
}

const iconMap: Record<string, LucideIcon> = {
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  "trending-up": TrendingUp,
  bot: Bot,
  newspaper: Newspaper,
  users: Users,
  "help-circle": HelpCircle,
  "thumbs-up": ThumbsUp,
  clock: Clock,
  list: List,
};

// Reduced color palette - 5 essential colors only (muted versions)
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
  },
  orange: {
    // Map orange to red (similar semantic meaning)
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
  slate: {
    bg: "bg-slate-50 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  indigo: {
    // Map indigo to blue (similar color)
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  yellow: {
    // Map yellow to slate (avoid bright yellow)
    bg: "bg-slate-50 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
};

export function TriageCard({ cluster }: TriageCardProps) {
  const router = useRouter();
  const topicId = useProjectStore((state) => state.topicId);
  const Icon = iconMap[cluster.icon] || List;
  const colors = colorMap[cluster.color] || colorMap.slate;

  const handleClick = () => {
    router.push(`/${topicId}/issue-monitoring/mentions/feed/${cluster.id}`);
  };

  return (
    <Card
      className={cn("cursor-pointer transition-all hover:shadow-lg border-2", colors.border, "hover:scale-[1.02]")}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className={cn("inline-flex p-3 rounded-lg mb-4", colors.bg)}>
          <Icon className={cn("h-6 w-6", colors.text)} />
        </div>

        <h3 className="font-semibold text-lg mb-1">{cluster.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{cluster.description}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{formatCompact(cluster.count)}</p>
            {cluster.newToday > 0 && (
              <p className="text-sm text-slate-500">
                <span className="text-green-600">▲ {cluster.newToday}</span> new today
              </p>
            )}
          </div>

          <Button variant="ghost" size="sm" className={colors.text}>
            View
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
