"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComparisonInsight } from "@/mocks/data/comparison";

interface ComparisonInsightsProps {
  insights: ComparisonInsight[];
}

const insightStyles = {
  improvement:
    "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
  decline: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
  observation:
    "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
  recommendation:
    "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800",
};

export function ComparisonInsights({ insights }: ComparisonInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Key Differences (AI Analysis)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "p-4 rounded-lg border",
                insightStyles[insight.type]
              )}
            >
              <p className="text-sm flex items-start gap-3">
                <span className="text-xl">{insight.icon}</span>
                <span>{insight.message}</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
