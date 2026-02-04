"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompetitorData } from "@/mocks/data/competitor";

interface MetricsComparisonTableProps {
  competitors: CompetitorData[];
}

interface MetricConfig {
  key: keyof CompetitorData["metrics"];
  label: string;
  format: (value: number) => string;
  higherIsBetter: boolean;
}

const metricsConfig: MetricConfig[] = [
  {
    key: "mentions",
    label: "Total Mentions",
    format: (v) => v.toLocaleString(),
    higherIsBetter: true,
  },
  {
    key: "sentimentScore",
    label: "Sentiment Score",
    format: (v) => (v > 0 ? `+${v.toFixed(2)}` : v.toFixed(2)),
    higherIsBetter: true,
  },
  {
    key: "positivePercent",
    label: "Positive %",
    format: (v) => `${v}%`,
    higherIsBetter: true,
  },
  {
    key: "negativePercent",
    label: "Negative %",
    format: (v) => `${v}%`,
    higherIsBetter: false,
  },
  {
    key: "reach",
    label: "Reach",
    format: (v) => `${(v / 1000000).toFixed(1)}M`,
    higherIsBetter: true,
  },
  {
    key: "engagement",
    label: "Engagement Rate",
    format: (v) => `${v}%`,
    higherIsBetter: true,
  },
  {
    key: "viralityIndex",
    label: "Virality Index",
    format: (v) => v.toFixed(1),
    higherIsBetter: true,
  },
];

function findBest(
  competitors: CompetitorData[],
  key: keyof CompetitorData["metrics"],
  higherIsBetter: boolean
): string {
  const values = competitors.map((c) => ({
    name: c.name,
    value: c.metrics[key],
  }));

  const best = values.reduce((prev, current) => {
    if (higherIsBetter) {
      return current.value > prev.value ? current : prev;
    }
    return current.value < prev.value ? current : prev;
  });

  return best.name;
}

export function MetricsComparisonTable({
  competitors,
}: MetricsComparisonTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Metrics Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Metric</th>
                {competitors.map((c) => (
                  <th key={c.id} className="text-right py-3 px-4 font-medium">
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ color: c.color }}
                    >
                      {c.isOwn && <Trophy className="h-4 w-4" />}
                      {c.name}
                    </span>
                  </th>
                ))}
                <th className="text-right py-3 px-4 font-medium">Leader</th>
              </tr>
            </thead>
            <tbody>
              {metricsConfig.map((metric) => {
                const best = findBest(
                  competitors,
                  metric.key,
                  metric.higherIsBetter
                );
                return (
                  <tr key={metric.key} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm">{metric.label}</td>
                    {competitors.map((c) => {
                      const value = c.metrics[metric.key];
                      const isBest = c.name === best;
                      return (
                        <td
                          key={c.id}
                          className={cn(
                            "py-3 px-4 text-sm text-right font-medium",
                            isBest && "text-green-600 dark:text-green-400"
                          )}
                        >
                          {metric.format(value)}
                        </td>
                      );
                    })}
                    <td className="py-3 px-4 text-right">
                      <Badge variant="secondary" className="gap-1">
                        <Trophy className="h-3 w-3" />
                        {best}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
