"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface AgeGroup {
  group: string;
  label: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface AgeSentimentHeatmapProps {
  data: AgeGroup[];
}

function getHeatmapColor(value: number, type: "positive" | "neutral" | "negative"): string {
  const colors = {
    positive: [
      "bg-green-100 dark:bg-green-950",
      "bg-green-200 dark:bg-green-900",
      "bg-green-300 dark:bg-green-800",
      "bg-green-400 dark:bg-green-700",
      "bg-green-500 dark:bg-green-600",
    ],
    neutral: [
      "bg-slate-100 dark:bg-slate-900",
      "bg-slate-200 dark:bg-slate-800",
      "bg-slate-300 dark:bg-slate-700",
      "bg-slate-400 dark:bg-slate-600",
      "bg-slate-500 dark:bg-slate-500",
    ],
    negative: [
      "bg-red-100 dark:bg-red-950",
      "bg-red-200 dark:bg-red-900",
      "bg-red-300 dark:bg-red-800",
      "bg-red-400 dark:bg-red-700",
      "bg-red-500 dark:bg-red-600",
    ],
  };

  const index = Math.min(Math.floor(value / 15), 4);
  return colors[type][index];
}

function getTextColor(value: number): string {
  return value >= 40
    ? "text-white dark:text-white"
    : "text-slate-700 dark:text-slate-300";
}

export function AgeSentimentHeatmap({ data }: AgeSentimentHeatmapProps) {
  // Find the most critical age group (highest negative)
  const mostCritical = data.reduce((prev, current) =>
    prev.sentiment.negative > current.sentiment.negative ? prev : current
  );

  // Find youngest group for comparison
  const youngestGroup = data.find((d) => d.group === "18-24");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Age Group Sentiment Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Age Group
                </th>
                <th className="text-center p-2 text-sm font-medium text-green-600 dark:text-green-400">
                  Positive
                </th>
                <th className="text-center p-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Neutral
                </th>
                <th className="text-center p-2 text-sm font-medium text-red-600 dark:text-red-400">
                  Negative
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.group}>
                  <td className="p-2 text-sm font-medium text-slate-900 dark:text-slate-200">
                    {row.group}
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                      ({row.label})
                    </span>
                  </td>
                  <td className="p-1">
                    <div
                      className={cn(
                        "text-center p-2 rounded text-sm font-medium",
                        getHeatmapColor(row.sentiment.positive, "positive"),
                        getTextColor(row.sentiment.positive)
                      )}
                    >
                      {row.sentiment.positive}%
                    </div>
                  </td>
                  <td className="p-1">
                    <div
                      className={cn(
                        "text-center p-2 rounded text-sm font-medium",
                        getHeatmapColor(row.sentiment.neutral, "neutral"),
                        getTextColor(row.sentiment.neutral)
                      )}
                    >
                      {row.sentiment.neutral}%
                    </div>
                  </td>
                  <td className="p-1">
                    <div
                      className={cn(
                        "text-center p-2 rounded text-sm font-medium",
                        getHeatmapColor(row.sentiment.negative, "negative"),
                        getTextColor(row.sentiment.negative)
                      )}
                    >
                      {row.sentiment.negative}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/50 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm flex items-start gap-2 text-amber-800 dark:text-amber-200">
            <Search className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Generasi {mostCritical.group} ({mostCritical.label}) cenderung lebih kritis (
              {mostCritical.sentiment.negative}% negative) dibanding Gen Z (
              {youngestGroup?.sentiment.negative || 18}% negative)
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
