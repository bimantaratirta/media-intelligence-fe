import { BarChart3, Lightbulb, Target, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface Insight {
  id: string;
  type: "observation" | "recommendation" | "trend" | "warning";
  icon: string;
  message: string;
  priority: "high" | "medium" | "low";
}

interface InsightPanelProps {
  insights: Insight[];
  loading?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  chart: BarChart3,
  lightbulb: Lightbulb,
  target: Target,
  warning: AlertTriangle,
  trend: TrendingUp,
};

const priorityStyles: Record<string, string> = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-blue-500",
};

export function InsightPanel({ insights, loading }: InsightPanelProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = iconMap[insight.icon] || Lightbulb;

          return (
            <div
              key={insight.id}
              className={cn(
                "flex gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-4",
                priorityStyles[insight.priority],
              )}
            >
              <Icon className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 dark:text-slate-300">{insight.message}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
