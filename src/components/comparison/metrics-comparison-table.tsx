"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { PeriodMetrics } from "@/mocks/data/comparison";

interface MetricsComparisonTableProps {
  periodA: PeriodMetrics;
  periodB: PeriodMetrics;
}

interface MetricRow {
  label: string;
  valueA: string | number;
  valueB: string | number;
  change: number;
  inverseColors?: boolean; // for metrics where lower is better
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

function getChangeIndicator(change: number, inverse: boolean = false) {
  const isPositive = inverse ? change < 0 : change > 0;
  const isNegative = inverse ? change > 0 : change < 0;

  if (Math.abs(change) < 0.5) {
    return (
      <span className="flex items-center gap-1 text-gray-500">
        <Minus className="h-4 w-4" />
        <span>No change</span>
      </span>
    );
  }

  if (isPositive) {
    return (
      <span className="flex items-center gap-1 text-green-600">
        <ArrowUp className="h-4 w-4" />
        <span>+{Math.abs(change).toFixed(1)}%</span>
      </span>
    );
  }

  if (isNegative) {
    return (
      <span className="flex items-center gap-1 text-red-600">
        <ArrowDown className="h-4 w-4" />
        <span>-{Math.abs(change).toFixed(1)}%</span>
      </span>
    );
  }

  return null;
}

export function MetricsComparisonTable({
  periodA,
  periodB,
}: MetricsComparisonTableProps) {
  const metrics: MetricRow[] = [
    {
      label: "Total Mentions",
      valueA: formatNumber(periodA.totalMentions),
      valueB: formatNumber(periodB.totalMentions),
      change:
        ((periodB.totalMentions - periodA.totalMentions) /
          periodA.totalMentions) *
        100,
    },
    {
      label: "Sentiment Score",
      valueA:
        periodA.sentimentScore > 0
          ? `+${periodA.sentimentScore.toFixed(2)}`
          : periodA.sentimentScore.toFixed(2),
      valueB:
        periodB.sentimentScore > 0
          ? `+${periodB.sentimentScore.toFixed(2)}`
          : periodB.sentimentScore.toFixed(2),
      change:
        ((periodB.sentimentScore - periodA.sentimentScore) /
          Math.abs(periodA.sentimentScore)) *
        100,
    },
    {
      label: "Reach Estimate",
      valueA: formatNumber(periodA.reachEstimate),
      valueB: formatNumber(periodB.reachEstimate),
      change:
        ((periodB.reachEstimate - periodA.reachEstimate) /
          periodA.reachEstimate) *
        100,
    },
    {
      label: "Positive %",
      valueA: `${periodA.positivePercent}%`,
      valueB: `${periodB.positivePercent}%`,
      change: periodB.positivePercent - periodA.positivePercent,
    },
    {
      label: "Negative %",
      valueA: `${periodA.negativePercent}%`,
      valueB: `${periodB.negativePercent}%`,
      change: periodB.negativePercent - periodA.negativePercent,
      inverseColors: true,
    },
    {
      label: "Virality Index",
      valueA: periodA.viralityIndex.toFixed(1),
      valueB: periodB.viralityIndex.toFixed(1),
      change:
        ((periodB.viralityIndex - periodA.viralityIndex) /
          periodA.viralityIndex) *
        100,
    },
    {
      label: "Bot Presence",
      valueA: `${periodA.botPresence}%`,
      valueB: `${periodB.botPresence}%`,
      change: periodB.botPresence - periodA.botPresence,
      inverseColors: true,
    },
    {
      label: "Engagement Rate",
      valueA: `${periodA.engagementRate}%`,
      valueB: `${periodB.engagementRate}%`,
      change:
        ((periodB.engagementRate - periodA.engagementRate) /
          periodA.engagementRate) *
        100,
    },
    {
      label: "Avg Response Time",
      valueA: `${periodA.avgResponseTime}h`,
      valueB: `${periodB.avgResponseTime}h`,
      change:
        ((periodB.avgResponseTime - periodA.avgResponseTime) /
          periodA.avgResponseTime) *
        100,
      inverseColors: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Side-by-Side Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Metric</th>
                <th className="text-right py-3 px-4 font-medium">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-950"
                  >
                    {periodA.label}
                  </Badge>
                </th>
                <th className="text-right py-3 px-4 font-medium">
                  <Badge
                    variant="outline"
                    className="bg-purple-50 dark:bg-purple-950"
                  >
                    {periodB.label}
                  </Badge>
                </th>
                <th className="text-right py-3 px-4 font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.label} className="border-b last:border-0">
                  <td className="py-3 px-4 text-sm">{metric.label}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium">
                    {metric.valueA}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium">
                    {metric.valueB}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    {getChangeIndicator(metric.change, metric.inverseColors)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
